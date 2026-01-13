---
title: "From Prompt to Production: A Human Checklist"
description: "A rigorous 7-step framework to move from 'it works on my machine' to a resilient, governed AI workflow."
category: "How-things-fit-together"
tags:
  - checklist
  - deployment
  - production
  - safety
---

> **Key takeaways**
>
> - A prompt in a playground is a prototype; a prompt in production is a <span class="highlight">contract</span>.
> - You must define **intent** and **success criteria** before writing a single line of instruction.
> - **Guardrails** are not optional features; they are the safety belts of the system.
> - **Human fallback** is the ultimate error handler for probabilistic systems.

<figure class="diagram diagram-hero">
  <svg viewBox="0 0 900 260" role="img" aria-labelledby="checklist-hero-title checklist-hero-desc" style="width: 100%; height: auto; display: block;">
    <title id="checklist-hero-title">The Production Path</title>
    <desc id="checklist-hero-desc">A stepped path showing Intent, Risk, Interface, Validate, Monitor, and Fallback.</desc>
    <line x1="100" y1="130" x2="800" y2="130" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4" />

    <!-- Step 1 -->
    <circle cx="150" cy="130" r="20" fill="var(--color-bg)" stroke="currentColor" stroke-width="2" />
    <text x="150" y="135" text-anchor="middle" font-family="var(--font-mono)" font-size="14" fill="currentColor">1</text>
    <text x="150" y="170" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="currentColor">Intent</text>

    <!-- Step 2 -->
    <circle cx="270" cy="130" r="20" fill="var(--color-bg)" stroke="currentColor" stroke-width="2" />
    <text x="270" y="135" text-anchor="middle" font-family="var(--font-mono)" font-size="14" fill="currentColor">2</text>
    <text x="270" y="170" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="currentColor">Risk</text>

    <!-- Step 3 -->
    <circle cx="390" cy="130" r="20" fill="var(--color-bg)" stroke="currentColor" stroke-width="2" />
    <text x="390" y="135" text-anchor="middle" font-family="var(--font-mono)" font-size="14" fill="currentColor">3</text>
    <text x="390" y="170" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="currentColor">Interface</text>

    <!-- Step 4 -->
    <circle cx="510" cy="130" r="20" fill="var(--color-bg)" stroke="currentColor" stroke-width="2" />
    <text x="510" y="135" text-anchor="middle" font-family="var(--font-mono)" font-size="14" fill="currentColor">4</text>
    <text x="510" y="170" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="currentColor">Validate</text>

    <!-- Step 5 -->
    <circle cx="630" cy="130" r="20" fill="var(--color-bg)" stroke="currentColor" stroke-width="2" />
    <text x="630" y="135" text-anchor="middle" font-family="var(--font-mono)" font-size="14" fill="currentColor">5</text>
    <text x="630" y="170" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="currentColor">Monitor</text>

    <!-- Step 6 -->
    <circle cx="750" cy="130" r="20" fill="var(--color-accent)" stroke="none" />
    <text x="750" y="135" text-anchor="middle" font-family="var(--font-mono)" font-size="14" fill="#fff">6</text>
    <text x="750" y="170" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="var(--color-accent)">Fallback</text>

  </svg>
  <figcaption>Don't skip steps. The cost of fixing AI in production is 10x the cost of design.</figcaption>
</figure>

It is easy to get an LLM to do something cool once. It is hard to get it to do something useful 10,000 times in a row without embarrassing the company.

This checklist is designed for **non-technical leaders** and **product owners** who are deploying AI workflows. It forces you to slow down and think about the system, not just the magic.

<div id="toc-anchor"></div>
<nav class="toc" aria-label="On-page">
  <h2 class="toc-title">Contents</h2>
  <ol>
    <li><a href="#1-define-intent-the-contract">1. Define Intent (The Contract)</a></li>
    <li><a href="#2-identify-risks-the-red-team">2. Identify Risks (The Red Team)</a></li>
    <li><a href="#3-set-inputsoutputs-the-interface">3. Set Inputs/Outputs (The Interface)</a></li>
    <li><a href="#4-validate-the-eval">4. Validate (The Eval)</a></li>
    <li><a href="#5-monitor-drift-the-pulse">5. Monitor Drift (The Pulse)</a></li>
    <li><a href="#6-human-fallback-the-safety-net">6. Human Fallback (The Safety Net)</a></li>
  </ol>
</nav>

## 1. Define Intent (The Contract)

Before writing a prompt, write a sentence describing exactly what the AI should do—and what it should **not** do.

- **Goal:** "Summarize customer support tickets."
- **Constraint:** "Do not invent details. If the ticket is unclear, state 'Unclear'."
- **Persona:** "Act as a senior support agent."

## 2. Identify Risks (The Red Team)

What is the worst thing that could happen? Be specific.

- **Hallucination:** Inventing a refund policy that doesn't exist.
- **Toxicity:** Responding rudely to an angry customer.
- **Data Leak:** Revealing one customer's data to another.

<aside class="callout">
  <p><strong>Action:</strong> Create a "Red Team" document where you try to break your own prompt. Feed it confusing, angry, or malicious inputs and see what happens.</p>
</aside>

## 3. Set Inputs/Outputs (The Interface)

Natural language is fluid, but your business systems are not. Define the structure.

- **Input:** "Raw text from email body, truncated to 2000 tokens."
- **Output:** "JSON object containing `{ summary, sentiment, urgency_score }`."

Forcing the model to output structured data (JSON) is the single best way to make it reliable for software integration.

## 4. Validate (The Eval)

Do not deploy until you have run your prompt against at least 50 examples.

- **Gold Set:** 50 real examples from history.
- **Metric:** How many did it get right?
- **Threshold:** "We will not deploy until accuracy > 90%."

## 5. Monitor Drift (The Pulse)

Once deployed, the system will degrade. Not because the code rots, but because the world changes.

- **Log everything:** Save every input and output.
- **Spot checks:** Have a human review 1% of daily traffic.
- **User feedback:** Add a "thumbs down" button. If a user clicks it, that data point goes straight to the engineering team.

## 6. Human Fallback (The Safety Net)

Probabilistic systems **will** fail. You need a plan for when (not if) that happens.

<figure class="diagram">
  <svg viewBox="0 0 900 160" role="img" aria-labelledby="fallback-title fallback-desc" style="width: 100%; height: auto; display: block;">
    <title id="fallback-title">Human Fallback Flow</title>
    <desc id="fallback-desc">Flowchart showing AI Confidence check. High confidence goes to User. Low confidence routes to Human Review.</desc>
    <rect x="50" y="60" width="120" height="40" rx="4" fill="none" stroke="currentColor" stroke-width="2" />
    <text x="110" y="85" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="currentColor">AI Output</text>

    <path d="M 170 80 H 220" stroke="currentColor" stroke-width="2" marker-end="url(#arrowhead)" />

    <polygon points="220,80 270,40 320,80 270,120" fill="var(--color-blockquote-bg)" stroke="currentColor" stroke-width="2" />
    <text x="270" y="85" text-anchor="middle" font-family="var(--font-mono)" font-size="10" fill="currentColor">Confidence?</text>

    <!-- High Path -->
    <path d="M 320 80 H 400" stroke="currentColor" stroke-width="2" marker-end="url(#arrowhead)" />
    <text x="360" y="70" text-anchor="middle" font-family="var(--font-mono)" font-size="10" fill="var(--color-text-muted)">High</text>
    <rect x="400" y="60" width="120" height="40" rx="4" fill="none" stroke="currentColor" stroke-width="2" />
    <text x="460" y="85" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="currentColor">User</text>

    <!-- Low Path -->
    <path d="M 270 120 V 140 H 400" stroke="var(--color-accent)" stroke-width="2" fill="none" marker-end="url(#arrowhead)" />
    <text x="300" y="155" text-anchor="middle" font-family="var(--font-mono)" font-size="10" fill="var(--color-accent)">Low</text>
    <rect x="400" y="120" width="120" height="40" rx="4" fill="none" stroke="var(--color-accent)" stroke-width="2" />
    <text x="460" y="145" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="var(--color-accent)">Human Review</text>

  </svg>
  <figcaption>The "Human in the Loop" is not a bug; it's a feature of high-reliability systems.</figcaption>
</figure>

If the AI's confidence score is low, or if a guardrail is triggered, the system should **fail gracefully** to a human. Do not show the user a hallucination. Show them a message: _"I'm not sure about that, let me connect you to a specialist."_

---
