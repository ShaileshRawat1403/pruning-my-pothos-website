"use client";

import LintConsole, { Finding } from "./LintConsole";

const SAMPLE = `{
  "name": "demo-app",
  "dependencies": {
    "react": "^18.2.0",
    "lodash": "*",
    "axios": ">=1.4.0",
    "date-fns": "2.30.0"
  },
  "devDependencies": {
    "typescript": "~5.4.0",
    "react": "18.2.0"
  }
}`;

function auditPackageJson(t: string): Finding[] {
  const out: Finding[] = [];
  let pkg: Record<string, unknown>;
  try {
    pkg = JSON.parse(t);
  } catch {
    return [{ severity: "err", label: "Invalid JSON", detail: "Could not parse package.json. Check for trailing commas or unquoted keys." }];
  }
  const groups = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"];
  const seen: Record<string, string[]> = {};
  for (const g of groups) {
    const obj = pkg[g];
    if (!obj || typeof obj !== "object") continue;
    for (const [name, specRaw] of Object.entries(obj as Record<string, unknown>)) {
      const spec = String(specRaw);
      (seen[name] ||= []).push(g);
      if (/^(\*|latest|x)$/i.test(spec) || spec === "")
        out.push({ severity: "err", label: `Unpinned · ${name}`, detail: `"${spec || "(empty)"}" accepts any version. Today's build and tomorrow's can differ.` });
      else if (/^[~^]/.test(spec))
        out.push({ severity: "warn", label: `Range pin · ${name}`, detail: `"${spec}" allows silent minor or patch upgrades. Pin exact and commit a lockfile for reproducible installs.` });
      else if (/^(>=|>|<=|<)/.test(spec))
        out.push({ severity: "warn", label: `Open range · ${name}`, detail: `"${spec}" has no upper bound. One upstream release can break the build.` });
    }
  }
  for (const [name, gs] of Object.entries(seen)) {
    if (gs.length > 1)
      out.push({ severity: "warn", label: `Duplicate · ${name}`, detail: `Declared in ${gs.join(" and ")}. Keep it in one place to avoid version drift.` });
  }
  return out;
}

function auditRequirements(t: string): Finding[] {
  const out: Finding[] = [];
  const exact: Record<string, string[]> = {};
  t.split(/\r?\n/).forEach((raw, i) => {
    const line = raw.replace(/#.*$/, "").trim();
    if (!line || /^-/.test(line)) return;
    const m = line.match(/^([A-Za-z0-9_.\-]+)(\[[^\]]*\])?\s*(.*)$/);
    if (!m) return;
    const name = m[1].toLowerCase();
    const spec = m[3].trim();
    const L = i + 1;
    if (!spec)
      out.push({ severity: "err", label: `Unpinned · ${m[1]}`, line: L, detail: "No version specifier. Pip grabs the latest, which changes over time." });
    else if (/^==\s*[\w.]+/.test(spec))
      (exact[name] ||= []).push(spec.replace(/^==\s*/, ""));
    else if (/^(>=|>|<=|<|~=|!=)/.test(spec))
      out.push({ severity: "warn", label: `Range pin · ${m[1]}`, line: L, detail: `"${spec}" is not an exact pin. Use == plus a lockfile (pip-tools, uv) for reproducible installs.` });
  });
  for (const [name, vers] of Object.entries(exact)) {
    const uniq = [...new Set(vers)];
    if (uniq.length > 1)
      out.push({ severity: "err", label: `Version conflict · ${name}`, detail: `Pinned to ${uniq.join(" and ")} in the same file. Only one can win.` });
    else if (vers.length > 1)
      out.push({ severity: "warn", label: `Duplicate · ${name}`, detail: `Listed ${vers.length} times at the same version. Harmless, but noisy.` });
  }
  return out;
}

function analyze(text: string): Finding[] {
  const t = text.trim();
  return t.startsWith("{") ? auditPackageJson(t) : auditRequirements(t);
}

export default function DependencyAuditClient() {
  return (
    <LintConsole
      accent="var(--accent-pink)"
      command="tessera run --pack deps"
      pack="tesserakit-deps"
      placeholder="Paste a package.json or a requirements.txt. Nothing leaves your browser."
      sample={SAMPLE}
      analyze={analyze}
      voice={{ clean: "Every dependency is pinned. Reproducible.", dirty: "Some pins drift. Lock them before the next install surprises you." }}
    />
  );
}
