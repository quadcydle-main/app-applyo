"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Zap, AlertCircle } from "lucide-react"

export default function ATSCheckerPage() {
  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCheck = async () => {
    if (!resumeText.trim()) {
      setError("Please enter resume text")
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/core/ats-checker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription: jobDescription || undefined }),
      })

      if (!response.ok) throw new Error("Failed to check ATS")
      const data = await response.json()
      setResult(data.result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-secondary"
    if (score >= 50) return "text-accent"
    return "text-red-500"
  }

  return (
    <div className="p-6 md:p-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Zap className="w-8 h-8 text-accent" />
          ATS Score Checker
        </h1>
        <p className="text-muted-foreground mt-2">Analyze your resume ATS compatibility</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="bg-card border-border lg:h-fit">
          <CardHeader>
            <CardTitle>Check Your Resume</CardTitle>
            <CardDescription>Paste your resume and job description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="resume">Resume Text</Label>
              <Textarea
                id="resume"
                placeholder="Paste your resume here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="mt-2 min-h-48 bg-background border-border resize-none"
              />
            </div>

            <div>
              <Label htmlFor="jd">Job Description (Optional)</Label>
              <Textarea
                id="jd"
                placeholder="Paste job description to compare..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="mt-2 min-h-32 bg-background border-border resize-none"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button onClick={handleCheck} disabled={isLoading} className="w-full" size="lg">
              {isLoading && <Spinner className="mr-2" />}
              {isLoading ? "Analyzing..." : "Check ATS Score"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>ATS Analysis</CardTitle>
            <CardDescription>Your resume's ATS compatibility</CardDescription>
          </CardHeader>
          <CardContent>
            {!result ? (
              <div className="text-center py-12 text-muted-foreground">Check your resume to see ATS analysis</div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <div className={`text-5xl font-bold ${getScoreColor(result.atsScore)}`}>{result.atsScore}%</div>
                  <p className="text-muted-foreground text-sm mt-2">ATS Score</p>
                </div>

                {result.missingKeywords && result.missingKeywords.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-accent" />
                      Missing Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.missingKeywords.map((keyword: string, i: number) => (
                        <span key={i} className="bg-accent/10 text-accent px-2 py-1 rounded text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {result.formattingIssues && result.formattingIssues.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      Formatting Issues
                    </h3>
                    <ul className="space-y-2">
                      {result.formattingIssues.map((issue: string, i: number) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-red-500">•</span>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.suggestions && result.suggestions.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Suggestions</h3>
                    <ul className="space-y-2">
                      {result.suggestions.map((suggestion: string, i: number) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-secondary">✓</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
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
