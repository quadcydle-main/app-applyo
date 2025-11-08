"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Brain, Copy } from "lucide-react"

export default function InterviewQuestionsPage() {
  const [jobDescription, setJobDescription] = useState("")
  const [resumeText, setResumeText] = useState("")
  const [difficulty, setDifficulty] = useState("medium")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      setError("Job description is required")
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/core/interview-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription,
          resumeText: resumeText || undefined,
          difficulty,
        }),
      })

      if (!response.ok) throw new Error("Failed to generate questions")
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
          Interview Question Generator
        </h1>
        <p className="text-muted-foreground mt-2">Prepare for interviews with AI-generated questions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card border-border lg:h-fit">
          <CardHeader>
            <CardTitle>Generate Questions</CardTitle>
            <CardDescription>Prepare for your interview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <Label htmlFor="resume">Your Resume (Optional)</Label>
              <Textarea
                id="resume"
                placeholder="Paste your resume for personalized questions..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="mt-2 min-h-32 bg-background border-border resize-none"
              />
            </div>

            <div>
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="mt-2 bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button onClick={handleGenerate} disabled={isLoading} className="w-full" size="lg">
              {isLoading && <Spinner className="mr-2" />}
              {isLoading ? "Generating..." : "Generate Questions"}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Interview Prep</CardTitle>
            <CardDescription>Practice with these questions</CardDescription>
          </CardHeader>
          <CardContent>
            {!result || !result.questions ? (
              <div className="text-center py-12 text-muted-foreground">Generate questions to practice</div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {result.questions.map((q: any, i: number) => (
                  <div key={i} className="bg-background p-4 rounded-lg border border-border">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-foreground text-sm">
                        Q{i + 1}: {q.question || q}
                      </h3>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(typeof q === "string" ? q : JSON.stringify(q))}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    {q.suggested_answer && (
                      <p className="text-xs text-muted-foreground mt-2">
                        <strong>Suggested answer:</strong> {q.suggested_answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
