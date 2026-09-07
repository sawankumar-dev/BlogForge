import express from 'express'
import blogRouter from './routes/blog.route';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express()

app.use(express.json())

app.use("/blogs", blogRouter)

app.use(errorMiddleware)

export default app;