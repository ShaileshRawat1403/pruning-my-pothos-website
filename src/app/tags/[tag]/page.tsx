import { allSystems, allSentences, allSelves, allShelves } from "content-collections";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { slugifyTag } from "../../../lib/tags";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getWebPageSchema } from "../../../lib/seo/jsonld";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  const allTags = new Set<string>();
  const items = [
    ...allSystems.map((item) => item.tags || []),
    ...allSentences.map((item) => item.tags || []),
    ...allSelves.map((item) => item.tags || []),
    ...allShelves.map((item) => item.tags || [])
  ];
  items.forEach((tags) => {
    tags.forEach((tag) => {
      const slug = slugifyTag(tag);
      if (slug) allTags.add(slug);
    });
  });
  return Array.from(allTags).map((t) => ({ tag: t }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  
  // Find if tag matches any slugs
  let matchedLabel = "";
  const items = [
    ...allSystems.map((item) => item.tags || []),
    ...allSentences.map((item) => item.tags || []),
    ...allSelves.map((item) => item.tags || []),
    ...allShelves.map((item) => item.tags || [])
  ];
  items.forEach((tags) => {
    tags.forEach((t) => {
      if (slugifyTag(t) === tag) {
        matchedLabel = t;
      }
    });
  });

  if (!matchedLabel) return {};

  return constructMetadata({
    title: `Tag: #${matchedLabel} | Sans Serif Systems`,
    description: `Browse all articles, essays, and notes tagged with #${matchedLabel}.`,
    path: `/tags/${tag}`,
    noindex: true
  });
}

export default async function TagDetailPage({ params }: PageProps) {
  const { tag } = await params;

  // Search items across all collections
  const systemsMatches = allSystems.filter((item) =>
    (item.tags || []).some((t) => slugifyTag(t) === tag)
  ).map((item) => ({
    title: item.title,
    description: item.description,
    path: `/systems/${item._meta.path}`,
    type: "System Article"
  }));

  const sentencesMatches = allSentences.filter((item) =>
    (item.tags || []).some((t) => slugifyTag(t) === tag)
  ).map((item) => ({
    title: item.title,
    description: item.summary,
    path: `/sentences/${item._meta.path}`,
    type: "Sentence Reflection"
  }));

  const selvesMatches = allSelves.filter((item) =>
    (item.tags || []).some((t) => slugifyTag(t) === tag)
  ).map((item) => ({
    title: item.title,
    description: item.description,
    path: `/self/${item._meta.path}`,
    type: "Self Note"
  }));

  const shelvesMatches = allShelves.filter((item) =>
    (item.tags || []).some((t) => slugifyTag(t) === tag)
  ).map((item) => {
    const slug = item._meta.fileName.replace(/\.mdx?$/, "");
    return {
      title: item.title,
      description: item.description,
      path: `/shelf/${item._meta.directory}/${slug}`,
      type: `Shelf / ${item._meta.directory}`
    };
  });

  const allMatches = [
    ...systemsMatches,
    ...sentencesMatches,
    ...selvesMatches,
    ...shelvesMatches
  ];

  if (allMatches.length === 0) {
    return notFound();
  }

  // Get matching tag title label
  let tagLabel = tag;
  const items = [
    ...allSystems.map((item) => item.tags || []),
    ...allSentences.map((item) => item.tags || []),
    ...allSelves.map((item) => item.tags || []),
    ...allShelves.map((item) => item.tags || [])
  ];
  items.forEach((tags) => {
    tags.forEach((t) => {
      if (slugifyTag(t) === tag) {
        tagLabel = t;
      }
    });
  });

  const schema = getWebPageSchema({
    title: `Tag: #${tagLabel} | Sans Serif Systems`,
    description: `All items tagged with #${tagLabel}.`,
    path: `/tags/${tag}`
  });

  return (
    <div className="sentiments-scope relative w-full flex flex-col gap-12 max-w-[800px] mx-auto py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="flex flex-col gap-4 border-b border-[var(--card-border)] pb-8">
        <span className="text-[10px] font-mono font-bold uppercase text-accent-cyan tracking-widest self-start">
          THEMED MATCH
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
          #{tagLabel}
        </h1>
        <p className="text-text-secondary text-base leading-relaxed">
          Index listing of all {allMatches.length} items tagged with #{tagLabel}.
        </p>
      </section>

      <section className="flex flex-col gap-6">
        {allMatches.map((match, idx) => (
          <div key={idx} className="card-glass p-6 flex flex-col gap-2 bg-black/10">
            <span className="text-[10px] font-mono text-accent-purple uppercase font-bold">
              {match.type}
            </span>
            <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] hover:text-accent-cyan transition-colors">
              <Link href={match.path}>{match.title}</Link>
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              {match.description}
            </p>
            <Link
              href={match.path}
              className="text-xs font-semibold text-accent-cyan hover:underline self-start mt-2 cursor-pointer"
            >
              View item &rarr;
            </Link>
          </div>
        ))}
      </section>

      <div className="border-t border-[var(--card-border)] pt-8 mt-4 flex justify-between items-center text-xs font-mono">
        <Link href="/tags" className="text-accent-cyan hover:underline font-semibold">
          &larr; Back to Tags
        </Link>
      </div>
    </div>
  );
}
