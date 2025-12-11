import bcrypt from 'bcrypt'
import { db } from './database.js'
import { usersTable, revisionsTable, collectionsTable, flashcardsTable } from './schema.js'
import { date } from 'drizzle-orm/mysql-core'

/**
 * 
 */
async function seed() {
    try {
        console.log('Database seeding starting...')
        
        await db.delete(usersTable)
        await db.delete(revisionsTable)
        await db.delete(collectionsTable)
        await db.delete(flashcardsTable)

        const seedUsers = [
            {
                firstName: 'Jacob',
                lastName: 'Bernier',
                email: 'jacob.bernier@gmail.com',
                role: 'USER',
                password: bcrypt.hashSync('JacobBernier',12),
                createdAt: new Date(),
                modifiedAt: new Date()
            },
            {
                firstName: 'Matthieu',
                lastName: 'Bourdon',
                email: 'matthieu.bourdon@gmail.com',
                role: 'ADMIN',
                password: bcrypt.hashSync('MatthieuBourdon',12),
                createdAt: new Date(),
                modifiedAt: new Date()
            },
            {
                firstName: 'Gwendoline',
                lastName: 'Nicollier',
                email: 'gwendoline.nicollier@gmail.com',
                role: 'USER',
                password: bcrypt.hashSync('GwendolineNicollier',12),
                createdAt: new Date(),
                modifiedAt: new Date()
            },

        ]
        const createdUsers = await db.insert(usersTable).values(seedUsers).returning()

        console.log('Seeding completed')
        
    } catch (error) {
        console.log('Error while seeding the database', error)
    }
}

  seed()
