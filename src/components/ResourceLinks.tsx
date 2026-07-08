"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ResourceLinksProps {
  title: string;
  pdfUrl?: string;
  videoUrl?: string;
  appleMusicUrl?: string;
}

export default function ResourceLinks({ title, pdfUrl, videoUrl, appleMusicUrl }: ResourceLinksProps) {
  const [pdfOpen, setPdfOpen] = useState(false);

  useEffect(() => {
    if (!pdfOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPdfOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pdfOpen]);

  if (!pdfUrl && !videoUrl && !appleMusicUrl) return null;

  return (
    <div className="border-t border-[color:var(--card-border)] pt-6 mt-6 flex flex-wrap gap-4 text-xs font-mono">
      {pdfUrl && (
        <button
          onClick={() => setPdfOpen(true)}
          className="px-3.5 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/25 text-[color:var(--text-primary)] font-bold hover:bg-accent-cyan/25 transition-all cursor-pointer"
        >
          View PDF Resource &rarr;
        </button>
      )}
      {videoUrl && (
        <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="px-3.5 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/25 text-[color:var(--text-primary)] font-bold hover:bg-accent-purple/25 transition-all">
          Watch Video Presentation &rarr;
        </a>
      )}
      {appleMusicUrl && (
        <a href={appleMusicUrl} target="_blank" rel="noopener noreferrer" className="px-3.5 py-1.5 rounded-full bg-accent-pink/10 border border-accent-pink/25 text-[color:var(--text-primary)] font-bold hover:bg-accent-pink/25 transition-all">
          Listen on Apple Music &rarr;
        </a>
      )}

      {pdfUrl && (
        <AnimatePresence>
          {pdfOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
              style={{ background: "rgba(10,8,5,0.78)", backdropFilter: "blur(4px)" }}
              onClick={() => setPdfOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full max-w-4xl flex flex-col"
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--card-border-hover)",
                  borderRadius: "6px",
                  boxShadow: "var(--shadow-premium)",
                }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={`PDF preview: ${title}`}
              >
                <div className="flex items-center justify-between gap-4 px-4 py-3" style={{ borderBottom: "1px solid var(--card-border)" }}>
                  <span className="text-[11px] font-mono font-semibold truncate" style={{ color: "var(--text-primary)" }}>{title}</span>
                  <div className="flex items-center gap-4 shrink-0">
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono font-semibold link-slide"
                      style={{ color: "var(--accent-cyan)" }}
                    >
                      Open in new tab / Download
                    </a>
                    <button
                      onClick={() => setPdfOpen(false)}
                      aria-label="Close"
                      className="text-lg leading-none cursor-pointer"
                      style={{ color: "var(--text-muted)" }}
                    >
                      &times;
                    </button>
                  </div>
                </div>
                <iframe
                  src={pdfUrl}
                  title={`PDF preview: ${title}`}
                  className="w-full flex-1"
                  style={{ border: 0, borderRadius: "0 0 6px 6px" }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
