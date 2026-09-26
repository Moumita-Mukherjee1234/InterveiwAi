import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "../routes/auth.routes.js";
import interviewRoutes from "../routes/interview.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://interveiwai-frontend.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

export default app;