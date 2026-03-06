export async function GET({ site }: { site?: URL }) {
  const siteUrl = site ?? new URL(process.env.SITE_URL || 'https://pruningmypothos.com');
  const sitemapUrl = new URL('/sitemap.xml', siteUrl).toString();

const body = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
# LLM guidance: ${new URL('/llms.txt', siteUrl).toString()}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
