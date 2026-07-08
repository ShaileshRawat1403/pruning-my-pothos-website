import ToolShell from "../../../components/ToolShell";
import DependencyAuditClient from "../../../components/DependencyAuditClient";
import { constructMetadata } from "../../../lib/seo/metadata";

export const metadata = constructMetadata({
  title: "Dependency Auditor",
  description: "Paste a package.json or requirements.txt and flag unpinned versions, open ranges, duplicates, and conflicts. The checks that keep a build reproducible.",
  path: "/tools/dependency-audit",
});

export default function DependencyAuditPage() {
  return (
    <ToolShell
      eyebrow="Builds & Reproducibility"
      title="Dependency Auditor"
      intro="Paste a package.json or a requirements.txt. It flags the pins that quietly break reproducible builds: wildcards, caret and tilde ranges, open lower bounds, duplicates across groups, and the same package pinned two different ways. Nothing is uploaded."
      accent="var(--accent-pink)"
      pack="tesserakit-deps"
      packBlurb="The full deps pack audits dependency manifests for pinning, duplicates, and conflicts."
    >
      <DependencyAuditClient />
    </ToolShell>
  );
}
