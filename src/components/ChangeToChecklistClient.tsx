"use client";

import { useState } from "react";

const SAMPLE_CHANGE = `I want to add a light mode toggle to SystemsLayout.astro, adjust systems.css rules, configure global.css, and verify mobile compilation.`;

export default function ChangeToChecklistClient() {
  const [inputText, setInputText] = useState("");
  const [checklist, setChecklist] = useState<any>(null);
  const [copyText, setCopyText] = useState("Copy Checklist");

  const loadSample = () => {
    setInputText(SAMPLE_CHANGE);
  };

  const handleAnalyze = () => {
    const rawValue = inputText.trim();
    if (!rawValue) {
      alert("Please describe your planned change first.");
      return;
    }

    let risk = "Low";
    let color = "#22c55e";
    let filesTouched = "Individual page components";
    let evidence = "npm run build executes successfully";
    
    const textLower = rawValue.toLowerCase();
    if (textLower.includes("routing") || textLower.includes("router") || textLower.includes("split") || textLower.includes("delete")) {
      risk = "Critical";
      color = "#ef4444";
      filesTouched = "Routing paths, index pages, slug layouts";
      evidence = "Manual verification of all affected routes + build status checks";
    } else if (textLower.includes("css") || textLower.includes("style") || textLower.includes("theme") || textLower.includes("global")) {
      risk = "Medium";
      color = "#f97316";
      filesTouched = "Global styles, layouts, layout wrappers";
      evidence = "Visual verification in browser + mobile screen check";
    }

    setChecklist({
      risk,
      color,
      filesTouched,
      evidence
    });
  };

  const handleCopy = () => {
    if (!checklist) return;
    const textOutput = `### Change Risk Checklist (${checklist.risk} Risk)\n- [ ] Verify that changes are restricted to intended files (no global bleed).\n- [ ] Ensure build compiles with zero compilation errors (npm run build).\n- [ ] Verify layout structure, responsive scaling, and alignment on mobile screen viewport.\n${checklist.risk === "Critical" ? "- [ ] [Gated Check] Obtain manual developer sign-off for routing split modifications.\n" : ""}- [ ] Record execution summary to ledger.jsonl file before merge.`;
    
    navigator.clipboard.writeText(textOutput).then(() => {
      setCopyText("Copied!");
      setTimeout(() => setCopyText("Copy Checklist"), 1500);
    });
  };

  return (
    <div className="card-glass p-6 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[480px]">
      {/* Input Panel */}
      <div className="flex flex-col gap-3 min-w-0">
        <div className="flex justify-between items-center text-xs font-heading font-semibold uppercase tracking-wider text-[var(--text-primary)]">
          <span>1. Describe the Planned Change</span>
          <button
            onClick={loadSample}
            className="px-2.5 py-1 text-[11px] rounded bg-white/5 border border-white/10 text-text-secondary hover:bg-white/12 hover:text-[var(--text-primary)] transition-all cursor-pointer"
          >
            Load Sample
          </button>
        </div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste issue details or explain what files/routings you want to change...&#10;Example:&#10;I want to change the homepage routing split from Sentiments to Systems, overhaul the global stylesheet variable themes, and run build checks."
          className="flex-grow min-h-[280px] bg-black/25 border border-[var(--card-border)] rounded-xl p-4 text-xs font-sans text-[var(--text-primary)] focus:border-accent-cyan outline-none resize-none line-height-relaxed"
        />
        <button
          onClick={handleAnalyze}
          className="btn-premium btn-primary w-full py-3 cursor-pointer"
        >
          Analyze Change & Generate Checklist
        </button>
      </div>

      {/* Output Panel */}
      <div className="flex flex-col gap-3 min-w-0">
        <div className="flex justify-between items-center text-xs font-heading font-semibold uppercase tracking-wider text-[var(--text-primary)]">
          <span>2. Generated HITL Checklist Gates</span>
          {checklist && (
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 text-[11px] rounded bg-white/5 border border-white/10 text-accent-cyan hover:bg-accent-cyan/10 hover:border-accent-cyan/40 transition-all cursor-pointer"
            >
              {copyText}
            </button>
          )}
        </div>

        <div className="flex-grow min-h-[340px] bg-black/40 border border-[var(--card-border)] rounded-xl p-6 flex items-center justify-center relative overflow-auto">
          {!checklist ? (
            <div className="text-center flex flex-col items-center gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-text-muted">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              <p className="text-xs text-text-muted">Click Analyze Change to compile review checklist</p>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col gap-4 text-sm text-text-secondary self-start">
              <div>
                <span 
                  className="px-2 py-0.5 border rounded text-[10px] font-mono font-bold uppercase"
                  style={{
                    backgroundColor: `${checklist.color}15`,
                    borderColor: `${checklist.color}40`,
                    color: checklist.color
                  }}
                >
                  {checklist.risk} Risk Change
                </span>
              </div>
              
              <div>
                <h4 className="font-heading text-sm font-semibold text-[var(--text-primary)] mb-1">Risk Assessment</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong>Potential impact area:</strong> {checklist.filesTouched}<br />
                  <strong>Required evidence:</strong> {checklist.evidence}
                </p>
              </div>

              <div className="border-t border-[var(--card-border)] pt-4">
                <h4 className="font-heading text-sm font-semibold text-[var(--text-primary)] mb-3">HITL Review Checklist</h4>
                <div className="flex flex-col gap-3">
                  <label className="flex items-start gap-2 text-xs text-text-secondary cursor-pointer">
                    <input type="checkbox" className="mt-0.5" />
                    <span>Verify that changes are restricted to intended files (no global bleed).</span>
                  </label>
                  <label className="flex items-start gap-2 text-xs text-text-secondary cursor-pointer">
                    <input type="checkbox" className="mt-0.5" />
                    <span>Ensure build compiles with zero compilation errors (npm run build).</span>
                  </label>
                  <label className="flex items-start gap-2 text-xs text-text-secondary cursor-pointer">
                    <input type="checkbox" className="mt-0.5" />
                    <span>Verify layout structure, responsive scaling, and alignment on mobile screen viewport.</span>
                  </label>
                  {checklist.risk === "Critical" && (
                    <label className="flex items-start gap-2 text-xs text-red-400 font-semibold cursor-pointer">
                      <input type="checkbox" className="mt-0.5" />
                      <span>[Gated Check] Obtain manual developer sign-off for routing split modifications.</span>
                    </label>
                  )}
                  <label className="flex items-start gap-2 text-xs text-text-secondary cursor-pointer">
                    <input type="checkbox" className="mt-0.5" />
                    <span>Record execution summary to ledger.jsonl file before merge.</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
