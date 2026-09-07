import bcrypt from "bcryptjs";
import { db } from "../prisma/db";
import { ApiError, asyncHandler } from "@blogforge/shared";
import { generateAccessToken, generateRefreshToken } from "./token.service";

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