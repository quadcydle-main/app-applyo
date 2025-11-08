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
  return `You are Applyo, a resume assistant for early-career job seekers. Produce a JSON output with keys "summary", "improved_resume", "edits" (array of {line_before, line_after, reason}). Keep output concise and actionable.

Improve the following resume section for clarity, impact, and ATS keywords. 
Tone: ${tone} & achievement-oriented.
${profile ? `User profile: ${JSON.stringify(profile)}` : ""}

RESUME:
${resumeText}

Provide output as valid JSON only.`
}

export const buildATSCheckerPrompt = ({
  resumeText,
  jobDescription,
}: {
  resumeText: string
  jobDescription?: string
}) => {
  return `You are Applyo, an ATS checker. Return ONLY valid JSON: { "atsScore": number (0-100), "missingKeywords": [...], "formattingIssues":[...], "suggestions":[...] }.

${jobDescription ? `Check resume against this job description:\n${jobDescription}\n` : ""}

RESUME:
${resumeText}`
}
