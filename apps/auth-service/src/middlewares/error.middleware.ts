import type { Request, Response, NextFunction } from "express";
import { ApiError } from "@blogforge/shared";

export const errorMiddleware = (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if(error instanceof ApiError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            data: null
        })
    }
    console.log(error)
    return res.status(500).json({
        success: false,
        message: "Internal server Error",
        data: null
    })
}