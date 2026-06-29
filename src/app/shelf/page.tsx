import Link from "next/link";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "Shelf | A Thinking Workspace",
  description: "A curated shelf of local experiments, notes, tools, philosophy, music, and shared AI resources.",
  path: "/shelf",
  image: "/covers/shelf/shared-agent-intelligence.svg"
});

export default function ShelfIndexPage() {
  const schema = getWebPageSchema({
    title: "Shelf | A Thinking Workspace",
    description: "A curated shelf of local experiments, notes, tools, philosophy, music, and shared AI resources.",
    path: "/shelf"
  });

  const categories = [
    {
      title: "Local Experiments",
      description: "Tests, failures, and learnings from hands-on work.",
      path: "/shelf/local-experiments"
    },
    {
      title: "Notes",
      description: "Drafts, fragments, and working lines of thought.",
      path: "/shelf/notes"
    },
    {
      title: "Music",
      description: "Soundtracks for focus, drift, and flow.",
      path: "/shelf/music"
    },
    {
      title: "Tools",
      description: "The stack I reach for and the trade-offs I accept.",
      path: "/shelf/tools"
    },
    {
      title: "Philosophy",
      description: "Personal philosophies and the sources behind them.",
      path: "/shelf/philosophy"
    },
    {
      title: "Shared Resources",
      description: "References, guides, and links I return to.",
      path: "/shelf/shared-resources"
    }
  ];

  return (
    <div className="sentiments-scope relative w-full flex flex-col gap-12 max-w-[1100px] mx-auto py-8">
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
          WORKSPACE
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
          Shelf
        </h1>
        <p className="text-text-secondary text-base leading-relaxed max-w-[700px]">
          A working shelf of experiments, notes, tools, philosophy, music, and shared resources.
        </p>
      </section>

      {/* Grid List */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="card-glass p-6 flex flex-col gap-4 justify-between bg-black/10">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-text-muted">CATEGORY {idx + 1}</span>
              <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] hover:text-accent-cyan transition-colors">
                <Link href={cat.path}>{cat.title}</Link>
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {cat.description}
              </p>
            </div>
            <Link
              href={cat.path}
              className="text-xs font-semibold text-accent-cyan hover:underline self-start flex items-center gap-1 cursor-pointer"
            >
              Browse Category ➔
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
