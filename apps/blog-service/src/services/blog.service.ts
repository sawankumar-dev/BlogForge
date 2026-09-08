import { ApiError } from "@blogforge/shared";
import { db } from "../prisma/db"

class BlogService {
    async createBlog (
        title: string,
        slug: string,
        content: string,
        authorId: number,
    ) {
        // check if this Blog already exists
        const existingBlog = await db.orm.public.Blog.where({ slug }).first()
        if(existingBlog) {
            throw new ApiError(
                409,
                "Blog is already created"
            )
        }
        const blog = await db.orm.public.Blog.create({
            title,
            slug,
            content,
            authorId
        })
        return blog
    }
    async getAllBlogs () {
        const blogs = await db.orm.public.Blog.all();
        if(!blogs) {
            throw new ApiError(
                404,
                "Blogs not found"
            )
        }
        return blogs;
    }
    async getSingleBlog(id: number) {
        const blog = await db.orm.public.Blog.where({ id }).first();
        if(!blog) {
            throw new ApiError(
                404,
                "blog not found"
            )
        }
        return blog;
    }
    async updateBlog ( 
        id: number,
        userId: number,
        title?: string,
        slug?: string,
        content?: string,
    ) {
        const existingBlog = await db.orm.public.Blog.where({ id }).first()
        if(!existingBlog) {
            throw new ApiError(
                404,
                "Blog not found"
            )
        }
        if(existingBlog.authorId !== userId) {
            throw new ApiError(
                403,
                "You are not allowed to update this blog"
            )
        }
        const blog = await db.orm.public.Blog.where({ id }).update({
            title: title ?? existingBlog.title,
            slug: slug ?? existingBlog.slug,
            content: content ?? existingBlog.content,
        });
        return blog;
    }
    async deleteBlog (id: number, userId: number) {
        const existingBlog = await db.orm.public.Blog.where({ id }).first();

        if(!existingBlog) {
            throw new ApiError(
                404,
                "Blog not found"
            )
        }
        if(existingBlog?.authorId !== userId) {
            throw new ApiError(
                403,
                "You are not allowed to this action"
            )
        }
        await db.orm.public.Blog.where({ id }).delete()
        return existingBlog;
    }    
}

export default new BlogService()