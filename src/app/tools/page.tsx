import Link from "next/link";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "ToolSmith Playgrounds | Systems Bench",
  description: "Stateless browser-native developer helper utilities to structure context, evaluate loops, and build workflow blueprints.",
  path: "/tools"
});

export default function ToolsIndexPage() {
  const schema = getWebPageSchema({
    title: "ToolSmith Playgrounds | Sans Serif Systems",
    description: "Stateless browser-native developer helper utilities to structure context, evaluate loops, and build workflow blueprints.",
    path: "/tools"
  });

  const toolItems = [
    {
      title: "Prompt ➔ JSON Schema",
      description: "Convert raw prose specifications into typed, structured output JSON schemas and matching examples.",
      path: "/tools/prompt-to-json",
      status: "Live Demo",
      accent: "border-accent-cyan"
    },
    {
      title: "Change ➔ HITL Checklist",
      description: "Analyze codebase modifications to estimate risks, touchpoints, and output review check checklists.",
      path: "/tools/change-to-checklist",
      status: "Local Prototype",
      accent: "border-accent-purple"
    },
    {
      title: "CSV ➔ Eval Dataset",
      description: "Convert tabular query-response CSV outputs into RAG assertion evaluation packets.",
      path: "/tools/csv-to-eval",
      status: "Local Prototype",
      accent: "border-accent-orange"
    },
    {
      title: "Notes ➔ PDF Brief",
      description: "Format messy chat history or developer stream of thoughts into structured briefs for printing.",
      path: "/tools/notes-to-brief",
      status: "Local Prototype",
      accent: "border-accent-pink"
    },
    {
      title: "Repo ➔ Context Pack",
      description: "Aggregate multi-file configurations and source blocks into structured XML contexts.",
      path: "/tools/repo-context-pack",
      status: "Local Prototype",
      accent: "border-accent-cyan"
    },
    {
      title: "Workflow ➔ Diagram",
      description: "Compile transition actions and process steps into dynamically rendered Mermaid flowcharts.",
      path: "/tools/workflow-to-diagram",
      status: "Live Demo",
      accent: "border-accent-purple"
    }
  ];

  return (
    <div className="relative w-full flex flex-col gap-12 max-w-[1100px] mx-auto py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Glow Blobs */}
      <div className="glow-blob glow-cyan opacity-10"></div>
      <div className="glow-blob glow-purple opacity-10"></div>

      <section className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
          ToolSmith Playgrounds
        </h1>
        <p className="text-text-secondary text-base leading-relaxed max-w-[700px]">
          Stateless, browser-native helper utilities to design schemas, audit changes, package directories, and compile flowcharts offline.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolItems.map((tool, idx) => (
          <div key={idx} className={`card-glass p-6 flex flex-col gap-5 justify-between border-t-4 ${tool.accent} hover:-translate-y-1 transition-all duration-300 shadow-glow-cyan-hover`}>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted">
                  MODULE // 0{idx + 1}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono font-semibold uppercase text-text-secondary">
                  {tool.status}
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] hover:text-accent-cyan transition-colors">
                <Link href={tool.path}>{tool.title}</Link>
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {tool.description}
              </p>
            </div>
            
            <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-2">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 self-center"></span>
                <span className="text-[9px] font-mono text-text-muted uppercase">100% Client-Side</span>
              </div>
              <Link
                href={tool.path}
                className="text-xs font-semibold text-accent-cyan hover:underline flex items-center gap-1 cursor-pointer"
              >
                Launch Console ➔
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
