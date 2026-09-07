import { ApiError } from "@blogforge/shared";
import type { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if(error instanceof ApiError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            data: null
        })
    }
    return res.status(500).json({
        success: false,
        message: "Internal server error",
        data: null,
    })
}