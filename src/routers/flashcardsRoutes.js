import { Router } from 'express'
import { validateBody, validateParams } from '../middleware/validation.js'
import { flashcardBodySchema, flashcardIdSchema } from '../models/flashcards.js'
import { createFlashcards, deleteFlashcards, updateFlashcards } from '../controllers/flashcardsController.js'

const router = Router()

router.post('/create', validateBody(flashcardBodySchema), createFlashcards)
router.delete('/delete/:id', validateParams(flashcardIdSchema), deleteFlashcards)
router.put('/update/:id', validateParams(flashcardIdSchema), validateBody(flashcardBodySchema), updateFlashcards)

export default router