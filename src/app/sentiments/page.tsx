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
    rawDate: undefined,
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
    rawDate: item.publishDate,
    publishDate: item.publishDate ? (() => {
      const d = new Date(item.publishDate);
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
    })() : undefined,
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
      rawDate: item.publishDate,
      publishDate: item.publishDate ? (() => {
        const d = new Date(item.publishDate);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
      })() : undefined,
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
    rawDate: undefined,
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
    if (a.rawDate && b.rawDate) {
      return new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime();
    }
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="relative w-full flex flex-col gap-12 max-w-[1000px] mx-auto py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Interactive Hero Header Area with Portrait */}
      <section className="relative z-10 w-full mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden">
          {/* Portrait Container */}
          <div className="relative shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#18181b] overflow-hidden group">
            <img 
              src="/my-self-portrait.png" 
              alt="Shailesh Rawat" 
              className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
            />
          </div>
          
          {/* Text Content */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-white font-mono text-[9px] font-bold uppercase tracking-widest border border-white/10">
                THE WORKSPACE
              </span>
              <span className="text-[10px] font-mono text-zinc-500">DIRECTORY // WRITING_ARCHIVE</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Sentiments Workspace
            </h1>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-[600px]">
              A calm, text-led repository of personal notes, short reflective essays, and shared resource collections. Authored by Shailesh Rawat.
            </p>
          </div>
        </div>
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
