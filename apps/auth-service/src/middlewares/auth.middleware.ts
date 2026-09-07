import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { ApiError } from "@blogforge/shared";
import "dotenv/config";
import { db } from "../prisma/db";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

if (!accessTokenSecret) {
    throw new Error("ACCESS_TOKEN_SECRET is not configured");
}

export const verifyJwt = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.cookies.accessToken;

    try {
        if (!token) {
            throw new Error("Access token is not found");
        }

        const decoded = jwt.verify(
            token,
            accessTokenSecret
        );

        if (
            typeof decoded === "string" ||
            typeof decoded.userId !== "number"
        ) {
            throw new Error("Invalid access token payload");
        }

        const user = await db.orm.public.User.where({ id: decoded.userId }).select(
            "id",
            "name",
            "email",
            "createdAt",
            "updatedAt"
        ).first();
        if(!user) {
            throw new ApiError(
                404,
                "User Not found"
            )
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(
            401,
            "Invalid or expired access token"
        );
    }
};