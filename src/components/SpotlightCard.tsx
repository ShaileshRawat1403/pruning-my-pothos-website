"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";

interface SpotlightCardProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  /** accent color for the cursor glow + top rule */
  accent?: string;
}

/**
 * A card that lifts on hover and renders a warm glow that follows the cursor.
 * Uses CSS custom props (--mx/--my) updated on pointer move - cheap, no re-render.
 */
export default function SpotlightCard({ href, className = "", children, accent = "var(--accent-purple)" }: SpotlightCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}>
      <Link
        ref={ref}
        href={href}
        onMouseMove={onMove}
        className="spotlight-card group"
        style={{ ["--spot" as string]: accent }}
      >
        <span className="spotlight-glow" aria-hidden />
        <span className="spotlight-rule" aria-hidden />
        <span className={`relative z-10 flex flex-col h-full ${className}`}>{children}</span>
      </Link>
    </motion.div>
  );
}
