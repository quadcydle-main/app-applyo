import { callGemini } from "@/lib/gemini"

export async function detectGibberish(text: string): Promise<{ isGibberish: boolean; reason?: string }> {
  // Heuristic checks
  const lines = text.split("\n")

  // Check for low dictionary word ratio
  const commonWords = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
    "from",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "have",
    "has",
    "do",
    "does",
    "did",
    "will",
    "would",
    "could",
    "should",
    "may",
    "might",
    "must",
    "can",
    "as",
    "about",
    "after",
    "all",
    "am",
    "experience",
    "skills",
    "education",
    "work",
    "project",
    "developed",
    "implemented",
    "managed",
    "led",
    "team",
    "software",
    "developed",
    "python",
    "javascript",
    "react",
    "node",
    "database",
    "design",
    "created",
    "built",
  ])

  const words = text
    .toLowerCase()
    .split(/\W+/)
    .filter((w) => w.length > 0)
  const knownWordCount = words.filter((w) => commonWords.has(w)).length
  const knownWordRatio = knownWordCount / Math.max(words.length, 1)

  if (knownWordRatio < 0.15 && words.length > 50) {
    return { isGibberish: true, reason: "Low dictionary word ratio detected" }
  }

  // Check for excessive repeated characters
  const repeatedChars = text.match(/(.)\1{4,}/g)
  if (repeatedChars && repeatedChars.length > 3) {
    return { isGibberish: true, reason: "Excessive repeated characters detected" }
  }

  // Check for nonsensical punctuation ratio
  const punctCount = (text.match(/[!@#$%^&*()_+=[\]{};:'",.<>?/\\|`~-]/g) || []).length
  const punctRatio = punctCount / Math.max(text.length, 1)
  if (punctRatio > 0.15) {
    return { isGibberish: true, reason: "Excessive punctuation detected" }
  }

  // Quick Gemini check for confirmation
  try {
    const response = await callGemini(
      `Analyze this text and determine if it appears to be gibberish or nonsense. Respond with only "yes" or "no".\n\nText: ${text.substring(0, 500)}`,
    )
    if (response.toLowerCase().includes("yes")) {
      return { isGibberish: true, reason: "AI detected gibberish content" }
    }
  } catch (err) {
    console.error("[v0] Gibberish detection API error:", err)
  }

  return { isGibberish: false }
}
