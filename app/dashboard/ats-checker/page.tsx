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
    if (score >= 75) return "text-black dark:text-white"
    if (score >= 50) return "text-neutral-600 dark:text-neutral-400"
    return "text-neutral-400 dark:text-neutral-600"
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in">
      <div className="animate-slide-up">
        <h1 className="text-2xl md:text-3xl font-semibold text-black dark:text-white flex items-center gap-2 mb-2 tracking-tight">
          <Zap className="w-6 h-6" />
          ATS Score Checker
        </h1>
        <p className="text-neutral-500 dark:text-neutral-500 text-sm">
          Analyze your resume ATS compatibility
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 lg:h-fit animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-black dark:text-white">Check Your Resume</CardTitle>
            <CardDescription className="text-xs text-neutral-500 dark:text-neutral-500">
              Paste your resume and job description
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="resume" className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                Resume Text
              </Label>
              <Textarea
                id="resume"
                placeholder="Paste your resume here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="mt-1.5 min-h-40 text-sm bg-neutral-50 dark:bg-black border-neutral-200 dark:border-neutral-800 resize-none focus:border-black dark:focus:border-white smooth-hover"
              />
            </div>

            <div>
              <Label htmlFor="jd" className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                Job Description (Optional)
              </Label>
              <Textarea
                id="jd"
                placeholder="Paste job description to compare..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="mt-1.5 min-h-28 text-sm bg-neutral-50 dark:bg-black border-neutral-200 dark:border-neutral-800 resize-none focus:border-black dark:focus:border-white smooth-hover"
              />
            </div>

            {error && <p className="text-xs text-neutral-500 dark:text-neutral-500">{error}</p>}

            <Button 
              onClick={handleCheck} 
              disabled={isLoading} 
              className="w-full h-9 text-sm bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 smooth-hover" 
            >
              {isLoading && <Spinner className="mr-2 w-3.5 h-3.5" />}
              {isLoading ? "Analyzing..." : "Check ATS Score"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-black dark:text-white">ATS Analysis</CardTitle>
            <CardDescription className="text-xs text-neutral-500 dark:text-neutral-500">
              Your resume's ATS compatibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!result ? (
              <div className="text-center py-12 text-neutral-400 dark:text-neutral-600 text-sm">
                Check your resume to see ATS analysis
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center py-4">
                  <div className={`text-4xl font-semibold ${getScoreColor(result.atsScore)} mb-1`}>
                    {result.atsScore}%
                  </div>
                  <p className="text-neutral-400 dark:text-neutral-600 text-xs">ATS Score</p>
                </div>

                {result.missingKeywords && result.missingKeywords.length > 0 && (
                  <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
                    <h3 className="text-sm font-medium text-black dark:text-white flex items-center gap-1.5 mb-2">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Missing Keywords
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {result.missingKeywords.map((keyword: string, i: number) => (
                        <span 
                          key={i} 
                          className="bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white px-2 py-1 rounded text-xs border border-neutral-200 dark:border-neutral-800"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {result.formattingIssues && result.formattingIssues.length > 0 && (
                  <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                    <h3 className="text-sm font-medium text-black dark:text-white flex items-center gap-1.5 mb-2">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Formatting Issues
                    </h3>
                    <ul className="space-y-1.5">
                      {result.formattingIssues.map((issue: string, i: number) => (
                        <li key={i} className="text-xs text-neutral-500 dark:text-neutral-500 flex gap-1.5">
                          <span className="text-black dark:text-white">•</span>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.suggestions && result.suggestions.length > 0 && (
                  <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
                    <h3 className="text-sm font-medium text-black dark:text-white mb-2">Suggestions</h3>
                    <ul className="space-y-1.5">
                      {result.suggestions.map((suggestion: string, i: number) => (
                        <li key={i} className="text-xs text-neutral-500 dark:text-neutral-500 flex gap-1.5">
                          <span className="text-black dark:text-white">✓</span>
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
