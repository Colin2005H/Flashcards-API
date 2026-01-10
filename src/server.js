import express from 'express'
import logger from './middleware/logger.js'
import authRouter from './routers/authRouter.js'
import collectionsRouter from './routers/collectionsRouter.js'
import flashcardsRouter from './routers/flashcardsRoutes.js'
import adminRouter from './routers/adminRouter.js'
import flashcardsRouter from './routers/flashcardsRoutes.js'
import authRouter from './routers/authRoutes.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(logger)

app.use('/auth', authRouter)
app.use('/collection', collectionsRouter)
app.use('/flashcard', flashcardsRouter)
app.use('/admin', adminRouter)

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})