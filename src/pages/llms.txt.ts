export async function GET({ site }: { site?: URL }) {
  const siteUrl = site ?? new URL(process.env.SITE_URL || 'https://pruningmypothos.com');
  const toAbs = (path: string) => new URL(path, siteUrl).toString();

  const body = `# pruningmypothos.com

This is a personal thinking workspace focused on AI systems, language, and practical reliability.
Primary sections:
- Systems: ${toAbs('/systems')}
- Sentences: ${toAbs('/sentences')}
- Shelf: ${toAbs('/shelf')}

High-signal pages:
- Systems foundations: ${toAbs('/systems/systems-001-foundations')}
- Prompt to production: ${toAbs('/systems/from-prompt-to-production')}
- NLPg SDLC: ${toAbs('/systems/tech-stack-for-nlpg-driven-ai-assisted-sdlc')}
- Shared resources: ${toAbs('/shelf/shared-resources')}

Author:
- About: ${toAbs('/about')}
- Portfolio: ${toAbs('/portfolio')}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

