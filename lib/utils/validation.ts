export function validateResumeText(text: string): { valid: boolean; wordCount: number; error?: string } {
  if (!text || !text.trim()) {
    return { valid: false, wordCount: 0, error: "Resume text cannot be empty" }
  }

  const wordCount = text.trim().split(/\s+/).length

  if (wordCount < 100) {
    return {
      valid: false,
      wordCount,
      error: "Please add at least 100 meaningful words — we need real content to help.",
    }
  }

  return { valid: true, wordCount }
}
