export type StepId = 'domain' | 'aiMode' | 'regulation' | 'scale' | 'delivery';

export interface GraphNodeDef {
  id: string;
  label: string;
  group: 'core' | 'domain' | 'ai' | 'risk' | 'infra' | 'delivery';
}

export interface GraphEdgeDef {
  source: string;
  target: string;
  label?: string;
}

export interface StackDef {
  buildInterface?: string[];
  appStack?: string[];
  aiStack?: string[];
  opsStack?: string[];
}

export interface OptionContribution {
  nodes?: GraphNodeDef[];
  edges?: GraphEdgeDef[];
  stack?: StackDef;
  skills?: string[];
  notes?: string[];
}

export interface StepOption {
  value: string;
  label: string;
  description: string;
  contribution: OptionContribution;
}

export interface BuilderStep {
  id: StepId;
  title: string;
  prompt: string;
  options: StepOption[];
}

export interface BuildMappings {
  limits: {
    maxNodes: number;
  };
  base: {
    nodes: GraphNodeDef[];
    edges: GraphEdgeDef[];
    stack: Required<StackDef>;
    skills: string[];
    notes: string[];
    executionPlan: string[];
    glossary: Array<{ term: string; definition: string }>;
  };
  steps: BuilderStep[];
}

export const BUILD_MAPPINGS: BuildMappings = {
  limits: {
    maxNodes: 18,
  },
  base: {
    nodes: [
      { id: 'intent', label: 'Intent', group: 'core' },
    ],
    edges: [],
    stack: {
      buildInterface: ['Git repository', 'Issue template', 'CI checks'],
      appStack: ['Typed API contracts'],
      aiStack: ['Prompt playbook'],
      opsStack: ['Structured logging baseline'],
    },
    skills: ['Constraint writing', 'Validation thinking'],
    notes: ['System initialized: start from intent, then add constraints.'],
    executionPlan: [
      'Phase 1: Clarify intent + constraints (NLPg).',
      'Phase 2: Design architecture from constraints.',
      'Phase 3: Build skeleton (repo + CI + baseline checks).',
      'Phase 4: Implement features in small validated slices.',
      'Phase 5: Evaluate, harden, and instrument.',
      'Phase 6: Ship with observability and feedback loops.',
    ],
    glossary: [
      { term: 'NLP', definition: 'Natural Language Processing: extracting meaning from language.' },
      { term: 'NLPg', definition: 'Natural Language Programming: compiling language into governed execution.' },
      { term: 'Constraint', definition: 'A boundary that keeps build decisions safe and relevant.' },
      { term: 'Blueprint', definition: 'Deterministic architecture and execution plan generated from constraints.' },
    ],
  },
  steps: [
    {
      id: 'domain',
      title: 'Step 1: Domain',
      prompt: 'What kind of system are you building?',
      options: [
        {
          value: 'finance',
          label: 'Finance',
          description: 'High-trust workflows with auditable decisions.',
          contribution: {
            nodes: [
              { id: 'domain-finance', label: 'Finance', group: 'domain' },
              { id: 'risk-scoring', label: 'Risk model', group: 'risk' },
              { id: 'ledger', label: 'Ledger trail', group: 'risk' },
            ],
            edges: [
              { source: 'intent', target: 'domain-finance' },
              { source: 'domain-finance', target: 'risk-scoring' },
              { source: 'domain-finance', target: 'ledger' },
            ],
            stack: {
              appStack: ['Policy-aware service layer'],
              opsStack: ['Immutable event store'],
            },
            skills: ['Risk framing', 'Decision traceability'],
            notes: ['Constraint added: Finance -> every decision path must be reviewable.'],
          },
        },
        {
          value: 'healthcare',
          label: 'Healthcare',
          description: 'Safety-sensitive workflows with strict boundaries.',
          contribution: {
            nodes: [
              { id: 'domain-healthcare', label: 'Healthcare', group: 'domain' },
              { id: 'clinical-check', label: 'Clinical check', group: 'risk' },
              { id: 'phi-guard', label: 'PHI guard', group: 'risk' },
            ],
            edges: [
              { source: 'intent', target: 'domain-healthcare' },
              { source: 'domain-healthcare', target: 'clinical-check' },
              { source: 'domain-healthcare', target: 'phi-guard' },
            ],
            stack: {
              opsStack: ['Data retention controls'],
            },
            skills: ['Safety case design', 'Privacy boundaries'],
            notes: ['Constraint added: Healthcare -> human override and data boundaries are mandatory.'],
          },
        },
        {
          value: 'education',
          label: 'Education',
          description: 'Feedback-driven learning experiences.',
          contribution: {
            nodes: [
              { id: 'domain-education', label: 'Education', group: 'domain' },
              { id: 'curriculum-map', label: 'Curriculum map', group: 'delivery' },
            ],
            edges: [
              { source: 'intent', target: 'domain-education' },
              { source: 'domain-education', target: 'curriculum-map' },
            ],
            stack: {
              appStack: ['Content versioning'],
            },
            skills: ['Outcome definition'],
            notes: ['Constraint added: Education -> quality is measured by learning outcomes, not generation volume.'],
          },
        },
        {
          value: 'internal-tooling',
          label: 'Internal Tooling',
          description: 'Workflow speed with guardrails for teams.',
          contribution: {
            nodes: [
              { id: 'domain-internal', label: 'Internal', group: 'domain' },
              { id: 'workflow-ops', label: 'Workflow ops', group: 'delivery' },
            ],
            edges: [
              { source: 'intent', target: 'domain-internal' },
              { source: 'domain-internal', target: 'workflow-ops' },
            ],
            stack: {
              buildInterface: ['Monorepo workflow docs'],
              opsStack: ['Team-level usage analytics'],
            },
            skills: ['Workflow decomposition'],
            notes: ['Constraint added: Internal tooling -> optimize for adoption friction, not feature count.'],
          },
        },
        {
          value: 'saas',
          label: 'SaaS',
          description: 'Multi-tenant product constraints.',
          contribution: {
            nodes: [
              { id: 'domain-saas', label: 'SaaS', group: 'domain' },
              { id: 'tenant-boundary', label: 'Tenant boundary', group: 'risk' },
              { id: 'billing-model', label: 'Billing model', group: 'delivery' },
            ],
            edges: [
              { source: 'intent', target: 'domain-saas' },
              { source: 'domain-saas', target: 'tenant-boundary' },
              { source: 'domain-saas', target: 'billing-model' },
            ],
            stack: {
              appStack: ['Tenant-aware backend'],
              opsStack: ['Usage metering'],
            },
            skills: ['Service boundaries', 'Monetization constraints'],
            notes: ['Constraint added: SaaS -> isolation and billing semantics shape architecture early.'],
          },
        },
        {
          value: 'custom',
          label: 'Custom',
          description: 'Bring your own context and boundaries.',
          contribution: {
            nodes: [
              { id: 'domain-custom', label: 'Custom', group: 'domain' },
              { id: 'context-brief', label: 'Context brief', group: 'delivery' },
            ],
            edges: [
              { source: 'intent', target: 'domain-custom' },
              { source: 'domain-custom', target: 'context-brief' },
            ],
            stack: {
              buildInterface: ['Decision log template'],
            },
            skills: ['Problem framing'],
            notes: ['Constraint added: Custom domain -> capture assumptions before implementation starts.'],
          },
        },
      ],
    },
    {
      id: 'aiMode',
      title: 'Step 2: AI Mode',
      prompt: 'How much autonomy should AI have?',
      options: [
        {
          value: 'no-ai',
          label: 'No AI',
          description: 'Deterministic software only.',
          contribution: {
            nodes: [
              { id: 'mode-deterministic', label: 'Deterministic', group: 'ai' },
            ],
            edges: [
              { source: 'intent', target: 'mode-deterministic' },
            ],
            stack: {
              aiStack: ['Rule engine (no model runtime)'],
            },
            skills: ['Specification rigor'],
            notes: ['AI mode selected: No AI -> reliability comes from deterministic logic.'],
          },
        },
        {
          value: 'assisted-ai',
          label: 'Assisted AI',
          description: 'Human-in-the-loop support system.',
          contribution: {
            nodes: [
              { id: 'mode-assisted', label: 'Assisted AI', group: 'ai' },
              { id: 'prompt-contract', label: 'Prompt contract', group: 'ai' },
              { id: 'eval-loop', label: 'Eval loop', group: 'ai' },
            ],
            edges: [
              { source: 'intent', target: 'mode-assisted' },
              { source: 'mode-assisted', target: 'prompt-contract' },
              { source: 'mode-assisted', target: 'eval-loop' },
            ],
            stack: {
              aiStack: ['Retrieval + prompting', 'Evaluation harness'],
            },
            skills: ['Prompt design', 'Evaluation design'],
            notes: ['AI mode selected: Assisted AI -> human review remains the control plane.'],
          },
        },
        {
          value: 'autonomous-ai',
          label: 'Autonomous AI',
          description: 'Automated action loops with strict safeguards.',
          contribution: {
            nodes: [
              { id: 'mode-autonomous', label: 'Autonomous AI', group: 'ai' },
              { id: 'policy-gate', label: 'Policy gate', group: 'risk' },
              { id: 'rollback', label: 'Rollback', group: 'risk' },
            ],
            edges: [
              { source: 'intent', target: 'mode-autonomous' },
              { source: 'mode-autonomous', target: 'policy-gate' },
              { source: 'mode-autonomous', target: 'rollback' },
            ],
            stack: {
              aiStack: ['Tool orchestration runtime', 'Online safety classifiers'],
              opsStack: ['Automated rollback policy'],
            },
            skills: ['Failure-mode analysis', 'Guardrail design'],
            notes: ['AI mode selected: Autonomous AI -> enforce approvals, kill-switches, and rollback paths.'],
          },
        },
      ],
    },
    {
      id: 'regulation',
      title: 'Step 3: Regulation',
      prompt: 'What level of compliance pressure exists?',
      options: [
        {
          value: 'low',
          label: 'Low',
          description: 'Light controls with baseline auditability.',
          contribution: {
            nodes: [
              { id: 'reg-low', label: 'Baseline controls', group: 'risk' },
            ],
            edges: [
              { source: 'intent', target: 'reg-low' },
            ],
            stack: {
              opsStack: ['Basic audit logs'],
            },
            skills: ['Baseline governance'],
            notes: ['Constraint added: Low regulation -> baseline evidence collection is still required.'],
          },
        },
        {
          value: 'moderate',
          label: 'Moderate',
          description: 'Traceability and policy checks required.',
          contribution: {
            nodes: [
              { id: 'reg-moderate', label: 'Policy checks', group: 'risk' },
              { id: 'audit-trail', label: 'Audit trail', group: 'risk' },
            ],
            edges: [
              { source: 'intent', target: 'reg-moderate' },
              { source: 'reg-moderate', target: 'audit-trail' },
            ],
            stack: {
              opsStack: ['Policy-as-code checks', 'Audit dashboards'],
            },
            skills: ['Policy translation'],
            notes: ['Constraint added: Moderate regulation -> policy checks move into CI and runtime.'],
          },
        },
        {
          value: 'strict',
          label: 'Strict',
          description: 'Strong controls, approvals, and evidence.',
          contribution: {
            nodes: [
              { id: 'reg-strict', label: 'Strict controls', group: 'risk' },
              { id: 'approval-gate', label: 'Approval gate', group: 'risk' },
              { id: 'data-lineage', label: 'Data lineage', group: 'risk' },
            ],
            edges: [
              { source: 'intent', target: 'reg-strict' },
              { source: 'reg-strict', target: 'approval-gate' },
              { source: 'reg-strict', target: 'data-lineage' },
            ],
            stack: {
              opsStack: ['Immutable audit ledger', 'Key management and secrets policy'],
            },
            skills: ['Compliance architecture', 'Evidence-driven delivery'],
            notes: ['Constraint added: Strict regulation -> approval workflow and lineage are first-class architecture nodes.'],
          },
        },
      ],
    },
    {
      id: 'scale',
      title: 'Step 4: Scale',
      prompt: 'How far should this system scale?',
      options: [
        {
          value: 'prototype',
          label: 'Prototype',
          description: 'Fast learning with controlled scope.',
          contribution: {
            nodes: [
              { id: 'scale-prototype', label: 'Prototype', group: 'infra' },
            ],
            edges: [
              { source: 'intent', target: 'scale-prototype' },
            ],
            stack: {
              appStack: ['Single deploy target'],
              opsStack: ['Light observability'],
            },
            skills: ['Rapid iteration'],
            notes: ['Scale selected: Prototype -> optimize for learning speed and fast reversibility.'],
          },
        },
        {
          value: 'team',
          label: 'Team',
          description: 'Collaborative delivery with shared ownership.',
          contribution: {
            nodes: [
              { id: 'scale-team', label: 'Team scale', group: 'infra' },
              { id: 'service-slo', label: 'SLOs', group: 'infra' },
            ],
            edges: [
              { source: 'intent', target: 'scale-team' },
              { source: 'scale-team', target: 'service-slo' },
            ],
            stack: {
              buildInterface: ['Branch protection + release rules'],
              opsStack: ['Telemetry dashboard + alerts'],
            },
            skills: ['Service reliability basics'],
            notes: ['Scale selected: Team -> codify release checks and service objectives.'],
          },
        },
        {
          value: 'internet-scale',
          label: 'Internet-scale',
          description: 'High traffic, cost discipline, and resilience.',
          contribution: {
            nodes: [
              { id: 'scale-internet', label: 'Internet scale', group: 'infra' },
              { id: 'autoscaling', label: 'Autoscaling', group: 'infra' },
              { id: 'cost-guard', label: 'Cost guard', group: 'infra' },
            ],
            edges: [
              { source: 'intent', target: 'scale-internet' },
              { source: 'scale-internet', target: 'autoscaling' },
              { source: 'scale-internet', target: 'cost-guard' },
            ],
            stack: {
              appStack: ['Stateless service boundaries'],
              opsStack: ['Distributed tracing', 'Cost anomaly alerts'],
            },
            skills: ['Scalability planning', 'Cost-aware architecture'],
            notes: ['Scale selected: Internet-scale -> throughput, resilience, and cost become co-equal constraints.'],
          },
        },
      ],
    },
    {
      id: 'delivery',
      title: 'Step 5: Delivery',
      prompt: 'What is the primary delivery form?',
      options: [
        {
          value: 'web-app',
          label: 'Web app',
          description: 'UI-first product surface.',
          contribution: {
            nodes: [
              { id: 'delivery-web', label: 'Web app', group: 'delivery' },
              { id: 'ui-state', label: 'UI state', group: 'delivery' },
            ],
            edges: [
              { source: 'intent', target: 'delivery-web' },
              { source: 'delivery-web', target: 'ui-state' },
            ],
            stack: {
              appStack: ['Astro/React frontend shell'],
            },
            skills: ['UI composition'],
            notes: ['Delivery selected: Web app -> interaction quality and state design drive adoption.'],
          },
        },
        {
          value: 'api-service',
          label: 'API service',
          description: 'Reliable programmatic interface.',
          contribution: {
            nodes: [
              { id: 'delivery-api', label: 'API service', group: 'delivery' },
              { id: 'schema-contract', label: 'Schema contract', group: 'delivery' },
            ],
            edges: [
              { source: 'intent', target: 'delivery-api' },
              { source: 'delivery-api', target: 'schema-contract' },
            ],
            stack: {
              appStack: ['Typed endpoint layer'],
              opsStack: ['API latency/error dashboards'],
            },
            skills: ['API literacy'],
            notes: ['Delivery selected: API service -> schema discipline prevents downstream chaos.'],
          },
        },
        {
          value: 'data-pipeline',
          label: 'Data pipeline',
          description: 'Batch/stream processing workflow.',
          contribution: {
            nodes: [
              { id: 'delivery-pipeline', label: 'Pipeline', group: 'delivery' },
              { id: 'data-quality', label: 'Data quality', group: 'risk' },
            ],
            edges: [
              { source: 'intent', target: 'delivery-pipeline' },
              { source: 'delivery-pipeline', target: 'data-quality' },
            ],
            stack: {
              opsStack: ['Pipeline observability'],
            },
            skills: ['Data quality thinking'],
            notes: ['Delivery selected: Data pipeline -> monitor drift and data quality as production signals.'],
          },
        },
        {
          value: 'agent-workflow',
          label: 'Agent workflow',
          description: 'Tool-using execution loops.',
          contribution: {
            nodes: [
              { id: 'delivery-agent', label: 'Agent flow', group: 'delivery' },
              { id: 'tool-router', label: 'Tool router', group: 'ai' },
              { id: 'hitl-gate', label: 'HITL gate', group: 'risk' },
            ],
            edges: [
              { source: 'intent', target: 'delivery-agent' },
              { source: 'delivery-agent', target: 'tool-router' },
              { source: 'delivery-agent', target: 'hitl-gate' },
            ],
            stack: {
              aiStack: ['Tool orchestration graph', 'Evaluation replay traces'],
              opsStack: ['Action approval logs'],
            },
            skills: ['Tool-use design', 'Guardrail operations'],
            notes: ['Delivery selected: Agent workflow -> every action path needs explicit approval strategy.'],
          },
        },
      ],
    },
  ],
};
