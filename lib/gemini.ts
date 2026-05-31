const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent"

function getApiKeys(): string[] {
  const keys: string[] = []
  for (let i = 1; i <= 10; i++) {
    const key = process.env[`GEMINI_API_KEY_${i}`]?.trim()
    if (key) keys.push(key)
  }
  // Support legacy single-key env var
  const legacy = process.env.GEMINI_API_KEY?.trim()
  if (legacy && !keys.includes(legacy)) keys.push(legacy)
  return keys
}

// Module-level index persists across calls within the same server process
let currentKeyIndex = 0

export async function callGemini(prompt: string, maxTokens = 4000): Promise<string> {
  const keys = getApiKeys()
  if (keys.length === 0) throw new Error("No Gemini API key configured. Set GEMINI_API_KEY_1 in .env")

  let lastError: Error = new Error("Unknown error")

  for (let attempt = 0; attempt < keys.length; attempt++) {
    const idx = (currentKeyIndex + attempt) % keys.length
    const apiKey = keys[idx]

    try {
      const response = await fetch(GEMINI_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: maxTokens, temperature: 0.7 },
        }),
      })

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}))
        const isExhausted =
          response.status === 429 || errorBody?.error?.status === "RESOURCE_EXHAUSTED"

        if (isExhausted && keys.length > 1) {
          console.warn(`[gemini] Key #${idx + 1} rate-limited — rotating to next key`)
          currentKeyIndex = (idx + 1) % keys.length
          lastError = new Error(`Key #${idx + 1} exhausted`)
          continue
        }

        throw new Error(`Gemini API error: ${errorBody?.error?.message || response.statusText}`)
      }

      const data = await response.json()
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text

      if (!content) {
        console.error("[gemini] Unexpected response shape:", JSON.stringify(data).slice(0, 300))
        throw new Error("No content in Gemini response")
      }

      // Persist successful key for next call
      currentKeyIndex = idx

      // Strip markdown code fences if present
      if (content.includes("```json")) {
        return content.replace(/```json\n?/g, "").replace(/```/g, "").trim()
      }
      if (content.includes("```")) {
        return content.replace(/```\n?/g, "").trim()
      }

      return content
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      if (msg.includes("exhausted")) {
        lastError = err instanceof Error ? err : new Error(msg)
        continue
      }
      throw err
    }
  }

  throw lastError
}
