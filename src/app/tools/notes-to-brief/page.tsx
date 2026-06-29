import Link from "next/link";
import NotesToBriefClient from "../../../components/NotesToBriefClient";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getSoftwareAppSchema } from "../../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "Code/Notes ➔ PDF Brief",
  description: "Translate raw developer notes, code snippets, and streams of thought into formal product briefs and markdown documents.",
  path: "/tools/notes-to-brief"
});

export default function NotesToBriefPage() {
  const schema = getSoftwareAppSchema({
    name: "Code/Notes ➔ PDF Brief",
    description: "Translate raw developer notes, code snippets, and streams of thought into formal product briefs and markdown documents.",
    path: "/tools/notes-to-brief"
  });

  return (
    <div className="relative w-full flex flex-col gap-12 max-w-[1100px] mx-auto py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Glow Blobs */}
      <div className="glow-blob glow-cyan opacity-10"></div>
      <div className="glow-blob glow-purple opacity-10"></div>

      {/* Breadcrumbs */}
      <div className="font-mono text-xs text-text-muted flex gap-2">
        <Link href="/tools" className="hover:text-accent-cyan transition-colors">Tools</Link> 
        <span>/</span> 
        <span className="text-[var(--text-primary)]">Notes ➔ Brief</span>
      </div>

      {/* Tool Hero */}
      <section className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
          Code/Notes ➔ PDF Brief
        </h1>
        <p className="text-text-secondary text-base leading-relaxed max-w-[700px]">
          Convert unstructured developer thoughts, raw notes, and codebase snippets into structured product briefs and markdown documents.
        </p>
      </section>

      {/* Main Interactive Client Playground */}
      <section className="w-full">
        <NotesToBriefClient />
      </section>

      {/* How It Works Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-[var(--card-border)] pt-12 mt-4">
        {/* Info Content Left */}
        <div className="lg:col-span-8 flex flex-col gap-6 text-sm text-text-secondary">
          <h2 className="font-heading text-xl font-bold text-[var(--text-primary)]">How It Works</h2>
          <p className="leading-relaxed">
            This utility parses list elements, notes, and task goals inside your text and restructures them into a standard markdown document format featuring separated headings for Goals, Decisions, Risks, and Next Actions.
          </p>

          <h3 className="font-heading text-base font-bold text-[var(--text-primary)]">Use Cases</h3>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li>Translating stream-of-consciousness dev thoughts into formal documentation.</li>
            <li>Formatting raw chat descriptions into roadmap specs.</li>
            <li>Generating next steps checklists directly from codebase post-mortem notes.</li>
          </ul>

          <h3 className="font-heading text-base font-bold text-[var(--text-primary)]">Planned CLI</h3>
          <p className="leading-relaxed">
            Deploy notes/markdown compilation offline inside your local workspace via our planned command:
          </p>
          <div className="border border-[var(--card-border)] p-4 rounded-lg bg-black/25 flex items-center gap-2 font-mono text-xs">
            <span className="text-accent-purple font-bold">ℹ</span>
            <span>Planned install command: pip install tesserakit-core</span>
          </div>
        </div>

        {/* Sidebar Profile Right */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="card-glass p-5 flex flex-col gap-4 bg-black/10">
            <h5 className="font-heading font-bold text-xs uppercase tracking-wider text-[var(--text-primary)]">Tool Profile</h5>
            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between border-b border-white/[0.03] pb-2">
                <span className="text-text-muted">Status</span>
                <span className="text-accent-purple font-bold">Local Prototype</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.03] pb-2">
                <span className="text-text-muted">Mode</span>
                <span className="text-text-secondary">Browser prototype</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.03] pb-2">
                <span className="text-text-muted">Engine</span>
                <span className="text-text-secondary">ToolSmith</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.03] pb-2">
                <span className="text-text-muted">Contract</span>
                <span className="text-text-secondary">Tessera-compatible</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.03] pb-2">
                <span className="text-text-muted">Future Wiring</span>
                <span className="text-accent-cyan hover:underline font-semibold">
                  <Link href="/docs/tool-status">Content Engine</Link>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Output</span>
                <span className="text-text-secondary">Structured markdown</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
