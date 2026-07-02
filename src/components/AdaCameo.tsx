"use client";

import { motion } from "framer-motion";

/**
 * Ada Lovelace, rendered as a Victorian cameo with programming wit:
 * her chignon is woven from a single looping thread that resolves into a
 * node (the loom that "weaves algebraic patterns"), a punched-card choker,
 * and a thought of braces + lambda. Engraved, not photographic.
 * Pure SVG, themed via CSS variables.
 */
export default function AdaCameo() {
  return (
    <div className="flex items-center justify-center w-full">
      <svg
        width="100%"
        height="208"
        viewBox="0 0 260 232"
        fill="none"
        role="img"
        aria-label="Ada Lovelace cameo - a Victorian profile whose bun is woven from a programming loop"
        style={{ maxWidth: "260px" }}
      >
        <defs>
          <clipPath id="cameoOval">
            <ellipse cx="130" cy="104" rx="86" ry="98" />
          </clipPath>
          <linearGradient id="silk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-purple)" stopOpacity="0.92" />
            <stop offset="100%" stopColor="var(--accent-purple)" stopOpacity="0.62" />
          </linearGradient>
        </defs>

        {/* Cameo field + faint loom warp */}
        <g clipPath="url(#cameoOval)">
          <ellipse cx="130" cy="104" rx="86" ry="98" fill="var(--bg-surface)" />
          {Array.from({ length: 13 }).map((_, i) => (
            <line
              key={i}
              x1={52 + i * 12}
              y1="6"
              x2={52 + i * 12}
              y2="202"
              stroke="var(--accent-cyan)"
              strokeWidth="0.5"
              opacity="0.12"
            />
          ))}

          {/* Profile silhouette (faces left) */}
          <path
            d="M168 30
               C140 22 110 34 100 64
               C96 76 84 80 81 92
               C79 100 90 99 86 108
               C83 116 93 114 94 122
               C95 129 86 133 94 141
               C99 147 108 148 112 159
               C117 172 120 181 127 193
               C132 203 144 210 159 214
               L205 214
               C206 180 201 150 204 120
               C214 108 216 86 206 72
               C198 50 192 36 168 30 Z"
            fill="url(#silk)"
            stroke="var(--accent-purple)"
            strokeWidth="1"
          />

          {/* Woven-thread chignon: one looping line resolving into a node */}
          <motion.path
            d="M196 58
               C224 60 224 96 198 98
               C176 100 178 70 200 74
               C214 77 212 92 199 90"
            fill="none"
            stroke="var(--accent-cyan)"
            strokeWidth="1.6"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.95 }}
            transition={{ duration: 1.6, delay: 0.5, ease: "easeInOut" }}
          />
          <circle cx="199" cy="90" r="2.4" fill="var(--accent-cyan)" />

          {/* Punched-card choker */}
          <rect x="120" y="176" width="44" height="13" rx="2" fill="var(--bg-color)" stroke="var(--accent-cyan)" strokeWidth="0.8" opacity="0.9" transform="rotate(14 142 182)" />
          {Array.from({ length: 4 }).map((_, i) => (
            <circle key={i} cx={127 + i * 10} cy={180 + i * 2.4} r="1.6" fill="var(--accent-cyan)" transform="rotate(14 142 182)" />
          ))}
        </g>

        {/* Cameo frame - engraved double ring */}
        <ellipse cx="130" cy="104" rx="86" ry="98" fill="none" stroke="var(--accent-cyan)" strokeWidth="1.5" opacity="0.85" />
        <ellipse cx="130" cy="104" rx="81" ry="93" fill="none" stroke="var(--accent-cyan)" strokeWidth="0.6" opacity="0.45" />

        {/* Thought of the first programmer */}
        <g opacity="0.9">
          <text x="40" y="58" fontFamily="var(--font-mono)" fontSize="17" fill="var(--accent-cyan)">{"{ }"}</text>
          <text x="30" y="104" fontFamily="var(--font-mono)" fontSize="15" fill="var(--text-muted)">λ</text>
          {/* little loop arrow */}
          <path d="M36 130 a9 9 0 1 1 -2 6" fill="none" stroke="var(--accent-purple)" strokeWidth="1.3" />
          <path d="M34 142 l-3 -3 l4 -2" fill="none" stroke="var(--accent-purple)" strokeWidth="1.3" />
        </g>

        {/* Caption ribbon */}
        <text x="130" y="226" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="2.5" fill="var(--text-muted)">
          A. LOVELACE · 1843
        </text>
      </svg>
    </div>
  );
}
