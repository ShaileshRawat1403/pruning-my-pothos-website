"use client";

import { motion } from "framer-motion";

interface SceneFigureProps {
  /** an animated scene under /public/scenes, e.g. /scenes/boole.html */
  src: string;
  /** mono label, e.g. "Figure · boole_gates" */
  label: string;
  /** a sentence or two tying the diagram to the idea */
  caption: string;
  accent?: string;
  /** panel aspect ratio, defaults to a wide diagram band */
  aspect?: string;
}

/**
 * A standalone "figure" section: the hand-built animated line scene gets its
 * own permanent home (below the portrait hero), framed like a plate and
 * captioned. The scene draws itself and keeps its quiet motion.
 */
export default function SceneFigure({
  src,
  label,
  caption,
  accent = "var(--accent-cyan)",
  aspect = "16 / 7",
}: SceneFigureProps) {
  return (
    <motion.section
      className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-2">
        <span className="h-px w-8" style={{ background: accent }} />
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
          {label}
        </span>
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{
          border: "1px solid var(--card-border)",
          borderTop: `2px solid ${accent}`,
          borderRadius: "4px",
          background: "var(--card-bg)",
          aspectRatio: aspect,
          boxShadow: "var(--shadow-card)",
        }}
      >
        <iframe
          src={src}
          title={label}
          loading="lazy"
          scrolling="no"
          className="absolute inset-0 w-full h-full border-0"
          style={{ pointerEvents: "none", background: "transparent" }}
        />
        {/* faint edge grade so the band seats into the page */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(130% 120% at 50% 0%, transparent 62%, rgba(20,17,11,0.16) 100%)" }}
        />
      </div>

      <p className="text-sm leading-relaxed max-w-[680px]" style={{ color: "var(--text-secondary)" }}>
        {caption}
      </p>
    </motion.section>
  );
}
