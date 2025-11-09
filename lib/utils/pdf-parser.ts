"use client"

// Clean and normalize text extracted from PDF to remove gibberish
function cleanAndNormalizeText(text: string): string {
  // Remove excessive whitespace and special characters
  let cleaned = text
    .replace(/\s+/g, " ") // Replace multiple spaces/newlines with single space
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "") // Remove control characters
    .replace(/([^\w\s.,;:\-()&])\1{2,}/g, "$1") // Remove repeated special chars
    .trim()

  // Fix common gibberish patterns
  cleaned = cleaned
    .replace(/(\w)\1{3,}/g, "$1") // Replace multiple repeated letters (e.g., "aaaa" -> "a")
    .replace(/\s+([.,:;])/g, "$1") // Remove space before punctuation
    .replace(/([.,:;])\s+([.,:;])/g, "$1 ") // Fix multiple punctuation

  return cleaned
}

async function extractTextWithFallback(file: File): Promise<string> {
  try {
    const text = await file.text()
    return cleanAndNormalizeText(text)
  } catch {
    return ""
  }
}

export async function parsePDFText(file: File): Promise<{ text: string; wordCount: number }> {
  try {
    const pdfjs = await import("pdfjs-dist")
    const { getDocument, GlobalWorkerOptions } = pdfjs

    // Use npm-bundled worker instead of CDN
    GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString()

    const arrayBuffer = await file.arrayBuffer()
    const pdf = await getDocument({ data: arrayBuffer }).promise

    let fullText = ""

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items
        .map((item: any) => (typeof item === "object" && "str" in item ? item.str : ""))
        .join(" ")
      fullText += pageText + "\n"
    }

    const cleanedText = cleanAndNormalizeText(fullText)
    const wordCount = countWords(cleanedText)

    return { text: cleanedText, wordCount }
  } catch (err) {
    console.log("[v0] PDF parsing error, attempting fallback:", err)
    // Fallback: try to extract plain text
    const fallbackText = await extractTextWithFallback(file)
    return { text: fallbackText, wordCount: countWords(fallbackText) }
  }
}

export async function extractTextFromPdf(file: File): Promise<string> {
  const { text } = await parsePDFText(file)
  return text
}

export function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length
}

export function validateResumeText(
  text: string,
  minWords = 100,
): { valid: boolean; wordCount: number; error?: string } {
  const wordCount = countWords(text)

  if (wordCount < minWords) {
    return {
      valid: false,
      wordCount,
      error: `Resume must contain at least ${minWords} words. Current: ${wordCount} words.`,
    }
  }

  return { valid: true, wordCount }
}
