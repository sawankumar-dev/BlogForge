import type { Response, Request } from "express";
import { registerUser } from "../services/auth.service.js";

export const registerController = async (
    req: Request,
    res: Response
) => {
    const { name, email, password } = req.body;
    const result = await registerUser(name, email, password);
    return res.status(201).json({
        success: true,
        ...result
    })
}