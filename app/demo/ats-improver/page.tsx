"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Target, Copy, CheckCircle, ArrowRight, Sparkles } from "lucide-react"
import { DEMO_RESUME, DEMO_ATS_IMPROVED } from "@/lib/demo/data"
import Link from "next/link"
import { toast } from "sonner"

export default function DemoATSImproverPage() {
  const [resume, setResume] = useState(DEMO_RESUME)
  const [keywords, setKeywords] = useState("Jest, Playwright, CI/CD, accessibility, WCAG")
  const [result, setResult] = useState<typeof DEMO_ATS_IMPROVED | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1700))
    setResult(DEMO_ATS_IMPROVED)
    setIsLoading(false)
    toast.success("Resume optimized for ATS!")
  }

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.resume)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast.success("Copied!")
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in max-w-5xl">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-amber-100 dark:bg-amber-950/50 rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">ATS Score Improver</h1>
          <Badge variant="secondary">Demo</Badge>
        </div>
        <p className="text-muted-foreground text-sm">Automatically weave missing keywords into your resume to beat ATS filters.</p>
      </div>

      <Card className="border-border">
        <CardContent className="pt-4 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Missing Keywords (comma-separated)</label>
            <Input value={keywords} onChange={(e) => setKeywords(e.target.value)} className="h-9 text-sm bg-muted border-border" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Your Resume</label>
            <Textarea value={resume} onChange={(e) => setResume(e.target.value)} className="min-h-[240px] text-xs font-mono bg-muted border-border resize-none" />
          </div>
          <Button onClick={handleGenerate} disabled={isLoading} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {isLoading ? (
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 animate-spin" /> Optimizing...</span>
            ) : (
              <span className="flex items-center gap-2"><Target className="w-4 h-4" /> Improve for ATS</span>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex justify-between items-center">
                Keywords Added ({result.keywordsAdded.length})
                <div className="flex gap-1.5">
                  {result.keywordsAdded.map((k) => <Badge key={k} variant="success">{k}</Badge>)}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5">
                {result.changes.map((c) => (
                  <li key={c} className="text-xs text-foreground flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />{c}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex justify-between">
                Optimized Resume
                <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-1.5 h-7 text-xs">
                  {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <pre className="text-xs font-mono bg-muted p-4 rounded-lg overflow-auto whitespace-pre-wrap leading-relaxed border border-border min-h-[200px]">
                {result.resume}
              </pre>
              <Link href="/auth/sign-up">
                <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
                  Try with your own resume <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
