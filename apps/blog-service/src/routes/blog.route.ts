import { Router } from "express";
import {
     createBlog, 
     getAllBlogs,
     getSingleBlog
} from "../controllers/blog.controller.js";

const router = Router();

router.post("/", createBlog)
router.get("/", getAllBlogs)
router.get("/:id", getSingleBlog)

export default router;