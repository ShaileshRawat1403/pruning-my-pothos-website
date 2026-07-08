"use client";

import LintConsole, { Finding } from "./LintConsole";

const SAMPLE = `name: ship_feature
version: "0.1"
steps:
  - name: plan
    adapter: planner
    outputs: [plan.md]
  - name: build
    adapter: codegen
    inputs: [plan.md, spec.md]
    outputs: [patch.diff]
  - name: deploy
    adapter: deployer
    inputs: [patch.diff]

required_adapters: [planner, codegen]
promotion_rule: after_review`;

interface Step {
  name?: string;
  adapter?: string;
  inputs: string[];
  outputs: string[];
}

function parseWorkflow(text: string) {
  const lines = text.split("\n");
  let promotionRule = "";
  const steps: Step[] = [];
  const requiredAdapters: string[] = [];
  const reviewGates: { afterStep: string }[] = [];
  const hashInvariantSteps: string[] = [];
  let hasRecursionFence = false;

  let section: "" | "steps" | "gates" | "evidence" = "";
  let currentStep: Step | null = null;

  const flushStep = () => {
    if (currentStep) steps.push(currentStep);
    currentStep = null;
  };

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, "");
    if (!line.trim() || line.trim().startsWith("#")) continue;

    if (/^\S/.test(line)) {
      const m = line.match(/^([\w-]+):\s*(.*)$/);
      if (m) {
        const [, key, rest] = m;
        flushStep();
        section = "";
        if (key === "promotion_rule") promotionRule = rest.trim();
        else if (key === "steps") section = "steps";
        else if (key === "required_adapters") {
          const inline = rest.trim().match(/^\[(.*)\]$/);
          if (inline) requiredAdapters.push(...inline[1].split(",").map((s) => s.trim()).filter(Boolean));
        } else if (key === "review_gates") section = "gates";
        else if (key === "evidence_policy") section = "evidence";
        else if (key === "recursion_fence") hasRecursionFence = true;
        continue;
      }
    }

    if (section === "steps") {
      const listM = line.match(/^\s{2,4}-\s*name:\s*(.+)$/);
      if (listM) {
        flushStep();
        currentStep = { name: listM[1].trim(), inputs: [], outputs: [] };
        continue;
      }
      const fieldM = line.match(/^\s{4,}([\w-]+):\s*(.*)$/);
      if (fieldM && currentStep) {
        const [, key, rest] = fieldM;
        const inline = rest.trim().match(/^\[(.*)\]$/);
        const arr = inline ? inline[1].split(",").map((s) => s.trim()).filter(Boolean) : [];
        if (key === "adapter") currentStep.adapter = rest.trim();
        else if (key === "inputs") currentStep.inputs = arr;
        else if (key === "outputs") currentStep.outputs = arr;
        continue;
      }
    }

    if (section === "gates") {
      const m = line.match(/^\s*-\s*after_step:\s*(.+)$/);
      if (m) reviewGates.push({ afterStep: m[1].trim() });
    }

    if (section === "evidence") {
      const m = line.match(/^\s*hash_invariant_steps:\s*\[(.*)\]$/);
      if (m) hashInvariantSteps.push(...m[1].split(",").map((s) => s.trim()).filter(Boolean));
    }
  }
  flushStep();

  return { steps, promotionRule, requiredAdapters, reviewGates, hashInvariantSteps, hasRecursionFence };
}

function analyze(text: string): Finding[] {
  const { steps, promotionRule, requiredAdapters, reviewGates, hashInvariantSteps, hasRecursionFence } = parseWorkflow(text);
  const findings: Finding[] = [];

  if (steps.length === 0) {
    findings.push({ severity: "err", label: "no_steps", detail: "Workflow defines no steps." });
    return findings;
  }

  const stepNames = new Set(steps.map((s) => s.name).filter(Boolean) as string[]);
  const seenOutputs = new Set<string>();

  steps.forEach((s, i) => {
    if (s.outputs.length === 0) {
      findings.push({ severity: "info", label: "step_missing_outputs", line: i + 1, detail: `Step "${s.name}" has no outputs (untraceable).` });
    }
    if (s.adapter && requiredAdapters.length && !requiredAdapters.includes(s.adapter)) {
      findings.push({ severity: "warn", label: "undefined_adapter", line: i + 1, detail: `Step "${s.name}" uses adapter "${s.adapter}", not listed in required_adapters.` });
    }
    s.inputs.forEach((inp) => {
      if (!seenOutputs.has(inp)) {
        findings.push({ severity: "warn", label: "step_undefined_input", line: i + 1, detail: `Step "${s.name}" input "${inp}" is not produced by any earlier step.` });
      }
    });
    s.outputs.forEach((o) => seenOutputs.add(o));
  });

  reviewGates.forEach((g) => {
    if (!stepNames.has(g.afterStep)) {
      findings.push({ severity: "err", label: "review_gate_unknown_step", detail: `Review gate references step "${g.afterStep}", which does not exist.` });
    }
  });

  const knownRules = ["after_review", "automatic", "manual"];
  if (promotionRule && !knownRules.includes(promotionRule)) {
    findings.push({ severity: "err", label: "invalid_promotion_rule", detail: `"${promotionRule}" is not a known promotion_rule value.` });
  }

  if (!hasRecursionFence) {
    findings.push({ severity: "warn", label: "missing_recursion_fence", detail: "No recursion fence declared (kernel-path mutation risk)." });
  }

  if (promotionRule === "after_review" && reviewGates.length === 0) {
    findings.push({ severity: "warn", label: "promotion_without_review", detail: "promotion_rule is after_review but no review_gates are defined." });
  }

  if (hashInvariantSteps.length === 0) {
    findings.push({ severity: "warn", label: "missing_evidence_hash_invariant", detail: "No hash-invariant steps declared (TOCTOU risk)." });
  }

  return findings;
}

export default function WorkflowGovernanceClient() {
  return (
    <LintConsole
      accent="var(--accent-purple)"
      command="tessera workflow validate --input workflow.yaml --output out/"
      pack="tesserakit-workflow"
      placeholder="Paste a Workflow Pack YAML: name, steps (name/adapter/inputs/outputs), required_adapters, review_gates, evidence_policy, recursion_fence, promotion_rule."
      sample={SAMPLE}
      analyze={analyze}
      voice={{ clean: "Governance passes clean. Ship it.", dirty: "Governance gaps found. Read them before you promote this." }}
    />
  );
}
