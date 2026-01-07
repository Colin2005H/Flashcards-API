import { Router } from "express"
import { login, register, getMe } from "../controllers/authController.js"
import { validateBody } from "../middleware/validation.js"
import { loginSchema, userSchema } from "../models/user.js"
import { authenticateToken } from "../middleware/authenticateToken.js"

const router = Router()

router.post('/register', validateBody(userSchema), register)
router.post('/login', validateBody(loginSchema), login)
router.get('/me', authenticateToken, getMe)

export default router