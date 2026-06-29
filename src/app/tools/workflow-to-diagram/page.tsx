import Link from "next/link";
import WorkflowToDiagramClient from "../../../components/WorkflowToDiagramClient";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getSoftwareAppSchema } from "../../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "Workflow ➔ Diagram",
  description: "Generate visual Mermaid.js flowcharts and structured JSON graph nodes directly from raw text process steps.",
  path: "/tools/workflow-to-diagram"
});

export default function WorkflowToDiagramPage() {
  const schema = getSoftwareAppSchema({
    name: "Workflow ➔ Diagram",
    description: "Generate visual Mermaid.js flowcharts and structured JSON graph nodes directly from raw text process steps.",
    path: "/tools/workflow-to-diagram"
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
        <span className="text-[var(--text-primary)]">Workflow ➔ Diagram</span>
      </div>

      {/* Tool Hero */}
      <section className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
          Workflow ➔ Diagram
        </h1>
        <p className="text-text-secondary text-base leading-relaxed max-w-[700px]">
          Convert raw text-based processes and instructions into structured, exportable Mermaid flowcharts in real-time.
        </p>
      </section>

      {/* Main Interactive Client Playground */}
      <section className="w-full">
        <WorkflowToDiagramClient />
      </section>

      {/* How It Works Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-[var(--card-border)] pt-12 mt-4">
        {/* Info Content Left */}
        <div className="lg:col-span-8 flex flex-col gap-6 text-sm text-text-secondary">
          <h2 className="font-heading text-xl font-bold text-[var(--text-primary)]">How It Works</h2>
          <p className="leading-relaxed">
            The tool uses a deterministic parser to analyze action items, conditionals (if/else), and transition paths in your text. It constructs a node-link syntax tree in memory, validating relationships before mapping them directly to a standard Mermaid flowchart specification.
          </p>

          <h3 className="font-heading text-base font-bold text-[var(--text-primary)]">Use Cases</h3>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li>Turning unstructured developer briefs into structured execution flowcharts.</li>
            <li>Generating systems logic files directly from issue notes.</li>
            <li>Designing review checkpoints and human gates into automation systems.</li>
          </ul>

          <h3 className="font-heading text-base font-bold text-[var(--text-primary)]">Planned CLI</h3>
          <p className="leading-relaxed">
            Deploy workflow validations offline inside your local codebase via our planned command:
          </p>
          <div className="border border-[var(--card-border)] p-4 rounded-lg bg-black/25 flex items-center gap-2 font-mono text-xs">
            <span className="text-accent-purple font-bold">ℹ</span>
            <span>Planned install command: pip install tesserakit-core tesserakit-recipes</span>
          </div>
        </div>

        {/* Sidebar Profile Right */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="card-glass p-5 flex flex-col gap-4 bg-black/10">
            <h5 className="font-heading font-bold text-xs uppercase tracking-wider text-[var(--text-primary)]">Tool Profile</h5>
            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between border-b border-white/[0.03] pb-2">
                <span className="text-text-muted">Status</span>
                <span className="text-accent-cyan font-bold">Live Demo</span>
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
                  <Link href="/docs/tool-status">Tessera JobPack</Link>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Output</span>
                <span className="text-text-secondary">Mermaid + JSON Graph</span>
              </div>
            </div>
          </div>

          <div className="card-glass p-5 bg-black/10 text-xs text-text-secondary">
            <h5 className="font-heading font-bold text-xs uppercase tracking-wider text-[var(--text-primary)] mb-2">Browser Limits</h5>
            <p className="leading-relaxed">
              The online demo is limited to 15 nodes per generation. Local runs using the CLI do not have size or path limits.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
