import Link from "next/link";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "About Systems | Sans Serif Systems",
  description: "Learn about the thinker, tinkerer, and translator behind Sans Serif Systems, and explore the vision for AI-assisted natural language programming.",
  path: "/about"
});

export default function AboutPage() {
  const schema = getWebPageSchema({
    title: "About Systems | Sans Serif Systems",
    description: "Learn about the thinker, tinkerer, and translator behind Sans Serif Systems, and explore the vision for AI-assisted natural language programming.",
    path: "/about"
  });

  return (
    <div className="relative w-full flex flex-col gap-12 max-w-[1100px] mx-auto py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Page Header */}
      <section className="card-glass p-8 flex flex-col gap-4 border-accent-cyan/20 bg-black/40 shadow-premium relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        <div className="flex items-center gap-2 relative z-10">
          <span className="px-2.5 py-0.5 rounded bg-accent-cyan/15 border border-accent-cyan/30 text-accent-cyan font-mono text-[9px] font-bold uppercase tracking-wider">
            THE BUILDER
          </span>
          <span className="text-[10px] font-mono text-text-muted">CREDENTIALS // PHILOSOPHY</span>
        </div>
        
        <h1 className="font-heading text-4xl font-extrabold text-[var(--text-primary)] tracking-tight relative z-10 leading-tight">
          About Sans Serif Systems
        </h1>
        <p className="text-text-secondary text-base leading-relaxed max-w-[700px] relative z-10">
          Thinker. Tinkerer. Translator. Deconstructing prompt context, eval loops, and workflow execution states.
        </p>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Bio Left: Victorian Mahogany panel */}
        <div className="lg:col-span-8 card-glass p-6 sm:p-8 flex flex-col gap-6 bg-black/35 text-sm text-text-secondary leading-relaxed border-t-4 border-amber-800 hover:shadow-glow-purple-hover transition-all duration-300">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">The Philosophy</h2>
            <span className="text-[9px] font-mono text-text-muted">EST. 2026 // PUBLIC_PLATFORM</span>
          </div>
          
          <p>
            Hi, I&apos;m Shailesh Rawat. Sans Serif Systems is a public platform for open tools, workflow canvases, and governed AI-assisted development patterns.
          </p>
          <p>
            The goal is not to ship another prompt library. The goal is to make AI-assisted work inspectable, repeatable, and safer to use.
          </p>
          <p>
            To support this, some of the utilities hosted in the workshop are client-side browser-native tools, while others are local CLI prototypes or public slices of a larger private operating model.
          </p>

          <div className="relative group overflow-hidden rounded-xl border border-white/5 bg-black/40 shadow-premium max-w-[480px] mx-auto mt-4">
            <img 
              src="/images/aristotle-coder.jpg" 
              alt="Aristotle wearer of cyber glasses, coding terminal formulas" 
              className="w-full h-auto object-cover opacity-80 group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute bottom-2.5 left-2.5 right-2.5 card-glass p-2.5 z-20 bg-black/75 border-white/5 text-center">
              <span className="text-[9px] font-mono text-accent-cyan font-bold tracking-widest uppercase">THE COGNITIVE ARCHITECT</span>
              <p className="text-[10px] font-mono text-text-secondary mt-0.5">&quot;All men by nature desire to know.&quot; — Aristotle</p>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-4 mt-2">
            <p>
              If you&apos;re looking for my legacy writing archive, you can find it at:{" "}
              <Link href="/sentiments" className="text-accent-cyan hover:underline font-semibold font-mono">
                /sentiments
              </Link>.
            </p>
          </div>
        </div>

        {/* Stats Right: Cyber stacked panels */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="card-glass p-5 flex flex-col gap-3 bg-black/35 border-t-4 border-accent-cyan hover:-translate-y-1 transition-all duration-300 shadow-glow-cyan-hover">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan"></span>
              <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">Ecosystem Boundary</h3>
            </div>
            <p className="text-text-secondary text-xs leading-relaxed">
              Public tools are built client-side or distributed for local-first developer setups. Runtimes requiring codebase indexing remain secure and private.
            </p>
          </div>

          <div className="card-glass p-5 flex flex-col gap-3 bg-black/35 border-t-4 border-accent-pink hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-pink"></span>
              <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">Contact Info</h3>
            </div>
            <p className="text-text-secondary text-xs leading-relaxed">
              Feel free to connect regarding systems design, testing structures, or workflow engineering.
            </p>
            <a href="mailto:shailesh.rawat1403@gmail.com" className="text-accent-pink hover:underline font-semibold font-mono text-xs mt-1 block">
              shailesh.rawat1403@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
