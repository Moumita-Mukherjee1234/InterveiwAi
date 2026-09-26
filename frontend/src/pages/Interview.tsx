import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/ui/card";
import { useInterviewStore } from "../store/interviewStore";
import Navbar from "../components/Navbar";

export default function Interview() {
  const { id } = useParams<{ id: string }>();

  const {
    currentReport,
    fetchReportById,
    clearCurrentReport,
    loading,
  } = useInterviewStore();

  useEffect(() => {
    if (id) {
      fetchReportById(id);
    }

    return () => {
      clearCurrentReport();
    };
  }, [id, fetchReportById, clearCurrentReport]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Navbar />

        <div className="flex min-h-[80vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />
            </div>

            <h2 className="mt-5 text-lg font-bold text-slate-900">
              Preparing your report
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Loading your personalized interview analysis...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentReport) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Navbar />

        <div className="flex min-h-[80vh] items-center justify-center">
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-xl">
              !
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No report found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              The interview report could not be loaded.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const score = Number(currentReport.matchScore || 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Decorative background */}
      <div className="relative overflow-hidden">
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-indigo-100/50 blur-3xl" />
        <div className="absolute top-[500px] -left-40 h-96 w-96 rounded-full bg-cyan-100/40 blur-3xl" />

        <main className="relative mx-auto max-w-6xl px-5 py-10 sm:px-8">

          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-indigo-600">
              AI Interview Analysis
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Your Interview Report
            </h1>

            <p className="mt-2 text-slate-500">
              Personalized preparation insights for{" "}
              <span className="font-semibold text-slate-700">
                {currentReport.jobRole}
              </span>
            </p>
          </div>

          {/* Match Score */}
          <Card className="relative overflow-hidden rounded-3xl border-0 bg-gradient-to-br from-indigo-600 via-indigo-600 to-cyan-600 p-8 text-white shadow-xl shadow-indigo-200">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />

            <div className="relative flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
              <div>
                <div className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90">
                  Profile Match
                </div>

                <h2 className="mt-4 text-2xl font-bold">
                  How well you match this role
                </h2>

                <p className="mt-2 max-w-lg text-sm leading-6 text-indigo-100">
                  Your AI-generated match score is based on your profile,
                  resume, skills and the target job requirements.
                </p>

                <p className="mt-5 text-sm font-medium text-white/70">
                  Target role:{" "}
                  <span className="text-white">
                    {currentReport.jobRole}
                  </span>
                </p>
              </div>

              <div className="flex h-36 w-36 shrink-0 flex-col items-center justify-center rounded-full border-8 border-white/20 bg-white/10 backdrop-blur">
                <span className="text-4xl font-extrabold">
                  {score}%
                </span>

                <span className="mt-1 text-xs font-medium text-indigo-100">
                  Match
                </span>
              </div>
            </div>
          </Card>

          {/* Quick Summary */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Technical
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {currentReport.technicalQuestions?.length || 0}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Questions generated
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Behavioral
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {currentReport.behavioralQuestions?.length || 0}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Questions generated
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Skill Gaps
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {currentReport.skillGaps?.length || 0}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Areas to improve
              </p>
            </div>
          </div>

          {/* Technical Questions */}
          <Card className="mt-8 rounded-2xl border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                ✓
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Technical Questions
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Technical areas you should be prepared to discuss.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {currentReport.technicalQuestions?.length > 0 ? (
                currentReport.technicalQuestions.map(
                  (question: string, index: number) => (
                    <div
                      key={index}
                      className="group flex gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-indigo-100 hover:bg-indigo-50/40"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-bold text-indigo-600 shadow-sm">
                        {index + 1}
                      </span>

                      <p className="pt-1 text-sm leading-6 text-slate-700">
                        {question}
                      </p>
                    </div>
                  )
                )
              ) : (
                <p className="text-sm text-slate-500">
                  No technical questions generated.
                </p>
              )}
            </div>
          </Card>

          {/* Behavioral Questions */}
          <Card className="mt-6 rounded-2xl border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                ?
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Behavioral Questions
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Questions designed to help you prepare your personal answers.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {currentReport.behavioralQuestions?.length > 0 ? (
                currentReport.behavioralQuestions.map(
                  (question: string, index: number) => (
                    <div
                      key={index}
                      className="flex gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-cyan-100 hover:bg-cyan-50/40"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-bold text-cyan-600 shadow-sm">
                        {index + 1}
                      </span>

                      <p className="pt-1 text-sm leading-6 text-slate-700">
                        {question}
                      </p>
                    </div>
                  )
                )
              ) : (
                <p className="text-sm text-slate-500">
                  No behavioral questions generated.
                </p>
              )}
            </div>
          </Card>

          {/* Skill Gaps */}
          <Card className="mt-6 rounded-2xl border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                !
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Skill Gaps
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Areas that may need additional preparation.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {currentReport.skillGaps?.length > 0 ? (
                currentReport.skillGaps.map(
                  (skill: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-xl border border-rose-100 bg-rose-50/70 p-4"
                    >
                      <div className="h-2 w-2 rounded-full bg-rose-500" />

                      <span className="text-sm font-medium text-rose-700">
                        {skill}
                      </span>
                    </div>
                  )
                )
              ) : (
                <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                  No major skill gaps identified.
                </div>
              )}
            </div>
          </Card>

          {/* Preparation Roadmap */}
          <Card className="mt-6 rounded-2xl border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                →
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Preparation Roadmap
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Follow these steps to strengthen your interview preparation.
                </p>
              </div>
            </div>

            <div className="mt-7">
              {currentReport.roadmap?.length > 0 ? (
                <div className="relative space-y-5">
                  <div className="absolute left-5 top-5 bottom-5 w-px bg-cyan-100" />

                  {currentReport.roadmap.map(
                    (step: string, index: number) => (
                      <div
                        key={index}
                        className="relative flex gap-4"
                      >
                        <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white bg-cyan-500 text-xs font-bold text-white shadow-sm">
                          {index + 1}
                        </div>

                        <div className="flex-1 rounded-xl border border-cyan-100 bg-cyan-50/50 p-4">
                          <p className="text-sm leading-6 text-slate-700">
                            {step}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  No preparation roadmap generated.
                </p>
              )}
            </div>
          </Card>

          {/* Bottom message */}
          <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-6 text-center">
            <h3 className="font-bold text-indigo-900">
              Keep preparing. You've got this.
            </h3>

            <p className="mt-1 text-sm text-indigo-700">
              Use the questions and roadmap above to structure your preparation.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}