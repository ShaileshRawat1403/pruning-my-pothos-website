"use client";

import { useState, useEffect } from "react";

type SectionType = "toolsmith" | "flowright" | "tessera" | "content";

export default function CockpitConsole() {
  const [activeTab, setActiveTab] = useState<SectionType>("toolsmith");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto typing terminal logs based on active tab
  useEffect(() => {
    let logs: string[] = [];
    switch (activeTab) {
      case "toolsmith":
        logs = [
          "SYSTEM: Initializing ToolSmith Bench...",
          "MODULE: Loaded browser-native schema validator.",
          "CHECK: Prompt input token length: 256ch",
          "CHECK: Matching output type constraint JSON... OK",
          "STATUS: Sandbox ready. Awaiting human input."
        ];
        break;
      case "flowright":
        logs = [
          "SYSTEM: Loading Governance Proof...",
          "RULE: No direct changes allowed in sentences foundations.",
          "CHECK: Comparing commit vs schema constraints...",
          "GATE: Review verification... REQUIRED",
          "DEPLOY: Direct production push... DENIED (review gate active)"
        ];
        break;
      case "tessera":
        logs = [
          "SYSTEM: Simulating Tessera JobPack...",
          "WARN: Local runtime targets not connected (planned).",
          "COMPILING: Blueprint wiring code v0.1.0-alpha...",
          "OUTPUT: Export package to JSON: target-checklists.json",
          "STATUS: Compilation complete. Ready for manual review."
        ];
        break;
      case "content":
        logs = [
          "SYSTEM: Loading Content Schema Engine...",
          "VALIDATING: systems collection (33 documents)...",
          "VALIDATING: sentences collection (13 documents)...",
          "RESULT: All frontmatter validated successfully.",
          "STATUS: Parity build passing."
        ];
        break;
    }

    setTerminalLogs([]);
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setTerminalLogs(prev => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <div className="card-glass w-full overflow-hidden flex flex-col md:grid md:grid-cols-12 min-h-[420px] max-w-[950px] mx-auto border-accent-cyan/20">
      {/* Sidebar Navigation */}
      <div className="col-span-4 border-b md:border-b-0 md:border-r border-[var(--card-border)] p-4 flex flex-col gap-2 bg-black/10">
        <div className="flex items-center gap-2 mb-4 px-2">
          <span className="w-2.5 h-2.5 rounded-full bg-accent-cyan animate-pulse"></span>
          <span className="font-heading font-bold text-xs uppercase tracking-widest text-[var(--text-primary)]">
            Systems Lab Console
          </span>
        </div>
        
        <button
          onClick={() => setActiveTab("toolsmith")}
          className={`w-full text-left p-3 rounded-lg border transition-all text-xs font-mono flex flex-col gap-1 cursor-pointer ${
            activeTab === "toolsmith"
              ? "bg-accent-cyan/10 border-accent-cyan/35 text-[var(--text-primary)]"
              : "bg-transparent border-transparent text-text-secondary hover:bg-white/5"
          }`}
        >
          <div className="flex justify-between items-center w-full">
            <span className="font-bold">ToolSmith Bench</span>
            <span className="text-[10px] uppercase font-semibold text-accent-cyan">Browser Prototype</span>
          </div>
          <span className="text-[10px] text-text-muted">Local-first client utilities</span>
        </button>

        <button
          onClick={() => setActiveTab("flowright")}
          className={`w-full text-left p-3 rounded-lg border transition-all text-xs font-mono flex flex-col gap-1 cursor-pointer ${
            activeTab === "flowright"
              ? "bg-accent-purple/10 border-accent-purple/35 text-[var(--text-primary)]"
              : "bg-transparent border-transparent text-text-secondary hover:bg-white/5"
          }`}
        >
          <div className="flex justify-between items-center w-full">
            <span className="font-bold">Governance Engine</span>
            <span className="text-[10px] uppercase font-semibold text-accent-purple">Verified Proof</span>
          </div>
          <span className="text-[10px] text-text-muted">Review gates & policies</span>
        </button>

        <button
          onClick={() => setActiveTab("tessera")}
          className={`w-full text-left p-3 rounded-lg border transition-all text-xs font-mono flex flex-col gap-1 cursor-pointer ${
            activeTab === "tessera"
              ? "bg-accent-orange/10 border-accent-orange/35 text-[var(--text-primary)]"
              : "bg-transparent border-transparent text-text-secondary hover:bg-white/5"
          }`}
        >
          <div className="flex justify-between items-center w-full">
            <span className="font-bold">Tessera Wiring</span>
            <span className="text-[10px] uppercase font-semibold text-accent-orange">Planned</span>
          </div>
          <span className="text-[10px] text-text-muted">JobPack composition layer</span>
        </button>

        <button
          onClick={() => setActiveTab("content")}
          className={`w-full text-left p-3 rounded-lg border transition-all text-xs font-mono flex flex-col gap-1 cursor-pointer ${
            activeTab === "content"
              ? "bg-accent-pink/10 border-accent-pink/35 text-[var(--text-primary)]"
              : "bg-transparent border-transparent text-text-secondary hover:bg-white/5"
          }`}
        >
          <div className="flex justify-between items-center w-full">
            <span className="font-bold">Content Engine</span>
            <span className="text-[10px] uppercase font-semibold text-accent-pink">Planned</span>
          </div>
          <span className="text-[10px] text-text-muted">Schema-validated docs</span>
        </button>
      </div>

      {/* Terminal View */}
      <div className="col-span-8 p-6 flex flex-col justify-between bg-black/30 font-mono text-xs">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center border-b border-[var(--card-border)] pb-3 mb-1">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
            </div>
            <span className="text-[10px] text-text-muted uppercase tracking-wider">
              {activeTab}.sys.log
            </span>
          </div>

          <div className="flex flex-col gap-2 min-h-[160px] text-text-secondary">
            {terminalLogs.map((log, idx) => {
              let color = "text-text-secondary";
              if (log.includes("DENIED")) color = "text-red-400 font-bold";
              if (log.includes("APPROVED") || log.includes("OK") || log.includes("success")) color = "text-green-400 font-semibold";
              if (log.includes("WARN")) color = "text-yellow-400";
              if (log.includes("SYSTEM")) color = "text-accent-cyan font-bold";
              return (
                <div key={idx} className={`leading-relaxed ${color}`}>
                  &gt; {log}
                </div>
              );
            })}
            <span className="inline-block w-1.5 h-3.5 bg-accent-cyan animate-pulse ml-0.5"></span>
          </div>
        </div>

        {/* Real-time State Badges */}
        <div className="border-t border-[var(--card-border)] pt-4 mt-4 grid grid-cols-2 gap-4">
          <div className="border border-[var(--card-border)] rounded p-2.5 bg-black/20 flex flex-col justify-center">
            <span className="text-[10px] text-text-muted uppercase">Review Gate</span>
            <span className="text-xs font-bold text-accent-cyan mt-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping"></span>
              REQUIRED
            </span>
          </div>
          <div className="border border-[var(--card-border)] rounded p-2.5 bg-black/20 flex flex-col justify-center">
            <span className="text-[10px] text-text-muted uppercase">Autonomous Deploy</span>
            <span className="text-xs font-bold text-red-400 mt-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
              DENIED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
