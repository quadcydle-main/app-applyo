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
    const prompt = `You are Applyo, an expert ATS (Applicant Tracking System) optimization specialist. Enhance the resume by strategically incorporating missing keywords while maintaining natural readability and professional quality.

TASK: Improve the resume to include the following keywords:
${missingKeywords.length > 0 ? missingKeywords.join(", ") : "Optimize for general ATS compatibility"}

REQUIREMENTS:
1. Naturally integrate keywords into existing content (don't just list them)
2. Maintain the resume's professional tone and readability
3. Ensure keywords fit contextually within job descriptions and achievements
4. Keep the original structure and flow
5. Don't sacrifice quality for keyword density

ORIGINAL RESUME:
${resumeText}

REQUIRED OUTPUT FORMAT (JSON only, no markdown):
{
  "improved_resume": "Complete improved resume text with keywords naturally integrated",
  "changes": [
    "Explanation of change 1: where and how keyword was added",
    "Explanation of change 2: where and how keyword was added",
    "Explanation of change 3: where and how keyword was added"
  ],
  "keywords_added": ["keyword1", "keyword2", "keyword3"]
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
