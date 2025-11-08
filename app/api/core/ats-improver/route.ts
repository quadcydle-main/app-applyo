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

    const { resumeText, missingKeywords = [] } = await request.json()

    if (!resumeText || !resumeText.trim()) {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 })
    }

    // Build prompt
    const prompt = `You are Applyo, an ATS optimization specialist. Improve the resume to include the missing keywords while maintaining readability. Return ONLY valid JSON with keys "improved_resume" and "changes" (array of change explanations).

Missing Keywords to include: ${missingKeywords.join(", ")}

Resume to improve:
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
      console.error("[v0] Failed to parse ATS improver response:", aiResponse)
      throw new Error("Failed to parse AI response")
    }

    // Save to database
    const admin = createAdminClient()
    const { data: item } = await admin
      .from("generated_items")
      .insert({
        user_id: user.id,
        feature: "ats_improver",
        prompt,
        input_data: { resumeText, missingKeywords },
        result: parsedResult,
        meta: { keywords_added: missingKeywords.length },
        status: "done",
        provider: "gemini",
      })
      .select()
      .single()

    // Log activity
    await admin.from("activity_log").insert({
      user_id: user.id,
      action: "generate_resume",
      payload: { item_id: item?.id, feature: "ats_improver" },
    })

    return NextResponse.json({
      success: true,
      item,
      result: parsedResult,
    })
  } catch (error) {
    console.error("[v0] ATS improver API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
