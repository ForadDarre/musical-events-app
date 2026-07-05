import { Router } from "express";
import { userController } from "../controllers/userController";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/me", requireAuth, userController.me);

export default router;
