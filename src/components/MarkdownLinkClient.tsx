"use client";

import LintConsole, { Finding } from "./LintConsole";

const SAMPLE = `# Getting Started

See the [installation guide](#installation) and the [API](#api-reference).

Jump to [configuration](#config) or the [missing section](#does-not-exist).

External: [our site](https://example.com) and a [relative doc](./setup.md).

An [empty link]() slipped in.

## Installation

## API Reference`;

function slugify(s: string): string {
  return s.trim().toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
}

function analyze(text: string): Finding[] {
  const lines = text.split("\n");
  const findings: Finding[] = [];

  // collect heading anchors
  const anchors = new Set<string>();
  lines.forEach((line) => {
    const h = line.match(/^#{1,6}\s+(.+?)\s*$/);
    if (h) anchors.add(slugify(h[1]));
  });

  const linkRe = /\[([^\]]*)\]\(([^)]*)\)/g;
  lines.forEach((line, i) => {
    let m: RegExpExecArray | null;
    linkRe.lastIndex = 0;
    while ((m = linkRe.exec(line)) !== null) {
      const label = m[1];
      const url = m[2].trim();
      const L = i + 1;
      if (!url) {
        findings.push({ severity: "err", label: "Empty link target", line: L, detail: `[${label}]() points nowhere.` });
      } else if (url.startsWith("#")) {
        const anchor = url.slice(1);
        if (!anchors.has(anchor)) {
          findings.push({ severity: "err", label: "Broken in-page anchor", line: L, detail: `#${anchor} has no matching heading in this document.` });
        }
      } else if (/^https?:\/\//i.test(url)) {
        findings.push({ severity: "info", label: "External URL", line: L, detail: `${url} inventoried, not fetched.` });
      } else {
        findings.push({ severity: "info", label: "Relative link", line: L, detail: `${url} points to another file; verify it in the full pack.` });
      }
    }
  });
  return findings;
}

export default function MarkdownLinkClient() {
  return (
    <LintConsole
      accent="var(--accent-cyan)"
      command="tessera run --pack links"
      pack="tesserakit-links"
      placeholder="Paste Markdown. In-page anchors are checked; external URLs are inventoried, never fetched."
      sample={SAMPLE}
      analyze={analyze}
      voice={{ clean: "Every anchor lands.", dirty: "Some links point at nothing. Fix the anchors." }}
    />
  );
}
