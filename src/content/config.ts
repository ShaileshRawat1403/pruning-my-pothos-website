import { defineCollection, z } from 'astro:content';

const tagSchema = z.array(z.string()).optional().default([]);

// Discovery-related schemas
const featuredSchema = z.boolean().optional().default(false);
const readingTimeSchema = z.number().optional();
const contentTypeSchema = z.enum(['quick-read', 'deep-dive', 'technical']).optional();
const difficultySchema = z.enum(['beginner', 'intermediate', 'advanced']).optional();

const stickyNotesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    rotation: z.number().optional(),
    color: z.string().optional(),
    tags: tagSchema,
    featured: featuredSchema,
    readingTime: readingTimeSchema,
    contentType: contentTypeSchema,
    difficulty: difficultySchema,
  }),
});

const sentencesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        category: z.enum(['Attention', 'Meaning', 'Judgment']),
        tags: tagSchema,
        featured: featuredSchema,
        readingTime: readingTimeSchema,
        contentType: contentTypeSchema,
        difficulty: difficultySchema,
    }),
});

const systemsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.enum(['Explanations', 'Concepts', 'How-things-fit-together']),
        tags: tagSchema,
        featured: featuredSchema,
        readingTime: readingTimeSchema,
        contentType: contentTypeSchema,
        difficulty: difficultySchema,
    }),
});

const selfCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishDate: z.string().transform((str) => new Date(str)),
        tags: tagSchema,
        featured: featuredSchema,
        readingTime: readingTimeSchema,
        contentType: contentTypeSchema,
        difficulty: difficultySchema,
    }),
});

const shelfCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishDate: z.string().transform((str) => new Date(str)),
        tags: tagSchema,
        artist: z.string().optional(),
        album: z.string().optional(),
        year: z.number().optional(),
        // Allow local public paths (e.g. /covers/...) as well as absolute URLs.
        coverUrl: z.string().optional(),
        pdfUrl: z.string().optional(),
        videoUrl: z.string().optional(),
        resourceHighlights: z.array(z.string()).optional(),
        appleMusicUrl: z.string().url().optional(),
        featured: featuredSchema,
        readingTime: readingTimeSchema,
        contentType: contentTypeSchema,
        difficulty: difficultySchema,
    }),
});

export const collections = {
  'sticky-notes': stickyNotesCollection,
  'sentences': sentencesCollection,
  'systems': systemsCollection,
  'self': selfCollection,
  'shelf': shelfCollection,
};
