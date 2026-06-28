---
title: 'Semantic Caching'
rotation: -2
color: 'var(--color-sticky-3)'
tags:
  - caching
  - llm-ops
---

Semantic caching maps natural language queries to vector spaces.
If a query falls within the similarity threshold, we bypass the LLM.
But loose boundaries lead to cache collisions and serve stale data.
Optimize for safety by raising the similarity gate.
