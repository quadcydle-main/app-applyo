"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { FileText, Copy, CheckCircle, ArrowRight, Sparkles, Download } from "lucide-react"
import { DEMO_RESUME, DEMO_JOB_DESCRIPTION, DEMO_COVER_LETTER } from "@/lib/demo/data"
import { printDocument } from "@/lib/print"
import Link from "next/link"
import { toast } from "sonner"

export default function DemoCoverLetterPage() {
  const [resume, setResume] = useState(DEMO_RESUME)
  const [jobDesc, setJobDesc] = useState(DEMO_JOB_DESCRIPTION)
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 2000))
    setResult(DEMO_COVER_LETTER)
    setIsLoading(false)
    toast.success("Cover letter generated!")
  }

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast.success("Copied!")
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in max-w-5xl">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-950/50 rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Cover Letter Maker</h1>
          <Badge variant="secondary">Demo</Badge>
        </div>
        <p className="text-muted-foreground text-sm">Generate a personalized cover letter in seconds using AI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Your Resume</CardTitle>
            <CardDescription className="text-xs">Paste resume to personalize the letter</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea value={resume} onChange={(e) => setResume(e.target.value)} className="min-h-[260px] text-xs font-mono bg-muted border-border resize-none" />
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Job Description</CardTitle>
            <CardDescription className="text-xs">Paste the job posting for a tailored letter</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} className="min-h-[260px] text-xs font-mono bg-muted border-border resize-none" />
          </CardContent>
        </Card>
      </div>

      <Button onClick={handleGenerate} disabled={isLoading} className="bg-primary text-primary-foreground hover:bg-primary/90">
        {isLoading ? (
          <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 animate-spin" /> Writing with Gemini AI...</span>
        ) : (
          <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Generate Cover Letter</span>
        )}
      </Button>

      {result && (
        <Card className="border-border animate-fade-in">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center justify-between">
              Your Cover Letter
              <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-1.5 h-8 text-xs">
                {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-5 border border-border">
              <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{result}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => printDocument("Cover Letter", result)} className="gap-1.5">
                <Download className="w-3.5 h-3.5" /> Download PDF
              </Button>
              <Link href="/auth/sign-up">
                <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
                  Save this letter to your account <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
