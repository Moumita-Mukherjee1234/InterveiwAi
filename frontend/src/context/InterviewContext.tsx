import { createContext, useContext, useState } from "react";

interface Report {
  matchScore: number;
  technicalQuestions: string[];
  behavioralQuestions: string[];
  skillGaps: string[];
  roadmap: string[];
}

const InterviewContext = createContext<any>(null);

export const InterviewProvider = ({ children }: any) => {
  const [report, setReport] = useState<Report | null>(null);
  return (
    <InterviewContext.Provider value={{ report, setReport }}>
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => useContext(InterviewContext);