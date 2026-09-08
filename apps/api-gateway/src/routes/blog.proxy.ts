import { Router } from "express";
import type { IncomingMessage } from "node:http";
import { createProxyMiddleware } from "http-proxy-middleware";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

const blogProxy = createProxyMiddleware({
    target: "http://localhost:4002/blogs",
    changeOrigin: true,
})

const createAuthenticatedBlogProxy = () => {
    return createProxyMiddleware({
        target: "http://localhost:4002/blogs",
        changeOrigin: true,
        on: {
            proxyReq: (proxyReq, req) => {
                proxyReq.removeHeader("x-user-id");
                proxyReq.setHeader(
                    "x-user-id",
                    String((req as IncomingMessage & { userId: string }).userId)
                )
            }
        }
    })
}

// Public
router.get("/", blogProxy)
router.get("/:id", blogProxy)

// Protected
router.post("/", authenticate, createAuthenticatedBlogProxy())
router.patch("/:id", authenticate, createAuthenticatedBlogProxy())
router.delete("/:id", authenticate, createAuthenticatedBlogProxy());

export default router;