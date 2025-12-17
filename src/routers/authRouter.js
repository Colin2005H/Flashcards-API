import { Router } from "express"
import { login, register } from "../controllers/authController.js"
import { validateBody } from "../middleware/validation.js"
import { loginSchema, userSchema } from "../models/user.js"

const router = Router()

router.post('/register', validateBody(userSchema), register)
router.post('/login', validateBody(loginSchema), login)

export default router