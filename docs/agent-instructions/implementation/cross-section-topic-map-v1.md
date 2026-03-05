# Cross-section Topic Map v1 (Value-first)

Purpose: define high-value topics that can be expressed across `systems`, `sentences`, `self`, `shelf`, and `sticky-notes` without diluting section identity.

## Selection criteria
- Durable user value (not trend-chasing)
- Strong fit with site identity (AI systems, language, reflective technical practice)
- Can be taught at multiple depths across sections
- Supports SEO, AEO, and GEO entity clarity

## Topic clusters and section mapping

| Cluster | Why it matters | Systems (flagship/support) | Sentences | Self | Shelf | Sticky-notes |
|---|---|---|---|---|---|---|
| Retrieval quality and citation trust | Core to GEO and answer reliability | Flagship on retrieval trust loops; support on grounding failure modes | 2-3 lines on "retrieve before claim" | Reflection on trust calibration | Resource list for retrieval eval tools/papers | Micro prompts on evidence hygiene |
| Evaluation as runtime discipline | Shifts quality from model hype to operations | Flagship on eval architecture; support on eval taxonomies | Short notes on "measure before optimize" | Personal process for weekly eval rituals | Shared templates/checklists | Small reminders for eval triggers |
| Agent orchestration and guardrails | Practical need for safe automation | Flagship on intent->policy->tool execution | Frames on constraints as design | Trade-offs in autonomy vs control | Tooling stack notes and references | Short guardrail heuristics |
| Structured outputs and contracts | Improves reliability + integration safety | Flagship on schema contracts and breakpoints | One-idea lines on ambiguity costs | Writing discipline for predictable outputs | Snippet-ready contract resources | "Name the contract first" notes |
| Drift, observability, and failure economics | Prevents silent degradation | Flagship on drift signals and intervention loops | Friction-as-signal framing | Reflection on noticing weak signals early | Monitoring resources and failure postmortems | Drift diary style notes |
| Knowledge systems and memory design | Enables reusable, compounding knowledge | Flagship on memory layers and retrieval interfaces | Mental-model sentences | Personal knowledge workflow notes | Tools/resources for knowledge ops | Short notes on naming/indexing |
| Human-in-the-loop decision design | Protects quality in ambiguous tasks | Flagship on escalation thresholds | Decision responsibility lines | Reflection on judgment under uncertainty | Governance and decision templates | Quick reminders for escalation |
| Content operations for discoverability | Bridges writing and distribution outcomes | Flagship on content system architecture | Lines on structure and clarity | Writing-for-two-readers expansions | Resource playbooks for editorial ops | Compact reminders for publishing checks |

## Priority backlog (safe first batch)

### Tier 1 (high impact, immediate)
- Systems:
  - `retrieval-trust-loops-and-citation-quality.mdx`
  - `evaluation-as-a-runtime-discipline.mdx`
  - `agent-guardrails-as-execution-architecture.mdx`
- Sentences:
  - `measure-before-optimize.md`
  - `retrieve-before-claim.md`
  - `constraints-prevent-confusion.md`
- Self:
  - `how-i-run-a-weekly-eval-loop.md`
- Shelf (shared-resources/tools):
  - `retrieval-and-grounding-evaluation-kit.md`

### Tier 2 (cluster depth)
- Systems:
  - `schema-contracts-and-breakpoints.mdx`
  - `drift-signals-and-intervention-thresholds.mdx`
- Sentences:
  - `contracts-reduce-ambiguity.md`
  - `drift-is-rarely-loud.md`
- Shelf:
  - one resource page for observability and model quality reporting

### Tier 3 (authority reinforcement)
- Cross-link review pass to tighten cluster edges.
- FAQ extraction pass for pages with repeated user questions.
- Monthly update notes for flagship docs that need freshness.

## Linking map requirements (per cluster)
- 1 flagship systems page links to at least 3 supporting pages.
- Each supporting page links back to flagship plus 1 sibling page.
- At least one sentence and one shelf page point into each Tier 1 flagship.
- Self entries should link to one systems page and one shelf resource when relevant.

## Publishing safety
- Keep section style constraints from `AGENTS.md` unchanged.
- Keep systems consistency gates green (`npm run lint:systems`).
- Avoid content duplication; if overlap exists, merge intent or rewrite scope.
