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
    <div className="card-glass p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[520px] border-accent-pink/20 shadow-premium">
      {/* Input Panel */}
      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-pink animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-secondary">
              SPEC_INPUT // raw_notes
            </span>
          </div>
          <button
            onClick={loadSample}
            className="px-3 py-1 text-[11px] font-mono rounded-lg bg-white/5 border border-white/10 text-text-secondary hover:bg-white/10 hover:text-[var(--text-primary)] transition-all cursor-pointer"
          >
            LOAD SAMPLE NOTES
          </button>
        </div>
        
        <div className="relative flex-grow flex flex-col">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste raw, messy notes or ideas here...&#10;Example:&#10;We need a light mode cycle. The user wants it.&#10;Let's store theme key under systems-theme.&#10;Let's make sure it doesn't bleed.&#10;Need to add Sun/Moon icons."
            className="w-full flex-grow min-h-[300px] bg-black/40 border border-white/5 rounded-xl p-4 text-xs font-sans text-[var(--text-primary)] focus:border-accent-pink/60 focus:bg-black/50 outline-none resize-none transition-all duration-300 placeholder:text-text-muted"
          />
        </div>

        <button
          onClick={handleCompile}
          className="btn-premium btn-primary w-full py-3.5 shadow-glow-pink from-accent-pink to-accent-orange font-heading font-bold text-sm tracking-wide uppercase transition-all duration-300 hover:scale-[1.01]"
        >
          Format & Compile Brief
        </button>
      </div>

      {/* Output Panel */}
      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-secondary">
              SPEC_OUTPUT // markdown_brief
            </span>
          </div>
          {outputBrief && (
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="px-3 py-1 text-[11px] font-mono rounded-lg bg-accent-purple/10 border border-accent-purple/20 text-accent-purple hover:bg-accent-purple/20 hover:border-accent-purple/40 transition-all cursor-pointer"
              >
                PRINT
              </button>
              <button
                onClick={handleCopy}
                className="px-3 py-1 text-[11px] font-mono rounded-lg bg-accent-pink/10 border border-accent-pink/20 text-accent-pink hover:bg-accent-pink/20 hover:border-accent-pink/40 transition-all cursor-pointer"
              >
                {copyText}
              </button>
            </div>
          )}
        </div>
        
        <div className="flex-grow min-h-[340px] bg-black/50 border border-white/5 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          {!outputBrief ? (
            <div className="flex-grow flex flex-col items-center justify-center gap-3 relative z-10 py-12">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-12 h-12 text-text-muted animate-pulse">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              <p className="text-[11px] font-mono text-text-muted uppercase tracking-wider">Awaiting spec briefing notes compilation...</p>
            </div>
          ) : (
            <div className="flex-grow flex flex-col justify-between relative z-10 h-full">
              <pre className="w-full max-h-[310px] text-xs font-mono text-text-secondary whitespace-pre overflow-auto self-start">
                <code>{outputBrief}</code>
              </pre>
              
              {/* Telemetry status block */}
              <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between text-[10px] font-mono text-accent-pink">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-pink animate-ping"></span>
                  <span>[BRIEFING]: READY // MARKDOWN_SPEC_EMITTED</span>
                </div>
                <span className="text-text-muted">PRINT_READY</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
