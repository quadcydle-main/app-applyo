"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { FileText, Copy } from "lucide-react"

export default function CoverLetterPage() {
  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [tone, setTone] = useState("professional")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      setError("Please enter job description")
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/core/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: resumeText || undefined,
          jobDescription,
          tone,
        }),
      })

      if (!response.ok) throw new Error("Failed to generate cover letter")
      const data = await response.json()
      setResult(data.result.cover_letter)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    if (result) navigator.clipboard.writeText(result)
  }

  return (
    <div className="p-6 md:p-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <FileText className="w-8 h-8 text-secondary" />
          Cover Letter Maker
        </h1>
        <p className="text-muted-foreground mt-2">Generate tailored cover letters with AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="bg-card border-border lg:h-fit">
          <CardHeader>
            <CardTitle>Create Cover Letter</CardTitle>
            <CardDescription>Provide your resume and job details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="resume">Resume (Optional)</Label>
              <Textarea
                id="resume"
                placeholder="Paste your resume to personalize the letter..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="mt-2 min-h-40 bg-background border-border resize-none"
              />
            </div>

            <div>
              <Label htmlFor="jd">Job Description</Label>
              <Textarea
                id="jd"
                placeholder="Paste the job description..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="mt-2 min-h-40 bg-background border-border resize-none"
              />
            </div>

            <div>
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="mt-2 bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button onClick={handleGenerate} disabled={isLoading} className="w-full" size="lg">
              {isLoading && <Spinner className="mr-2" />}
              {isLoading ? "Generating..." : "Generate Cover Letter"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Cover Letter</CardTitle>
                <CardDescription>Ready to customize and send</CardDescription>
              </div>
              {result && (
                <Button size="sm" variant="outline" onClick={handleCopy} className="gap-2 bg-transparent">
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!result ? (
              <div className="text-center py-12 text-muted-foreground">Generate a cover letter to see results</div>
            ) : (
              <div className="bg-background p-4 rounded-lg max-h-96 overflow-y-auto">
                <p className="text-sm text-foreground whitespace-pre-wrap">{result}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
