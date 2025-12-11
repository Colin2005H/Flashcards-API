import { sqlite, text, integer } from 'drizzle-orm/sqlite-core'
import { RandomUUID } from 'crypto'
import { timeStamp } from 'console'

export const usersTable = sqliteTable('users', {
    id: text().primaryKey().$defaultFn(() => randomUUID()),
    firstName: text().length(31).notNull(),
    lastName: text().length(63).notNull(),
    email: text().unique().notNull(),
    password: text('password', {length: 255}).notNull(),
    role: text({enum: ['USER,', 'ADMIN']}).notNull().default('USER'),
    createdAt: integer('created_at', {mode: 'timestamp'}),
    modifiedAt: integer('created_at', {mode: 'timestamp'})
})

export const flashcardsTable = sqliteTable('flashcards', {
    id: text().primaryKey().$defaultFn(() => randomUUID()),
    frontText: text().length(255).notNull(),
    backText: text().length(255).notNull(),
    frontURL: text().length(255),
    backURL: text().length(255),
    createdAt: integer('created_at', {mode: 'timestamp'}),
    modifiedAt: integer('created_at', {mode: 'timestamp'})
})