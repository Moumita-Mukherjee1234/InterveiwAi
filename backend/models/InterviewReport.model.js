import mongoose from "mongoose";

const InterviewReportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Metadata
    jobRole: String,
    jobDescription: String,
    selfDescription: String,

    // AI Output
    technicalQuestions: [String],
    behavioralQuestions: [String],
    skillGaps: [String],
    roadmap: [String],          // ✅ renamed from preparationPlan
    matchScore: Number,
  },
  { timestamps: true }
);

export default mongoose.model("InterviewReport", InterviewReportSchema);