---
title: "Learning to Say I Don't Know"
description: "What I learned about trust and reliability when I started designing systems that acknowledged the limits of their own reasoning."
publishDate: "2026-04-14"
tags:
  - uncertainty
  - reasoning
  - trust
  - design
---

<p class="lead">I used to think a good AI system was one that answered everything.</p>

Now I think a good AI system is one that knows when to stop answering.

The shift happened when I watched a system produce a confident, well-structured answer to a question that was malformed. The answer was fluent. It was also completely wrong. And the system had no signal that anything had gone wrong.

That moment made me rethink what reliability means. <span class="highlight">Reliability is not the absence of failure. It is the ability to recognize failure conditions and handle them gracefully.</span>

I started building uncertainty signals into the systems I design. Not as a feature, but as a core property. When the system is operating in ambiguous territory, it should say so. When it is retrieving from a governed source versus relying on its training, it should make that distinction visible.

<figure class="content-figure">
<svg viewBox="0 0 560 140" role="img" aria-labelledby="confidence-spectrum-title">
  <title id="confidence-spectrum-title">The confidence spectrum from certainty to uncertainty signaling</title>
  <rect class="figure-stroke" x="40" y="50" width="100" height="50" rx="8" fill="none" stroke-width="2" />
  <rect class="figure-stroke" x="170" y="50" width="100" height="50" rx="8" fill="none" stroke-width="2" />
  <rect class="figure-stroke" x="300" y="50" width="100" height="50" rx="8" fill="none" stroke-width="2" />
  <rect class="figure-fill" x="430" y="50" width="90" height="50" rx="8" />
  <text class="figure-label" x="90" y="80" text-anchor="middle">Certain</text>
  <text class="figure-label" x="220" y="80" text-anchor="middle">Likely</text>
  <text class="figure-label" x="350" y="80" text-anchor="middle">Uncertain</text>
  <text class="figure-label figure-label-strong" x="475" y="80" text-anchor="middle">Void</text>
  <path d="M140 75h24 M270 75h24 M400 75h24" stroke="currentColor" stroke-width="2" />
</svg>
<figcaption>The system should know where it sits on this spectrum for each query.</figcaption>
</figure>

I find that users trust systems more when those systems are honest about uncertainty. A system that says "I am not sure" and explains why feels more reliable than one that produces confident answers that turn out to be wrong.

**What this changes in practice:** design for uncertainty expression as a core system property, not as a fallback feature.
