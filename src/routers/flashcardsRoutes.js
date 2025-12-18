import { Router } from 'express'
import { validateBody, validateParams } from '../middleware/validation.js'
import { 
    flashcardBodySchema, 
    flashcardIdSchema, 
    collectionIdSchema,
    reviewBodySchema 
} from '../models/flashcards.js'
import { 
    createFlashcards, 
    getFlashcard,
    listFlashcards,
    getFlashcardsToReview,
    deleteFlashcards, 
    updateFlashcards,
    reviewFlashcard,
} from '../controllers/flashcardsController.js'

const router = Router()

// Create a flashcard
router.post('/', validateBody(flashcardBodySchema), createFlashcards)

// Get a flashcard by ID
router.get('/:id', validateParams(flashcardIdSchema), getFlashcard)

//router.get('/collection/:collectionId', validateParams(collectionIdSchema), listFlashcards)

//router.get('/collection/:collectionId/to-review', validateParams(collectionIdSchema), getFlashcardsToReview)

// Update a flashcard
router.put('/:id', validateParams(flashcardIdSchema), validateBody(flashcardBodySchema), updateFlashcards)

// Add a review to a flashcard
router.post('/:id/review', validateParams(flashcardIdSchema), validateBody(reviewBodySchema), reviewFlashcard)

// Delete a flashcard
router.delete('/:id', validateParams(flashcardIdSchema), deleteFlashcards)

export default router