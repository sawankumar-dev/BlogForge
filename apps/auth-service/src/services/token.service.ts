import jwt, { type SignOptions } from "jsonwebtoken";
import "dotenv/config"

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const accessTokenExpiry  = process.env.ACCESS_TOKEN_EXPIRES_IN;
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRES_IN;

if (!accessTokenSecret) {
    throw new Error("ACCESS_TOKEN_SECRET is not configured");
}
if(!refreshTokenSecret) {
    throw new Error("REFRESH_TOKEN_SECRET is not configured")
}
if(!accessTokenExpiry) {
    throw new Error("ACCESS_TOKEN_EXPIRY is not configured")
}
if(!refreshTokenExpiry) {
    throw new Error("REFRESH_TOKEN_EXPIRY is not configured")
}
export const generateAccessToken = (userId: number) => {
    return jwt.sign(
        {
            userId
        },
        accessTokenSecret,
        {
            expiresIn: accessTokenExpiry as NonNullable<SignOptions["expiresIn"]>
        }
    )
}

export const generateRefreshToken = (userId: number) => {
    return jwt.sign(
        {
            userId
        },
        refreshTokenSecret,
        {
            expiresIn: refreshTokenExpiry as NonNullable<SignOptions["expiresIn"]>
        }
    )
}