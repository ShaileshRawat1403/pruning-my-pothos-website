# SEO/AEO/GEO Core Instruction Framework

Purpose: provide a reusable, transferable operating system for search visibility (SEO), answer visibility (AEO), and generative retrievability (GEO).

## Scope
- Applies to all content sections and templates.
- Prioritize user value over keyword stuffing.
- Preserve editorial clarity first, optimization second.

## Definitions
- SEO: optimize crawlability, indexability, relevance, and click-through from search engines.
- AEO: optimize answer extraction for assistants and zero-click answer surfaces.
- GEO: optimize for retrieval and citation by LLM-based systems.

## Non-negotiable principles
- Write for users first; optimize without degrading readability.
- One page, one dominant intent, one primary entity/topic.
- Every claim that can be contested should be attributable.
- Internal links are part of knowledge architecture, not decoration.
- Metadata, headings, and body must agree semantically.

## Content architecture rules
- Map content to intent tiers:
  - Foundational explainer (what/why)
  - Implementation (how)
  - Decision support (trade-offs, failure modes)
- Build clusters: flagship page + supporting pages + cross-links.
- Ensure each page contributes new value; avoid near-duplicates.
- Keep canonical URL strategy stable.

## On-page SEO baseline
- Clear `<title>` aligned with query intent and page purpose.
- Distinct meta description summarizing value and scope.
- One `h1`, logical `h2/h3` hierarchy, scannable sections.
- Add concise summaries near top for fast intent confirmation.
- Add descriptive alt text for meaningful visuals.

## AEO baseline
- Include direct answer blocks early for likely user questions.
- Use precise definitions and short "what this means" passages.
- Keep terminology stable across docs (avoid synonym drift).
- Prefer explicit Q->A subsection patterns where natural.
- Use structured lists when process order matters.

## GEO baseline
- Center pages around named entities and explicit relationships.
- Use citation-friendly writing: concrete facts, dates, scope.
- Add cross-document references to related internal pages.
- Reduce ambiguity in pronouns and context switching.
- Keep section-level summaries that can stand alone when quoted.

## Structured data baseline
- Use schema that matches page intent (Article, FAQPage, BreadcrumbList, WebSite, Organization/Person where relevant).
- Keep structured data factually aligned with visible content.
- Avoid schema inflation (do not add types that content does not support).

## Linking strategy
- Every core page should link to:
  - 2-4 closely related internal pages
  - selective external authoritative sources when needed
- Anchor text should describe destination intent.
- Avoid repeated generic anchors ("click here").

## Measurement model
- SEO: impressions, clicks, CTR, indexed pages, technical errors.
- AEO: answer-surface inclusion, featured snippet-like captures, assistant answer quality checks.
- GEO: citation frequency, brand/entity mention quality, retrieval accuracy in prompts.
- Evaluate changes as experiments with before/after windows.

## Quality gates (pre-publish)
- Intent clarity: pass/fail
- Metadata completeness: pass/fail
- Internal linking minimum: pass/fail
- Structured data validity: pass/fail
- Readability and answerability spot-check: pass/fail

## Anti-patterns
- Thin pages created only for keyword variants.
- Contradictory metadata vs body copy.
- Overuse of jargon without definitions.
- Boilerplate internal links that do not add context.
- Metrics-only optimization that harms user trust.
