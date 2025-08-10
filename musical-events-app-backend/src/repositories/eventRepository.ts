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
    create: async (data: Omit<MusicalEvent, "id">): Promise<MusicalEvent> => {
        return prisma.musicalEvent.create({
            data,
        });
    },
};
