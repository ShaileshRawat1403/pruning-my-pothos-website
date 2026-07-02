"use client";

import LintConsole, { Finding } from "./LintConsole";

const SAMPLE = `name: pr-check
on: pull_request_target

permissions: write-all

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          ref: \${{ github.event.pull_request.head.sha }}
      - uses: some/action@main
      - name: greet
        run: echo "Thanks \${{ github.event.pull_request.title }}"`;

function analyze(text: string): Finding[] {
  const findings: Finding[] = [];
  const lines = text.split("\n");

  const hasPRTarget = /pull_request_target/.test(text);
  const checksOutPRHead = /ref:\s*\$\{\{\s*github\.event\.pull_request\.head/.test(text) || (/actions\/checkout/.test(text) && hasPRTarget);

  lines.forEach((line, i) => {
    const L = i + 1;

    if (/pull_request_target/.test(line)) {
      if (checksOutPRHead) {
        findings.push({ severity: "err", label: "pull_request_target + PR checkout (RCE combo)", line: L, detail: "Untrusted fork code is checked out in a context that holds write tokens and secrets. This is the classic remote-code-execution setup." });
      } else {
        findings.push({ severity: "warn", label: "pull_request_target runs with repo secrets", line: L, detail: "This trigger runs with write permissions and secrets even for fork pull requests. Treat all inputs as hostile." });
      }
    }

    const uses = line.match(/uses:\s*([^\s@#]+)@([^\s#]+)/);
    if (uses) {
      const ref = uses[2];
      if (!/^[0-9a-f]{40}$/i.test(ref)) {
        findings.push({ severity: "warn", label: "Unpinned action", line: L, detail: `${uses[1]}@${ref} is a tag or branch. Pin third-party actions to a full commit SHA.` });
      }
    }

    if (/permissions:\s*write-all/.test(line)) {
      findings.push({ severity: "warn", label: "permissions: write-all", line: L, detail: "Grants the workflow token every scope. Declare least-privilege permissions instead." });
    }

    if (/\$\{\{\s*github\.event\.[^}]*\}\}/.test(line) && /(run:|echo|\$\()/.test(line)) {
      findings.push({ severity: "err", label: "Script injection via untrusted input", line: L, detail: "github.event.* is attacker-controlled. Interpolating it into a shell command allows injection. Pass it through env: and quote it." });
    }
  });

  if (!/timeout-minutes/.test(text)) {
    findings.push({ severity: "info", label: "No job timeout", detail: "Without timeout-minutes a stuck job can run for hours." });
  }
  return findings;
}

export default function GhaLintClient() {
  return (
    <LintConsole
      accent="var(--accent-purple)"
      command="tessera run --pack gha"
      pack="tesserakit-gha"
      placeholder="Paste a GitHub Actions workflow (.github/workflows/*.yml). Nothing leaves your browser."
      sample={SAMPLE}
      analyze={analyze}
      voice={{ clean: "Locked down. Merge away.", dirty: "This workflow trusts strangers. Harden it." }}
    />
  );
}
