import { create } from "zustand";
import { api } from "../lib/api";

/* ---------------- TYPES ---------------- */

export interface InterviewReport {
  _id: string;
  jobRole: string;
  matchScore: number;
  createdAt: string;

  // full AI report fields (keep as any if not strictly typed yet)
  report: any;
}

interface InterviewState {
  reports: InterviewReport[];
  currentReport: InterviewReport | null;
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

  /* ✅ Fetch all reports for History table */
  fetchReports: async () => {
    try {
      set({ loading: true });

      const res = await api.get("/api/interview");
      set({
        reports: res.data.reports,
        loading: false,
      });
    } catch (err) {
      console.error("Failed to fetch reports", err);
      set({ loading: false });
    }
  },

  /* ✅ Fetch single report when opening /interview/:id */
  fetchReportById: async (id: string) => {
    try {
      set({ loading: true });

      const res = await api.get(`/api/interview/${id}`);
      set({
        currentReport: res.data.report,
        loading: false,
      });
    } catch (err) {
      console.error("Failed to fetch report", err);
      set({ loading: false });
    }
  },

  /* ✅ Clear when leaving page */
  clearCurrentReport: () => {
    set({ currentReport: null });
  },
}));