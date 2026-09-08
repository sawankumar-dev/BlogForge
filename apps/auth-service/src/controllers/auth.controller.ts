import type { Response, Request } from "express";
import {
    registerUser,
    loginUser,
    refreshAccessTokenService,
    logoutUserService,
    getMyProfileService
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
    console.log("me profile chala to sahi")
    const userId = Number(req.headers["x-user-id"]);
    const user = await getMyProfileService(userId)
    return res.status(200).json(
        new ApiResponse(
            200,
            "user Fetched successfully",
            user
        )
    )
})

export const refreshAccessToken = asyncHandler (
    async (
        req: Request,
        res: Response
    ) => {            
        const refToken = req.cookies.refreshToken;
        const { refreshToken, accessToken   } = await refreshAccessTokenService(refToken)
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        })
        return res.status(200).json(
            new ApiResponse(
                200,
                "Access token refreshed successfully",
                null
            )
        )
    }
)

export const logoutUser = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {
        const userId = Number(req.headers["x-user-id"]);

        await logoutUserService(userId);

        res.clearCookie("accessToken", {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                "User Logout Successfully",
                null
            )
        );
    }
);