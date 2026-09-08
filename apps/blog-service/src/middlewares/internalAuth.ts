import type { Request, Response, NextFunction } from "express";

export const compareSecret = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const gatewaySecret = req.headers["x-internal-secret"];
    const blogSecret = process.env.INTERNAL_SERVICE_SECRET;

    if (!blogSecret) {
        throw new Error("Blog Secret is not configured");
    }

    if (
        typeof gatewaySecret !== "string" ||
        gatewaySecret !== blogSecret
    ) {
        return res.status(403).json({
            success: false,
            message: "Forbidden"
        });
    }

    next();
};