import express from 'express'
import blogRouter from './routes/blog.route';

const app = express()

app.use(express.json())

app.use("/blogs", blogRouter)

export default app;