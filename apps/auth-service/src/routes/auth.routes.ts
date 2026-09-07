import { Router } from "express";
import { loginController, myProfile, registerController } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/register", validate(registerSchema) ,registerController)
router.post("/login", validate(loginSchema),  loginController)
router.get("/me", verifyJwt, myProfile)

export default router;