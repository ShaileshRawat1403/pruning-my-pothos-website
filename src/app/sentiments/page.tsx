import { allSelves, allSentences, allShelves, allSystems, allStickyNotes } from "content-collections";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";
import SentimentsClient from "../../components/SentimentsClient";

export const metadata = constructMetadata({
  title: "Sentiments Index | Sans Serif Systems",
  description: "A calm, reading-first index of conceptual maps, reflections, and notes detailing the Sentiments workspace.",
  path: "/sentiments"
});

export default function SentimentsIndexPage() {
  const schema = getWebPageSchema({
    title: "Sentiments Index | Sans Serif Systems",
    description: "A calm, reading-first index of conceptual maps, reflections, and notes detailing the Sentiments workspace.",
    path: "/sentiments"
  });

  // Map Sentences
  const mappedSentences = allSentences.map((item) => ({
    id: `sentence-${item._meta.path}`,
    title: item.title,
    description: item.summary || item.title,
    publishDate: undefined, // Sentences do not have explicit publishDate fields
    tags: item.tags || [],
    url: `/sentences/${item._meta.path}`,
    type: "reflections" as const,
    typeName: "Reflections",
    typeColor: "#6366f1" // var(--accent-purple)
  }));

  // Map Selves
  const mappedSelves = allSelves.map((item) => ({
    id: `self-${item._meta.path}`,
    title: item.title,
    description: item.description,
    publishDate: item.publishDate,
    tags: item.tags || [],
    url: `/self/${item._meta.path}`,
    type: "calibrations" as const,
    typeName: "Calibrations",
    typeColor: "#d946ef" // var(--accent-pink)
  }));

  // Map Shelves
  const mappedShelves = allShelves.map((item) => {
    const slug = item._meta.fileName.replace(/\.mdx?$/, "");
    return {
      id: `shelf-${slug}`,
      title: item.title,
      description: item.description,
      publishDate: item.publishDate,
      tags: item.tags || [],
      url: `/shelf/${item._meta.directory}/${slug}`,
      type: "curations" as const,
      typeName: "Curations",
      typeColor: "#f97316" // var(--accent-orange)
    };
  });

  // Map Systems
  const mappedSystems = allSystems.map((item) => ({
    id: `system-${item._meta.path}`,
    title: item.title,
    description: item.description,
    publishDate: undefined, // Systems do not have publishDates in standard frontmatter
    tags: item.tags || [],
    url: `/systems/${item._meta.path}`,
    type: "systems" as const,
    typeName: "Systems",
    typeColor: "#06b6d4" // var(--accent-cyan)
  }));

  // Map Sticky Notes
  const mappedStickyNotes = allStickyNotes.map((item, index) => ({
    id: `sticky-${item._meta.path || index}`,
    title: item.title,
    rotation: item.rotation,
    color: item.color,
    content: item.content,
    tags: item.tags || [],
    type: "sticky-notes" as const
  }));

  // Combine and sort standard posts (date-sorted or alphabetical if no date)
  const allPosts = [
    ...mappedSentences,
    ...mappedSelves,
    ...mappedShelves,
    ...mappedSystems
  ].sort((a, b) => {
    if (a.publishDate && b.publishDate) {
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    }
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="relative w-full flex flex-col gap-12 max-w-[1000px] mx-auto py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero Header Area */}
      <section className="card-glass p-8 flex flex-col gap-4 border-accent-purple/20 bg-black/40 shadow-premium relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        
        <div className="flex items-center gap-2 relative z-10">
          <span className="px-2 py-0.5 rounded bg-accent-purple/20 border border-accent-purple/30 text-accent-purple font-mono text-[9px] font-bold uppercase tracking-wider">
            THE WORKSPACE
          </span>
          <span className="text-[10px] font-mono text-text-muted">DIRECTORY // WRITING_ARCHIVE</span>
        </div>

        <h1 className="font-heading text-4xl font-extrabold text-[var(--text-primary)] tracking-tight relative z-10 leading-tight">
          Sentiments Workspace
        </h1>
        <p className="text-text-secondary text-base leading-relaxed max-w-[650px] relative z-10">
          A calm, text-led repository of personal notes, short reflective essays, and shared resource collections.
        </p>
      </section>

      {/* Interactive client panel */}
      <SentimentsClient initialPosts={allPosts} stickyNotes={mappedStickyNotes} />

      {/* Decorative Victorian-Hacker console block */}
      <section className="card-glass p-6 bg-black/50 border-white/5 font-mono text-xs text-text-secondary relative overflow-hidden">
        <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2 text-[10px] text-text-muted">
          <span>LIBRARY_MONITOR // lovelace.tty</span>
          <span className="text-accent-purple">[READING_MODE_ACTIVE]</span>
        </div>
        <p className="leading-relaxed">
          &quot;We may say most aptly that the Analytical Engine weaves algebraic patterns just as the Jacquard loom weaves flowers and leaves.&quot; 
          <span className="text-accent-pink"> — Ada Lovelace, 1843</span>
        </p>
      </section>
    </div>
  );
}
