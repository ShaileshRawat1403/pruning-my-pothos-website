"use client";

import { motion } from "framer-motion";

const SCHEMA: Array<{ k: string; v: string; accent?: boolean }> = [
  { k: "intent",      v: "\"natural_language\"" },
  { k: "maps_to",     v: "\"api\"", accent: true },
  { k: "interface",   v: "\"prose\"" },
  { k: "contract",    v: "\"typed_schema\"" },
  { k: "verified_by", v: "\"evaluation\"" },
  { k: "governed_by", v: "\"human_in_the_loop\"" },
];

export default function NaturalLanguagePlate() {
  return (
    <section className="relative">
      <div className="flex flex-col gap-2 mb-10">
        <span className="text-[10px] font-mono uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>
          The Thesis
        </span>
        <h2 className="font-heading text-2xl font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
          A sentence is a specification
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* Left - the human sentence, large */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <span className="text-[9px] font-mono uppercase tracking-[0.2em]" style={{ color: "var(--accent-cyan)" }}>
            Human input
          </span>
          <p className="font-heading leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3.1rem)", color: "var(--text-primary)", fontWeight: 500, letterSpacing: "-0.02em" }}>
            &ldquo;Natural language is the <span className="gradient-text">new API</span>.&rdquo;
          </p>
          <p className="text-[15px] leading-relaxed max-w-[460px]" style={{ color: "var(--text-secondary)" }}>
            Prose is generous. Execution should not be. The model generates;
            the system decides what becomes real. So the loose sentence on the
            left is compiled into the governed contract on the right, where every
            field is something you can inspect, test, and refuse.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="eyebrow-tick" />
            <span className="text-[11px] font-mono italic" style={{ color: "var(--text-muted)" }}>
              models generate. systems govern.
            </span>
          </div>
        </motion.div>

        {/* Right - compiled schema ledger */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="flex items-center gap-3 mb-3" aria-hidden>
            <span className="text-[9px] font-mono uppercase tracking-[0.18em]" style={{ color: "var(--accent-cyan)" }}>
              compiled &rarr;
            </span>
            <span className="rule flex-1" />
          </div>

          <div className="ledger-surface p-5 sm:p-6" style={{ borderRadius: "4px", boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center justify-between pb-3 mb-3" style={{ borderBottom: "1px solid var(--card-border)" }}>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--accent-pink)" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--accent-amber)" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--accent-green)" }} />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                contract.json
              </span>
            </div>

            <div className="text-[13px] leading-relaxed font-mono" style={{ color: "var(--text-secondary)" }}>
              <span style={{ color: "var(--text-muted)" }}>{"{"}</span>
              {SCHEMA.map((row, i) => (
                <motion.div
                  key={row.k}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.16, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="pl-5"
                >
                  <span style={{ color: "var(--accent-cyan)" }}>&quot;{row.k}&quot;</span>
                  <span style={{ color: "var(--text-muted)" }}>: </span>
                  <span style={{ color: row.accent ? "var(--accent-purple)" : "var(--text-primary)" }}>{row.v}</span>
                  {i < SCHEMA.length - 1 && <span style={{ color: "var(--text-muted)" }}>,</span>}
                </motion.div>
              ))}
              <span style={{ color: "var(--text-muted)" }}>{"}"}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.1, repeat: Infinity }}
                className="inline-block w-1.5 h-3.5 ml-1 align-middle"
                style={{ background: "var(--accent-cyan)" }}
              />
            </div>

            <div className="flex justify-between items-center pt-4 mt-4" style={{ borderTop: "1px solid var(--card-border)" }}>
              <span className="text-[9px] font-mono uppercase tracking-[0.16em]" style={{ color: "var(--accent-green)" }}>
                ● schema valid
              </span>
              <span className="text-[9px] font-mono uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
                review gate on
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
