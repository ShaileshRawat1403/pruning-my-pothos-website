# SEO/AEO/GEO Site Overlay (pruningmypothos)

Purpose: apply the Core framework to this site's current information architecture and writing style.

## Site context
- Style: editorial, reading-first, calm and text-led.
- Main content areas: `systems`, `sentences`, `self`, `sticky-notes`, `shelf`.
- Systems is long-form and concept-heavy; maintain consistency gates.

## Section role mapping
- `systems`: flagship knowledge assets and conceptual frameworks (highest depth).
- `sentences`: concise mental models and framing statements (high clarity, low length).
- `self`: reflective context and perspective pages (author trust and narrative identity).
- `shelf`: applied references, tools, notes, and resources (bridging intent to action).
- `sticky-notes`: micro-insights (supportive signals, not primary ranking targets).

## Priority entity model
- Primary entity family: AI systems thinking, language, reasoning, architecture patterns.
- Secondary entities: prompting, retrieval, embeddings, orchestration, evaluation, decision design.
- Keep entity naming stable across sections.

## Transferable operating model
- Core docs remain generic; this file maps them to repo conventions.
- Keep changes portable by avoiding hard-coded one-off playbooks in page content.

## Required implementation standards in this repo
- Keep trailing-slash internal links consistent with project convention.
- Keep metadata descriptions unique and intent-matched.
- Use schema only where backed by visible content.
- Preserve existing section style constraints in `AGENTS.md`.
- Do not break current layout/navigation/visual guardrails while optimizing.

## Recommended page anatomy for high-value docs
- Lead: what this page solves and for whom.
- Quick answer block: concise definition or direct answer.
- Structured core sections: explanation, mechanism, trade-offs, failure modes.
- Internal next steps: 2-4 contextual links.
- Optional FAQ block when likely question patterns are clear.

## Cross-section linking requirements
- Systems pages should link into relevant sentences/self/shelf pages where useful.
- Sentences pages should occasionally link back to deeper systems anchors.
- Shelf resources should link to the concept/system they support.

## Measurement cadence
- Weekly: crawl/index sanity + internal link health + metadata diffs.
- Bi-weekly: answer-surface checks for key questions.
- Monthly: GEO citation/retrieval spot checks using stable prompt sets.

## Decision rules
- If optimization conflicts with editorial clarity, choose clarity.
- If schema conflicts with page truth, remove schema.
- If a page has weak intent fit, fix structure before adding keywords.
