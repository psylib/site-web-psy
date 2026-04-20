import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    dateModified: z.coerce.date().optional(),
    author: z.string().default('Claire Clavel'),
    tags: z.array(z.string()),
    image: z.string().optional(),
    noindex: z.boolean().default(false),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    related: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
