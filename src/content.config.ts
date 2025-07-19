import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { marketSectors } from '@data/categories';

// Extract sector IDs for the enum
const sectorIds = marketSectors.map((sector) => sector.id);

// Indonesian stock symbol validation (XXXX.JK pattern)
const stockSymbolSchema = z.string().regex(/^[A-Z]{4}\.JK$/, {
    message: 'Stock symbol must be in format XXXX.JK (e.g., BBCA.JK)'
});

const news = defineCollection({
    loader: glob({ base: './src/content/news', pattern: '**/*.md' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            excerpt: z.string(),
            featuredImage: image().optional(),
            publishDate: z.string().transform((str) => new Date(str)),
            author: z.string(),
            category: z.enum(sectorIds as [string, ...string[]]),
            stockSymbols: z.array(stockSymbolSchema).optional(),
            isBreaking: z.boolean().default(false),
            publish: z.boolean().default(true),
            tags: z.array(z.string()).optional(),
            seo: z
                .object({
                    title: z.string().optional(),
                    description: z.string().optional(),
                    image: z.string().optional(),
                })
                .optional(),
        }),
});

// Legacy support - keep blog as alias to news
const blog = news;

const team = defineCollection({
    loader: glob({ base: './src/content/team', pattern: '**/*.md' }),
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            headshot: image().optional(),
            jobTitle: z.string(),
            email: z.string().optional(),
            linkedin: z.string().url().optional(),
            linkedinUsername: z.string().optional(),
            xSocial: z.string().url().optional(),
            xSocialUsername: z.string().optional(),
            github: z.string().url().optional(),
            githubUsername: z.string().optional(),
            order: z.number().default(999),
            publish: z.boolean().default(true),
        }),
});

const legal = defineCollection({
    loader: glob({ base: './src/content/legal', pattern: '**/*.md' }),
    schema: z.object({
        title: z.string(),
        lastUpdated: z.string().transform((str) => new Date(str)),
        seo: z
            .object({
                title: z.string().optional(),
                description: z.string().optional(),
            })
            .optional(),
    }),
});

export const collections = { news, blog, team, legal };
