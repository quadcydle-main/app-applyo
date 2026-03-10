"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Brain, Copy, Check, FileText, Sparkles, Target } from "lucide-react"

export default function ResumeImproverPage() {
  const [resumeText, setResumeText] = useState("")
  const [tone, setTone] = useState("formal")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [wordCount, setWordCount] = useState(0)

  const handleGenerate = async () => {
    if (!resumeText.trim()) {
      setError("Please enter resume text")
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
    setLoadingStep(0)

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

  const updateWordCount = (text: string) => {
    setResumeText(text)
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length
    setWordCount(words)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Resume Improver
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Enhance your resume with AI-powered suggestions and professional writing improvements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-slate-800">Your Resume</CardTitle>
                  <CardDescription className="text-slate-500">
                    Paste your resume text and choose your preferred tone
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="resume" className="text-slate-700 font-medium flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    Resume Text
                    <span className="text-sm text-slate-500 font-normal">
                      ({wordCount} {wordCount === 1 ? 'word' : 'words'})
                    </span>
                  </Label>
                  <Textarea
                    id="resume"
                    placeholder="Paste your resume content here... Include your experience, skills, education, and achievements. Minimum 100 words required."
                    value={resumeText}
                    onChange={(e) => updateWordCount(e.target.value)}
                    className="min-h-48 bg-white border-slate-300 focus:border-blue-500 transition-colors resize-none placeholder:text-slate-400 text-sm"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-slate-500">
                      {wordCount >= 100 ? (
                        <span className="text-green-600 font-medium">✓ Minimum word count met</span>
                      ) : (
                        <span>{100 - wordCount} more words needed</span>
                      )}
                    </p>
                    <span className="text-xs text-slate-500">Minimum 100 words</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="tone" className="text-slate-700 font-medium flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-green-500" />
                    Writing Tone
                  </Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="bg-white border-slate-300 focus:border-green-500 transition-colors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formal">📝 Formal & Professional</SelectItem>
                      <SelectItem value="conversational">💬 Conversational & Engaging</SelectItem>
                      <SelectItem value="persuasive">🎯 Persuasive & Impactful</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-slate-500 mt-2">
                    Choose the tone that best matches your industry and target roles
                  </p>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    {error}
                  </p>
                </div>
              )}

              <Button
                onClick={handleGenerate}
                disabled={isLoading || wordCount < 100}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-6 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Spinner className="mr-3" />
                    Generating Improvements...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-3 w-5 h-5" />
                    Improve My Resume
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-slate-800">Improved Resume</CardTitle>
                  <CardDescription className="text-slate-500">
                    Your enhanced resume with professional improvements
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-6 py-4">
                  {/* Loading Progress */}
                  <div className="text-center space-y-4">
                    <Spinner className="w-8 h-8 mx-auto text-blue-500" />
                    <div>
                      <p className="font-semibold text-slate-700 mb-2">
                        {[
                          "Analyzing resume content...",
                          "Identifying improvement areas...",
                          "Generating enhanced version...",
                          "Finalizing suggestions...",
                        ][loadingStep]}
                      </p>
                      <div className="w-full max-w-md mx-auto bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-500 ease-out"
                          style={{ width: `${((loadingStep + 1) / 4) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Loading Skeleton */}
                  <div className="space-y-4 opacity-60">
                    <div className="animate-pulse">
                      <div className="h-4 bg-slate-200 rounded w-32 mb-3"></div>
                      <div className="h-20 bg-slate-200 rounded"></div>
                    </div>
                    <div className="animate-pulse" style={{ animationDelay: '0.1s' }}>
                      <div className="h-4 bg-slate-200 rounded w-40 mb-3"></div>
                      <div className="h-48 bg-slate-200 rounded"></div>
                    </div>
                    <div className="animate-pulse" style={{ animationDelay: '0.2s' }}>
                      <div className="h-4 bg-slate-200 rounded w-28 mb-3"></div>
                      <div className="space-y-3">
                        <div className="h-24 bg-slate-200 rounded"></div>
                        <div className="h-24 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : !result ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-700 mb-2">Your Improved Resume Awaits</h3>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto">
                      Fill in your resume on the left and click "Improve My Resume" to see AI-powered enhancements and professional suggestions.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-fade-in">
                  {/* Summary */}
                  <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2 mb-3">
                      <Brain className="w-4 h-4 text-blue-500" />
                      AI Analysis Summary
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed">{result.summary}</p>
                  </div>

                  {/* Improved Resume */}
                  <div className="animate-slide-up">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-slate-800">Improved Resume</h3>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopy(result.improved_resume)}
                        className="gap-2 border-slate-300 hover:bg-slate-50 text-slate-700"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-5 max-h-80 overflow-y-auto shadow-inner">
                      <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                        {result.improved_resume}
                      </p>
                    </div>
                  </div>

                  {/* Key Changes */}
                  {result.edits && result.edits.length > 0 && (
                    <div className="animate-slide-up">
                      <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2 mb-3">
                        <Target className="w-4 h-4 text-green-500" />
                        Key Improvements Made
                      </h3>
                      <div className="space-y-3">
                        {result.edits.slice(0, 3).map((edit: any, i: number) => (
                          <div
                            key={i}
                            className="bg-green-50/50 border border-green-200 rounded-xl p-4 animate-fade-in"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          >
                            <p className="text-xs text-green-700 font-medium mb-2">{edit.reason}</p>
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <span className="text-xs text-red-500 mt-0.5">Before:</span>
                                <p className="text-xs text-slate-600 line-through flex-1">{edit.line_before}</p>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-xs text-green-600 mt-0.5">After:</span>
                                <p className="text-xs text-slate-800 font-medium flex-1">{edit.line_after}</p>
                              </div>
                            </div>
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 mx-auto bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">AI-Powered Analysis</h3>
            <p className="text-sm text-slate-600">Smart analysis of your resume content and structure</p>
          </div>

          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 mx-auto bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Tone Optimization</h3>
            <p className="text-sm text-slate-600">Adapts writing style to match your preferred tone</p>
          </div>

          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 mx-auto bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Professional Enhancement</h3>
            <p className="text-sm text-slate-600">Improves impact and readability while preserving your content</p>
          </div>
        </div>
      </div>
    </div>
  )
}