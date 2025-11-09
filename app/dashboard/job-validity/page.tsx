"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { Shield } from "lucide-react"
import { ResumeUploader } from "@/components/resume-uploader"

export default function JobValidityPage() {
  const [jobDescription, setJobDescription] = useState("")
  const [resumeText, setResumeText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError("Please provide the job listing")
      return
    }
    if (!resumeText.trim()) {
      setError("Please provide your resume")
      return
    }

    const words = resumeText.trim().split(/\s+/).length
    if (words < 100) {
      setError(`Resume must be at least 100 words. Current: ${words} words`)
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/core/job-validity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription, resumeText }),
      })

      if (!response.ok) throw new Error("Failed to analyze")
      const data = await response.json()
      setResult(data.result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-black dark:text-white flex items-center gap-2 mb-2">
          <Shield className="w-6 h-6" />
          Job Listing Validity Checker
        </h1>
        <p className="text-neutral-500 text-sm">Verify if job listings are legitimate and suitable</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-black dark:text-white">Input</CardTitle>
            <CardDescription className="text-xs text-neutral-500">Provide job listing and your resume</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Your Resume</Label>
              <ResumeUploader
                onSuccess={(text) => {
                  setResumeText(text)
                  setError(null)
                }}
                onError={(msg) => setError(msg)}
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="job" className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                Job Description
              </Label>
              <Textarea
                id="job"
                placeholder="Paste the entire job listing here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="mt-1.5 min-h-40 text-sm bg-neutral-50 dark:bg-black border-neutral-200 dark:border-neutral-800"
              />
            </div>

            {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}

            <Button onClick={handleAnalyze} disabled={isLoading} className="w-full h-9 text-sm">
              {isLoading && <Spinner className="mr-2 w-3.5 h-3.5" />}
              {isLoading ? "Analyzing..." : "Check Validity"}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-black dark:text-white">Analysis</CardTitle>
            <CardDescription className="text-xs text-neutral-500">Job listing assessment</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <Spinner className="w-8 h-8 mx-auto mb-4" />
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Analyzing job listing...</p>
              </div>
            ) : !result ? (
              <div className="text-center py-12 text-neutral-400 text-sm">Results will appear here</div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-black dark:text-white mb-1">Legitimacy Score</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-neutral-200 dark:bg-neutral-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          result.legitimacy_score > 70
                            ? "bg-green-600"
                            : result.legitimacy_score > 40
                              ? "bg-yellow-600"
                              : "bg-red-600"
                        }`}
                        style={{ width: `${result.legitimacy_score}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-black dark:text-white">{result.legitimacy_score}%</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-black dark:text-white mb-2">Red Flags</h3>
                  <div className="space-y-1">
                    {result.red_flags?.length > 0 ? (
                      result.red_flags.map((flag: string, i: number) => (
                        <div key={i} className="text-xs text-red-600 dark:text-red-400">
                          • {flag}
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-green-600 dark:text-green-400">No red flags detected</div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-black dark:text-white mb-2">Fit Analysis</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {result.fit_analysis}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-black dark:text-white mb-1">Recommendation</h3>
                  <p
                    className={`text-xs ${result.recommendation?.includes("Good fit") ? "text-green-600 dark:text-green-400" : "text-yellow-600 dark:text-yellow-400"}`}
                  >
                    {result.recommendation}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
