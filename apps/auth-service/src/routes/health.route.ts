import { Router } from "express";
import { checkHealth } from "../controllers/health.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyJwt, checkHealth)

export default router;