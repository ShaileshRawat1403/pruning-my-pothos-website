import type { CollectionEntry } from 'astro:content';

const byTitle = (a: CollectionEntry<any>, b: CollectionEntry<any>) => {
  return a.data.title.localeCompare(b.data.title);
};

export const sortEntries = (entries: CollectionEntry<any>[]) => {
  if (entries.length && entries.every((entry) => entry.data?.publishDate)) {
    return [...entries].sort((a, b) => {
      return new Date(b.data.publishDate).valueOf() - new Date(a.data.publishDate).valueOf();
    });
  }
  return [...entries].sort(byTitle);
};

export const getAdjacentEntries = (entries: CollectionEntry<any>[], slug: string) => {
  const sorted = sortEntries(entries);
  const index = sorted.findIndex((entry) => entry.slug === slug);
  return {
    previous: index > 0 ? sorted[index - 1] : null,
    next: index >= 0 && index < sorted.length - 1 ? sorted[index + 1] : null,
    sorted,
  };
};

export const getRelatedEntries = (
  entries: CollectionEntry<any>[],
  slug: string,
  tags: string[] | undefined,
  count = 2,
) => {
  const others = entries.filter((entry) => entry.slug !== slug);
  if (!tags || tags.length === 0) {
    return others.slice(0, count);
  }
  const tagSet = new Set(tags);
  const scored = others.map((entry) => {
    const entryTags: string[] = entry.data?.tags ?? [];
    const score = entryTags.reduce((total, tag) => total + (tagSet.has(tag) ? 1 : 0), 0);
    return { entry, score };
  });
  const matching = scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || byTitle(a.entry, b.entry))
    .map((item) => item.entry);

  if (matching.length >= count) {
    return matching.slice(0, count);
  }

  const fallback = others.filter((entry) => !matching.includes(entry));
  return matching.concat(fallback.slice(0, count - matching.length));
};
