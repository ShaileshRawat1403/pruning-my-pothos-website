"use client";

import { useState } from "react";

const SAMPLE_CSV = `query,response,expected_criteria
"What is the system theme?","Sans Serif Systems uses a dark cyber theme.","Must reference dark cyber theme"
"Explain guided loops.","Guided loops use evaluation checks to auto-correct errors.","Should mention eval checks and self-correction"`;

export default function CsvToEvalClient() {
  const [inputText, setInputText] = useState("");
  const [outputJsonl, setOutputJsonl] = useState("");
  const [copyText, setCopyText] = useState("Copy JSONL");

  const loadSample = () => {
    setInputText(SAMPLE_CSV);
  };

  const handleCompile = () => {
    const rawValue = inputText.trim();
    if (!rawValue) {
      alert("Please paste some CSV data first.");
      return;
    }

    try {
      const lines = rawValue.split("\n");
      if (lines.length < 2) {
        alert("Invalid CSV: Needs at least a header row and one data row.");
        return;
      }

      // Simple CSV cell splitter (handles quotes)
      const parseRow = (text: string) => {
        const matches = text.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || text.split(",");
        return matches.map((c) => c.replace(/^["']|["']$/g, "").trim());
      };

      const headers = parseRow(lines[0]);
      const jsonlEntries: string[] = [];

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const row = parseRow(lines[i]);
        const entry: any = {};
        headers.forEach((h, index) => {
          entry[h] = row[index] || "";
        });

        // Structure as a canonical evaluation unit
        jsonlEntries.push(
          JSON.stringify(
            {
              input: entry.query || entry.input || "",
              output: entry.response || entry.output || "",
              evaluation_rubric: {
                assertions: [
                  {
                    type: "contains_phrase",
                    expected:
                      entry.expected_criteria ||
                      entry.expected ||
                      "Must provide accurate context",
                  },
                ],
              },
            },
            null,
            2
          )
        );
      }

      setOutputJsonl(jsonlEntries.join("\n"));
    } catch (e: any) {
      alert("Error parsing CSV: " + e.message);
    }
  };

  const handleCopy = () => {
    if (!outputJsonl) return;
    navigator.clipboard.writeText(outputJsonl).then(() => {
      setCopyText("Copied!");
      setTimeout(() => setCopyText("Copy JSONL"), 1500);
    });
  };

  return (
    <div className="card-glass p-6 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[480px]">
      {/* Input Panel */}
      <div className="flex flex-col gap-3 min-w-0">
        <div className="flex justify-between items-center text-xs font-heading font-semibold uppercase tracking-wider text-[var(--text-primary)]">
          <span>1. Paste CSV Data</span>
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
          placeholder="Paste CSV rows here (must include headers on the first line)...&#10;Example:&#10;query,response,expected&#10;'how to build a loop','use a transition table','should mention trigger-action flow'"
          className="flex-grow min-h-[280px] bg-black/25 border border-[var(--card-border)] rounded-xl p-4 text-xs font-mono text-[var(--text-primary)] focus:border-accent-cyan outline-none resize-none"
        />
        <button
          onClick={handleCompile}
          className="btn-premium btn-primary w-full py-3 cursor-pointer"
        >
          Compile Dataset
        </button>
      </div>

      {/* Output Panel */}
      <div className="flex flex-col gap-3 min-w-0">
        <div className="flex justify-between items-center text-xs font-heading font-semibold uppercase tracking-wider text-[var(--text-primary)]">
          <span>2. Compiled EvalsPack JSONL</span>
          {outputJsonl && (
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 text-[11px] rounded bg-white/5 border border-white/10 text-accent-cyan hover:bg-accent-cyan/10 hover:border-accent-cyan/40 transition-all cursor-pointer"
            >
              {copyText}
            </button>
          )}
        </div>

        <div className="flex-grow min-h-[340px] bg-black/40 border border-[var(--card-border)] rounded-xl p-4 flex items-center justify-center relative overflow-auto">
          {!outputJsonl ? (
            <div className="text-center flex flex-col items-center gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-text-muted">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              <p className="text-xs text-text-muted">Click Compile Dataset to structure eval outputs</p>
            </div>
          ) : (
            <pre className="w-full h-full text-xs font-mono text-text-secondary whitespace-pre overflow-auto self-start">
              <code>{outputJsonl}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
