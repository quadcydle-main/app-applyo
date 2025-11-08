"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Copy, Zap } from "lucide-react"

export default function ATSImproverPage() {
  const [resumeText, setResumeText] = useState("")
  const [missingKeywords, setMissingKeywords] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImprove = async () => {
    if (!resumeText.trim()) {
      setError("Please enter resume text")
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const keywords = missingKeywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k)

      const response = await fetch("/api/core/ats-improver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, missingKeywords: keywords }),
      })

      if (!response.ok) throw new Error("Failed to improve")
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
          <Zap className="w-8 h-8 text-accent" />
          ATS Score Improver
        </h1>
        <p className="text-muted-foreground mt-2">Optimize your resume for ATS systems</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card border-border lg:h-fit">
          <CardHeader>
            <CardTitle>Improve Your Resume</CardTitle>
            <CardDescription>Add missing keywords for ATS</CardDescription>
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
              <Label htmlFor="keywords">Missing Keywords (comma-separated)</Label>
              <Textarea
                id="keywords"
                placeholder="e.g., Python, React, AWS, Leadership..."
                value={missingKeywords}
                onChange={(e) => setMissingKeywords(e.target.value)}
                className="mt-2 min-h-24 bg-background border-border resize-none"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button onClick={handleImprove} disabled={isLoading} className="w-full" size="lg">
              {isLoading && <Spinner className="mr-2" />}
              {isLoading ? "Improving..." : "Improve Resume"}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Optimized Resume</CardTitle>
                <CardDescription>Your ATS-optimized version</CardDescription>
              </div>
              {result && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy(result.improved_resume)}
                  className="gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!result ? (
              <div className="text-center py-12 text-muted-foreground">
                Improve your resume to see optimized version
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-background p-4 rounded-lg max-h-96 overflow-y-auto">
                  <p className="text-sm text-foreground whitespace-pre-wrap">{result.improved_resume}</p>
                </div>

                {result.changes && result.changes.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Changes Made</h3>
                    <ul className="space-y-2">
                      {result.changes.map((change: string, i: number) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-secondary">✓</span>
                          {change}
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
