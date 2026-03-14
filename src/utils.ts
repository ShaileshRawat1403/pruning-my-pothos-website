import type { CollectionEntry } from 'astro:content';

export const sortedByDate = (collection: CollectionEntry<any>[]) => {
  return collection.sort((a, b) => {
    return new Date(b.data.publishDate).valueOf() - new Date(a.data.publishDate).valueOf();
  });
};
