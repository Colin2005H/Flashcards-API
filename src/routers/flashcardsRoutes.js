import { Router } from 'express'
import { authenticateToken } from '../middleware/authenticateToken.js'
import { validateBody, validateParams } from '../middleware/validation.js'
import { 
    flashcardBodySchema, 
    flashcardIdSchema, 
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
    addReviewFlashcard,
    deleteReviewFlashcards
} from '../controllers/flashcardsController.js'

const router = Router()

// Create a flashcard
router.post('/', authenticateToken, validateBody(flashcardBodySchema), createFlashcards)

// Get a flashcard by ID
router.get('/:id', authenticateToken, validateParams(flashcardIdSchema), getFlashcard)

// Update a flashcard
router.put('/:id', authenticateToken, validateParams(flashcardIdSchema), validateBody(flashcardBodySchema), updateFlashcards)

// Update a flashcard review
router.put('/review/:id', authenticateToken,validateParams(flashcardIdSchema), reviewFlashcard)

// Add a review to a flashcard
router.post('/:id/review', authenticateToken, validateParams(flashcardIdSchema), validateBody(reviewBodySchema), addReviewFlashcard)

// Delete a Reviewflashcard 
router.delete('/:id/review', authenticateToken, validateParams(flashcardIdSchema), deleteReviewFlashcards)

// Delete a flashcard
router.delete('/:id', authenticateToken, validateParams(flashcardIdSchema), deleteFlashcards)

export default router