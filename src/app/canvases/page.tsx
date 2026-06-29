import Link from "next/link";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "Visual Canvases | Systems Bench",
  description: "Visual blueprints and system workflow transition canvases for governing agent-assisted engineering loops.",
  path: "/canvases"
});

export default function CanvasesIndexPage() {
  const schema = getWebPageSchema({
    title: "Visual Canvases | Sans Serif Systems",
    description: "Visual blueprints and system workflow transition canvases for governing agent-assisted engineering loops.",
    path: "/canvases"
  });

  const canvasItems = [
    {
      title: "Evaluation Loop Canvas",
      description: "Map input files, assertion hooks, validation tests, and ledgers in a structured layout.",
      status: "Planning Prototype",
      accent: "border-accent-purple"
    },
    {
      title: "Context Partitioning Canvas",
      description: "Define sandbox boundaries separating public state utilities from private execution engines.",
      status: "Planning Prototype",
      accent: "border-accent-cyan"
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
          Visual Canvases
        </h1>
        <p className="text-text-secondary text-base leading-relaxed max-w-[700px]">
          Structured worksheets and conceptual layout sheets to model context pathways, validation assertions, and human-in-the-loop review boundaries.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {canvasItems.map((canvas, idx) => (
          <div key={idx} className={`card-glass p-6 flex flex-col gap-4 justify-between border-t-2 ${canvas.accent}`}>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted">
                  System Layout {idx + 1}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono font-semibold uppercase text-accent-purple">
                  {canvas.status}
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-[var(--text-primary)]">
                {canvas.title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {canvas.description}
              </p>
            </div>
            <span className="text-xs font-mono text-text-muted">
              Offline workbook resource &bull; Available in local docs
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
