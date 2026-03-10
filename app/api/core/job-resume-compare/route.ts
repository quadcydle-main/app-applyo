import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { callGemini } from "@/lib/gemini"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { resumeText, jobDescription } = await request.json()

    if (!resumeText || !resumeText.trim() || !jobDescription || !jobDescription.trim()) {
      return NextResponse.json({ error: "Resume and job description are required" }, { status: 400 })
    }

    // Build prompt
    const prompt = `You are Applyo, an expert career coach specializing in job-resume matching analysis. Provide a comprehensive comparison between the candidate's qualifications and job requirements.

TASK: Analyze the fit between the resume and job description:
1. Calculate an overall match score (0-100)
2. Identify key strengths that align with the role
3. Identify skill/experience gaps
4. Provide specific, actionable recommendations to improve the match

JOB DESCRIPTION:
${jobDescription}

CANDIDATE'S RESUME:
${resumeText}

REQUIRED OUTPUT FORMAT (JSON only, no markdown):
{
  "match_score": 75,
  "strengths": [
    "Specific strength 1 with evidence from resume",
    "Specific strength 2 with evidence from resume",
    "Specific strength 3 with evidence from resume"
  ],
  "gaps": [
    "Specific gap 1 with job requirement",
    "Specific gap 2 with job requirement",
    "Specific gap 3 with job requirement"
  ],
  "recommendations": [
    "Actionable recommendation 1 to bridge a gap",
    "Actionable recommendation 2 to emphasize a strength",
    "Actionable recommendation 3 for overall improvement"
  ]
}

Return ONLY valid JSON. No markdown, no code blocks, no additional text.`

    // Call Gemini
    const aiResponse = await callGemini(prompt)

    // Parse JSON response
    let parsedResult
    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error("No JSON found in response")
      }
      parsedResult = JSON.parse(jsonMatch[0])
    } catch (parseError) {
      console.error("[v0] Failed to parse comparison response:", aiResponse)
      throw new Error("Failed to parse AI response")
    }

    // Save to database
    const admin = createAdminClient()
    const { data: item } = await admin
      .from("generated_items")
      .insert({
        user_id: user.id,
        feature: "job_resume_compare",
        prompt,
        input_data: { resumeText, jobDescription },
        result: parsedResult,
        meta: { match_score: parsedResult.match_score || 0 },
        status: "done",
        provider: "gemini",
      })
      .select()
      .single()

    // Log activity
    await admin.from("activity_log").insert({
      user_id: user.id,
      action: "compare_job_resume",
      payload: { item_id: item?.id, match_score: parsedResult.match_score },
    })

    return NextResponse.json({
      success: true,
      item,
      result: parsedResult,
    })
  } catch (error) {
    console.error("[v0] Job-resume compare API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
