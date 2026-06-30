"use client";

import { useState } from "react";
import Link from "next/link";

interface PostItem {
  id: string;
  title: string;
  description: string;
  publishDate?: string;
  tags?: string[];
  url: string;
  type: "reflections" | "calibrations" | "curations" | "systems";
  typeName: string;
  typeColor: string;
}

interface StickyNoteItem {
  id: string;
  title: string;
  rotation?: number;
  color?: string;
  content: string;
  tags?: string[];
  type: "sticky-notes";
}

interface SentimentsClientProps {
  initialPosts: PostItem[];
  stickyNotes: StickyNoteItem[];
}

export default function SentimentsClient({ initialPosts, stickyNotes }: SentimentsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "reflections" | "calibrations" | "curations" | "systems" | "sticky-notes">("all");
  const [selectedNote, setSelectedNote] = useState<StickyNoteItem | null>(null);

  // Filter posts (non-sticky notes)
  const filteredPosts = initialPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesTab = activeTab === "all" || post.type === activeTab;
    return matchesSearch && matchesTab;
  });

  // Filter sticky notes
  const filteredStickyNotes = stickyNotes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (note.tags && note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesTab = activeTab === "all" || activeTab === "sticky-notes";
    return matchesSearch && matchesTab;
  });

  // Sticky color helper
  const getStickyBg = (color?: string) => {
    if (color === "var(--color-sticky-1)" || !color) return "#fef08a"; // yellow
    if (color === "var(--color-sticky-2)") return "#bbf7d0"; // green
    if (color === "var(--color-sticky-3)") return "#bfdbfe"; // blue
    if (color === "var(--color-sticky-4)") return "#fbcfe8"; // pink
    return color; // fallback literal
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Search & Filter Options */}
      <div className="card-glass p-6 bg-black/40 border-accent-purple/20 flex flex-col lg:flex-row gap-4 justify-between items-center relative z-10">
        <div className="relative w-full lg:max-w-md">
          <input
            type="text"
            placeholder="Search notes, concepts, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-text-primary focus:outline-none focus:border-accent-cyan transition-colors font-mono"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-text-muted hover:text-text-primary text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Tab selection */}
        <div className="flex flex-wrap gap-1 p-1 bg-black/50 border border-white/5 rounded-xl w-full lg:w-auto justify-center">
          {(["all", "reflections", "calibrations", "curations", "systems", "sticky-notes"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider transition-all ${
                activeTab === tab
                  ? "bg-accent-purple text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/5"
              }`}
            >
              {tab === "sticky-notes" ? "Sticky Notes" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex justify-between items-center text-[10px] font-mono text-text-muted px-2">
        <span>
          SHOWING {activeTab === "sticky-notes" ? filteredStickyNotes.length : filteredPosts.length + (activeTab === "all" ? filteredStickyNotes.length : 0)} ITEMS
        </span>
        {searchQuery && <span>FILTERED BY &quot;{searchQuery}&quot;</span>}
      </div>

      {/* Main content viewport */}
      <div className="flex flex-col gap-12 relative z-10">
        
        {/* Render standard articles grid if activeTab is NOT "sticky-notes" */}
        {activeTab !== "sticky-notes" && filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="card-glass p-6 bg-black/35 flex flex-col justify-between border-t-4 hover:-translate-y-1 transition-all duration-300 group hover:shadow-premium"
                style={{ borderTopColor: post.typeColor }}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span
                      className="text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded"
                      style={{ backgroundColor: `${post.typeColor}15`, color: post.typeColor }}
                    >
                      {post.typeName}
                    </span>
                    {post.publishDate && (
                      <span className="text-[9px] font-mono text-text-muted">
                        {new Date(post.publishDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] group-hover:text-accent-cyan transition-colors leading-snug">
                    <Link href={post.url}>{post.title}</Link>
                  </h3>

                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </div>

                <div className="flex flex-col gap-4 mt-6">
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono text-text-muted border border-white/5 bg-white/5 px-2 py-0.5 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between items-center border-t border-white/5 pt-3">
                    <Link
                      href={post.url}
                      className="text-xs font-semibold hover:underline flex items-center gap-1"
                      style={{ color: post.typeColor }}
                    >
                      Read Entry &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sticky Notes Wall Section (rendered if activeTab is "all" or "sticky-notes") */}
        {(activeTab === "all" || activeTab === "sticky-notes") && filteredStickyNotes.length > 0 && (
          <div className="flex flex-col gap-6 mt-4">
            {activeTab === "all" && (
              <div className="border-b border-white/10 pb-2">
                <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
                  <span>📌</span> Sticky Notes Wall
                </h3>
                <p className="text-[10px] text-text-muted font-mono mt-0.5">Messy, partial, raw insights worth revisiting. Click to read.</p>
              </div>
            )}

            <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6 [column-fill:_balance]">
              {filteredStickyNotes.map((note) => {
                const rotation = note.rotation || 0;
                const bg = getStickyBg(note.color);
                
                return (
                  <div
                    key={note.id}
                    onClick={() => setSelectedNote(note)}
                    className="break-inside-avoid inline-block w-full p-6 rounded-xl border border-black/10 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-200 select-none hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      backgroundColor: bg,
                      transform: `rotate(${rotation}deg)`,
                      color: "#1e293b",
                      fontFamily: "'Patrick Hand', 'Caveat', cursive",
                    }}
                  >
                    <span className="block font-bold text-base leading-tight mb-2 text-slate-800">
                      {note.title}
                    </span>
                    <div 
                      className="text-xs leading-relaxed text-slate-700 pointer-events-none line-clamp-4"
                      dangerouslySetInnerHTML={{ __html: note.content }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Render empty state */}
        {filteredPosts.length === 0 && filteredStickyNotes.length === 0 && (
          <div className="card-glass p-12 text-center bg-black/40 border-white/5 flex flex-col items-center justify-center gap-2">
            <span className="text-2xl">🔍</span>
            <h4 className="font-heading text-sm font-bold text-[var(--text-primary)]">No matches found</h4>
            <p className="text-xs text-text-secondary max-w-xs">
              Try adjusting your keywords or clearing the filter settings.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTab("all");
              }}
              className="mt-4 px-3 py-1.5 bg-accent-purple hover:bg-accent-purple/80 text-white rounded-lg font-mono text-[10px] uppercase font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Sticky Note Detail Modal Overlay */}
      {selectedNote && (
        <div 
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedNote(null)}
        >
          <div 
            className="w-full max-w-md p-8 rounded-xl shadow-2xl relative border border-black/15 flex flex-col gap-4 animate-slide-up"
            style={{ 
              backgroundColor: getStickyBg(selectedNote.color), 
              color: "#1e293b",
              fontFamily: "'Patrick Hand', 'Caveat', cursive"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedNote(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 text-lg font-bold font-sans transition-colors"
            >
              ✕
            </button>

            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                PINNED STICKY NOTE
              </span>
              <h2 className="text-2xl font-bold leading-tight text-slate-800">
                {selectedNote.title}
              </h2>
            </div>

            <div 
              className="prose prose-slate text-sm leading-relaxed text-slate-700 mt-2 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin"
              dangerouslySetInnerHTML={{ __html: selectedNote.content }}
            />

            {selectedNote.tags && selectedNote.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-4 border-t border-slate-500/10 pt-3">
                {selectedNote.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="text-[10px] font-mono bg-black/5 text-slate-600 px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
