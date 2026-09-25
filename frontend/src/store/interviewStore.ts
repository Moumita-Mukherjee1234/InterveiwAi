import { create } from "zustand";
import { api } from "../lib/api";

/* ---------------- TYPES ---------------- */

export interface ReportData {
  _id: string;
  user: string;
  jobRole: string;
  jobDescription: string;
  selfDescription: string;

  technicalQuestions: string[];
  behavioralQuestions: string[];
  skillGaps: string[];
  roadmap: string[];

  matchScore: number;

  createdAt: string;
  updatedAt: string;
}

interface InterviewState {
  reports: ReportData[];
  currentReport: ReportData | null;
  loading: boolean;

  fetchReports: () => Promise<void>;
  fetchReportById: (id: string) => Promise<void>;
  clearCurrentReport: () => void;
}

/* ---------------- STORE ---------------- */

export const useInterviewStore = create<InterviewState>((set) => ({
  reports: [],
  currentReport: null,
  loading: false,

  /* Fetch all reports */
  fetchReports: async () => {
    try {
      set({ loading: true });

      const res = await api.get("/api/interview");

      set({
        reports: res.data.reports || [],
        loading: false,
      });
    } catch (error: any) {
      console.error("Failed to fetch reports:", error);
      console.error("Status:", error?.response?.status);
      console.error("Response:", error?.response?.data);

      set({
        reports: [],
        loading: false,
      });
    }
  },

  /* Fetch one report */
  fetchReportById: async (id: string) => {
    try {
      set({
        loading: true,
        currentReport: null,
      });

      const res = await api.get(`/api/interview/${id}`);

      console.log("REPORT RESPONSE:", res.data);

      set({
        currentReport: res.data.report,
        loading: false,
      });
    } catch (error: any) {
      console.error("Failed to fetch report:", error);
      console.error("Status:", error?.response?.status);
      console.error("Response:", error?.response?.data);

      set({
        currentReport: null,
        loading: false,
      });
    }
  },

  /* Clear current report */
  clearCurrentReport: () => {
    set({
      currentReport: null,
    });
  },
}));