import { allSystems, allSentences, allSelves, allShelves } from "content-collections";
import Link from "next/link";
import { slugifyTag } from "../../lib/tags";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "Tags | A Thinking Workspace",
  description: "Browse all themes across systems, sentences, self, and shelf collections.",
  path: "/tags",
  noindex: true
});

export default function TagsIndexPage() {
  const schema = getWebPageSchema({
    title: "Tags | A Thinking Workspace",
    description: "Browse all themes across systems, sentences, self, and shelf collections.",
    path: "/tags"
  });

  // Collect all items across collections
  const allItems = [
    ...allSystems.map((item) => ({ tags: item.tags || [] })),
    ...allSentences.map((item) => ({ tags: item.tags || [] })),
    ...allSelves.map((item) => ({ tags: item.tags || [] })),
    ...allShelves.map((item) => ({ tags: item.tags || [] }))
  ];

  const tagMap = new Map<string, { label: string; count: number }>();
  
  allItems.forEach((entry) => {
    entry.tags.forEach((tag) => {
      const slug = slugifyTag(tag);
      if (!slug) return;
      const current = tagMap.get(slug);
      if (current) {
        current.count += 1;
      } else {
        tagMap.set(slug, { label: tag, count: 1 });
      }
    });
  });

  const sortedTags = Array.from(tagMap.entries())
    .map(([slug, data]) => ({ slug, ...data }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

  return (
    <div className="sentiments-scope relative w-full flex flex-col gap-12 max-w-[800px] mx-auto py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="flex flex-col gap-4 border-b border-[var(--card-border)] pb-8">
        <span className="text-[10px] font-mono font-bold uppercase text-accent-purple tracking-widest self-start">
          EXPLORE INDEX
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
          Tags
        </h1>
        <p className="text-text-secondary text-base leading-relaxed">
          Explore the thinking workspace by theme instead of sections.
        </p>
      </section>

      <section className="flex flex-wrap gap-3">
        {sortedTags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/tags/${tag.slug}`}
            className="px-4 py-1.5 border border-[var(--card-border)] bg-black/10 rounded-full text-xs font-mono text-text-secondary hover:border-accent-purple/40 hover:text-[var(--text-primary)] transition-all flex items-center gap-1.5"
          >
            #{tag.label} <span className="text-[10px] text-text-muted">({tag.count})</span>
          </Link>
        ))}
      </section>

      <div className="border-t border-[var(--card-border)] pt-8 mt-4 flex justify-between items-center text-xs font-mono">
        <Link href="/" className="text-accent-purple hover:underline font-semibold">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
