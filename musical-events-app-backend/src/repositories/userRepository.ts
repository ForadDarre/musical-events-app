import { prisma } from "../prisma";
import { User } from "@prisma/client";

export const userRepository = {
    findByEmail: async (email: string): Promise<User | null> => {
        return prisma.user.findUnique({ where: { email } });
    },

    findById: async (id: string): Promise<User | null> => {
        return prisma.user.findUnique({ where: { id } });
    },

    create: async (data: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> => {
        return prisma.user.create({ data });
    },
};
