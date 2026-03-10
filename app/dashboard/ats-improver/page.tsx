"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Copy, Zap, Sparkles, FileText, Target } from "lucide-react"

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ATS Score Improver
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Optimize your resume for Applicant Tracking Systems and land more interviews with AI-powered improvements
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
                  <CardTitle className="text-2xl text-slate-800">Improve Your Resume</CardTitle>
                  <CardDescription className="text-slate-500">
                    Add your resume and missing keywords for ATS optimization
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
                    placeholder="Paste your resume content here... Make sure to include your experience, skills, and achievements."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="min-h-48 bg-white border-slate-300 focus:border-blue-500 transition-colors resize-none placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <Label htmlFor="keywords" className="text-slate-700 font-medium flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-green-500" />
                    Missing Keywords
                    <span className="text-xs text-slate-500 font-normal">(comma-separated)</span>
                  </Label>
                  <Textarea
                    id="keywords"
                    placeholder="e.g., Python, React, AWS, Project Management, Leadership, Agile Methodology..."
                    value={missingKeywords}
                    onChange={(e) => setMissingKeywords(e.target.value)}
                    className="min-h-32 bg-white border-slate-300 focus:border-green-500 transition-colors resize-none placeholder:text-slate-400"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Add keywords from the job description that are missing from your resume
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
                onClick={handleImprove}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-6 text-lg font-semibold"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Spinner className="mr-3" />
                    Optimizing Your Resume...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-3 w-5 h-5" />
                    Improve Resume & Boost ATS Score
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Sparkles className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-slate-800">Optimized Resume</CardTitle>
                    <CardDescription className="text-slate-500">
                      Your ATS-optimized version with improved keyword density
                    </CardDescription>
                  </div>
                </div>
                {result && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy(result.improved_resume)}
                    className="gap-2 border-slate-300 hover:bg-slate-50 text-slate-700"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!result ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center">
                    <FileText className="w-8 h-8 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-700 mb-2">Your Optimized Resume Awaits</h3>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto">
                      Fill in your resume and keywords on the left, then click "Improve Resume" to see the optimized version here.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white border border-slate-200 rounded-xl p-6 max-h-96 overflow-y-auto shadow-inner">
                    <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                      {result.improved_resume}
                    </p>
                  </div>

                  {result.changes && result.changes.length > 0 && (
                    <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-5">
                      <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        Key Improvements Made
                      </h3>
                      <ul className="space-y-3">
                        {result.changes.map((change: string, i: number) => (
                          <li key={i} className="text-sm text-slate-700 flex gap-3 items-start">
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <span>{change}</span>
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
            <h3 className="font-semibold text-slate-800 mb-2">Keyword Optimization</h3>
            <p className="text-sm text-slate-600">Strategic placement of relevant keywords from job descriptions</p>
          </div>

          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 mx-auto bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">ATS Friendly Format</h3>
            <p className="text-sm text-slate-600">Maintains proper structure for applicant tracking systems</p>
          </div>

          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 mx-auto bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Professional Enhancement</h3>
            <p className="text-sm text-slate-600">Improves language and impact while preserving your content</p>
          </div>
        </div>
      </div>
    </div>
  )
}