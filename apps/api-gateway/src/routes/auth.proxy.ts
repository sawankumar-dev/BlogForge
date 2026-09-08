import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = Router()

const authProxy = createProxyMiddleware({
    target: "http://localhost:4001/auth",
    changeOrigin: true,
})

router.post("/register", authProxy)
router.post("/login", authProxy)
router.post("/refresh-accessToken", authProxy)

export default router;