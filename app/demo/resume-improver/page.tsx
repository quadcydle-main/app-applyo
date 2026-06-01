"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Brain, Copy, CheckCircle, ArrowRight, Sparkles, Download } from "lucide-react"
import { DEMO_RESUME, DEMO_IMPROVED_RESUME } from "@/lib/demo/data"
import { printDocument } from "@/lib/print"
import Link from "next/link"
import { toast } from "sonner"

export default function DemoResumeImproverPage() {
  const [resume, setResume] = useState(DEMO_RESUME)
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1800))
    setResult(DEMO_IMPROVED_RESUME)
    setIsLoading(false)
    toast.success("Resume improved! Sign up to save results.")
  }

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast.success("Copied to clipboard!")
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in max-w-5xl">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-orange-100 dark:bg-orange-950/50 rounded-lg flex items-center justify-center">
            <Brain className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">AI Resume Improver</h1>
          <Badge variant="secondary">Demo</Badge>
        </div>
        <p className="text-muted-foreground text-sm">
          Pre-filled with John Doe&apos;s resume. Click Generate to see the AI improvement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Your Resume</CardTitle>
            <CardDescription className="text-xs">Edit or keep as-is, then click Generate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              className="min-h-[340px] text-xs font-mono bg-muted border-border resize-none"
            />
            <Button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-spin" /> Analyzing with Gemini AI...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Brain className="w-4 h-4" /> Improve Resume
                </span>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Improved Resume</CardTitle>
            <CardDescription className="text-xs">AI-enhanced version with better impact and keywords</CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-3">
                <pre className="text-xs font-mono bg-muted p-4 rounded-lg overflow-auto min-h-[340px] whitespace-pre-wrap leading-relaxed border border-border">
                  {result}
                </pre>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5">
                    {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => printDocument("Improved Resume", result)} className="gap-1.5">
                    <Download className="w-3.5 h-3.5" /> PDF
                  </Button>
                  <Link href="/auth/sign-up" className="flex-1">
                    <Button size="sm" className="w-full gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
                      Save to account <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="min-h-[340px] flex flex-col items-center justify-center text-center gap-3 bg-muted/50 rounded-lg border border-dashed border-border">
                <Brain className="w-10 h-10 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">Click &quot;Improve Resume&quot; to see the AI result</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
