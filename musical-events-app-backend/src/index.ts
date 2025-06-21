import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "./prisma"; // Adjust path as needed

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/events/:date", async (req: Request, res: Response) => {
    try {
        const { date } = req.params;
        const iso = new Date(date);
        const events = await prisma.musicalEvent.findMany({
            where: { date: iso },
        });
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`✅ API running on http://localhost:${PORT}`);
});
