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

    const { resumeText, jobDescription, tone = "professional" } = await request.json()

    if (!jobDescription || !jobDescription.trim()) {
      return NextResponse.json({ error: "Job description is required" }, { status: 400 })
    }

    // Build prompt
    const prompt = `You are Applyo, an expert cover letter writer for job applications. Create a compelling, personalized cover letter that highlights the candidate's qualifications and enthusiasm for the position.

TASK: Write a professional cover letter that:
1. Opens with a strong hook that captures attention
2. Clearly connects the candidate's experience to the job requirements
3. Demonstrates genuine interest in the role and company
4. Closes with a confident call to action
5. Maintains appropriate ${tone} tone throughout

${resumeText ? `CANDIDATE'S RESUME/BACKGROUND:\n${resumeText}\n\n` : ""}

JOB DESCRIPTION:
${jobDescription}

REQUIRED OUTPUT FORMAT (JSON only, no markdown):
{
  "cover_letter": "Complete cover letter text formatted with proper paragraphs. Include:\n- Opening paragraph with position title\n- 2-3 body paragraphs highlighting relevant experience\n- Closing paragraph with call to action\n- Professional sign-off"
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
      console.error("[v0] Failed to parse cover letter response:", aiResponse)
      throw new Error("Failed to parse AI response")
    }

    // Save to database
    const admin = createAdminClient()
    const { data: item } = await admin
      .from("generated_items")
      .insert({
        user_id: user.id,
        feature: "cover_letter",
        prompt,
        input_data: { resumeText: resumeText || "", jobDescription, tone },
        result: parsedResult,
        meta: { tone },
        status: "done",
        provider: "gemini",
      })
      .select()
      .single()

    // Log activity
    await admin.from("activity_log").insert({
      user_id: user.id,
      action: "generate_cover_letter",
      payload: { item_id: item?.id, feature: "cover_letter" },
    })

    return NextResponse.json({
      success: true,
      item,
      result: parsedResult,
    })
  } catch (error) {
    console.error("[v0] Cover letter API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
