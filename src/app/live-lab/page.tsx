import Link from "next/link";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "Systems Telemetry | Systems Bench",
  description: "Monitor execution telemetry, ledger updates, and status checks of offline workflow engines.",
  path: "/live-lab"
});

export default function LiveLabIndexPage() {
  const schema = getWebPageSchema({
    title: "Systems Telemetry | Sans Serif Systems",
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
          Systems Telemetry
        </h1>
        <p className="text-text-secondary text-base leading-relaxed max-w-[700px]">
          Execution logs, runtime audits, and system status checkers showing the health of offline engineering pipelines.
        </p>
      </section>

      <section className="card-glass p-8 flex flex-col gap-8 bg-black/40 border-accent-purple/20 shadow-premium relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-purple animate-pulse"></span>
            <h3 className="font-heading text-xl font-bold text-[var(--text-primary)]">Telemetry Cockpit // status_ledger</h3>
          </div>
          <span className="px-2.5 py-1 rounded bg-accent-cyan/15 border border-accent-cyan/30 text-accent-cyan font-mono text-[9px] font-bold uppercase tracking-wider">
            SYSTEM_ONLINE
          </span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2 relative z-10">
          <div className="p-4 border border-white/5 rounded-xl bg-black/35 flex flex-col gap-1 text-center hover:border-accent-cyan/20 transition-all duration-300">
            <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">LEDGER LOGS</span>
            <strong className="text-2xl text-accent-cyan font-heading">260</strong>
          </div>
          <div className="p-4 border border-white/5 rounded-xl bg-black/35 flex flex-col gap-1 text-center hover:border-accent-purple/20 transition-all duration-300">
            <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">ACTIVE AGENTS</span>
            <strong className="text-2xl text-accent-purple font-heading">6</strong>
          </div>
          <div className="p-4 border border-white/5 rounded-xl bg-black/35 flex flex-col gap-1 text-center hover:border-accent-pink/20 transition-all duration-300">
            <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">SUITE INTEGRITY</span>
            <strong className="text-2xl text-accent-pink font-heading">100%</strong>
          </div>
          <div className="p-4 border border-white/5 rounded-xl bg-black/35 flex flex-col gap-1 text-center hover:border-white/10 transition-all duration-300">
            <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">GATES PENDING</span>
            <strong className="text-2xl text-text-muted font-heading">0</strong>
          </div>
        </div>

        {/* Interactive simulated terminal console */}
        <div className="relative z-10 flex flex-col gap-2 rounded-xl bg-black/60 border border-white/5 p-4 font-mono text-xs text-text-secondary">
          <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2 text-[10px] text-text-muted">
            <span>SYS_TERMINAL // tty.node0</span>
            <span className="text-accent-cyan">[SECURE CONNECTION]</span>
          </div>
          <div className="flex flex-col gap-1.5 max-h-[220px] overflow-auto">
            <p className="text-text-muted">&gt; agy --init-telemetry</p>
            <p className="text-green-400">[SUCCESS] Telemetry bridge initialized on port 3000.</p>
            <p className="text-text-muted">&gt; agy --scan-collections</p>
            <p className="text-accent-cyan">[INFO] Found 5 content collections with 260 documents.</p>
            <p className="text-accent-cyan">[INFO] Indexing schema structures... OK.</p>
            <p className="text-text-muted">&gt; agy --check-parity</p>
            <p className="text-green-400">[SUCCESS] Route parity checked. 440 static paths compiled cleanly.</p>
            <p className="text-text-muted">&gt; agy --verify-redirects</p>
            <p className="text-accent-purple">[REDIRECT] /sticky-notes/* mapped successfully to /sentiments/.</p>
            <p className="text-[var(--text-primary)] flex items-center gap-1.5 mt-2">
              <span className="w-1.5 h-3 bg-accent-cyan animate-pulse"></span>
              <span>Awaiting telemetry connection hook...</span>
            </p>
          </div>
        </div>

        <p className="leading-relaxed mt-2 text-xs text-text-muted relative z-10">
          This cockpit displays static variables and telemetry mocks. Real-time updates require direct CLI runtime connectivity inside your private workspace environments.
        </p>
      </section>
    </div>
  );
}
