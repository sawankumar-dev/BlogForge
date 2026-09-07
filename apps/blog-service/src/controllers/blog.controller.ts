import { ApiResponse, asyncHandler } from "@blogforge/shared"
import type { Request, Response } from "express"
import blogService from "../services/blog.service";

export const createBlog = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {
        const { title, slug, content, authorId } = req.body;
        const blog = await blogService.createBlog(
            title,
            slug,
            content,
            authorId,
        )
        return res.status(201).json(
            new ApiResponse(
                201,
                "Blog created successfully",
                blog
            )
        )
    }
)

export const getAllBlogs = asyncHandler(
    async (
        req: Request,
        res: Response,
    ) => {
        const blogs = await blogService.getAllBlogs()
        return res.status(200).json(
            new ApiResponse(
                200,
                "All Blogs fetched successfully!",
                blogs
            )
        )
    }
)