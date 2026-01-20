export const portfolioSamples = [
  {
    slug: 'ai-platform-onboarding-guide',
    title: 'AI Platform Onboarding Guide',
    summary:
      'A production-minded onboarding path for an enterprise AI platform used by product and ML teams.',
    cardDescription: 'A 14-day path from first login to production with safer defaults.',
    category: 'enablement',
    tags: ['Onboarding', 'Safety', 'DevDocs'],
    accent: '#3b82f6',
    meta: [
      { label: 'Doc type', value: 'Onboarding guide + quickstart' },
      { label: 'Primary users', value: 'App developers, ML engineers' },
      { label: 'Success metric', value: 'First production deploy in 14 days' },
      { label: 'Artifacts', value: 'Checklist, examples, runbook links' },
    ],
    sections: [
      {
        title: 'Overview',
        body: `
          <p>This guide models how an enterprise AI platform onboards teams: discovery, safety alignment, and production readiness. It is written like a real internal doc, with anonymized product names and policies.</p>
          <p><span class="highlight">Core goal:</span> move from first login to a safe production deploy without guesswork.</p>
        `,
      },
      {
        title: 'Who this is for',
        body: `
          <ul>
            <li>Product engineers integrating AI into customer-facing flows.</li>
            <li>ML teams shipping model-backed features with compliance constraints.</li>
            <li>Program managers coordinating access, approvals, and rollout.</li>
          </ul>
        `,
      },
      {
        title: 'Day-0 setup',
        body: `
          <ol>
            <li>Request workspace access and confirm model tier.</li>
            <li>Enable data redaction and set org-wide safety defaults.</li>
            <li>Configure logging, cost alerts, and incident routing.</li>
          </ol>
        `,
      },
      {
        title: 'First safe deployment',
        body: `
          <ol>
            <li>Run a sandbox prompt with test data only.</li>
            <li>Validate outputs against the safe usage checklist.</li>
            <li>Deploy to staging with 5 percent traffic and monitoring.</li>
            <li>Request production approval using the checklist below.</li>
          </ol>
        `,
      },
      {
        title: 'Production readiness checklist',
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Safety</strong>
              <p>Prompt filters enabled, data types approved, and redaction rules confirmed.</p>
            </div>
            <div class="card">
              <strong>Reliability</strong>
              <p>Fallback model configured with clear degradation behavior.</p>
            </div>
            <div class="card">
              <strong>Monitoring</strong>
              <p>Latency, cost, and escalation alerts configured.</p>
            </div>
          </div>
        `,
      },
      {
        title: 'Launch notes template',
        body: `
          <ul>
            <li>What changed and why it matters.</li>
            <li>Known limitations and edge cases.</li>
            <li>Owner and rollback decision path.</li>
          </ul>
        `,
      },
    ],
    authorNote:
      'Enterprise onboarding succeeds when it answers real questions in sequence. I treat the doc as a decision map, not a feature list.',
  },
  {
    slug: 'safe-usage-limits-playbook',
    title: 'Safe Usage & Limits Playbook',
    summary:
      'A policy-forward playbook that translates model limitations into everyday developer behavior.',
    cardDescription:
      'Translating legal and safety guardrails into actionable developer constraints.',
    category: 'policy',
    tags: ['Risk', 'Policy', 'Governance'],
    accent: '#10b981',
    meta: [
      { label: 'Doc type', value: 'Safety playbook + internal policy' },
      { label: 'Primary users', value: 'Product owners, legal, support' },
      { label: 'Success metric', value: 'Reduction in unsafe prompts' },
      { label: 'Artifacts', value: 'Risk matrix, escalation guide' },
    ],
    sections: [
      {
        title: 'Purpose and scope',
        body: `
          <p>This playbook defines safe usage for a regulated enterprise environment. It is written to be enforced consistently across teams, not interpreted differently by each group.</p>
          <p><span class="highlight">Principle:</span> every limitation should provide a safe alternative path.</p>
        `,
      },
      {
        title: 'Allowed vs restricted use',
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Allowed</strong>
              <p>Summaries, formatting, and internal workflows with approved data.</p>
            </div>
            <div class="card">
              <strong>Restricted</strong>
              <p>Medical, legal, or financial guidance without human review.</p>
            </div>
            <div class="card">
              <strong>Prohibited</strong>
              <p>PII extraction, surveillance use cases, or sensitive profiling.</p>
            </div>
          </div>
        `,
      },
      {
        title: 'Prompt safety checklist',
        body: `
          <ol>
            <li>Verify data classification and allowed sources.</li>
            <li>Declare output expectations and confidence language.</li>
            <li>Add refusal behavior for restricted questions.</li>
            <li>Log the prompt and owner in the review registry.</li>
          </ol>
        `,
      },
      {
        title: 'Escalation workflow',
        body: `
          <ol>
            <li>Flag the use case and potential risk level.</li>
            <li>Route to legal and policy review within 48 hours.</li>
            <li>Document the decision and mitigation steps.</li>
            <li>Publish the approved pattern to the shared library.</li>
          </ol>
        `,
      },
      {
        title: 'Governance cadence',
        body: `
          <ul>
            <li>Monthly prompt review and update.</li>
            <li>Quarterly model risk assessment.</li>
            <li>Annual audit of policy adherence and exceptions.</li>
          </ul>
        `,
      },
    ],
    authorNote:
      'Policy docs fail when they are abstract. I make limits actionable, with clear alternatives and ownership.',
  },
  {
    slug: 'api-quickstart-sdk-guide',
    title: 'API Quickstart + SDK Guide',
    summary: 'A developer-first guide that gets to a working integration fast.',
    cardDescription:
      'Code-forward documentation focused on rapid integration and error handling.',
    category: 'technical',
    tags: ['API', 'SDK', 'DevRel'],
    accent: '#8b5cf6',
    meta: [
      { label: 'Doc type', value: 'API quickstart + SDK guide' },
      { label: 'Primary users', value: 'Backend and platform engineers' },
      { label: 'Success metric', value: 'First API call in 30 minutes' },
      { label: 'Artifacts', value: 'Code samples, error playbook' },
    ],
    sections: [
      {
        title: 'Overview',
        body: `
          <p>This quickstart mirrors how enterprise teams integrate AI into existing services. The first flow is intentionally narrow, then expands to production patterns.</p>
          <p><span class="highlight">Design choice:</span> safe defaults first, advanced options second.</p>
        `,
      },
      {
        title: 'Prerequisites',
        body: `
          <ul>
            <li>API key with model access tier.</li>
            <li>Service account approved for production workloads.</li>
            <li>Logging destination configured for request traces.</li>
          </ul>
        `,
      },
      {
        title: 'Quickstart steps',
        body: `
          <ol>
            <li>Install the SDK and store the API key securely.</li>
            <li>Send a sample request using safe constraints.</li>
            <li>Enable retries and timeouts.</li>
            <li>Move to staging with test traffic.</li>
          </ol>
        `,
      },
      {
        title: 'Example request',
        body: `
          <pre><code>import atlas from '@atlas/sdk';

const client = atlas({ apiKey: process.env.ATLAS_KEY });

const response = await client.generate({
  model: 'atlas-sage-2',
  input: 'Draft a customer email with three options.',
  constraints: { no_pii: true }
});
</code></pre>
        `,
      },
      {
        title: 'Errors and retries',
        body: `
          <ul>
            <li>429: back off and retry with exponential delay.</li>
            <li>5xx: fail over to the fallback model.</li>
            <li>Policy rejection: log the prompt and notify the owner.</li>
          </ul>
        `,
      },
      {
        title: 'SDK configuration checklist',
        body: `
          <ul>
            <li>Timeouts set for each request type.</li>
            <li>Audit logs enabled for production calls.</li>
            <li>Model version pinned for critical flows.</li>
          </ul>
        `,
      },
    ],
    authorNote:
      'A quickstart should prove the integration is real and safe. I build the first flow to be copy-pasteable and correct.',
  },
  {
    slug: 'llmops-runbook-incident-rollback',
    title: 'LLMOps Runbook (Incident + Rollback)',
    summary: 'A live-ops runbook for incidents, rollback, and postmortem review.',
    cardDescription:
      'Standard operating procedures for incidents, model drift, and automated rollback.',
    category: 'technical',
    tags: ['Ops', 'Reliability', 'SRE'],
    accent: '#ef4444',
    meta: [
      { label: 'Doc type', value: 'Runbook + incident response' },
      { label: 'Primary users', value: 'Platform ops, SRE, ML engineers' },
      { label: 'Success metric', value: 'Safe rollback in under 30 minutes' },
      { label: 'Artifacts', value: 'Incident checklist, alerts map' },
    ],
    sections: [
      {
        title: 'Trigger conditions',
        body: `
          <ul>
            <li>Latency exceeds 2x baseline for 5 minutes.</li>
            <li>Guardrail failure rate over 1 percent.</li>
            <li>Cost anomalies above daily budget threshold.</li>
          </ul>
        `,
      },
      {
        title: 'Triage steps',
        body: `
          <ol>
            <li>Confirm affected model and user impact.</li>
            <li>Snapshot logs and request traces.</li>
            <li>Switch to safe fallback model.</li>
            <li>Notify support and stakeholder channels.</li>
          </ol>
        `,
      },
      {
        title: 'Rollback procedure',
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Trigger</strong>
              <p>Guardrail failure or breach of policy threshold.</p>
            </div>
            <div class="card">
              <strong>Action</strong>
              <p>Shift traffic to last known stable model version.</p>
            </div>
            <div class="card">
              <strong>Verify</strong>
              <p>Run smoke tests and confirm error rate recovery.</p>
            </div>
          </div>
        `,
      },
      {
        title: 'Post-incident report',
        body: `
          <ul>
            <li>Root cause and contributing signals.</li>
            <li>User impact summary with timelines.</li>
            <li>Remediation plan and owner assignments.</li>
          </ul>
        `,
      },
      {
        title: 'Preventive actions',
        body: `
          <ul>
            <li>Weekly drift review for high-impact intents.</li>
            <li>Guardrail regression tests for each model update.</li>
            <li>Ops owner rotation with escalation playbook.</li>
          </ul>
        `,
      },
    ],
    authorNote:
      'Runbooks succeed when they lower stress. I keep steps short, decision-driven, and tied to signals.',
  },
  {
    slug: 'internal-ai-adoption-kit',
    title: 'Internal AI Adoption Kit (FAQ + training)',
    summary: 'FAQ and training materials to support safe internal adoption.',
    cardDescription:
      'Equipping teams with the mental models needed to use GenAI safely and well.',
    category: 'enablement',
    tags: ['Training', 'Change', 'FAQ'],
    accent: '#f59e0b',
    meta: [
      { label: 'Doc type', value: 'FAQ + training kit' },
      { label: 'Primary users', value: 'Enterprise teams, HR, enablement' },
      { label: 'Success metric', value: 'Adoption across 3 departments' },
      { label: 'Artifacts', value: 'FAQ, workshop agenda' },
    ],
    sections: [
      {
        title: 'Rollout goals',
        body: `
          <ul>
            <li>Build confidence through clear boundaries.</li>
            <li>Provide safe templates for common tasks.</li>
            <li>Reduce fear with hands-on support.</li>
          </ul>
        `,
      },
      {
        title: 'Training agenda',
        body: `
          <ol>
            <li>30-minute orientation: what AI can and cannot do.</li>
            <li>Hands-on lab with approved workflows.</li>
            <li>Team prompt clinic and feedback loop.</li>
          </ol>
        `,
      },
      {
        title: 'FAQ highlights',
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Will AI replace my role?</strong>
              <p>No. The goal is to remove repetitive work and free time for judgment.</p>
            </div>
            <div class="card">
              <strong>Can I use customer data?</strong>
              <p>Only approved datasets with redaction enabled.</p>
            </div>
            <div class="card">
              <strong>Who reviews prompts?</strong>
              <p>Each team has a designated prompt owner.</p>
            </div>
          </div>
        `,
      },
      {
        title: 'Adoption support',
        body: `
          <ul>
            <li>Weekly office hours with SMEs.</li>
            <li>Monthly prompt review sessions.</li>
            <li>Internal showcase of approved use cases.</li>
          </ul>
        `,
      },
      {
        title: 'Success indicators',
        body: `
          <ul>
            <li>Usage growth across three departments.</li>
            <li>Reduced escalation volume over 30 days.</li>
            <li>Positive survey sentiment from training cohorts.</li>
          </ul>
        `,
      },
    ],
    authorNote:
      'Adoption is a change problem, not a feature problem. I build kits that turn curiosity into responsible use.',
  },
  {
    slug: 'change-communication-brief',
    title: 'Change Communication Brief (exec + ICs)',
    summary: 'A communication brief for leaders and employees during AI rollout.',
    cardDescription:
      'Messaging architecture and talk tracks for leaders and employees.',
    category: 'enablement',
    tags: ['Comms', 'Exec', 'Enablement'],
    accent: '#3b82f6',
    meta: [
      { label: 'Doc type', value: 'Change comms brief' },
      { label: 'Primary users', value: 'Executives, internal comms' },
      { label: 'Success metric', value: 'Aligned message adoption' },
      { label: 'Artifacts', value: 'Talk track, FAQ, email draft' },
    ],
    sections: [
      {
        title: 'Message architecture',
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Why</strong>
              <p>AI reduces friction and increases quality for teams.</p>
            </div>
            <div class="card">
              <strong>What</strong>
              <p>New tools, safe usage standards, and training support.</p>
            </div>
            <div class="card">
              <strong>How</strong>
              <p>Phased rollout with clear boundaries and escalation paths.</p>
            </div>
          </div>
        `,
      },
      {
        title: 'Executive statement',
        body: `
          <p><strong>Short message:</strong> We are adopting AI to remove friction, not to replace people. Every team will receive support, training, and clear boundaries for safe usage.</p>
          <p><strong>Proof points:</strong> faster response time, improved quality checks, clearer documentation.</p>
        `,
      },
      {
        title: 'Employee talk track',
        body: `
          <ol>
            <li>AI is an assistant, not a decision-maker.</li>
            <li>Safe usage is built into the tools you already use.</li>
            <li>Every employee can opt into training and support.</li>
          </ol>
        `,
      },
      {
        title: 'Channel plan',
        body: `
          <ul>
            <li>Exec email announcement + FAQ link.</li>
            <li>Team lead briefings with slide deck.</li>
            <li>Follow-up Q and A sessions at 30 and 60 days.</li>
          </ul>
        `,
      },
      {
        title: 'Feedback loop',
        body: `
          <ul>
            <li>Anonymous survey at 2 weeks.</li>
            <li>Manager notes rolled into FAQ updates.</li>
            <li>Monthly sentiment summary to leadership.</li>
          </ul>
        `,
      },
    ],
    authorNote:
      'Clear internal messaging prevents rumor loops. I write for real questions, not abstract alignment statements.',
  },
  {
    slug: 'model-evaluation-report',
    title: 'Model Evaluation Report',
    summary: 'A structured evaluation report that blends metrics and narrative.',
    cardDescription:
      'A framework for benchmark analysis and qualitative findings to guide selection.',
    category: 'policy',
    tags: ['Metrics', 'Strategy', 'Evaluation'],
    accent: '#6366f1',
    meta: [
      { label: 'Doc type', value: 'Evaluation report' },
      { label: 'Primary users', value: 'ML leads, product, compliance' },
      { label: 'Success metric', value: 'Decision-ready comparison' },
      { label: 'Artifacts', value: 'Metric table, recommendations' },
    ],
    sections: [
      {
        title: 'Evaluation scope',
        body: `
          <p>This report compares two candidate models for a customer support workflow. It combines quantitative benchmarks with qualitative review of output quality.</p>
          <p><span class="highlight">Decision focus:</span> cost, latency, and risk profile.</p>
        `,
      },
      {
        title: 'Metrics snapshot',
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Model A</strong>
              <p>Accuracy 0.82, latency 750ms, cost $0.004 per call.</p>
            </div>
            <div class="card">
              <strong>Model B</strong>
              <p>Accuracy 0.87, latency 1100ms, cost $0.006 per call.</p>
            </div>
            <div class="card">
              <strong>Recommendation</strong>
              <p>Model A for production, Model B for research workflows.</p>
            </div>
          </div>
        `,
      },
      {
        title: 'Decision notes',
        body: `
          <p>We prioritize cost and latency because the use case is high-volume support. Accuracy gains do not offset the performance cost in this workflow.</p>
        `,
      },
      {
        title: 'Risk notes',
        body: `
          <ul>
            <li>Model B outperforms on long-tail questions but increases latency.</li>
            <li>Model A shows stable refusal behavior under policy stress tests.</li>
            <li>Both models require quarterly drift validation.</li>
          </ul>
        `,
      },
      {
        title: 'Next steps',
        body: `
          <ul>
            <li>Schedule a quarterly evaluation refresh.</li>
            <li>Track drift on high-risk intents.</li>
            <li>Document new constraints in the safety playbook.</li>
          </ul>
        `,
      },
    ],
    authorNote:
      'Evaluation reports should read like executive briefs. The reader needs a decision, not a data dump.',
  },
  {
    slug: 'prompt-safety-checklist',
    title: 'Prompt Safety Checklist',
    summary: 'A reusable checklist for prompt design and review.',
    cardDescription:
      'A reusable checklist for prompt design, review, and governance.',
    category: 'policy',
    tags: ['Prompts', 'Safety', 'Review'],
    accent: '#10b981',
    meta: [
      { label: 'Doc type', value: 'Checklist + governance' },
      { label: 'Primary users', value: 'Prompt designers, reviewers' },
      { label: 'Success metric', value: 'Consistent prompt reviews' },
      { label: 'Artifacts', value: 'Checklist, review log' },
    ],
    sections: [
      {
        title: 'When to use this',
        body: `
          <ul>
            <li>New prompt templates for production workflows.</li>
            <li>High-risk prompts involving customers or sensitive data.</li>
            <li>Cross-team prompt reuse.</li>
          </ul>
        `,
      },
      {
        title: 'Checklist',
        body: `
          <ol>
            <li>Does the prompt avoid PII or restricted data?</li>
            <li>Is the output expectation explicit and measurable?</li>
            <li>Are constraints listed as user-facing instructions?</li>
            <li>Is there a fallback for uncertainty or refusal?</li>
            <li>Has this prompt been reviewed and logged?</li>
          </ol>
        `,
      },
      {
        title: 'Review protocol',
        body: `
          <ul>
            <li>Assign an owner and reviewer for every prompt.</li>
            <li>Run tests with edge cases before approval.</li>
            <li>Log approval date and next review date.</li>
          </ul>
        `,
      },
      {
        title: 'Common red flags',
        body: `
          <ul>
            <li>Unbounded requests without constraints.</li>
            <li>Prompts that ask for sensitive data extraction.</li>
            <li>Outputs that appear authoritative without sources.</li>
          </ul>
        `,
      },
    ],
    authorNote:
      'A checklist is a training tool. I write it so a new team member can understand the intent in one pass.',
  },
  {
    slug: 'ai-knowledge-base-audit',
    title: 'AI Knowledge Base Audit',
    summary: 'A structured audit to reduce content drift and improve doc findability.',
    cardDescription:
      'A structured audit of AI help content to remove drift and improve findability.',
    category: 'enablement',
    tags: ['Audit', 'Information', 'Enablement'],
    accent: '#60a5fa',
    meta: [
      { label: 'Doc type', value: 'Content audit + remediation plan' },
      { label: 'Primary users', value: 'Support, enablement, knowledge teams' },
      { label: 'Success metric', value: 'Reduced duplicate answers' },
      { label: 'Artifacts', value: 'Audit map, cleanup backlog' },
    ],
    sections: [
      {
        title: 'Audit goals',
        body: `
          <ul>
            <li>Remove outdated or conflicting guidance.</li>
            <li>Improve findability for common questions.</li>
            <li>Clarify ownership and review cadence.</li>
          </ul>
        `,
      },
      {
        title: 'Audit dimensions',
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Accuracy</strong>
              <p>Does the content match current product behavior and policy?</p>
            </div>
            <div class="card">
              <strong>Findability</strong>
              <p>Can users locate the correct answer in under 3 clicks?</p>
            </div>
            <div class="card">
              <strong>Ownership</strong>
              <p>Each doc has a clear owner and review date.</p>
            </div>
          </div>
        `,
      },
      {
        title: 'Remediation workflow',
        body: `
          <ol>
            <li>Tag duplicates and consolidate into the canonical doc.</li>
            <li>Mark outdated sections and request SME review.</li>
            <li>Update navigation and search keywords.</li>
            <li>Publish a cleanup log with owners and dates.</li>
          </ol>
        `,
      },
      {
        title: 'Governance cadence',
        body: `
          <ul>
            <li>Quarterly audits for high-traffic docs.</li>
            <li>Monthly reviews for critical workflows.</li>
            <li>Ownership transfer checklist during team changes.</li>
          </ul>
        `,
      },
    ],
    authorNote:
      'Audits keep knowledge bases trustworthy. I treat them as product maintenance, not cleanup work.',
  },
  {
    slug: 'sdk-migration-guide-v2-to-v3',
    title: 'SDK Migration Guide (v2 to v3)',
    summary: 'A migration guide for SDK upgrades with breaking changes and rollout strategy.',
    cardDescription:
      'A practical migration guide for breaking changes, testing, and phased rollout.',
    category: 'technical',
    tags: ['SDK', 'Migration', 'DevRel'],
    accent: '#0ea5e9',
    meta: [
      { label: 'Doc type', value: 'Migration guide + release notes' },
      { label: 'Primary users', value: 'Developers, platform teams' },
      { label: 'Success metric', value: 'Upgrade without regression' },
      { label: 'Artifacts', value: 'Diff table, test checklist' },
    ],
    sections: [
      {
        title: 'Release overview',
        body: `
          <p>This guide supports teams upgrading from SDK v2 to v3. It highlights breaking changes, provides migration steps, and recommends a staged rollout.</p>
          <p><span class="highlight">Upgrade goal:</span> zero downtime with verified behavior parity.</p>
        `,
      },
      {
        title: 'Breaking changes',
        body: `
          <ul>
            <li>Request initialization now requires an explicit region.</li>
            <li>Streaming responses return a typed iterator.</li>
            <li>Error codes are normalized across models.</li>
          </ul>
        `,
      },
      {
        title: 'Migration steps',
        body: `
          <ol>
            <li>Upgrade the SDK and pin the new version.</li>
            <li>Update request initialization with region and timeout.</li>
            <li>Validate streaming handlers for iterator support.</li>
            <li>Run the test suite with new error expectations.</li>
          </ol>
        `,
      },
      {
        title: 'Rollout strategy',
        body: `
          <ul>
            <li>Canary release to 5 percent traffic for 48 hours.</li>
            <li>Track latency, error rate, and cost deltas.</li>
            <li>Promote to production once metrics stabilize.</li>
          </ul>
        `,
      },
      {
        title: 'Test checklist',
        body: `
          <ul>
            <li>Validate responses for top 10 intents.</li>
            <li>Confirm error mapping for policy refusals.</li>
            <li>Run load tests against streaming endpoints.</li>
          </ul>
        `,
      },
    ],
    authorNote:
      'Migration guides are a trust moment. I focus on clarity, testability, and rollback safety.',
  },
];
