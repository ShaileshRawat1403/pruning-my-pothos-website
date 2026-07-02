"use client";

import LintConsole, { Finding } from "./LintConsole";

const SAMPLE = `export function checkout(cart) {
  // TODO(shailesh): apply regional tax before totals
  const total = sum(cart);

  // FIXME: race condition when two tabs submit at once
  save(total);

  // HACK: hardcoded currency until settings ship
  return { total, currency: "USD" }; // XXX revisit rounding
}`;

const SEV: Record<string, Finding["severity"]> = { FIXME: "warn", BUG: "warn", XXX: "warn", TODO: "info", HACK: "info" };

function analyze(text: string): Finding[] {
  const lines = text.split("\n");
  const findings: Finding[] = [];
  const re = /\b(TODO|FIXME|HACK|XXX|BUG)\b(?:\(([^)]+)\))?\s*:?\s*(.*)$/;
  lines.forEach((line, i) => {
    const m = line.match(re);
    if (!m) return;
    const marker = m[1].toUpperCase();
    const owner = m[2]?.trim();
    const note = m[3]?.trim().replace(/\*\/\s*$/, "").trim() || "(no description)";
    findings.push({
      severity: SEV[marker] ?? "info",
      label: owner ? `${marker} · @${owner}` : marker,
      line: i + 1,
      detail: note,
    });
  });
  return findings;
}

export default function TodoTriageClient() {
  return (
    <LintConsole
      accent="var(--accent-amber)"
      command="tessera run --pack todo"
      pack="tesserakit-todo"
      placeholder="Paste source or notes. TODO / FIXME / HACK / XXX / BUG markers become a triaged backlog."
      sample={SAMPLE}
      analyze={analyze}
      voice={{ clean: "No markers. Suspiciously tidy.", dirty: "Here is the backlog you were pretending not to have." }}
    />
  );
}
