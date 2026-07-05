import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { userRepository } from "../repositories/userRepository";

const credentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const sanitizeUser = (user: User) => {
    const { passwordHash, ...safeUser } = user;
    return safeUser;
};

export const userService = {
    signup: async (rawData: unknown) => {
        const { email, password } = credentialsSchema.parse(rawData);

        const existing = await userRepository.findByEmail(email);
        if (existing) {
            throw new Error("User already exists");
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await userRepository.create({ email, passwordHash });
        return sanitizeUser(user);
    },

    login: async (rawData: unknown) => {
        const { email, password } = credentialsSchema.parse(rawData);

        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            throw new Error("Invalid credentials");
        }

        return sanitizeUser(user);
    },

    getById: async (id: string) => {
        const user = await userRepository.findById(id);
        return user ? sanitizeUser(user) : null;
    },
};
