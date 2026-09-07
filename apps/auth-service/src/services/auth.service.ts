import bcrypt from "bcryptjs";
import { db } from "../prisma/db";
import { ApiError, asyncHandler } from "@blogforge/shared";
import { generateAccessToken, generateRefreshToken } from "./token.service";
import jwt from 'jsonwebtoken'



export const registerUser = async (name: string, email: string, password: string) => {
    // find If User already Exists
    const isUserAlreadyExists = await db.orm.public.User.where({ email }).first();
    if(isUserAlreadyExists) {
        throw new ApiError(
            409,
            "User with this email is already exists"
        )
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await db.orm.public.User.create({
        name,
        email,
        password: hashedPassword,
        refreshToken: ""
    })
    const accessToken = generateAccessToken(user.id)
    const refreshToken = generateRefreshToken(user.id)
    await db.orm.public.User.where({ id: user.id }).update({ refreshToken })
    return {    
        message: "User registered successfully",
        user:{
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        },
        accessToken,
        refreshToken,
    }
}

export const loginUser = async (
    email: string,
    password: string,
) => {

    const user = await db.orm.public.User
        .where({ email })
        .first();

    if (!user) {
        throw new ApiError(
            401,
            "Invalid email or password"
        )
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new ApiError(
            401,
            "Invalid email or password"
        )
    }
    // find user
    const refreshToken = generateRefreshToken(user.id)
    const accessToken = generateAccessToken(user.id)
    await db.orm.public.User.where({ id: user.id }).update({ refreshToken })
    return {
        message: "Login successful",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        },
        refreshToken,
        accessToken,
    };
};

export const refreshAccessTokenService = async (token: string) => {
    if(!token) {
        throw new ApiError(
            404,
            "Refresh Token not found"
        )
    }
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    if(!refreshTokenSecret) {
        throw new ApiError(
            404,
            "Refresh token secret not come."
        )
    }
    const decoded = jwt.verify(token, refreshTokenSecret);
    if(typeof decoded === 'string' || typeof decoded.userId !== 'number') {
        throw new ApiError(401,
            "Invalid access token payload"
        )
    }
    const user = await db.orm.public.User.where({ id: decoded.userId })
        .select("refreshToken", "id")
        .first()
    if(!user) {
        throw new ApiError(
            404,
            "User not found"
        )
    }
    if(user.refreshToken !== token) {
        throw new ApiError(
            401,
            "Invalid refresh token payload"
        )
    }

    const accessToken = generateAccessToken(user.id)
    const refreshToken= generateRefreshToken(user.id)
    
    await db.orm.public.User.where({ id: user.id }).update({ refreshToken })
    
    return {
        user,
        accessToken,
        refreshToken
    }
}