import { Response } from "express";
import { eventService } from "../services/eventService";
import { AuthedRequest } from "../middleware/authMiddleware";

export const eventController = {
    getEventsByDate: async (req: AuthedRequest, res: Response) => {
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
    getAllEvents: async (req: AuthedRequest, res: Response) => {
        try {
            const events = await eventService.getAllEvents();
            res.json(events);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    getEventsForUser: async (req: AuthedRequest, res: Response) => {
        try {
            const { userId } = req.params;
            const events = await eventService.getEventsForUser(userId);
            res.json(events);
        } catch (error: any) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },
    getEventsForCurrentUser: async (req: AuthedRequest, res: Response) => {
        try {
            if (!req.userId) {
                res.status(401).json({ error: "Unauthorized" });
                return;
            }
            const events = await eventService.getEventsForUser(req.userId);
            res.json(events);
        } catch (error: any) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },
    createEvent: async (req: AuthedRequest, res: Response) => {
        try {
            if (!req.userId) {
                res.status(401).json({ error: "Unauthorized" });
                return;
            }
            const newEvent = await eventService.createEvent(
                req.userId,
                req.body,
            );
            res.status(201).json(newEvent);
        } catch (error: any) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },
    updateEvent: async (req: AuthedRequest, res: Response) => {
        try {
            const { id } = req.params;
            const updated = await eventService.updateEvent(id, req.body);
            res.status(200).json(updated);
        } catch (error: any) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },
};
