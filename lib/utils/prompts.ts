export const buildResumeImproverPrompt = ({
  resumeText,
  tone = "formal",
  profile,
  options = {},
}: {
  resumeText: string
  tone?: string
  profile?: Record<string, any>
  options?: Record<string, any>
}) => {
  return `You are Applyo, an expert resume improvement assistant. Analyze and enhance the provided resume to make it more impactful, ATS-friendly, and achievement-oriented.

TASK: Improve the resume by:
1. Enhancing bullet points with quantifiable achievements and action verbs
2. Optimizing for ATS (Applicant Tracking Systems) with relevant keywords
3. Improving clarity, conciseness, and professional tone
4. Maintaining the original structure while elevating the content

TONE: ${tone} and achievement-oriented
${profile ? `USER CONTEXT: ${JSON.stringify(profile)}` : ""}

ORIGINAL RESUME:
${resumeText}

REQUIRED OUTPUT FORMAT (JSON only, no markdown):
{
  "summary": "Brief analysis of improvements made (2-3 sentences)",
  "improved_resume": "Complete improved resume text maintaining original structure",
  "edits": [
    {
      "section": "Experience/Education/Skills/etc",
      "line_before": "Original text",
      "line_after": "Improved text",
      "reason": "Why this change improves the resume"
    }
  ]
}

Return ONLY valid JSON. No markdown, no code blocks, no additional text.`
}

export const buildATSCheckerPrompt = ({
  resumeText,
  jobDescription,
}: {
  resumeText: string
  jobDescription?: string
}) => {
  return `You are Applyo, an expert ATS (Applicant Tracking System) analyzer. Evaluate the resume for ATS compatibility and keyword optimization.

TASK: Analyze the resume and provide:
1. ATS compatibility score (0-100)
2. Missing important keywords
3. Formatting issues that could cause ATS parsing problems
4. Specific actionable suggestions for improvement

${jobDescription ? `JOB DESCRIPTION TO MATCH AGAINST:\n${jobDescription}\n\n` : ""}

RESUME TO ANALYZE:
${resumeText}

REQUIRED OUTPUT FORMAT (JSON only, no markdown):
{
  "atsScore": 85,
  "missingKeywords": ["keyword1", "keyword2", "keyword3"],
  "formattingIssues": ["Issue 1 description", "Issue 2 description"],
  "suggestions": [
    "Specific suggestion 1",
    "Specific suggestion 2",
    "Specific suggestion 3"
  ]
}

Return ONLY valid JSON. No markdown, no code blocks, no additional text.`
}
