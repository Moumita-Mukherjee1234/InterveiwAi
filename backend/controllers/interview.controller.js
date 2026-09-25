import InterviewReport from "../models/InterviewReport.model.js";
import { extractTextFromPDF } from "../services/pdf.service.js";
import { generateInterviewReport } from "../services/ai.service.js";

/**
 * POST /api/interview
 * Upload Resume + JD + Self Description → Generate + Save Interview Report
 */
export const generateInterview = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume PDF is required" });
    }

    const { jobRole, jobDescription, selfDescription } = req.body;

    if (!jobRole || !jobDescription || !selfDescription) {
      return res.status(400).json({
        message: "Job role, job description and self description are required",
      });
    }

    // 1️⃣ Extract resume text
    const resumeText = await extractTextFromPDF(req.file.buffer);

    if (!resumeText?.trim()) {
      return res.status(400).json({ message: "Could not read resume content" });
    }

    // 2️⃣ Generate AI report
    const aiReport = await generateInterviewReport({
      resumeText,
      jobDescription,
      selfDescription,
    });

    /**
     * aiReport contains:
     * technicalQuestions
     * behavioralQuestions
     * skillGaps
     * preparationPlan
     * matchScore
     */

    // 3️⃣ Save full report to DB
    const savedReport = await InterviewReport.create({
      user: req.user._id, // ✅ IMPORTANT

      // metadata (for history)
      jobRole,
      jobDescription,
      selfDescription,

      // AI output
      technicalQuestions: aiReport.technicalQuestions,
      behavioralQuestions: aiReport.behavioralQuestions,
      skillGaps: aiReport.skillGaps,
      roadmap: aiReport.preparationPlan, // ✅ map correctly
      matchScore: aiReport.matchScore,
    });

    return res.status(201).json({
      success: true,
      report: savedReport,
    });
  } catch (error) {
    console.error("Interview Generation Error:", error);
    return res.status(500).json({
      message: "Failed to generate interview report",
    });
  }
};

/**
 * GET /api/interview
 * Used for History Table on Home page
 */
export const getAllReports = async (req, res) => {
  try {
    const reports = await InterviewReport.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select("_id jobRole matchScore createdAt");

    return res.status(200).json({ reports });
  } catch (error) {
    console.error("Fetch Reports Error:", error);
    return res.status(500).json({
      message: "Failed to fetch reports",
    });
  }
};

/**
 * GET /api/interview/:id
 * Used when user clicks "View" in History table
 */
export const getInterviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await InterviewReport.findOne({
      _id: id,
      user: req.user._id, // ✅ security check
    });

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    return res.status(200).json({ report });
  } catch (error) {
    console.error("Get Interview By ID Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};