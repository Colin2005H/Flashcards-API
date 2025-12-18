import { db } from "../db/database.js"
import { collectionsTable, flashcardsTable, revisionsTable } from "../db/schema.js"
import { eq } from "drizzle-orm"
import 'dotenv/config'

/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @returns 
 */
export const createCollections = async (req, res) => {
    const { userId, title, description, isPublic } = req.body

    try {
        const collection = await db.insert(collectionsTable).values({
            userId, 
            title, 
            description, 
            isPublic,
            createdAt: new Date(),
            modifiedAt: new Date(),
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

export const getCollection = async (req, res) => {
    const { id } = req.params

    try {
        const collection = await db
            .select()
            .from(collectionsTable)
            .where(eq(collectionsTable.id, id), eq(collectionsTable.isPublic, 1))

        if (!collection) {
            return res.status(404).json({
                error: "Collection not found or private.",
            })
        }

        res.status(200).json(collection[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error while fetching the collection.",
        })
    }
}

export const listFlashcardsFromCollection = async (req, res) => {
    const { collectionId } = req.params

    try {
        const flashcards = await db
            .select()
            .from(flashcardsTable)
            .where(eq(flashcardsTable.collectionsId, collectionId))

        res.status(200).json({
            flashcards,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error while listing flashcards.",
        })
    }
}


export const getFlashcardsToReview = async (req, res) => {
    const { collectionId } = req.params

    try {
        const flashcards = await db
            .select()
            .from(flashcardsTable)
            .innerJoin(collectionsTable)
            .innerJoin(revisionsTable)
            .where(and(eq(collectionsTable.id = collectionId) eq(revisionsTable.reviewedAt <= new Date())))
    } catch (error) {
        
    }
}


export const updateFlashcards = async (req, res) => {
    const { id } = req.params
    const { frontText, backText, frontURL, backURL } = req.body

    try {
        const updated = await db
            .update(flashcardsTable)
            .set({
                frontText,
                backText,
                frontURL: frontURL,
                backURL: backURL,
                modifiedAt: new Date(),
            })
            .where(eq(flashcardsTable.id, id))
            .returning()

        if (!updated) {
            return res.status(404).json({
                error: "Flashcard not found.",
            })
        }

        res.status(200).json({
            message:'Flashcard updated successfully.',
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error while updating the flashcard.",
        })
    }
}

export const deleteFlashcards = async (req, res) => {
    const { id } = req.params

    try {
        const deleted = await db
            .delete(flashcardsTable)
            .where(eq(flashcardsTable.id, id))
            .returning()

        if (!deleted) {
            return res.status(404).json({
                error: "Flashcard not found.",
            })
        }

        res.status(200).json({
            message:'Flashcard deleted successfully.',
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error while deleting the flashcard.",
        })
    }
}

export const reviewFlashcard = async (req, res) => {
    

}