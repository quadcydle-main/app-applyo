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
    const prompt = `You are Applyo, a job-resume matching specialist. Compare the resume against the job description and provide a detailed analysis. Return ONLY valid JSON with keys: "match_score" (0-100), "strengths" (array), "gaps" (array), "recommendations" (array).

Job Description:
${jobDescription}

Resume:
${resumeText}

Provide output as valid JSON only.`

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
