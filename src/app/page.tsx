import Link from "next/link";
import HeroSection from "../components/HeroSection";
import NaturalLanguagePlate from "../components/NaturalLanguagePlate";
import CockpitConsole from "../components/CockpitConsole";
import SpotlightCard from "../components/SpotlightCard";
import { constructMetadata } from "../lib/seo/metadata";
import { getWebsiteSchema, getOrgSchema } from "../lib/seo/jsonld";

export const metadata = constructMetadata({ path: "/" });

const layerCards = [
  {
    tag: "Interactive",
    title: "Browser Sandbox",
    desc: "Run local-first utilities directly in your browser. No install required.",
    href: "#tools-directory",
    cta: "Launch Bench",
    color: "var(--accent-purple)",
  },
  {
    tag: "Architecture",
    title: "System Docs",
    desc: "Read specs, boundaries, and prompt-tuning frameworks.",
    href: "/docs",
    cta: "Read Docs",
    color: "var(--accent-cyan)",
  },
  {
    tag: "Notes",
    title: "Sticky Notes",
    desc: "Quick reflections, logic fragments, and decision rules.",
    href: "/sentences",
    cta: "Read Sentences",
    color: "var(--accent-amber)",
  },
  {
    tag: "Verification",
    title: "Live Ledger",
    desc: "Examine experiment readouts and compilation outputs.",
    href: "/live-lab",
    cta: "Open Ledger",
    color: "var(--accent-green)",
  },
  {
    tag: "Visualizer",
    title: "Loop Canvases",
    desc: "Map workflow pipelines and validation boundaries visually.",
    href: "/canvases",
    cta: "View Canvases",
    color: "var(--accent-pink)",
  },
  {
    tag: "Boundary",
    title: "Public / Private",
    desc: "Configure parameters, host targets, and data safety bounds.",
    href: "/docs/public-private-boundary",
    cta: "Read Specs",
    color: "var(--accent-cyan)",
  },
];

const tools = [
  {
    tag: "Parser",
    title: "Prompt → JSON",
    desc: "Compile loose conversational text into strict structured JSON schemas with test datasets.",
    href: "/tools/prompt-to-json",
  },
  {
    tag: "Visualizer",
    title: "Workflow → Diagram",
    desc: "Convert logic lists or task steps into interactive flowcharts and sequence structures.",
    href: "/tools/workflow-to-diagram",
  },
  {
    tag: "Compressor",
    title: "Repo Context Pack",
    desc: "Pack directory trees into structured text blocks for model context windows.",
    href: "/tools/repo-context-pack",
  },
  {
    tag: "Layout",
    title: "Notes → PDF Brief",
    desc: "Translate messy meeting notes into structured design specification briefs.",
    href: "/tools/notes-to-brief",
  },
  {
    tag: "Validator",
    title: "CSV → Eval Harness",
    desc: "Transform tabular lists into prompt-eval schema blueprints to verify model responses.",
    href: "/tools/csv-to-eval",
  },
  {
    tag: "Synthesizer",
    title: "Change → Checklist",
    desc: "Deconstruct vague feature requests into a step-by-step verification checklist.",
    href: "/tools/change-to-checklist",
  },
];

const stages = [
  { n: "01", title: "Input Parse",       desc: "Fuzzy prose translated into deterministic schemas.", color: "var(--accent-purple)" },
  { n: "02", title: "Compile Blueprints",desc: "Validation models verified client-side before execution.", color: "var(--accent-cyan)" },
  { n: "03", title: "Review Gate",       desc: "Human-in-the-loop checks triggered for every blueprint.", color: "var(--accent-amber)" },
  { n: "04", title: "Execution Hook",    desc: "Offline sandboxed deployment. Direct push denied.", color: "var(--accent-green)" },
];

export default function Home() {
  const websiteSchema = getWebsiteSchema();
  const orgSchema = getOrgSchema();

  return (
    <div className="flex flex-col gap-24 py-4 lg:py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      {/* ── 1. Hero ── */}
      <HeroSection />

      {/* ── 1.5 Natural language → governed contract ── */}
      <div className="animate-on-scroll">
        <NaturalLanguagePlate />
      </div>

      {/* ── 2. Entry Points ── */}
      <section className="flex flex-col gap-8 animate-on-scroll">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
            Navigation
          </span>
          <h2 className="font-heading text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Start with the layer you need
          </h2>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Navigate the systems workspace depending on your current validation objective:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {layerCards.map((card) => (
            <SpotlightCard key={card.href} href={card.href} accent={card.color} className="justify-between">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: card.color }} />
                  <span className="text-[9px] font-mono font-bold uppercase tracking-[0.15em]" style={{ color: card.color }}>
                    {card.tag}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-base" style={{ color: "var(--text-primary)" }}>
                  {card.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {card.desc}
                </p>
              </div>
              <span
                className="text-[11px] font-mono font-semibold mt-5 inline-flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
                style={{ color: card.color }}
              >
                {card.cta} →
              </span>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="section-divider" />

      {/* ── 3. Tools ── */}
      <section id="tools-directory" className="flex flex-col gap-8 scroll-mt-24 animate-on-scroll">
        <div className="flex justify-between items-end flex-wrap gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
              Browser-Native Utilities
            </span>
            <h2 className="font-heading text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
              ToolSmith Utilities
            </h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Run local-first prototyping scripts in your browser. All processing happens sandbox-isolated client-side.
            </p>
          </div>
          <span
            className="px-3 py-1 rounded-full text-[10px] font-mono"
            style={{
              color: "var(--accent-green)",
              background: "color-mix(in srgb, var(--accent-green) 10%, transparent)",
              border: "1px solid color-mix(in srgb, var(--accent-green) 24%, transparent)",
            }}
          >
            ● 6 Active Sandboxes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool, i) => (
            <SpotlightCard
              key={tool.href}
              href={tool.href}
              accent={i % 2 === 0 ? "var(--accent-purple)" : "var(--accent-cyan)"}
              className="justify-between"
            >
              <div className="flex flex-col gap-3">
                <span className="text-[9px] font-mono font-bold uppercase tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>
                  {tool.tag}
                </span>
                <h3 className="font-heading text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                  {tool.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {tool.desc}
                </p>
              </div>
              <span
                className="text-[11px] font-mono font-semibold mt-6 inline-flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
                style={{ color: i % 2 === 0 ? "var(--accent-purple)" : "var(--accent-cyan)" }}
              >
                Open Sandbox →
              </span>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* ── 4. Workflow Loop ── */}
      <section className="flex flex-col gap-8 animate-on-scroll">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
            Validation Framework
          </span>
          <h2 className="font-heading text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Governed Workflow Loop Proof
          </h2>
          <p className="text-sm max-w-xl" style={{ color: "var(--text-secondary)" }}>
            AI-assisted systems should be inspectable before they become operational.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((s, i) => (
            <div
              key={s.n}
              className="relative p-6 rounded-sm flex flex-col gap-3"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderTop: `3px solid ${s.color}`,
              }}
            >
              <span
                className="font-mono text-2xl font-black"
                style={{ color: s.color, opacity: 0.25 }}
              >
                {s.n}
              </span>
              <h3 className="font-heading font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                {s.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {s.desc}
              </p>
              {i < stages.length - 1 && (
                <div
                  className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 text-xs font-mono"
                  style={{ color: "var(--text-muted)" }}
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. What this is / isn't ── */}
      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 animate-on-scroll"
        style={{ borderTop: "1px solid var(--card-border)", borderBottom: "1px solid var(--card-border)" }}
      >
        <div className="flex flex-col gap-5">
          <h3
            className="font-heading font-bold uppercase tracking-wider text-sm flex items-center gap-2"
            style={{ color: "var(--text-primary)" }}
          >
            <span style={{ color: "var(--accent-green)" }}>✓</span> What this is
          </h3>
          <ul className="flex flex-col gap-3">
            {[
              "A public systems bench for governed AI workflows.",
              "A set of browser-native, offline-first helper utilities.",
              "A documentation surface for structural prompt verification.",
              "A proof space for human-in-the-loop validation.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                <span className="mt-0.5 shrink-0" style={{ color: "var(--accent-green)" }}>→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="flex flex-col gap-5 pl-0 md:pl-8"
          style={{ borderLeft: "none" }}
        >
          <h3
            className="font-heading font-bold uppercase tracking-wider text-sm flex items-center gap-2"
            style={{ color: "var(--text-primary)" }}
          >
            <span style={{ color: "var(--accent-pink)" }}>✕</span> What this is not
          </h3>
          <ul className="flex flex-col gap-3">
            {[
              "A commercial SaaS or hosted automation platform.",
              "An autopilot AI execution container running production commands.",
              "A repository of active, published pip install CLI packages.",
              "An advisory, agency, or developer consulting sales funnel.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                <span className="mt-0.5 shrink-0" style={{ color: "var(--accent-pink)" }}>→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 6. Ecosystem Map ── */}
      <section className="flex flex-col gap-8 animate-on-scroll">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
            Architecture Overview
          </span>
          <h2 className="font-heading text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Ecosystem Map
          </h2>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Visualizing the integration layers of the planned offline orchestration stack:
          </p>
        </div>

        <div
          className="p-8 rounded-sm flex justify-center"
          style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
        >
          <div className="w-full max-w-[560px] flex flex-col gap-6 text-center font-mono text-xs">
            {[
              { label: "ToolSmith Bench", sub: "Browser-native sandbox prototyping & validation", status: "Active", color: "var(--accent-purple)", opacity: 1 },
              { label: "ChangeOps Rule System", sub: "Policy checking engine & local review gate hooks", status: "Prototype", color: "var(--accent-cyan)", opacity: 1 },
              { label: "Tessera Orchestrator", sub: "Deterministic offline execution bundles & local runners", status: "Planned", color: "var(--text-muted)", opacity: 0.5 },
            ].map((layer, i) => (
              <div key={layer.label}>
                <div
                  className="p-5 rounded-sm flex flex-col gap-1.5 transition-opacity"
                  style={{
                    background: "var(--bg-elevated)",
                    border: `1px solid ${layer.color}22`,
                    borderTop: `2px solid ${layer.color}`,
                    opacity: layer.opacity,
                  }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-bold uppercase" style={{ color: "var(--text-primary)" }}>
                      {layer.label}
                    </span>
                    <span
                      className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase"
                      style={{ background: `${layer.color}18`, color: layer.color }}
                    >
                      {layer.status}
                    </span>
                  </div>
                  <span style={{ color: "var(--text-muted)" }}>{layer.sub}</span>
                </div>
                {i < 2 && (
                  <div className="flex items-center justify-center my-2" style={{ color: "var(--text-muted)" }}>
                    <span className="text-base">↓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Cockpit Console ── */}
      <section className="flex flex-col gap-6 animate-on-scroll">
        <div className="text-center flex flex-col items-center gap-3">
          <span
            className="px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider"
            style={{
              background: "color-mix(in srgb, var(--accent-cyan) 10%, transparent)",
              border: "1px solid color-mix(in srgb, var(--accent-cyan) 24%, transparent)",
              color: "var(--accent-cyan)",
            }}
          >
            ● Interactive Monitor
          </span>
          <h2 className="font-heading text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Systems Controller Simulator
          </h2>
          <p className="text-sm max-w-lg" style={{ color: "var(--text-secondary)" }}>
            Monitor active validation parameters, compiler blueprint jobs, and content schema checks.
          </p>
        </div>
        <CockpitConsole />
      </section>

      {/* ── 8. Telemetry Roadmap ── */}
      <section className="flex flex-col gap-6 animate-on-scroll">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
            Experiments
          </span>
          <h2 className="font-heading text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Systems Telemetry Roadmap
          </h2>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Chronological ledger of systems experiments, features, and test results:
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { status: "Passed", tag: "EXP-001", title: "Systems SEO Parity Run", desc: "Verified canonical matching headers and robots rules on build outputs.", statusColor: "var(--accent-green)", statusBg: "color-mix(in srgb, var(--accent-green) 12%, transparent)" },
            { status: "Passed", tag: "EXP-002", title: "ChangeOps Rollout Test", desc: "Integrated local policy schema parsing directly into browser sandbox workflows.", statusColor: "var(--accent-green)", statusBg: "color-mix(in srgb, var(--accent-green) 12%, transparent)" },
            { status: "Planned", tag: "EXP-003", title: "Tessera Local Runner Simulation", desc: "Validating structured prompt bundles execution in isolated container instances.", statusColor: "var(--accent-amber)", statusBg: "color-mix(in srgb, var(--accent-amber) 12%, transparent)" },
          ].map((exp) => (
            <div
              key={exp.tag}
              className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 rounded-sm transition-all duration-300"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
              }}
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase"
                    style={{ background: exp.statusBg, color: exp.statusColor }}
                  >
                    {exp.status}
                  </span>
                  <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                    {exp.tag}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                  {exp.title}
                </h3>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  {exp.desc}
                </p>
              </div>
              <Link
                href="/live-lab"
                className="text-xs font-mono font-semibold shrink-0 transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                View Log →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. Final CTA ── */}
      <section
        className="text-center py-16 flex flex-col items-center gap-6 rounded-sm animate-on-scroll"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          borderTop: "2px solid var(--accent-purple)",
        }}
      >
        <div
          className="w-12 h-12 rounded-sm flex items-center justify-center mx-auto"
          style={{ background: "color-mix(in srgb, var(--accent-purple) 14%, transparent)", border: "1px solid color-mix(in srgb, var(--accent-purple) 22%, transparent)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        <h2
          className="font-heading text-3xl font-extrabold tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Ready to construct governed workflows?
        </h2>
        <p className="text-base max-w-md" style={{ color: "var(--text-secondary)" }}>
          Start playing with the browser-native ToolSmith utilities today, or dive deep into our systems architecture documentation.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#tools-directory" className="btn-premium btn-primary">
            Try ToolSmith Bench
          </a>
          <Link href="/docs" className="btn-premium btn-secondary">
            Explore System Docs
          </Link>
        </div>
      </section>
    </div>
  );
}
