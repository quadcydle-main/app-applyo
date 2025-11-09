import { createAdminClient } from "./admin"
import { detectGibberish } from "@/lib/utils/gibberish-detector"
import { validateResumeText } from "@/lib/utils/validation"

export async function validateResumeInput(
  resumeTextOrId: string,
  userId: string,
): Promise<{
  valid: boolean
  text?: string
  wordCount?: number
  errorCode?: string
  errorMessage?: string
  statusCode?: number
}> {
  const admin = createAdminClient()

  // Check if it's a UUID (resumeId) or text
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(resumeTextOrId)

  let resumeText = resumeTextOrId

  if (isUUID) {
    // Fetch resume from database
    const { data: resume, error } = await admin
      .from("resumes")
      .select("raw_text, word_count")
      .eq("id", resumeTextOrId)
      .eq("user_id", userId)
      .single()

    if (error || !resume) {
      return {
        valid: false,
        errorCode: "RESUME_NOT_FOUND",
        errorMessage: "Resume not found",
        statusCode: 404,
      }
    }

    resumeText = resume.raw_text
  }

  // Validate length
  const validation = validateResumeText(resumeText)
  if (!validation.valid) {
    await admin.from("activity_log").insert({
      user_id: userId,
      action: "validation_failed",
      payload: { errorCode: "TOO_SHORT" },
    })
    return {
      valid: false,
      errorCode: "TOO_SHORT",
      errorMessage: "Resume must contain at least 100 words.",
      statusCode: 400,
    }
  }

  // Check for gibberish
  const gibberishCheck = await detectGibberish(resumeText)
  if (gibberishCheck.isGibberish) {
    await admin.from("activity_log").insert({
      user_id: userId,
      action: "validation_failed",
      payload: { errorCode: "GIBBERISH_CONTENT", reason: gibberishCheck.reason },
    })
    return {
      valid: false,
      errorCode: "GIBBERISH_CONTENT",
      errorMessage: "Provided text appears to be gibberish. Please enter a real resume.",
      statusCode: 422,
    }
  }

  return {
    valid: true,
    text: resumeText,
    wordCount: validation.wordCount,
  }
}
