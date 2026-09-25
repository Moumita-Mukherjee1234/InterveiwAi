import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInterviewStore } from "../store/interviewStore";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function HistoryTable() {
  const { reports, fetchReports } = useInterviewStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await fetchReports();
      setLoading(false);
    };
    load();
  }, [fetchReports]);

  return (
    <Card className="mt-16 p-8 shadow-lg rounded-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-[#282072] mb-8">
        Your Previous Reports
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading reports...</p>
      ) : reports.length === 0 ? (
        <p className="text-gray-500">
          No reports yet. Generate your first interview report above.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-[#282072] text-sm uppercase tracking-wide">
                <th className="py-4">#</th>
                <th>Job Role</th>
                <th>Match Score</th>
                <th>Generated On</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((r, i) => (
                <tr
                  key={r._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-5 text-gray-600">{i + 1}</td>

                  <td className="font-semibold text-[#1a1a1a]">
                    {r.jobRole}
                  </td>

                  <td className="font-bold text-[#F1B62C]">
                    {r.matchScore}%
                  </td>

                  <td className="text-gray-600">
                    {new Date(r.createdAt).toLocaleString()}
                  </td>

                  <td className="text-center">
                    <Button
                      size="sm"
                      className="bg-[#03B3C5] text-white px-6 hover:opacity-90 rounded-lg"
                      onClick={() => navigate(`/interview/${r._id}`)}
                    >
                      View Report
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}