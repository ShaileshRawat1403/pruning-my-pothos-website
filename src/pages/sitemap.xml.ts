import { getCollection } from 'astro:content';
import { slugifyTag } from '@/utils/tags';

const STATIC_ROUTES = [
  '/',
  '/about',
  '/portfolio',
  '/systems',
  '/systems/concepts',
  '/systems/explanations',
  '/systems/how-things-fit-together',
  '/sentences',
  '/sentences/attention',
  '/sentences/meaning',
  '/sentences/judgment',
  '/sticky-notes',
  '/self',
  '/shelf',
  '/shelf/local-experiments',
  '/shelf/notes',
  '/shelf/music',
  '/shelf/tools',
  '/shelf/philosophy',
  '/shelf/shared-resources',
  '/shelf/books',
  '/shelf/movies',
  '/shelf/culture',
  '/shelf/notes-tools',
  '/tags',
];

type UrlEntry = {
  path: string;
  lastmod?: string;
};

const toPath = (entry: any) => {
  if (entry.collection === 'shelf') return `/shelf/${entry.slug}`;
  if (entry.collection === 'sticky-notes') return `/sticky-notes/${entry.slug}`;
  return `/${entry.collection}/${entry.slug}`;
};

const xmlEscape = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export async function GET({ site }: { site?: URL }) {
  const siteUrl = site ?? new URL(process.env.SITE_URL || 'https://pruningmypothos.com');

  const systems = await getCollection('systems');
  const sentences = await getCollection('sentences');
  const self = await getCollection('self');
  const shelf = await getCollection('shelf');
  const stickyNotes = await getCollection('sticky-notes');

  const allEntries = [...systems, ...sentences, ...self, ...shelf, ...stickyNotes];

  const urls: UrlEntry[] = [];

  STATIC_ROUTES.forEach((route) => {
    urls.push({ path: route });
  });

  allEntries.forEach((entry) => {
    const publishDate = (entry.data as { publishDate?: Date }).publishDate;
    urls.push({
      path: toPath(entry),
      lastmod: publishDate ? new Date(publishDate).toISOString() : undefined,
    });
  });

  const tagSet = new Set<string>();
  allEntries.forEach((entry) => {
    const tags = (entry.data as { tags?: string[] }).tags ?? [];
    tags.forEach((tag) => {
      const slug = slugifyTag(tag);
      if (slug) tagSet.add(slug);
    });
  });

  tagSet.forEach((tag) => {
    urls.push({ path: `/tags/${tag}` });
  });

  const dedup = new Map<string, UrlEntry>();
  urls.forEach((item) => {
    dedup.set(item.path, item);
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(dedup.values())
  .map((item) => {
    const loc = new URL(item.path, siteUrl).toString();
    const lastmod = item.lastmod ? `\n    <lastmod>${item.lastmod}</lastmod>` : '';
    return `  <url>\n    <loc>${xmlEscape(loc)}</loc>${lastmod}\n  </url>`;
  })
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}

