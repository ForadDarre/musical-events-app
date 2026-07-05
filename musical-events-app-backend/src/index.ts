import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`✅ API running on http://localhost:${PORT}`);
});
