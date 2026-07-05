import { prisma } from "../prisma";
import { MusicalEvent } from "@prisma/client";

export const eventRepository = {
    getByDate: async (date: Date): Promise<MusicalEvent[]> => {
        return prisma.musicalEvent.findMany({
            where: { date },
        });
    },
    getAllEvents: async (): Promise<MusicalEvent[]> => {
        return prisma.musicalEvent.findMany();
    },
    getByUser: async (userId: string): Promise<MusicalEvent[]> => {
        return prisma.musicalEvent.findMany({
            where: { userId },
            orderBy: { date: "asc" },
        });
    },
    create: async (data: Omit<MusicalEvent, "id">): Promise<MusicalEvent> => {
        return prisma.musicalEvent.create({
            data,
        });
    },
    update: async (
        id: string,
        data: Partial<Omit<MusicalEvent, "id" | "createdAt" | "updatedAt">>,
    ): Promise<MusicalEvent> => {
        return prisma.musicalEvent.update({
            where: { id },
            data,
        });
    },
};
