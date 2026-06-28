---
title: 'Escalation requires context.'
summary: 'When a system fails to resolve intent, it must pass the full context, not just the failure.'
category: 'Judgment'
tags:
  - decision-making
  - orchestration
  - governance
  - safety
  - seo
  - aeo
  - geo
---

Autonomous systems will eventually encounter tasks they cannot resolve. This is not a failure; it is a limit.

The true failure occurs when the system escalates the task to a human without passing the context. Asking a human to debug a blind state is expensive and slow.

Good design ensures that when an agent hands off a task, it passes the history, the intent, and the exact point of ambiguity.

**What this changes in practice:** build escalation paths so they package the execution state and intermediate outputs for the human reviewer.
