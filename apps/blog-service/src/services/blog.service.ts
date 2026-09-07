import { ApiError } from "@blogforge/shared";
import { db } from "../prisma/db"

class BlogService {
    async createBlog (
        title: string,
        slug: string,
        content: string,
        authorId: number,
    ) {
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
}

export default new BlogService()