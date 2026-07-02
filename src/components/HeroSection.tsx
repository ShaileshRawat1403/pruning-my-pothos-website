"use client";

import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Variants } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

/* What she says when you lean in - intent as interface, for anyone who builds */
const UTTERANCES = [
  "The engine wove only what I could describe to it. Describing well became my whole craft.",
  "They remember me for the mathematics. In truth I only knew what I wanted, and said it plainly.",
  "A machine keeps perfect discipline, even while following you off a cliff. Someone has to stay awake.",
  "Give the engine a clear sentence and it will build you a cathedral. Give it a muddled one and it builds that too.",
  "Everyone frets that the machine will think. My work was teaching it to understand, the harder and quieter task.",
];

/* Faint marginalia - logic + code glyphs drifting like ink notes */
const MARGINALIA: Array<{ s: string; top: string; left: string; dur: number; del: number }> = [
  { s: "const", top: "10%", left: "2%",  dur: 16, del: 0   },
  { s: "⇒",     top: "26%", left: "9%",  dur: 19, del: 2   },
  { s: "λ",     top: "44%", left: "3%",  dur: 14, del: 1   },
  { s: "∀x",    top: "64%", left: "6%",  dur: 17, del: 3   },
  { s: "∴",     top: "80%", left: "2%",  dur: 21, del: 0.5 },
];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(5px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

const stats = [
  { num: "260+", label: "Reflections" },
  { num: "55+",  label: "Systems posts" },
  { num: "14",   label: "Live tools" },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  const yText  = useTransform(scrollYProgress, [0, 1], [0, 55]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  // Pointer parallax + tilt on the plate
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 150, damping: 18 });
  const sy = useSpring(py, { stiffness: 150, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [7, -7]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-7, 7]);
  const glareX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);

  const onPointer = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { px.set(0); py.set(0); };

  // She speaks when you lean in - a fresh line each time
  const [speaking, setSpeaking] = useState(false);
  const [line, setLine] = useState(0);
  const onPlateEnter = () => {
    setLine((i) => (i + 1) % UTTERANCES.length);
    setSpeaking(true);
  };
  const onPlateLeave = () => setSpeaking(false);

  return (
    <section
      ref={containerRef}
      onMouseMove={onPointer}
      onMouseLeave={onLeave}
      className="relative"
      style={{ minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "center" }}
    >
      {/* Marginalia */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
        {MARGINALIA.map((p, i) => (
          <motion.span
            key={i}
            className="absolute font-mono text-[12px] select-none"
            style={{ top: p.top, left: p.left, color: "var(--accent-cyan)", opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0.05, 0.11, 0], y: [0, -26, -12, -34, 0] }}
            transition={{ duration: p.dur, delay: p.del, repeat: Infinity, ease: "easeInOut" }}
          >
            {p.s}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[46%_54%] items-center gap-12 lg:gap-14 py-20 lg:py-0">

        {/* ══════════ LEFT - COPY ══════════ */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ y: yText, opacity: opacityHero }}
          className="flex flex-col gap-7 lg:pr-12"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span className="eyebrow-tick" />
            <span className="text-[10px] font-mono uppercase tracking-[0.28em]" style={{ color: "var(--accent-cyan)" }}>
              Philosophy &times; Programming
            </span>
            <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>/ est. 2026</span>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col" style={{ gap: "0.02em" }}>
            <span
              className="font-heading tracking-tight"
              style={{ fontSize: "clamp(1.1rem, 2.3vw, 1.9rem)", color: "var(--text-muted)", fontWeight: 400, fontStyle: "italic" }}
            >
              Become an
            </span>
            <span
              className="font-heading gradient-text"
              style={{ fontSize: "clamp(3rem, 6.4vw, 5.6rem)", letterSpacing: "-0.04em", lineHeight: 0.92, fontWeight: 600 }}
            >
              AI-First
            </span>
            <span
              className="font-heading"
              style={{ fontSize: "clamp(3rem, 6.4vw, 5.6rem)", letterSpacing: "-0.04em", lineHeight: 0.92, fontWeight: 600, color: "var(--text-primary)" }}
            >
              Architect
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-start gap-3.5">
            <div
              className="self-stretch shrink-0"
              style={{ width: "2px", background: "linear-gradient(to bottom, var(--accent-purple), var(--accent-cyan))", minHeight: "52px" }}
            />
            <div className="flex flex-col gap-2">
              <p className="text-base font-heading italic" style={{ color: "var(--accent-cyan)" }}>
                &ldquo;Natural language is the new API.&rdquo;
              </p>
              <p className="text-[15px] leading-relaxed max-w-[440px]" style={{ color: "var(--text-secondary)" }}>
                Deconstructing fuzzy model workflows into inspectable, governed
                structures. Reasoning over hype, contracts over vibes.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-stretch pt-1">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col gap-1"
                style={{
                  borderLeft: i > 0 ? "1px solid var(--card-border)" : "none",
                  paddingLeft: i > 0 ? "1.5rem" : 0,
                  paddingRight: "1.5rem",
                }}
              >
                <span className="font-mono font-bold text-2xl" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>{s.num}</span>
                <span className="text-[9px] font-mono uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>{s.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} href="#tools-directory" className="btn-premium btn-primary">
              Explore ToolSmith Bench
            </motion.a>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link href="/sentiments" className="btn-premium btn-secondary">Enter Sentiments &rarr;</Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ══════════ RIGHT - THE PLATE (Ada Lovelace) ══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{ y: yImage, rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
          className="relative"
        >
          {/* Corner brackets */}
          {[
            { t: "-12px", l: "-12px", rot: 0 },
            { t: "-12px", r: "-12px", rot: 90 },
            { b: "-12px", l: "-12px", rot: 270 },
            { b: "-12px", r: "-12px", rot: 180 },
          ].map((c, i) => (
            <span
              key={i}
              aria-hidden
              style={{
                position: "absolute",
                top: c.t ?? "auto", bottom: c.b ?? "auto", left: c.l ?? "auto", right: c.r ?? "auto",
                width: "22px", height: "22px",
                borderTop: "1.5px solid var(--accent-cyan)", borderLeft: "1.5px solid var(--accent-cyan)",
                transform: `rotate(${c.rot}deg)`, opacity: 0.7, zIndex: 20,
              }}
            />
          ))}

          {/* Gallery frame */}
          <div
            className="relative w-full overflow-hidden group cursor-help"
            onMouseEnter={onPlateEnter}
            onMouseLeave={onPlateLeave}
            style={{
              borderRadius: "4px",
              border: "1px solid var(--card-border-hover)",
              boxShadow: "var(--shadow-premium)",
              background: "var(--card-bg)",
            }}
          >
            {/* Top plate strip */}
            <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid var(--card-border)" }}>
              <span className="text-[10px] font-mono uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
                Plate I &middot; lovelace_cockpit
              </span>
              <span className="flex items-center gap-1.5">
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: speaking ? 0.9 : 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: speaking ? "var(--accent-cyan)" : "var(--accent-purple)" }}
                />
                <span className="text-[9px] font-mono tracking-widest" style={{ color: speaking ? "var(--accent-cyan)" : "var(--accent-purple)" }}>
                  {speaking ? "SPEAKING" : "LIVE"}
                </span>
              </span>
            </div>

            {/* The painting */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "3 / 2" }}>
              {/* ── She speaks - a quiet veil settles so the words carry ── */}
              <motion.div
                aria-hidden
                className="absolute inset-0 pointer-events-none z-10"
                animate={{ opacity: speaking ? 1 : 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                style={{ background: "radial-gradient(130% 100% at 74% 32%, transparent 26%, rgba(15,12,7,0.62) 100%)" }}
              />

              {/* ── She speaks - a rounded bubble with a tail toward her ── */}
              <AnimatePresence mode="wait">
                {speaking && (
                  <motion.figure
                    key={line}
                    initial={{ opacity: 0, scale: 0.82, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 21 }}
                    className="absolute z-20 m-0"
                    style={{ top: "8%", left: "5%", maxWidth: "56%", transformOrigin: "88% 12%" }}
                  >
                    <div
                      className="relative px-5 py-4"
                      style={{
                        background: "color-mix(in srgb, var(--card-bg) 95%, transparent)",
                        border: "1px solid var(--card-border-hover)",
                        borderRadius: "18px",
                        boxShadow: "var(--shadow-premium)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                      }}
                    >
                      <blockquote className="font-heading italic text-[14px] sm:text-[15px] leading-snug" style={{ color: "var(--text-primary)" }}>
                        {UTTERANCES[line]}
                      </blockquote>
                      <figcaption className="flex items-center gap-1.5 text-[8px] font-mono uppercase tracking-[0.24em] mt-3" style={{ color: "var(--accent-purple)" }}>
                        <span className="h-px w-4" style={{ background: "var(--accent-purple)" }} />
                        A. Lovelace
                      </figcaption>
                      {/* Speech tail - the two visible edges point up toward her */}
                      <span
                        aria-hidden
                        className="absolute"
                        style={{
                          top: "26%", right: "-8px",
                          width: "16px", height: "16px",
                          background: "color-mix(in srgb, var(--card-bg) 95%, transparent)",
                          borderTop: "1px solid var(--card-border-hover)",
                          borderRight: "1px solid var(--card-border-hover)",
                          transform: "rotate(45deg)",
                          borderTopRightRadius: "3px",
                        }}
                      />
                    </div>
                  </motion.figure>
                )}
              </AnimatePresence>

              <motion.img
                src="/images/ada-lovelace-hero.jpg"
                alt="Ada Lovelace reimagined as a Victorian hacker, reclining at a bank of CRT monitors running Ada code, writing with a quill"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 30%" }}
                animate={{ scale: [1, 1.06, 1.02, 1.06, 1], x: [0, -7, 4, -4, 0], y: [0, 4, -3, 3, 0] }}
                transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Periodic light sweep - the plate catches the light */}
              <motion.div
                aria-hidden
                className="absolute inset-0 pointer-events-none z-10"
                style={{ background: "linear-gradient(105deg, transparent 32%, rgba(239,229,207,0.12) 48%, rgba(239,229,207,0.04) 54%, transparent 64%)" }}
                initial={{ x: "-130%" }}
                animate={{ x: ["-130%", "170%"] }}
                transition={{ duration: 5, repeat: Infinity, repeatDelay: 5.5, ease: "easeInOut" }}
              />
              {/* Cursor-tracking glare */}
              <motion.div
                aria-hidden
                className="absolute inset-0 pointer-events-none z-10"
                style={{ ["--gx" as string]: glareX, background: "radial-gradient(260px circle at var(--gx) 35%, rgba(239,229,207,0.12), transparent 55%)" }}
              />
              {/* Warm grade - integrates the cool painting with the Atelier palette */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(150deg, rgba(181,64,47,0.16) 0%, transparent 42%, rgba(20,17,11,0.12) 100%)", mixBlendMode: "multiply" }}
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(120% 90% at 50% 30%, transparent 55%, rgba(20,17,11,0.45) 100%)" }}
              />
              {/* Bottom caption bar */}
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-end justify-between"
                style={{ background: "linear-gradient(to top, rgba(15,12,7,0.92) 0%, rgba(15,12,7,0.4) 55%, transparent 100%)" }}
              >
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-[0.18em]" style={{ color: "rgba(239,229,207,0.5)" }}>
                    Systems Playground
                  </div>
                  <div className="text-sm font-heading italic" style={{ color: "#efe5cf" }}>
                    She wrote the first loop. We&rsquo;re still in it.
                  </div>
                </div>
                <span className="text-[9px] font-mono shrink-0" style={{ color: "var(--accent-cyan)" }}>oil · 2026</span>
              </div>
            </div>
          </div>

          {/* Floating note card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:flex items-center gap-2.5 px-3.5 py-2.5"
            style={{
              position: "absolute", bottom: "-1.1rem", right: "-1.2rem", zIndex: 25,
              background: "var(--card-bg)", border: "1px solid var(--card-border-hover)",
              borderRadius: "4px", boxShadow: "var(--shadow-card)",
            }}
          >
            <span className="w-7 h-7 flex items-center justify-center" style={{ background: "color-mix(in srgb, var(--accent-purple) 16%, transparent)", borderRadius: "3px" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2.2">
                <path d="M13 2 L3 14 h9 l-1 8 l10-12 h-9 l1-8z" />
              </svg>
            </span>
            <div>
              <div className="text-[11px] font-semibold" style={{ color: "var(--text-primary)" }}>14 active tools</div>
              <div className="text-[9px] font-mono" style={{ color: "var(--text-muted)" }}>browser-native · no install</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 hidden lg:flex"
        aria-hidden
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.22em]" style={{ color: "var(--text-muted)" }}>scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, var(--accent-cyan), transparent)" }}
        />
      </motion.div>
    </section>
  );
}
