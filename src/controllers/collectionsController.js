import { db } from "../db/database.js"
import { collectionsTable, flashcardsTable, revisionsTable } from "../db/schema.js"
import { eq, and, like } from "drizzle-orm"
import 'dotenv/config'

/**
 * Create a new collection
 * @param {request} req 
 * @param {response} res 
 */
export const createCollection = async (req, res) => {
    const { title, description, isPublic } = req.body
    const userId = req.user.userId

    try {
        const collection = await db.insert(collectionsTable).values({
            userId,
            title,
            description: description,
            isPublic: isPublic,
            createdAt: Date.now(),
            modifiedAt: Date.now(),
        }).returning()

        res.status(201).json({
            message:'Collection added successfully.',
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error while creating the collection.",
        })
    }
}

/**
 * Get a collection by ID
 * @param {request} req 
 * @param {response} res 
 */
export const getCollection = async (req, res) => {
    const { id } = req.params
    const userId = req.user?.userId

    try {
        const collection = await db
            .select()
            .from(collectionsTable)
            .where(eq(collectionsTable.id, id))

        if (!collection) {
            return res.status(404).json({
                error: "Collection not found or private.",
            })
        }

        const coll = collection[0]

        // ownership
        if (!coll.isPublic && (!userId || coll.userId !== userId)) {
            return res.status(403).json({
                error: "You do not have access to this collection."
            })
        }

        res.status(200).json(coll)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error while fetching the collection"
        })
    }
}

/** * Get my collections
 * @param {request} req 
 * @param {response} res 
 */
export const getMyCollections = async (req, res) => {
    const userId = req.user.userId

    try {
        const collections = await db
            .select()
            .from(collectionsTable)
            .where(eq(collectionsTable.userId, userId))

        res.status(200).json({
            message: 'Colections fetched !',
            count: collections.length,
            collections
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error while fetching the collections."
        })
    }
}

/** * Search public collections by title
 * @param {request} req 
 * @param {response} res 
 */
export const searchPublicCollections = async (req, res) => {
    const { title } = req.params

    try {
        if (!title) {
            return res.status(400).json({
                error: "Enter a valid title."
            })
        }

        const collections = await db
            .select()
            .from(collectionsTable)
            .where(and(
                eq(collectionsTable.isPublic, true),
                like(collectionsTable.title, `%${title}%`)
            ))

        res.status(200).json({
            message: 'Search done successfully.',
            count: collections.length,
            collections,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error while fetching the collection.",
        })
    }
}

/** * List flashcards from a collection
 * @param {request} req 
 * @param {response} res 
 */
export const listFlashcardsFromCollection = async (req, res) => {
    const { collectionId } = req.params
    const userId = req.user.userId

    try {
        const collection = await db
            .select()
            .from(collectionsTable)
            .where(eq(collectionsTable.id, collectionId))

        if (!collection || collection.length === 0) {
            return res.status(404).json({
                error: "Collection not found.",
            })
        }

        const coll = collection[0]
        if (!coll.isPublic && (!userId || coll.userId !== userId)) {
            return res.status(403).json({
                error: "Permission denied."
            })
        }

        const flashcards = await db
            .select()
            .from(flashcardsTable)
            .where(eq(flashcardsTable.collectionsId, collectionId))

        res.status(200).json({
            message: 'Flashcards retrieved successfully',
            count: flashcards.length,
            flashcards,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error while listing flashcards.",
        })
    }
}


/**
 * Update a collection, only available for owner
 * @param {request} req 
 * @param {response} res 
 */
export const updateCollection = async (req, res) => {
    const { id } = req.params
    const userId = req.user.userId
    const { title, description, isPublic } = req.body

    try {
        const collection = await db
            .select()
            .from(collectionsTable)
            .where(eq(collectionsTable.id, id))

        if (collection.length === 0) {
            return res.status(404).json({
                error: "Collection not found"
            })
        }

        if (collection[0].userId !== userId) {
            return res.status(403).json({
                error: "Action restricted"
            })
        }

        const updateData = {}
        if (title !== undefined) updateData.title = title
        if (description !== undefined) updateData.description = description
        if (isPublic !== undefined) updateData.isPublic = isPublic
        updateData.modifiedAt = Date.now()

        const updated = await db
            .update(collectionsTable)
            .set(updateData)
            .where(eq(collectionsTable.id, id))
            .returning()

        res.status(200).json({
            message: 'Collection updated successfully.',
            collection: updated[0]
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error while updating the collection."
        })
    }
}

/**
 * Delete a collection, only available for owner
 * @param {request} req 
 * @param {response} res 
 */
export const deleteCollection = async (req, res) => {
    const { id } = req.params
    const userId = req.user.userId

    try {
        const collection = await db
            .select()
            .from(collectionsTable)
            .where(eq(collectionsTable.id, id))

        if (collection.length === 0) {
            return res.status(404).json({
                error: "Collection not found."
            })
        }

        if (collection[0].userId !== userId) {
            return res.status(403).json({
                error: "Action restricted."
            })
        }

        await db
            .delete(collectionsTable)
            .where(eq(collectionsTable.id, id))

        res.status(200).json({
            message: 'Collection deleted successfully.'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error while deleting the collection."
        })
    }
}