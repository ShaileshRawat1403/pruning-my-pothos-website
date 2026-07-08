"use client";

import LintConsole, { Finding } from "./LintConsole";

const SAMPLE = `src/index.ts
src/utils.ts
src/app.ts`;

function analyze(text: string): Finding[] {
  const paths = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const findings: Finding[] = [];

  if (paths.length === 0) {
    findings.push({ severity: "err", label: "empty_repo", detail: "No files found after ignoring blank lines." });
    return findings;
  }

  const basenames = paths.map((p) => p.split("/").pop() || "");
  const hasReadme = basenames.some((b) => /^readme(\.\w+)?$/i.test(b));
  const hasLicense = basenames.some((b) => /^(license|licence|copying)(\.\w+)?$/i.test(b));
  const hasTests = paths.some((p) => /(^|\/)(tests?|spec)(\/|$)/i.test(p) || /(_test\.|test_|\.spec\.)/i.test(p));
  const hasManifest = paths.some((p) => /(^|\/)(pyproject\.toml|package\.json|requirements.*\.txt|Cargo\.toml|go\.mod)$/i.test(p));
  const hasCi = paths.some((p) => /(\.github\/workflows\/|\.gitlab-ci\.yml|\.circleci\/)/i.test(p));

  if (!hasReadme) findings.push({ severity: "warn", label: "missing_readme", detail: "No README file found." });
  if (!hasLicense) findings.push({ severity: "warn", label: "missing_license", detail: "No LICENSE file found." });
  if (!hasTests) findings.push({ severity: "warn", label: "no_tests_detected", detail: "No test or spec files found." });
  if (!hasManifest) findings.push({ severity: "warn", label: "no_dependency_manifest", detail: "No recognized dependency manifest found (pyproject.toml, package.json, requirements*.txt, Cargo.toml, go.mod)." });
  if (!hasCi) findings.push({ severity: "info", label: "no_ci_config", detail: "No CI configuration found (.github/workflows, .gitlab-ci.yml, .circleci)." });

  return findings;
}

export default function RepoHygieneClient() {
  return (
    <LintConsole
      accent="var(--accent-green)"
      command="tessera repo map --input . --output out/"
      pack="tesserakit-repo"
      placeholder="Paste a file listing, one path per line (e.g. the output of `find . -type f` or `git ls-files`)."
      sample={SAMPLE}
      analyze={analyze}
      voice={{ clean: "Hygiene signals all present. Boring, in a good way.", dirty: "Missing the basics a reviewer expects." }}
    />
  );
}
