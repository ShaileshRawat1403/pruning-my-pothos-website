import { promises as fs } from 'node:fs';
import path from 'node:path';
import { COLLECTIONS } from './content-contract.mjs';

// Single source of truth: the systems body contract lives in
// scripts/content-contract.mjs and is shared with the websiteops conform
// bridge and the flowright drafting step. This gate just runs it over every
// published systems doc.
const SYSTEMS_DIR = path.resolve(COLLECTIONS.systems.dir);
const FRONTMATTER_RE = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/;

function stripFrontmatter(content) {
  return content.replace(FRONTMATTER_RE, '');
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
    const issues = COLLECTIONS.systems.body(raw, body);
    if (issues.length > 0) {
      failures.push({ fileName, issues });
    }
  }

  if (failures.length === 0) {
    console.log(`OK: ${files.length} systems docs passed consistency checks.`);
    return;
  }

  console.error('Systems consistency check failed.\n');
  for (const failure of failures) {
    console.error(`- ${failure.fileName}`);
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
