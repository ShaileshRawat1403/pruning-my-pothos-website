"use client";

import LintConsole, { Finding } from "./LintConsole";

// Neutral, obviously-fake tokens so no real secret shape ever sits in source.
const SAMPLE = `curl -X GET 'https://api.example.com/v1/users?role=admin&api_key=ak_demo_7f3c9b2e1d8a4506' \\
  -H 'Authorization: Bearer tok_live_9f8a7b6c5d4e3f2a1b0c9d8e' \\
  -H 'Content-Type: application/json'

curl -X POST 'http://legacy.example.com/v1/orders' \\
  -H 'X-Api-Key: key_2f6b8c0a4e' \\
  -d '{"item":"SKU-42","qty":2}'`;

interface Req {
  method: string;
  url: string;
  headers: string[];
  hasData: boolean;
}

function redact(v: string): string {
  const s = v.trim();
  if (s.length <= 6) return "•".repeat(s.length || 1);
  return s.slice(0, 3) + "•".repeat(Math.min(12, Math.max(4, s.length - 6))) + s.slice(-3);
}

function querySummary(query: string, r: Req): string {
  const bits: string[] = [];
  const qp = query ? query.replace(/^\?/, "").split("&").filter(Boolean).length : 0;
  if (qp) bits.push(`${qp} query param${qp === 1 ? "" : "s"}`);
  if (r.hasData) bits.push("request body");
  const ct = r.headers.find((h) => /^content-type:/i.test(h));
  if (ct) bits.push(ct.split(":").slice(1).join(":").trim());
  return bits.join(" · ") || "no query, no body";
}

function reportRequest(out: Finding[], r: Req) {
  let host = "";
  let path = "";
  let query = "";
  try {
    if (/^https?:\/\//.test(r.url)) {
      const u = new URL(r.url);
      host = u.host;
      path = u.pathname;
      query = u.search;
      if (u.protocol === "http:")
        out.push({ severity: "warn", label: `Insecure transport · ${host}`, detail: "http:// sends this request in the clear. Use https." });
      if (u.username || u.password)
        out.push({ severity: "err", label: "Credentials in URL", detail: `${u.username}:${redact(u.password || "")}@${host}. Move these out of the URL; they leak into logs and browser history.` });
      u.searchParams.forEach((val, key) => {
        if (/(api[_-]?key|token|secret|access[_-]?token|signature|sig|password|passwd|pwd)/i.test(key) && val)
          out.push({ severity: "warn", label: `Secret in query · ${key}`, detail: `Redacted to ${key}=${redact(val)}. Query strings end up in server and proxy logs.` });
      });
    } else {
      path = r.url;
    }
  } catch {
    path = r.url;
  }

  const label = `${r.method} ${host}${path || (host ? "" : r.url)}`.trim();
  out.push({ severity: "info", label, detail: querySummary(query, r) });

  for (const h of r.headers) {
    const idx = h.indexOf(":");
    if (idx < 0) continue;
    const name = h.slice(0, idx).trim();
    const value = h.slice(idx + 1).trim();
    if (!value) continue;
    if (/^authorization$/i.test(name)) {
      const parts = value.split(/\s+/);
      const scheme = parts.length > 1 ? parts[0] : "";
      const cred = parts.length > 1 ? parts.slice(1).join(" ") : value;
      out.push({ severity: "warn", label: "Secret redacted · Authorization", detail: `${scheme ? scheme + " " : ""}${redact(cred)}. Kept out of the surface map.` });
    } else if (/^(x-api-key|api[_-]?key|x-auth-token|token|secret|cookie)$/i.test(name)) {
      out.push({ severity: "warn", label: `Secret redacted · ${name}`, detail: `${redact(value)}. Header value withheld from the map.` });
    }
  }
}

function analyze(text: string): Finding[] {
  const findings: Finding[] = [];
  const norm = text.replace(/\\\r?\n/g, " ");
  const lines = norm.split(/\r?\n/);
  let sawAny = false;

  const curlBlocks = norm.split(/(?=curl\b)/g).filter((b) => /\bcurl\b/.test(b));
  for (const block of curlBlocks) {
    sawAny = true;
    let method = block.match(/-X\s+([A-Za-z]+)/)?.[1]?.toUpperCase() || "";
    const hasData = /(?:^|\s)(?:-d|--data(?:-raw|-binary|-urlencode)?)\b/.test(block);
    if (!method) method = hasData ? "POST" : "GET";
    const url = block.match(/https?:\/\/[^\s"']+/)?.[0] || "";
    const headers = [...block.matchAll(/-H\s+(?:"([^"]*)"|'([^']*)'|(\S+))/g)].map((m) => m[1] ?? m[2] ?? m[3] ?? "");
    reportRequest(findings, { method, url, headers, hasData });
  }

  if (!sawAny) {
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(/^([A-Z]+)\s+(\S+)\s+HTTP\/\d/);
      if (!m) continue;
      sawAny = true;
      const headers: string[] = [];
      let host = "";
      for (let j = i + 1; j < lines.length && lines[j].trim(); j++) {
        headers.push(lines[j]);
        const h = lines[j].match(/^Host:\s*(.+)$/i);
        if (h) host = h[1].trim();
      }
      const url = host ? `https://${host}${m[2]}` : m[2];
      reportRequest(findings, { method: m[1], url, headers, hasData: false });
    }
  }

  if (!sawAny)
    findings.push({ severity: "info", label: "No requests found", detail: "Paste one or more curl commands, or a raw HTTP request trace." });

  return findings;
}

export default function ApiSurfaceMapClient() {
  return (
    <LintConsole
      accent="var(--accent-blue)"
      command="tessera run --pack api"
      pack="tesserakit-api"
      placeholder="Paste curl commands or a raw HTTP request. Nothing leaves your browser."
      sample={SAMPLE}
      analyze={analyze}
      voice={{ clean: "Nothing to map yet.", dirty: "Surface mapped. Anything sensitive was pulled out first." }}
    />
  );
}
