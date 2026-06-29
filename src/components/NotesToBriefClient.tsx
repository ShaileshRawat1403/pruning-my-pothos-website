"use client";

import { useState } from "react";

const SAMPLE_NOTES = `Theme toggle work:
- We need a light mode cycle. The user wants it.
- Storing systems-theme in localStorage is key.
- Need to prevent state leakage to sentiments.
- Build checks are passing.`;

export default function NotesToBriefClient() {
  const [inputText, setInputText] = useState("");
  const [outputBrief, setOutputBrief] = useState("");
  const [copyText, setCopyText] = useState("Copy Markdown");

  const loadSample = () => {
    setInputText(SAMPLE_NOTES);
  };

  const handleCompile = () => {
    const rawValue = inputText.trim();
    if (!rawValue) {
      alert("Please paste some notes first.");
      return;
    }

    const lines = rawValue.split("\n").map(l => l.trim()).filter(Boolean);
    
    // Build structured markdown brief
    let mdOutput = `# Product Brief & Decisions\n\n`;
    mdOutput += `## Goals & Background\n`;
    mdOutput += `Processed from raw developer notes on: ${new Date().toLocaleDateString()}\n\n`;
    
    const decisions: string[] = [];
    const tasks: string[] = [];
    
    lines.forEach(l => {
      if (l.toLowerCase().includes("need") || l.toLowerCase().includes("want")) {
        decisions.push(l.replace(/^[-\*\s]+/, ""));
      } else if (l.startsWith("-") || l.startsWith("*")) {
        tasks.push(l.replace(/^[-\*\s]+/, ""));
      } else {
        mdOutput += `${l}\n`;
      }
    });

    if (decisions.length > 0) {
      mdOutput += `\n## Core Decisions\n`;
      decisions.forEach(d => {
        mdOutput += `- **Approved**: ${d}\n`;
      });
    }

    if (tasks.length > 0) {
      mdOutput += `\n## Action Checklist\n`;
      tasks.forEach(t => {
        mdOutput += `- [ ] ${t}\n`;
      });
    }

    setOutputBrief(mdOutput);
  };

  const handleCopy = () => {
    if (!outputBrief) return;
    navigator.clipboard.writeText(outputBrief).then(() => {
      setCopyText("Copied!");
      setTimeout(() => setCopyText("Copy Markdown"), 1500);
    });
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="card-glass p-6 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[480px]">
      {/* Input Panel */}
      <div className="flex flex-col gap-3 min-w-0">
        <div className="flex justify-between items-center text-xs font-heading font-semibold uppercase tracking-wider text-[var(--text-primary)]">
          <span>1. Paste Raw Developer Notes</span>
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
          placeholder="Paste raw, messy notes or ideas here...&#10;Example:&#10;We need a light mode cycle. The user wants it.&#10;Let's store theme key under systems-theme.&#10;Let's make sure it doesn't bleed.&#10;Need to add Sun/Moon icons."
          className="flex-grow min-h-[280px] bg-black/25 border border-[var(--card-border)] rounded-xl p-4 text-xs font-sans text-[var(--text-primary)] focus:border-accent-cyan outline-none resize-none"
        />
        <button
          onClick={handleCompile}
          className="btn-premium btn-primary w-full py-3 cursor-pointer"
        >
          Format & Compile Brief
        </button>
      </div>

      {/* Output Panel */}
      <div className="flex flex-col gap-3 min-w-0">
        <div className="flex justify-between items-center text-xs font-heading font-semibold uppercase tracking-wider text-[var(--text-primary)]">
          <span>2. Structured Product Brief</span>
          {outputBrief && (
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="px-2.5 py-1 text-[11px] rounded bg-white/5 border border-white/10 text-accent-purple hover:bg-accent-purple/10 hover:border-accent-purple/40 transition-all cursor-pointer"
              >
                Print Brief
              </button>
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 text-[11px] rounded bg-white/5 border border-white/10 text-accent-cyan hover:bg-accent-cyan/10 hover:border-accent-cyan/40 transition-all cursor-pointer"
              >
                {copyText}
              </button>
            </div>
          )}
        </div>

        <div className="flex-grow min-h-[340px] bg-black/40 border border-[var(--card-border)] rounded-xl p-4 flex items-center justify-center relative overflow-auto">
          {!outputBrief ? (
            <div className="text-center flex flex-col items-center gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-text-muted">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              <p className="text-xs text-text-muted">Click Format & Compile Brief to view structured results</p>
            </div>
          ) : (
            <pre className="w-full h-full text-xs font-mono text-text-secondary whitespace-pre overflow-auto self-start">
              <code>{outputBrief}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
