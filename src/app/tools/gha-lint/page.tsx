import ToolShell from "../../../components/ToolShell";
import GhaLintClient from "../../../components/GhaLintClient";
import { constructMetadata } from "../../../lib/seo/metadata";

export const metadata = constructMetadata({
  title: "GitHub Actions Linter",
  description: "Lint a GitHub Actions workflow for security: the pull_request_target plus PR-checkout RCE combo, unpinned actions, write-all permissions, and script injection from untrusted input. Runs in your browser.",
  path: "/tools/gha-lint",
});

export default function GhaLintPage() {
  return (
    <ToolShell
      eyebrow="Security & Secrets"
      title="GitHub Actions Linter"
      intro="Paste a workflow file. It flags the pull_request_target plus PR-checkout RCE combo, unpinned third-party actions, write-all permissions, and shell injection from github.event inputs. Nothing is uploaded."
      accent="var(--accent-purple)"
      pack="tesserakit-gha"
      packBlurb="The full gha pack audits every workflow for the risky triggers and permissions attackers look for."
    >
      <GhaLintClient />
    </ToolShell>
  );
}
