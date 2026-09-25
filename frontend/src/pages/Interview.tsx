import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/ui/card";
import { useInterviewStore } from "../store/interviewStore";

export default function Interview() {
  const { id } = useParams<{ id: string }>();

  const {
    currentReport,
    fetchReportById,
    clearCurrentReport,
    loading,
  } = useInterviewStore();

  // ✅ Fetch report from backend using ID in URL
  useEffect(() => {
    if (id) fetchReportById(id);

    // clear when leaving page
    return () => clearCurrentReport();
  }, [id, fetchReportById, clearCurrentReport]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading report...
      </div>
    );
  }

  if (!currentReport) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        No report found.
      </div>
    );
  }

  const report = currentReport.report;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-10 space-y-10">
      {/* 🔷 Match Score */}
      <Card className="p-8 flex items-center justify-between shadow-md rounded-2xl">
        <div>
          <h2 className="text-2xl font-bold text-[#282072]">Match Score</h2>
          <p className="text-gray-500">
            How well your profile matches the job role
          </p>
        </div>
        <div className="text-6xl font-extrabold text-[#F1B62C]">
          {currentReport.matchScore}%
        </div>
      </Card>

      {/* 🔷 Technical Questions */}
      <Card className="p-8 shadow-md rounded-2xl">
        <h3 className="text-xl font-semibold text-[#282072] mb-6">
          Technical Questions
        </h3>
        <ul className="space-y-3">
          {report.technicalQuestions?.map((q: string, i: number) => (
            <li key={i} className="p-4 bg-white border rounded-lg">
              {q}
            </li>
          ))}
        </ul>
      </Card>

      {/* 🔷 Behavioral Questions */}
      <Card className="p-8 shadow-md rounded-2xl">
        <h3 className="text-xl font-semibold text-[#282072] mb-6">
          Behavioral Questions
        </h3>
        <ul className="space-y-3">
          {report.behavioralQuestions?.map((q: string, i: number) => (
            <li key={i} className="p-4 bg-white border rounded-lg">
              {q}
            </li>
          ))}
        </ul>
      </Card>

      {/* 🔷 Skill Gaps */}
      <Card className="p-8 shadow-md rounded-2xl">
        <h3 className="text-xl font-semibold text-[#282072] mb-6">
          Skill Gaps
        </h3>
        <ul className="space-y-3">
          {report.skillGaps?.map((s: string, i: number) => (
            <li
              key={i}
              className="p-4 bg-[#fff1f2] border border-[#F32A46] text-[#F32A46] rounded-lg font-medium"
            >
              {s}
            </li>
          ))}
        </ul>
      </Card>

      {/* 🔷 Roadmap */}
      <Card className="p-8 shadow-md rounded-2xl">
        <h3 className="text-xl font-semibold text-[#282072] mb-6">
          Preparation Roadmap
        </h3>
        <ul className="space-y-3">
          {report.roadmap?.map((r: string, i: number) => (
            <li
              key={i}
              className="p-4 bg-[#ecfeff] border border-[#03B3C5] rounded-lg"
            >
              {r}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}