import { eventRepository } from "../repositories/eventRepository";
import { MusicalEvent } from "@prisma/client";

export const eventService = {
    getEventsByDate: async (date: Date) => {
        return eventRepository.getByDate(date);
    },
    getAllEvents: async () => {
        return eventRepository.getAllEvents();
    },
    createEvent: async (data: Omit<MusicalEvent, "id">) => {
        // You could validate here
        if (!data.title || !data.date) {
            throw new Error("Title and date are required");
        }
        return eventRepository.create(data);
    },
};
