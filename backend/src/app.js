import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "../routes/auth.routes.js";
import interviewRoutes from "../routes/interview.routes.js";

const app = express();

// ✅ Correct CORS for frontend (5173) + cookies
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

export default app;