import { sqlite, text, integer } from 'drizzle-orm/sqlite-core'
import { RandomUUID } from 'crypto'
import { timeStamp } from 'console'

export const usersTable = sqliteTable('users', {
    id: text().primaryKey().$defaultFn(() => randomUUID()),
    firstName: text().length(30).notNull(),
    lastName: text().length(50).notNull(),
    email: text().unique().notNull(),
    password: text('password', {length: 255}).notNull(),
    role: text({enum: ['USER,', 'ADMIN']}).notNull().default('USER'),
    createdAt: integer('created_at', {mode: 'timeStamp'}),
    modifiedAt: integer('created_at', {mode: 'timeStamp'})
})