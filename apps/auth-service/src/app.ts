import express from 'express'
import healthRouter from './routes/health.route.js'
import { loggerMiddleware } from './middlewares/logger.middleware.js'
import authRouter from './routes/auth.routes.js'
import { errorMiddleware } from './middlewares/error.middleware.js'

const app = express()

app.use(express.json())

app.use(loggerMiddleware)

app.use("/health", healthRouter)
app.use("/auth", authRouter)

app.use(errorMiddleware);
export default app