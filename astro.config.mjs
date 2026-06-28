import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeRaw from 'rehype-raw';
import rehypeTrailingSlashInternalLinks from './src/utils/rehypeTrailingSlashInternalLinks.mjs';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'https://pruningmypothos.com',
  viewTransitions: true,
  integrations: [mdx(), sitemap()],
  markdown: {
    rehypePlugins: [rehypeRaw, rehypeTrailingSlashInternalLinks],
    remarkRehype: { allowDangerousHtml: true },
    shikiConfig: { theme: 'github-light' },
  },
});
