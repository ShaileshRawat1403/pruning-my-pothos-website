export const portfolioSamples = [
  {
    slug: "azure-ai-foundry-platform-onboarding-guide",
    title: "Azure AI Foundry Platform Onboarding Guide",
    summary:
      "A governance-first onboarding guide for rolling out Azure AI Foundry in regulated enterprise environments.",
    cardDescription:
      "From AI Hub to production workload with guardrails, cost controls, and clear ownership.",
    category: "enablement",
    tags: ["Onboarding", "Governance", "Enablement"],
    accent: "#3b82f6",
    meta: [
      { label: "Doc type", value: "Platform onboarding guide" },
      { label: "Primary users", value: "Enablement, platform teams" },
      { label: "Success metric", value: "First production deploy in 14 days" },
      { label: "Artifacts", value: "Hub model, runbook, guardrails" },
    ],
    sections: [
      {
        title: "0. Why this guide exists",
        body: `
          <p>Enterprise AI programs rarely fail because models are weak. They fail because teams move faster than governance.</p>
          <p>This guide is for platform and AI enablement teams rolling out <span class="highlight">Azure AI Foundry</span> at scale. It balances developer velocity with security, compliance, cost control, and organizational trust.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Problem</strong>
              <p>Experimentation starts before boundaries are defined. Governance arrives after early incidents.</p>
            </div>
            <div class="card">
              <strong>Outcome</strong>
              <p>Teams ship inside guardrails with clear ownership, fewer escalations, and predictable spend.</p>
            </div>
            <div class="card">
              <strong>Goal</strong>
              <p><span class="highlight">Controlled momentum</span> over raw speed.</p>
            </div>
          </div>
        `,
      },
      {
        title: "1. Azure AI Foundry mental model (Hub -> Project -> Workload)",
        body: `
          <p>Azure AI Foundry is built around a governance-first hierarchy. The fastest teams succeed because they align to it early.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>AI Hub</strong>
              <p><span class="highlight">Governance boundary</span>. Security, identity, model access, and network constraints live here.</p>
            </div>
            <div class="card">
              <strong>AI Project</strong>
              <p><span class="highlight">Execution boundary</span>. Teams experiment and build with inherited controls.</p>
            </div>
            <div class="card">
              <strong>Workloads</strong>
              <p><span class="highlight">Behavior layer</span>. Playgrounds, APIs, and integrations where cost and risk show up.</p>
            </div>
          </div>
          <p><strong>Leadership framing:</strong> Decisions should be made once, at the highest reasonable layer, and inherited everywhere else.</p>
          <figure class="diagram">
            <svg viewBox="0 0 720 160" role="img" aria-label="Hub to Project to Workload flow">
              <rect x="40" y="40" width="180" height="60" rx="12" />
              <text x="130" y="76" text-anchor="middle" class="diagram-label">AI Hub</text>
              <rect x="270" y="40" width="180" height="60" rx="12" />
              <text x="360" y="76" text-anchor="middle" class="diagram-label">AI Project</text>
              <rect x="500" y="40" width="180" height="60" rx="12" />
              <text x="590" y="76" text-anchor="middle" class="diagram-label">Workload</text>
              <path d="M220 70H270" class="diagram-line" />
              <path d="M450 70H500" class="diagram-line" />
              <path d="M270 70l-8-6v12z" class="diagram-arrow" />
              <path d="M500 70l-8-6v12z" class="diagram-arrow" />
            </svg>
            <figcaption>Governance flows from Hub to Project to Workload.</figcaption>
          </figure>
          <figure class="media-shot">
            <img src="/images/portfolio/azure-foundry/foundry-mental-model.svg" alt="AI Hub to Project to Workload flow in Azure AI Foundry." />
            <figcaption>Mental model diagram: Hub to Project to Workload.</figcaption>
          </figure>
        `,
      },
      {
        title: "2. Creating the AI Hub (governance first)",
        body: `
          <p><strong>Outcome:</strong> A centralized governance boundary with clear ownership and inherited controls.</p>
          <p>Create the AI Hub in Azure AI Foundry before any team builds. This is where you define <span class="highlight">identity, networking, and model access</span>.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Identity</strong>
              <p>Assign Owner, Security Admin, and Billing Admin roles using Azure RBAC.</p>
            </div>
            <div class="card">
              <strong>Networking</strong>
              <p>Define region and network boundaries. Use private endpoints where required.</p>
            </div>
            <div class="card">
              <strong>Model access</strong>
              <p>Approve model families and tiers for the org, not per team.</p>
            </div>
          </div>
          <p><strong>Developer callout:</strong> You will not create the Hub. You will inherit it.</p>
          <figure class="media-shot">
            <img src="/images/portfolio/azure-foundry/ai-hub-setup.svg" alt="AI Hub creation form with RBAC roles and networking settings." />
            <figcaption>AI Hub creation with RBAC roles.</figcaption>
          </figure>
        `,
      },
      {
        title: "3. Creating a Project (isolation and safety)",
        body: `
          <p><strong>Outcome:</strong> Teams can move fast in a contained workspace without affecting each other.</p>
          <p>Create one Project per team or workload. Projects inherit Hub policies by default, which keeps governance consistent while enabling autonomy.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Isolation</strong>
              <p>Separate dev, staging, and prod Projects to control access and quotas.</p>
            </div>
            <div class="card">
              <strong>Ownership</strong>
              <p>Assign a Project Owner and a Support Contact for escalations.</p>
            </div>
            <div class="card">
              <strong>Quotas</strong>
              <p>Apply project-specific rate limits and budget alerts.</p>
            </div>
          </div>
          <figure class="media-shot">
            <img src="/images/portfolio/azure-foundry/project-setup.svg" alt="Project setup showing owners, quotas, and budget limits." />
            <figcaption>Project setup with quotas and owners.</figcaption>
          </figure>
        `,
      },
      {
        title: "4. Chat Playground (learning before building)",
        body: `
          <p><strong>Outcome:</strong> Teams learn model behavior safely before writing production code.</p>
          <p>Use the Chat Playground to test prompts, evaluate model responses, and align on tone and constraints. Require teams to document the final system prompt as part of onboarding.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Prompt baseline</strong>
              <p>Define a system prompt that reflects policy and tone.</p>
            </div>
            <div class="card">
              <strong>Model selection</strong>
              <p>Test at least two tiers for cost and quality tradeoffs.</p>
            </div>
            <div class="card">
              <strong>Known limits</strong>
              <p>Capture refusal behavior and edge cases early.</p>
            </div>
          </div>
          <figure class="media-shot">
            <img src="/images/portfolio/azure-foundry/chat-playground.svg" alt="Chat Playground with system prompt and sample conversation." />
            <figcaption>Chat Playground with approved system prompt.</figcaption>
          </figure>
        `,
      },
      {
        title: "5. First API call (proof of access)",
        body: `
          <p><strong>Outcome:</strong> Verified access with logging, cost awareness, and failure handling from day one.</p>
          <p>Use the Azure OpenAI SDK with deployment names configured inside your Project.</p>
          <pre><code class="language-python">import os
from openai import AzureOpenAI

client = AzureOpenAI(
    api_key=os.environ["AZURE_OPENAI_API_KEY"],
    api_version="2024-02-15-preview",
    azure_endpoint=os.environ["AZURE_OPENAI_ENDPOINT"],
)

response = client.chat.completions.create(
    model="foundry-chat-prod",
    messages=[
        {"role": "system", "content": "You are a precise support assistant."},
        {"role": "user", "content": "Summarize this ticket in one sentence."},
    ],
    temperature=0.2,
)

print(response.choices[0].message.content)</code></pre>
          <pre><code class="language-javascript">import { AzureOpenAI } from "openai";

const client = new AzureOpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  apiVersion: "2024-02-15-preview",
  endpoint: process.env.AZURE_OPENAI_ENDPOINT,
});

const response = await client.chat.completions.create({
  model: "foundry-chat-prod",
  messages: [
    { role: "system", content: "You are a precise support assistant." },
    { role: "user", content: "Summarize this ticket in one sentence." },
  ],
  temperature: 0.2,
});

console.log(response.choices[0].message.content);</code></pre>
          <figure class="media-shot">
            <img src="/images/portfolio/azure-foundry/api-deployment-keyvault.svg" alt="Deployment list with key vault secrets configuration." />
            <figcaption>API deployment and key vault configuration.</figcaption>
          </figure>
        `,
      },
      {
        title: "6. Guardrails and limits (preventing early failures)",
        body: `
          <p><strong>Outcome:</strong> Fewer policy violations, controlled spend, and predictable latency.</p>
          <p>Enable Azure content filters, set rate limits, and route all prompts through a validation layer.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Content filters</strong>
              <p>Use Azure safety filters and log all blocked responses.</p>
            </div>
            <div class="card">
              <strong>Budget alerts</strong>
              <p>Apply project budgets and cost anomaly alerts.</p>
            </div>
            <div class="card">
              <strong>Rate limits</strong>
              <p>Set per-project limits to avoid accidental spikes.</p>
            </div>
          </div>
          <p><strong>Leadership framing:</strong> Guardrails are a cost and trust control, not a blocker.</p>
          <figure class="media-shot">
            <img src="/images/portfolio/azure-foundry/guardrails-config.svg" alt="Content filters with budget alerts enabled." />
            <figcaption>Content filter configuration and budget alerts.</figcaption>
          </figure>
        `,
      },
      {
        title: "7. Common failure modes (what breaks in real orgs)",
        body: `
          <p>These issues show up repeatedly in enterprise rollouts. Plan for them up front.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Untracked spend</strong>
              <p>Teams ship without budgets or alerts. Costs spike within the first week.</p>
            </div>
            <div class="card">
              <strong>Policy drift</strong>
              <p>Prompt changes bypass review and create unsafe outputs.</p>
            </div>
            <div class="card">
              <strong>Access sprawl</strong>
              <p>Keys are shared and ownership is unclear when incidents occur.</p>
            </div>
          </div>
          <p><span class="highlight">Fix:</span> Tie access, prompts, and budgets to named owners with documented review cadence.</p>
        `,
      },
      {
        title: "8. What \"ready\" actually means",
        body: `
          <p>A team is ready to go live when these statements are true:</p>
          <ul>
            <li><strong>Governance:</strong> The Hub enforces identity, region, and model policy defaults.</li>
            <li><strong>Safety:</strong> Content filters and input validation are enabled and logged.</li>
            <li><strong>Cost:</strong> Budgets and alerts exist at the Project level.</li>
            <li><strong>Operational:</strong> An on-call owner and rollback path are documented.</li>
          </ul>
          <p><span class="highlight">Business impact:</span> Faster onboarding, fewer incidents, and higher confidence across teams.</p>
          <figure class="media-shot">
            <img src="/images/portfolio/azure-foundry/readiness-checklist.svg" alt="Project readiness checklist marked complete." />
            <figcaption>Readiness checklist completed in Project.</figcaption>
          </figure>
        `,
      },
    ],
    authorNote:
      "I treat onboarding as a governance exercise: clarify decisions early so developers can move fast without surprises.",
  },
  {
    slug: "safe-usage-limits-playbook",
    title: "Safe Usage & Limits Playbook",
    summary:
      "A policy-forward playbook for Azure AI Foundry that turns model limits into enforceable, developer-ready rules.",
    cardDescription:
      "Translate policy into executable constraints with clear ownership and escalation paths.",
    category: "policy",
    tags: ["Risk", "Policy", "Governance"],
    accent: "#10b981",
    meta: [
      { label: "Doc type", value: "Safety playbook + governance policy" },
      { label: "Primary users", value: "Enablement, legal, security" },
      { label: "Success metric", value: "Policy violations < 1%" },
      { label: "Artifacts", value: "Risk matrix, guardrails, escalation" },
    ],
    sections: [
      {
        title: "0. Why this guide exists",
        body: `
          <p>This playbook exists because policy that stays in slides never reaches developers. It translates safety and compliance for <span class="highlight">Azure AI Foundry</span> into rules teams can actually follow.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Problem</strong>
              <p>Policy arrives after incidents or differs by team.</p>
            </div>
            <div class="card">
              <strong>Outcome</strong>
              <p>Consistent guardrails, fewer violations, and faster approvals.</p>
            </div>
            <div class="card">
              <strong>Goal</strong>
              <p><span class="highlight">Safe usage by default</span>.</p>
            </div>
          </div>
        `,
      },
      {
        title: "1. Azure AI Foundry mental model (Policy -> Guardrails -> Workloads)",
        body: `
          <p>Policy must be defined once and enforced everywhere. The model here is simple: leadership sets policy, enablement encodes guardrails, and workloads inherit them.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Policy</strong>
              <p><span class="highlight">Executive boundary</span>. Defines allowed and disallowed use.</p>
            </div>
            <div class="card">
              <strong>Guardrails</strong>
              <p><span class="highlight">Enablement layer</span>. Encodes filters, prompts, and reviews.</p>
            </div>
            <div class="card">
              <strong>Workloads</strong>
              <p><span class="highlight">Developer layer</span>. Teams build inside inherited constraints.</p>
            </div>
          </div>
          <figure class="diagram">
            <svg viewBox="0 0 720 160" role="img" aria-label="Policy to Guardrails to Workloads">
              <rect x="40" y="40" width="180" height="60" rx="12" />
              <text x="130" y="76" text-anchor="middle" class="diagram-label">Policy</text>
              <rect x="270" y="40" width="180" height="60" rx="12" />
              <text x="360" y="76" text-anchor="middle" class="diagram-label">Guardrails</text>
              <rect x="500" y="40" width="180" height="60" rx="12" />
              <text x="590" y="76" text-anchor="middle" class="diagram-label">Workloads</text>
              <path d="M220 70H270" class="diagram-line" />
              <path d="M450 70H500" class="diagram-line" />
              <path d="M270 70l-8-6v12z" class="diagram-arrow" />
              <path d="M500 70l-8-6v12z" class="diagram-arrow" />
            </svg>
            <figcaption>Policy decisions are enforced through guardrails before workloads ship.</figcaption>
          </figure>
          <figure class="media-shot">
            <img src="/images/portfolio/safe-usage/policy-guardrail-flow.svg" alt="Policy to guardrail flow for safe usage limits." />
            <figcaption>Policy to guardrail flow.</figcaption>
          </figure>
        `,
      },
      {
        title: "2. Guardrail policy (governance first)",
        body: `
          <p><strong>Outcome:</strong> A single policy that teams can’t accidentally bypass.</p>
          <p>Define a clear policy boundary and encode it in Azure content filters and prompt templates.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Allowed</strong>
              <p>Internal summarization, formatting, and translation with approved data.</p>
            </div>
            <div class="card">
              <strong>Restricted</strong>
              <p>Medical, legal, or financial guidance without human review.</p>
            </div>
            <div class="card">
              <strong>Prohibited</strong>
              <p>PII extraction, surveillance, or sensitive profiling.</p>
            </div>
          </div>
          <figure class="media-shot">
            <img src="/images/portfolio/safe-usage/content-filters.svg" alt="Content filters configured for prohibited and restricted usage." />
            <figcaption>Azure content filters configured.</figcaption>
          </figure>
        `,
      },
      {
        title: "3. Project‑level enforcement (isolation and safety)",
        body: `
          <p><strong>Outcome:</strong> Teams can build without re-litigating policy.</p>
          <p>Each project inherits guardrails but still has named owners and budgets.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Ownership</strong>
              <p>Every prompt set has a designated owner and reviewer.</p>
            </div>
            <div class="card">
              <strong>Budgets</strong>
              <p>Guardrails include cost limits and alerting thresholds.</p>
            </div>
            <div class="card">
              <strong>Logging</strong>
              <p>Policy events are logged and reviewed monthly.</p>
            </div>
          </div>
          <figure class="media-shot">
            <img src="/images/portfolio/safe-usage/project-enforcement.svg" alt="Project-level enforcement with owners, budgets, and policy logs." />
            <figcaption>Project-level enforcement with owners, budgets, and logs.</figcaption>
          </figure>
        `,
      },
      {
        title: "4. Prompt safety checklist (learning before building)",
        body: `
          <p>Before any workload ships, review prompts against this checklist:</p>
          <ol>
            <li>Data classification and allowed sources verified.</li>
            <li>Output expectations are explicit and testable.</li>
            <li>Refusal behavior defined for restricted asks.</li>
            <li>Prompt logged with owner and review date.</li>
          </ol>
        `,
      },
      {
        title: "5. Guardrails and limits (preventing early failures)",
        body: `
          <p><strong>Outcome:</strong> Lower violations and fewer emergency rollbacks.</p>
          <p>Enable Azure content filters, enforce prompt templates, and set usage alerts.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Content filters</strong>
              <p>Block unsafe content and log every refusal.</p>
            </div>
            <div class="card">
              <strong>Rate limits</strong>
              <p>Prevent spikes by enforcing per-project thresholds.</p>
            </div>
            <div class="card">
              <strong>Audit logs</strong>
              <p>Record prompt changes and policy exceptions.</p>
            </div>
          </div>
          <figure class="media-shot">
            <img src="/images/portfolio/safe-usage/guardrails-limits.svg" alt="Guardrails and usage limits overview." />
            <figcaption>Guardrails and usage limits overview.</figcaption>
          </figure>
        `,
      },
      {
        title: "6. Escalation workflow (proof of compliance)",
        body: `
          <p><strong>Outcome:</strong> Fast decisions without compliance bottlenecks.</p>
          <ol>
            <li>Flag the use case and assign risk level.</li>
            <li>Route to legal and policy within 48 hours.</li>
            <li>Document the decision and mitigation steps.</li>
            <li>Publish the approved pattern to the shared library.</li>
          </ol>
          <figure class="media-shot">
            <img src="/images/portfolio/safe-usage/escalation-workflow.svg" alt="Escalation workflow and decision log steps." />
            <figcaption>Escalation workflow and decision log.</figcaption>
          </figure>
        `,
      },
      {
        title: "7. Common failure modes (what breaks in real orgs)",
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Policy drift</strong>
              <p>Prompt changes bypass review and create unsafe outputs.</p>
            </div>
            <div class="card">
              <strong>Shadow usage</strong>
              <p>Teams bypass guardrails with unmanaged keys.</p>
            </div>
            <div class="card">
              <strong>Untracked risk</strong>
              <p>No consistent log of exceptions or approvals.</p>
            </div>
          </div>
          <p><span class="highlight">Fix:</span> Centralize policy, automate guardrails, and log every exception.</p>
        `,
      },
      {
        title: "8. What \"ready\" actually means",
        body: `
          <ul>
            <li><strong>Governance:</strong> Policy owners and review cadence are defined.</li>
            <li><strong>Safety:</strong> Content filters and prompt templates are enforced.</li>
            <li><strong>Operational:</strong> Escalation workflow and decision log are in place.</li>
            <li><strong>Compliance:</strong> Audit trail exists for all exceptions.</li>
          </ul>
          <p><span class="highlight">Business impact:</span> Faster approvals, fewer incidents, and defensible AI usage.</p>
        `,
      },
    ],
    authorNote:
      "Policy fails when it stays abstract. I turn it into guardrails developers can follow without slowing down.",
  },
  {
    slug: "aws-bedrock-platform-onboarding-guide",
    title: "AWS Bedrock Platform Onboarding Guide",
    summary:
      "A governance-first onboarding guide for enterprise adoption of AWS Bedrock with secure access, cost controls, and operational readiness.",
    cardDescription:
      "From account guardrails to production workloads with clear ownership and safe defaults.",
    category: "enablement",
    tags: ["Onboarding", "Governance", "Platform"],
    accent: "#f59e0b",
    meta: [
      { label: "Doc type", value: "Platform onboarding guide" },
      { label: "Primary users", value: "Enablement, platform teams" },
      { label: "Success metric", value: "Production workload in 14 days" },
      { label: "Artifacts", value: "Account model, runbook, guardrails" },
    ],
    sections: [
      {
        title: "0. Why this guide exists",
        body: `
          <p>Enterprise AI programs fail when teams ship faster than governance. This guide helps platform and enablement teams roll out <span class="highlight">AWS Bedrock</span> with clear ownership, cost predictability, and risk controls.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Problem</strong>
              <p>Experiments begin without boundaries. Governance arrives after incidents.</p>
            </div>
            <div class="card">
              <strong>Outcome</strong>
              <p>Teams ship inside guardrails with fewer escalations and predictable spend.</p>
            </div>
            <div class="card">
              <strong>Goal</strong>
              <p><span class="highlight">Controlled momentum</span> over raw speed.</p>
            </div>
          </div>
        `,
      },
      {
        title: "1. AWS Bedrock mental model (Account -> Project -> Workload)",
        body: `
          <p>AWS Bedrock adoption succeeds when governance is centralized and inherited. Align to a simple hierarchy early.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Account boundary</strong>
              <p><span class="highlight">Governance layer</span>. Identity, networking, and policy decisions live here.</p>
            </div>
            <div class="card">
              <strong>Project boundary</strong>
              <p><span class="highlight">Execution layer</span>. Teams build within approved permissions and budgets.</p>
            </div>
            <div class="card">
              <strong>Workloads</strong>
              <p><span class="highlight">Behavior layer</span>. Prompts, APIs, and integrations where cost and risk surface.</p>
            </div>
          </div>
          <p><strong>Leadership framing:</strong> Make decisions once at the highest reasonable level, then inherit everywhere else.</p>
          <figure class="diagram">
            <svg viewBox="0 0 720 160" role="img" aria-label="Account to Project to Workload flow">
              <rect x="40" y="40" width="180" height="60" rx="12" />
              <text x="130" y="76" text-anchor="middle" class="diagram-label">Account</text>
              <rect x="270" y="40" width="180" height="60" rx="12" />
              <text x="360" y="76" text-anchor="middle" class="diagram-label">Project</text>
              <rect x="500" y="40" width="180" height="60" rx="12" />
              <text x="590" y="76" text-anchor="middle" class="diagram-label">Workload</text>
              <path d="M220 70H270" class="diagram-line" />
              <path d="M450 70H500" class="diagram-line" />
              <path d="M270 70l-8-6v12z" class="diagram-arrow" />
              <path d="M500 70l-8-6v12z" class="diagram-arrow" />
            </svg>
            <figcaption>Account-level governance flows into project execution and workloads.</figcaption>
          </figure>
          <figure class="media-shot">
            <img src="/images/portfolio/aws-bedrock/bedrock-mental-model.svg" alt="Account to Project to Workload flow for AWS Bedrock." />
            <figcaption>Mental model diagram: Account to Project to Workload.</figcaption>
          </figure>
        `,
      },
      {
        title: "2. Creating the account boundary (governance first)",
        body: `
          <p><strong>Outcome:</strong> A centralized governance boundary with clear ownership and policy inheritance.</p>
          <p>Start with an AWS account (or account group) dedicated to AI workloads. Enforce policies and identity controls before any model access.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Identity</strong>
              <p>Use IAM roles with least privilege and assign a Security Owner and Billing Owner.</p>
            </div>
            <div class="card">
              <strong>Networking</strong>
              <p>Define VPC endpoints and regional constraints where required.</p>
            </div>
            <div class="card">
              <strong>Policy</strong>
              <p>Set SCPs or IAM guardrails for Bedrock model access.</p>
            </div>
          </div>
          <p><strong>Developer callout:</strong> You inherit the account guardrails. You do not create them.</p>
          <figure class="media-shot">
            <img src="/images/portfolio/aws-bedrock/account-guardrails.svg" alt="IAM roles with Bedrock access policy settings." />
            <figcaption>IAM roles and Bedrock access policy.</figcaption>
          </figure>
        `,
      },
      {
        title: "3. Creating a project (isolation and safety)",
        body: `
          <p><strong>Outcome:</strong> Teams can experiment without cross-team interference or cost ambiguity.</p>
          <p>Create a project workspace with scoped permissions, budgets, and logging.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Isolation</strong>
              <p>Separate dev, staging, and prod environments.</p>
            </div>
            <div class="card">
              <strong>Ownership</strong>
              <p>Assign a project owner and on-call contact.</p>
            </div>
            <div class="card">
              <strong>Budgets</strong>
              <p>Apply cost alerts and usage thresholds per project.</p>
            </div>
          </div>
          <figure class="media-shot">
            <img src="/images/portfolio/aws-bedrock/project-budgets.svg" alt="Project budget and alert setup." />
            <figcaption>Project budgets and alert setup.</figcaption>
          </figure>
        `,
      },
      {
        title: "4. Console playground (learning before building)",
        body: `
          <p><strong>Outcome:</strong> Teams understand model behavior before writing code.</p>
          <p>Use the Bedrock console to test prompts, document failure modes, and agree on the system prompt standard.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Prompt baseline</strong>
              <p>Define and document the system prompt used across workloads.</p>
            </div>
            <div class="card">
              <strong>Model selection</strong>
              <p>Compare model tiers for cost, latency, and quality.</p>
            </div>
            <div class="card">
              <strong>Edge cases</strong>
              <p>Capture refusal behavior and unsafe outputs.</p>
            </div>
          </div>
          <figure class="media-shot">
            <img src="/images/portfolio/aws-bedrock/console-playground.svg" alt="Bedrock console playground with approved system prompt." />
            <figcaption>Bedrock playground with approved prompt.</figcaption>
          </figure>
        `,
      },
      {
        title: "5. First API call (proof of access)",
        body: `
          <p><strong>Outcome:</strong> Verified access with logs and cost visibility from day one.</p>
          <p>Use the Bedrock runtime client and log request metadata.</p>
          <pre><code class="language-python">import json
import boto3

client = boto3.client("bedrock-runtime", region_name="us-east-1")

payload = {
  "prompt": "Summarize this ticket in one sentence.",
  "max_tokens_to_sample": 200,
  "temperature": 0.2
}

response = client.invoke_model(
  modelId="anthropic.claude-3-sonnet-20240229-v1:0",
  body=json.dumps(payload)
)

result = json.loads(response["body"].read())
print(result["completion"])</code></pre>
          <pre><code class="language-javascript">import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({ region: "us-east-1" });

const payload = {
  prompt: "Summarize this ticket in one sentence.",
  max_tokens_to_sample: 200,
  temperature: 0.2
};

const command = new InvokeModelCommand({
  modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
  body: JSON.stringify(payload),
  contentType: "application/json",
  accept: "application/json"
});

const response = await client.send(command);
const result = JSON.parse(new TextDecoder().decode(response.body));
console.log(result.completion);</code></pre>
          <figure class="media-shot">
            <img src="/images/portfolio/aws-bedrock/cloudwatch-logs.svg" alt="CloudWatch logs for the first Bedrock request." />
            <figcaption>CloudWatch logs for first request.</figcaption>
          </figure>
        `,
      },
      {
        title: "6. Guardrails and limits (preventing early failures)",
        body: `
          <p><strong>Outcome:</strong> Lower policy violations and predictable cost behavior.</p>
          <p>Enable guardrails and enforce rate limits and budgets before production usage.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Guardrails</strong>
              <p>Enable Bedrock guardrails or moderation where applicable.</p>
            </div>
            <div class="card">
              <strong>Rate limits</strong>
              <p>Set per-project limits to avoid spikes.</p>
            </div>
            <div class="card">
              <strong>Cost alerts</strong>
              <p>Track usage per model and alert on anomalies.</p>
            </div>
          </div>
          <figure class="media-shot">
            <img src="/images/portfolio/aws-bedrock/guardrails-alerts.svg" alt="Bedrock guardrails with budget alerts." />
            <figcaption>Guardrail policy and budget alert.</figcaption>
          </figure>
        `,
      },
      {
        title: "7. Common failure modes (what breaks in real orgs)",
        body: `
          <p>These issues show up repeatedly in enterprise rollouts. Plan for them early.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Access sprawl</strong>
              <p>Keys or roles are shared with no owner, slowing incident response.</p>
            </div>
            <div class="card">
              <strong>Cost spikes</strong>
              <p>No alerts or budgets for early experiments.</p>
            </div>
            <div class="card">
              <strong>Policy drift</strong>
              <p>Prompt changes bypass review and create unsafe outputs.</p>
            </div>
          </div>
          <p><span class="highlight">Fix:</span> Tie access, prompts, and budgets to named owners with review cadence.</p>
        `,
      },
      {
        title: "8. What \"ready\" actually means",
        body: `
          <p>A project is ready to go live when the following are true:</p>
          <ul>
            <li><strong>Governance:</strong> IAM roles, policies, and account guardrails are enforced.</li>
            <li><strong>Safety:</strong> Guardrails are enabled and logged.</li>
            <li><strong>Cost:</strong> Budgets and alerts are active at the project level.</li>
            <li><strong>Operational:</strong> Owners and rollback paths are documented.</li>
          </ul>
          <p><span class="highlight">Business impact:</span> Faster onboarding, fewer incidents, higher trust across teams.</p>
          <figure class="media-shot">
            <img src="/images/portfolio/aws-bedrock/readiness-checklist.svg" alt="Readiness checklist completed for Bedrock." />
            <figcaption>Readiness checklist completed.</figcaption>
          </figure>
        `,
      },
    ],
    authorNote:
      "I treat onboarding as a governance exercise: clarify decisions early so developers can move fast without surprises.",
  },
  {
    slug: "ollama-platform-onboarding-guide",
    title: "Ollama Platform Onboarding Guide",
    summary:
      "A local-first onboarding guide for teams adopting Ollama with controlled access, safe defaults, and operational clarity.",
    cardDescription:
      "From local model hosting to reliable workloads with guardrails and ownership.",
    category: "enablement",
    tags: ["Onboarding", "Local", "Platform"],
    accent: "#14b8a6",
    meta: [
      { label: "Doc type", value: "Platform onboarding guide" },
      { label: "Primary users", value: "Enablement, platform teams" },
      { label: "Success metric", value: "Stable local workload in 10 days" },
      { label: "Artifacts", value: "Runbook, model registry, guardrails" },
    ],
    sections: [
      {
        title: "0. Why this guide exists",
        body: `
          <p>Local AI adoption succeeds when teams ship inside clear boundaries. This guide helps platform teams roll out <span class="highlight">Ollama</span> without sacrificing reliability, cost control, or trust.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Problem</strong>
              <p>Local installs sprawl, models drift, and nobody owns reliability.</p>
            </div>
            <div class="card">
              <strong>Outcome</strong>
              <p>Teams operate a stable local stack with shared guardrails and clear ownership.</p>
            </div>
            <div class="card">
              <strong>Goal</strong>
              <p><span class="highlight">Repeatable local deployments</span> over ad hoc setups.</p>
            </div>
          </div>
        `,
      },
      {
        title: "1. Ollama mental model (Host -> Project -> Workload)",
        body: `
          <p>Ollama is local-first, which means governance must be explicit. Align to a simple hierarchy before anyone runs models.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Host boundary</strong>
              <p><span class="highlight">Governance layer</span>. Approved hardware, access rules, and logging live here.</p>
            </div>
            <div class="card">
              <strong>Project boundary</strong>
              <p><span class="highlight">Execution layer</span>. Teams build within approved models and quotas.</p>
            </div>
            <div class="card">
              <strong>Workloads</strong>
              <p><span class="highlight">Behavior layer</span>. Prompts and API calls where quality and risk appear.</p>
            </div>
          </div>
          <figure class="diagram">
            <svg viewBox="0 0 720 160" role="img" aria-label="Host to Project to Workload flow">
              <rect x="40" y="40" width="180" height="60" rx="12" />
              <text x="130" y="76" text-anchor="middle" class="diagram-label">Host</text>
              <rect x="270" y="40" width="180" height="60" rx="12" />
              <text x="360" y="76" text-anchor="middle" class="diagram-label">Project</text>
              <rect x="500" y="40" width="180" height="60" rx="12" />
              <text x="590" y="76" text-anchor="middle" class="diagram-label">Workload</text>
              <path d="M220 70H270" class="diagram-line" />
              <path d="M450 70H500" class="diagram-line" />
              <path d="M270 70l-8-6v12z" class="diagram-arrow" />
              <path d="M500 70l-8-6v12z" class="diagram-arrow" />
            </svg>
            <figcaption>Local governance starts at the host and flows into projects and workloads.</figcaption>
          </figure>
          <figure class="media-shot">
            <img src="/images/portfolio/ollama/ollama-mental-model.svg" alt="Host to Project to Workload flow for Ollama." />
            <figcaption>Mental model diagram: Host to Project to Workload.</figcaption>
          </figure>
        `,
      },
      {
        title: "2. Preparing the host (governance first)",
        body: `
          <p><strong>Outcome:</strong> A stable local environment with defined ownership and predictable performance.</p>
          <p>Standardize where Ollama runs and who owns it. Local stacks fail when hosts are unmanaged.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Hardware</strong>
              <p>Define GPU and memory requirements for approved models.</p>
            </div>
            <div class="card">
              <strong>Access</strong>
              <p>Restrict who can run or update models on the host.</p>
            </div>
            <div class="card">
              <strong>Logging</strong>
              <p>Decide where request logs and usage metrics go.</p>
            </div>
          </div>
          <figure class="media-shot">
            <img src="/images/portfolio/ollama/host-standards.svg" alt="Host standards and access checklist." />
            <figcaption>Host standards and access checklist.</figcaption>
          </figure>
        `,
      },
      {
        title: "3. Install Ollama (macOS + Windows)",
        body: `
          <p><strong>Outcome:</strong> A working local runtime before teams touch prompts or APIs.</p>
          <p>Install on a governed host first, then verify the runtime is running before any project work.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>macOS</strong>
              <p>Install via Homebrew and start the service.</p>
              <pre><code class="language-bash">brew install ollama
ollama serve</code></pre>
            </div>
            <div class="card">
              <strong>Windows</strong>
              <p>Install via winget or the official installer.</p>
              <pre><code class="language-bash">winget install Ollama.Ollama
ollama serve</code></pre>
            </div>
            <div class="card">
              <strong>Verify</strong>
              <p>Pull a small model and run a quick prompt.</p>
              <pre><code class="language-bash">ollama run llama3
ollama list</code></pre>
            </div>
          </div>
        `,
      },
      {
        title: "4. Creating a project (isolation and safety)",
        body: `
          <p><strong>Outcome:</strong> Teams can experiment without affecting others or overrunning capacity.</p>
          <p>Define a project workspace with model access, quotas, and prompt ownership.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Isolation</strong>
              <p>Separate projects by use case and environment.</p>
            </div>
            <div class="card">
              <strong>Model registry</strong>
              <p>Maintain an approved list with versions and owners.</p>
            </div>
            <div class="card">
              <strong>Usage limits</strong>
              <p>Set concurrency or request rate guidelines per project.</p>
            </div>
          </div>
          <figure class="media-shot">
            <img src="/images/portfolio/ollama/project-registry.svg" alt="Project registry and model approvals." />
            <figcaption>Project registry and model approvals.</figcaption>
          </figure>
        `,
      },
      {
        title: "5. Model selection and hardware sizing",
        body: `
          <p><strong>Outcome:</strong> Teams start with models that match the host budget and workload needs.</p>
          <ul>
            <li><strong>CPU-friendly starts:</strong> 7B to 8B class instruct models for quick validation.</li>
            <li><strong>Balanced default:</strong> Mistral or Llama 8B for most internal tooling.</li>
            <li><strong>GPU-required:</strong> 13B+ models only when VRAM and latency targets allow.</li>
          </ul>
          <p><strong>Hardware guidance:</strong> CPU-only is fine for prototypes but slower. GPUs improve latency and throughput; larger models need more VRAM even when quantized.</p>
        `,
      },
      {
        title: "6. Playground testing (learning before building)",
        body: `
          <p><strong>Outcome:</strong> Teams document model behavior before writing production code.</p>
          <p>Use a simple prompt harness to test tone, refusal behavior, and edge cases.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Baseline prompt</strong>
              <p>Define a system prompt that encodes safety and tone.</p>
            </div>
            <div class="card">
              <strong>Model selection</strong>
              <p>Compare two models for quality and latency.</p>
            </div>
            <div class="card">
              <strong>Edge cases</strong>
              <p>Document unsafe or hallucinated outputs.</p>
            </div>
          </div>
          <figure class="media-shot">
            <img src="/images/portfolio/ollama/prompt-harness.svg" alt="Prompt harness results comparing model outputs." />
            <figcaption>Prompt harness results.</figcaption>
          </figure>
        `,
      },
      {
        title: "7. First API call (proof of access)",
        body: `
          <p><strong>Outcome:</strong> Verified local access with traceable logs.</p>
          <p>Use the local Ollama API to validate connectivity.</p>
          <pre><code class="language-bash">curl http://localhost:11434/api/generate \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "llama3",
    "prompt": "Summarize this ticket in one sentence.",
    "stream": false
  }'</code></pre>
          <pre><code class="language-python">import requests

response = requests.post(
    "http://localhost:11434/api/generate",
    json={
        "model": "llama3",
        "prompt": "Summarize this ticket in one sentence.",
        "stream": False
    },
    timeout=30,
)

print(response.json()["response"])</code></pre>
          <figure class="media-shot">
            <img src="/images/portfolio/ollama/local-api-call.svg" alt="Local API call response with timing and tokens." />
            <figcaption>Local API call with response and timing.</figcaption>
          </figure>
        `,
      },
      {
        title: "8. Guardrails and limits (preventing early failures)",
        body: `
          <p><strong>Outcome:</strong> Stable performance and predictable behavior on local hosts.</p>
          <p>Local deployments still need guardrails: prompt standards, model version pinning, and access controls.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Prompt policy</strong>
              <p>Maintain approved prompt templates and review cadence.</p>
            </div>
            <div class="card">
              <strong>Version pinning</strong>
              <p>Lock model versions to prevent silent behavior changes.</p>
            </div>
            <div class="card">
              <strong>Host limits</strong>
              <p>Set concurrency thresholds to avoid resource exhaustion.</p>
            </div>
          </div>
          <div class="media-placeholder">
            <span>Screenshot: Model version registry and limits</span>
          </div>
        `,
      },
      {
        title: "9. Common failure modes (what breaks in real orgs)",
        body: `
          <p>Local stacks fail for predictable reasons. Plan for them early.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Model drift</strong>
              <p>Teams update models without review, changing outputs silently.</p>
            </div>
            <div class="card">
              <strong>Host overload</strong>
              <p>Unbounded requests cause latency spikes and crashes.</p>
            </div>
            <div class="card">
              <strong>Ownership gaps</strong>
              <p>No on-call owner for local failures.</p>
            </div>
          </div>
          <p><span class="highlight">Fix:</span> Tie models, prompts, and hosts to named owners with review cadence.</p>
        `,
      },
      {
        title: "10. What \"ready\" actually means",
        body: `
          <p>A local Ollama project is ready when the following are true:</p>
          <ul>
            <li><strong>Governance:</strong> Host ownership and access controls are documented.</li>
            <li><strong>Safety:</strong> Prompt standards and review cadence exist.</li>
            <li><strong>Performance:</strong> Concurrency limits and latency baselines are tested.</li>
            <li><strong>Operational:</strong> A runbook and escalation path are defined.</li>
          </ul>
          <p><span class="highlight">Business impact:</span> Lower downtime, predictable quality, and safe local experimentation.</p>
          <div class="media-placeholder">
            <span>Screenshot: Readiness checklist completed</span>
          </div>
        `,
      },
    ],
    authorNote:
      "Local AI needs the same operational discipline as cloud AI. I emphasize ownership, versioning, and repeatability.",
  },
  {
    slug: "api-quickstart-sdk-guide",
    title: "API Quickstart + SDK Guide",
    summary:
      "A Bedrock-first quickstart that gets teams to a working, logged integration in under 30 minutes.",
    cardDescription:
      "Bedrock runtime quickstart with safety defaults, retries, and observability.",
    category: "technical",
    tags: ["API", "SDK", "Quickstart"],
    accent: "#8b5cf6",
    meta: [
      { label: "Doc type", value: "API quickstart + SDK guide" },
      { label: "Primary users", value: "Backend and platform engineers" },
      { label: "Success metric", value: "First API call in 30 minutes" },
      { label: "Artifacts", value: "Code samples, error playbook, retries" },
    ],
    sections: [
      {
        title: "0. Why this guide exists",
        body: `
          <p>A quickstart is the first trust moment. This guide gets developers onto <span class="highlight">AWS Bedrock</span> quickly with safe defaults, logging, and error handling from the first call.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Problem</strong>
              <p>Teams copy snippets without retries or logging.</p>
            </div>
            <div class="card">
              <strong>Outcome</strong>
              <p>Working integration with observability in under 30 minutes.</p>
            </div>
            <div class="card">
              <strong>Goal</strong>
              <p><span class="highlight">Fast and safe</span> first call.</p>
            </div>
          </div>
        `,
      },
      {
        title: "1. Bedrock mental model (Runtime -> Model -> Call)",
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Runtime client</strong>
              <p><span class="highlight">bedrock-runtime</span> is where requests are sent.</p>
            </div>
            <div class="card">
              <strong>Model IDs</strong>
              <p>Use explicit model IDs to control cost and behavior.</p>
            </div>
            <div class="card">
              <strong>Requests</strong>
              <p>Every call should be logged with latency and cost metadata.</p>
            </div>
          </div>
          <figure class="diagram">
            <svg viewBox="0 0 720 160" role="img" aria-label="Client to Bedrock Runtime to Model">
              <rect x="40" y="40" width="180" height="60" rx="12" />
              <text x="130" y="76" text-anchor="middle" class="diagram-label">Client</text>
              <rect x="270" y="40" width="180" height="60" rx="12" />
              <text x="360" y="76" text-anchor="middle" class="diagram-label">Bedrock Runtime</text>
              <rect x="500" y="40" width="180" height="60" rx="12" />
              <text x="590" y="76" text-anchor="middle" class="diagram-label">Model</text>
              <path d="M220 70H270" class="diagram-line" />
              <path d="M450 70H500" class="diagram-line" />
              <path d="M270 70l-8-6v12z" class="diagram-arrow" />
              <path d="M500 70l-8-6v12z" class="diagram-arrow" />
            </svg>
            <figcaption>Requests flow through Bedrock Runtime into the selected model.</figcaption>
          </figure>
          <figure class="media-shot">
            <img src="/images/portfolio/api-quickstart/model-catalog.svg" alt="Bedrock model catalog with approved IDs." />
            <figcaption>Bedrock model catalog with IDs.</figcaption>
          </figure>
        `,
      },
      {
        title: "2. Access setup (governance first)",
        body: `
          <p><strong>Outcome:</strong> Least-privilege access with traceability.</p>
          <ol>
            <li>Create an IAM role with Bedrock runtime permissions.</li>
            <li>Store credentials in a secrets manager.</li>
            <li>Enable CloudWatch logging for request metadata.</li>
          </ol>
        `,
      },
      {
        title: "3. Quickstart (first call)",
        body: `
          <pre><code class="language-python">import json
import boto3

client = boto3.client("bedrock-runtime", region_name="us-east-1")

payload = {
  "prompt": "Draft a customer email with three options.",
  "max_tokens_to_sample": 200,
  "temperature": 0.2
}

response = client.invoke_model(
  modelId="anthropic.claude-3-sonnet-20240229-v1:0",
  body=json.dumps(payload)
)

result = json.loads(response["body"].read())
print(result["completion"])</code></pre>
          <pre><code class="language-javascript">import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({ region: "us-east-1" });

const payload = {
  prompt: "Draft a customer email with three options.",
  max_tokens_to_sample: 200,
  temperature: 0.2
};

const command = new InvokeModelCommand({
  modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
  body: JSON.stringify(payload),
  contentType: "application/json",
  accept: "application/json"
});

const response = await client.send(command);
const result = JSON.parse(new TextDecoder().decode(response.body));
console.log(result.completion);</code></pre>
        `,
      },
      {
        title: "4. Errors and retries (learning before building)",
        body: `
          <p>Define baseline retry and fallback rules before you ship:</p>
          <ul>
            <li><strong>429:</strong> exponential backoff and retry.</li>
            <li><strong>5xx:</strong> fail over to fallback model or return safe message.</li>
            <li><strong>Policy refusal:</strong> log prompt and notify owner.</li>
          </ul>
        `,
      },
      {
        title: "5. Logging and metrics (proof of access)",
        body: `
          <p><strong>Outcome:</strong> Every call is traceable from day one.</p>
          <ul>
            <li>Log request ID, model ID, latency, and token usage.</li>
            <li>Tag logs by environment (dev, staging, prod).</li>
            <li>Track cost per model and per workload.</li>
          </ul>
          <figure class="media-shot">
            <img src="/images/portfolio/api-quickstart/cloudwatch-metrics.svg" alt="CloudWatch metrics for latency and token usage." />
            <figcaption>CloudWatch metrics dashboard.</figcaption>
          </figure>
        `,
      },
      {
        title: "6. Guardrails and limits (preventing early failures)",
        body: `
          <p>Enable guardrails and enforce usage limits early:</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Guardrails</strong>
              <p>Enable Bedrock Guardrails or moderation for risky content.</p>
            </div>
            <div class="card">
              <strong>Budgets</strong>
              <p>Set daily or weekly spend alerts by project.</p>
            </div>
            <div class="card">
              <strong>Rate limits</strong>
              <p>Prevent spikes and stabilize latency.</p>
            </div>
          </div>
          <figure class="media-shot">
            <img src="/images/portfolio/api-quickstart/guardrails-budgets.svg" alt="Guardrails and budget alerts configured." />
            <figcaption>Guardrails and budget alerts configured.</figcaption>
          </figure>
        `,
      },
      {
        title: "7. Common failure modes (what breaks in real orgs)",
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Hidden spend</strong>
              <p>Usage grows without budgets or alerts.</p>
            </div>
            <div class="card">
              <strong>Retry storms</strong>
              <p>No backoff leads to cascading failures.</p>
            </div>
            <div class="card">
              <strong>Untracked errors</strong>
              <p>Missing logs slow down incident response.</p>
            </div>
          </div>
        `,
      },
      {
        title: "8. What \"ready\" actually means",
        body: `
          <ul>
            <li><strong>Access:</strong> IAM role is scoped and auditable.</li>
            <li><strong>Safety:</strong> Guardrails enabled for risky prompts.</li>
            <li><strong>Operational:</strong> Logging and alerting are active.</li>
            <li><strong>Cost:</strong> Budgets and alerts are configured.</li>
          </ul>
          <p><span class="highlight">Business impact:</span> Faster onboarding, fewer incidents, and higher developer trust.</p>
        `,
      },
    ],
    authorNote:
      "A quickstart should prove the integration is real and safe. I prioritize fast success with operational guardrails built in.",
  },
  {
    slug: "llmops-runbook-incident-rollback",
    title: "LLMOps Runbook (Incident + Rollback)",
    summary:
      "An Azure OpenAI runbook for incident response, rollback, and postmortems with Azure Monitor signals.",
    cardDescription:
      "Azure Monitor-driven runbook for incidents, drift, and safe rollback.",
    category: "technical",
    tags: ["Ops", "Reliability", "SRE"],
    accent: "#ef4444",
    meta: [
      { label: "Doc type", value: "Runbook + incident response" },
      { label: "Primary users", value: "Platform ops, SRE, ML engineers" },
      { label: "Success metric", value: "Safe rollback in under 30 minutes" },
      { label: "Artifacts", value: "Incident checklist, alerts map" },
    ],
    sections: [
      {
        title: "0. Why this guide exists",
        body: `
          <p>AI incidents compound quickly. This runbook standardizes response for <span class="highlight">Azure OpenAI + Azure Monitor</span> so teams can contain issues fast.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Problem</strong>
              <p>Incidents handled ad hoc, with slow rollback and unclear ownership.</p>
            </div>
            <div class="card">
              <strong>Outcome</strong>
              <p>Restore stability in under 30 minutes with clear escalation paths.</p>
            </div>
            <div class="card">
              <strong>Goal</strong>
              <p><span class="highlight">Fast containment</span> and traceable decisions.</p>
            </div>
          </div>
        `,
      },
      {
        title: "1. Azure Monitor mental model (Signal -> Triage -> Action)",
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Signal</strong>
              <p><span class="highlight">Azure Monitor</span> alerts on latency, cost, and refusal spikes.</p>
            </div>
            <div class="card">
              <strong>Triage</strong>
              <p>Confirm impacted model, scope, and user impact.</p>
            </div>
            <div class="card">
              <strong>Action</strong>
              <p>Rollback, failover, or throttling based on severity.</p>
            </div>
          </div>
          <figure class="diagram">
            <svg viewBox="0 0 720 160" role="img" aria-label="Signal to Triage to Action to Postmortem">
              <rect x="30" y="40" width="150" height="60" rx="12" />
              <text x="105" y="76" text-anchor="middle" class="diagram-label">Signal</text>
              <rect x="205" y="40" width="150" height="60" rx="12" />
              <text x="280" y="76" text-anchor="middle" class="diagram-label">Triage</text>
              <rect x="380" y="40" width="150" height="60" rx="12" />
              <text x="455" y="76" text-anchor="middle" class="diagram-label">Action</text>
              <rect x="555" y="40" width="150" height="60" rx="12" />
              <text x="630" y="76" text-anchor="middle" class="diagram-label">Postmortem</text>
              <path d="M180 70H205" class="diagram-line" />
              <path d="M355 70H380" class="diagram-line" />
              <path d="M530 70H555" class="diagram-line" />
              <path d="M205 70l-8-6v12z" class="diagram-arrow" />
              <path d="M380 70l-8-6v12z" class="diagram-arrow" />
              <path d="M555 70l-8-6v12z" class="diagram-arrow" />
            </svg>
            <figcaption>Incident response flows from signal to postmortem with clear ownership.</figcaption>
          </figure>
          <figure class="media-shot">
            <img src="/images/portfolio/llmops-runbook/monitor-alerts.svg" alt="Azure Monitor alert overview for latency, refusal, and cost." />
            <figcaption>Azure Monitor alert overview.</figcaption>
          </figure>
        `,
      },
      {
        title: "2. Trigger conditions (governance first)",
        body: `
          <p><strong>Outcome:</strong> Clear thresholds that trigger paging before customer impact expands.</p>
          <ul>
            <li>Latency exceeds 2x baseline for 5 minutes.</li>
            <li>Guardrail failure rate above 1 percent.</li>
            <li>Cost anomalies exceed daily budget threshold.</li>
            <li>Policy refusal spikes beyond defined threshold.</li>
          </ul>
          <figure class="media-shot">
            <img src="/images/portfolio/llmops-runbook/trigger-thresholds.svg" alt="Trigger thresholds for paging and review." />
            <figcaption>Trigger thresholds for incident response.</figcaption>
          </figure>
        `,
      },
      {
        title: "3. Triage steps (isolation and safety)",
        body: `
          <p><strong>Outcome:</strong> Confirm blast radius and stabilize before changes go live.</p>
          <ol>
            <li>Confirm affected model deployment and user impact.</li>
            <li>Snapshot logs, traces, and recent prompt changes.</li>
            <li>Switch to safe fallback model if severity is high.</li>
            <li>Notify support and leadership channels.</li>
          </ol>
        `,
      },
      {
        title: "4. Rollback procedure (learning before building)",
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Trigger</strong>
              <p>Policy breach or guardrail failure above threshold.</p>
            </div>
            <div class="card">
              <strong>Action</strong>
              <p>Shift traffic to last known stable model deployment.</p>
            </div>
            <div class="card">
              <strong>Verify</strong>
              <p>Run smoke tests and confirm error rate recovery.</p>
            </div>
          </div>
          <figure class="media-shot">
            <img src="/images/portfolio/llmops-runbook/rollback-swap.svg" alt="Deployment swap and health check after rollback." />
            <figcaption>Deployment swap and health check.</figcaption>
          </figure>
        `,
      },
      {
        title: "5. Communication checklist (proof of access)",
        body: `
          <ul>
            <li>Notify on-call and platform owner.</li>
            <li>Update leadership channel with impact summary.</li>
            <li>Post status updates every 30 minutes.</li>
          </ul>
        `,
      },
      {
        title: "6. Guardrails and limits (preventing early failures)",
        body: `
          <p>Reduce incident frequency by enforcing guardrails and budgets:</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Guardrails</strong>
              <p>Content filters and policy checks on every call.</p>
            </div>
            <div class="card">
              <strong>Budget alerts</strong>
              <p>Daily anomaly alerts for cost spikes.</p>
            </div>
            <div class="card">
              <strong>Prompt review</strong>
              <p>Change approval for high-risk workflows.</p>
            </div>
          </div>
          <figure class="media-shot">
            <img src="/images/portfolio/llmops-runbook/guardrails-budgets.svg" alt="Guardrails and budget alerts configured." />
            <figcaption>Guardrails and budget alerts.</figcaption>
          </figure>
        `,
      },
      {
        title: "7. Common failure modes (what breaks in real orgs)",
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Silent drift</strong>
              <p>Quality changes without prompt/version control.</p>
            </div>
            <div class="card">
              <strong>Cost spikes</strong>
              <p>No alerts before budgets are exceeded.</p>
            </div>
            <div class="card">
              <strong>Slow rollback</strong>
              <p>No documented fallback model or playbook.</p>
            </div>
          </div>
        `,
      },
      {
        title: "8. What \"ready\" actually means",
        body: `
          <ul>
            <li><strong>Monitoring:</strong> Alerts wired to on-call channels.</li>
            <li><strong>Rollback:</strong> Fallback deployment tested quarterly.</li>
            <li><strong>Ownership:</strong> Incident commander and comms owner defined.</li>
            <li><strong>Audit:</strong> Postmortems stored with remediation owners.</li>
          </ul>
          <p><span class="highlight">Business impact:</span> Lower MTTR, fewer escalations, and higher reliability.</p>
        `,
      },
    ],
    authorNote:
      "Runbooks work when they reduce ambiguity. I tie steps to signals and make rollback explicit.",
  },
  {
    slug: "internal-ai-adoption-kit",
    title: "Internal AI Adoption Kit (FAQ + training)",
    summary:
      "An internal enablement kit for Microsoft 365 Copilot + Azure AI Foundry rollouts across enterprise teams.",
    cardDescription:
      "FAQ, training, and change support for safe internal adoption.",
    category: "enablement",
    tags: ["Training", "Change", "FAQ"],
    accent: "#f59e0b",
    meta: [
      { label: "Doc type", value: "FAQ + training kit" },
      { label: "Primary users", value: "Enterprise teams, HR, enablement" },
      { label: "Success metric", value: "Adoption across 3 departments" },
      { label: "Artifacts", value: "FAQ, workshop agenda" },
    ],
    sections: [
      {
        title: "0. Why this guide exists",
        body: `
          <p>Internal AI adoption fails when teams are unsure what is safe, what is allowed, and who to ask. This kit supports <span class="highlight">Microsoft 365 Copilot + Azure AI Foundry</span> rollouts with clear guidance and shared language.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Problem</strong>
              <p>Adoption is fragmented and risk perception varies by team.</p>
            </div>
            <div class="card">
              <strong>Outcome</strong>
              <p>Higher adoption with fewer policy escalations.</p>
            </div>
            <div class="card">
              <strong>Goal</strong>
              <p><span class="highlight">Confidence at scale</span>.</p>
            </div>
          </div>
        `,
      },
      {
        title: "1. Mental model (Policy -> Enablement -> Daily work)",
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Policy</strong>
              <p><span class="highlight">Leadership layer</span>. Defines what is allowed.</p>
            </div>
            <div class="card">
              <strong>Enablement</strong>
              <p><span class="highlight">Training layer</span>. Turns policy into usable workflows.</p>
            </div>
            <div class="card">
              <strong>Daily work</strong>
              <p><span class="highlight">Employee layer</span>. Uses Copilot inside approved boundaries.</p>
            </div>
          </div>
          <figure class="diagram">
            <svg viewBox="0 0 720 160" role="img" aria-label="Policy to Enablement to Daily Work">
              <rect x="40" y="40" width="180" height="60" rx="12" />
              <text x="130" y="76" text-anchor="middle" class="diagram-label">Policy</text>
              <rect x="270" y="40" width="180" height="60" rx="12" />
              <text x="360" y="76" text-anchor="middle" class="diagram-label">Enablement</text>
              <rect x="500" y="40" width="180" height="60" rx="12" />
              <text x="590" y="76" text-anchor="middle" class="diagram-label">Daily work</text>
              <path d="M220 70H270" class="diagram-line" />
              <path d="M450 70H500" class="diagram-line" />
              <path d="M270 70l-8-6v12z" class="diagram-arrow" />
              <path d="M500 70l-8-6v12z" class="diagram-arrow" />
            </svg>
            <figcaption>Policy becomes enablement, then turns into daily work patterns.</figcaption>
          </figure>
        `,
      },
      {
        title: "2. Rollout goals (governance first)",
        body: `
          <ul>
            <li>Establish clear boundaries for safe use.</li>
            <li>Provide approved templates for common tasks.</li>
            <li>Reduce fear with hands-on support.</li>
          </ul>
        `,
      },
      {
        title: "3. Training agenda (isolation and safety)",
        body: `
          <ol>
            <li>Orientation: what Copilot can and cannot do.</li>
            <li>Hands-on lab with approved workflows.</li>
            <li>Prompt clinic and feedback loop.</li>
          </ol>
          <figure class="media-shot">
            <img src="/images/portfolio/internal-adoption/training-agenda.svg" alt="Training agenda and lab setup." />
            <figcaption>Training agenda and lab setup.</figcaption>
          </figure>
        `,
      },
      {
        title: "4. FAQ highlights (learning before building)",
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
        title: "5. Office hours + support (proof of access)",
        body: `
          <ul>
            <li>Weekly office hours with SMEs.</li>
            <li>Monthly prompt review sessions.</li>
            <li>Internal showcase of approved use cases.</li>
          </ul>
        `,
      },
      {
        title: "6. Guardrails and limits (preventing early failures)",
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Safe templates</strong>
              <p>Approved prompts embedded in training kits.</p>
            </div>
            <div class="card">
              <strong>Data boundaries</strong>
              <p>Clear list of allowed and prohibited data types.</p>
            </div>
            <div class="card">
              <strong>Escalation</strong>
              <p>Who to contact when a use case is unclear.</p>
            </div>
          </div>
          <figure class="media-shot">
            <img src="/images/portfolio/internal-adoption/guardrails-boundaries.svg" alt="Guardrails with safe templates and data boundaries." />
            <figcaption>Guardrails with safe templates and data boundaries.</figcaption>
          </figure>
        `,
      },
      {
        title: "7. Common failure modes (what breaks in real orgs)",
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Shadow usage</strong>
              <p>Employees test outside approved channels.</p>
            </div>
            <div class="card">
              <strong>Policy confusion</strong>
              <p>Mixed messages from leadership and IT.</p>
            </div>
            <div class="card">
              <strong>Low confidence</strong>
              <p>Fear of mistakes slows adoption.</p>
            </div>
          </div>
        `,
      },
      {
        title: "8. What \"ready\" actually means",
        body: `
          <ul>
            <li><strong>Training:</strong> At least 2 sessions per department completed.</li>
            <li><strong>FAQ:</strong> Published and linked from internal portal.</li>
            <li><strong>Support:</strong> Office hours and escalation contacts active.</li>
            <li><strong>Measurement:</strong> Adoption and confidence tracked quarterly.</li>
          </ul>
          <p><span class="highlight">Business impact:</span> Higher adoption, fewer escalations, and faster change maturity.</p>
        `,
      },
    ],
    authorNote:
      "Adoption is a change problem, not a feature problem. I build kits that turn curiosity into responsible use.",
  },
  {
    slug: "change-communication-brief",
    title: "Change Communication Brief (exec + ICs)",
    summary:
      "A Microsoft ecosystem change-brief for executives and employees during AI rollout.",
    cardDescription:
      "Executive narrative plus IC talk tracks for AI adoption.",
    category: "enablement",
    tags: ["Comms", "Exec", "Enablement"],
    accent: "#3b82f6",
    meta: [
      { label: "Doc type", value: "Change comms brief" },
      { label: "Primary users", value: "Executives, internal comms" },
      { label: "Success metric", value: "Aligned message adoption" },
      { label: "Artifacts", value: "Talk track, FAQ, email draft" },
    ],
    sections: [
      {
        title: "0. Why this guide exists",
        body: `
          <p>AI rollouts fail when messaging is vague or inconsistent. This brief provides <span class="highlight">Microsoft-first</span> executive and employee communications for a safe AI adoption program.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Problem</strong>
              <p>Rumor loops and unclear direction slow adoption.</p>
            </div>
            <div class="card">
              <strong>Outcome</strong>
              <p>Aligned messaging, higher trust, and fewer escalations.</p>
            </div>
            <div class="card">
              <strong>Goal</strong>
              <p><span class="highlight">One narrative</span> across leadership and teams.</p>
            </div>
          </div>
        `,
      },
      {
        title: "1. Message architecture (Why -> What -> How)",
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Why</strong>
              <p>AI reduces friction and improves quality for teams.</p>
            </div>
            <div class="card">
              <strong>What</strong>
              <p>Copilot + Foundry with safe usage standards and training.</p>
            </div>
            <div class="card">
              <strong>How</strong>
              <p>Phased rollout with clear boundaries and escalation paths.</p>
            </div>
          </div>
          <figure class="diagram">
            <svg viewBox="0 0 720 160" role="img" aria-label="Why to What to How">
              <rect x="40" y="40" width="180" height="60" rx="12" />
              <text x="130" y="76" text-anchor="middle" class="diagram-label">Why</text>
              <rect x="270" y="40" width="180" height="60" rx="12" />
              <text x="360" y="76" text-anchor="middle" class="diagram-label">What</text>
              <rect x="500" y="40" width="180" height="60" rx="12" />
              <text x="590" y="76" text-anchor="middle" class="diagram-label">How</text>
              <path d="M220 70H270" class="diagram-line" />
              <path d="M450 70H500" class="diagram-line" />
              <path d="M270 70l-8-6v12z" class="diagram-arrow" />
              <path d="M500 70l-8-6v12z" class="diagram-arrow" />
            </svg>
            <figcaption>One narrative from purpose to rollout mechanics.</figcaption>
          </figure>
        `,
      },
      {
        title: "2. Executive statement (governance first)",
        body: `
          <p><strong>Short message:</strong> We are adopting AI to remove friction, not to replace people. Every team will receive support, training, and clear boundaries for safe usage.</p>
          <p><strong>Proof points:</strong> faster response time, improved quality checks, clearer documentation.</p>
          <figure class="media-shot">
            <img src="/images/portfolio/change-comms/executive-statement.svg" alt="Executive statement preview with key points." />
            <figcaption>Executive statement preview.</figcaption>
          </figure>
        `,
      },
      {
        title: "3. Employee talk track (isolation and safety)",
        body: `
          <ol>
            <li>AI is an assistant, not a decision-maker.</li>
            <li>Safe usage is built into the tools you already use.</li>
            <li>Every employee can opt into training and support.</li>
          </ol>
          <figure class="media-shot">
            <img src="/images/portfolio/change-comms/employee-talk-track.svg" alt="Employee talk track checklist." />
            <figcaption>Employee talk track checklist.</figcaption>
          </figure>
        `,
      },
      {
        title: "4. FAQ highlights (learning before building)",
        body: `
          <ul>
            <li>What data can I use with Copilot?</li>
            <li>What happens if AI makes a mistake?</li>
            <li>Where do I ask for help?</li>
          </ul>
        `,
      },
      {
        title: "5. Channel plan (proof of access)",
        body: `
          <p><strong>Outcome:</strong> Every team hears the same message at the right time.</p>
          <ul>
            <li>Exec email announcement + FAQ link.</li>
            <li>Team lead briefings with slide deck.</li>
            <li>Follow-up Q&A sessions at 30 and 60 days.</li>
          </ul>
          <figure class="media-shot">
            <img src="/images/portfolio/change-comms/channel-plan.svg" alt="Channel plan with cadence across exec, leads, and Q&A." />
            <figcaption>Channel plan and cadence.</figcaption>
          </figure>
        `,
      },
      {
        title: "6. Guardrails and limits (preventing early failures)",
        body: `
          <p>Messaging must make guardrails visible, not hidden:</p>
          <ul>
            <li>Clear policy boundaries in every channel.</li>
            <li>Escalation path linked in all comms.</li>
            <li>Safe-use examples included with every update.</li>
          </ul>
          <figure class="media-shot">
            <img src="/images/portfolio/change-comms/guardrails-messaging.svg" alt="Guardrails messaging checklist for communications." />
            <figcaption>Guardrails included in messaging.</figcaption>
          </figure>
        `,
      },
      {
        title: "7. Common failure modes (what breaks in real orgs)",
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Mixed messaging</strong>
              <p>Teams hear different rules from different leaders.</p>
            </div>
            <div class="card">
              <strong>Fear loops</strong>
              <p>Employees avoid AI due to unclear expectations.</p>
            </div>
            <div class="card">
              <strong>Overpromising</strong>
              <p>Leaders promise outcomes the platform cannot deliver.</p>
            </div>
          </div>
        `,
      },
      {
        title: "8. What \"ready\" actually means",
        body: `
          <ul>
            <li><strong>Alignment:</strong> Exec and IC messages share the same narrative.</li>
            <li><strong>Support:</strong> FAQ and escalation path are published.</li>
            <li><strong>Cadence:</strong> Updates scheduled at 30/60/90 days.</li>
            <li><strong>Measurement:</strong> Adoption and sentiment tracked.</li>
          </ul>
          <p><span class="highlight">Business impact:</span> Higher trust and smoother adoption across teams.</p>
        `,
      },
    ],
    authorNote:
      "Clear internal messaging prevents rumor loops. I write for real questions, not abstract alignment statements.",
  },
  {
    slug: "model-evaluation-report",
    title: "Model Evaluation Report",
    summary:
      "A SageMaker + Bedrock evaluation report that blends metrics, cost, and risk into a decision-ready brief.",
    cardDescription:
      "Decision-ready evaluation with metrics, risk, and recommendation.",
    category: "policy",
    tags: ["Metrics", "Strategy", "Evaluation"],
    accent: "#6366f1",
    meta: [
      { label: "Doc type", value: "Evaluation report" },
      { label: "Primary users", value: "ML leads, product, compliance" },
      { label: "Success metric", value: "Decision-ready comparison" },
      { label: "Artifacts", value: "Metric table, recommendations" },
    ],
    sections: [
      {
        title: "0. Why this guide exists",
        body: `
          <p>Model selection decisions fail when they are based on anecdotes. This report uses <span class="highlight">SageMaker evaluation + Bedrock models</span> to deliver a decision-ready comparison.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Problem</strong>
              <p>Teams pick models without measurable tradeoffs.</p>
            </div>
            <div class="card">
              <strong>Outcome</strong>
              <p>Clear recommendation with cost, latency, and risk visibility.</p>
            </div>
            <div class="card">
              <strong>Goal</strong>
              <p><span class="highlight">Decision clarity</span> for leadership.</p>
            </div>
          </div>
        `,
      },
      {
        title: "1. Evaluation model (Tasks -> Metrics -> Risk)",
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Tasks</strong>
              <p>Customer support summarization, classification, and rewrite.</p>
            </div>
            <div class="card">
              <strong>Metrics</strong>
              <p>Accuracy, latency, cost per call, refusal rate.</p>
            </div>
            <div class="card">
              <strong>Risk</strong>
              <p>PII leakage, hallucination rate, compliance flags.</p>
            </div>
          </div>
          <figure class="diagram">
            <svg viewBox="0 0 720 160" role="img" aria-label="Tasks to Metrics to Risk to Decision">
              <rect x="30" y="40" width="150" height="60" rx="12" />
              <text x="105" y="76" text-anchor="middle" class="diagram-label">Tasks</text>
              <rect x="205" y="40" width="150" height="60" rx="12" />
              <text x="280" y="76" text-anchor="middle" class="diagram-label">Metrics</text>
              <rect x="380" y="40" width="150" height="60" rx="12" />
              <text x="455" y="76" text-anchor="middle" class="diagram-label">Risk</text>
              <rect x="555" y="40" width="150" height="60" rx="12" />
              <text x="630" y="76" text-anchor="middle" class="diagram-label">Decision</text>
              <path d="M180 70H205" class="diagram-line" />
              <path d="M355 70H380" class="diagram-line" />
              <path d="M530 70H555" class="diagram-line" />
              <path d="M205 70l-8-6v12z" class="diagram-arrow" />
              <path d="M380 70l-8-6v12z" class="diagram-arrow" />
              <path d="M555 70l-8-6v12z" class="diagram-arrow" />
            </svg>
            <figcaption>Evaluation moves from tasks to metrics to risk and ends in a decision.</figcaption>
          </figure>
        `,
      },
      {
        title: "2. Scope and baseline (governance first)",
        body: `
          <p><span class="highlight">Decision focus:</span> cost, latency, and risk profile for high-volume support workflows.</p>
          <figure class="media-shot">
            <img src="/images/portfolio/model-eval/evaluation-scope.svg" alt="Evaluation dataset scope and task coverage." />
            <figcaption>Evaluation dataset and scope.</figcaption>
          </figure>
        `,
      },
      {
        title: "3. Metrics snapshot (isolation and safety)",
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
        title: "4. Qualitative review (learning before building)",
        body: `
          <ul>
            <li>Model A more consistent with guardrail prompts.</li>
            <li>Model B more verbose but higher hallucination risk.</li>
            <li>Model A meets SLA without retries.</li>
          </ul>
        `,
      },
      {
        title: "5. Cost and latency impact (proof of access)",
        body: `
          <ul>
            <li>Model A reduces monthly cost by 28% at current volume.</li>
            <li>Model B increases latency beyond SLA on 12% of calls.</li>
          </ul>
        `,
      },
      {
        title: "6. Guardrails and limits (preventing early failures)",
        body: `
          <p>Both models require prompt guardrails, but Model B needs stricter refusal handling.</p>
          <figure class="media-shot">
            <img src="/images/portfolio/model-eval/guardrails-risk.svg" alt="Guardrails and risk handling summary." />
            <figcaption>Guardrails and risk handling.</figcaption>
          </figure>
        `,
      },
      {
        title: "7. Common failure modes (what breaks in real orgs)",
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Overweighting accuracy</strong>
              <p>Ignoring latency and cost until production.</p>
            </div>
            <div class="card">
              <strong>Ignoring risk</strong>
              <p>Hallucination and PII leakage untested.</p>
            </div>
            <div class="card">
              <strong>No refresh cadence</strong>
              <p>Evaluations become stale within weeks.</p>
            </div>
          </div>
        `,
      },
      {
        title: "8. What \"ready\" actually means",
        body: `
          <ul>
            <li><strong>Decision:</strong> Model selected with written rationale.</li>
            <li><strong>Risk:</strong> Guardrails and refusal handling documented.</li>
            <li><strong>Cadence:</strong> Quarterly re-evaluation scheduled.</li>
            <li><strong>Ownership:</strong> Evaluation owner assigned.</li>
          </ul>
          <p><span class="highlight">Business impact:</span> Faster decisions with fewer production reversals.</p>
        `,
      },
    ],
    authorNote:
      "Evaluation reports should read like executive briefs. The reader needs a decision, not a data dump.",
  },
  {
    slug: "prompt-safety-checklist",
    title: "Prompt Safety Checklist",
    summary:
      "A Bedrock Guardrails checklist for prompt design, review, and governance.",
    cardDescription:
      "A reusable checklist for prompt design, review, and governance.",
    category: "policy",
    tags: ["Prompts", "Safety", "Review"],
    accent: "#10b981",
    meta: [
      { label: "Doc type", value: "Checklist + governance" },
      { label: "Primary users", value: "Prompt designers, reviewers" },
      { label: "Success metric", value: "Consistent prompt reviews" },
      { label: "Artifacts", value: "Checklist, review log" },
    ],
    sections: [
      {
        title: "0. Why this guide exists",
        body: `
          <p>Prompts are a policy surface. This checklist uses <span class="highlight">Bedrock Guardrails</span> to keep prompts safe, reviewable, and consistent across teams.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Problem</strong>
              <p>Prompts change without review, causing policy drift.</p>
            </div>
            <div class="card">
              <strong>Outcome</strong>
              <p>Consistent prompt quality and fewer unsafe outputs.</p>
            </div>
            <div class="card">
              <strong>Goal</strong>
              <p><span class="highlight">Reviewable prompts</span> at scale.</p>
            </div>
          </div>
        `,
      },
      {
        title: "1. Guardrails model (Policy -> Prompt -> Review)",
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Policy</strong>
              <p><span class="highlight">Leadership layer</span> defines limits.</p>
            </div>
            <div class="card">
              <strong>Prompt</strong>
              <p><span class="highlight">Developer layer</span> implements safe defaults.</p>
            </div>
            <div class="card">
              <strong>Review</strong>
              <p><span class="highlight">Enablement layer</span> validates and logs.</p>
            </div>
          </div>
          <figure class="diagram">
            <svg viewBox="0 0 720 160" role="img" aria-label="Prompt to Guardrails to Review Log">
              <rect x="40" y="40" width="180" height="60" rx="12" />
              <text x="130" y="76" text-anchor="middle" class="diagram-label">Prompt</text>
              <rect x="270" y="40" width="180" height="60" rx="12" />
              <text x="360" y="76" text-anchor="middle" class="diagram-label">Guardrails</text>
              <rect x="500" y="40" width="180" height="60" rx="12" />
              <text x="590" y="76" text-anchor="middle" class="diagram-label">Review log</text>
              <path d="M220 70H270" class="diagram-line" />
              <path d="M450 70H500" class="diagram-line" />
              <path d="M270 70l-8-6v12z" class="diagram-arrow" />
              <path d="M500 70l-8-6v12z" class="diagram-arrow" />
            </svg>
            <figcaption>Prompts pass through guardrails and end in an auditable review log.</figcaption>
          </figure>
        `,
      },
      {
        title: "2. When to use this (governance first)",
        body: `
          <ul>
            <li>New prompt templates for production workflows.</li>
            <li>High-risk prompts involving customers or sensitive data.</li>
            <li>Cross-team prompt reuse.</li>
          </ul>
        `,
      },
      {
        title: "3. Checklist (isolation and safety)",
        body: `
          <ol>
            <li>Does the prompt avoid PII or restricted data?</li>
            <li>Is the output expectation explicit and measurable?</li>
            <li>Are constraints visible to the model?</li>
            <li>Is there a fallback for uncertainty or refusal?</li>
            <li>Has this prompt been reviewed and logged?</li>
          </ol>
        `,
      },
      {
        title: "4. Review protocol (learning before building)",
        body: `
          <p><strong>Outcome:</strong> Every prompt change is auditable before release.</p>
          <ul>
            <li>Assign an owner and reviewer for every prompt.</li>
            <li>Run tests with edge cases before approval.</li>
            <li>Log approval date and next review date.</li>
          </ul>
          <figure class="media-shot">
            <img src="/images/portfolio/prompt-safety/review-log.svg" alt="Prompt review log with approval status." />
            <figcaption>Prompt review log.</figcaption>
          </figure>
        `,
      },
      {
        title: "5. Guardrails alignment (proof of access)",
        body: `
          <p>Ensure prompts align with Bedrock Guardrails categories and thresholds.</p>
          <figure class="media-shot">
            <img src="/images/portfolio/prompt-safety/guardrails-alignment.svg" alt="Prompt constraints aligned with guardrail categories." />
            <figcaption>Guardrails alignment with prompt constraints.</figcaption>
          </figure>
        `,
      },
      {
        title: "6. Guardrails and limits (preventing early failures)",
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Policy mapping</strong>
              <p>Prompt constraints align to guardrail categories.</p>
            </div>
            <div class="card">
              <strong>Version pinning</strong>
              <p>Prompt changes require review and release notes.</p>
            </div>
            <div class="card">
              <strong>Logging</strong>
              <p>All exceptions logged for audit.</p>
            </div>
          </div>
        `,
      },
      {
        title: "7. Common failure modes (what breaks in real orgs)",
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Unbounded prompts</strong>
              <p>Constraints are missing or unclear.</p>
            </div>
            <div class="card">
              <strong>No review trail</strong>
              <p>Prompts cannot be audited after incidents.</p>
            </div>
            <div class="card">
              <strong>Misaligned guardrails</strong>
              <p>Prompts conflict with policy filters.</p>
            </div>
          </div>
        `,
      },
      {
        title: "8. What \"ready\" actually means",
        body: `
          <ul>
            <li><strong>Review:</strong> Prompt owners and reviewers assigned.</li>
            <li><strong>Policy:</strong> Guardrails aligned to org rules.</li>
            <li><strong>Logging:</strong> Exceptions recorded and reviewed.</li>
            <li><strong>Cadence:</strong> Quarterly prompt audits scheduled.</li>
          </ul>
          <p><span class="highlight">Business impact:</span> Lower risk and higher trust in AI outputs.</p>
        `,
      },
    ],
    authorNote:
      "A checklist is a training tool. I write it so a new team member can understand the intent in one pass.",
  },
  {
    slug: "ai-knowledge-base-audit",
    title: "AI Knowledge Base Audit",
    summary:
      "A Confluence + Jira audit to reduce AI documentation drift and improve findability.",
    cardDescription:
      "Audit plan for AI docs with ownership, cleanup, and governance.",
    category: "enablement",
    tags: ["Audit", "Information", "Enablement"],
    accent: "#60a5fa",
    meta: [
      { label: "Doc type", value: "Content audit + remediation plan" },
      { label: "Primary users", value: "Support, enablement, knowledge teams" },
      { label: "Success metric", value: "Reduced duplicate answers" },
      { label: "Artifacts", value: "Audit map, cleanup backlog" },
    ],
    sections: [
      {
        title: "0. Why this guide exists",
        body: `
          <p>AI documentation decays fast. This audit framework uses <span class="highlight">Confluence + Jira</span> to keep knowledge current, findable, and owned.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Problem</strong>
              <p>Conflicting docs create support tickets and mistrust.</p>
            </div>
            <div class="card">
              <strong>Outcome</strong>
              <p>Cleaner knowledge base and fewer duplicate answers.</p>
            </div>
            <div class="card">
              <strong>Goal</strong>
              <p><span class="highlight">Trustworthy docs</span>.</p>
            </div>
          </div>
        `,
      },
      {
        title: "1. Audit model (Inventory -> Scoring -> Remediation)",
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Inventory</strong>
              <p>Catalog AI docs by type, owner, and traffic.</p>
            </div>
            <div class="card">
              <strong>Scoring</strong>
              <p>Score for accuracy, findability, and freshness.</p>
            </div>
            <div class="card">
              <strong>Remediation</strong>
              <p>Prioritize fixes by risk and traffic impact.</p>
            </div>
          </div>
          <figure class="diagram">
            <svg viewBox="0 0 720 160" role="img" aria-label="Inventory to Scoring to Remediation">
              <rect x="40" y="40" width="180" height="60" rx="12" />
              <text x="130" y="76" text-anchor="middle" class="diagram-label">Inventory</text>
              <rect x="270" y="40" width="180" height="60" rx="12" />
              <text x="360" y="76" text-anchor="middle" class="diagram-label">Scoring</text>
              <rect x="500" y="40" width="180" height="60" rx="12" />
              <text x="590" y="76" text-anchor="middle" class="diagram-label">Remediation</text>
              <path d="M220 70H270" class="diagram-line" />
              <path d="M450 70H500" class="diagram-line" />
              <path d="M270 70l-8-6v12z" class="diagram-arrow" />
              <path d="M500 70l-8-6v12z" class="diagram-arrow" />
            </svg>
            <figcaption>Audit moves from inventory to scoring and ends in remediation.</figcaption>
          </figure>
        `,
      },
      {
        title: "2. Audit goals (governance first)",
        body: `
          <ul>
            <li>Remove outdated or conflicting guidance.</li>
            <li>Improve findability for common questions.</li>
            <li>Clarify ownership and review cadence.</li>
          </ul>
        `,
      },
      {
        title: "3. Audit dimensions (isolation and safety)",
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
        title: "4. Remediation workflow (learning before building)",
        body: `
          <ol>
            <li>Tag duplicates and consolidate into the canonical doc.</li>
            <li>Mark outdated sections and request SME review.</li>
            <li>Update navigation and search keywords.</li>
            <li>Create Jira tickets for each remediation item.</li>
          </ol>
          <figure class="media-shot">
            <img src="/images/portfolio/knowledge-audit/remediation-workflow.svg" alt="Confluence audit table mapped to Jira remediation tickets." />
            <figcaption>Confluence audit table and Jira remediation.</figcaption>
          </figure>
        `,
      },
      {
        title: "5. Ownership model (proof of access)",
        body: `
          <ul>
            <li>Assign a doc owner and reviewer.</li>
            <li>Set a review date and reminder cadence.</li>
            <li>Document who approves policy changes.</li>
          </ul>
          <figure class="media-shot">
            <img src="/images/portfolio/knowledge-audit/ownership-cadence.svg" alt="Ownership and review cadence for knowledge base docs." />
            <figcaption>Ownership and review cadence.</figcaption>
          </figure>
        `,
      },
      {
        title: "6. Guardrails and limits (preventing early failures)",
        body: `
          <p>Publish a governance page for AI docs with ownership, review cadence, and escalation.</p>
        `,
      },
      {
        title: "7. Common failure modes (what breaks in real orgs)",
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Orphaned docs</strong>
              <p>No owner, no review date.</p>
            </div>
            <div class="card">
              <strong>Conflicting guidance</strong>
              <p>Multiple sources for the same answer.</p>
            </div>
            <div class="card">
              <strong>Search failure</strong>
              <p>Keywords do not match user language.</p>
            </div>
          </div>
        `,
      },
      {
        title: "8. What \"ready\" actually means",
        body: `
          <ul>
            <li><strong>Inventory:</strong> AI docs catalog is complete.</li>
            <li><strong>Ownership:</strong> Every doc has an owner and review date.</li>
            <li><strong>Remediation:</strong> Jira backlog exists for fixes.</li>
            <li><strong>Cadence:</strong> Quarterly audit schedule published.</li>
          </ul>
          <p><span class="highlight">Business impact:</span> Lower support load and higher doc trust.</p>
        `,
      },
    ],
    authorNote:
      "Audits keep knowledge bases trustworthy. I treat them as product maintenance, not cleanup work.",
  },
  {
    slug: "sdk-migration-guide-v2-to-v3",
    title: "SDK Migration Guide (v2 to v3)",
    summary:
      "An OpenAI SDK v3 migration guide with breaking changes, test plan, and rollback strategy.",
    cardDescription:
      "OpenAI SDK v3 migration with diff table, tests, and rollout plan.",
    category: "technical",
    tags: ["SDK", "Migration", "DevRel"],
    accent: "#0ea5e9",
    meta: [
      { label: "Doc type", value: "Migration guide + release notes" },
      { label: "Primary users", value: "Developers, platform teams" },
      { label: "Success metric", value: "Upgrade without regression" },
      { label: "Artifacts", value: "Diff table, test checklist" },
    ],
    sections: [
      {
        title: "0. Why this guide exists",
        body: `
          <p>SDK upgrades are a trust moment. This guide upgrades teams from <span class="highlight">OpenAI SDK v2 to v3</span> with zero downtime and verified behavior parity.</p>
          <div class="focus-grid">
            <div class="card">
              <strong>Problem</strong>
              <p>Breaking changes cause regressions and surprise outages.</p>
            </div>
            <div class="card">
              <strong>Outcome</strong>
              <p>Stable upgrade with monitored rollout and rollback plan.</p>
            </div>
            <div class="card">
              <strong>Goal</strong>
              <p><span class="highlight">Zero downtime</span> migration.</p>
            </div>
          </div>
        `,
      },
      {
        title: "1. Migration model (Diff -> Tests -> Rollout)",
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Diff</strong>
              <p>Identify breaking changes and API surface updates.</p>
            </div>
            <div class="card">
              <strong>Tests</strong>
              <p>Validate top flows and error mapping.</p>
            </div>
            <div class="card">
              <strong>Rollout</strong>
              <p>Canary first, then staged production.</p>
            </div>
          </div>
          <figure class="diagram">
            <svg viewBox="0 0 720 160" role="img" aria-label="Diff to Tests to Canary to Rollout">
              <rect x="30" y="40" width="150" height="60" rx="12" />
              <text x="105" y="76" text-anchor="middle" class="diagram-label">Diff</text>
              <rect x="205" y="40" width="150" height="60" rx="12" />
              <text x="280" y="76" text-anchor="middle" class="diagram-label">Tests</text>
              <rect x="380" y="40" width="150" height="60" rx="12" />
              <text x="455" y="76" text-anchor="middle" class="diagram-label">Canary</text>
              <rect x="555" y="40" width="150" height="60" rx="12" />
              <text x="630" y="76" text-anchor="middle" class="diagram-label">Rollout</text>
              <path d="M180 70H205" class="diagram-line" />
              <path d="M355 70H380" class="diagram-line" />
              <path d="M530 70H555" class="diagram-line" />
              <path d="M205 70l-8-6v12z" class="diagram-arrow" />
              <path d="M380 70l-8-6v12z" class="diagram-arrow" />
              <path d="M555 70l-8-6v12z" class="diagram-arrow" />
            </svg>
            <figcaption>Migration moves from diff to tests, canary, and full rollout.</figcaption>
          </figure>
        `,
      },
      {
        title: "2. Release overview (governance first)",
        body: `
          <p><span class="highlight">Upgrade goal:</span> zero downtime with verified behavior parity across core flows.</p>
        `,
      },
      {
        title: "3. Breaking changes (isolation and safety)",
        body: `
          <ul>
            <li>Client initialization now uses the new SDK constructor.</li>
            <li>Responses are typed differently across chat endpoints.</li>
            <li>Error structures are normalized and require new handling.</li>
          </ul>
        `,
      },
      {
        title: "4. Migration steps (learning before building)",
        body: `
          <ol>
            <li>Upgrade the SDK and pin the new version.</li>
            <li>Update client initialization and response parsing.</li>
            <li>Validate streaming handlers for new types.</li>
            <li>Run test suite with updated error expectations.</li>
          </ol>
          <figure class="media-shot">
            <img src="/images/portfolio/sdk-migration/diff-table.svg" alt="Diff table highlighting SDK v2 to v3 changes." />
            <figcaption>Diff table for v2 to v3.</figcaption>
          </figure>
        `,
      },
      {
        title: "5. Rollout strategy (proof of access)",
        body: `
          <ul>
            <li>Canary to 5 percent traffic for 48 hours.</li>
            <li>Track latency, error rate, and cost deltas.</li>
            <li>Promote to production once metrics stabilize.</li>
          </ul>
          <figure class="media-shot">
            <img src="/images/portfolio/sdk-migration/rollout-metrics.svg" alt="Rollout metrics dashboard for canary traffic." />
            <figcaption>Rollout metrics dashboard.</figcaption>
          </figure>
        `,
      },
      {
        title: "6. Guardrails and limits (preventing early failures)",
        body: `
          <p>Lock version pins and require rollback approval for high-risk flows.</p>
        `,
      },
      {
        title: "7. Common failure modes (what breaks in real orgs)",
        body: `
          <div class="focus-grid">
            <div class="card">
              <strong>Unpinned versions</strong>
              <p>Upgrades roll into prod without validation.</p>
            </div>
            <div class="card">
              <strong>Test gaps</strong>
              <p>Critical flows not covered in regression suite.</p>
            </div>
            <div class="card">
              <strong>Rollback ignored</strong>
              <p>No clear rollback owner or path.</p>
            </div>
          </div>
        `,
      },
      {
        title: "8. What \"ready\" actually means",
        body: `
          <ul>
            <li><strong>Tests:</strong> Top flows validated with new SDK.</li>
            <li><strong>Rollback:</strong> Version pin rollback path documented.</li>
            <li><strong>Monitoring:</strong> Metrics tracked during rollout.</li>
            <li><strong>Ownership:</strong> Migration owner assigned.</li>
          </ul>
          <p><span class="highlight">Business impact:</span> Reliable upgrades without customer impact.</p>
        `,
      },
    ],
    authorNote:
      "Migration guides are a trust moment. I focus on clarity, testability, and rollback safety.",
  },
];
