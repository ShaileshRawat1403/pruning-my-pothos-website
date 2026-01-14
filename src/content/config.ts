import { defineCollection, z } from 'astro:content';

const tagSchema = z.array(z.string()).optional().default([]);

const stickyNotesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    rotation: z.number().optional(),
    color: z.string().optional(),
    tags: tagSchema,
  }),
});

const sentencesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        category: z.enum(['Attention', 'Meaning', 'Judgment']),
        tags: tagSchema,
    }),
});

const systemsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.enum(['Explanations', 'Concepts', 'How-things-fit-together']),
        tags: tagSchema,
    }),
});

const selfCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishDate: z.string().transform((str) => new Date(str)),
        tags: tagSchema,
    }),
});

const shelfCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishDate: z.string().transform((str) => new Date(str)),
        tags: tagSchema,
    }),
});

export const collections = {
  'sticky-notes': stickyNotesCollection,
  'sentences': sentencesCollection,
  'systems': systemsCollection,
  'self': selfCollection,
  'shelf': shelfCollection,
};
