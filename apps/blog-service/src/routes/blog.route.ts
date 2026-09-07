import { Router } from "express";
import {
     createBlog, 
     deleteBlog, 
     getAllBlogs,
     getSingleBlog,
     updateBlog
} from "../controllers/blog.controller.js";

const router = Router();

router.post("/", createBlog)
router.get("/", getAllBlogs)
router.get("/:id", getSingleBlog)
router.patch("/:id", updateBlog)
router.delete("/:id", deleteBlog)

export default router;