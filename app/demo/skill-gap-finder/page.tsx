"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Sparkles, ArrowRight, CheckCircle, AlertCircle } from "lucide-react"
import { DEMO_RESUME, DEMO_JOB_DESCRIPTION, DEMO_SKILL_GAP } from "@/lib/demo/data"
import Link from "next/link"
import { toast } from "sonner"

export default function DemoSkillGapPage() {
  const [resume, setResume] = useState(DEMO_RESUME)
  const [jobDesc, setJobDesc] = useState(DEMO_JOB_DESCRIPTION)
  const [result, setResult] = useState<typeof DEMO_SKILL_GAP | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setResult(DEMO_SKILL_GAP)
    setIsLoading(false)
    toast.success("Skill gap analysis complete!")
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in max-w-5xl">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-teal-100 dark:bg-teal-950/50 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Skill Gap Finder</h1>
          <Badge variant="secondary">Demo</Badge>
        </div>
        <p className="text-muted-foreground text-sm">Discover exactly which skills you have and which you need for a specific role.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border">
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Resume</CardTitle></CardHeader>
          <CardContent>
            <Textarea value={resume} onChange={(e) => setResume(e.target.value)} className="min-h-[220px] text-xs font-mono bg-muted border-border resize-none" />
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Job Description</CardTitle></CardHeader>
          <CardContent>
            <Textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} className="min-h-[220px] text-xs font-mono bg-muted border-border resize-none" />
          </CardContent>
        </Card>
      </div>

      <Button onClick={handleGenerate} disabled={isLoading} className="bg-primary text-primary-foreground hover:bg-primary/90">
        {isLoading ? (
          <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 animate-spin" /> Analyzing skills...</span>
        ) : (
          <span className="flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Find Skill Gaps</span>
        )}
      </Button>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-emerald-600 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" /> Matching Skills ({result.matching.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {result.matching.map((s) => (
                  <Badge key={s} variant="success">{s}</Badge>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-amber-600 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Missing Skills ({result.missing.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {result.missing.map((s) => (
                  <Badge key={s} variant="warning">{s}</Badge>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-primary flex items-center gap-1.5">
                  <ArrowRight className="w-4 h-4" /> Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.recommendations.map((r) => (
                    <li key={r} className="text-sm text-foreground flex items-start gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />{r}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Link href="/auth/sign-up">
            <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
              Analyze your own resume <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
