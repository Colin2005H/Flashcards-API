import { z } from 'zod'

export const createCollectionSchema = z.object({
    title: z.string()
        .min(1, 'The title is required')
        .max(100, 'The title must be at most 100 characters long'),
    description: z.string()
        .max(500, 'The description must be at most 500 characters long')
        .optional(),
    isPublic: z.boolean().optional().default(false)
})

export const updateCollectionSchema = z.object({
    title: z.string()
        .min(1, 'The title is required')
        .max(100, 'The title must be at most 100 characters long')
        .optional(),
    description: z.string()
        .max(500, 'The description must be at most 500 characters long')
        .optional(),
    isPublic: z.boolean()
})

export const idParamSchema = z.object({
    id: z.uuid('Invalid collection ID format')
})

export const searchCollectionsSchema = z.object({
    title: z.string()
        .min(1, 'The query must be at least 1 character long')
        .max(100, 'The query must be at most 100 characters long')
})
