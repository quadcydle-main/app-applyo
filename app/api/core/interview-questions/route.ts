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

    const { jobDescription, resumeText = "", difficulty = "medium" } = await request.json()

    if (!jobDescription || !jobDescription.trim()) {
      return NextResponse.json({ error: "Job description is required" }, { status: 400 })
    }

    // Build prompt
    const prompt = `You are Applyo, an interview prep specialist. Generate realistic interview questions based on the job description. Return ONLY valid JSON with key "questions" (array of 5-10 interview questions with suggested answers).

Difficulty: ${difficulty}
${resumeText ? `Candidate Resume:\n${resumeText}\n` : ""}
Job Description:
${jobDescription}

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
      console.error("[v0] Failed to parse interview questions response:", aiResponse)
      throw new Error("Failed to parse AI response")
    }

    // Save to database
    const admin = createAdminClient()
    const { data: item } = await admin
      .from("generated_items")
      .insert({
        user_id: user.id,
        feature: "interview_questions",
        prompt,
        input_data: { jobDescription, resumeText, difficulty },
        result: parsedResult,
        meta: { difficulty, question_count: parsedResult.questions?.length || 0 },
        status: "done",
        provider: "gemini",
      })
      .select()
      .single()

    // Log activity
    await admin.from("activity_log").insert({
      user_id: user.id,
      action: "generate_interview_questions",
      payload: { item_id: item?.id, count: parsedResult.questions?.length },
    })

    return NextResponse.json({
      success: true,
      item,
      result: parsedResult,
    })
  } catch (error) {
    console.error("[v0] Interview questions API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
