"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Example {
  domain: string;
  text: string;
}

interface Stage {
  name: string;
  definition: string;
  ifSkipped: string;
  examples: Example[];
}

const DOMAINS = ["Agentic / Coding", "Content / Writing", "Strategy / Business"];

const STAGES: Stage[] = [
  {
    name: "Intent",
    definition: "The contract. Defines role, task, boundaries, and failure conditions.",
    ifSkipped: "The system optimizes for fluency over correctness.",
    examples: [
      { domain: DOMAINS[0], text: "“Refactor this module without changing the public API.”" },
      { domain: DOMAINS[1], text: "Write a LinkedIn post about the new role. Modest tone, no motivational clichés, under 200 words." },
      { domain: DOMAINS[2], text: "Scope a POC for OCR accuracy, not a full production rollout." },
    ],
  },
  {
    name: "Inform",
    definition: "Context governance. You choose what evidence the system may use.",
    ifSkipped: "Low-signal context causes plausible but ungrounded outputs.",
    examples: [
      { domain: DOMAINS[0], text: "Provide failing tests, target files, and recent logs before asking for a fix." },
      { domain: DOMAINS[1], text: "Share the actual incident the post is about, not a paraphrase of it." },
      { domain: DOMAINS[2], text: "Give the client's current stack, budget ceiling, and prior AI attempts before recommending anything." },
    ],
  },
  {
    name: "Interpret",
    definition: "Pre-execution alignment. The system states plan and assumptions in plain language.",
    ifSkipped: "Users discover misalignment only after execution side effects.",
    examples: [
      { domain: DOMAINS[0], text: "Ask for a step plan before a single file gets touched." },
      { domain: DOMAINS[1], text: "Reflect the draft's angle back in one sentence before expanding it, to catch a misread early." },
      { domain: DOMAINS[2], text: "Confirm the client's definition of “success” before scoping the engagement." },
    ],
  },
  {
    name: "Initiate",
    definition: "Guarded execution. Actions should pass schema and policy checks.",
    ifSkipped: "Malformed tool calls and unsafe actions move into runtime.",
    examples: [
      { domain: DOMAINS[0], text: "Patch only after a diff preview clears lint and test gates." },
      { domain: DOMAINS[1], text: "Publish only after a tone check against the requested style guide." },
      { domain: DOMAINS[2], text: "Greenlight the pilot only after the risk and rollback plan is written down." },
    ],
  },
  {
    name: "Inspect",
    definition: "Output verification against evidence and acceptance criteria.",
    ifSkipped: "Hallucinations and logic drift become part of the baseline.",
    examples: [
      { domain: DOMAINS[0], text: "Verify against tests, type checks, and behavioral diffs, not just “it compiles.”" },
      { domain: DOMAINS[1], text: "Read the final draft against the original intent, not against how polished it sounds." },
      { domain: DOMAINS[2], text: "Check the pilot's numbers against the original success definition, not against how the demo felt." },
    ],
  },
  {
    name: "Intervene",
    definition: "Explicit human authority to pause, redirect, or reject.",
    ifSkipped: "Autonomy scales faster than accountability.",
    examples: [
      { domain: DOMAINS[0], text: "Block a migration that has no rollback proof, no matter how confident the output looks." },
      { domain: DOMAINS[1], text: "Kill a post that reads as generic thought leadership before it goes out." },
      { domain: DOMAINS[2], text: "Pause a rollout when adoption data contradicts the pitch deck." },
    ],
  },
  {
    name: "Iterate",
    definition: "Turns corrections into reusable system memory: tests, prompts, policies, examples.",
    ifSkipped: "The same errors recur in new language.",
    examples: [
      { domain: DOMAINS[0], text: "Turn the incident fix into a regression test, not just a patched file." },
      { domain: DOMAINS[1], text: "Turn a recurring reader question into a reusable talking point or FAQ entry." },
      { domain: DOMAINS[2], text: "Turn a failed pilot into an updated intake checklist for the next client." },
    ],
  },
];

const STAGE_ACCENTS = [
  "var(--accent-amber)",
  "var(--accent-cyan)",
  "var(--accent-purple)",
  "var(--accent-pink)",
  "var(--accent-green)",
  "var(--accent-blue)",
  "var(--accent-amber)",
];

function polar(index: number, total: number, radiusPct: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return {
    x: 50 + radiusPct * Math.cos(angle),
    y: 50 + radiusPct * Math.sin(angle),
  };
}

export default function I7LoopInteractive() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [domainTab, setDomainTab] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % STAGES.length);
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i - 1 + STAGES.length) % STAGES.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const active = STAGES[activeIndex];
  const accent = STAGE_ACCENTS[activeIndex];
  const positions = useMemo(() => STAGES.map((_, i) => polar(i, STAGES.length, 42)), []);
  const circumference = useMemo(() => 2 * Math.PI * 42, []);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* ── Ring diagram ── */}
      <div className="relative w-full max-w-[360px] mx-auto lg:mx-0 shrink-0" style={{ aspectRatio: "1 / 1" }}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
          <circle cx="50" cy="50" r="42" fill="none" stroke="var(--card-border)" strokeWidth="0.6" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={accent}
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.045} ${circumference}`}
            className="i7-ring-pulse"
            style={{ transformOrigin: "50px 50px" }}
            opacity="0.85"
          />
          {positions.map((p, i) => {
            const next = positions[(i + 1) % positions.length];
            return (
              <line
                key={`spoke-${i}`}
                x1={p.x}
                y1={p.y}
                x2={next.x}
                y2={next.y}
                stroke="var(--card-border)"
                strokeWidth="0.35"
                opacity="0.5"
              />
            );
          })}
        </svg>

        {positions.map((p, i) => {
          const isActive = i === activeIndex;
          const isHover = i === hoverIndex;
          return (
            <button
              key={STAGES[i].name}
              onClick={() => setActiveIndex(i)}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              aria-pressed={isActive}
              aria-label={`${STAGES[i].name} stage`}
              className="absolute flex flex-col items-center gap-1.5 cursor-pointer -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <motion.span
                animate={{
                  scale: isActive ? 1.35 : isHover ? 1.15 : 1,
                  backgroundColor: isActive ? STAGE_ACCENTS[i] : "var(--card-bg)",
                  borderColor: STAGE_ACCENTS[i],
                }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="block rounded-full"
                style={{
                  width: 12,
                  height: 12,
                  border: "1.5px solid",
                  boxShadow: isActive ? `0 0 0 4px color-mix(in srgb, ${STAGE_ACCENTS[i]} 22%, transparent)` : "none",
                }}
              />
              <span
                className="text-[10px] sm:text-[11px] font-mono font-semibold whitespace-nowrap transition-colors duration-200"
                style={{ color: isActive ? STAGE_ACCENTS[i] : "var(--text-muted)" }}
              >
                {String(i + 1).padStart(2, "0")} {STAGES[i].name}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Detail panel ── */}
      <div
        className="flex-1 w-full flex flex-col gap-4"
        style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "6px", padding: "1.5rem" }}
      >
        <div className="flex flex-col gap-4">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono" style={{ color: accent }}>
                {String(activeIndex + 1).padStart(2, "0")} / 07
              </span>
              <h3 className="font-heading text-xl font-bold" style={{ color: "var(--text-primary)" }}>{active.name}</h3>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{active.definition}</p>

            <div className="pl-3" style={{ borderLeft: "2px solid var(--accent-pink)" }}>
              <span className="text-[9px] font-mono uppercase tracking-[0.16em] block mb-1" style={{ color: "var(--accent-pink)" }}>If skipped</span>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{active.ifSkipped}</p>
            </div>

            <div className="flex flex-col gap-2.5 pt-1">
              <div className="flex flex-wrap gap-1.5">
                {DOMAINS.map((d, di) => (
                  <button
                    key={d}
                    onClick={() => setDomainTab(di)}
                    className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold transition-all cursor-pointer"
                    style={{
                      background: domainTab === di ? "color-mix(in srgb, var(--accent-cyan) 16%, var(--card-bg))" : "transparent",
                      border: `1px solid ${domainTab === di ? "var(--accent-cyan)" : "var(--card-border)"}`,
                      color: domainTab === di ? "var(--accent-cyan)" : "var(--text-muted)",
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <motion.p
                key={`${activeIndex}-${domainTab}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="text-xs leading-relaxed pl-3"
                style={{ color: "var(--text-secondary)", borderLeft: "2px solid var(--accent-cyan)" }}
              >
                {active.examples[domainTab].text}
              </motion.p>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center justify-between mt-1 pt-4" style={{ borderTop: "1px solid var(--card-border)" }}>
          <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>&larr; &rarr; to browse stages</span>
          <Link
            href="/systems/i-7-cognitive-loop/"
            className="text-[11px] font-mono font-semibold link-slide"
            style={{ color: "var(--accent-amber)" }}
          >
            Full framework &rarr;
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes i7-ring-travel {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: ${-circumference}px; }
        }
        .i7-ring-pulse {
          animation: i7-ring-travel 9s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .i7-ring-pulse { animation: none; }
        }
      `}</style>
    </div>
  );
}
