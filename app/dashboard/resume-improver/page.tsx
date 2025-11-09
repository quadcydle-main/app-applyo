"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Brain, Copy, Check } from "lucide-react"
import { ResumeUploader } from "@/components/resume-uploader"

export default function ResumeImproverPage() {
  const [resumeText, setResumeText] = useState("")
  const [tone, setTone] = useState("formal")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [resumeId, setResumeId] = useState<string | null>(null)
  const [wordCount, setWordCount] = useState(0)

  const handleGenerate = async () => {
    if (!resumeText.trim()) {
      setError("Please enter resume text")
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)
    setLoadingStep(0)

    // Simulate loading steps for real-time feedback
    const loadingSteps = [
      "Analyzing resume content...",
      "Identifying improvement areas...",
      "Generating enhanced version...",
      "Finalizing suggestions...",
    ]

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingSteps.length - 1) return prev + 1
        return prev
      })
    }, 1000)

    try {
      const response = await fetch("/api/core/resume-improver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, tone }),
      })

      clearInterval(stepInterval)

      if (!response.ok) throw new Error("Failed to generate")
      const data = await response.json()
      setResult(data.result)
    } catch (err) {
      clearInterval(stepInterval)
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
      setLoadingStep(0)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleUploadSuccess = (text: string, resId: string, wCount: number) => {
    setResumeText(text)
    setResumeId(resId)
    setWordCount(wCount)
    setError(null)
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in">
      <div className="animate-slide-up">
        <h1 className="text-2xl md:text-3xl font-semibold text-black dark:text-white flex items-center gap-2 mb-2 tracking-tight">
          <Brain className="w-6 h-6" />
          AI Resume Improver
        </h1>
        <p className="text-neutral-500 dark:text-neutral-500 text-sm">
          Enhance your resume with AI-powered suggestions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card
          className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 lg:h-fit animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-black dark:text-white">Your Resume</CardTitle>
            <CardDescription className="text-xs text-neutral-500 dark:text-neutral-500">
              Upload a PDF or paste your resume text
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ResumeUploader onSuccess={handleUploadSuccess} onError={(msg) => setError(msg)} disabled={isLoading} />

            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <span>or</span>
            </div>

            <div>
              <Label htmlFor="resume" className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                Resume Text ({wordCount} words)
              </Label>
              <Textarea
                id="resume"
                placeholder="Paste your resume here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="mt-1.5 min-h-48 text-sm bg-neutral-50 dark:bg-black border-neutral-200 dark:border-neutral-800 resize-none focus:border-black dark:focus:border-white smooth-hover"
              />
              <p className="text-xs text-neutral-400 dark:text-neutral-600 mt-1">Minimum 100 words required</p>
            </div>

            <div>
              <Label htmlFor="tone" className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                Tone
              </Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="mt-1.5 h-9 text-sm bg-neutral-50 dark:bg-black border-neutral-200 dark:border-neutral-800 focus:border-black dark:focus:border-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="conversational">Conversational</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-xs text-neutral-500 dark:text-neutral-500">{error}</p>}

            <Button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full h-9 text-sm bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 smooth-hover"
            >
              {isLoading && <Spinner className="mr-2 w-3.5 h-3.5" />}
              {isLoading ? "Generating..." : "Generate Improvements"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card
          className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-black dark:text-white">Improved Resume</CardTitle>
            <CardDescription className="text-xs text-neutral-500 dark:text-neutral-500">
              Your enhanced resume content
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4 animate-fade-in">
                {/* Loading State */}
                <div className="text-center py-8">
                  <Spinner className="w-8 h-8 mx-auto mb-4 text-black dark:text-white" />
                  <p className="text-sm font-medium text-black dark:text-white mb-2">
                    {
                      [
                        "Analyzing resume content...",
                        "Identifying improvement areas...",
                        "Generating enhanced version...",
                        "Finalizing suggestions...",
                      ][loadingStep]
                    }
                  </p>
                  <div className="w-full max-w-xs mx-auto bg-neutral-200 dark:bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-black dark:bg-white h-full transition-all duration-500 ease-out"
                      style={{ width: `${((loadingStep + 1) / 4) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Loading Skeleton */}
                <div className="space-y-4 opacity-40">
                  <div className="animate-pulse">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-20 mb-2" />
                    <div className="h-16 bg-neutral-200 dark:bg-neutral-800 rounded" />
                  </div>
                  <div className="animate-pulse" style={{ animationDelay: "0.1s" }}>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-32 mb-2" />
                    <div className="h-40 bg-neutral-200 dark:bg-neutral-800 rounded" />
                  </div>
                  <div className="animate-pulse" style={{ animationDelay: "0.2s" }}>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-24 mb-2" />
                    <div className="space-y-2">
                      <div className="h-20 bg-neutral-200 dark:bg-neutral-800 rounded" />
                      <div className="h-20 bg-neutral-200 dark:bg-neutral-800 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            ) : !result ? (
              <div className="text-center py-12 text-neutral-400 dark:text-neutral-600 text-sm">
                Generate improvements to see results
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <div className="animate-slide-up">
                  <h3 className="text-sm font-medium text-black dark:text-white mb-1.5">Summary</h3>
                  <p className="text-neutral-500 dark:text-neutral-500 text-xs leading-relaxed">{result.summary}</p>
                </div>

                <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-black dark:text-white">Improved Resume</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopy(result.improved_resume)}
                      className="gap-1.5 h-7 text-xs border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 smooth-hover"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="bg-neutral-50 dark:bg-black p-3 rounded-lg max-h-80 overflow-y-auto border border-neutral-200 dark:border-neutral-800">
                    <p className="text-xs text-black dark:text-white whitespace-pre-wrap leading-relaxed">
                      {result.improved_resume}
                    </p>
                  </div>
                </div>

                {result.edits && result.edits.length > 0 && (
                  <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                    <h3 className="text-sm font-medium text-black dark:text-white mb-2">Key Changes</h3>
                    <div className="space-y-2">
                      {result.edits.slice(0, 3).map((edit: any, i: number) => (
                        <div
                          key={i}
                          className="bg-neutral-50 dark:bg-black p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 animate-fade-in"
                          style={{ animationDelay: `${i * 0.05}s` }}
                        >
                          <p className="text-xs text-neutral-400 dark:text-neutral-600 mb-1.5">{edit.reason}</p>
                          <p className="text-xs line-through text-neutral-400 dark:text-neutral-600 mb-1">
                            {edit.line_before}
                          </p>
                          <p className="text-xs text-black dark:text-white font-medium">{edit.line_after}</p>
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
