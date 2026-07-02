"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** A thin brass hairline that tracks reading progress across the page top. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX,
        transformOrigin: "0%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        zIndex: 60,
        background: "linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))",
      }}
    />
  );
}
