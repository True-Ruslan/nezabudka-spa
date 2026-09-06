import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cases = defineCollection({
  loader: glob({ pattern: 'case-*.md', base: './src/content/cases' }),
  schema: z.object({
    title: z.string().min(3),
    vehicle: z.string().min(2),
    context: z.string().min(3),
    summary: z.string().min(10),
    problem: z.string().min(10),
    investigation: z.string().min(10),
    decision: z.string().min(10),
    rationale: z.string().min(10),
    result: z.string().min(10),
    publish: z.boolean().default(false),
    image: z.string().optional(),
  }),
});

export const collections = { cases };
