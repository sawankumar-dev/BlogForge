export const getCookieOption = (maxAge: any, NODE_ENV: string)  => {
    return {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "lax",
        maxAge,
    }
}
