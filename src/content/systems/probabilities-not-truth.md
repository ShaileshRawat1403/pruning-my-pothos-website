---
title: "Probabilities, Not Truth"
description: "Why AI models sound confident even when they are wrong, and why hallucination is a feature of probabilistic systems, not a bug."
category: "Concepts"
tags:
  - probability
  - hallucination
  - reliability
  - mental-models
---

> **Key takeaways**
>
> - Large Language Models (LLMs) are **probabilistic**, not deterministic. They do not know what is true; they know what is <span class="highlight">likely</span>.
> - **Hallucination** is not a malfunction; it is the model doing exactly what it was trained to do (predict the next token) without a grounding in reality.
> - Confidence is a style, not a metric of accuracy. A model can be 100% confident and 100% wrong.
> - To build reliable systems, you must treat model outputs as **proposals**, not facts.

<figure class="diagram diagram-hero">
  <svg viewBox="0 0 900 260" role="img" aria-labelledby="prob-hero-title prob-hero-desc" style="width: 100%; height: auto; display: block;">
    <title id="prob-hero-title">Likelihood vs Truth</title>
    <desc id="prob-hero-desc">A comparison between a Database (Truth lookup) and an LLM (Probability roll).</desc>

    <!-- Left: Database -->
    <g transform="translate(50, 40)">
      <text x="100" y="20" text-anchor="middle" font-family="var(--font-mono)" font-size="14" fill="currentColor" font-weight="bold">Database (Truth)</text>
      <rect x="20" y="40" width="160" height="100" rx="4" fill="none" stroke="currentColor" stroke-width="2" />
      <line x1="20" y1="70" x2="180" y2="70" stroke="currentColor" stroke-width="1" />
      <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" stroke-width="1" />
      <text x="100" y="90" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="currentColor">Fact: "Paris"</text>

      <text x="100" y="170" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="currentColor">Query: "Capital?"</text>
      <path d="M 100 130 V 150" stroke="currentColor" stroke-width="2" marker-start="url(#arrowhead)" />
    </g>

    <!-- Divider -->
    <line x1="300" y1="20" x2="300" y2="240" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" />

    <!-- Right: LLM -->
    <g transform="translate(350, 40)">
      <text x="250" y="20" text-anchor="middle" font-family="var(--font-mono)" font-size="14" fill="currentColor" font-weight="bold">LLM (Probability)</text>

      <!-- Input -->
      <text x="50" y="100" font-family="var(--font-serif)" font-size="18" fill="currentColor">"The first person on Mars was"</text>

      <!-- Probabilities -->
      <g transform="translate(300, 60)">
        <rect x="0" y="0" width="180" height="30" rx="4" fill="var(--color-blockquote-bg)" stroke="none" />
        <rect x="0" y="0" width="90" height="30" rx="4" fill="var(--color-accent)" opacity="0.3" />
        <text x="10" y="20" font-family="var(--font-mono)" font-size="12" fill="currentColor">John Boone (50%)</text>

        <rect x="0" y="40" width="180" height="30" rx="4" fill="var(--color-blockquote-bg)" stroke="none" />
        <rect x="0" y="40" width="54" height="30" rx="4" fill="var(--color-accent)" opacity="0.2" />
        <text x="10" y="60" font-family="var(--font-mono)" font-size="12" fill="currentColor">Mark Watney (30%)</text>

        <rect x="0" y="80" width="180" height="30" rx="4" fill="var(--color-blockquote-bg)" stroke="none" />
        <rect x="0" y="80" width="36" height="30" rx="4" fill="var(--color-accent)" opacity="0.1" />
        <text x="10" y="100" font-family="var(--font-mono)" font-size="12" fill="currentColor">Elon Musk (20%)</text>
      </g>

      <!-- Arrow -->
      <path d="M 260 75 H 290" stroke="currentColor" stroke-width="2" marker-end="url(#arrowhead)" />

      <!-- Result -->
      <text x="390" y="150" text-anchor="middle" font-family="var(--font-serif)" font-size="18" fill="var(--color-accent)" font-style="italic">"John Boone"</text>
      <text x="390" y="170" text-anchor="middle" font-family="var(--font-mono)" font-size="10" fill="var(--color-text-muted)">(Plausible, but fiction)</text>
    </g>

  </svg>
  <figcaption>Databases retrieve facts. Models generate plausible continuations.</figcaption>
</figure>

If you ask a database for the capital of France, it looks up the row labeled "France" and returns "Paris." If the row doesn't exist, it returns an error.

If you ask an AI model for the capital of Mars, it doesn't look up a fact. It calculates which words are statistically most likely to follow the phrase "The capital of Mars is..." based on the science fiction and speculative texts it has read. It might confidently answer "Elon City" or "Olympus Mons."

This is the fundamental nature of the technology: it is a **probability engine**, not a truth engine.

<div id="toc-anchor"></div>
<nav class="toc" aria-label="On-page">
  <h2 class="toc-title">Contents</h2>
  <ol>
    <li><a href="#the-confidence-trick">The Confidence Trick</a></li>
    <li><a href="#hallucination-is-a-feature-not-a-bug">Hallucination Is a Feature, Not a Bug</a></li>
    <li><a href="#accuracy-vs-trustworthiness">Accuracy vs Trustworthiness</a></li>
    <li><a href="#what-this-changes-in-practice">What This Changes in Practice</a></li>
  </ol>
</nav>

## The Confidence Trick

Why do models sound so confident even when they are wrong?

Because they are trained on human writing, and humans usually write confidently. The model is mimicking the **style** of an authoritative answer.

- **Training Data:** Wikipedia, textbooks, news articles (all authoritative styles).
- **Model Behavior:** Predicts the next token that fits that authoritative style.

If you ask a question, the most probable continuation is a confident answer, not a hesitant one. The model isn't "feeling" confident; it is simply completing the pattern of a confident expert.

## Hallucination Is a Feature, Not a Bug

We call it "hallucination" when the model makes things up. But to the model, there is no difference between "recalling a fact" and "inventing a fact." Both are just predicting the next token.

- **Recall:** "The capital of France is [Paris]." (High probability because "Paris" almost always follows).
- **Hallucination:** "The first person on Mars was [John Boone]." (High probability because in the sci-fi context it read, this was true).

The model is designed to be **creative** and **fluent**. The same mechanism that allows it to write a fictional story (a feature) allows it to invent a legal precedent (a bug). You cannot easily turn off one without killing the other.

<aside class="callout">
  <p><strong>Insight.</strong> Hallucination is just "creativity" applied to the wrong context.</p>
</aside>

## Accuracy vs Trustworthiness

In traditional software, we expect 100% accuracy. If a calculator says 2+2=5, it is broken.

In AI, we cannot expect 100% accuracy. Instead, we must design for **trustworthiness**.

- **Accuracy:** Getting the right answer.
- **Trustworthiness:** Knowing when you might be wrong.

Current models are high-accuracy but low-trustworthiness. They are often right, but they don't know when they are wrong. This makes them dangerous if used without supervision.

## What This Changes in Practice

Since we cannot rely on the model to be truthful, we must change how we build systems around it:

1.  **Grounding (RAG):** Don't ask the model to "know" things. Give it a document and ask it to "extract" things. This forces it to use the provided context rather than its internal probabilities.
2.  **Verification:** Never use an LLM for a high-stakes decision without a verification step (either a human review or a code-based check).
3.  **Citations:** Ask the model to cite its sources. If it can't point to where it found the information in your provided text, it is likely hallucinating.

Treat the model like a brilliant but prone-to-exaggeration intern. You give them the task, but you check their work.
