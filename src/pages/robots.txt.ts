export async function GET({ site }: { site?: URL }) {
  const siteUrl = site ?? new URL(process.env.SITE_URL || 'https://pruningmypothos.com');
  const sitemapUrl = new URL('/sitemap.xml', siteUrl).toString();
  const llmsUrl = new URL('/llms.txt', siteUrl).toString();

  const body = `User-agent: *
Allow: /
Disallow: /blog/
Disallow: /blogs/

Sitemap: ${sitemapUrl}
LLM-Guide: ${llmsUrl}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
