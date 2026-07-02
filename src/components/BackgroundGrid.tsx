"use client";

/**
 * Atmosphere for the Atelier: faint laid-paper rules, engraving grain,
 * and an edge vignette. No glow orbs. Calm, not neon.
 */
export default function BackgroundGrid() {
  return (
    <>
      <div className="grid-overlay" aria-hidden />
      <div className="paper-grain" aria-hidden />
      <div className="page-vignette" aria-hidden />
    </>
  );
}
