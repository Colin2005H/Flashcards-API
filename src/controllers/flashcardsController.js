import { db } from "../db/database.js"
import { collectionsTable, flashcardsTable, revisionsTable } from "../db/schema.js"
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
    const userId = req.user?.userId
    if (!userId) return res.status(401).json({ error: 'Unauthorized' })
    console.log(userId);
    try {
        const flashcardsToReview = [];
        const flashcards = await db
            .select()
            .from(revisionsTable)
            .where(eq(revisionsTable.userId, userId));
        
        for (let i = 0; i < flashcards.length; i++) {
            const level = flashcards[i].level
            let daysToReview = 0
            console.log(flashcards[i].level);

            if (level === 1) daysToReview = 1
            else if (level === 2) daysToReview = 2
            else if (level === 3) daysToReview = 4
            else if (level === 4) daysToReview = 8
            else daysToReview = 16
            const msToReview = daysToReview * 24 * 60 * 60 * 1000 // convert days to milliseconds
            const reviewedAtMs = flashcards[i].reviewedAt ? new Date(flashcards[i].reviewedAt).getTime() : 0
            if (reviewedAtMs + msToReview <= Date.now()) {
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

// Je ne comprends pas pourquoi le niveau d'une carte changerait si on la révise
export const reviewFlashcard = async (req, res) => {
    const { id } = req.params
    const userId = req.user.userId
    try {
        const updated = await db
            .update(revisionsTable)
            .set({
                reviewedAt: new Date(),
            })
            .where(and(eq(revisionsTable.id, id), eq(revisionsTable.userId, userId)))
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
export const addReviewFlashcard = async (req, res) => {
    const { id } = req.params
    const { level } = req.body
    const userId = req.user.userId
    console.log(level);

    try {
        const flashcard = await db
            .select()
            .from(flashcardsTable)
            .where(eq(flashcardsTable.id, id))

        if (!flashcard || flashcard.length === 0) {
            return res.status(404).json({
                error: "Flashcard not found.",
            })
        }

        const flashcardObj = flashcard[0]

        const collection = await db
            .select()
            .from(collectionsTable)
            .where(and(eq(collectionsTable.id, flashcardObj.collectionsId), eq(collectionsTable.isPublic, 1)))

        if (!collection || collection.length === 0) {
            return res.status(404).json({
                error: "Collection not found or not public.",
            })
        }

        if (level < 1 || level > 5) {
            return res.status(400).json({
                error: "Level must be between 1 and 5.",
            })
        }

        const revision = await db.insert(revisionsTable).values({
            userId: userId,
            flashcardId: id,
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
    const { id } = req.params
    const userId = req.user.userId

    try {
        const deleted = await db
            .delete(revisionsTable)
            .where(and(eq(revisionsTable.userId, userId), eq(revisionsTable.flashcardId, id)))
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
