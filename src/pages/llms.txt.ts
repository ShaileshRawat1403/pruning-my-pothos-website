export async function GET({ site }: { site?: URL }) {
  const siteUrl = site ?? new URL(process.env.SITE_URL || 'https://pruningmypothos.com');
  const toAbs = (path: string) => new URL(path, siteUrl).toString();

  const body = `# pruningmypothos.com

PruningMyPothos is a thinking workspace on AI systems, orchestration, platform integration, governance, and adoption.

Start here:
- Systems: ${toAbs('/systems/')}
- Portfolio: ${toAbs('/portfolio/')}
- Sentences: ${toAbs('/sentences/')}
- Shelf: ${toAbs('/shelf/')}

Key topics:
- AI architecture
- AI orchestration
- Retrieval and knowledge pipelines
- AI governance and evaluation
- AI adoption

High-signal pages:
- AI architecture: ${toAbs('/systems/ai-architecture-explained-how-modern-llm-applications-work/')}
- Agents vs workflows: ${toAbs('/systems/ai-agents-vs-ai-workflows/')}
- Post-demo failure: ${toAbs('/systems/why-most-ai-projects-fail-after-the-demo-stage/')}
- Systems foundations: ${toAbs('/systems/systems-001-foundations/')}
- Orchestration: ${toAbs('/systems/runtime-over-model-why-orchestration-is-the-product/')}
- Governed execution: ${toAbs('/systems/from-agent-intent-to-governed-execution/')}
- Prompt to production: ${toAbs('/systems/from-prompt-to-production/')}
- NLPg SDLC: ${toAbs('/systems/tech-stack-for-nlpg-driven-ai-assisted-sdlc/')}
- Soothsayer experiment: ${toAbs('/shelf/local-experiments/soothsayer-mcp-kernel/')}
- Shared resources: ${toAbs('/shelf/shared-resources/')}

Author:
- About: ${toAbs('/about/')}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
