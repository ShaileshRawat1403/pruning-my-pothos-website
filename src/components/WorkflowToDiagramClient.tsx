"use client";

import { useState, useEffect } from "react";
import mermaid from "mermaid";

const SAMPLE_TEXT = `Step 1: Check code quality checks.
Step 2: If lint fails, notify developer and halt build.
Step 3: If lint passes, run test harness suite.
Step 4: If tests pass, trigger automatic preview deployments.
Step 5: If tests fail, generate failure log and block pull request.`;

export default function WorkflowToDiagramClient() {
  const [inputText, setInputText] = useState("");
  const [mermaidCode, setMermaidCode] = useState("");
  const [diagramSvg, setDiagramSvg] = useState("");
  const [copyMermaidText, setCopyMermaidText] = useState("Copy Mermaid");
  const [copyJsonText, setCopyJsonText] = useState("Copy JSON");

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      themeVariables: {
        primaryColor: "#8b5cf6",
        primaryTextColor: "#fff",
        lineColor: "#4f46e5",
        primaryBorderColor: "#374151",
      },
    });
  }, []);

  const loadSample = () => {
    setInputText(SAMPLE_TEXT);
  };

  const compileTextToMermaid = (text: string) => {
    const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    let chart = "flowchart TD\n";
    let nodes: Array<{ id: string; label: string; isConditional: boolean }> = [];
    
    lines.forEach((line, index) => {
      let label = line;
      let nodeId = `node${index + 1}`;
      
      const stepMatch = line.match(/^Step\s*\d+:\s*(.*)/i);
      if (stepMatch) {
        label = stepMatch[1];
      }

      const isConditional = line.toLowerCase().includes("if");
      nodes.push({ id: nodeId, label, isConditional });
    });

    for (let i = 0; i < nodes.length; i++) {
      const current = nodes[i];
      let cleanLabel = current.label.replace(/"/g, '\\"');
      
      if (current.isConditional) {
        chart += `  ${current.id}{"${cleanLabel}"}\n`;
      } else {
        chart += `  ${current.id}["${cleanLabel}"]\n`;
      }

      if (i < nodes.length - 1) {
        const next = nodes[i + 1];
        if (current.isConditional) {
          chart += `  ${current.id} -->|Yes| ${next.id}\n`;
          if (i < nodes.length - 2) {
            chart += `  ${current.id} -->|No| ${nodes[i + 2].id}\n`;
          }
        } else {
          chart += `  ${current.id} --> ${next.id}\n`;
        }
      }
    }

    return chart;
  };

  const handleCompile = async () => {
    const text = inputText.trim();
    if (!text) return;

    const chart = compileTextToMermaid(text);
    setMermaidCode(chart);

    try {
      const uniqueId = `mermaid-svg-${Date.now()}`;
      const { svg } = await mermaid.render(uniqueId, chart);
      setDiagramSvg(svg);
    } catch (err: any) {
      console.error(err);
      setDiagramSvg(`<div class="text-red-400 font-mono text-xs">Failed to generate flowchart schema: ${err.message}</div>`);
    }
  };

  const handleCopyMermaid = () => {
    if (!mermaidCode) return;
    navigator.clipboard.writeText(mermaidCode).then(() => {
      setCopyMermaidText("Copied!");
      setTimeout(() => setCopyMermaidText("Copy Mermaid"), 1500);
    });
  };

  const handleCopyJson = () => {
    if (!mermaidCode) return;
    const jsonStr = JSON.stringify({ mermaid: mermaidCode, text: inputText }, null, 2);
    navigator.clipboard.writeText(jsonStr).then(() => {
      setCopyJsonText("Copied!");
      setTimeout(() => setCopyJsonText("Copy JSON"), 1500);
    });
  };

  const handleDownloadSvg = () => {
    if (!diagramSvg) return;
    const blob = new Blob([diagramSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "flowchart.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card-glass p-6 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[480px]">
      {/* Input Panel */}
      <div className="flex flex-col gap-3 min-w-0">
        <div className="flex justify-between items-center text-xs font-heading font-semibold uppercase tracking-wider text-[var(--text-primary)]">
          <span>1. Input Workflow Text</span>
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
          placeholder="Paste or type a step-by-step process here...&#10;Example:&#10;Step 1: Parse incoming webhook change requests.&#10;Step 2: Check files modified. If only Markdown, skip human gate and auto-approve.&#10;Step 3: If code changes, trigger RAG test suite runner.&#10;Step 4: Audit failures. If tests fail, open GitHub issue. Else, queue deployment loop."
          className="flex-grow min-h-[280px] bg-black/25 border border-[var(--card-border)] rounded-xl p-4 text-xs font-mono text-[var(--text-primary)] focus:border-accent-cyan outline-none resize-none"
        />
        <button
          onClick={handleCompile}
          className="btn-premium btn-primary w-full py-3 cursor-pointer"
        >
          Generate Flowchart
        </button>
      </div>

      {/* Output Panel */}
      <div className="flex flex-col gap-3 min-w-0">
        <div className="flex justify-between items-center text-xs font-heading font-semibold uppercase tracking-wider text-[var(--text-primary)]">
          <span>2. Live Flow Canvas</span>
          {diagramSvg && (
            <div className="flex gap-2">
              <button
                onClick={handleDownloadSvg}
                className="px-2.5 py-1 text-[11px] rounded bg-white/5 border border-white/10 text-accent-purple hover:bg-accent-purple/10 hover:border-accent-purple/40 transition-all cursor-pointer"
              >
                Download SVG
              </button>
              <button
                onClick={handleCopyMermaid}
                className="px-2.5 py-1 text-[11px] rounded bg-white/5 border border-white/10 text-accent-cyan hover:bg-accent-cyan/10 hover:border-accent-cyan/40 transition-all cursor-pointer"
              >
                {copyMermaidText}
              </button>
              <button
                onClick={handleCopyJson}
                className="px-2.5 py-1 text-[11px] rounded bg-white/5 border border-white/10 text-accent-cyan hover:bg-accent-cyan/10 hover:border-accent-cyan/40 transition-all cursor-pointer"
              >
                {copyJsonText}
              </button>
            </div>
          )}
        </div>

        <div className="flex-grow min-h-[340px] bg-black/40 border border-[var(--card-border)] rounded-xl p-4 flex items-center justify-center relative overflow-auto">
          {!diagramSvg ? (
            <div className="text-center flex flex-col items-center gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-text-muted">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              <p className="text-xs text-text-muted">Click Generate to render the flowchart</p>
            </div>
          ) : (
            <div 
              className="w-full h-full flex items-center justify-center text-text-secondary overflow-auto self-start"
              dangerouslySetInnerHTML={{ __html: diagramSvg }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
