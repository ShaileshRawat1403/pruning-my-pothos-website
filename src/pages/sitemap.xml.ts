import { getCollection } from 'astro:content';
import { slugifyTag } from '@/utils/tags';

const CORE_INDEX_ROUTES = [
  '/',
  '/about',
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
  '/shelf/books',
  '/shelf/culture',
  '/shelf/local-experiments',
  '/shelf/music',
  '/shelf/notes',
  '/shelf/notes-tools',
  '/shelf/philosophy',
  '/shelf/shared-resources',
  '/shelf/tools',
  '/portfolio',
  '/dual-nlp-framework',
];

// Keep exclusions centralized so sitemap scope does not drift over time.
const EXCLUDED_ROUTE_PREFIXES = [
  '/experiments/',
  '/test/',
];

type UrlEntry = {
  path: string;
  lastmod?: string;
};

const withTrailingSlash = (path: string) => {
  if (path === '/' || path.endsWith('/')) return path;
  return `${path}/`;
};

const toPath = (entry: any) => {
  if (entry.collection === 'shelf') return withTrailingSlash(`/shelf/${entry.slug}`);
  if (entry.collection === 'sticky-notes') return withTrailingSlash(`/sticky-notes/${entry.slug}`);
  return withTrailingSlash(`/${entry.collection}/${entry.slug}`);
};

const isExcludedPath = (path: string) =>
  EXCLUDED_ROUTE_PREFIXES.some((prefix) => path === prefix || path.startsWith(prefix));

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
  const tagPaths = new Set<string>();

  const urls: UrlEntry[] = [];

  CORE_INDEX_ROUTES.forEach((route) => {
    const normalized = withTrailingSlash(route);
    if (!isExcludedPath(normalized)) {
      urls.push({ path: normalized });
    }
  });

  allEntries.forEach((entry) => {
    const path = toPath(entry);
    if (isExcludedPath(path)) return;
    const publishDate = (entry.data as { publishDate?: Date }).publishDate;
    const updatedAt = (entry.data as { updatedAt?: Date }).updatedAt;
    const date = updatedAt || publishDate;
    urls.push({
      path,
      lastmod: date ? new Date(date).toISOString() : undefined,
    });

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
