import "dotenv/config"
import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from "express"

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

if(!accessTokenSecret) {
    throw new Error("Access Token is not configured")
}

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("I am authenticate")
    const token = req.cookies.accessToken;
    console.log("Cookies:", req.cookies);
    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Access Token is required",
            data: null,
        })
    }
    try {
        const decode = jwt.verify(token, accessTokenSecret);
        if (
            typeof decode === "string" || 
            typeof decode.userId !== "number"
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid access token payload",
                data: null,
            })
        }
        req.userId = decode.userId;
        console.log("Decoded", decode)
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired access token",
            data: null,
        })
    }
}