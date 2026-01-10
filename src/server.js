import express from 'express'
import logger from './middleware/logger.js'
import flashcardsRouter from './routers/flashcardsRoutes.js'
import authRouter from './routers/authRoutes.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(logger)

app.use('/flashcards', flashcardsRouter)
app.use('/auth', authRouter)

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})