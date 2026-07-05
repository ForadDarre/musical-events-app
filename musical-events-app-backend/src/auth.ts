import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export interface AuthTokenPayload {
    userId: string;
}

export function signAuthToken(userId: string): string {
    const payload: AuthTokenPayload = { userId };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyAuthToken(token: string): AuthTokenPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
    } catch {
        return null;
    }
}
