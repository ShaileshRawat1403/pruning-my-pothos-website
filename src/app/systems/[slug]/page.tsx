import { allSystems } from "content-collections";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getWebPageSchema, getFaqSchema } from "../../../lib/seo/jsonld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allSystems.map((system) => ({
    slug: system._meta.path,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const system = allSystems.find((s) => s._meta.path === slug);
  if (!system) return {};

  return constructMetadata({
    title: system.title,
    description: system.description,
    path: `/systems/${slug}`,
    ogType: "article"
  });
}

export default async function SystemsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const system = allSystems.find((s) => s._meta.path === slug);

  if (!system) {
    return notFound();
  }

  const faqs = system.faq ?? [];
  const proofPoints = system.proofPoints ?? [];

  const webpageSchema = getWebPageSchema({
    title: `${system.title} | Sans Serif Systems`,
    description: system.description,
    path: `/systems/${slug}`
  });
  const faqSchema = faqs.length > 0 ? getFaqSchema({ faq: faqs }) : null;

  return (
    <article className="max-w-[840px] mx-auto py-8 flex flex-col gap-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {/* Header */}
      <header className="flex flex-col gap-4 border-b border-[var(--card-border)] pb-6">
        <div className="flex flex-wrap gap-2 text-[10px] font-mono font-bold uppercase text-accent-cyan tracking-wider">
          <span>Systems</span> &bull; <span>{system.category}</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
          {system.title}
        </h1>
        <p className="text-text-secondary text-base leading-relaxed">
          {system.description}
        </p>

        {/* Tag chips */}
        <div className="flex flex-wrap gap-2 mt-2">
          {system.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 border border-[var(--card-border)] bg-black/10 rounded-full text-xs font-mono text-text-secondary"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Hero Image */}
      {system.heroImage && (
        <figure className="w-full overflow-hidden rounded-xl border border-[var(--card-border)] max-h-[400px]">
          <img
            src={system.heroImage}
            alt={system.heroImageAlt ?? system.title}
            className="w-full h-full object-cover"
          />
        </figure>
      )}

      {/* HTML Content Body */}
      <div 
        className="prose prose-invert max-w-none text-sm sm:text-base leading-relaxed text-text-secondary flex flex-col gap-6"
        dangerouslySetInnerHTML={{ __html: system.content }}
      />

      {/* Meta Reinforcements (Proof Block & FAQ) */}
      {(proofPoints.length > 0 || faqs.length > 0) && (
        <section className="border-t border-[var(--card-border)] pt-8 mt-6 flex flex-col gap-8">
          {/* Proof Block */}
          {proofPoints.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="font-heading text-lg font-bold text-[var(--text-primary)]">Proof Block</h2>
              <ul className="list-disc pl-5 text-sm text-text-secondary flex flex-col gap-2">
                {proofPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQ Block */}
          {faqs.length > 0 && (
            <section className="flex flex-col gap-4">
              <h2 className="font-heading text-lg font-bold text-[var(--text-primary)]">FAQ</h2>
              <div className="flex flex-col gap-4">
                {faqs.map((item, idx) => (
                  <div key={idx} className="border border-[var(--card-border)] p-4 rounded-lg bg-black/5 flex flex-col gap-2">
                    <h3 className="font-heading text-sm font-semibold text-[var(--text-primary)]">{item.question}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </section>
      )}

      {/* Continue Navigation footer */}
      <div className="border-t border-[var(--card-border)] pt-8 mt-8 flex justify-between items-center text-xs font-mono">
        <Link href="/" className="text-accent-cyan hover:underline font-semibold">
          &larr; Back to Systems
        </Link>
      </div>
    </article>
  );
}
