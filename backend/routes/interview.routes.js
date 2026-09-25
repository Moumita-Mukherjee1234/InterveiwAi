import express from "express";
import upload from "../middleware/upload.middleware.js";
import protect from "../middleware/auth.middleware.js";

import {
  generateInterview,
  getAllReports,
  getInterviewById,
} from "../controllers/interview.controller.js";

const router = express.Router();

/**
 * GET /api/interview
 * History table on Home page
 */
router.get("/", protect, getAllReports);

/**
 * GET /api/interview/:id
 * View full report when clicking "View"
 */
router.get("/:id", protect, getInterviewById);

/**
 * POST /api/interview
 * Upload resume + generate report
 */
router.post(
  "/",
  protect,
  upload.single("resume"),
  generateInterview
);

export default router;