"use client";

import { useState } from "react";

const SAMPLE_REPO = `src/pages/index.astro
src/layouts/SystemsLayout.astro
src/styles/systems.css
package.json`;

export default function RepoContextPackClient() {
  const [inputText, setInputText] = useState("");
  const [outputXml, setOutputXml] = useState("");
  const [copyText, setCopyText] = useState("Copy XML");

  const loadSample = () => {
    setInputText(SAMPLE_REPO);
  };

  const handleCompile = () => {
    const rawValue = inputText.trim();
    if (!rawValue) {
      alert("Please list some files first.");
      return;
    }

    const files = rawValue.split("\n").map(f => f.trim()).filter(Boolean);
    
    // Compile to structured XML pack format
    let xmlContent = `<repository_context>\n  <directory_structure>\n`;
    files.forEach(f => {
      xmlContent += `    <file path="${f}" />\n`;
    });
    xmlContent += `  </directory_structure>\n\n`;
    
    files.forEach(f => {
      xmlContent += `  <file_contents path="${f}">\n    <!-- Content of ${f} goes here -->\n  </file_contents>\n\n`;
    });
    
    xmlContent += `</repository_context>`;

    setOutputXml(xmlContent);
  };

  const handleCopy = () => {
    if (!outputXml) return;
    navigator.clipboard.writeText(outputXml).then(() => {
      setCopyText("Copied!");
      setTimeout(() => setCopyText("Copy XML"), 1500);
    });
  };

  return (
    <div className="card-glass p-6 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[480px]">
      {/* Input Panel */}
      <div className="flex flex-col gap-3 min-w-0">
        <div className="flex justify-between items-center text-xs font-heading font-semibold uppercase tracking-wider text-[var(--text-primary)]">
          <span>1. Paste Repository Blueprint Details</span>
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
          placeholder="Paste file path listings, readme content, or selected files...&#10;Example:&#10;src/pages/index.astro&#10;src/layouts/Layout.astro&#10;package.json"
          className="flex-grow min-h-[280px] bg-black/25 border border-[var(--card-border)] rounded-xl p-4 text-xs font-mono text-[var(--text-primary)] focus:border-accent-cyan outline-none resize-none"
        />
        <button
          onClick={handleCompile}
          className="btn-premium btn-primary w-full py-3 cursor-pointer"
        >
          Compile Context Pack
        </button>
      </div>

      {/* Output Panel */}
      <div className="flex flex-col gap-3 min-w-0">
        <div className="flex justify-between items-center text-xs font-heading font-semibold uppercase tracking-wider text-[var(--text-primary)]">
          <span>2. Compiled XML Context Pack</span>
          {outputXml && (
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 text-[11px] rounded bg-white/5 border border-white/10 text-accent-cyan hover:bg-accent-cyan/10 hover:border-accent-cyan/40 transition-all cursor-pointer"
            >
              {copyText}
            </button>
          )}
        </div>

        <div className="flex-grow min-h-[340px] bg-black/40 border border-[var(--card-border)] rounded-xl p-4 flex items-center justify-center relative overflow-auto">
          {!outputXml ? (
            <div className="text-center flex flex-col items-center gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-text-muted">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              <p className="text-xs text-text-muted">Click Compile Context Pack to structure outputs</p>
            </div>
          ) : (
            <pre className="w-full h-full text-xs font-mono text-text-secondary whitespace-pre overflow-auto self-start">
              <code>{outputXml}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
