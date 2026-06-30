import Link from "next/link";
import CockpitConsole from "../components/CockpitConsole";
import { constructMetadata } from "../lib/seo/metadata";
import { getWebsiteSchema, getOrgSchema } from "../lib/seo/jsonld";

export const metadata = constructMetadata({
  path: "/"
});

export default function Home() {
  const websiteSchema = getWebsiteSchema();
  const orgSchema = getOrgSchema();

  return (
    <div className="flex flex-col gap-16 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      {/* 1. Hero: Sans Serif Systems Lab */}
      <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 pt-8 pb-12">
        <div className="flex-1 flex flex-col gap-6 text-left">
          <span className="inline-flex self-start px-3 py-1 border border-accent-cyan/30 rounded-full text-xs font-heading font-semibold text-accent-cyan bg-accent-cyan/5">
            A Transition That Actually Sticks!
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-[var(--text-primary)]">
            Become an<br />
            <span className="gradient-text">AI-First Architect</span>
          </h1>
          <div className="text-xs font-mono text-text-secondary tracking-wide uppercase border-l-2 border-accent-cyan/45 pl-3 py-1 bg-white/[0.01]">
            Build Governed Workflows | Design Loop Schemas | Verify Prompts
          </div>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-[540px]">
            Convert fuzzy model prompts and workflows into inspectable, governed execution schemas. Run browser-native validation utilities now.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <a href="#tools-directory" className="btn-premium btn-primary shadow-glow-cyan text-sm py-3 px-6 rounded-lg font-bold transition-all hover:scale-[1.02]">
              Explore ToolSmith Bench
            </a>
            <Link href="/sentiments" className="btn-premium btn-secondary text-sm py-3 px-6 rounded-lg font-bold transition-all hover:scale-[1.02]">
              Enter Sentiments Garden
            </Link>
          </div>
        </div>

        {/* 2. Hacker-Victorian Hero Image Presentation Card */}
        <div className="w-full lg:w-[48%] flex flex-col gap-4">
          <div className="relative group overflow-hidden rounded-2xl border border-[var(--card-border)] bg-black/40 shadow-premium">
            {/* Glossy overlay sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/10 via-transparent to-accent-purple/10 pointer-events-none z-10" />
            
            {/* High-res visual image */}
            <img 
              src="/images/ada-lovelace-hero.jpg" 
              alt="Hacker-Victorian Ada Lovelace serving telemetry" 
              className="w-full h-auto object-cover aspect-[4/3] opacity-85 group-hover:scale-[1.02] transition-transform duration-700"
            />

            {/* Floating Glassmorphism telemetry overlay */}
            <div className="absolute bottom-4 left-4 right-4 card-glass p-4 z-20 flex justify-between items-center bg-black/60 border-accent-cyan/20">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-mono text-accent-cyan font-bold tracking-widest uppercase">SYSTEMS PLAYGROUND</span>
                <span className="text-xs font-bold text-[var(--text-primary)]">Launch Sandbox ToolSmith Bench</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-accent-cyan/20 border border-accent-cyan/30 text-accent-cyan font-mono text-[9px] font-bold uppercase tracking-wider">
                ACTIVE
              </span>
            </div>

            {/* Coding Knowledge Required Badge */}
            <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-white/80 font-mono text-[9px] font-bold flex items-center gap-1.5 z-20">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-pink animate-ping"></span>
              Coding Knowledge Required
            </div>
          </div>
          
          {/* Sub-panel telemetry metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card-glass p-3 bg-black/25 flex flex-col justify-center border-[var(--card-border)]">
              <span className="text-[10px] text-text-muted uppercase">Interactive Sandboxes</span>
              <span className="text-sm font-bold text-accent-cyan mt-0.5">6 Active</span>
            </div>
            <div className="card-glass p-3 bg-black/25 flex flex-col justify-center border-[var(--card-border)]">
              <span className="text-[10px] text-text-muted uppercase">Security Reviews</span>
              <span className="text-sm font-bold text-accent-purple mt-0.5">Human Required</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Start with the layer you need */}
      <section className="w-full max-w-[950px] mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="font-heading text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Start with the layer you need
          </h3>
          <p className="text-sm text-text-secondary max-w-[600px]">
            Navigate the systems workspace depending on your current validation objective:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="card-glass p-5 flex flex-col justify-between hover:border-accent-cyan/40 hover:shadow-glow-cyan transition-all duration-300">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-accent-cyan uppercase tracking-wider font-bold">Interactive</span>
              <h5 className="font-heading font-bold text-sm text-[var(--text-primary)]">Browser Sandbox</h5>
              <p className="text-xs text-text-secondary leading-relaxed">Run local-first utilities directly in your browser.</p>
            </div>
            <Link href="#tools-directory" className="text-xs font-mono text-accent-cyan hover:underline mt-4 inline-flex items-center gap-1 font-semibold">
              Launch Bench &rarr;
            </Link>
          </div>

          <div className="card-glass p-5 flex flex-col justify-between hover:border-accent-purple/40 hover:shadow-glow-purple transition-all duration-300">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-accent-purple uppercase tracking-wider font-bold">Architecture</span>
              <h5 className="font-heading font-bold text-sm text-[var(--text-primary)]">System Docs</h5>
              <p className="text-xs text-text-secondary leading-relaxed">Read specs, boundaries, and prompt-tuning frameworks.</p>
            </div>
            <Link href="/docs" className="text-xs font-mono text-accent-purple hover:underline mt-4 inline-flex items-center gap-1 font-semibold">
              Read Docs &rarr;
            </Link>
          </div>

          <div className="card-glass p-5 flex flex-col justify-between hover:border-accent-pink/40 hover:shadow-[0_0_20px_rgba(255,0,127,0.15)] transition-all duration-300">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-accent-pink uppercase tracking-wider font-bold">Verification</span>
              <h5 className="font-heading font-bold text-sm text-[var(--text-primary)]">Live Ledger</h5>
              <p className="text-xs text-text-secondary leading-relaxed">Examine experiment readouts and compilation outputs.</p>
            </div>
            <Link href="/live-lab" className="text-xs font-mono text-accent-pink hover:underline mt-4 inline-flex items-center gap-1 font-semibold">
              Open Ledger &rarr;
            </Link>
          </div>

          <div className="card-glass p-5 flex flex-col justify-between hover:border-accent-orange/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-all duration-300">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-accent-orange uppercase tracking-wider font-bold">Visualizer</span>
              <h5 className="font-heading font-bold text-sm text-[var(--text-primary)]">Loop Canvases</h5>
              <p className="text-xs text-text-secondary leading-relaxed">Map workflow pipelines and validation boundaries.</p>
            </div>
            <Link href="/canvases" className="text-xs font-mono text-accent-orange hover:underline mt-4 inline-flex items-center gap-1 font-semibold">
              View Canvases &rarr;
            </Link>
          </div>

          <div className="card-glass p-5 flex flex-col justify-between hover:border-accent-cyan/40 hover:shadow-glow-cyan transition-all duration-300">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-accent-cyan uppercase tracking-wider font-bold">Boundary</span>
              <h5 className="font-heading font-bold text-sm text-[var(--text-primary)]">Public / Private</h5>
              <p className="text-xs text-text-secondary leading-relaxed">Configure parameters, host targets, and data safety bounds.</p>
            </div>
            <Link href="/docs/public-private-boundary" className="text-xs font-mono text-accent-cyan hover:underline mt-4 inline-flex items-center gap-1 font-semibold">
              Explore Limits &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 4. ToolSmith utilities */}
      <section id="tools-directory" className="w-full max-w-[950px] mx-auto flex flex-col gap-8 scroll-mt-24">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end flex-wrap gap-4">
            <div>
              <h3 className="font-heading text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                ToolSmith Utilities
              </h3>
              <p className="text-sm text-text-secondary max-w-[600px] mt-1">
                Run local-first prototyping scripts directly in your browser. All processing happens sandbox-isolated client-side.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full border border-[var(--card-border)] bg-black/25 text-xs font-mono text-text-muted">
              6 Active Sandboxes
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="card-glass p-5 flex flex-col justify-between hover:border-accent-cyan/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono text-accent-cyan uppercase tracking-wider font-semibold">Parser</span>
              <h4 className="font-heading text-lg font-bold text-[var(--text-primary)]">Prompt ➔ JSON</h4>
              <p className="text-sm text-text-secondary">
                Compile loose conversational text requests into strict structured JSON schemas with test datasets.
              </p>
            </div>
            <Link href="/tools/prompt-to-json" className="text-xs font-mono text-accent-cyan hover:underline mt-6 inline-block font-semibold">
              Open Sandbox &rarr;
            </Link>
          </div>

          {/* Card 2 */}
          <div className="card-glass p-5 flex flex-col justify-between hover:border-accent-cyan/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono text-accent-cyan uppercase tracking-wider font-semibold">Visualizer</span>
              <h4 className="font-heading text-lg font-bold text-[var(--text-primary)]">Workflow ➔ Diagram</h4>
              <p className="text-sm text-text-secondary">
                Convert logic lists or task steps into interactive flowcharts, flow maps, or sequence structures.
              </p>
            </div>
            <Link href="/tools/workflow-to-diagram" className="text-xs font-mono text-accent-cyan hover:underline mt-6 inline-block font-semibold">
              Open Sandbox &rarr;
            </Link>
          </div>

          {/* Card 3 */}
          <div className="card-glass p-5 flex flex-col justify-between hover:border-accent-cyan/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono text-accent-cyan uppercase tracking-wider font-semibold">Compressor</span>
              <h4 className="font-heading text-lg font-bold text-[var(--text-primary)]">Repo Context Pack</h4>
              <p className="text-sm text-text-secondary">
                Pack directory trees and files into structured text blocks for ingestion by model context windows.
              </p>
            </div>
            <Link href="/tools/repo-context-pack" className="text-xs font-mono text-accent-cyan hover:underline mt-6 inline-block font-semibold">
              Open Sandbox &rarr;
            </Link>
          </div>

          {/* Card 4 */}
          <div className="card-glass p-5 flex flex-col justify-between hover:border-accent-cyan/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono text-accent-cyan uppercase tracking-wider font-semibold">Layout</span>
              <h4 className="font-heading text-lg font-bold text-[var(--text-primary)]">Notes ➔ PDF Brief</h4>
              <p className="text-sm text-text-secondary">
                Translate quick, messy meeting notes or voice outputs into structured design specification briefs.
              </p>
            </div>
            <Link href="/tools/notes-to-brief" className="text-xs font-mono text-accent-cyan hover:underline mt-6 inline-block font-semibold">
              Open Sandbox &rarr;
            </Link>
          </div>

          {/* Card 5 */}
          <div className="card-glass p-5 flex flex-col justify-between hover:border-accent-cyan/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono text-accent-cyan uppercase tracking-wider font-semibold">Validator</span>
              <h4 className="font-heading text-lg font-bold text-[var(--text-primary)]">CSV ➔ Eval Harness</h4>
              <p className="text-sm text-text-secondary">
                Transform plain tabular lists into structured prompt-eval schema blueprints to verify model responses.
              </p>
            </div>
            <Link href="/tools/csv-to-eval" className="text-xs font-mono text-accent-cyan hover:underline mt-6 inline-block font-semibold">
              Open Sandbox &rarr;
            </Link>
          </div>

          {/* Card 6 */}
          <div className="card-glass p-5 flex flex-col justify-between hover:border-accent-cyan/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono text-accent-cyan uppercase tracking-wider font-semibold">Synthesizer</span>
              <h4 className="font-heading text-lg font-bold text-[var(--text-primary)]">Change ➔ Checklist</h4>
              <p className="text-sm text-text-secondary">
                Deconstruct vague feature request specifications into a step-by-step verification checklist layout.
              </p>
            </div>
            <Link href="/tools/change-to-checklist" className="text-xs font-mono text-accent-cyan hover:underline mt-6 inline-block font-semibold">
              Open Sandbox &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Governed workflow proof strip */}
      <section className="w-full max-w-[950px] mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="font-heading text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Governed Workflow Loop Proof
          </h3>
          <p className="text-sm text-text-secondary max-w-[600px]">
            AI-assisted systems should be inspectable before they become operational. The Sans Serif validation loop:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card-glass p-4 border-l-4 border-accent-cyan bg-black/15">
            <div className="font-mono text-xs text-accent-cyan font-bold mb-1">STAGE 1</div>
            <h5 className="font-heading font-bold text-sm text-[var(--text-primary)]">Input Parse</h5>
            <p className="text-xs text-text-secondary mt-1">
              Fuzzy prose translated into deterministic schemas.
            </p>
          </div>
          <div className="card-glass p-4 border-l-4 border-accent-purple bg-black/15">
            <div className="font-mono text-xs text-accent-purple font-bold mb-1">STAGE 2</div>
            <h5 className="font-heading font-bold text-sm text-[var(--text-primary)]">Compile Blueprints</h5>
            <p className="text-xs text-text-secondary mt-1">
              Validation models verified client-side before execution.
            </p>
          </div>
          <div className="card-glass p-4 border-l-4 border-accent-pink bg-black/15">
            <div className="font-mono text-xs text-accent-pink font-bold mb-1">STAGE 3</div>
            <h5 className="font-heading font-bold text-sm text-[var(--text-primary)]">Review Gate</h5>
            <p className="text-xs text-text-secondary mt-1">
              Human-in-the-loop checks triggered for every blueprint.
            </p>
          </div>
          <div className="card-glass p-4 border-l-4 border-accent-orange bg-black/15">
            <div className="font-mono text-xs text-accent-orange font-bold mb-1">STAGE 4</div>
            <h5 className="font-heading font-bold text-sm text-[var(--text-primary)]">Execution Hook</h5>
            <p className="text-xs text-text-secondary mt-1">
              Offline sandboxed deployment (Direct push denied).
            </p>
          </div>
        </div>
      </section>

      {/* 6. What this is / is not */}
      <section className="w-full max-w-[950px] mx-auto flex flex-col md:grid md:grid-cols-2 gap-8 border-y border-[var(--card-border)] py-12">
        <div className="flex flex-col gap-4">
          <h4 className="font-heading text-lg font-bold text-accent-cyan uppercase tracking-wider">What this is</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-text-secondary pl-4 list-disc">
            <li>A public systems lab for governed AI workflows.</li>
            <li>A set of browser-native, offline-first helper utilities.</li>
            <li>A documentation surface for structural prompt verification patterns.</li>
            <li>A proof space for human-in-the-loop validation configurations.</li>
          </ul>
        </div>
        
        <div className="flex flex-col gap-4 border-t md:border-t-0 md:border-l border-[var(--card-border)] pt-8 md:pt-0 md:pl-8">
          <h4 className="font-heading text-lg font-bold text-accent-pink uppercase tracking-wider">What this is not</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-text-secondary pl-4 list-disc">
            <li>A commercial SaaS or hosted automation platform.</li>
            <li>An autopilot AI execution container running production commands.</li>
            <li>A repository of active, published pip install CLI packages.</li>
            <li>An advisory, agency, or developer consulting sales funnel.</li>
          </ul>
        </div>
      </section>

      {/* 7. Ecosystem map */}
      <section className="w-full max-w-[950px] mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="font-heading text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Ecosystem Map
          </h3>
          <p className="text-sm text-text-secondary max-w-[600px]">
            Visualizing the integration layers of our planned offline orchestration stack:
          </p>
        </div>

        <div className="card-glass p-8 flex justify-center items-center bg-black/15">
          <div className="w-full max-w-[600px] flex flex-col gap-8 text-center font-mono text-xs">
            {/* Top Layer */}
            <div className="border border-accent-cyan/35 rounded bg-accent-cyan/5 p-4 flex flex-col gap-1 shadow-glow-cyan">
              <span className="font-bold text-[var(--text-primary)] uppercase">ToolSmith Bench (Active)</span>
              <span className="text-[10px] text-text-secondary">Browser-native sandbox prototyping & validation</span>
            </div>

            {/* Down Arrow */}
            <div className="text-accent-purple font-bold">&darr; compiles to</div>

            {/* Middle Layer */}
            <div className="border border-accent-purple/35 rounded bg-accent-purple/5 p-4 flex flex-col gap-1 shadow-glow-purple">
              <span className="font-bold text-[var(--text-primary)] uppercase">ChangeOps Rule System (Prototype)</span>
              <span className="text-[10px] text-text-secondary">Policy checking engine & local review gate hooks</span>
            </div>

            {/* Down Arrow */}
            <div className="text-accent-orange font-bold">&darr; wires execution</div>

            {/* Bottom Layer */}
            <div className="border border-accent-orange/35 rounded bg-accent-orange/5 p-4 flex flex-col gap-1 opacity-70">
              <span className="font-bold text-[var(--text-primary)] uppercase">Tessera Orchestrator (Planned)</span>
              <span className="text-[10px] text-text-secondary">Deterministic offline execution bundles & local runners</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Live Lab roadmap */}
      <section className="w-full max-w-[950px] mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="font-heading text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Live Lab Roadmap
          </h3>
          <p className="text-sm text-text-secondary max-w-[600px]">
            Follow the chronological ledger of systems experiments, features, and test results:
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="card-glass p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-black/10">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 font-mono text-[10px] uppercase font-bold">Passed</span>
                <span className="font-mono text-xs text-text-muted">EXP-001</span>
              </div>
              <h5 className="font-heading font-bold text-sm text-[var(--text-primary)]">Systems SEO Parity Run</h5>
              <p className="text-xs text-text-secondary mt-1">Verified canonical matching headers and robots rules on build outputs.</p>
            </div>
            <Link href="/live-lab" className="text-xs font-mono text-accent-cyan hover:underline font-semibold shrink-0">
              View Log &rarr;
            </Link>
          </div>

          <div className="card-glass p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-black/10">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 font-mono text-[10px] uppercase font-bold">Passed</span>
                <span className="font-mono text-xs text-text-muted">EXP-002</span>
              </div>
              <h5 className="font-heading font-bold text-sm text-[var(--text-primary)]">ChangeOps Rollout Test</h5>
              <p className="text-xs text-text-secondary mt-1">Integrated local policy schema parsing directly into browser sandbox workflows.</p>
            </div>
            <Link href="/live-lab" className="text-xs font-mono text-accent-cyan hover:underline font-semibold shrink-0">
              View Log &rarr;
            </Link>
          </div>

          <div className="card-glass p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-black/10 opacity-70">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-accent-orange/20 text-accent-orange font-mono text-[10px] uppercase font-bold">Planned</span>
                <span className="font-mono text-xs text-text-muted">EXP-003</span>
              </div>
              <h5 className="font-heading font-bold text-sm text-[var(--text-primary)]">Tessera Local Runner Simulation</h5>
              <p className="text-xs text-text-secondary mt-1">Validating structured prompt bundles execution in isolated container instances.</p>
            </div>
            <span className="text-xs font-mono text-text-muted shrink-0 font-semibold">Q3 2026</span>
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="w-full max-w-[950px] mx-auto text-center py-12 border-t border-[var(--card-border)] mt-8 flex flex-col items-center gap-6">
        <h3 className="font-heading text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
          Ready to construct governed workflows?
        </h3>
        <p className="text-base text-text-secondary max-w-[500px]">
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
