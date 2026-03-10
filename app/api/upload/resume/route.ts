import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { detectGibberish } from "@/lib/utils/gibberish-detector"
import { validateResumeText } from "@/lib/utils/validation"
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

    const body = await request.json()
    const { text, fileName } = body

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 })
    }

    const validation = validateResumeText(text)
    if (!validation.valid) {
      const admin = createAdminClient()
      await admin.from("activity_log").insert({
        user_id: user.id,
        action: "validation_failed",
        payload: { errorCode: "TOO_SHORT", feature: "resume_upload" },
      })
      return NextResponse.json({ errorCode: "TOO_SHORT", message: validation.error }, { status: 400 })
    }

    const gibberishCheck = await detectGibberish(text)
    if (gibberishCheck.isGibberish) {
      const admin = createAdminClient()
      await admin.from("activity_log").insert({
        user_id: user.id,
        action: "validation_failed",
        payload: { errorCode: "GIBBERISH_CONTENT", feature: "resume_upload" },
      })
      return NextResponse.json(
        {
          errorCode: "GIBBERISH_CONTENT",
          message: "Provided text appears to be gibberish. Please enter a real resume.",
        },
        { status: 422 },
      )
    }

    const admin = createAdminClient()
    const { data: resume, error: insertError } = await admin
      .from("resumes")
      .insert({
        user_id: user.id,
        title: fileName || "Uploaded Resume",
        content: text,
        raw_text: text,
        word_count: validation.wordCount,
        is_gibberish: false,
        metadata: {
          file_name: fileName,
          parsed_at: new Date().toISOString(),
        },
      })
      .select()
      .single()

    if (insertError) {
      console.error("[v0] Resume save error:", insertError)
      return NextResponse.json({ error: "Failed to save resume" }, { status: 500 })
    }

    return NextResponse.json({
      resumeId: resume.id,
      text: text,
      wordCount: validation.wordCount,
      fileName: fileName || "Uploaded Resume",
    })
  } catch (error) {
    console.error("[v0] Resume upload error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
