import { allSelves } from "content-collections";
import Link from "next/link";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "Self Calibrations | Sans Serif Systems",
  description: "A chronological archive of personal calibrations, mental models, and reflections.",
  path: "/self"
});

export default function SelvesIndexPage() {
  const schema = getWebPageSchema({
    title: "Self Calibrations | Sans Serif Systems",
    description: "A chronological archive of personal calibrations, mental models, and reflections.",
    path: "/self"
  });

  // Sort by date if available
  const sortedSelves = [...allSelves].sort((a, b) => {
    if (a.publishDate && b.publishDate) {
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    }
    return 0;
  });

  return (
    <div className="sentiments-scope relative w-full flex flex-col gap-12 max-w-[800px] mx-auto py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Glow Blobs */}
      <div className="glow-blob glow-pink opacity-10"></div>
      <div className="glow-blob glow-orange opacity-10"></div>

      {/* Page Header */}
      <section className="flex flex-col gap-4 border-b border-[var(--card-border)] pb-8">
        <span className="text-[10px] font-mono font-bold uppercase text-accent-pink tracking-widest self-start">
          CALIBRATIONS
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
          Self
        </h1>
        <p className="text-text-secondary text-base leading-relaxed">
          Mental models, continuous calibrations, and reflections on navigating systems and design.
        </p>
      </section>

      {sortedSelves.length === 0 ? (
        <p className="text-text-muted text-sm italic">No calibrations archived yet.</p>
      ) : (
        <section className="flex flex-col gap-6">
          {sortedSelves.map((item) => {
            const slug = item._meta.path;
            const publishDateStr = item.publishDate ? new Date(item.publishDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "";
            
            return (
              <div key={slug} className="card-glass p-6 flex flex-col gap-3 bg-black/10 hover:border-accent-pink/40 hover:shadow-[0_0_20px_rgba(255,0,127,0.15)] transition-all duration-300">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] hover:text-accent-pink transition-colors">
                      <Link href={`/self/${slug}`}>{item.title}</Link>
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mt-1">
                      {item.description}
                    </p>
                  </div>
                  {publishDateStr && (
                    <span className="text-[10px] font-mono text-text-muted shrink-0 pt-1">
                      {publishDateStr}
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between items-center mt-2 border-t border-[var(--card-border)] pt-3">
                  <div className="flex gap-2">
                    {item.tags?.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[9px] font-mono uppercase text-accent-pink/80 bg-accent-pink/5 px-2 py-0.5 rounded border border-accent-pink/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/self/${slug}`}
                    className="text-xs font-semibold text-accent-pink hover:underline font-mono uppercase tracking-wide"
                  >
                    Read &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </section>
      )}

      <div className="border-t border-[var(--card-border)] pt-8 mt-4 flex justify-between items-center text-xs font-mono">
        <Link href="/sentiments" className="text-accent-pink hover:underline font-semibold">
          &larr; Back to Sentiments Workspace
        </Link>
      </div>
    </div>
  );
}
