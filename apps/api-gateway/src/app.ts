import express from "express";
import cookieParser from "cookie-parser";

import blogProxy from "./routes/blog.proxy.js";
import authProxy from "./routes/auth.proxy.js";

const app = express();

app.use(cookieParser())

app.use("/api/blogs", blogProxy);
app.use("/api/auth", authProxy)

app.use(express.json());

export default app;