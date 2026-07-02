"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

interface GlowCardProps {
  children: React.ReactNode;
  /** accent for the cursor glow + static top rule */
  accent?: string;
  /** show the 3px accent top rule (always on). Default true. */
  topRule?: boolean;
  /** padding utility for the outer surface. Default p-6. */
  pad?: string;
  /** layout utilities for the inner content column (gap, justify, etc.) */
  className?: string;
}

/**
 * The non-link twin of SpotlightCard: a card that lifts on hover and renders
 * the same warm cursor-tracking glow, so every card surface on the site shares
 * one hover behaviour. Padding comes from `className` (e.g. p-6).
 */
export default function GlowCard({ children, accent = "var(--accent-purple)", topRule = true, pad = "p-6", className = "" }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 24 }} className="h-full">
      <div
        ref={ref}
        onMouseMove={onMove}
        className={`glow-card group ${pad}`}
        style={{ ["--spot" as string]: accent, borderTop: topRule ? `3px solid ${accent}` : undefined }}
      >
        <span className="spotlight-glow" aria-hidden />
        <span className={`relative z-10 flex flex-col h-full ${className}`}>{children}</span>
      </div>
    </motion.div>
  );
}
