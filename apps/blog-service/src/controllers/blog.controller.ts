import { ApiResponse, asyncHandler } from "@blogforge/shared"
import type { Request, Response } from "express"
import blogService from "../services/blog.service";

export const createBlog = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {
        const { title, slug, content } = req.body;
        const authorId = Number(req.headers["x-user-id"]);
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

export const getSingleBlog = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {
        const { id } = req.params;
        const blog = await blogService.getSingleBlog(Number(id));
        return res.status(200).json(
            new ApiResponse(
                200,
                "Blog fetched successfully",
                blog
            )
        )
    }
)

export const updateBlog = asyncHandler(
    async (
        req: Request,
        res: Response,
    ) => {
        const { title, content, slug } = req.body;
        const userId = Number(req.headers["x-user-id"])
        const { id } = req.params;
        const updatedBlog = await blogService.updateBlog(Number(id), userId, title, slug, content);
        return res.status(200).json(
            new ApiResponse(
                200,
                "Blog updated successfully!",
                updatedBlog
            )
        )
    }
)

export const deleteBlog = asyncHandler(
    async (
        req: Request,
        res: Response,
    ) => {
        const id = Number(req.params.id);
        const userId = req.headers["x-user-id"];
        const deletedBlog = await blogService.deleteBlog(id, Number(userId));
        return res.status(200).json(
            new ApiResponse(
                200,
                "Blog Deleted successfully",
                deletedBlog
            )
        )
    }
)