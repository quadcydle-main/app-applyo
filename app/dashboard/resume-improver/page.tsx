"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Brain, Copy } from "lucide-react"

export default function ResumeImproverPage() {
  const [resumeText, setResumeText] = useState("")
  const [tone, setTone] = useState("formal")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!resumeText.trim()) {
      setError("Please enter resume text")
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/core/resume-improver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, tone }),
      })

      if (!response.ok) throw new Error("Failed to generate")
      const data = await response.json()
      setResult(data.result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="p-6 md:p-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Brain className="w-8 h-8 text-primary" />
          AI Resume Improver
        </h1>
        <p className="text-muted-foreground mt-2">Enhance your resume with AI-powered suggestions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="bg-card border-border lg:h-fit">
          <CardHeader>
            <CardTitle>Your Resume</CardTitle>
            <CardDescription>Paste your resume text below</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="resume">Resume Text</Label>
              <Textarea
                id="resume"
                placeholder="Paste your resume here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="mt-2 min-h-64 bg-background border-border resize-none"
              />
            </div>

            <div>
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="mt-2 bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="conversational">Conversational</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button onClick={handleGenerate} disabled={isLoading} className="w-full" size="lg">
              {isLoading && <Spinner className="mr-2" />}
              {isLoading ? "Generating..." : "Generate Improvements"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Improved Resume</CardTitle>
            <CardDescription>Your enhanced resume content</CardDescription>
          </CardHeader>
          <CardContent>
            {!result ? (
              <div className="text-center py-12 text-muted-foreground">Generate improvements to see results</div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Summary</h3>
                  <p className="text-muted-foreground text-sm">{result.summary}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">Improved Resume</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopy(result.improved_resume)}
                      className="gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                  </div>
                  <div className="bg-background p-4 rounded-lg max-h-96 overflow-y-auto">
                    <p className="text-sm text-foreground whitespace-pre-wrap">{result.improved_resume}</p>
                  </div>
                </div>

                {result.edits && result.edits.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Key Changes</h3>
                    <div className="space-y-3">
                      {result.edits.map((edit: any, i: number) => (
                        <div key={i} className="bg-background p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">{edit.reason}</p>
                          <p className="text-sm line-through text-muted-foreground">{edit.line_before}</p>
                          <p className="text-sm text-secondary font-medium">{edit.line_after}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
