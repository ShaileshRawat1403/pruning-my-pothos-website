---
title: "What I Learned Running AI Governance at Scale"
description: "What I discovered when governance contracts met real organizational behavior, and why the blueprint rarely survives first contact with the workflow."
publishDate: "2026-04-14"
tags:
  - governance
  - enterprise
  - adoption
  - lessons
---

<p class="lead">The governance contract looked clean in the design doc.</p>

In practice, governance is not a document. It is a negotiation that happens every time a team wants to move faster than the policy allows. I learned this when I tried to enforce boundaries that made sense in theory but created friction that nobody wanted to own.

The first tension is always autonomy versus control. Teams want AI to move quickly. Organizations want humans to approve things. The contract tries to resolve this, but the resolution only holds until a deadline arrives and someone asks to skip the approval step. <span class="highlight">The governance contract only works if someone is willing to enforce it when it is inconvenient.</span>

I found that the blueprint survived longer when I involved the people who would be affected by the policy before finalizing it. Not to negotiate away the boundaries, but to make sure the boundaries made sense for the actual work. A governance contract designed in a room without the people doing the work tends to get worked around.

The second tension is auditability versus usability. Every action logged, every decision traceable, every failure reviewable. That sounds right until the system becomes so burdensome that people stop using it. Then you have no adoption and no audit trail because nothing happened.

<figure class="content-figure">
<svg viewBox="0 0 560 140" role="img" aria-labelledby="governance-tension-title">
  <title id="governance-tension-title">The tension between governance rigor and practical adoption</title>
  <rect class="figure-stroke" x="40" y="40" width="140" height="60" rx="10" fill="none" stroke-width="2" />
  <rect class="figure-stroke" x="330" y="40" width="140" height="60" rx="10" fill="none" stroke-width="2" />
  <rect class="figure-fill" x="185" y="55" width="130" height="30" rx="8" />
  <text class="figure-label" x="110" y="75" text-anchor="middle">Full audit</text>
  <text class="figure-label" x="110" y="92" text-anchor="middle">traceability</text>
  <text class="figure-label" x="400" y="75" text-anchor="middle">Practical</text>
  <text class="figure-label" x="400" y="92" text-anchor="middle">adoption</text>
  <text class="figure-label figure-label-strong" x="250" y="75" text-anchor="middle">Viable</text>
  <text class="figure-label figure-label-strong" x="250" y="92" text-anchor="middle">compromise</text>
</svg>
<figcaption>The goal is the overlap, not either extreme.</figcaption>
</figure>

I think about governance now as something that has to be maintained, not just designed. The blueprint is a starting point. The real governance is what emerges from the friction between the ideal system and the actual work.

**What this changes in practice:** governance contracts need owners who will enforce them when they are inconvenient, and designs that make the right path easier than the workaround.
