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
