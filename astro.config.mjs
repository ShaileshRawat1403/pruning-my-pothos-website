import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import rehypeRaw from 'rehype-raw';

// https://astro.build/config
export default defineConfig({
  viewTransitions: true,
  integrations: [mdx()],
  markdown: {
    rehypePlugins: [rehypeRaw],
    remarkRehype: { allowDangerousHtml: true },
    shikiConfig: { theme: 'github-light' },
  },
});
