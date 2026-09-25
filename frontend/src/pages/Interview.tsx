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

  /* ---------------- FETCH REPORT ---------------- */

  useEffect(() => {
    if (id) {
      fetchReportById(id);
    }

    return () => {
      clearCurrentReport();
    };
  }, [id, fetchReportById, clearCurrentReport]);

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <p className="text-lg text-gray-500">
          Loading interview report...
        </p>
      </div>
    );
  }

  /* ---------------- NO REPORT ---------------- */

  if (!currentReport) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <p className="text-lg text-gray-500">
          No report found.
        </p>
      </div>
    );
  }

  /* ---------------- REPORT ---------------- */

  return (
    <div className="min-h-screen bg-[#f8fafc] p-10 space-y-10">

      {/* ================= MATCH SCORE ================= */}

      <Card className="p-8 flex items-center justify-between shadow-md rounded-2xl">
        <div>
          <h2 className="text-2xl font-bold text-[#282072]">
            Match Score
          </h2>

          <p className="text-gray-500 mt-1">
            How well your profile matches the job role
          </p>

          <p className="text-sm text-gray-400 mt-2">
            {currentReport.jobRole}
          </p>
        </div>

        <div className="text-6xl font-extrabold text-[#F1B62C]">
          {currentReport.matchScore}%
        </div>
      </Card>

      {/* ================= TECHNICAL QUESTIONS ================= */}

      <Card className="p-8 shadow-md rounded-2xl">
        <h3 className="text-xl font-semibold text-[#282072] mb-6">
          Technical Questions
        </h3>

        {currentReport.technicalQuestions?.length > 0 ? (
          <ul className="space-y-3">
            {currentReport.technicalQuestions.map(
              (question: string, index: number) => (
                <li
                  key={index}
                  className="p-4 bg-white border rounded-lg"
                >
                  <span className="font-semibold text-[#282072] mr-2">
                    {index + 1}.
                  </span>

                  {question}
                </li>
              )
            )}
          </ul>
        ) : (
          <p className="text-gray-500">
            No technical questions generated.
          </p>
        )}
      </Card>

      {/* ================= BEHAVIORAL QUESTIONS ================= */}

      <Card className="p-8 shadow-md rounded-2xl">
        <h3 className="text-xl font-semibold text-[#282072] mb-6">
          Behavioral Questions
        </h3>

        {currentReport.behavioralQuestions?.length > 0 ? (
          <ul className="space-y-3">
            {currentReport.behavioralQuestions.map(
              (question: string, index: number) => (
                <li
                  key={index}
                  className="p-4 bg-white border rounded-lg"
                >
                  <span className="font-semibold text-[#282072] mr-2">
                    {index + 1}.
                  </span>

                  {question}
                </li>
              )
            )}
          </ul>
        ) : (
          <p className="text-gray-500">
            No behavioral questions generated.
          </p>
        )}
      </Card>

      {/* ================= SKILL GAPS ================= */}

      <Card className="p-8 shadow-md rounded-2xl">
        <h3 className="text-xl font-semibold text-[#282072] mb-6">
          Skill Gaps
        </h3>

        {currentReport.skillGaps?.length > 0 ? (
          <ul className="space-y-3">
            {currentReport.skillGaps.map(
              (skill: string, index: number) => (
                <li
                  key={index}
                  className="p-4 bg-[#fff1f2] border border-[#F32A46] text-[#F32A46] rounded-lg font-medium"
                >
                  {skill}
                </li>
              )
            )}
          </ul>
        ) : (
          <p className="text-gray-500">
            No skill gaps identified.
          </p>
        )}
      </Card>

      {/* ================= PREPARATION ROADMAP ================= */}

      <Card className="p-8 shadow-md rounded-2xl">
        <h3 className="text-xl font-semibold text-[#282072] mb-6">
          Preparation Roadmap
        </h3>

        {currentReport.roadmap?.length > 0 ? (
          <ul className="space-y-3">
            {currentReport.roadmap.map(
              (step: string, index: number) => (
                <li
                  key={index}
                  className="p-4 bg-[#ecfeff] border border-[#03B3C5] rounded-lg"
                >
                  <span className="font-semibold text-[#282072] mr-2">
                    Step {index + 1}:
                  </span>

                  {step}
                </li>
              )
            )}
          </ul>
        ) : (
          <p className="text-gray-500">
            No preparation roadmap generated.
          </p>
        )}
      </Card>

    </div>
  );
}