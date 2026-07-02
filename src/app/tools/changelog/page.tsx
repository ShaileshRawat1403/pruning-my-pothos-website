import ToolShell from "../../../components/ToolShell";
import ChangelogClient from "../../../components/ChangelogClient";
import { constructMetadata } from "../../../lib/seo/metadata";

export const metadata = constructMetadata({
  title: "Commits to Changelog",
  description: "Turn Conventional Commits into a grouped CHANGELOG.md, with breaking changes promoted to the top. Runs in your browser.",
  path: "/tools/changelog",
});

export default function ChangelogPage() {
  return (
    <ToolShell
      eyebrow="Release Notes"
      title="Commits to Changelog"
      intro="Paste commit subjects or a git log. Conventional Commits become a grouped CHANGELOG.md, with breaking changes promoted to the top and scopes bolded. Nothing is uploaded."
      accent="var(--accent-green)"
      pack="tesserakit-changelog"
      packBlurb="The full changelog pack turns real git history into structured release notes."
    >
      <ChangelogClient />
    </ToolShell>
  );
}
