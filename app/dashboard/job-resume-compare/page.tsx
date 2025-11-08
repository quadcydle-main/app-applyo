"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { BarChart3 } from "lucide-react"

export default function JobResumeComparePage() {
  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCompare = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError("Both resume and job description are required")
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/core/job-resume-compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription }),
      })

      if (!response.ok) throw new Error("Failed to compare")
      const data = await response.json()
      setResult(data.result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const getMatchColor = (score: number) => {
    if (score >= 75) return "text-secondary"
    if (score >= 50) return "text-accent"
    return "text-red-500"
  }

  return (
    <div className="p-6 md:p-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <BarChart3 className="w-8 h-8 text-primary" />
          Job-to-Resume Comparison
        </h1>
        <p className="text-muted-foreground mt-2">See how well your resume matches the job</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card border-border lg:h-fit">
          <CardHeader>
            <CardTitle>Compare</CardTitle>
            <CardDescription>Enter your resume and target job</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="resume">Resume</Label>
              <Textarea
                id="resume"
                placeholder="Paste your resume..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="mt-2 min-h-48 bg-background border-border resize-none"
              />
            </div>

            <div>
              <Label htmlFor="jd">Job Description</Label>
              <Textarea
                id="jd"
                placeholder="Paste job description..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="mt-2 min-h-48 bg-background border-border resize-none"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button onClick={handleCompare} disabled={isLoading} className="w-full" size="lg">
              {isLoading && <Spinner className="mr-2" />}
              {isLoading ? "Analyzing..." : "Compare"}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Match Analysis</CardTitle>
            <CardDescription>Your compatibility score</CardDescription>
          </CardHeader>
          <CardContent>
            {!result ? (
              <div className="text-center py-12 text-muted-foreground">Compare to see match analysis</div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <div className={`text-5xl font-bold ${getMatchColor(result.match_score)}`}>{result.match_score}%</div>
                  <p className="text-muted-foreground text-sm mt-2">Match Score</p>
                </div>

                {result.strengths && result.strengths.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-secondary mb-2">Your Strengths</h3>
                    <ul className="space-y-2">
                      {result.strengths.map((strength: string, i: number) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-secondary">✓</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.gaps && result.gaps.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-accent mb-2">Gaps to Address</h3>
                    <ul className="space-y-2">
                      {result.gaps.map((gap: string, i: number) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-accent">•</span>
                          {gap}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.recommendations && result.recommendations.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Recommendations</h3>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec: string, i: number) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary">→</span>
                          {rec}
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
