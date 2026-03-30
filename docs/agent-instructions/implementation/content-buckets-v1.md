# Content Buckets v1

## Objective
Turn topic planning into an operating system that agents can follow without producing robotic or duplicate content.

This site should not publish "more SEO content" in the abstract. It should publish:
- one clear canonical page per concept
- supporting pages that strengthen the concept from different angles
- proof surfaces that keep authority grounded
- short-form pieces that increase recall without diluting the topic owner

The goal is to make each agent aware of the task at hand:
1. identify the correct content bucket
2. identify the page type
3. identify the search intent
4. identify the canonical topic owner
5. identify the proof surface and required internal links

## Bucket Model

### 1. Discoverability
Job:
Explain how pages become crawlable, retrievable, answerable, and citable across SEO, AEO, and GEO.

Primary keywords:
- seo
- aeo
- geo
- discoverability
- citation
- answer-ready content
- entity architecture
- topic clusters

Typical outputs:
- systems explainers
- glossary anchors
- audit/checklist portfolio pages
- summary decks and short-form reinforcement

Success signal:
Pages in this bucket become the canonical explanation layer for searchability questions.

### 2. Retrieval Systems
Job:
Explain how knowledge is structured, retrieved, grounded, and verified at runtime.

Primary keywords:
- retrieval
- rag
- grounding
- runtime memory
- knowledge surface
- chunking
- source of truth
- retrieval quality

Typical outputs:
- systems explainers
- shelf notes
- local experiments
- evaluation resources

Success signal:
The site can explain retrieval as a systems problem, not a feature checkbox.

### 3. Agent Runtime
Job:
Explain how agents, skills, workflows, and tools actually execute work under constraints.

Primary keywords:
- agents
- orchestration
- tool use
- skills
- workflow
- runtime
- handoff
- execution

Typical outputs:
- systems explainers
- local experiments
- shared resources
- portfolio playbooks

Success signal:
The site becomes useful for practitioners trying to move from prompting to governed execution.

### 4. Governance and Reliability
Job:
Explain how systems stay safe, observable, controllable, and reviewable.

Primary keywords:
- governance
- policy
- evaluation
- observability
- verification
- guardrails
- reliability
- oversight

Typical outputs:
- systems explainers
- checklist portfolio pages
- runtime proof pages
- sticky-note reminders

Success signal:
The site can answer not only "how it works" but also "how it stays dependable."

### 5. Operational Adoption
Job:
Explain how teams adopt, operationalize, and sustain AI systems beyond the demo stage.

Primary keywords:
- adoption
- enablement
- change management
- operating model
- rollout
- documentation
- team workflows
- implementation

Typical outputs:
- systems explainers
- portfolio docs
- self pages
- enablement resources

Success signal:
The site owns the "AI adoption as systems design" angle rather than generic transformation language.

### 6. Proof Surfaces
Job:
Show evidence, artifacts, and experiments that support the canonical ideas.

Primary keywords:
- portfolio
- playbook
- checklist
- runbook
- template
- local experiment
- deck

Typical outputs:
- portfolio pages
- local experiments
- shelf resources
- notes and summary artifacts

Success signal:
Concept pages always have somewhere concrete to point.

## Page Types

### Canonical explainer
Usually lives in `systems`.
Purpose:
Own one concept clearly and durably.

### Supporting explainer
Usually lives in `systems`, `self`, or `shelf/notes`.
Purpose:
Cover a narrower angle, comparison, or operational variant.

### Proof surface
Usually lives in `portfolio`, `shelf/local-experiments`, or `shelf/shared-resources`.
Purpose:
Show the concept in action.

### Sentence
Usually lives in `sentences`.
Purpose:
Create memorable phrasing and internal-link reinforcement.

### Sticky note
Usually lives in `sticky-notes`.
Purpose:
Capture the smallest durable expression of the idea.

## Search Intent Types
- definition
- comparison
- how it works
- implementation
- evaluation
- governance
- adoption
- audit

Every new topic should declare exactly one primary intent, with one optional secondary intent.

## Agent Workflow
When an agent plans content, it should answer these questions before drafting:

1. Which bucket owns this topic?
2. What is the primary keyword or concept?
3. What search intent is this page serving?
4. What existing canonical page should it strengthen?
5. What proof surface should it link to?
6. Which section is the best fit for this shape?
7. Which 2-4 internal links must exist before the page is considered complete?

## Publishing Pattern
Default cluster pattern:
- 1 canonical `systems` page
- 1 proof surface
- 2 `sentences`
- 1 `sticky note`
- strengthened tag/topic path

This pattern is a default, not a prison. If a topic only deserves one high-quality explainer, do that instead of manufacturing filler.

## Quality Rules
- One canonical page per concept.
- Do not create near-duplicate acronym pages.
- Do not create pages that differ only by phrasing.
- Every new topic must improve the internal graph.
- Every short-form page should strengthen a longer-form page.
- Every canonical page should point to at least one proof surface.
- Every bucket should mix explanation and evidence.

## Decision Heuristics

Choose `systems` when:
- the user intent is definitional or architectural
- the page should own a concept
- the topic needs a durable canonical URL

Choose `portfolio` when:
- the page proves a repeatable artifact
- the value is operational evidence
- the topic should feel implementation-ready

Choose `shelf/local-experiments` when:
- the page shows a hands-on technical trial
- the page supports a systems concept with real setup, outcome, or failure detail

Choose `sentences` when:
- the thought is a durable framing device
- the page helps reinforcement more than explanation

Choose `sticky-notes` when:
- the idea is compact, early, or intentionally unfinished

## Current Strategic Gaps
Current topic coverage is already strong for:
- seo
- aeo
- geo
- discoverability
- retrieval
- citation
- governance
- observability

The highest-leverage gap right now is:
- adoption

The second gap is not "missing keywords" but missing operational subtopics around your strongest clusters.

## Priority Buckets To Expand Next
1. Discoverability
2. Operational Adoption
3. Retrieval Systems
4. Governance and Reliability
