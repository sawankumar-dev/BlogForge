import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = Router()

router.use(
    createProxyMiddleware({
        target: "http://localhost:4001/auth",
        changeOrigin: true,
    })
)

export default router;