import { Router } from 'express'
import { authenticateToken } from '../middleware/authenticateToken.js'
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
    AddreviewFlashcard,
    deleteReviewFlashcards
} from '../controllers/flashcardsController.js'

const router = Router()

// Create a flashcard
router.post('/', validateBody(flashcardBodySchema), createFlashcards)

// Get a flashcard by ID
router.get('/:id', validateParams(flashcardIdSchema), getFlashcard)

router.get('/collection/:collectionId', validateParams(collectionIdSchema), listFlashcards)

// Get flashcards to review 
router.get('/collection/to-review', authenticateToken, getFlashcardsToReview)

// Update a flashcard
router.put('/:id', validateParams(flashcardIdSchema), validateBody(flashcardBodySchema), updateFlashcards)

// Add a review to a flashcard
router.post('/:id/review', validateParams(flashcardIdSchema), validateBody(reviewBodySchema), AddreviewFlashcard)

// Delete a Reviewflashcard 
router.delete('/:id', authenticateToken, validateParams(flashcardIdSchema), deleteReviewFlashcards)

// Delete a flashcard
router.delete('/:id', validateParams(flashcardIdSchema), deleteFlashcards)

export default router