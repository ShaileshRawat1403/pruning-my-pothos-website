import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SYSTEMS_DIR = path.join(ROOT, 'src/content/systems');
const SYSTEMS_PAGE = path.join(ROOT, 'src/pages/systems/[slug].astro');
const DISTRIBUTION_PLAYBOOK = path.join(ROOT, 'docs/agent-instructions/playbooks/distribution-and-canonical-syndication.md');

const KEY_DOCS = [
  'seo-aeo-geo-how-things-fit-together.mdx',
  'observability-first-ai-systems.mdx',
  'knowledge-management-as-runtime-memory.mdx',
  'decision-making-under-uncertainty-in-ai-runtimes.mdx',
];

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function read(file) {
  return fs.readFile(file, 'utf8');
}

function hasQuestionHeading(content) {
  return /^#{2,3}\s+.*\?/m.test(content);
}

function hasDirectAnswerLength(content) {
  const matches = content.match(/\n###\s+What[^\n]*\?\n\n([\s\S]{40,500}?)(\n\n|$)/g);
  return Boolean(matches && matches.length > 0);
}

async function main() {
  const glossaryPath = path.join(SYSTEMS_DIR, 'entity-glossary-for-ai-discoverability.mdx');
  const glossaryExists = await exists(glossaryPath);
  const glossaryContent = glossaryExists ? await read(glossaryPath) : '';
  const termAnchorCount = (glossaryContent.match(/id="term-[a-z0-9-]+"/g) || []).length;

  const systemsPageContent = await read(SYSTEMS_PAGE);
  const hasFaqSchema = systemsPageContent.includes("'@type': 'FAQPage'");
  const hasDefinedTermLinking = systemsPageContent.includes('inDefinedTermSet');

  let docsWithFaq = 0;
  let docsWithProof = 0;
  let docsWithUpdatedAt = 0;
  let docsWithDirectAnswers = 0;

  for (const doc of KEY_DOCS) {
    const full = path.join(SYSTEMS_DIR, doc);
    if (!(await exists(full))) continue;
    const raw = await read(full);
    if (/^faq:/m.test(raw)) docsWithFaq += 1;
    if (/^proofPoints:/m.test(raw)) docsWithProof += 1;
    if (/^updatedAt:/m.test(raw)) docsWithUpdatedAt += 1;
    if (hasQuestionHeading(raw) && hasDirectAnswerLength(raw)) docsWithDirectAnswers += 1;
  }

  const hasDistributionPlaybook = await exists(DISTRIBUTION_PLAYBOOK);

  console.log('# Main Gaps Status Report');
  console.log('');
  console.log('| Gap | Status | Evidence |');
  console.log('|---|---|---|');
  console.log(`| Entity layer | ${glossaryExists && termAnchorCount >= 10 ? 'Addressed' : 'Partial'} | glossary exists=${glossaryExists}, term anchors=${termAnchorCount} |`);
  console.log(`| Schema | ${hasFaqSchema && hasDefinedTermLinking ? 'Addressed' : 'Partial'} | FAQ schema=${hasFaqSchema}, defined-term linking=${hasDefinedTermLinking}, key docs with faq=${docsWithFaq} |`);
  console.log(`| Evidence/citation (GEO) | ${docsWithProof >= 3 && docsWithUpdatedAt >= 3 ? 'Addressed' : 'Partial'} | key docs with proofPoints=${docsWithProof}, updatedAt=${docsWithUpdatedAt} |`);
  console.log(`| AEO extraction | ${docsWithDirectAnswers >= 3 ? 'Addressed' : 'Partial'} | key docs with question+answer blocks=${docsWithDirectAnswers} |`);
  console.log(`| Distribution | ${hasDistributionPlaybook ? 'Addressed (framework)' : 'Partial'} | canonical distribution playbook=${hasDistributionPlaybook} |`);
  console.log('');
  console.log('Note: Distribution status indicates framework readiness in-repo; off-site publication execution is external.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
