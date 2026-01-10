import { Router } from 'express'
import { listUsers, getUser, deleteUser } from '../controllers/adminController.js'
import { authenticateToken } from '../middleware/authenticateToken.js'
import { requireAdmin } from '../middleware/requireAdmin.js'
import { validateParams } from '../middleware/validation.js'
import { userIdSchema } from '../models/user.js'

const router = Router()

// List all users
router.get('/users', authenticateToken, requireAdmin, listUsers)

// get information about a user by its id
router.get('/users/:userId', authenticateToken, requireAdmin, validateParams(userIdSchema), getUser)

// Delete a user and its data
router.delete('/users/:userId', authenticateToken, requireAdmin, validateParams(userIdSchema), deleteUser)

export default router
