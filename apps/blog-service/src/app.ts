import express from 'express'
import blogRouter from './routes/blog.route';
import { errorMiddleware } from './middlewares/error.middleware';
import { compareSecret } from './middlewares/internalAuth';


const app = express()

app.use(express.json())

app.use(compareSecret)

app.use("/blogs", blogRouter)

app.use(errorMiddleware)

export default app;