import { allSystems, allSentences, allSelves, allShelves } from "content-collections";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import SpotlightCard from "../../../components/SpotlightCard";
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
    title: `Tag: #${matchedLabel}`,
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
    <div className="relative w-full flex flex-col gap-16 max-w-[800px] mx-auto py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="flex flex-col gap-4 border-b pb-8" style={{ borderColor: "var(--card-border)" }}>
        <div className="flex items-center gap-2">
          <span className="h-px w-8" style={{ background: "var(--accent-purple)" }} />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
            Themed Match
          </span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--text-primary)" }}>
          #{tagLabel}
        </h1>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Index listing of all {allMatches.length} items tagged with #{tagLabel}.
        </p>
      </section>

      <section className="flex flex-col gap-6">
        {allMatches.map((match, idx) => (
          <SpotlightCard key={idx} href={match.path} accent="var(--accent-purple)" className="gap-2">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider" style={{ color: "var(--accent-purple)" }}>
              {match.type}
            </span>
            <h3 className="font-heading text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              {match.title}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {match.description}
            </p>
            <span
              className="text-xs font-semibold self-start mt-2 inline-flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
              style={{ color: "var(--accent-purple)" }}
            >
              View item &rarr;
            </span>
          </SpotlightCard>
        ))}
      </section>

      <div className="border-t pt-8 mt-4 flex justify-between items-center text-xs font-mono" style={{ borderColor: "var(--card-border)" }}>
        <Link href="/tags" className="link-slide font-semibold" style={{ color: "var(--text-secondary)" }}>
          &larr; Back to Tags
        </Link>
      </div>
    </div>
  );
}
