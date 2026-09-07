import { Router } from "express";
import {
     createBlog, 
     getAllBlogs
} from "../controllers/blog.controller.js";

const router = Router();

router.get("/", getAllBlogs)
router.post("/", createBlog)

export default router;