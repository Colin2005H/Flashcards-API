import { email, z } from 'zod'

const roleEnum = z.enum(['ADMIN', 'USER'])

export const userSchema = z.object({
    firstName: z.string().min(1, 'First Name is required').max(31, 'First Name must be at most 31 charaters'),
    lastName: z.string().min(1, 'Last Name is required').max(63, 'Last Name must be at most 63 charaters'),
    password: z.string().min(8, 'Password must be at least 8 characters').max(63, 'Password must be at most 63 charaters'),
    email: z.email(),
    role: roleEnum.optional()
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
})

export const userIdSchema = z.object({
    id: z.uuid()
})