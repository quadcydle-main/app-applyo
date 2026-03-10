const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent"

interface GeminiRequest {
  contents: Array<{
    parts: Array<{
      text: string
    }>
  }>
  generationConfig?: {
    maxOutputTokens?: number
    temperature?: number
  }
}

export async function callGemini(prompt: string, maxTokens = 4000): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured")
  }

  const payload: GeminiRequest = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: maxTokens,
      temperature: 0.7,
    },
  }

  try {
    const response = await fetch(GEMINI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error("[v0] Gemini API response error:", error)
      throw new Error(`Gemini API error: ${error.error?.message || response.statusText}`)
    }

    const data = await response.json()

    const content = data.candidates?.[0]?.content?.parts?.[0]?.text
    if (!content) {
      console.error("[v0] Gemini response structure:", data)
      throw new Error("No content in Gemini response")
    }

    let cleanedContent = content
    if (content.includes("```json")) {
      cleanedContent = content
        .replace(/```json\n?/g, "")
        .replace(/```/g, "")
        .trim()
    } else if (content.includes("```")) {
      cleanedContent = content.replace(/```\n?/g, "").trim()
    }

    return cleanedContent
  } catch (error) {
    console.error("[v0] Gemini API error:", error)
    throw error
  }
}
