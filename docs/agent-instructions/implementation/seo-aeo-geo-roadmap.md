# SEO/AEO/GEO Implementation Roadmap (As-Is -> To-Be)

## As-Is (current state)
- Strong editorial content base exists, especially in `systems`.
- Systems consistency automation is in place (structure/word/callout/highlight checks).
- Cluster content for SEO/AEO/GEO has been published.
- Technical SEO baseline has already been improved (canonical/trailing slash/sitemap/link normalization).

## To-Be (target state)
- Every priority section has explicit intent mapping and entity coverage map.
- Every high-value page follows answerable structure and machine-readable schema where applicable.
- Internal links form intentional clusters rather than incidental references.
- Measurement is repeatable across SEO, AEO, and GEO with monthly decision reviews.

## Gaps to close
1. No single scorecard yet for page-level SEO/AEO/GEO readiness.
2. Section-level entity map is not yet formalized in one canonical file.
3. Schema rollout is not yet tracked as a staged implementation stream.
4. Answer-surface and GEO retrieval checks are not yet standardized with fixed prompt sets.

## Implementation phases

### Phase 1: Audit and mapping
- Build a page inventory with intent labels and entity labels.
- Mark pages as: keep, merge, upgrade, or create.
- Produce a priority list for top-impact pages (starting with `systems`).

### Phase 2: Page upgrades
- Upgrade top-priority pages using templates in `docs/agent-instructions/templates/`.
- Add missing direct-answer blocks and related-reading links.
- Apply schema selectively where content supports it.

### Phase 3: Cluster hardening
- Ensure each cluster has one flagship + support pages + cross-links.
- Remove overlap and thin pages that add little unique value.
- Add FAQ sections only where question patterns are clear.

### Phase 4: Measurement loop
- Define stable query set (SEO) and prompt set (AEO/GEO).
- Run T+7 / T+14 / T+30 reporting cycles.
- Feed learnings back into content and linking adjustments.

## First execution batch (recommended)
- Batch A: `systems` flagship and top 5 supporting docs.
- Batch B: related `sentences` and `shelf` pages for cluster reinforcement.
- Batch C: section landing pages for metadata and intent sharpening.

## Done criteria for each batch
- Intent + entity labels complete.
- Metadata and structure align to intent.
- Internal links satisfy cluster map.
- Applicable schema validated.
- Logged in handoff with before/after notes.
