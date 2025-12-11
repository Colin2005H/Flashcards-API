import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { RandomUUID } from 'crypto'
import { timeStamp } from 'console'

export const usersTable = sqliteTable('users', {
    id: text().primaryKey().$defaultFn(() => randomUUID()),
    firstName: text('first_name').length(31).notNull(),
    lastName: text('last_name').length(63).notNull(),
    email: text().unique().notNull(),
    password: text('password', {length: 255}).notNull(),
    role: text({enum: ['USER,', 'ADMIN']}).notNull().default('USER'),
    createdAt: integer('created_at', {mode: 'timestamp'}),
    modifiedAt: integer('modified_at', {mode: 'timestamp'})
})

export const flashcardsTable = sqliteTable('flashcards', {
    id: text().primaryKey().$defaultFn(() => randomUUID()),
    frontText: text('front_text').length(255).notNull(),
    backText: text('back_text').length(255).notNull(),
    frontURL: text('front_url').length(255),
    backURL: text('back_url').length(255),
    createdAt: integer('created_at', {mode: 'timestamp'}),
    modifiedAt: integer('created_at', {mode: 'timestamp'})
})

export const collectionsTable = sqliteTable('collections',{
    id: text().primaryKey().$defaultFn(() => randomUUID()),
    userId: text('user_id').references(() => usersTable.id, {
        onDelete: 'cascade',
    }),
    createdAt: integer('created_at', {mode: 'timestamp'}),
    modifiedAt: integer('modified_at', {mode: 'timestamp'}),
    title: text().length(31).notNull(),
    description: text().length(255),
    isPublic: integer('is_public',{ mode: 'boolean' })
})

export const revisionsTable = sqliteTable('revisions', {
    id: text().primaryKey().$defaultFn(() => randomUUID()),
    createdAt: integer('created_at', {mode: 'timestamp'}),
    reviewedAt: integer('reviewed_at', {mode: 'timestamp'}),
    level: integer({enum: [1, 2, 3, 4, 5]}).notNull(),
    userId: text('user_id').primaryKey().references(() => usersTable.id, {
        onDelete: 'cascade',
    }),
    flashcardId: text('flashcard_id').primaryKey().references(() => flashcardsTable.id, {
        onDelete: 'cascade',
    }),
    })