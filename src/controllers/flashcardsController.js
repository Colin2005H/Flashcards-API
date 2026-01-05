import { db } from "../db/database.js"
import { flashcardsTable, revisionsTable } from "../db/schema.js"
import { eq } from "drizzle-orm"
import 'dotenv/config'

/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @returns 
 */
export const createFlashcards = async (req, res) => {
    const { frontText, backText, collectionId, frontURL, backURL } = req.body

    try {
        const flashcard = await db.insert(flashcardsTable).values({
            frontText,
            backText,
            collectionsId: collectionId,
            frontURL: frontURL,
            backURL: backURL,
            createdAt: new Date(),
            modifiedAt: new Date(),
        }).returning()

        res.status(201).json({
            message:'Flashcard added successfully.',
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error while creating the flashcard.",
        })
    }
}

export const getFlashcard = async (req, res) => {
    const { id } = req.params

    try {
        const flashcard = await db
            .select()
            .from(flashcardsTable)
            .where(eq(flashcardsTable.id, id))

        if (!flashcard) {
            return res.status(404).json({
                error: "Flashcard not found.",
            })
        }

        res.status(200).json(flashcard[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error while fetching the flashcard.",
        })
    }
}

export const listFlashcards = async (req, res) => {
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
    const { id } = req.params

    try {
        const flashcards = await db
            .select()
            .from(revisionsTable)
            .where(eq(revisionsTable.collectionsId, id))
        res.status(200).json({
            flashcards,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error while fetching flashcards to review.",
        })
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