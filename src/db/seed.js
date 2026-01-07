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
        
        //await db.delete(usersTable)
        //await db.delete(revisionsTable)
        //await db.delete(collectionsTable)
        //await db.delete(flashcardsTable)

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

       

        const seedCollections = [
            {
                userId: createdUsers[0].id,
                title: 'Les capitales',
                description: 'Une collection pour apprendre les capitales',
                isPublic: 1,
                createdAt: new Date(),
                modifiedAt: new Date()
            },

        ]

         const createdCollections = await db.insert(collectionsTable).values(seedCollections).returning()

         const seedFlashcards = [
            {
                collectionsId : createdCollections[0].id,
                frontText: 'Quelle est la capitale de l\'Espagne ?',
                backText: 'Madrid',
                frontURL: '',
                backURL: '',
                createdAt: new Date(),
                modifiedAt: new Date()
            },
            {
                collectionsId : createdCollections[0].id,
                frontText: 'Quelle est la capitale de la France ?',
                backText: 'Paris',
                frontURL: '',
                backURL: '',
                createdAt: new Date(),
                modifiedAt: new Date()
            },
            {
                collectionsId : createdCollections[0].id,
                frontText: 'Quel est l\'ancien nom de Paris ?',
                backText: 'Lutèce',
                frontURL: '',
                backURL: '',
                createdAt: new Date(),
                modifiedAt: new Date()
            },

        ]

        const createdFlashcards = await db.insert(flashcardsTable).values(seedFlashcards).returning()

       const seedRevisions = [
            {
                userId: createdUsers[0].id,
                flashcardsId : createdFlashcards[0].id,
                level: 1,
                createdAt: new Date(),
                reviewedAt: new Date()
            },
            {
                userId: createdUsers[1].id,
                flashcardsId : createdFlashcards[0].id,
                level: 2,
                createdAt: new Date(),
                reviewedAt: new Date()
            },

        ]

        const createdRevisions = await db.insert(revisionsTable).values(seedRevisions).returning()
        console.log('Seeding completed')
    } catch (error) {
        console.log('Error while seeding the database', error)
    }
}

  seed()
