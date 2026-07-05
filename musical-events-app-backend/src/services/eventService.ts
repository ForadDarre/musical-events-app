import { eventRepository } from "../repositories/eventRepository";
import { MusicalEvent } from "@prisma/client";

export const eventService = {
    getEventsByDate: async (date: Date) => {
        return eventRepository.getByDate(date);
    },
    getAllEvents: async () => {
        return eventRepository.getAllEvents();
    },
    getEventsForUser: async (userId: string) => {
        if (!userId) {
            throw new Error("User ID is required");
        }
        return eventRepository.getByUser(userId);
    },
    createEvent: async (
        userId: string,
        data: Omit<MusicalEvent, "id" | "userId" | "createdAt" | "updatedAt">,
    ) => {
        if (!data.title || !data.date) {
            throw new Error("Title and date are required");
        }
        const toCreate = { ...(data as any), userId } as Omit<
            MusicalEvent,
            "id"
        >;
        return eventRepository.create(toCreate);
    },

    updateEvent: async (
        id: string,
        data: Partial<Omit<MusicalEvent, "id" | "createdAt" | "updatedAt">>,
    ) => {
        if (!id) {
            throw new Error("Event ID is required");
        }
        return eventRepository.update(id, data);
    },
};
