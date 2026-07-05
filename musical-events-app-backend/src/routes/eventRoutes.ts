import { Router } from "express";
import { eventController } from "../controllers/eventController";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

router.get("/byDate/:date", eventController.getEventsByDate);
router.get("/all", eventController.getAllEvents);
router.get("/user/:userId", eventController.getEventsForUser);
router.get("/me", requireAuth, eventController.getEventsForCurrentUser);
router.post("/", requireAuth, eventController.createEvent);
router.put("/:id", requireAuth, eventController.updateEvent);

export default router;
