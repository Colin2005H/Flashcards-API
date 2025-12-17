import express from 'express'
import logger from './middleware/logger.js'
import authRouter from './routers/authRouter.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(logger)

app.use('/auth', authRouter)

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})