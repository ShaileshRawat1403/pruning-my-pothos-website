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
      {/* Glow Blobs */}
      <div className="glow-blob glow-cyan opacity-10"></div>
      <div className="glow-blob glow-purple opacity-10"></div>

      {/* Page Header */}
      <section className="flex flex-col gap-2">
        <span className="inline-flex self-start px-2.5 py-0.5 rounded-full border border-accent-cyan/25 bg-accent-cyan/10 text-[10px] font-mono font-bold tracking-wider text-accent-cyan uppercase">
          THE BUILDER
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
          About Sans Serif Systems
        </h1>
        <p className="text-text-secondary text-base leading-relaxed max-w-[700px]">
          Thinker. Tinkerer. Translator. Deconstructing prompt context, eval loops, and workflow execution states.
        </p>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Bio Left */}
        <div className="lg:col-span-8 card-glass p-6 sm:p-8 flex flex-col gap-5 bg-black/10 text-sm text-text-secondary leading-relaxed">
          <h2 className="font-heading text-xl font-bold text-[var(--text-primary)]">The Philosophy</h2>
          <p>
            Hi, I'm Shailesh Rawat. Sans Serif Systems is a public lab for open tools, workflow canvases, and governed AI-assisted development patterns.
          </p>
          <p>
            The goal is not to ship another prompt library. The goal is to make AI-assisted work inspectable, repeatable, and safer to use.
          </p>
          <p>
            To support this, some of the utilities hosted in the workshop are client-side browser-native tools, while others are local CLI prototypes or public slices of a larger private operating model.
          </p>
          <p>
            If you're looking for my legacy writing garden or poetic archive, you can find them at:{" "}
            <Link href="/sentiments/" className="text-accent-cyan hover:underline font-semibold">
              /sentiments
            </Link>.
          </p>
        </div>

        {/* Stats Right */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="card-glass p-5 flex flex-col gap-4 bg-black/10 text-xs">
            <h3 className="font-heading font-bold uppercase tracking-wider text-[var(--text-primary)]">Ecosystem Boundary</h3>
            <p className="text-text-secondary leading-relaxed">
              Public tools are built client-side or distributed for local-first developer setups. Runtimes requiring codebase indexing remain secure and private.
            </p>
          </div>

          <div className="card-glass p-5 flex flex-col gap-4 bg-black/10 text-xs">
            <h3 className="font-heading font-bold uppercase tracking-wider text-[var(--text-primary)]">Contact Info</h3>
            <p className="text-text-secondary leading-relaxed">
              Feel free to connect regarding systems design, testing structures, or workflow engineering.
            </p>
            <a href="mailto:shailesh.rawat1403@gmail.com" className="text-accent-cyan hover:underline font-semibold">
              shailesh.rawat1403@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
