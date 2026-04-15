---
title: "Designing My First Safety Constraint"
description: "What I learned designing the first architectural boundary in an autonomous system, and why I had to resist the urge to make it configurable."
publishDate: "2026-04-14"
tags:
  - autonomy
  - safety
  - engineering
  - design
---

<p class="lead">The first safety constraint I designed was supposed to be a configuration flag.</p>

The product manager wanted flexibility. The system could block or allow certain actions based on a config setting. It sounded reasonable. It was also completely wrong.

A safety constraint that can be disabled is not a safety constraint. It is an advisory. And advisories get disabled at the worst possible moment, usually when someone is under pressure and needs the system to move faster.

I learned that <span class="highlight">safety constraints must be architectural, not configurable</span>. The difference is that architectural constraints are enforced by the system itself. Configurable settings are enforced by whoever is willing to change the config.

<figure class="content-figure">
<svg viewBox="0 0 560 140" role="img" aria-labelledby="constraint-types-title">
  <title id="constraint-types-title">The difference between advisory and architectural constraints</title>
  <rect class="figure-stroke" x="40" y="35" width="220" height="70" rx="10" fill="none" stroke-width="2" />
  <rect class="figure-fill" x="300" y="35" width="220" height="70" rx="10" />
  <text class="figure-label" x="150" y="65" text-anchor="middle">Configurable</text>
  <text class="figure-label" x="150" y="85" text-anchor="middle">advisory</text>
  <text class="figure-label" x="150" y="100" font-size="10" text-anchor="middle">Can be disabled</text>
  <text class="figure-label figure-label-strong" x="410" y="65" text-anchor="middle">Architectural</text>
  <text class="figure-label figure-label-strong" x="410" y="85" text-anchor="middle">enforced</text>
  <text class="figure-label figure-label-strong" x="410" y="100" font-size="10" text-anchor="middle">Cannot be bypassed</text>
</svg>
<figcaption>Advisory constraints fail when you need them most. Architectural constraints do not.</figcaption>
</figure>

I redesigned the constraint to be architectural. The system would block the action regardless of any configuration setting. It could not be disabled without a code change and a review process.

The product manager was initially unhappy. The flexibility was gone. But the system was now trustworthy. And in the months since, there have been two situations where that constraint prevented an irreversible action. Both times, the team was grateful it was there.

**What this changes in practice:** if a safety constraint can be bypassed, it is not a safety constraint. Design it to be architectural, not configurable.
