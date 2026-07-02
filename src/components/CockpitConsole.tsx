"use client";

import { useState, useEffect } from "react";

type SectionType = "toolsmith" | "flowright" | "tessera" | "content";

const TABS: { id: SectionType; name: string; status: string; sub: string }[] = [
  { id: "toolsmith", name: "ToolSmith Bench",  status: "Browser Prototype", sub: "Local-first client utilities" },
  { id: "flowright", name: "Governance Engine", status: "Verified Proof",     sub: "Review gates & policies" },
  { id: "tessera",   name: "Tessera Wiring",    status: "Planned",            sub: "JobPack composition layer" },
  { id: "content",   name: "Content Engine",    status: "Planned",            sub: "Schema-validated docs" },
];

export default function CockpitConsole() {
  const [activeTab, setActiveTab] = useState<SectionType>("toolsmith");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  useEffect(() => {
    let logs: string[] = [];
    switch (activeTab) {
      case "toolsmith":
        logs = [
          "SYSTEM: Initializing ToolSmith Bench...",
          "MODULE: Loaded browser-native schema validator.",
          "CHECK: Prompt input token length: 256ch",
          "CHECK: Matching output type constraint JSON... OK",
          "STATUS: Sandbox ready. Awaiting human input.",
        ];
        break;
      case "flowright":
        logs = [
          "SYSTEM: Loading Governance Proof...",
          "RULE: No direct changes allowed in foundations.",
          "CHECK: Comparing commit vs schema constraints...",
          "GATE: Review verification... REQUIRED",
          "DEPLOY: Direct production push... DENIED (review gate active)",
        ];
        break;
      case "tessera":
        logs = [
          "SYSTEM: Simulating Tessera JobPack...",
          "WARN: Local runtime targets not connected (planned).",
          "COMPILING: Blueprint wiring code v0.1.0-alpha...",
          "OUTPUT: Export package to JSON: target-checklists.json",
          "STATUS: Compilation complete. Ready for manual review.",
        ];
        break;
      case "content":
        logs = [
          "SYSTEM: Loading Content Schema Engine...",
          "VALIDATING: systems collection (33 documents)...",
          "VALIDATING: sentences collection (13 documents)...",
          "RESULT: All frontmatter validated successfully.",
          "STATUS: Parity build passing.",
        ];
        break;
    }

    setTerminalLogs([]);
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setTerminalLogs((prev) => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 450);
    return () => clearInterval(interval);
  }, [activeTab]);

  const logColor = (log: string) => {
    if (log.includes("DENIED")) return "var(--accent-pink)";
    if (log.includes("APPROVED") || log.includes("OK") || /success|passing/i.test(log)) return "var(--accent-green)";
    if (log.includes("WARN")) return "var(--accent-amber)";
    if (log.includes("SYSTEM")) return "var(--text-primary)";
    return "var(--text-secondary)";
  };

  return (
    <div
      className="w-full overflow-hidden flex flex-col md:grid md:grid-cols-12 min-h-[420px] max-w-[950px] mx-auto card-glass"
      style={{ borderRadius: "4px" }}
    >
      {/* Sidebar */}
      <div
        className="col-span-4 p-4 flex flex-col gap-2"
        style={{ borderBottom: "1px solid var(--card-border)", background: "var(--bg-surface)" }}
      >
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-cyan)" }} />
          <span className="font-mono font-bold text-[10px] uppercase tracking-[0.16em]" style={{ color: "var(--text-primary)" }}>
            Systems Telemetry Console
          </span>
        </div>

        {TABS.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="w-full text-left p-3 transition-all text-xs font-mono flex flex-col gap-1 cursor-pointer"
              style={{
                borderRadius: "3px",
                border: `1px solid ${active ? "var(--card-border-hover)" : "transparent"}`,
                background: active ? "var(--card-bg-hover)" : "transparent",
              }}
            >
              <div className="flex justify-between items-center w-full gap-2">
                <span className="font-bold" style={{ color: active ? "var(--text-primary)" : "var(--text-secondary)" }}>
                  {tab.name}
                </span>
                <span className="text-[8px] uppercase tracking-wider" style={{ color: "var(--accent-cyan)" }}>
                  {tab.status}
                </span>
              </div>
              <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{tab.sub}</span>
            </button>
          );
        })}
      </div>

      {/* Terminal */}
      <div className="col-span-8 p-6 flex flex-col justify-between font-mono text-xs ledger-surface">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center pb-3 mb-1" style={{ borderBottom: "1px solid var(--card-border)" }}>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--accent-pink)" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--accent-amber)" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--accent-green)" }} />
            </div>
            <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              {activeTab}.sys.log
            </span>
          </div>

          <div className="flex flex-col gap-2 min-h-[160px]">
            {terminalLogs.map((log, idx) =>
              log ? (
                <div key={idx} className="leading-relaxed" style={{ color: logColor(log) }}>
                  &gt; {log}
                </div>
              ) : null
            )}
            <span className="inline-block w-1.5 h-3.5 ml-0.5" style={{ background: "var(--accent-cyan)", animation: "ink-flicker 1.1s infinite" }} />
          </div>
        </div>

        {/* State badges */}
        <div className="pt-4 mt-4 grid grid-cols-2 gap-3" style={{ borderTop: "1px solid var(--card-border)" }}>
          <div className="p-2.5 flex flex-col justify-center" style={{ border: "1px solid var(--card-border)", borderRadius: "3px" }}>
            <span className="text-[10px] uppercase" style={{ color: "var(--text-muted)" }}>Review Gate</span>
            <span className="text-xs font-bold mt-0.5 flex items-center gap-1.5" style={{ color: "var(--accent-green)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-green)" }} />
              REQUIRED
            </span>
          </div>
          <div className="p-2.5 flex flex-col justify-center" style={{ border: "1px solid var(--card-border)", borderRadius: "3px" }}>
            <span className="text-[10px] uppercase" style={{ color: "var(--text-muted)" }}>Autonomous Deploy</span>
            <span className="text-xs font-bold mt-0.5 flex items-center gap-1.5" style={{ color: "var(--accent-pink)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-pink)" }} />
              DENIED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
