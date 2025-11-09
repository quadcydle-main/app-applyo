"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { Zap, Copy, Check } from "lucide-react"
import { ResumeUploader } from "@/components/resume-uploader"

export default function SkillGapFinderPage() {
  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [wordCount, setWordCount] = useState(0)

  const handleGenerate = async () => {
    if (!resumeText.trim()) {
      setError("Please provide your resume")
      return
    }
    if (!jobDescription.trim()) {
      setError("Please provide the job description")
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
      const response = await fetch("/api/core/skill-gap-finder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription }),
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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-black dark:text-white flex items-center gap-2 mb-2">
          <Zap className="w-6 h-6" />
          Skill Gap Finder
        </h1>
        <p className="text-neutral-500 text-sm">Identify skills you need to develop</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-black dark:text-white">Input</CardTitle>
            <CardDescription className="text-xs text-neutral-500">
              Provide your resume and job description
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Your Resume</Label>
              <ResumeUploader
                onSuccess={(text, wCount) => {
                  setResumeText(text)
                  setWordCount(wCount)
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
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="mt-1.5 min-h-40 text-sm bg-neutral-50 dark:bg-black border-neutral-200 dark:border-neutral-800"
              />
            </div>

            {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}

            <Button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full h-9 text-sm bg-black dark:bg-white text-white dark:text-black"
            >
              {isLoading && <Spinner className="mr-2 w-3.5 h-3.5" />}
              {isLoading ? "Analyzing..." : "Find Skill Gaps"}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-black dark:text-white">Gap Analysis</CardTitle>
            <CardDescription className="text-xs text-neutral-500">Skills you need to develop</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <Spinner className="w-8 h-8 mx-auto mb-4" />
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Analyzing gaps...</p>
              </div>
            ) : !result ? (
              <div className="text-center py-12 text-neutral-400 text-sm">Results will appear here</div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-black dark:text-white mb-2">Missing Skills</h3>
                  <div className="space-y-2">
                    {result.missing_skills?.map((skill: string, i: number) => (
                      <div
                        key={i}
                        className="bg-red-50 dark:bg-red-950/20 p-2 rounded text-xs text-red-900 dark:text-red-100"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-black dark:text-white mb-2">Matching Skills</h3>
                  <div className="space-y-2">
                    {result.matching_skills?.map((skill: string, i: number) => (
                      <div
                        key={i}
                        className="bg-green-50 dark:bg-green-950/20 p-2 rounded text-xs text-green-900 dark:text-green-100"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-black dark:text-white mb-2">Recommendations</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {result.recommendations}
                  </p>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy(JSON.stringify(result, null, 2))}
                  className="w-full gap-1.5 h-8 text-xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy Results
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
