"use client";

import LintConsole, { Finding } from "./LintConsole";

const SAMPLE = `-- 0007_cleanup.sql
DELETE FROM sessions;

UPDATE users SET is_active = true;

ALTER TABLE orders ADD COLUMN status TEXT NOT NULL;

DROP TABLE legacy_audit;

SELECT * FROM customers WHERE region = 'EU';`;

function analyze(text: string): Finding[] {
  const findings: Finding[] = [];
  let line = 1;
  for (const seg of text.split(";")) {
    const leading = (seg.match(/^\s*/)?.[0].match(/\n/g)?.length) ?? 0;
    const L = line + leading;
    line += (seg.match(/\n/g)?.length ?? 0);
    const stmt = seg.trim();
    if (!stmt || stmt.startsWith("--")) continue;

    if (/^DELETE\s+FROM\b/i.test(stmt) && !/\bWHERE\b/i.test(stmt))
      findings.push({ severity: "err", label: "DELETE without WHERE", line: L, detail: "Deletes every row in the table." });
    if (/^UPDATE\b/i.test(stmt) && !/\bWHERE\b/i.test(stmt))
      findings.push({ severity: "err", label: "UPDATE without WHERE", line: L, detail: "Rewrites every row in the table." });
    if (/\bDROP\s+TABLE\b/i.test(stmt) && !/IF\s+EXISTS/i.test(stmt))
      findings.push({ severity: "warn", label: "DROP TABLE without IF EXISTS", line: L, detail: "Not idempotent; fails hard if the table is already gone." });
    if (/\bTRUNCATE\b/i.test(stmt))
      findings.push({ severity: "warn", label: "TRUNCATE", line: L, detail: "Irreversible and often not transactional mid-migration." });
    if (/ADD\s+COLUMN\b[\s\S]*?NOT\s+NULL/i.test(stmt) && !/DEFAULT/i.test(stmt))
      findings.push({ severity: "warn", label: "NOT NULL column without DEFAULT", line: L, detail: "Locks and rewrites the table on large data. Add a DEFAULT or backfill in steps." });
    if (/\bSELECT\s+\*/i.test(stmt))
      findings.push({ severity: "info", label: "SELECT *", line: L, detail: "Fragile to schema changes. Name the columns you actually need." });
  }
  return findings;
}

export default function SqlSafetyClient() {
  return (
    <LintConsole
      accent="var(--accent-amber)"
      command="tessera run --pack sql"
      pack="tesserakit-sql"
      placeholder="Paste SQL or a migration. Nothing leaves your browser."
      sample={SAMPLE}
      analyze={analyze}
      voice={{ clean: "Safe to run.", dirty: "This one bites in production. Review first." }}
    />
  );
}
