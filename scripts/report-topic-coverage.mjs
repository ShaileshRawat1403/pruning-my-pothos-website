import { promises as fs } from 'node:fs';
import path from 'node:path';

const CONTENT_DIR = path.resolve('src/content');
const SECTION_ORDER = ['systems', 'sentences', 'self', 'shelf', 'sticky-notes'];
const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const TOPIC_SEED = [
  'architecture',
  'seo',
  'aeo',
  'geo',
  'retrieval',
  'citation',
  'evaluation',
  'orchestration',
  'governance',
  'observability',
  'safety',
  'agents',
  'workflow',
  'knowledge-management',
  'decision-making',
  'integration',
  'adoption',
];
const TAG_ALIASES = new Map([
  ['workflows', 'workflow'],
  ['workflow', 'workflow'],
  ['knowledge management', 'knowledge-management'],
  ['knowledge-system', 'knowledge-management'],
  ['knowledge systems', 'knowledge-management'],
  ['decision', 'decision-making'],
  ['decisions', 'decision-making'],
  ['decision making', 'decision-making'],
]);

function toPosix(input) {
  return input.split(path.sep).join('/');
}

function detectSection(filePath) {
  const p = toPosix(filePath);
  if (p.includes('/src/content/systems/')) return 'systems';
  if (p.includes('/src/content/sentences/')) return 'sentences';
  if (p.includes('/src/content/self/')) return 'self';
  if (p.includes('/src/content/sticky-notes/')) return 'sticky-notes';
  if (p.includes('/src/content/shelf/')) return 'shelf';
  return 'other';
}

function stripQuotes(value) {
  return value.replace(/^['"]|['"]$/g, '').trim();
}

function extractFrontmatter(raw) {
  const match = raw.match(FRONTMATTER_RE);
  return match ? match[1] : '';
}

function parseTitle(frontmatter) {
  const match = frontmatter.match(/^title:\s*(.+)$/m);
  if (!match) return '';
  return stripQuotes(match[1]);
}

function parseTags(frontmatter) {
  const lines = frontmatter.split(/\r?\n/);
  const tags = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const match = line.match(/^tags:\s*(.*)$/);
    if (!match) continue;

    const rest = match[1].trim();
    if (rest.startsWith('[') && rest.endsWith(']')) {
      const inline = rest
        .slice(1, -1)
        .split(',')
        .map((tag) => stripQuotes(tag))
        .filter(Boolean);
      tags.push(...inline);
      break;
    }

    for (let j = i + 1; j < lines.length; j += 1) {
      const candidate = lines[j];
      const itemMatch = candidate.match(/^\s*-\s*(.+)$/);
      if (itemMatch) {
        tags.push(stripQuotes(itemMatch[1]));
        continue;
      }
      if (candidate.trim() === '') continue;
      break;
    }

    break;
  }

  return tags.map((tag) => canonicalTag(tag.toLowerCase())).filter(Boolean);
}

function canonicalTag(tag) {
  return TAG_ALIASES.get(tag) || tag;
}

async function collectFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const childFiles = await collectFiles(fullPath);
      files.push(...childFiles);
      continue;
    }
    if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      files.push(fullPath);
    }
  }

  return files;
}

function printSectionCoverage(sectionStats) {
  console.log('## Section coverage');
  console.log('| Section | Docs | Docs with tags | Distinct tags |');
  console.log('|---|---:|---:|---:|');
  for (const section of SECTION_ORDER) {
    const data = sectionStats.get(section) || { docs: 0, docsWithTags: 0, tags: new Set() };
    console.log(`| ${section} | ${data.docs} | ${data.docsWithTags} | ${data.tags.size} |`);
  }
  console.log('');
}

function printTopTags(globalTagMap) {
  const top = [...globalTagMap.entries()]
    .map(([tag, sections]) => ({ tag, sectionCount: sections.size }))
    .sort((a, b) => b.sectionCount - a.sectionCount || a.tag.localeCompare(b.tag))
    .slice(0, 20);

  console.log('## Tags with widest cross-section coverage');
  console.log('| Tag | Section count |');
  console.log('|---|---:|');
  for (const row of top) {
    console.log(`| ${row.tag} | ${row.sectionCount} |`);
  }
  console.log('');
}

function printSeedStatus(globalTagMap) {
  console.log('## Strategic topic seed status');
  console.log('| Topic | Sections covered | Status |');
  console.log('|---|---:|---|');
  for (const tag of TOPIC_SEED) {
    const covered = globalTagMap.get(tag)?.size || 0;
    const status = covered >= 3 ? 'strong' : covered >= 2 ? 'developing' : covered >= 1 ? 'thin' : 'missing';
    console.log(`| ${tag} | ${covered} | ${status} |`);
  }
  console.log('');
}

function printActionCandidates(globalTagMap) {
  const candidates = TOPIC_SEED.filter((tag) => (globalTagMap.get(tag)?.size || 0) <= 1);
  if (candidates.length === 0) {
    console.log('## Action candidates');
    console.log('No thin/missing seed topics detected.');
    console.log('');
    return;
  }

  console.log('## Action candidates (thin or missing)');
  for (const tag of candidates) {
    const covered = globalTagMap.get(tag)?.size || 0;
    console.log(`- ${tag} (sections covered: ${covered})`);
  }
  console.log('');
}

function printSampleIndex(rows) {
  const sample = rows
    .filter((row) => row.section === 'systems' || row.section === 'sentences' || row.section === 'self' || row.section === 'shelf')
    .slice(0, 24);

  console.log('## Sample index (first 24 docs)');
  console.log('| Section | Title | Tags |');
  console.log('|---|---|---|');
  for (const row of sample) {
    const tags = row.tags.slice(0, 6).join(', ');
    console.log(`| ${row.section} | ${row.title || path.basename(row.file)} | ${tags} |`);
  }
  console.log('');
}

async function main() {
  const files = await collectFiles(CONTENT_DIR);
  const rows = [];
  const sectionStats = new Map();
  const globalTagMap = new Map();

  for (const file of files.sort((a, b) => a.localeCompare(b))) {
    const raw = await fs.readFile(file, 'utf8');
    const frontmatter = extractFrontmatter(raw);
    const section = detectSection(file);
    if (!SECTION_ORDER.includes(section)) continue;

    const tags = parseTags(frontmatter);
    const title = parseTitle(frontmatter);

    rows.push({ file: toPosix(file), section, title, tags });

    if (!sectionStats.has(section)) {
      sectionStats.set(section, { docs: 0, docsWithTags: 0, tags: new Set() });
    }
    const stats = sectionStats.get(section);
    stats.docs += 1;
    if (tags.length > 0) {
      stats.docsWithTags += 1;
    }

    for (const tag of tags) {
      stats.tags.add(tag);
      if (!globalTagMap.has(tag)) {
        globalTagMap.set(tag, new Set());
      }
      globalTagMap.get(tag).add(section);
    }
  }

  console.log('# Cross-section topic coverage report');
  console.log('');
  printSectionCoverage(sectionStats);
  printTopTags(globalTagMap);
  printSeedStatus(globalTagMap);
  printActionCandidates(globalTagMap);
  printSampleIndex(rows);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
