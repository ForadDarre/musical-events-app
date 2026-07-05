import { Request, Response, NextFunction } from "express";
import { verifyAuthToken } from "../auth";

const AUTH_COOKIE_NAME = "auth_token";

export interface AuthedRequest extends Request {
    userId?: string;
}

export function requireAuth(
    req: AuthedRequest,
    res: Response,
    next: NextFunction,
): void {
    const token = req.cookies?.[AUTH_COOKIE_NAME];

    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const payload = verifyAuthToken(token);

    if (!payload?.userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    req.userId = payload.userId;
    next();
}
