import { Router } from "express";
import { eventController } from "../controllers/eventController";

const router = Router();

router.get("/byDate/:date", eventController.getEventsByDate);
router.get("/all", eventController.getAllEvents);
router.post("/", eventController.createEvent);

export default router;
