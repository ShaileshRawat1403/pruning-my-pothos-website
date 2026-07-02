import ToolShell from "../../../components/ToolShell";
import MarkdownLinkClient from "../../../components/MarkdownLinkClient";
import { constructMetadata } from "../../../lib/seo/metadata";

export const metadata = constructMetadata({
  title: "Markdown Link Checker",
  description: "Check Markdown for broken in-page anchors and empty links; external URLs are inventoried, never fetched. Runs in your browser.",
  path: "/tools/markdown-links",
});

export default function MarkdownLinksPage() {
  return (
    <ToolShell
      eyebrow="Docs Hygiene"
      title="Markdown Link Checker"
      intro="Paste Markdown. It verifies every in-page anchor against the actual headings, flags empty targets, and inventories external and relative links without ever fetching them. Nothing is uploaded."
      accent="var(--accent-cyan)"
      pack="tesserakit-links"
      packBlurb="The full links pack checks file references, dead anchors, and orphan docs across a repository."
    >
      <MarkdownLinkClient />
    </ToolShell>
  );
}
