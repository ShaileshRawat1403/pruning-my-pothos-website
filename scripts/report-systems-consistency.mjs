import { promises as fs } from 'node:fs';
import path from 'node:path';

const SYSTEMS_DIR = path.resolve('src/content/systems');
const WORD_RE = /[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g;
const FRONTMATTER_RE = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/;

function countMatches(content, regex) {
  return (content.match(regex) || []).length;
}

function countWords(content) {
  return countMatches(content, WORD_RE);
}

function stripFrontmatter(content) {
  return content.replace(FRONTMATTER_RE, '');
}

function getMetrics(raw, body) {
  return {
    words: countWords(body),
    tables: countMatches(raw, /<table\b/gi),
    callouts: countMatches(raw, /<aside\s+class=["'][^"']*callout/gi),
    diagrams: countMatches(raw, /<figure\s+class=["'][^"']*diagram/gi),
    internalLinks: countMatches(raw, /\[[^\]]+\]\(\/(?!\/)/g),
    externalLinks: countMatches(raw, /\[[^\]]+\]\(https?:\/\/[^\s)]+/g),
    hasDefinitionIntro: /^###\s+(What|Why|How)\b.*\?\s*$/mi.test(raw),
    hasAudienceDeclaration:
      /\b(this article|this document|this page|this guide|for practitioners|for builders|for operators|for leaders|for teams|for organizations|for product teams|for small teams)\b/i.test(raw),
    hasProofLink:
      /\[[^\]]+\]\(\/(portfolio|shelf\/local-experiments|shelf\/shared-resources)\//i.test(raw),
    hasTakeaways: /\*\*Key takeaways\*\*/i.test(raw),
    hasToc: /<nav\s+class=["']toc["']/i.test(raw),
    hasActI: /^##\s+Act I\b/mi.test(raw),
    hasActII: /^##\s+Act II\b/mi.test(raw),
    hasActIII: /^##\s+Act III\b/mi.test(raw),
  };
}

function printSummary(rows) {
  const total = rows.length;
  const avgWords = Math.round(rows.reduce((sum, row) => sum + row.words, 0) / total);
  const minWords = Math.min(...rows.map((row) => row.words));
  const maxWords = Math.max(...rows.map((row) => row.words));
  const under800 = rows.filter((row) => row.words < 800).length;
  const withDefinitionIntro = rows.filter((row) => row.hasDefinitionIntro).length;
  const withAudienceDeclaration = rows.filter((row) => row.hasAudienceDeclaration).length;
  const withProofLink = rows.filter((row) => row.hasProofLink).length;
  console.log(`Systems docs: ${total}`);
  console.log(`Words: avg=${avgWords}, min=${minWords}, max=${maxWords}, below800=${under800}`);
  console.log(
    `Authority signals: definition-intro=${withDefinitionIntro}, audience-declaration=${withAudienceDeclaration}, proof-link=${withProofLink}`
  );
  console.log('');
}

function printTable(rows) {
  console.log('| File | Words | Tables | Callouts | Diagrams | Internal | External | Def | Audience | Proof | TOC | Acts | Takeaways |');
  console.log('|---|---:|---:|---:|---:|---:|---:|:---:|:---:|:---:|:---:|:---:|:---:|');
  for (const row of rows) {
    const acts = row.hasActI && row.hasActII && row.hasActIII ? 'yes' : 'no';
    const toc = row.hasToc ? 'yes' : 'no';
    const takeaways = row.hasTakeaways ? 'yes' : 'no';
    const definitionIntro = row.hasDefinitionIntro ? 'yes' : 'no';
    const audience = row.hasAudienceDeclaration ? 'yes' : 'no';
    const proofLink = row.hasProofLink ? 'yes' : 'no';
    console.log(
      `| ${row.file} | ${row.words} | ${row.tables} | ${row.callouts} | ${row.diagrams} | ${row.internalLinks} | ${row.externalLinks} | ${definitionIntro} | ${audience} | ${proofLink} | ${toc} | ${acts} | ${takeaways} |`
    );
  }
}

async function main() {
  const entries = await fs.readdir(SYSTEMS_DIR, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  const rows = [];
  for (const file of files) {
    const fullPath = path.join(SYSTEMS_DIR, file);
    const raw = await fs.readFile(fullPath, 'utf8');
    const body = stripFrontmatter(raw);
    const metrics = getMetrics(raw, body);
    rows.push({ file, ...metrics });
  }

  printSummary(rows);
  printTable(rows);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
