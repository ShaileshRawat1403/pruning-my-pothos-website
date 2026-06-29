import Link from "next/link";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "Live Lab Dashboard | Systems Bench",
  description: "Monitor execution telemetry, ledger updates, and status checks of offline workflow engines.",
  path: "/live-lab"
});

export default function LiveLabIndexPage() {
  const schema = getWebPageSchema({
    title: "Live Lab Dashboard | Sans Serif Systems",
    description: "Monitor execution telemetry, ledger updates, and status checks of offline workflow engines.",
    path: "/live-lab"
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

      <section className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
          Live Lab Dashboard
        </h1>
        <p className="text-text-secondary text-base leading-relaxed max-w-[700px]">
          Execution logs, runtime audits, and system status checkers showing the health of offline engineering pipelines.
        </p>
      </section>

      <section className="card-glass p-8 flex flex-col gap-6 bg-black/10 text-sm text-text-secondary border-t-2 border-accent-purple">
        <h3 className="font-heading text-lg font-bold text-[var(--text-primary)]">Workspace Status & Metrics</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
          <div className="p-4 border border-[var(--card-border)] rounded bg-black/15 flex flex-col gap-1 text-center">
            <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">Ledger Log Hits</span>
            <strong className="text-xl text-accent-cyan">0</strong>
          </div>
          <div className="p-4 border border-[var(--card-border)] rounded bg-black/15 flex flex-col gap-1 text-center">
            <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">Active Workspaces</span>
            <strong className="text-xl text-accent-purple">1</strong>
          </div>
          <div className="p-4 border border-[var(--card-border)] rounded bg-black/15 flex flex-col gap-1 text-center">
            <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">Validation Suite Pass</span>
            <strong className="text-xl text-accent-cyan">100%</strong>
          </div>
          <div className="p-4 border border-[var(--card-border)] rounded bg-black/15 flex flex-col gap-1 text-center">
            <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">Human Gates Pending</span>
            <strong className="text-xl text-text-muted">0</strong>
          </div>
        </div>

        <p className="leading-relaxed mt-4">
          This cockpit displays static variables and telemetry mocks. Real-time updates require direct CLI runtime connectivity inside your private workspace environments.
        </p>
      </section>
    </div>
  );
}
