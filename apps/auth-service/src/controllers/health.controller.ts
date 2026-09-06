import type { Request, Response } from "express";

export const checkHealth = async (req: Request, res: Response) => {
    try {
        return res.status(200).json({
            success: true,
            service: "auth-service", 
            status: "healthy"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            service: "auth-service",
            status: "unhealthy"
        })
    }
}