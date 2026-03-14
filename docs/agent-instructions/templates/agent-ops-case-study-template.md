# Template: Agent Ops Case Study (Practical + Evidence-Ready)

Use this for Systems long-form pages documenting real process changes and measurable outcomes.

## Frontmatter (recommended order)
- `title`
- `description`
- `category` (`Explanations` or `How-things-fit-together`)
- `tags`
- `updatedAt`
- `proofPoints`
- `faq`

## Frontmatter scaffold
```yaml
---
title: "Case Study: [Outcome] with [Method]"
description: "How we moved from [before] to [after] using [instruction/handoff/checks]."
category: "How-things-fit-together"
tags:
  - agents
  - governance
  - reliability
  - workflow
updatedAt: "YYYY-MM-DD"
proofPoints:
  - "Before: [baseline state or metric]"
  - "After: [result state or metric]"
  - "Validation: [scripts/checks run]"
faq:
  - question: "What changed first?"
    answer: "[First intervention]."
  - question: "What had the highest impact?"
    answer: "[Highest-leverage change]."
---
```

## Body structure (Systems-standard)
1. `> **Key takeaways**` (3-5 bullets)
2. Short opening context (problem + why it mattered)
3. One 40-70 word direct answer block under a question heading
4. `<aside class="callout ...">` with one operational warning or design note
5. TOC with Act I, Act II, Act III
6. Act I: baseline and problem framing
7. Act II: intervention details (what changed)
8. Act III: outcomes, lessons, and reuse guidance
9. At least one table (`comparison-table`) for before/after clarity
10. Related reading links (2-4 internal links)

## Required evidence sections
- `### Baseline`
  - starting constraints, failures, or inconsistencies
- `### Interventions`
  - exact process or tooling changes in sequence
- `### Validation`
  - commands run and pass/fail outcomes
- `### Before/After`
  - concise measurable summary

## Suggested headings
- `### What changed from before to after?`
- `### What was the baseline state?`
- `### What interventions were introduced?`
- `### What results were observable?`
- `### What this changes in practice`

## Practical proof block pattern
Use this near the end if not already emitted via frontmatter rendering.

```md
### Proof Block
- Date: YYYY-MM-DD
- Commands: `npm run lint:systems`, `npm run report:topics`, `npm run report:gaps`, `npm run build`
- Result: [all green / list failures and fixes]
- Affected area: [sections/pages/scripts]
```

## Reuse checklist (copy into page)
- [ ] Problem is specific and non-generic
- [ ] At least one concrete baseline signal is included
- [ ] Interventions are sequence-based (not a random list)
- [ ] Validation commands and outcomes are documented
- [ ] Internal links connect to supporting framework pages
- [ ] No unverifiable claims or vague success language

## Anti-patterns
- Writing a "success story" without baseline evidence
- Claiming causality without before/after comparison
- Mixing too many themes in one case study
- Omitting validation steps and command outcomes
- Overfitting the template and losing narrative clarity
