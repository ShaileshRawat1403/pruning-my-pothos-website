import { allShelves } from "content-collections";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getWebPageSchema } from "../../../lib/seo/jsonld";

interface PageProps {
  params: Promise<{ category: string }>;
}

const VALID_CATEGORIES = [
  "books",
  "culture",
  "local-experiments",
  "music",
  "notes",
  "philosophy",
  "shared-resources",
  "tools"
];

export function generateStaticParams() {
  return VALID_CATEGORIES.map((cat) => ({ category: cat }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category)) return {};

  const titleMap: Record<string, string> = {
    books: "Bookshelf & Readings",
    culture: "Culture Shelf",
    "local-experiments": "Local Experiments Shelf",
    music: "Music Shelf",
    notes: "Notes Shelf",
    philosophy: "Philosophy & Beliefs",
    "shared-resources": "Shared Resources Shelf",
    tools: "Developer Tools Stack"
  };

  return constructMetadata({
    title: titleMap[category] || `${category} Shelf`,
    description: `Browse index listings for the ${category} category inside the workspace.`,
    path: `/shelf/${category}`
  });
}

export default async function ShelfCategoryIndexPage({ params }: PageProps) {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category)) {
    return notFound();
  }

  // Filter items in allShelves belonging to this category directory
  const items = allShelves.filter((item) => item._meta.directory === category);

  const titleMap: Record<string, string> = {
    books: "Books & Readings",
    culture: "Culture Shelf",
    "local-experiments": "Local Experiments",
    music: "Music & Soundtrack",
    notes: "Notes & Fragments",
    philosophy: "Philosophy & Beliefs",
    "shared-resources": "Shared Resources",
    tools: "Tools & Developer Stack"
  };

  const currentTitle = titleMap[category] || category;

  const schema = getWebPageSchema({
    title: `${currentTitle} Shelf | Sans Serif Systems`,
    description: `Index collection listing of articles under the ${category} workspace category.`,
    path: `/shelf/${category}`
  });

  return (
    <div className="sentiments-scope relative w-full flex flex-col gap-12 max-w-[800px] mx-auto py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="flex flex-col gap-4 border-b border-[var(--card-border)] pb-8">
        <span className="text-[10px] font-mono font-bold uppercase text-accent-cyan tracking-widest self-start">
          SHELF CATEGORY
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
          {currentTitle}
        </h1>
        <p className="text-text-secondary text-base leading-relaxed">
          Index of items under the {category} catalog directory.
        </p>
      </section>

      {items.length === 0 ? (
        <p className="text-text-muted text-sm italic">No entries published in this category yet.</p>
      ) : (
        <section className="flex flex-col gap-6">
          {items.map((item) => {
            const slug = item._meta.fileName.replace(/\.mdx?$/, "");
            return (
              <div key={slug} className="card-glass p-6 flex flex-col gap-2 bg-black/10">
                <span className="text-[10px] font-mono text-text-muted">
                  {item.publishDate ? new Date(item.publishDate).toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "Archive"}
                </span>
                <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] hover:text-accent-cyan transition-colors">
                  <Link href={`/shelf/${category}/${slug}`}>{item.title}</Link>
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {item.description}
                </p>
                <Link
                  href={`/shelf/${category}/${slug}`}
                  className="text-xs font-semibold text-accent-purple hover:underline self-start mt-2 cursor-pointer"
                >
                  Read entry &rarr;
                </Link>
              </div>
            );
          })}
        </section>
      )}

      <div className="border-t border-[var(--card-border)] pt-8 mt-4 flex justify-between items-center text-xs font-mono">
        <Link href="/shelf" className="text-accent-cyan hover:underline font-semibold">
          &larr; Back to Shelf
        </Link>
      </div>
    </div>
  );
}
