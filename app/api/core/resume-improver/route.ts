import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { callGemini } from "@/lib/gemini"
import { buildResumeImproverPrompt } from "@/lib/utils/prompts"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Get current user
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { resumeText, tone = "formal", options = {} } = await request.json()

    if (!resumeText || !resumeText.trim()) {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 })
    }

    // Fetch user profile for context
    const admin = createAdminClient()
    const { getOrCreateProfile } = await import("@/lib/supabase/profile-helpers")
    const profile = await getOrCreateProfile(user.id)

    // Build prompt
    const prompt = buildResumeImproverPrompt({
      resumeText,
      tone,
      profile,
      options,
    })

    // Call Gemini
    const aiResponse = await callGemini(prompt)

    // Parse JSON response
    let parsedResult
    try {
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error("No JSON found in response")
      }
      parsedResult = JSON.parse(jsonMatch[0])
    } catch (parseError) {
      console.error("[v0] Failed to parse Gemini response:", aiResponse)
      throw new Error("Failed to parse AI response")
    }

    // Save to database
    const { data: item } = await admin
      .from("generated_items")
      .insert({
        user_id: user.id,
        feature: "resume_improver",
        prompt,
        input_data: { resumeText, tone, options },
        result: parsedResult,
        meta: {
          tone,
          length: resumeText.length,
          response_length: aiResponse.length,
        },
        status: "done",
        provider: "gemini",
      })
      .select()
      .single()

    // Log activity
    await admin.from("activity_log").insert({
      user_id: user.id,
      action: "generate_resume",
      payload: { item_id: item?.id, feature: "resume_improver" },
    })

    return NextResponse.json({
      success: true,
      item,
      result: parsedResult,
    })
  } catch (error) {
    console.error("[v0] Resume improver API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
