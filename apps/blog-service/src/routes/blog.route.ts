import { Router } from "express";
import {
     createBlog, 
     getAllBlogs,
     getSingleBlog,
     updateBlog
} from "../controllers/blog.controller.js";

const router = Router();

router.post("/", createBlog)
router.get("/", getAllBlogs)
router.get("/:id", getSingleBlog)
router.patch("/:id", updateBlog)

export default router;