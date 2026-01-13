---
title: 'Systems 001: Foundations'
description: 'A technical field guide to systems as the infrastructure of evolution and communication, from boundaries and feedback to socio-technical layers.'
category: 'Concepts'
tags:
  - systems
  - foundations
  - feedback
  - socio-technical
---

> **Key takeaways**
> - A system is a set of interconnected parts that forms a unified whole.
> - Boundaries, interfaces, and <span class="highlight">feedback loops</span> determine behavior more than any single component.
> - Systems fail predictably through drift, metric capture, and variety mismatch.
> - Resilient systems recover because they sense, adapt, and learn.
> - Modern systems are socio-technical: human intent and machine execution are interdependent.

<figure class="diagram diagram-hero">
  <svg viewBox="0 0 900 260" role="img" aria-labelledby="systems-hero-title systems-hero-desc" style="width: 100%; height: auto; display: block;">
    <title id="systems-hero-title">Timeline of systems evolution</title>
    <desc id="systems-hero-desc">A horizontal timeline with five icons marking physical coordination, symbolic systems, communication infrastructure, computational systems, and socio-technical systems.</desc>
    <line x1="60" y1="150" x2="840" y2="150" stroke="currentColor" stroke-width="2" />
    <circle cx="100" cy="150" r="9" fill="currentColor" />
    <circle cx="280" cy="150" r="9" fill="currentColor" />
    <circle cx="460" cy="150" r="9" fill="currentColor" />
    <circle cx="640" cy="150" r="9" fill="currentColor" />
    <circle cx="820" cy="150" r="11" fill="var(--color-accent)" />
    <rect x="80" y="73" width="40" height="12" rx="4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    <line x1="88" y1="73" x2="88" y2="61" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    <line x1="112" y1="73" x2="112" y2="61" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    <line x1="80" y1="79" x2="120" y2="79" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    <rect x="262" y="60" width="36" height="44" rx="6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    <line x1="270" y1="72" x2="290" y2="72" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    <line x1="270" y1="82" x2="290" y2="82" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    <line x1="270" y1="92" x2="284" y2="92" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    <circle cx="460" cy="80" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 440 94 C 448 88, 454 86, 460 86 C 466 86, 472 88, 480 94" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 436 102 C 447 94, 453 92, 460 92 C 467 92, 473 94, 484 102" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    <rect x="624" y="64" width="32" height="32" rx="6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    <line x1="624" y1="70" x2="616" y2="70" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    <line x1="624" y1="80" x2="616" y2="80" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    <line x1="624" y1="90" x2="616" y2="90" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    <line x1="656" y1="70" x2="664" y2="70" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    <line x1="656" y1="80" x2="664" y2="80" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    <line x1="656" y1="90" x2="664" y2="90" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    <circle cx="808" cy="72" r="8" stroke="var(--color-accent)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="832" cy="86" r="8" stroke="var(--color-accent)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    <line x1="814" y1="76" x2="826" y2="82" stroke="var(--color-accent)" stroke-width="2" stroke-linecap="round" />
    <line x1="808" y1="80" x2="808" y2="102" stroke="var(--color-accent)" stroke-width="2" stroke-linecap="round" />
    <line x1="832" y1="94" x2="832" y2="102" stroke="var(--color-accent)" stroke-width="2" stroke-linecap="round" />
    <line x1="808" y1="102" x2="798" y2="114" stroke="var(--color-accent)" stroke-width="2" stroke-linecap="round" />
    <line x1="832" y1="102" x2="842" y2="114" stroke="var(--color-accent)" stroke-width="2" stroke-linecap="round" />
    <text x="60" y="210" font-size="12" fill="currentColor" font-family="var(--font-mono)">Physical</text>
    <text x="54" y="230" font-size="12" fill="currentColor" font-family="var(--font-mono)">coordination</text>
    <text x="236" y="210" font-size="12" fill="currentColor" font-family="var(--font-mono)">Symbolic</text>
    <text x="236" y="230" font-size="12" fill="currentColor" font-family="var(--font-mono)">systems</text>
    <text x="394" y="210" font-size="12" fill="currentColor" font-family="var(--font-mono)">Communication</text>
    <text x="420" y="230" font-size="12" fill="currentColor" font-family="var(--font-mono)">infrastructure</text>
    <text x="596" y="210" font-size="12" fill="currentColor" font-family="var(--font-mono)">Computational</text>
    <text x="612" y="230" font-size="12" fill="currentColor" font-family="var(--font-mono)">systems</text>
    <text x="742" y="210" font-size="12" fill="var(--color-accent)" font-family="var(--font-mono)">Socio-technical</text>
    <text x="770" y="230" font-size="12" fill="var(--color-accent)" font-family="var(--font-mono)">systems</text>
  </svg>
  <figcaption>A timeline of system upgrades: from physical coordination to socio-technical integration.</figcaption>
</figure>

A system is a set of interconnected components (physical or abstract) that work together to achieve a purpose. It has inputs, processing, and outputs, and it is shaped by boundaries, constraints, and feedback. You can see systems in circulatory networks, in software infrastructure, and in the governing rules that coordinate human activity. Systems theory studies these patterns across domains because the logic repeats even when the material changes ([von Bertalanffy, 1968](https://monoskop.org/images/5/5b/Von_Bertalanffy_Ludwig_General_System_Theory_1968.pdf)).

<aside class="callout">
  <p><strong>Definition.</strong> A system is any collection of organized, interacting parts that forms a functional whole. Its behavior is shaped by components, boundaries, feedback, and purpose.</p>
</aside>

<div id="toc-anchor"></div>
<nav class="toc" aria-label="On-page">
  <h2 class="toc-title">Contents</h2>
  <div class="toc-groups">
    <details open>
      <summary>Act I: The fundamentals</summary>
      <ol>
        <li><a href="#core-concepts">Core concepts</a></li>
        <li><a href="#boundaries-interfaces-constraints">Boundaries, interfaces, constraints</a></li>
        <li><a href="#failure-modes-and-resilience">Failure modes and resilience</a></li>
        <li><a href="#systems-as-the-backbone-of-history">Systems as the backbone of history</a></li>
        <li><a href="#systems-everywhere-with-scale">Systems everywhere with scale</a></li>
      </ol>
    </details>
    <details>
      <summary>Act II: The modern paradigm</summary>
      <ol>
        <li><a href="#the-socio-technical-merge">The socio-technical merge</a></li>
      </ol>
    </details>
    <details>
      <summary>Act III: Principles in practice</summary>
      <ol>
        <li><a href="#systems-thinking-in-business-strategy">Systems thinking in business strategy</a></li>
        <li><a href="#documentation-as-system-design">Documentation as system design</a></li>
        <li><a href="#systems-as-compression">Systems as compression</a></li>
        <li><a href="#systems-as-feedback">Systems as feedback</a></li>
        <li><a href="#examples-by-domain">Examples by domain</a></li>
        <li><a href="#the-system-is-the-message">The system is the message</a></li>
        <li><a href="#putting-systems-thinking-into-practice">Putting systems thinking into practice</a></li>
        <li><a href="#conclusion">Conclusion</a></li>
      </ol>
    </details>
  </div>
</nav>

## Act I: The fundamentals

### Core concepts

Every system can be described with five primitives. If you can name these, you can map the system quickly and consistently.

<table class="comparison-table">
  <thead>
    <tr>
      <th>Primitive</th>
      <th>What it is</th>
      <th>Why it matters</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Components</td>
      <td>The parts that do the work.</td>
      <td>Clarifies ownership and dependencies.</td>
    </tr>
    <tr>
      <td>Connections</td>
      <td>How parts exchange signals, material, or decisions.</td>
      <td>Shows coupling, delay, and fragility.</td>
    </tr>
    <tr>
      <td>Boundary</td>
      <td>What the system takes in and pushes out.</td>
      <td>Defines scope, responsibility, and risk.</td>
    </tr>
    <tr>
      <td>Feedback</td>
      <td>Signals that change behavior over time.</td>
      <td>Explains adaptation or drift.</td>
    </tr>
    <tr>
      <td>Purpose</td>
      <td>The outcome the system optimizes for.</td>
      <td>Makes tradeoffs and incentives legible.</td>
    </tr>
  </tbody>
</table>

Key characteristics show up everywhere:

- **Emerges**: the whole behaves differently than the parts.
- **Adapts**: feedback changes the system over time.
- **Trades off**: every optimization hides a cost.

### Boundaries, interfaces, constraints

Boundaries are the system’s edges. Interfaces are how those edges interact. Constraints are the limits that keep the system safe or possible.

- **Boundary** answers: what is inside and what is outside?
- **Interface** answers: how do inputs and outputs flow?
- **Constraint** answers: what cannot change without breaking the system?

Good interfaces expose the right degrees of freedom and hide the rest. When interfaces leak, systems become brittle. When constraints are ignored, systems drift.

### Failure modes and resilience

Systems fail in repeatable patterns. This table is the minimal checklist for diagnosing drift early and designing for recovery.

<table class="comparison-table">
  <thead>
    <tr>
      <th>Failure mode</th>
      <th>Early signal</th>
      <th>Design response</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Drift</td>
      <td>Metrics improve while outcomes worsen</td>
      <td>Recalibrate incentives and refresh assumptions</td>
    </tr>
    <tr>
      <td>Goodhart's Law</td>
      <td>Teams optimize the proxy, not the goal</td>
      <td>Add qualitative checks and multi-metric balance</td>
    </tr>
    <tr>
      <td>Variety mismatch</td>
      <td>Edge cases dominate incident load</td>
      <td>Increase system flexibility or human oversight</td>
    </tr>
  </tbody>
</table>

<aside class="callout callout-insight">
  <p><strong>Resilience.</strong> A resilient system can sense, respond, and learn. That means observability, incident response, and clear human escalation paths are part of the system—not optional tooling.</p>
</aside>

#### Open, closed, and isolated

Systems are also described by how they interact with their environment:

<table class="comparison-table">
  <thead>
    <tr>
      <th>System type</th>
      <th>Interaction</th>
      <th>Why it matters</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Open</td>
      <td>Exchanges energy or information with the outside world.</td>
      <td>Most real systems are open; feedback is essential.</td>
    </tr>
    <tr>
      <td>Closed</td>
      <td>Bounded and self-contained in theory.</td>
      <td>Useful for modeling, rare in practice.</td>
    </tr>
    <tr>
      <td>Isolated</td>
      <td>Fully cut off from the environment.</td>
      <td>Mostly conceptual; systems drift without feedback.</td>
    </tr>
  </tbody>
</table>

### Systems as the backbone of history

Human history is a sequence of system upgrades:

- **Physical coordination**: irrigation, roads, calendars.
- **Symbolic systems**: alphabets, accounting, maps.
- **Communication infrastructure**: printing, telegraphy, networks.
- **Computational systems**: programmable logic, software, automation.
- **Socio-technical systems**: humans and machines operating as one loop.

Shannon formalized information as a measurable signal, and Wiener formalized feedback and control, making adaptation explicit rather than accidental ([Shannon, 1948](https://ieeexplore.ieee.org/document/6773024); [Wiener, 1948](https://monoskop.org/images/5/5e/Wiener_Norbert_Cybernetics_Or_Control_and_Communication_in_the_Animal_and_the_Machine_1948.pdf)). These are milestones in how systems learn.

<figure class="diagram">
  <svg viewBox="0 0 900 200" role="img" aria-labelledby="ipo-title ipo-desc" style="width: 100%; height: auto; display: block;">
    <title id="ipo-title">Input, process, output flow with feedback</title>
    <desc id="ipo-desc">Three boxes show input, process, and output with an arrowed feedback loop back to process.</desc>
    <rect x="20" y="60" width="200" height="80" rx="12" fill="none" stroke="currentColor" stroke-width="2" />
    <rect x="350" y="40" width="200" height="120" rx="12" fill="none" stroke="currentColor" stroke-width="2" />
    <rect x="680" y="60" width="200" height="80" rx="12" fill="none" stroke="currentColor" stroke-width="2" />
    <text x="70" y="108" font-size="16" fill="currentColor" font-family="var(--font-mono)">Input</text>
    <text x="420" y="108" font-size="16" fill="currentColor" font-family="var(--font-mono)">Process</text>
    <text x="730" y="108" font-size="16" fill="currentColor" font-family="var(--font-mono)">Output</text>
    <path d="M 220 100 H 340" stroke="currentColor" stroke-width="2" />
    <path d="M 550 100 H 670" stroke="currentColor" stroke-width="2" />
    <path d="M 330 100 L 340 95 L 340 105 Z" fill="currentColor" />
    <path d="M 660 100 L 670 95 L 670 105 Z" fill="currentColor" />
    <path d="M 550 140 C 600 170, 300 170, 350 140" stroke="var(--color-accent)" stroke-width="2" fill="none" />
    <text x="380" y="178" font-size="12" fill="var(--color-accent)" font-family="var(--font-mono)">feedback</text>
  </svg>
  <figcaption>The input-process-output model remains the simplest useful abstraction, especially when feedback is explicit.</figcaption>
</figure>

### Systems everywhere with scale

Systems become clearer when you attach scale:

<table class="comparison-table">
  <thead>
    <tr>
      <th>System</th>
      <th>Scale signal</th>
      <th>What it implies</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Biological</td>
      <td>~2,000 gallons of blood per day in one human heart.</td>
      <td>Throughput is massive; small errors compound fast.</td>
    </tr>
    <tr>
      <td>Digital</td>
      <td>5.4B people connected via the internet.</td>
      <td>Latency, policy, and trust become system constraints.</td>
    </tr>
  </tbody>
</table>

Sources: [American Heart Association](https://www.heart.org/en/health-topics/consumer-healthcare/what-is-cardiovascular-disease), [ITU Facts and Figures 2023](https://www.itu.int/itu-d/reports/statistics/facts-figures-2023/).

## Act II: The modern paradigm

### The socio-technical merge

The old divide between "people" and "software" has evolved into a <span class="highlight">unified socio-technical system</span>: human intent, organizational culture, and machine execution are interdependent ([Trist & Bamforth, 1951](https://journals.sagepub.com/doi/10.1177/001872675100400101)).

This matters because technical work is no longer just code. It is the behavior of a composite system where algorithms, teams, and governance are part of one operating loop.

<figure class="diagram">
  <svg viewBox="0 0 900 240" role="img" aria-labelledby="layers-title layers-desc" style="width: 100%; height: auto; display: block;">
    <title id="layers-title">Socio-technical layers</title>
    <desc id="layers-desc">Three stacked layers labeled machine, human, and interconnectivity with accent lines.</desc>
    <rect x="40" y="30" width="820" height="60" rx="12" fill="none" stroke="currentColor" stroke-width="2" />
    <rect x="40" y="90" width="820" height="60" rx="12" fill="none" stroke="currentColor" stroke-width="2" />
    <rect x="40" y="150" width="820" height="60" rx="12" fill="none" stroke="currentColor" stroke-width="2" />
    <text x="70" y="68" font-size="14" fill="currentColor" font-family="var(--font-mono)">Machine layer: deterministic + agentic</text>
    <text x="70" y="128" font-size="14" fill="currentColor" font-family="var(--font-mono)">Human layer: strategic + ethical</text>
    <text x="70" y="188" font-size="14" fill="currentColor" font-family="var(--font-mono)">Interconnectivity: socio-technical feedback</text>
    <path d="M 770 60 L 830 60" stroke="var(--color-accent)" stroke-width="2" />
    <path d="M 770 120 L 830 120" stroke="var(--color-accent)" stroke-width="2" />
    <path d="M 770 180 L 830 180" stroke="var(--color-accent)" stroke-width="2" />
  </svg>
  <figcaption>The system is layered, but the behavior is unified.</figcaption>
</figure>

#### Level 1: the machine layer (deterministic and agentic)

This layer covers how the system perceives and acts. Modern systems add decision-centric behavior: simulate outcomes, score tradeoffs, and recommend actions ([Process Mining Manifesto](https://www.win.tue.nl/ieeetfpm/downloads/Process_Mining_Manifesto.pdf)).

Document how the system captures context:

- **Semantic context**: what the data means, not just how it is formatted ([W3C RDF](https://www.w3.org/RDF/), [W3C OWL](https://www.w3.org/OWL/)).
- **Temporal context**: when the data is valid, captured, and acted upon ([W3C Time Ontology](https://www.w3.org/TR/owl-time/)).
- **Active metadata**: metadata that changes as systems learn and humans intervene ([W3C PROV](https://www.w3.org/TR/prov-overview/)).

Agentic behavior raises the bar: specify what the system can do, what it cannot do, and how it signals uncertainty.

#### Level 2: the human layer (strategic and ethical)

This layer defines who is accountable and when human judgment is required.

- **Human-in-the-loop (HITL)**: humans are part of the decision process, approving or rejecting system outputs.
- **Human-on-the-loop (HOTL)**: humans supervise the system and step in during anomalies or edge cases.
- **Human-out-of-the-loop (HOOTL)**: systems act autonomously after initial parameters are defined.

These are operational constraints. High-risk systems now require explicit human oversight ([EU AI Act, 2024](https://eur-lex.europa.eu/eli/reg/2024/1689/oj); [NIST AI RMF 1.0](https://www.nist.gov/itl/ai-risk-management-framework)).

In documentation, make the decision boundary explicit: where the system stops and a person decides.

#### Level 3: interconnectivity (socio-technical)

Here, social and technical layers fuse into one behavior. Teams shape the system; the system shapes teams.

Two patterns dominate:

1) **Governance as code**: policy becomes enforceable rules ([OPA Documentation](https://www.openpolicyagent.org/docs/latest/)).
2) **Digital twins and simulation**: test decisions before committing resources ([Shafto et al., 2012](https://ntrs.nasa.gov/citations/20120008178)).

<figure class="diagram">
  <svg viewBox="0 0 900 260" role="img" aria-labelledby="gov-title gov-desc" style="width: 100%; height: auto; display: block;">
    <title id="gov-title">Governance as code pipeline</title>
    <desc id="gov-desc">Policy, rules, enforcement, and audit flow with a feedback loop back to policy.</desc>
    <rect x="40" y="50" width="170" height="60" rx="10" fill="none" stroke="currentColor" stroke-width="2" />
    <rect x="260" y="50" width="170" height="60" rx="10" fill="none" stroke="currentColor" stroke-width="2" />
    <rect x="480" y="50" width="170" height="60" rx="10" fill="none" stroke="currentColor" stroke-width="2" />
    <rect x="700" y="50" width="170" height="60" rx="10" fill="none" stroke="currentColor" stroke-width="2" />
    <text x="70" y="88" font-size="13" fill="currentColor" font-family="var(--font-mono)">Policy</text>
    <text x="292" y="88" font-size="13" fill="currentColor" font-family="var(--font-mono)">Rules</text>
    <text x="510" y="88" font-size="13" fill="currentColor" font-family="var(--font-mono)">Enforce</text>
    <text x="730" y="88" font-size="13" fill="currentColor" font-family="var(--font-mono)">Audit</text>
    <path d="M 210 80 H 250" stroke="currentColor" stroke-width="2" />
    <path d="M 430 80 H 470" stroke="currentColor" stroke-width="2" />
    <path d="M 650 80 H 690" stroke="currentColor" stroke-width="2" />
    <path d="M 242 80 L 250 75 L 250 85 Z" fill="currentColor" />
    <path d="M 462 80 L 470 75 L 470 85 Z" fill="currentColor" />
    <path d="M 682 80 L 690 75 L 690 85 Z" fill="currentColor" />
    <path d="M 760 130 C 620 190, 280 190, 140 130" stroke="var(--color-accent)" stroke-width="2" fill="none" />
    <text x="380" y="210" font-size="12" fill="var(--color-accent)" font-family="var(--font-mono)">feedback to policy</text>
  </svg>
  <figcaption>Governance as code turns ethics into enforceable system behavior.</figcaption>
</figure>

## Act III: Principles in practice

### Systems thinking in business strategy

Organizations are systems. Applied well, systems thinking helps leaders:

- **Find root causes** instead of treating symptoms.
- **Map feedback loops** that amplify or dampen outcomes.
- **Identify bottlenecks** that limit throughput or quality.
- **Design for emergence**, creating conditions for culture and trust to grow.
 
The difference is perspective: linear optimizes locally; systems optimize the whole.

### Documentation as system design

Documentation is part of the system: it shapes how the system is built, understood, and governed.

Here is what changes in modern technical writing:

1) **Describe intent, not just implementation.** The system must be able to explain itself.
2) **Capture context.** Document semantic, temporal, and provenance context so system outputs can be trusted across time.
3) **Model human oversight.** State when humans must intervene and how decisions are escalated.
4) **Encode policy.** Show how governance is enforced in code and audited in practice.
5) **Simulate the future.** Include model limitations, simulation assumptions, and expected failure modes.

<figure class="diagram">
  <svg viewBox="0 0 900 240" role="img" aria-labelledby="twin-title twin-desc" style="width: 100%; height: auto; display: block;">
    <title id="twin-title">Digital twin loop</title>
    <desc id="twin-desc">Simulate, decide, and deploy steps with a feedback loop labeled learn.</desc>
    <circle cx="180" cy="120" r="50" fill="none" stroke="currentColor" stroke-width="2" />
    <circle cx="420" cy="120" r="50" fill="none" stroke="currentColor" stroke-width="2" />
    <circle cx="660" cy="120" r="50" fill="none" stroke="currentColor" stroke-width="2" />
    <text x="150" y="125" font-size="12" fill="currentColor" font-family="var(--font-mono)">Simulate</text>
    <text x="395" y="125" font-size="12" fill="currentColor" font-family="var(--font-mono)">Decide</text>
    <text x="635" y="125" font-size="12" fill="currentColor" font-family="var(--font-mono)">Deploy</text>
    <path d="M 230 120 H 370" stroke="currentColor" stroke-width="2" />
    <path d="M 470 120 H 610" stroke="currentColor" stroke-width="2" />
    <path d="M 660 170 C 520 210, 320 210, 180 170" stroke="var(--color-accent)" stroke-width="2" fill="none" />
    <text x="360" y="220" font-size="12" fill="var(--color-accent)" font-family="var(--font-mono)">learn</text>
  </svg>
  <figcaption>Digital twins turn decisions into reversible experiments.</figcaption>
</figure>

<aside class="callout callout-insight">
  <p><strong>Insight.</strong> A system that cannot explain itself cannot be governed. Documentation is not a byproduct; it is the interface between a system and its human layer.</p>
</aside>

### Systems as compression

Every system compresses complexity into rules. Compression makes communication scalable, but it trades nuance for speed. Good systems manage that tradeoff; bad systems distort reality.

Compression is also a value choice: schemas, metrics, and routing rules decide what counts.

### Systems as feedback

Feedback is the evolutionary engine. Without it, a system is a black box; with it, a system becomes governable. In socio-technical systems, feedback is both technical and social: people interpret signals and change behavior.

<figure class="diagram chart">
  <svg viewBox="0 0 760 220" role="img" aria-labelledby="feedback-chart-title feedback-chart-desc" style="width: 100%; height: auto; display: block;">
    <title id="feedback-chart-title">Fast vs delayed feedback</title>
    <desc id="feedback-chart-desc">Two lines show system output stabilizing quickly with fast feedback and oscillating with delayed feedback.</desc>
    <line x1="40" y1="20" x2="40" y2="190" stroke="currentColor" stroke-width="2" />
    <line x1="40" y1="190" x2="720" y2="190" stroke="currentColor" stroke-width="2" />
    <path d="M 40 150 C 120 80, 200 120, 280 110 C 360 105, 440 108, 520 110 C 600 112, 660 112, 720 112" stroke="var(--color-accent)" stroke-width="3" fill="none" />
    <path d="M 40 120 C 120 40, 200 200, 280 60 C 360 180, 440 70, 520 160 C 600 80, 660 140, 720 110" stroke="currentColor" stroke-width="2" fill="none" opacity="0.7" />
    <text x="50" y="40" font-size="12" fill="currentColor" font-family="var(--font-mono)">output</text>
    <text x="650" y="210" font-size="12" fill="currentColor" font-family="var(--font-mono)">time</text>
    <text x="520" y="90" font-size="12" fill="var(--color-accent)" font-family="var(--font-mono)">fast feedback</text>
    <text x="480" y="155" font-size="12" fill="currentColor" font-family="var(--font-mono)">delayed feedback</text>
  </svg>
  <figcaption>Fast feedback damps oscillation; delayed feedback amplifies instability.</figcaption>
</figure>

### Examples by domain

<table class="comparison-table">
  <thead>
    <tr>
      <th>Domain</th>
      <th>Example</th>
      <th>What it reveals</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Biological</td>
      <td>Digestive + nervous systems</td>
      <td>Feedback and interdependence create stability.</td>
    </tr>
    <tr>
      <td>Technological</td>
      <td>Computer + network stacks</td>
      <td>Abstraction enables scale and reliability.</td>
    </tr>
    <tr>
      <td>Social</td>
      <td>Legal + transportation systems</td>
      <td>Rules encode tradeoffs and values.</td>
    </tr>
    <tr>
      <td>Abstract</td>
      <td>Decimal system + taxonomy</td>
      <td>Categories reduce ambiguity and coordinate meaning.</td>
    </tr>
  </tbody>
</table>

### The system is the message

When execution and decision-making converge, systems shape reality. The system that filters information filters the future. The system that encodes policy decides what is possible.

So the goal is not just working systems, but systems that are understandable, governable, and adaptable.

### Putting systems thinking into practice

Use these prompts to audit any system you touch:

<table class="comparison-table">
  <thead>
    <tr>
      <th>Question</th>
      <th>What to look for</th>
      <th>Design response</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Where are the boundaries?</td>
      <td>Inputs/outputs without owners, leaky interfaces, silent dependencies.</td>
      <td>Define interfaces, assign ownership, document what stays outside.</td>
    </tr>
    <tr>
      <td>What are the feedback loops?</td>
      <td>Delayed signals, missing instrumentation, manual backchannels.</td>
      <td>Shorten loops, add observability, make signals visible.</td>
    </tr>
    <tr>
      <td>Where does human intent enter?</td>
      <td>Ambiguous handoffs or decisions made by default.</td>
      <td>Mark decision boundaries, add approval gates where needed.</td>
    </tr>
    <tr>
      <td>Which metric is optimized?</td>
      <td>Proxy metrics driving behavior instead of outcomes.</td>
      <td>Balance with counter-metrics and qualitative checks.</td>
    </tr>
    <tr>
      <td>Where is variety mismatch?</td>
      <td>Edge cases dominate incidents or escalations.</td>
      <td>Add flexibility, escalation paths, or human oversight.</td>
    </tr>
  </tbody>
</table>

### Conclusion

Systems thinking is the skill of making complexity usable. The more interconnected the world becomes, the more essential it is.

---

## References

<div class="references">
  <ol class="references-list">
    <li>
      <span class="ref-title">Ludwig von Bertalanffy, <em>General System Theory</em> (1968).</span>
      <a class="ref-link" href="https://monoskop.org/images/5/5b/Von_Bertalanffy_Ludwig_General_System_Theory_1968.pdf"><span class="sr-only">Open reference link</span><svg class="ref-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 3h7v7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 14L21 3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
    </li>
    <li>
      <span class="ref-title">Donella Meadows, <em>Thinking in Systems</em> (2008).</span>
      <a class="ref-link" href="https://donellameadows.org/archives/a-summary-of-donella-meadows-thinking-in-systems/"><span class="sr-only">Open reference link</span><svg class="ref-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 3h7v7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 14L21 3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
    </li>
    <li>
      <span class="ref-title">Claude Shannon, <em>A Mathematical Theory of Communication</em> (1948).</span>
      <a class="ref-link" href="https://ieeexplore.ieee.org/document/6773024"><span class="sr-only">Open reference link</span><svg class="ref-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 3h7v7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 14L21 3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
    </li>
    <li>
      <span class="ref-title">Charles Goodhart, <em>Monetary Theory and Practice: The UK Experience</em> (1975).</span>
      <a class="ref-link" href="https://www.bankofengland.co.uk/-/media/boe/files/quarterly-bulletin/1975/monetary-theory-and-practice-the-uk-experience.pdf"><span class="sr-only">Open reference link</span><svg class="ref-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 3h7v7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 14L21 3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
    </li>
    <li>
      <span class="ref-title">W. Ross Ashby, <em>An Introduction to Cybernetics</em> (1956).</span>
      <a class="ref-link" href="http://pespmc1.vub.ac.be/books/ashby.pdf"><span class="sr-only">Open reference link</span><svg class="ref-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 3h7v7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 14L21 3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
    </li>
    <li>
      <span class="ref-title">Trist &amp; Bamforth, <em>Socio-technical systems</em> (1951).</span>
      <a class="ref-link" href="https://journals.sagepub.com/doi/10.1177/001872675100400101"><span class="sr-only">Open reference link</span><svg class="ref-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 3h7v7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 14L21 3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
    </li>
    <li>
      <span class="ref-title">Process Mining Manifesto (2011).</span>
      <a class="ref-link" href="https://www.win.tue.nl/ieeetfpm/downloads/Process_Mining_Manifesto.pdf"><span class="sr-only">Open reference link</span><svg class="ref-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 3h7v7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 14L21 3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
    </li>
    <li>
      <span class="ref-title">W3C RDF / OWL.</span>
      <a class="ref-link" href="https://www.w3.org/RDF/"><span class="sr-only">Open reference link</span><svg class="ref-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 3h7v7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 14L21 3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
      <a class="ref-link" href="https://www.w3.org/OWL/"><span class="sr-only">Open reference link</span><svg class="ref-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 3h7v7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 14L21 3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
    </li>
    <li>
      <span class="ref-title">W3C Time Ontology in OWL.</span>
      <a class="ref-link" href="https://www.w3.org/TR/owl-time/"><span class="sr-only">Open reference link</span><svg class="ref-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 3h7v7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 14L21 3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
    </li>
    <li>
      <span class="ref-title">W3C PROV.</span>
      <a class="ref-link" href="https://www.w3.org/TR/prov-overview/"><span class="sr-only">Open reference link</span><svg class="ref-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 3h7v7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 14L21 3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
    </li>
    <li>
      <span class="ref-title">NIST AI Risk Management Framework 1.0 (2023).</span>
      <a class="ref-link" href="https://www.nist.gov/itl/ai-risk-management-framework"><span class="sr-only">Open reference link</span><svg class="ref-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 3h7v7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 14L21 3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
    </li>
    <li>
      <span class="ref-title">EU AI Act (2024).</span>
      <a class="ref-link" href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj"><span class="sr-only">Open reference link</span><svg class="ref-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 3h7v7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 14L21 3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
    </li>
    <li>
      <span class="ref-title">Open Policy Agent Documentation.</span>
      <a class="ref-link" href="https://www.openpolicyagent.org/docs/latest/"><span class="sr-only">Open reference link</span><svg class="ref-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 3h7v7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 14L21 3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
    </li>
    <li>
      <span class="ref-title">NASA Digital Twin Report (2012).</span>
      <a class="ref-link" href="https://ntrs.nasa.gov/citations/20120008178"><span class="sr-only">Open reference link</span><svg class="ref-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 3h7v7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 14L21 3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
    </li>
    <li>
      <span class="ref-title">American Heart Association: Heart pumping volume.</span>
      <a class="ref-link" href="https://www.heart.org/en/health-topics/consumer-healthcare/what-is-cardiovascular-disease"><span class="sr-only">Open reference link</span><svg class="ref-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 3h7v7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 14L21 3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
    </li>
    <li>
      <span class="ref-title">ITU Facts and Figures 2023.</span>
      <a class="ref-link" href="https://www.itu.int/itu-d/reports/statistics/facts-figures-2023/"><span class="sr-only">Open reference link</span><svg class="ref-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 3h7v7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 14L21 3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
    </li>
  </ol>
</div>

<!-- Adding style for marker effect -->
<style>
  .highlight {
    background: linear-gradient(180deg, transparent 65%, color-mix(in srgb, var(--color-accent) 40%, transparent) 0);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
</style>
