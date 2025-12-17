import { z } from 'zod'


export const flashcardBodySchema = z.object({
    frontText: z.string()
    .min(1, 'front text is required')
    .max(31,'front text is too large'), 
    backText: z.string()
    .min(1, 'back text is required')
    .max(31,'back text is too large'),
    frontURL: z.string()
    .min(1, 'front URL is required')
    .max(255,'front URL is too large'), 
    backURL: z.string()
    .min(1, 'back URL is required')
    .max(255,'back URL is too large'),
})

export const flashcardIdSchema = z.object({
    id: z.uuid(), 
})
