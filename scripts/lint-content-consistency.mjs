import { promises as fs } from 'node:fs';
import path from 'node:path';
import { COLLECTIONS, countWords } from './content-contract.mjs';

const CONTENT_ROOT = path.resolve('src/content');
const FRONTMATTER_RE = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/;
const PLACEHOLDER_RE = /\bplaceholder\b|This is (?:another |a third )?placeholder|^Book Recommendation\b|^Movie Recommendation\b|^Culture Post\b/i;

const sectionConfigs = [
  {
    name: 'self',
    dir: path.join(CONTENT_ROOT, 'self'),
    ext: '.md',
    // Body rules sourced from the shared contract (scripts/content-contract.mjs).
    required: (raw, body) => COLLECTIONS.self.body(raw, body),
  },
  {
    name: 'sentences',
    dir: path.join(CONTENT_ROOT, 'sentences'),
    ext: '.md',
    required: (raw, body) => {
      const failures = [];
      if (!/^summary:\s*["'][^"']+["']/m.test(raw)) failures.push('missing summary frontmatter');
      // Body length rule sourced from the shared contract.
      failures.push(...COLLECTIONS.sentences.body(raw, body));
      return failures;
    },
  },
  {
    name: 'sticky-notes',
    dir: path.join(CONTENT_ROOT, 'sticky-notes'),
    ext: '.md',
    required: (_raw, body) => {
      const failures = [];
      const lines = body.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
      if (lines.length < 2) failures.push('sticky note should contain at least two non-empty lines');
      if (countWords(body) < 6) failures.push(`body too short (${countWords(body)} words)`);
      return failures;
    },
  },
  {
    name: 'shelf',
    dir: path.join(CONTENT_ROOT, 'shelf'),
    ext: '.md',
    required: (raw, body, file) => {
      const failures = [];
      const rel = path.relative(path.join(CONTENT_ROOT, 'shelf'), file).replace(/\\/g, '/');
      if (!/^coverUrl:\s*["'][^"']+["']/m.test(raw)) failures.push('missing coverUrl');
      const minWords = /^music\//.test(rel) ? 6 : 20;
      if (countWords(body) < minWords) failures.push(`body too short (${countWords(body)} words)`);
      if (/^(books|movies|culture)\//.test(rel) && countWords(body) < 55) {
        failures.push(`curated shelf entry too short (${countWords(body)} words)`);
      }
      if (/^shared-resources\//.test(rel) && /^pdfUrl:/m.test(raw)) {
        const highlightCount = countResourceHighlights(raw);
        if (highlightCount < 2) {
          failures.push(`shared resource PDF should have at least 2 resourceHighlights (found ${highlightCount})`);
        }
      }
      return failures;
    },
  },
];

function stripFrontmatter(content) {
  return content.replace(FRONTMATTER_RE, '');
}

function countResourceHighlights(raw) {
  const match = raw.match(/resourceHighlights:\r?\n((?:\s+- .*\r?\n?)*)/m);
  if (!match) return 0;
  return (match[1].match(/^\s+- /gm) || []).length;
}

async function collectFiles(dir, ext) {
  const files = [];
  async function walk(current) {
    const entries = await fs.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (entry.isFile() && full.endsWith(ext)) {
        files.push(full);
      }
    }
  }
  await walk(dir);
  return files.sort((a, b) => a.localeCompare(b));
}

async function main() {
  const failures = [];

  for (const section of sectionConfigs) {
    const files = await collectFiles(section.dir, section.ext);
    for (const file of files) {
      const raw = await fs.readFile(file, 'utf8');
      const body = stripFrontmatter(raw);
      const fileFailures = [];

      if (PLACEHOLDER_RE.test(raw) || PLACEHOLDER_RE.test(body)) {
        fileFailures.push('contains placeholder text');
      }

      fileFailures.push(...section.required(raw, body, file));

      if (fileFailures.length > 0) {
        failures.push({
          file: path.relative(process.cwd(), file),
          issues: fileFailures,
        });
      }
    }
  }

  if (failures.length === 0) {
    console.log('OK: content consistency checks passed across self, sentences, sticky-notes, and shelf.');
    return;
  }

  console.error('Content consistency check failed.\n');
  for (const failure of failures) {
    console.error(`- ${failure.file}`);
    for (const issue of failure.issues) {
      console.error(`  - ${issue}`);
    }
  }
  process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
