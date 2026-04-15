---
title: "What I Learned Debugging a Multi-Agent System"
description: "The debugging session that taught me why observability is not optional in orchestration, and what I now look for first when a multi-agent system misbehaves."
publishDate: "2026-04-14"
tags:
  - agents
  - orchestration
  - debugging
  - observability
---

<p class="lead">The system was producing wrong answers. Nobody knew why.</p>

Two agents were working together. One retrieved context, the other generated output. Both seemed to be working fine in isolation. Together, they were producing outputs that were confidently incorrect.

The problem was invisible because the system had no observability. I could see the final output. I could not see what happened in between.

I spent two days adding tracing before I could debug. Once I could see the handoff between agents, the problem was obvious: the context retrieval agent was including stale data that the generation agent did not know was stale. <span class="highlight">The generation agent trusted the context without knowing its age or source.</span>

<figure class="content-figure">
<svg viewBox="0 0 560 160" role="img" aria-labelledby="multi-agent-trace-title">
  <title id="multi-agent-trace-title">A multi-agent trace showing context flow between agents</title>
  <rect class="figure-stroke" x="40" y="50" width="100" height="60" rx="10" fill="none" stroke-width="2" />
  <rect class="figure-stroke" x="230" y="50" width="100" height="60" rx="10" fill="none" stroke-width="2" />
  <rect class="figure-stroke" x="420" y="50" width="100" height="60" rx="10" fill="none" stroke-width="2" />
  <text class="figure-label" x="90" y="85" text-anchor="middle">Agent A</text>
  <text class="figure-label" x="280" y="85" text-anchor="middle">Context</text>
  <text class="figure-label" x="470" y="85" text-anchor="middle">Agent B</text>
  <path d="M140 80h70" stroke="currentColor" stroke-width="2" />
  <path d="M330 80h70" stroke="currentColor" stroke-width="2" />
  <text x="90" y="105" font-family="var(--font-mono)" font-size="9" text-anchor="middle">Trace: timestamp</text>
  <text x="90" y="118" font-family="var(--font-mono)" font-size="9" text-anchor="middle">Trace: source</text>
  <text x="470" y="105" font-family="var(--font-mono)" font-size="9" text-anchor="middle">Trace: age</text>
  <text x="470" y="118" font-family="var(--font-mono)" font-size="9" text-anchor="middle">Trace: confidence</text>
</svg>
<figcaption>Without trace data, you cannot see where the failure happened.</figcaption>
</figure>

Now I add observability before debugging. Not after. The first question I ask when a multi-agent system misbehaves is not "what is the output?" It is "can I see inside the orchestration?"

**What this changes in practice:** add tracing and observability to multi-agent systems before they fail, not after. You cannot debug what you cannot see.
