import Link from "next/link";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "Documentation & Guides",
  description: "Access reference documentations, design specs, loop architecture layers, and tool status definitions.",
  path: "/docs"
});

export default function DocsIntroPage() {
  const schema = getWebPageSchema({
    title: "Documentation & Guides | Sans Serif Systems",
    description: "Access reference documentations, design specs, loop architecture layers, and tool status definitions.",
    path: "/docs"
  });

  return (
    <div className="flex flex-col gap-8 w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Page Header */}
      <section className="flex flex-col gap-3 py-4 border-b border-[var(--card-border)]">
        <span className="inline-flex self-start px-2.5 py-0.5 rounded-full border border-accent-cyan/25 bg-accent-cyan/10 text-[10px] font-mono font-bold tracking-wider text-accent-cyan uppercase">
          KNOWLEDGE SYSTEM
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
          Documentation & Architecture
        </h1>
        <p className="text-text-secondary text-sm leading-relaxed max-w-[700px]">
          Explore the frameworks, execution loops, public-private boundaries, and prototype roadmaps for AI-assisted natural language programming.
        </p>
      </section>

      {/* Main Content card */}
      <div className="card-glass p-6 sm:p-8 flex flex-col gap-8 bg-black/10">
        <section className="flex flex-col gap-4">
          <h2 className="font-heading text-xl font-bold text-[var(--text-primary)]">Introduction</h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            Sans Serif Systems is a solo-builder systems laboratory and utility bench dedicated to making AI-assisted developer operations predictable, verifiable, and secure.
          </p>
          <p className="text-text-secondary text-sm leading-relaxed">
            Our development philosophy rejects raw, ad-hoc, untracked prompt snippets in favor of formal execution loops, structured interfaces, and strict build ledgers.
          </p>
        </section>

        {/* Three Operational Pillars */}
        <section className="flex flex-col gap-4">
          <h3 className="font-heading text-base font-bold text-[var(--text-primary)]">Three Operational Pillars</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-[var(--card-border)] p-5 rounded-lg bg-white/[0.01]">
              <h4 className="font-heading text-accent-cyan font-semibold text-sm mb-2">1. Bounded Autonomy</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Limiting agent action spaces using declarative runtime schemas rather than raw system instructions.
              </p>
            </div>
            <div className="border border-[var(--card-border)] p-5 rounded-lg bg-white/[0.01]">
              <h4 className="font-heading text-accent-purple font-semibold text-sm mb-2">2. Proof of Evidence</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Logging verification output checks to an immutable local ledger before promoting files to main.
              </p>
            </div>
            <div className="border border-[var(--card-border)] p-5 rounded-lg bg-white/[0.01]">
              <h4 className="font-heading text-accent-orange font-semibold text-sm mb-2">3. Local-First Execution</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Enforcing local-first schemas, local tokenizers, and sandbox executions before hitting external networks.
              </p>
            </div>
          </div>
        </section>

        {/* Next step link */}
        <section className="border-t border-[var(--card-border)] pt-6 mt-2">
          <h4 className="font-heading text-sm font-semibold text-[var(--text-primary)] mb-2">Explore the Systems Docs</h4>
          <p className="text-text-secondary text-sm">
            Select a guide from the sidebar or get started directly by reading about the{" "}
            <Link href="/docs/natural-language-programming-stack" className="text-accent-cyan hover:underline font-semibold">
              Natural Language Programming Stack &rarr;
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
