import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { authenticate } from "../middlewares/auth.middleware.js";
import type { IncomingMessage } from "node:http";

const router = Router()

const authProxy = createProxyMiddleware({
    target: "http://localhost:4001/auth",
    changeOrigin: true,
       on: {
        proxyReq: (proxyReq, req) => {
            proxyReq.setHeader(
                "x-internal-secret",
                process.env.INTERNAL_SERVICE_SECRET!
            );
        }
    }
})
const logoutProxy = createProxyMiddleware({
    target: "http://localhost:4001/auth",
    changeOrigin: true,
    on: {
        proxyReq: (proxyReq, req) => {
            proxyReq.setHeader(
                "x-user-id",
                String((req as IncomingMessage & { userId: string }).userId)
            )
            proxyReq.setHeader(
                "x-internal-secret",
                process.env.INTERNAL_SERVICE_SECRET!
            )
        }
    }
})

router.post("/register", authProxy)
router.post("/login", authProxy)
router.post("/refresh-accessToken", authenticate, authProxy)

router.post("/logout", authenticate, logoutProxy)
router.get("/me", authenticate, logoutProxy)
export default router;