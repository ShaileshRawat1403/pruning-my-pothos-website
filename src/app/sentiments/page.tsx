import Link from "next/link";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "Sentiments Garden",
  description: "A calm, reading-first index of conceptual maps, reflections, and notes detailing the Sentiments ecosystem.",
  path: "/sentiments"
});

export default function SentimentsIndexPage() {
  const schema = getWebPageSchema({
    title: "Sentiments Garden | Sans Serif Systems",
    description: "A calm, reading-first index of conceptual maps, reflections, and notes detailing the Sentiments ecosystem.",
    path: "/sentiments"
  });

  return (
    <div className="sentiments-scope relative w-full flex flex-col gap-12 max-w-[800px] mx-auto py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="flex flex-col gap-4 border-b border-[var(--card-border)] pb-8">
        <span className="text-[10px] font-mono font-bold uppercase text-accent-purple tracking-widest self-start">
          THE GARDEN
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
          Sentiments Garden
        </h1>
        <p className="text-text-secondary text-base leading-relaxed max-w-[650px]">
          A calm, text-led repository of personal notes, short reflective essays, and shared resource collections.
        </p>
      </section>

      <section className="flex flex-col gap-8 text-sm text-text-secondary leading-relaxed">
        <p>
          Welcome to the Sentiments Garden. This is a text-led space designed for deep reading, focusing on systems architecture and the human side of software systems.
        </p>

        <div className="card-glass p-6 bg-black/10 flex flex-col gap-3">
          <h3 className="font-heading text-base font-bold text-[var(--text-primary)]">Garden Navigation</h3>
          <p className="text-xs">
            To view the specific entries, you can navigate straight to the collections:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-2 text-xs">
            <li>
              <Link href="/sentences/ambiguity-is-debt/" className="text-accent-purple hover:underline">
                Sentences: Short reflections on design & engineering rules
              </Link>
            </li>
            <li>
              <Link href="/self/calibration-rituals/" className="text-accent-purple hover:underline">
                Self: Personal notes and cognitive alignment essays
              </Link>
            </li>
            <li>
              <Link href="/shelf/books/book-recommendation/" className="text-accent-purple hover:underline">
                Shelf: Dynamic catalog of curated music, tools, and readings
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
