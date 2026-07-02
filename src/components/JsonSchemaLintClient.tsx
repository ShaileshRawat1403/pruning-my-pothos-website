"use client";

import LintConsole, { Finding } from "./LintConsole";

const SAMPLE = `{
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "email": {},
    "tags": { "type": "array" },
    "profile": {
      "type": "object",
      "properties": { "name": { "type": "string" } }
    }
  },
  "required": ["id", "email", "createdAt"]
}`;

/* eslint-disable @typescript-eslint/no-explicit-any */
function analyze(text: string): Finding[] {
  let schema: any;
  try {
    schema = JSON.parse(text);
  } catch (e) {
    return [{ severity: "err", label: "Invalid JSON", detail: (e as Error).message }];
  }
  const findings: Finding[] = [];
  if (schema && typeof schema === "object" && !schema.$schema) {
    findings.push({ severity: "info", label: "No $schema dialect", detail: "Declare the JSON Schema draft so validators agree on semantics." });
  }

  const walk = (node: any, path: string) => {
    if (!node || typeof node !== "object") return;
    const has = (k: string) => Object.prototype.hasOwnProperty.call(node, k);

    if (node.properties && typeof node.properties === "object") {
      const props = Object.keys(node.properties);
      if (Array.isArray(node.required)) {
        for (const r of node.required) {
          if (!props.includes(r)) findings.push({ severity: "err", label: "required key not in properties", detail: `${path || "root"}: "${r}" is required but never defined in properties.` });
        }
      }
      if (node.additionalProperties === undefined) {
        findings.push({ severity: "info", label: "Open object", detail: `${path || "root"}: no additionalProperties, so unexpected keys pass validation.` });
      }
      for (const k of props) walk(node.properties[k], `${path ? path + "." : ""}${k}`);
    }

    if (node.type === "array") {
      if (!node.items) findings.push({ severity: "warn", label: "Array without items", detail: `${path || "root"}: type array with no items schema; contents are unconstrained.` });
      else walk(node.items, `${path}[]`);
    }

    const isLeaf = !has("type") && !has("properties") && !has("$ref") && !has("enum") && !has("oneOf") && !has("anyOf") && !has("allOf") && !has("const");
    if (isLeaf && path) {
      findings.push({ severity: "warn", label: "Property without a type", detail: `${path}: no type, $ref, or enum declared; anything validates.` });
    }
  };
  walk(schema, "");
  return findings;
}

export default function JsonSchemaLintClient() {
  return (
    <LintConsole
      accent="var(--accent-blue)"
      command="tessera run --pack schema"
      pack="tesserakit-schema"
      placeholder="Paste a JSON Schema. Nothing leaves your browser."
      sample={SAMPLE}
      analyze={analyze}
      voice={{ clean: "Well-formed. Validators will agree.", dirty: "This schema lets things through. Tighten it." }}
    />
  );
}
