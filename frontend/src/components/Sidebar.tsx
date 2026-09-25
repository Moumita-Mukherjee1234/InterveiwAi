export default function Sidebar() {
  const items = [
    "Overview",
    "Technical Questions",
    "Behavioral Questions",
    "Skill Gaps",
    "Roadmap",
    "AI Resume",
  ];

  return (
    <div className="w-64 bg-white border-r min-h-screen p-4 space-y-4">
      <h2 className="font-bold text-primary">Interview AI</h2>
      {items.map((i) => (
        <div key={i} className="p-2 rounded hover:bg-gray-100 text-sm">
          {i}
        </div>
      ))}
    </div>
  );
}