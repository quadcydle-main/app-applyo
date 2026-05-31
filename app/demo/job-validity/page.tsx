"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Shield, Sparkles, ArrowRight, CheckCircle, AlertCircle } from "lucide-react"
import { DEMO_JOB_DESCRIPTION, DEMO_JOB_VALIDITY } from "@/lib/demo/data"
import Link from "next/link"
import { toast } from "sonner"

export default function DemoJobValidityPage() {
  const [jobDesc, setJobDesc] = useState(DEMO_JOB_DESCRIPTION)
  const [result, setResult] = useState<typeof DEMO_JOB_VALIDITY | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1400))
    setResult(DEMO_JOB_VALIDITY)
    setIsLoading(false)
    toast.success("Job validity analysis complete!")
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in max-w-4xl">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-950/50 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Job Listing Validity Checker</h1>
          <Badge variant="secondary">Demo</Badge>
        </div>
        <p className="text-muted-foreground text-sm">Detect fake or scam job postings before you apply.</p>
      </div>

      <Card className="border-border">
        <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Job Description</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} className="min-h-[200px] text-xs font-mono bg-muted border-border resize-none" />
          <Button onClick={handleGenerate} disabled={isLoading} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {isLoading ? (
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 animate-spin" /> Checking...</span>
            ) : (
              <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Check Validity</span>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-6 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30">
            <div className="text-center">
              <div className="text-5xl font-bold text-emerald-600">{result.score}</div>
              <div className="text-xs text-muted-foreground mt-1">Legitimacy Score</div>
            </div>
            <div>
              <Badge variant="success" className="text-sm px-3 py-1 mb-2">{result.verdict}</Badge>
              <p className="text-sm text-foreground leading-relaxed">{result.fitAnalysis}</p>
            </div>
          </div>

          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-emerald-600 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" /> Green Flags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5">
                {result.greenFlags.map((f) => (
                  <li key={f} className="text-sm text-foreground flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />{f}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {result.redFlags.length > 0 && (
            <Card className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Red Flags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5">
                  {result.redFlags.map((f) => (
                    <li key={f} className="text-sm text-foreground flex items-start gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />{f}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <Link href="/auth/sign-up">
            <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
              Check any job posting with your account <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
