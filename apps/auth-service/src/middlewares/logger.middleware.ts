import type { Response, Request, NextFunction } from "express";

export const loggerMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => { 
    console.log(`${req.method} ${req.url}`)
    next()
}