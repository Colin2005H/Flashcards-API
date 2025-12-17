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

router.post('/', validateBody(flashcardBodySchema), createFlashcards)

router.get('/:id', validateParams(flashcardIdSchema), getFlashcard)

router.get('/collection/:collectionId', validateParams(collectionIdSchema), listFlashcards)

router.get('/collection/:collectionId/to-review', validateParams(collectionIdSchema), getFlashcardsToReview)

router.put('/:id', validateParams(flashcardIdSchema), validateBody(flashcardBodySchema), updateFlashcards)

router.post('/:id/review', validateParams(flashcardIdSchema), validateBody(reviewBodySchema), reviewFlashcard)

router.delete('/:id', validateParams(flashcardIdSchema), deleteFlashcards)

export default router