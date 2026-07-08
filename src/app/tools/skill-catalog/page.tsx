import ToolShell from "../../../components/ToolShell";
import SkillCatalogClient from "../../../components/SkillCatalogClient";
import { constructMetadata } from "../../../lib/seo/metadata";

export const metadata = constructMetadata({
  title: "Skill Catalog Validator",
  description: "Validate SKILL.md files in the Anthropic Skills convention: missing triggers, name collisions, and description overlap that would cause a silent misfire under an agent. Runs in your browser.",
  path: "/tools/skill-catalog",
});

export default function SkillCatalogPage() {
  return (
    <ToolShell
      eyebrow="Agentic Tooling"
      title="Skill Catalog Validator"
      intro="Paste one SKILL.md, or several separated by a line of ===. It checks frontmatter completeness, flags descriptions that don't name a trigger, and (with more than one skill pasted) flags name collisions and description overlap high enough to cause an agent to pick the wrong skill. Nothing is uploaded."
      accent="var(--accent-cyan)"
      pack="tesserakit-skills"
      packBlurb="The full skills pack catalogs a whole skills/ directory and extracts each skill's bash, MCP, and skill-to-skill dependencies too."
    >
      <SkillCatalogClient />
    </ToolShell>
  );
}
