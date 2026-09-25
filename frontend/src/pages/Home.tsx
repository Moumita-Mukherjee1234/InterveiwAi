import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { api } from "../lib/api";
import { useInterview } from "../context/InterviewContext";
import HistoryTable from "../components/HistoryTable";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();
  const { setReport } = useInterview();

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

      const res = await api.post("/api/interview", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setReport(res.data.report);
      navigate("/interview");
    } catch (err) {
      console.error(err);
      alert("Failed to generate interview");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f7f8ff] px-10 py-10">
        {/* Title */}
        <h1 className="text-3xl font-bold text-[#282072] mb-10">
          Generate New Interview Report
        </h1>

        {/* 4 Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Resume Upload */}
          <Card className="p-6 shadow-md rounded-xl space-y-4">
            <h2 className="text-lg font-semibold text-[#282072]">
              1. Upload Resume
            </h2>
            <Label>Upload your latest resume (PDF)</Label>
            <Input
              type="file"
              accept=".pdf"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
            />
          </Card>

          {/* Job Role */}
          <Card className="p-6 shadow-md rounded-xl space-y-4">
            <h2 className="text-lg font-semibold text-[#282072]">
              2. Job Role
            </h2>
            <Label>Enter the job role</Label>
            <Input
              placeholder="e.g. Frontend Developer"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
            />
          </Card>

          {/* Self Description */}
          <Card className="p-6 shadow-md rounded-xl space-y-4">
            <h2 className="text-lg font-semibold text-[#282072]">
              3. Self Description
            </h2>
            <Label>Tell us about yourself</Label>
            <textarea
              className="w-full border border-gray-200 rounded-md p-3 h-40 focus:outline-none focus:ring-2 focus:ring-[#03B3C5]"
              value={selfDesc}
              onChange={(e) => setSelfDesc(e.target.value)}
              placeholder="Write about your background, skills, experience..."
            />
          </Card>

          {/* Job Description */}
          <Card className="p-6 shadow-md rounded-xl space-y-4">
            <h2 className="text-lg font-semibold text-[#282072]">
              4. Job Description
            </h2>
            <Label>Paste the job description</Label>
            <textarea
              className="w-full border border-gray-200 rounded-md p-3 h-40 focus:outline-none focus:ring-2 focus:ring-[#03B3C5]"
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste the job description here..."
            />
          </Card>
        </div>

        {/* Generate Button */}
        <div className="mt-12 flex justify-center">
          <Button
            onClick={handleGenerate}
            className="bg-[#282072] hover:bg-[#1f1a5c] text-white px-12 py-3 text-lg rounded-lg"
          >
            {loading ? "Generating..." : "Generate Interview"}
          </Button>
        </div>

        {/* History Section */}
        <div className="mt-16">
          <HistoryTable />
        </div>
      </div>
    </>
  );
}