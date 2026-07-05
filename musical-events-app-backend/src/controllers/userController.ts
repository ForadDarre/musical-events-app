import { Request, Response } from "express";
import { userService } from "../services/userService";
import { signAuthToken } from "../auth";
import { AuthedRequest } from "../middleware/authMiddleware";

const AUTH_COOKIE_NAME = "auth_token";

const setAuthCookie = (res: Response, userId: string) => {
    const token = signAuthToken(userId);
    res.cookie(AUTH_COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};

export const userController = {
    signup: async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await userService.signup(req.body);
            setAuthCookie(res, user.id);
            res.status(201).json(user);
        } catch (error: any) {
            console.error(error);
            if (error.name === "ZodError") {
                res.status(400).json({ error: error.message });
                return;
            }
            if (error.message === "User already exists") {
                res.status(409).json({ error: error.message });
                return;
            }
            res.status(500).json({ error: "Internal server error" });
        }
    },

    login: async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await userService.login(req.body);
            setAuthCookie(res, user.id);
            res.status(200).json(user);
        } catch (error: any) {
            console.error(error);
            if (error.name === "ZodError") {
                res.status(400).json({ error: error.message });
                return;
            }
            if (error.message === "Invalid credentials") {
                res.status(401).json({ error: error.message });
                return;
            }
            res.status(500).json({ error: "Internal server error" });
        }
    },

    me: async (req: AuthedRequest, res: Response): Promise<void> => {
        try {
            if (!req.userId) {
                res.status(401).json({ error: "Unauthorized" });
                return;
            }
            const user = await userService.getById(req.userId);
            if (!user) {
                res.status(401).json({ error: "Unauthorized" });
                return;
            }
            res.status(200).json(user);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};
