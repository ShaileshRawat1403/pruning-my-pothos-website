import Link from "next/link";
import ChangeToChecklistClient from "../../../components/ChangeToChecklistClient";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getSoftwareAppSchema } from "../../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "Change Request ➔ HITL Checklist",
  description: "Analyze codebase change proposals to identify code risks, touchpoints, and generate human-in-the-loop review checklists.",
  path: "/tools/change-to-checklist"
});

export default function ChangeToChecklistPage() {
  const schema = getSoftwareAppSchema({
    name: "Change Request ➔ HITL Checklist",
    description: "Analyze codebase change proposals to identify code risks, touchpoints, and generate human-in-the-loop review checklists.",
    path: "/tools/change-to-checklist"
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
        <span className="text-[var(--text-primary)]">Change ➔ Checklist</span>
      </div>

      {/* Tool Hero */}
      <section className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
          Change Request ➔ HITL Checklist
        </h1>
        <p className="text-text-secondary text-base leading-relaxed max-w-[700px]">
          Analyze codebase change requests to generate structured risk levels, review gates, and human-in-the-loop (HITL) checklists.
        </p>
      </section>

      {/* Main Interactive Client Playground */}
      <section className="w-full">
        <ChangeToChecklistClient />
      </section>

      {/* How It Works Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-[var(--card-border)] pt-12 mt-4">
        {/* Info Content Left */}
        <div className="lg:col-span-8 flex flex-col gap-6 text-sm text-text-secondary">
          <h2 className="font-heading text-xl font-bold text-[var(--text-primary)]">How It Works</h2>
          <p className="leading-relaxed">
            This demo parses keywords inside planned changes (e.g. routing, stylesheet, css, delete, refactor, config) to calculate the potential risk profile. It applies a rules-based taxonomy to output required verification checks and human review checkpoints before deployment.
          </p>

          <h3 className="font-heading text-base font-bold text-[var(--text-primary)]">Use Cases</h3>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li>Validating code changes against project safety constraints before pushes.</li>
            <li>Auto-generating PR checklist descriptions.</li>
            <li>Structuring gate checks for automated release workflows.</li>
          </ul>

          <h3 className="font-heading text-base font-bold text-[var(--text-primary)]">Planned CLI</h3>
          <p className="leading-relaxed">
            Deploy verification checkpoints offline inside your local workspace via our planned command:
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
                  <Link href="/docs/tool-status">Governance Engine</Link>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Output</span>
                <span className="text-text-secondary">Review gates + checklist</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
