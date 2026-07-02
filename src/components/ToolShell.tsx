import Link from "next/link";

interface ToolShellProps {
  eyebrow: string;
  title: string;
  intro: string;
  accent: string;
  /** PyPI distribution, e.g. "tesserakit-dockerfile" */
  pack: string;
  /** one line describing what the full pack does */
  packBlurb: string;
  children: React.ReactNode;
}

/** Shared frame for a Stack tool: breadcrumb, hero, the tool, and the Tessera tie-in. */
export default function ToolShell({ eyebrow, title, intro, accent, pack, packBlurb, children }: ToolShellProps) {
  return (
    <div className="relative w-full flex flex-col gap-12 max-w-[1100px] mx-auto py-12">
      <div className="font-mono text-xs flex gap-2" style={{ color: "var(--text-muted)" }}>
        <Link href="/tools" className="link-slide" style={{ color: "var(--text-secondary)" }}>Stack</Link>
        <span>/</span>
        <span style={{ color: "var(--text-primary)" }}>{title}</span>
      </div>

      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="h-px w-8" style={{ background: accent }} />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>{eyebrow}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--text-primary)" }}>{title}</h1>
        <p className="text-base leading-relaxed max-w-[700px]" style={{ color: "var(--text-secondary)" }}>{intro}</p>
      </section>

      {children}

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t pt-12" style={{ borderColor: "var(--card-border)" }}>
        <div className="lg:col-span-7 flex flex-col gap-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          <h2 className="font-heading text-xl font-bold" style={{ color: "var(--text-primary)" }}>A preview of a Tessera pack</h2>
          <p>
            This browser demo runs a handful of checks client-side. {packBlurb} It is one of 24 job packs in
            Tessera, an offline toolkit that turns a repository into a single reviewable HTML report.
          </p>
          <p>Every pack follows one contract: normalize, validate, generate artifacts. No services, no API keys, no network calls, nothing executed against your code.</p>
        </div>
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="ledger-surface p-5 font-mono text-xs" style={{ borderRadius: "4px" }}>
            <div className="flex items-center justify-between pb-3 mb-3" style={{ borderBottom: "1px solid var(--card-border)", color: "var(--text-muted)" }}>
              <span>install.tty</span>
              <span style={{ color: "var(--accent-green)" }}>offline</span>
            </div>
            <p style={{ color: "var(--text-secondary)" }}><span style={{ color: "var(--accent-green)" }}>$ </span>pip install {pack}</p>
            <p className="mt-2" style={{ color: "var(--text-secondary)" }}><span style={{ color: "var(--accent-green)" }}>$ </span>tessera run --input . --output run</p>
            <p className="mt-2" style={{ color: "var(--text-muted)" }}># then open run/index.html</p>
          </div>
          <a href="https://github.com/ShaileshRawat1403/tessera" target="_blank" rel="noopener noreferrer" className="btn-premium btn-secondary text-center">
            See Tessera on GitHub &rarr;
          </a>
        </div>
      </section>
    </div>
  );
}
