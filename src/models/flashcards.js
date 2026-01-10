import { z } from 'zod'

export const flashcardBodySchema = z.object({
    frontText: z.string()
    .min(1, 'front text is required')
    .max(255, 'front text is too large'),
    backText: z.string()
    .min(1, 'back text is required')
    .max(255, 'back text is too large'),
    collectionId: z.string(), 
    frontURL: z.string().max(255, 'front URL is too large'),
    backURL: z.string().max(255, 'back URL is too large')
})

export const flashcardIdSchema = z.object({
    id: z.uuid(), 
})

export const collectionIdSchema = z.object({
    collectionId: z.string().uuid()
})

export const reviewBodySchema = z.object({
    level: z.number()
        .int()
        .min(1, 'level must be at least 1')
        .max(5, 'level must be at most 5')
})

