import { Request, Response } from "express";
import { eventService } from "../services/eventService";

export const eventController = {
    getEventsByDate: async (req: Request, res: Response) => {
        try {
            const { date } = req.params;
            const iso = new Date(date);
            const events = await eventService.getEventsByDate(iso);
            res.json(events);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    getAllEvents: async (req: Request, res: Response) => {
        try {
            const events = await eventService.getAllEvents();
            res.json(events);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    createEvent: async (req: Request, res: Response) => {
        try {
            const newEvent = await eventService.createEvent(req.body);
            res.status(201).json(newEvent);
        } catch (error: any) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },
};
