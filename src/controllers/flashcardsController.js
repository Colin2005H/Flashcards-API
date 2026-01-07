import { db } from "../db/database.js"
import { flashcardsTable, revisionsTable } from "../db/schema.js"
import { and, eq } from "drizzle-orm"
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

export const getFlashcardsToReview = async (req, res) => {
    const userId = req.user.userId
    console.log(userId);
    try {
        flashcardsToReview = [];
        const flashcards = await db
            .select()
            .from(revisionsTable)
            .where(eq(revisionsTable.userId, userId));
        
        for (let i = 0; i < flashcards.length; i++) {
            const level = flashcards[i].level
            let daysToReview = 0

            if (level === 1) daysToReview = 1
            else if (level === 2) daysToReview = 2
            else if (level === 3) daysToReview = 4
            else if (level === 4) daysToReview = 8
            else daysToReview = 16

            if(flashcards[i].lastReviewedAt + daysToReview <= Date.now()){
                flashcardsToReview.push(flashcards[i])
            }
        }
        res.status(200).json({
            flashcardsToReview,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error while fetching flashcards to review.",
        })
    }
}

export const reviewFlashcard = async (req, res) => {
    const { idFlashcard } = req.params
    const userId = req.user.userId
    try {
        const updated = await db
            .update(revisionsTable)
            .set({
                modifiedAt: new Date(),
            })
            .where(and(eq(revisionsTable.id, idFlashcard), eq(revisionsTable.userId, userId)))
            .returning()

        if (!updated) {
            return res.status(404).json({
                error: "Flashcard or User not found.",
            })
        }

        res.status(200).json({
            message:'Revision updated successfully.',
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error while updating the revision.",
        })
    }


}
export const AddreviewFlashcard = async (req, res) => {
    const { flashcardId } = req.params
    const { level } = req.body
    const userId = req.user.userId

    try {
        const revision = await db.insert(revisionsTable).values({
            userId: userId,
            flashcardId: flashcardId,
            level: level,
            createdAt: new Date(),
            reviewedAt: new Date(),
        }).returning()

        res.status(201).json({
            message:'Revision added successfully.',
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error while creating the revision.",
        })
    }
}

export const deleteReviewFlashcards = async (req, res) => {
    const { flashcardid } = req.params
    const userId = req.user.userId

    try {
        const deleted = await db
            .delete(revisionsTable)
            .where(and(eq(revisionsTable.userId, userId), eq(revisionsTable.flashcardId, flashcardid)))
            .returning()

        if (!deleted) {
            return res.status(404).json({
                error: "Revision not found.",
            })
        }

        res.status(200).json({
            message:'Revision deleted successfully.',
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error while deleting the revision.",
        })
    }
}
