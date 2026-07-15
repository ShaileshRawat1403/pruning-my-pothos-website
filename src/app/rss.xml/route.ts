import { allSystems, allSelves } from "content-collections";
import { SITE_CONFIG } from "../../lib/seo/site";

export const dynamic = "force-static";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

interface FeedItem {
  title: string;
  description: string;
  url: string;
  date?: string;
}

export function GET() {
  const items: FeedItem[] = [
    ...allSystems.map((item) => ({
      title: item.title,
      description: item.description ?? "",
      url: `${SITE_CONFIG.url}/systems/${item._meta.path}/`,
      date: item.updatedAt ?? item.publishDate,
    })),
    ...allSelves.map((item) => ({
      title: item.title,
      description: item.description,
      url: `${SITE_CONFIG.url}/self/${item._meta.path}/`,
      date: item.publishDate,
    })),
  ]
    .filter((item) => item.date && !isNaN(new Date(item.date).getTime()))
    .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());

  const rssItems = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${new Date(item.date!).toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_CONFIG.name)}</title>
    <link>${SITE_CONFIG.url}/</link>
    <atom:link href="${SITE_CONFIG.url}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(SITE_CONFIG.defaultDescription)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${rssItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
