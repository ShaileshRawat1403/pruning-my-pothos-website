"use client";

import { useState } from "react";
import TerminalSim, { SimStep, StepStatus } from "./TerminalSim";

export interface Finding {
  severity: "err" | "warn" | "info" | "ok";
  label: string;
  line?: number;
  detail?: string;
}

interface LintConsoleProps {
  accent: string;
  /** the command echoed in the run, e.g. "tessera run --pack dockerfile" */
  command: string;
  /** which pack this previews, shown in the output header, e.g. "tesserakit-dockerfile" */
  pack: string;
  placeholder: string;
  sample: string;
  analyze: (text: string) => Finding[];
  /** witty summary lines for the run */
  voice: { clean: string; dirty: string };
}

const SEV_ICON: Record<Finding["severity"], string> = { err: "✕", warn: "⚠", info: "›", ok: "✔" };
const SEV_COLOR: Record<Finding["severity"], string> = {
  err: "var(--accent-purple)",
  warn: "var(--accent-amber)",
  info: "var(--text-muted)",
  ok: "var(--accent-green)",
};

export default function LintConsole({ accent, command, pack, placeholder, sample, analyze, voice }: LintConsoleProps) {
  const [input, setInput] = useState("");
  const [findings, setFindings] = useState<Finding[] | null>(null);
  const [runKey, setRunKey] = useState(0);
  const [showOutput, setShowOutput] = useState(false);

  const run = () => {
    const text = input.trim();
    if (!text) { alert("Paste something to check first."); return; }
    setFindings(analyze(text));
    setShowOutput(false);
    setRunKey((k) => k + 1);
  };

  const errs = findings?.filter((f) => f.severity === "err").length ?? 0;
  const warns = findings?.filter((f) => f.severity === "warn").length ?? 0;
  const total = findings?.length ?? 0;

  const steps: SimStep[] = findings
    ? [
        { text: "Parsing input surface...", status: "ok" as StepStatus },
        { text: `Applying ${pack} rules...`, status: "ok" as StepStatus, ms: 750 },
        total === 0
          ? { text: voice.clean, status: "ok" as StepStatus, ms: 800 }
          : { text: `${total} finding${total === 1 ? "" : "s"}${errs ? `, ${errs} critical` : ""}. ${voice.dirty}`, status: errs ? "err" : "warn", ms: 850 },
        { text: "Static only. Nothing executed against your input.", status: "info" as StepStatus },
      ]
    : [];

  return (
    <div className="card-glass p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[520px]" style={{ borderTop: `3px solid ${accent}` }}>
      {/* Input */}
      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
            <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>INPUT</span>
          </div>
          <button
            onClick={() => setInput(sample)}
            className="px-3 py-1 text-[11px] font-mono rounded-sm"
            style={{ background: "color-mix(in srgb, var(--text-primary) 5%, transparent)", border: "1px solid var(--card-border)", color: "var(--text-secondary)" }}
          >
            LOAD SAMPLE
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="w-full flex-grow min-h-[300px] p-4 text-xs font-mono outline-none resize-none rounded-sm"
          style={{ background: "var(--bg-color)", border: "1px solid var(--card-border)", color: "var(--text-primary)" }}
        />
        <button onClick={run} className="btn-premium btn-primary w-full font-heading font-bold uppercase tracking-wide">Run check</button>
      </div>

      {/* Output */}
      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: "var(--accent-green)" }} />
          <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>OUTPUT // {pack}</span>
        </div>

        {!findings ? (
          <div className="flex-grow min-h-[300px] rounded-sm flex flex-col items-center justify-center gap-3 text-center p-8" style={{ background: "var(--bg-color)", border: "1px dashed var(--card-border)" }}>
            <p className="text-[11px] font-mono uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Paste, then run. Findings appear here.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <TerminalSim command={command} steps={steps} runKey={runKey} onComplete={() => setShowOutput(true)} />
            {showOutput && (
              <div className="flex flex-col gap-2 animate-fade-in">
                <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                  <span>{total} finding{total === 1 ? "" : "s"}</span>
                  {errs > 0 && <span style={{ color: "var(--accent-purple)" }}>{errs} critical</span>}
                  {warns > 0 && <span style={{ color: "var(--accent-amber)" }}>{warns} warning{warns === 1 ? "" : "s"}</span>}
                </div>
                {total === 0 ? (
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Clean surface. Nothing to flag.</p>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    {findings.map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs px-3 py-2 rounded-sm" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                        <span className="shrink-0 font-mono" style={{ color: SEV_COLOR[f.severity], width: "1.1em", textAlign: "center" }}>{SEV_ICON[f.severity]}</span>
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <span className="font-mono font-semibold" style={{ color: "var(--text-primary)" }}>
                            {f.label}{f.line ? <span style={{ color: "var(--text-muted)" }}> · L{f.line}</span> : null}
                          </span>
                          {f.detail && <span className="leading-snug" style={{ color: "var(--text-secondary)" }}>{f.detail}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
