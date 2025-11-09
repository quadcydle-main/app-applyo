export async function parsePDFText(file: File): Promise<{ text: string; wordCount: number }> {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch("/api/upload/resume", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Failed to parse PDF")
  }

  const data = await response.json()
  return { text: data.text, wordCount: data.wordCount }
}

export async function extractTextFromPdf(file: File): Promise<string> {
  try {
    // Try to use pdfjs if available, otherwise fall back to server-side parsing
    const { getDocument } = await import("pdfjs-dist")

    // Initialize worker
    const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.min")
    const GlobalWorkerOptions = await import("pdfjs-dist/build/pdf.worker.min").then(() =>
      import("pdfjs-dist").then((m) => m.GlobalWorkerOptions),
    )

    const arrayBuffer = await file.arrayBuffer()
    const pdf = await getDocument({ data: arrayBuffer }).promise

    let fullText = ""

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items.map((item: any) => item.str).join(" ")
      fullText += pageText + "\n"
    }

    return fullText.trim()
  } catch (err) {
    // Fallback to server-side parsing if pdfjs not available
    const { text } = await parsePDFText(file)
    return text
  }
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
