"use client";

import LintConsole, { Finding } from "./LintConsole";

const SAMPLE = `---
name: release-notes
description: Build release notes from commits, then summarize and publish.
version: 1.0.0
tags: [git, release]
inputs:
  - name: since_tag
    type: string
    required: true
outputs:
  - name: published_url
steps:
  - id: collect
    uses: changelog-generator
    inputs:
      range: "\${inputs.since_tag}..HEAD"
      author: "\${inputs.author}"
    produces: raw_changelog
  - id: summarize
    needs: [collect]
    inputs:
      text: "\${steps.collect.output}"
    produces: summary
  - id: publish
    inputs:
      body: "\${steps.summarize.output}"
    produces: published_url
---`;

interface RecipeStep {
  id: string;
  needs: string[];
  produces: string[];
  inputRefs: string[];
}

function parseRecipe(text: string) {
  const declaredInputs = new Set<string>();
  const inputBlockMatch = text.match(/^inputs:\s*\n((?:\s+-.*\n?)+)/m);
  if (inputBlockMatch) {
    const re = /-\s*name:\s*(\S+)/g;
    let m;
    while ((m = re.exec(inputBlockMatch[1]))) declaredInputs.add(m[1]);
  }

  const steps: RecipeStep[] = [];
  const stepsIdx = text.search(/^steps:\s*\n/m);
  if (stepsIdx !== -1) {
    const header = text.slice(stepsIdx).match(/^steps:\s*\n/) as RegExpMatchArray;
    const afterSteps = text.slice(stepsIdx + header[0].length);
    // Cut at a line that is exactly "---" (frontmatter close), if present.
    // Deliberately avoids `$` with the `m` flag here: `$` matches end-of-EVERY-line
    // under `m`, which combined with a lazy [\s\S]*? terminates after the first
    // line instead of at the real end of the steps block.
    const endMatch = afterSteps.match(/\n---\s*(\n|$)/);
    const stepsBody = endMatch ? afterSteps.slice(0, endMatch.index) : afterSteps;
    const chunks = stepsBody.split(/\n(?=\s*-\s*id:)/);
    chunks.forEach((chunk) => {
      const idM = chunk.match(/-\s*id:\s*(\S+)/);
      if (!idM) return;
      const id = idM[1];
      const needsM = chunk.match(/needs:\s*\[(.*)\]/);
      const explicitNeeds = needsM ? needsM[1].split(",").map((s) => s.trim()).filter(Boolean) : [];
      const stepRefs = [...chunk.matchAll(/\$\{steps\.([\w-]+)/g)].map((m) => m[1]);
      const inputRefs = [...chunk.matchAll(/\$\{inputs\.([\w-]+)/g)].map((m) => m[1]);
      const producesM = chunk.match(/produces:\s*(.+)/);
      let produces: string[] = [];
      if (producesM) {
        const raw = producesM[1].trim();
        const listM = raw.match(/^\[(.*)\]$/);
        produces = listM ? listM[1].split(",").map((s) => s.trim()).filter(Boolean) : [raw];
      }
      steps.push({ id, needs: [...new Set([...explicitNeeds, ...stepRefs])], produces, inputRefs });
    });
  }
  return { steps, declaredInputs };
}

function analyze(text: string): Finding[] {
  const { steps, declaredInputs } = parseRecipe(text);
  const findings: Finding[] = [];

  if (steps.length === 0) {
    findings.push({ severity: "err", label: "no_steps", detail: "No steps found under steps:." });
    return findings;
  }

  const ids = steps.map((s) => s.id);
  const idSet = new Set(ids);
  const idCounts = new Map<string, number>();
  ids.forEach((id) => idCounts.set(id, (idCounts.get(id) ?? 0) + 1));
  idCounts.forEach((count, id) => {
    if (count > 1) findings.push({ severity: "err", label: "duplicate_step_id", detail: `Step id "${id}" appears ${count} times.` });
  });

  const dependedOn = new Set<string>();

  steps.forEach((s) => {
    if (s.needs.includes(s.id)) {
      findings.push({ severity: "err", label: "self_dependency", detail: `Step "${s.id}" depends on or references itself.` });
    }
    s.needs.forEach((n) => {
      dependedOn.add(n);
      if (n !== s.id && !idSet.has(n)) {
        findings.push({ severity: "err", label: "dangling_needs", detail: `Step "${s.id}" needs "${n}", which does not exist (via needs: or a \${steps.${n}} reference).` });
      }
    });
    s.inputRefs.forEach((inp) => {
      if (!declaredInputs.has(inp)) {
        findings.push({ severity: "warn", label: "dangling_input_reference", detail: `Step "${s.id}" references \${inputs.${inp}}, not declared under top-level inputs:.` });
      }
    });
  });

  const graph = new Map(steps.map((s) => [s.id, s.needs.filter((n) => idSet.has(n))]));
  const visited = new Set<string>();
  const stack = new Set<string>();
  let cyclePath: string[] | null = null;
  function dfs(node: string, path: string[]) {
    if (cyclePath) return;
    if (stack.has(node)) {
      cyclePath = [...path, node];
      return;
    }
    if (visited.has(node)) return;
    visited.add(node);
    stack.add(node);
    for (const dep of graph.get(node) ?? []) dfs(dep, [...path, node]);
    stack.delete(node);
  }
  ids.forEach((id) => {
    if (!visited.has(id)) dfs(id, []);
  });
  if (cyclePath) {
    findings.push({ severity: "err", label: "cyclic_dependency", detail: `Cycle: ${(cyclePath as string[]).join(" → ")}.` });
  }

  steps.forEach((s) => {
    if (s.produces.length === 0 && !dependedOn.has(s.id)) {
      findings.push({ severity: "warn", label: "unreachable_step", detail: `Step "${s.id}" produces nothing and nothing depends on it.` });
    }
  });

  return findings;
}

export default function RecipeGraphClient() {
  return (
    <LintConsole
      accent="var(--accent-amber)"
      command="tessera recipes compile --input recipes/ --output out/"
      pack="tesserakit-recipes"
      placeholder="Paste one RECIPE.md: frontmatter with inputs:, outputs:, and steps: (id, needs, inputs, produces)."
      sample={SAMPLE}
      analyze={analyze}
      voice={{ clean: "Graph is acyclic and every reference resolves.", dirty: "Graph problems found, before this recipe ever runs." }}
    />
  );
}
