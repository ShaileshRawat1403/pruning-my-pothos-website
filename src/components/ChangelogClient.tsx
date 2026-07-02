"use client";

import { useState } from "react";
import TerminalSim, { SimStep } from "./TerminalSim";
import { runConsole } from "./ConsoleToastHost";

const SAMPLE = `a1b2c3d feat(auth): add single sign-on
e4f5g6h fix(api): null check on empty payload
i7j8k9l feat!: drop legacy v1 endpoints
m0n1o2p perf(db): index the orders table
q3r4s5t docs: rewrite the quickstart
u6v7w8x chore: bump dev dependencies
y9z0a1b fix: correct rounding on totals`;

const TITLES: Record<string, string> = {
  feat: "Features", fix: "Fixes", perf: "Performance", refactor: "Refactors",
  docs: "Documentation", build: "Build", ci: "CI", test: "Tests", chore: "Chores", style: "Style", revert: "Reverts",
};
const ORDER = ["feat", "fix", "perf", "refactor", "docs", "build", "ci", "test", "chore", "style", "revert"];

function generate(text: string): { md: string; matched: number; sections: number; breaking: number } {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const groups: Record<string, string[]> = {};
  const breaking: string[] = [];
  let matched = 0;

  for (const raw of lines) {
    const line = raw.replace(/^[0-9a-f]{7,40}\s+/i, "");
    const m = line.match(/^(\w+)(?:\(([^)]+)\))?(!)?:\s*(.+)$/);
    if (!m) continue;
    matched += 1;
    const type = m[1].toLowerCase();
    const scope = m[2];
    const bang = m[3];
    const subject = m[4];
    const entry = scope ? `**${scope}:** ${subject}` : subject;
    if (bang || /BREAKING[ -]CHANGE/i.test(raw)) breaking.push(entry);
    (groups[type] ||= []).push(entry);
  }

  let md = "# Changelog\n";
  let sections = 0;
  if (breaking.length) {
    md += `\n## Breaking Changes\n` + breaking.map((e) => `- ${e}`).join("\n") + "\n";
    sections += 1;
  }
  for (const t of ORDER) {
    if (groups[t]?.length) {
      md += `\n## ${TITLES[t]}\n` + groups[t].map((e) => `- ${e}`).join("\n") + "\n";
      sections += 1;
    }
  }
  return { md: md.trim(), matched, sections, breaking: breaking.length };
}

export default function ChangelogClient() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof generate> | null>(null);
  const [runKey, setRunKey] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy CHANGELOG.md");

  const run = () => {
    const text = input.trim();
    if (!text) { alert("Paste some commit subjects or a git log first."); return; }
    setResult(generate(text));
    setShowOutput(false);
    setRunKey((k) => k + 1);
  };

  const steps: SimStep[] = result
    ? [
        { text: "Parsing conventional commits...", status: "ok" },
        { text: "Grouping by type, promoting breaking changes...", status: "ok", ms: 750 },
        result.matched === 0
          ? { text: "No conventional commits found. Nothing to render.", status: "warn", ms: 800 }
          : { text: `${result.matched} commit${result.matched === 1 ? "" : "s"} across ${result.sections} section${result.sections === 1 ? "" : "s"}${result.breaking ? `, ${result.breaking} breaking` : ""}.`, status: result.breaking ? "warn" : "ok", ms: 800 },
        { text: "Generated CHANGELOG.md.", status: "info" },
      ]
    : [];

  const copy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.md).then(() => {
      setCopyLabel("Copied");
      setTimeout(() => setCopyLabel("Copy CHANGELOG.md"), 1500);
      runConsole("yank", {
        command: "yank",
        steps: [
          { text: "In the clipboard, out of context.", status: "ok" },
          { text: "Paste responsibly.", status: "info" },
        ],
      }, { once: true });
    });
  };

  return (
    <div className="card-glass p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[520px]" style={{ borderTop: "3px solid var(--accent-green)" }}>
      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--accent-green)" }} />
            <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>INPUT // git log</span>
          </div>
          <button onClick={() => setInput(SAMPLE)} className="px-3 py-1 text-[11px] font-mono rounded-sm" style={{ background: "color-mix(in srgb, var(--text-primary) 5%, transparent)", border: "1px solid var(--card-border)", color: "var(--text-secondary)" }}>LOAD SAMPLE</button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste commit subjects or `git log --oneline`. Conventional Commits (feat, fix, feat!: ...) become a grouped changelog."
          className="w-full flex-grow min-h-[300px] p-4 text-xs font-mono outline-none resize-none rounded-sm"
          style={{ background: "var(--bg-color)", border: "1px solid var(--card-border)", color: "var(--text-primary)" }}
        />
        <button onClick={run} className="btn-premium btn-primary w-full font-heading font-bold uppercase tracking-wide">Compile changelog</button>
      </div>

      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--accent-green)" }} />
            <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>OUTPUT // tesserakit-changelog</span>
          </div>
          {showOutput && result && result.matched > 0 && (
            <button onClick={copy} className="px-3 py-1 text-[11px] font-mono rounded-sm" style={{ background: "color-mix(in srgb, var(--accent-green) 14%, transparent)", border: "1px solid var(--card-border-hover)", color: "var(--text-primary)" }}>{copyLabel}</button>
          )}
        </div>

        {!result ? (
          <div className="flex-grow min-h-[300px] rounded-sm flex items-center justify-center text-center p-8" style={{ background: "var(--bg-color)", border: "1px dashed var(--card-border)" }}>
            <p className="text-[11px] font-mono uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Paste commits, then compile.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <TerminalSim command="tessera run --pack changelog" steps={steps} runKey={runKey} onComplete={() => setShowOutput(true)} />
            {showOutput && result.matched > 0 && (
              <pre className="text-[11px] font-mono p-4 rounded-sm overflow-auto max-h-[320px] whitespace-pre-wrap animate-fade-in" style={{ background: "var(--bg-color)", border: "1px solid var(--card-border)", color: "var(--text-secondary)" }}>
                {result.md}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
