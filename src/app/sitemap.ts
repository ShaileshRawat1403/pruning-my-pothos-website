import { MetadataRoute } from "next";
import { allSystems, allSentences, allSelves, allShelves } from "content-collections";
import { SITE_CONFIG } from "../lib/seo/site";

export const dynamic = "force-static";

// Only report lastModified when we actually know it (frontmatter dates).
// Stamping every URL with the build date erodes crawler trust in the signal.
function knownDate(...candidates: Array<string | undefined>): Date | undefined {
  for (const c of candidates) {
    if (c) {
      const d = new Date(c);
      if (!isNaN(d.getTime())) return d;
    }
  }
  return undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/systems",
    "/sentences",
    "/self",
    "/schema",
    "/docs",
    "/docs/natural-language-programming-stack",
    "/docs/public-private-boundary",
    "/docs/tool-status",
    "/tools",
    "/canvases",
    "/live-lab",
    "/sentiments",
    "/about",
    "/portfolio",
    "/shelf",
    "/tools/prompt-to-json",
    "/tools/change-to-checklist",
    "/tools/csv-to-eval",
    "/tools/notes-to-brief",
    "/tools/repo-context-pack",
    "/tools/workflow-to-diagram",
    "/tools/language-pattern-check",
    "/tools/litops",
    "/tools/secret-scanner",
    "/tools/sql-safety",
    "/tools/gha-lint",
    "/tools/api-surface-map",
    "/tools/openapi-lint",
    "/tools/dependency-audit",
    "/tools/workflow-governance",
    "/tools/skill-catalog",
    "/tools/recipe-graph",
    "/tools/repo-hygiene",
    "/tools/changelog",
    "/tools/dockerfile-hygiene",
    "/tools/json-schema-lint",
    "/tools/license-classify",
    "/tools/markdown-links",
    "/tools/todo-triage",
    "/shelf/books",
    "/shelf/culture",
    "/shelf/local-experiments",
    "/shelf/music",
    "/shelf/notes",
    "/shelf/philosophy",
    "/shelf/shared-resources",
    "/shelf/tools",
  ].map((route) => ({
    url: route === "" ? `${SITE_CONFIG.url}/` : `${SITE_CONFIG.url}${route}/`,
  }));

  const systemRoutes = allSystems.map((item) => ({
    url: `${SITE_CONFIG.url}/systems/${item._meta.path}/`,
    lastModified: knownDate(item.updatedAt, item.publishDate),
  }));

  const sentenceRoutes = allSentences.map((item) => ({
    url: `${SITE_CONFIG.url}/sentences/${item._meta.path}/`,
  }));

  const selfRoutes = allSelves.map((item) => ({
    url: `${SITE_CONFIG.url}/self/${item._meta.path}/`,
    lastModified: knownDate(item.publishDate),
  }));

  const shelfRoutes = allShelves.map((item) => {
    const slug = item._meta.fileName.replace(/\.mdx?$/, "");
    return {
      url: `${SITE_CONFIG.url}/shelf/${item._meta.directory}/${slug}/`,
      lastModified: knownDate(item.publishDate),
    };
  });

  return [
    ...staticRoutes,
    ...systemRoutes,
    ...sentenceRoutes,
    ...selfRoutes,
    ...shelfRoutes,
  ];
}
