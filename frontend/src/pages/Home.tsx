import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { api } from "../lib/api";
import HistoryTable from "../components/HistoryTable";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();

  const [resume, setResume] = useState<File | null>(null);
  const [jobRole, setJobRole] = useState("");
  const [selfDesc, setSelfDesc] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!resume || !selfDesc || !jobDesc || !jobRole) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("resume", resume);
      formData.append("jobRole", jobRole);
      formData.append("selfDescription", selfDesc);
      formData.append("jobDescription", jobDesc);

      console.log("Generating interview report...");

      const res = await api.post("/api/interview", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("INTERVIEW GENERATION RESPONSE:", res.data);

      const report = res.data?.report;

      if (!report?._id) {
        console.error("Invalid report response:", res.data);

        alert("Interview was generated, but the report ID was not returned.");
        return;
      }

      console.log("Generated Report ID:", report._id);

      navigate(`/interview/${report._id}`);
    } catch (error: any) {
      console.error("INTERVIEW GENERATION ERROR:", error);

      console.error("STATUS:", error?.response?.status);
      console.error("RESPONSE:", error?.response?.data);

      alert(
        error?.response?.data?.message ||
          "Failed to generate interview"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "h-11 border-slate-200 bg-white rounded-xl shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all";

  const textareaClass =
    "w-full border border-slate-200 bg-white rounded-xl p-4 min-h-[150px] resize-none outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-400";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Background decoration */}
      <div className="relative overflow-hidden">
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute top-40 -left-32 h-72 w-72 rounded-full bg-cyan-100/50 blur-3xl" />

        <main className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

          {/* Hero */}
          <section className="mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
              <span className="h-2 w-2 rounded-full bg-cyan-500" />
              AI-Powered Interview Preparation
            </div>

            <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                  Prepare smarter.
                  <span className="block bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                    Interview with confidence.
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
                  Upload your resume, add the target role and job description,
                  and let AI create a personalized interview preparation plan
                  for you.
                </p>
              </div>

              <div className="hidden rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm lg:block">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  AI Interview Coach
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  Resume → Analysis → Preparation
                </p>
              </div>
            </div>
          </section>

          {/* Form */}
          <section>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Create your interview
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Complete these four steps to generate your personalized report.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              {/* Resume */}
              <Card className="group rounded-2xl border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600">
                    01
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">
                      Upload your resume
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Give the AI your latest resume for personalized analysis.
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Label
                    htmlFor="resume"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Resume PDF
                  </Label>

                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,application/pdf"
                    className={inputClass}
                    onChange={(e) =>
                      setResume(e.target.files?.[0] || null)
                    }
                  />

                  {resume && (
                    <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                      <span className="font-semibold">✓</span>
                      <span className="break-all">{resume.name}</span>
                    </div>
                  )}
                </div>
              </Card>

              {/* Job Role */}
              <Card className="group rounded-2xl border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-sm font-bold text-cyan-600">
                    02
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">
                      Target job role
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Tell us which position you are preparing for.
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Label
                    htmlFor="jobRole"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Job role
                  </Label>

                  <Input
                    id="jobRole"
                    placeholder="e.g. Data Analyst"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </Card>

              {/* Self Description */}
              <Card className="group rounded-2xl border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-sm font-bold text-violet-600">
                    03
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">
                      Tell us about yourself
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Share your background, skills and experience.
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Label
                    htmlFor="selfDescription"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Self description
                  </Label>

                  <textarea
                    id="selfDescription"
                    className={textareaClass}
                    value={selfDesc}
                    onChange={(e) => setSelfDesc(e.target.value)}
                    placeholder="Write about your background, skills, projects, experience..."
                  />
                </div>
              </Card>

              {/* Job Description */}
              <Card className="group rounded-2xl border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-sm font-bold text-amber-600">
                    04
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">
                      Add the job description
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Paste the requirements for your target position.
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Label
                    htmlFor="jobDescription"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Job description
                  </Label>

                  <textarea
                    id="jobDescription"
                    className={textareaClass}
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    placeholder="Paste the job description here..."
                  />
                </div>
              </Card>
            </div>

            {/* Generate */}
            <div className="mt-8 flex flex-col items-center">
              <Button
                onClick={handleGenerate}
                disabled={loading}
                className="h-13 min-w-[240px] rounded-xl bg-indigo-600 px-10 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Generating your interview...
                  </span>
                ) : (
                  "Generate Interview →"
                )}
              </Button>

              <p className="mt-3 text-xs text-slate-400">
                Your information is used to personalize your interview report.
              </p>
            </div>
          </section>

          {/* History */}
          <section className="mt-16">
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-slate-900">
                Previous Interviews
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Review your previous AI-generated interview reports.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <HistoryTable />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}