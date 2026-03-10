"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Zap, AlertCircle, Target, FileText, TrendingUp, CheckCircle2 } from "lucide-react"

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
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-amber-500"
    if (score >= 40) return "text-orange-500"
    return "text-red-500"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-amber-500"
    if (score >= 40) return "bg-orange-500"
    return "bg-red-500"
  }

  const getScoreRingColor = (score: number) => {
    if (score >= 80) return "ring-green-200"
    if (score >= 60) return "ring-amber-200"
    if (score >= 40) return "ring-orange-200"
    return "ring-red-200"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ATS Score Checker
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Analyze your resume's compatibility with Applicant Tracking Systems and get actionable insights
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
                  <CardTitle className="text-2xl text-slate-800">Check Your Resume</CardTitle>
                  <CardDescription className="text-slate-500">
                    Paste your resume and job description for ATS analysis
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
                  </Label>
                  <Textarea
                    id="resume"
                    placeholder="Paste your resume content here... Include your experience, skills, education, and achievements."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="min-h-48 bg-white border-slate-300 focus:border-blue-500 transition-colors resize-none placeholder:text-slate-400 text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="jd" className="text-slate-700 font-medium flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-green-500" />
                    Job Description
                    <span className="text-xs text-slate-500 font-normal">(optional)</span>
                  </Label>
                  <Textarea
                    id="jd"
                    placeholder="Paste the job description to compare against specific requirements and keywords..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="min-h-32 bg-white border-slate-300 focus:border-green-500 transition-colors resize-none placeholder:text-slate-400 text-sm"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Adding a job description provides more targeted analysis and keyword matching
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
                onClick={handleCheck}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-6 text-lg font-semibold"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Spinner className="mr-3" />
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <Zap className="mr-3 w-5 h-5" />
                    Check ATS Score
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
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-slate-800">ATS Analysis</CardTitle>
                  <CardDescription className="text-slate-500">
                    Your resume's compatibility with applicant tracking systems
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {!result ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center">
                    <Target className="w-8 h-8 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-700 mb-2">Ready for Analysis</h3>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto">
                      Fill in your resume on the left and click "Check ATS Score" to see detailed compatibility analysis.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-fade-in">
                  {/* Score Display */}
                  <div className="text-center py-6">
                    <div className="relative inline-block">
                      <div className={`w-32 h-32 rounded-full flex items-center justify-center border-8 ${getScoreRingColor(result.atsScore)}`}>
                        <div className={`text-3xl font-bold ${getScoreColor(result.atsScore)}`}>
                          {result.atsScore}%
                        </div>
                      </div>
                      <div className={`absolute inset-0 rounded-full border-4 ${getScoreBgColor(result.atsScore)} opacity-20 animate-pulse`}></div>
                    </div>
                    <p className="text-slate-600 mt-4 font-medium">ATS Compatibility Score</p>
                    <div className="flex justify-center gap-4 mt-2 text-xs text-slate-500">
                      <span>0% - Poor</span>
                      <span>50% - Fair</span>
                      <span>80% - Good</span>
                    </div>
                  </div>

                  {/* Missing Keywords */}
                  {result.missingKeywords && result.missingKeywords.length > 0 && (
                    <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-5 animate-slide-up">
                      <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2 mb-3">
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                        Missing Keywords
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                          {result.missingKeywords.length} found
                        </span>
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {result.missingKeywords.map((keyword: string, i: number) => (
                          <span
                            key={i}
                            className="bg-white border border-amber-300 text-amber-700 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Formatting Issues */}
                  {result.formattingIssues && result.formattingIssues.length > 0 && (
                    <div className="bg-red-50/50 border border-red-200 rounded-xl p-5 animate-slide-up">
                      <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2 mb-3">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        Formatting Issues
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                          {result.formattingIssues.length} found
                        </span>
                      </h3>
                      <ul className="space-y-2">
                        {result.formattingIssues.map((issue: string, i: number) => (
                          <li key={i} className="text-sm text-slate-700 flex gap-3 items-start">
                            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white text-xs">!</span>
                            </div>
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Suggestions */}
                  {result.suggestions && result.suggestions.length > 0 && (
                    <div className="bg-green-50/50 border border-green-200 rounded-xl p-5 animate-slide-up">
                      <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Improvement Suggestions
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          {result.suggestions.length} suggestions
                        </span>
                      </h3>
                      <ul className="space-y-2">
                        {result.suggestions.map((suggestion: string, i: number) => (
                          <li key={i} className="text-sm text-slate-700 flex gap-3 items-start">
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <span>{suggestion}</span>
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 mx-auto bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Keyword Analysis</h3>
            <p className="text-sm text-slate-600">Identifies missing keywords from job descriptions</p>
          </div>

          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 mx-auto bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Formatting Check</h3>
            <p className="text-sm text-slate-600">Detects ATS-unfriendly formatting issues</p>
          </div>

          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 mx-auto bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Score Tracking</h3>
            <p className="text-sm text-slate-600">Measures your resume's ATS compatibility</p>
          </div>
        </div>
      </div>
    </div>
  )
}