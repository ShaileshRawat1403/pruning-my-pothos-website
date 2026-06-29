"use client";

import { useState } from "react";

const SAMPLE_PROMPT = `Track repository commits.
Required Fields:
- hash (string, sha256 format)
- message (string)
- additionsCount (number)
- deletionsCount (number)
- isMergedToMain (boolean)
- tagsList (array of strings)`;

export default function PromptToJsonClient() {
  const [inputText, setInputText] = useState("");
  const [outputSchema, setOutputSchema] = useState("");
  const [outputExample, setOutputExample] = useState("");
  const [activeTab, setActiveTab] = useState<"schema" | "example">("schema");
  const [copyText, setCopyText] = useState("Copy");

  const loadSample = () => {
    setInputText(SAMPLE_PROMPT);
  };

  const compilePromptToJson = (text: string) => {
    const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    const schema: any = {
      $schema: "http://json-schema.org/draft-07/schema#",
      title: "GeneratedStructuredOutput",
      type: "object",
      properties: {},
      required: []
    };

    lines.forEach((line) => {
      const listMatch = line.match(/^[-*+]\s*(\w+)\s*\(([^)]+)\)/i) || line.match(/^[-*+]\s*(\w+)\s*-\s*(\w+)/i) || line.match(/^[-*+]\s*(\w+)/i);
      if (listMatch) {
        const fieldName = listMatch[1];
        let typeStr = listMatch[2] || "string";
        let type = "string";

        if (typeStr.includes("number") || typeStr.includes("int") || typeStr.includes("float")) {
          type = "number";
        } else if (typeStr.includes("boolean") || typeStr.includes("bool")) {
          type = "boolean";
        } else if (typeStr.includes("array") || typeStr.includes("list")) {
          type = "array";
        }

        schema.properties[fieldName] = {
          type: type,
          description: `Generated schema property for ${fieldName}.`
        };

        if (type === "array") {
          schema.properties[fieldName].items = {
            type: "string"
          };
        }

        schema.required.push(fieldName);
      }
    });

    if (Object.keys(schema.properties).length === 0) {
      schema.properties["id"] = { type: "string" };
      schema.properties["description"] = { type: "string" };
      schema.required = ["id"];
    }

    return schema;
  };

  const handleCompile = () => {
    const text = inputText.trim();
    if (!text) return;

    try {
      const schemaObj = compilePromptToJson(text);
      setOutputSchema(JSON.stringify(schemaObj, null, 2));

      // Generate matching JSON example
      const mock: any = {};
      Object.keys(schemaObj.properties).forEach((key) => {
        const prop = schemaObj.properties[key];
        if (prop.type === "number") {
          mock[key] = 42;
        } else if (prop.type === "boolean") {
          mock[key] = true;
        } else if (prop.type === "array") {
          mock[key] = ["sample_item_1", "sample_item_2"];
        } else {
          mock[key] = "sample_value";
        }
      });
      setOutputExample(JSON.stringify(mock, null, 2));
    } catch (err: any) {
      setOutputSchema(`Failed to generate JSON schema: ${err.message}`);
      setOutputExample("");
    }
  };

  const handleCopy = () => {
    const targetText = activeTab === "schema" ? outputSchema : outputExample;
    if (!targetText) return;
    navigator.clipboard.writeText(targetText).then(() => {
      setCopyText("Copied!");
      setTimeout(() => setCopyText("Copy"), 1500);
    });
  };

  return (
    <div className="card-glass p-6 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[480px]">
      {/* Input Panel */}
      <div className="flex flex-col gap-3 min-w-0">
        <div className="flex justify-between items-center text-xs font-heading font-semibold uppercase tracking-wider text-[var(--text-primary)]">
          <span>1. Input Prompt Specifications</span>
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
          placeholder="Paste fields, notes, or prompts here...&#10;Example:&#10;I need a schema to track commits:&#10;- hash (string)&#10;- additionsCount (number)&#10;- isMergedToMain (boolean)"
          className="flex-grow min-h-[280px] bg-black/25 border border-[var(--card-border)] rounded-xl p-4 text-xs font-mono text-[var(--text-primary)] focus:border-accent-cyan outline-none resize-none"
        />
        <button
          onClick={handleCompile}
          className="btn-premium btn-primary w-full py-3 cursor-pointer"
        >
          Compile JSON Schema & Example
        </button>
      </div>

      {/* Output Panel */}
      <div className="flex flex-col gap-3 min-w-0">
        <div className="flex justify-between items-center text-xs font-heading font-semibold uppercase tracking-wider text-[var(--text-primary)]">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("schema")}
              className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${activeTab === "schema" ? "bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30" : "text-text-secondary hover:text-[var(--text-primary)]"}`}
            >
              Schema
            </button>
            <button
              onClick={() => setActiveTab("example")}
              className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${activeTab === "example" ? "bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30" : "text-text-secondary hover:text-[var(--text-primary)]"}`}
            >
              Example JSON
            </button>
          </div>
          {(outputSchema || outputExample) && (
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 text-[11px] rounded bg-white/5 border border-white/10 text-accent-cyan hover:bg-accent-cyan/10 hover:border-accent-cyan/40 transition-all cursor-pointer"
            >
              {copyText} {activeTab === "schema" ? "Schema" : "Example"}
            </button>
          )}
        </div>
        
        <div className="flex-grow min-h-[340px] bg-black/40 border border-[var(--card-border)] rounded-xl p-4 flex items-center justify-center relative overflow-auto">
          {!(activeTab === "schema" ? outputSchema : outputExample) ? (
            <div className="text-center flex flex-col items-center gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-text-muted">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              <p className="text-xs text-text-muted">Click Compile to render the schema & example</p>
            </div>
          ) : (
            <pre className="w-full h-full text-xs font-mono text-text-secondary whitespace-pre overflow-auto self-start">
              <code>{activeTab === "schema" ? outputSchema : outputExample}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
