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
    async getAllBlogs (

    ) {
        const blogs = await db.orm.public.Blog.all();
        return blogs;
    }
}

export default new BlogService()