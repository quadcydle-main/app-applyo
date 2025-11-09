"use client"

// Simple fallback text extraction for cases where pdfjs isn't available
async function extractTextWithFallback(file: File): Promise<string> {
  try {
    const text = await file.text()
    return text
  } catch {
    return ""
  }
}

export async function parsePDFText(file: File): Promise<{ text: string; wordCount: number }> {
  try {
    // Dynamically import pdfjs on the client side
    const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist")

    // Set worker source for client-side parsing
    GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${await import("pdfjs-dist/package.json").then(() => "4.0.379")}/pdf.worker.min.js`

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

    const cleanedText = fullText.trim()
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
