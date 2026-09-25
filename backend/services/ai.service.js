import Groq from "groq-sdk";
import { interviewSchema } from "../schemas/interview.schema.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateInterviewReport = async ({
  resumeText,
  jobDescription,
  selfDescription,
}) => {
  try {
    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",

      messages: [
        {
          role: "system",
          content: `
You are an AI Interview Coach.

Your task is to analyze:
1. The candidate's resume
2. The target job description
3. The candidate's self-description

You MUST return a COMPLETE interview report.

The response MUST contain ALL of these five fields:

1. technicalQuestions
   - Array of 8 technical interview questions.
   - Questions must be relevant to the candidate's resume and target job.

2. behavioralQuestions
   - Array of 5 behavioral interview questions.
   - Questions should be relevant to the candidate's experience, projects, internships, education, and target role.

3. skillGaps
   - Array of 5 skills or knowledge areas the candidate should improve.
   - Base these on the difference between the candidate's current skills and the target job requirements.

4. preparationPlan
   - Array of 5 practical preparation steps.
   - Each step should be specific and actionable.

5. matchScore
   - A single number between 0 and 100.
   - Estimate how closely the candidate's resume and skills match the target job description.

IMPORTANT RULES:

- ALL FIVE fields are mandatory.
- NEVER return only technicalQuestions.
- Even if information is missing, return an empty array [] for the relevant array field.
- matchScore must always be a number between 0 and 100.
- Do not omit any field.
- Do not add any fields that are not requested.
- Do not invent candidate skills.
- Skill gaps may identify skills required by the job that are missing from the resume.
- Questions must be relevant to the candidate and target role.
- Return ONLY the JSON object.
`,
        },

        {
          role: "user",
          content: `
Analyze the following candidate.

========== RESUME ==========
${resumeText}

========== JOB DESCRIPTION ==========
${jobDescription}

========== CANDIDATE DESCRIPTION ==========
${selfDescription}

========== REQUIRED OUTPUT ==========

Return a COMPLETE JSON object containing exactly these five fields:

{
  "technicalQuestions": [
    "question 1",
    "question 2"
  ],
  "behavioralQuestions": [
    "question 1",
    "question 2"
  ],
  "skillGaps": [
    "skill gap 1",
    "skill gap 2"
  ],
  "preparationPlan": [
    "preparation step 1",
    "preparation step 2"
  ],
  "matchScore": 75
}

You MUST provide all five fields.
`,
        },
      ],

      response_format: {
        type: "json_schema",
        json_schema: {
          name: "interview_report",
          strict: true,
          schema: {
            type: "object",

            properties: {
              technicalQuestions: {
                type: "array",
                items: {
                  type: "string",
                },
              },

              behavioralQuestions: {
                type: "array",
                items: {
                  type: "string",
                },
              },

              skillGaps: {
                type: "array",
                items: {
                  type: "string",
                },
              },

              preparationPlan: {
                type: "array",
                items: {
                  type: "string",
                },
              },

              matchScore: {
                type: "number",
                minimum: 0,
                maximum: 100,
              },
            },

            required: [
              "technicalQuestions",
              "behavioralQuestions",
              "skillGaps",
              "preparationPlan",
              "matchScore",
            ],

            additionalProperties: false,
          },
        },
      },
    });

    const text = response.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error("Groq returned an empty response");
    }

    console.log("Groq Response:", text);

    const parsed = JSON.parse(text);

    const validated = interviewSchema.parse(parsed);

    return validated;
  } catch (error) {
    console.error("Groq AI Error:", error);

    if (error?.status === 401) {
      throw new Error(
        "Invalid Groq API key. Check GROQ_API_KEY in your .env file."
      );
    }

    if (error?.status === 429) {
      throw new Error(
        "Groq API rate limit reached. Please try again later."
      );
    }

    throw new Error(
      error?.message || "Failed to generate interview report"
    );
  }
};