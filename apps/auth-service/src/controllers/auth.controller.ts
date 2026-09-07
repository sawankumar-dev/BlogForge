import type { Response, Request } from "express";
import {
    registerUser,
    loginUser
} from "../services/auth.service.js";
import {
    ApiResponse,
    asyncHandler
} from "@blogforge/shared";

export const registerController = asyncHandler(async (
    req: Request,
    res: Response
) => {

    const { name, email, password } = req.body;

    const result = await registerUser(
        name,
        email,
        password
    );
    res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
    })
    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    return res.status(201).json(
        new ApiResponse(
            201,
            "User registered successfully",
            result
        )
    );
});

export const loginController = asyncHandler(async (
    req: Request,
    res: Response
) => {

    const { email, password } = req.body;

    const result = await loginUser(
        email,
        password
    );

    res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
    })
    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(200).json(
        new ApiResponse(
            200,
            "Login successful",
            result
        )
    );
});

export const myProfile = asyncHandler(async (
    req: Request,
    res: Response,
) => {
    const user = req.user;
    return res.status(200).json(
        new ApiResponse(
            200,
            "user Fetched successfully",
            user
        )
    )
})