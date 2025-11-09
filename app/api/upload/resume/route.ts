import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { detectGibberish } from "@/lib/utils/gibberish-detector"
import { validateResumeText } from "@/lib/utils/validation"
import { type NextRequest, NextResponse } from "next/server"
import PDFParse from "pdf-parse"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({ error: "Only PDF files are accepted" }, { status: 400 })
    }

    // Parse PDF
    const buffer = await file.arrayBuffer()
    let extractedText = ""

    try {
      const pdfData = await PDFParse(buffer)
      extractedText = pdfData.text
    } catch (pdfErr) {
      console.error("[v0] PDF parsing error:", pdfErr)
      return NextResponse.json({ error: "Failed to parse PDF file" }, { status: 400 })
    }

    // Validate text length
    const validation = validateResumeText(extractedText)
    if (!validation.valid) {
      const admin = createAdminClient()
      await admin.from("activity_log").insert({
        user_id: user.id,
        action: "validation_failed",
        payload: { errorCode: "TOO_SHORT", feature: "resume_upload" },
      })
      return NextResponse.json({ errorCode: "TOO_SHORT", message: validation.error }, { status: 400 })
    }

    // Check for gibberish
    const gibberishCheck = await detectGibberish(extractedText)
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

    // Save resume to database
    const admin = createAdminClient()
    const { data: resume, error: insertError } = await admin
      .from("resumes")
      .insert({
        user_id: user.id,
        title: file.name,
        content: extractedText,
        raw_text: extractedText,
        word_count: validation.wordCount,
        is_gibberish: false,
        metadata: {
          file_name: file.name,
          file_size: file.size,
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
      text: extractedText,
      wordCount: validation.wordCount,
      fileName: file.name,
    })
  } catch (error) {
    console.error("[v0] Resume upload error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
