"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Target, Sparkles, ArrowRight, CheckCircle, AlertCircle, TrendingUp } from "lucide-react"
import { DEMO_RESUME, DEMO_JOB_DESCRIPTION, DEMO_ATS_RESULT } from "@/lib/demo/data"
import Link from "next/link"
import { toast } from "sonner"

export default function DemoATSCheckerPage() {
  const [resume, setResume] = useState(DEMO_RESUME)
  const [jobDesc, setJobDesc] = useState(DEMO_JOB_DESCRIPTION)
  const [result, setResult] = useState<typeof DEMO_ATS_RESULT | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1600))
    setResult(DEMO_ATS_RESULT)
    setIsLoading(false)
    toast.success("ATS analysis complete!")
  }

  const scoreColor =
    !result ? "" :
    result.score >= 80 ? "text-emerald-600" :
    result.score >= 60 ? "text-amber-600" : "text-red-600"

  const scoreBg =
    !result ? "" :
    result.score >= 80 ? "bg-emerald-100 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800" :
    result.score >= 60 ? "bg-amber-100 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800" :
    "bg-red-100 dark:bg-red-950/50 border-red-200 dark:border-red-800"

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in max-w-5xl">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-amber-100 dark:bg-amber-950/50 rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">ATS Score Checker</h1>
          <Badge variant="secondary">Demo</Badge>
        </div>
        <p className="text-muted-foreground text-sm">Check how well your resume passes ATS filters for a specific job.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Resume</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={resume} onChange={(e) => setResume(e.target.value)} className="min-h-[240px] text-xs font-mono bg-muted border-border resize-none" />
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Job Description</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} className="min-h-[240px] text-xs font-mono bg-muted border-border resize-none" />
          </CardContent>
        </Card>
      </div>

      <Button onClick={handleGenerate} disabled={isLoading} className="bg-primary text-primary-foreground hover:bg-primary/90">
        {isLoading ? (
          <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 animate-spin" /> Analyzing...</span>
        ) : (
          <span className="flex items-center gap-2"><Target className="w-4 h-4" /> Check ATS Score</span>
        )}
      </Button>

      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Score */}
          <div className={`flex items-center gap-6 p-6 rounded-xl border ${scoreBg}`}>
            <div className="text-center">
              <div className={`text-5xl font-bold ${scoreColor}`}>{result.score}</div>
              <div className="text-xs text-muted-foreground mt-1">ATS Score</div>
            </div>
            <div className="flex-1">
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ${result.score >= 80 ? "bg-emerald-500" : result.score >= 60 ? "bg-amber-500" : "bg-red-500"}`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {result.score >= 80 ? "Excellent — your resume is ATS-ready for this role." :
                 result.score >= 60 ? "Good — a few tweaks will make this much stronger." :
                 "Needs work — significant optimization required."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-1.5 text-amber-600">
                  <AlertCircle className="w-4 h-4" /> Missing Keywords
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {result.missingKeywords.map((kw) => (
                  <Badge key={kw} variant="warning">{kw}</Badge>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle className="w-4 h-4" /> Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5">
                  {result.strengths.map((s) => (
                    <li key={s} className="text-xs text-foreground flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /> {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-1.5 text-primary">
                  <TrendingUp className="w-4 h-4" /> Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5">
                  {result.suggestions.map((s) => (
                    <li key={s} className="text-xs text-foreground flex items-start gap-1.5">
                      <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" /> {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Link href="/auth/sign-up">
            <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
              Sign up to run on your own resume <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
