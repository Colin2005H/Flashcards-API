import { Router } from 'express'
import { 
    createCollection, 
    getCollection, 
    getMyCollections,
    searchPublicCollections,
    updateCollection,
    deleteCollection,
    listFlashcardsFromCollection 
} from '../controllers/collectionsController.js'
import { validateBody, validateParams } from '../middleware/validation.js'
import { 
    createCollectionSchema, 
    updateCollectionSchema,
    idParamSchema,
    searchCollectionsSchema 
} from '../models/collections.js'
import { authenticateToken } from '../middleware/authenticateToken.js'

const router = Router()

// Create a new collection (authenticated)
router.post('/', authenticateToken, validateBody(createCollectionSchema), createCollection)

// Get a collection by ID (public)
router.get('/:id', validateParams(idParamSchema), getCollection)

// Get my collections (authenticated)
router.get('/my-collections', authenticateToken, getMyCollections)

// Search public collections by title (public)
router.get('/public/:title', searchPublicCollections)

// List flashcards from a collection (public)
router.get('/:id/flashcards', validateParams(idParamSchema), listFlashcardsFromCollection)

// Update a collection (authenticated, owner only)
router.put('/:id', authenticateToken, validateParams(idParamSchema), validateBody(updateCollectionSchema), updateCollection)

// Delete a collection (authenticated, owner only)
router.delete('/:id', authenticateToken, validateParams(idParamSchema), deleteCollection)

export default router
