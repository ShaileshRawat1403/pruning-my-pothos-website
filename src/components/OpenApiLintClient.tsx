"use client";

import LintConsole, { Finding } from "./LintConsole";

const SAMPLE = `{
  "openapi": "3.0.3",
  "info": { "title": "Orders API" },
  "paths": {
    "/orders": {
      "get": {
        "operationId": "listOrders",
        "summary": "List orders",
        "responses": { "200": { "description": "ok" } }
      },
      "post": {
        "responses": { "201": { "description": "created" } }
      }
    },
    "/orders/{id}": {
      "delete": {
        "operationId": "listOrders",
        "responses": {}
      }
    }
  }
}`;

const METHODS = ["get", "post", "put", "patch", "delete", "head", "options"];

interface Operation {
  operationId?: string;
  summary?: string;
  description?: string;
  responses?: Record<string, unknown>;
}

function catalogDetail(op: Operation, codes: string[]): string {
  const bits: string[] = [];
  if (op.operationId) bits.push(op.operationId);
  bits.push(`responses: ${codes.length ? codes.join(", ") : "none"}`);
  return bits.join(" · ");
}

function analyze(text: string): Finding[] {
  let spec: Record<string, unknown>;
  try {
    spec = JSON.parse(text);
  } catch {
    return [{ severity: "err", label: "Invalid JSON", detail: "Paste an OpenAPI or Swagger document as JSON. Convert YAML to JSON first." }];
  }

  const out: Finding[] = [];
  if (!spec.openapi && !spec.swagger)
    out.push({ severity: "warn", label: "No version field", detail: 'Missing "openapi" or "swagger". Tooling may not recognize this document.' });

  const info = (spec.info as { title?: string; version?: string }) || {};
  if (!info.title) out.push({ severity: "warn", label: "Missing info.title", detail: "Give the API a human-readable title." });
  if (!info.version) out.push({ severity: "warn", label: "Missing info.version", detail: "Version the spec so clients can track changes." });

  const paths = (spec.paths as Record<string, Record<string, Operation>>) || {};
  const seenOpIds = new Map<string, string>();
  let count = 0;

  for (const [p, item] of Object.entries(paths)) {
    for (const m of METHODS) {
      const op = item?.[m];
      if (!op) continue;
      count++;
      const where = `${m.toUpperCase()} ${p}`;
      const codes = Object.keys(op.responses || {});
      out.push({ severity: "info", label: where, detail: catalogDetail(op, codes) });

      if (!op.operationId)
        out.push({ severity: "warn", label: `No operationId · ${where}`, detail: "Client generators need a stable operationId." });
      else if (seenOpIds.has(op.operationId))
        out.push({ severity: "err", label: `Duplicate operationId · ${op.operationId}`, detail: `Also on ${seenOpIds.get(op.operationId)}. operationIds must be unique across the spec.` });
      else seenOpIds.set(op.operationId, where);

      if (codes.length === 0)
        out.push({ severity: "warn", label: `No responses · ${where}`, detail: "Document at least one response." });
      else if (!codes.some((c) => /^2/.test(c)) && !codes.includes("default"))
        out.push({ severity: "warn", label: `No success response · ${where}`, detail: "No 2xx or default response is documented." });

      if (!op.summary && !op.description)
        out.push({ severity: "info", label: `Undocumented · ${where}`, detail: "No summary or description." });
    }
  }

  if (count === 0)
    out.push({ severity: "warn", label: "No operations found", detail: "No paths carry HTTP methods. Check the paths object." });

  return out;
}

export default function OpenApiLintClient() {
  return (
    <LintConsole
      accent="var(--accent-purple)"
      command="tessera run --pack openapi"
      pack="tesserakit-openapi"
      placeholder="Paste an OpenAPI or Swagger spec as JSON. Nothing leaves your browser."
      sample={SAMPLE}
      analyze={analyze}
      voice={{ clean: "Well-formed spec. Every operation documented.", dirty: "Catalogued. A few gaps will bite the generated clients." }}
    />
  );
}
