import { z } from 'zod'

const difficultyEnum = z.enum(["easy","medium","difficult"])

export const createCollectionSchema = z.object({
    userId: z.uuid(), 
    title: z.string()
    .min(1, 'Title is required')
    .max(31,'Title must be at most 31 characters'),
    description: z.string()
    .min(1, 'Description is required')
    .max(255,'Description must be at most 255 characters'),
    isPublic: z.boolean()
})

export const IdSchema = z.object({
    id: z.uuid(),
})