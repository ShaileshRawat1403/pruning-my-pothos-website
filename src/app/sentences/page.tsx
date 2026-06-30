import { allSentences } from "content-collections";
import Link from "next/link";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "Sentences Archive | Sans Serif Systems",
  description: "A chronological archive of short reflections, principles, and writing on systems design.",
  path: "/sentences"
});

export default function SentencesIndexPage() {
  const schema = getWebPageSchema({
    title: "Sentences Archive | Sans Serif Systems",
    description: "A chronological archive of short reflections, principles, and writing on systems design.",
    path: "/sentences"
  });

  return (
    <div className="sentiments-scope relative w-full flex flex-col gap-12 max-w-[800px] mx-auto py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Glow Blobs */}
      <div className="glow-blob glow-purple opacity-10"></div>
      <div className="glow-blob glow-pink opacity-10"></div>

      {/* Page Header */}
      <section className="flex flex-col gap-4 border-b border-[var(--card-border)] pb-8">
        <span className="text-[10px] font-mono font-bold uppercase text-accent-purple tracking-widest self-start">
          WRITING ARCHIVE
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
          Sentences
        </h1>
        <p className="text-text-secondary text-base leading-relaxed">
          Short reflections, decision rules, and principles guiding the development of AI-assisted systems.
        </p>
      </section>

      {allSentences.length === 0 ? (
        <p className="text-text-muted text-sm italic">No sentences archived yet.</p>
      ) : (
        <section className="flex flex-col gap-6">
          {allSentences.map((item) => {
            const slug = item._meta.path;
            return (
              <div key={slug} className="card-glass p-6 flex flex-col gap-3 bg-black/10 hover:border-accent-purple/40 hover:shadow-glow-purple transition-all duration-300">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-accent-cyan uppercase font-bold px-2 py-0.5 rounded bg-accent-cyan/10 border border-accent-cyan/20">
                    {item.category || "Reflection"}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] hover:text-accent-purple transition-colors">
                  <Link href={`/sentences/${slug}`}>{item.title}</Link>
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed italic border-l-2 border-[var(--card-border)] pl-3 py-1">
                  {item.summary}
                </p>
                <Link
                  href={`/sentences/${slug}`}
                  className="text-xs font-semibold text-accent-cyan hover:underline self-start mt-2 cursor-pointer font-mono uppercase tracking-wide"
                >
                  Read &rarr;
                </Link>
              </div>
            );
          })}
        </section>
      )}

      <div className="border-t border-[var(--card-border)] pt-8 mt-4 flex justify-between items-center text-xs font-mono">
        <Link href="/sentiments" className="text-accent-purple hover:underline font-semibold">
          &larr; Back to Sentiments Workspace
        </Link>
      </div>
    </div>
  );
}
