import { Router } from 'express'
import logger from '../middleware/logger.js'
import { createCollections, getCollection, listFlashcardsFromCollection } from '../controllers/collectionsController.js'
import { validateBody, validateParams } from '../middleware/validation.js'
import { createCollectionSchema , IdSchema } from '../models/collections.js'
import { authenticateToken } from '../middleware/authenticateToken.js'

const router = Router()

router.post('/create', validateBody(createCollectionSchema), createCollections)

router.get('/:Id', validateParams(IdSchema), getCollection)

router.get('/:Id/flashcards', validateParams(IdSchema), listFlashcardsFromCollection)

router.get('/:Id/to-review', validateParams(IdSchema), getFlashcardsToReview)

router.get('/my-collections', authenticateToken, getMyCollections)

router.get('/title/:title', validateParams(IdSchema), getCollectionsByTitle)

router.put('/:id', authenticateToken, validateParams(IdSchema), updateCollection)

router.delete('/:id', authenticateToken, validateParams(IdSchema), deleteCollection)


export default router
