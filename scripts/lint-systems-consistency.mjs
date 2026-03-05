import { promises as fs } from 'node:fs';
import path from 'node:path';

const SYSTEMS_DIR = path.resolve('src/content/systems');
const MIN_WORDS = 800;

const WORD_RE = /[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g;
const FRONTMATTER_RE = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/;

function countWords(content) {
  return (content.match(WORD_RE) || []).length;
}

function stripFrontmatter(content) {
  return content.replace(FRONTMATTER_RE, '');
}

function runChecks(content, wordCount) {
  return [
    {
      label: `minimum word count (${MIN_WORDS})`,
      ok: wordCount >= MIN_WORDS,
      detail: `found ${wordCount}`,
    },
    {
      label: 'key takeaways blockquote',
      ok: /\*\*Key takeaways\*\*/i.test(content),
    },
    {
      label: 'TOC anchor (#toc-anchor)',
      ok: /id=["']toc-anchor["']/i.test(content),
    },
    {
      label: 'TOC nav block (.toc)',
      ok: /<nav\s+class=["']toc["']/i.test(content),
    },
    {
      label: 'Act I section heading',
      ok: /^##\s+Act I\b/mi.test(content),
    },
    {
      label: 'Act II section heading',
      ok: /^##\s+Act II\b/mi.test(content),
    },
    {
      label: 'Act III section heading',
      ok: /^##\s+Act III\b/mi.test(content),
    },
    {
      label: 'at least one callout block',
      ok: /<aside\s+class=["'][^"']*callout/i.test(content),
    },
    {
      label: 'at least one highlight span',
      ok: /<span\s+class=["']highlight["']>/i.test(content),
    },
  ];
}

async function getSystemsFiles() {
  const entries = await fs.readdir(SYSTEMS_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'))
    .map((entry) => path.join(SYSTEMS_DIR, entry.name))
    .sort((a, b) => a.localeCompare(b));
}

async function main() {
  const files = await getSystemsFiles();
  const failures = [];

  for (const filePath of files) {
    const fileName = path.basename(filePath);
    const raw = await fs.readFile(filePath, 'utf8');
    const body = stripFrontmatter(raw);
    const wordCount = countWords(body);
    const checks = runChecks(raw, wordCount);
    const fileFailures = checks.filter((check) => !check.ok);

    if (fileFailures.length > 0) {
      failures.push({ fileName, fileFailures });
    }
  }

  if (failures.length === 0) {
    console.log(`OK: ${files.length} systems docs passed consistency checks.`);
    return;
  }

  console.error('Systems consistency check failed.\n');
  for (const failure of failures) {
    console.error(`- ${failure.fileName}`);
    for (const check of failure.fileFailures) {
      const detail = check.detail ? ` (${check.detail})` : '';
      console.error(`  - ${check.label}${detail}`);
    }
  }

  process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
