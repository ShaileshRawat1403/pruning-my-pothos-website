import { allSentences } from "content-collections";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getWebPageSchema } from "../../../lib/seo/jsonld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allSentences.map((sentence) => ({
    slug: sentence._meta.path,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sentence = allSentences.find((s) => s._meta.path === slug);
  if (!sentence) return {};

  return constructMetadata({
    title: sentence.title,
    description: sentence.summary,
    path: `/sentences/${slug}`,
    ogType: "article"
  });
}

export default async function SentencesDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const sentence = allSentences.find((s) => s._meta.path === slug);

  if (!sentence) {
    return notFound();
  }

  const webpageSchema = getWebPageSchema({
    title: `${sentence.title} | Sans Serif Systems`,
    description: sentence.summary,
    path: `/sentences/${slug}`
  });

  return (
    <article className="sentiments-scope max-w-[700px] mx-auto py-12 flex flex-col gap-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      {/* Category header tag */}
      <span className="text-[10px] font-mono font-bold uppercase text-accent-purple tracking-widest self-start">
        {sentence.category}
      </span>
      
      {/* Title */}
      <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] leading-snug">
        {sentence.title}
      </h1>

      {/* Summary / Lead */}
      <p className="text-text-secondary font-medium italic border-l-2 border-accent-purple/40 pl-4 py-1 text-sm sm:text-base">
        {sentence.summary}
      </p>

      {/* Content */}
      <div 
        className="prose prose-invert max-w-none text-sm sm:text-base leading-relaxed text-text-secondary mt-4 flex flex-col gap-5"
        dangerouslySetInnerHTML={{ __html: sentence.content }}
      />

      {/* Tag lists */}
      {sentence.tags && sentence.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {sentence.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 border border-[var(--card-border)] bg-black/10 rounded-full text-xs font-mono text-text-secondary"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Navigation back */}
      <div className="border-t border-[var(--card-border)] pt-8 mt-12 flex justify-between items-center text-xs font-mono">
        <Link href="/sentiments" className="text-accent-purple hover:underline font-semibold">
          &larr; Back to Sentiments
        </Link>
      </div>
    </article>
  );
}
