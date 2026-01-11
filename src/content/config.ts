import { defineCollection, z } from 'astro:content';

const notesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    rotation: z.number().optional(),
    color: z.string().optional(),
  }),
});

const sentencesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
    }),
});

const systemsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
    }),
});

const selfCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishDate: z.string().transform((str) => new Date(str)),
    }),
});

const shelfCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishDate: z.string().transform((str) => new Date(str)),
    }),
});

export const collections = {
  'notes': notesCollection,
  'sentences': sentencesCollection,
  'systems': systemsCollection,
  'self': selfCollection,
  'shelf': shelfCollection,
};
