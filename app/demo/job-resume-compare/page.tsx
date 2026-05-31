"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Sparkles, ArrowRight, CheckCircle, AlertCircle, TrendingUp } from "lucide-react"
import { DEMO_RESUME, DEMO_JOB_DESCRIPTION, DEMO_COMPARE_RESULT } from "@/lib/demo/data"
import Link from "next/link"
import { toast } from "sonner"

export default function DemoJobResumeComparePage() {
  const [resume, setResume] = useState(DEMO_RESUME)
  const [jobDesc, setJobDesc] = useState(DEMO_JOB_DESCRIPTION)
  const [result, setResult] = useState<typeof DEMO_COMPARE_RESULT | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1600))
    setResult(DEMO_COMPARE_RESULT)
    setIsLoading(false)
    toast.success("Match analysis complete!")
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in max-w-5xl">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-violet-100 dark:bg-violet-950/50 rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-violet-600 dark:text-violet-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Job-Resume Compare</h1>
          <Badge variant="secondary">Demo</Badge>
        </div>
        <p className="text-muted-foreground text-sm">See exactly how well your resume matches a job description.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border">
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Resume</CardTitle></CardHeader>
          <CardContent>
            <Textarea value={resume} onChange={(e) => setResume(e.target.value)} className="min-h-[240px] text-xs font-mono bg-muted border-border resize-none" />
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Job Description</CardTitle></CardHeader>
          <CardContent>
            <Textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} className="min-h-[240px] text-xs font-mono bg-muted border-border resize-none" />
          </CardContent>
        </Card>
      </div>

      <Button onClick={handleGenerate} disabled={isLoading} className="bg-primary text-primary-foreground hover:bg-primary/90">
        {isLoading ? (
          <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 animate-spin" /> Analyzing match...</span>
        ) : (
          <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Compare Now</span>
        )}
      </Button>

      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Score */}
          <div className="flex items-center gap-6 p-6 rounded-xl border border-primary/20 bg-primary/5">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary">{result.score}%</div>
              <div className="text-xs text-muted-foreground mt-1">Match Score</div>
            </div>
            <div className="flex-1">
              <div className="w-full bg-muted rounded-full h-3">
                <div className="h-3 rounded-full bg-primary transition-all duration-1000" style={{ width: `${result.score}%` }} />
              </div>
              <p className="text-sm text-muted-foreground mt-2">Strong match — a few targeted tweaks will make this near-perfect.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-emerald-600 flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5">
                  {result.strengths.map((s) => (
                    <li key={s} className="text-xs text-foreground flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />{s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-amber-600 flex items-center gap-1.5"><AlertCircle className="w-4 h-4" /> Gaps</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5">
                  {result.gaps.map((g) => (
                    <li key={g} className="text-xs text-foreground flex items-start gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />{g}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-primary flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5">
                {result.recommendations.map((r) => (
                  <li key={r} className="text-xs text-foreground flex items-start gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />{r}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Link href="/auth/sign-up">
            <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
              Compare your own resume <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
