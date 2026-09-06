import express from 'express'
import healthRouter from './routes/health.route.js'
import { loggerMiddleware } from './middlewares/logger.middleware.js'
import authRouter from './routes/auth.routes.js'
import { errorMiddleware } from './middlewares/error.middleware.js'
// cookie-parser does not ship TypeScript declarations.
// @ts-expect-error: cookie-parser is a JavaScript dependency without bundled types.
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(loggerMiddleware)

app.use("/health", healthRouter)
app.use("/auth", authRouter)

app.use(errorMiddleware);
export default app