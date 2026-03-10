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
    const prompt = `You are Applyo, an expert interview preparation coach. Generate realistic, insightful interview questions based on the job requirements and provide strategic answer frameworks.

TASK: Create 8-10 interview questions that:
1. Cover technical skills, behavioral situations, and role-specific scenarios
2. Reflect actual questions asked for this type of position
3. Include a mix of easy, medium, and hard questions based on difficulty: ${difficulty}
4. Provide strategic answer frameworks (not full answers, but key points to include)

${resumeText ? `CANDIDATE'S BACKGROUND:\n${resumeText}\n\n` : ""}

JOB DESCRIPTION:
${jobDescription}

REQUIRED OUTPUT FORMAT (JSON only, no markdown):
{
  "questions": [
    {
      "question": "The interview question text",
      "type": "technical|behavioral|situational",
      "difficulty": "easy|medium|hard",
      "answer_framework": "Key points to include: 1) Point one 2) Point two 3) Point three",
      "why_asked": "Brief explanation of what the interviewer is trying to assess"
    }
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
