"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Brain, Sparkles, ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import { DEMO_JOB_DESCRIPTION, DEMO_INTERVIEW_QUESTIONS } from "@/lib/demo/data"
import Link from "next/link"
import { toast } from "sonner"

export default function DemoInterviewQuestionsPage() {
  const [jobDesc, setJobDesc] = useState(DEMO_JOB_DESCRIPTION)
  const [result, setResult] = useState<typeof DEMO_INTERVIEW_QUESTIONS | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleGenerate = async () => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1700))
    setResult(DEMO_INTERVIEW_QUESTIONS)
    setOpenIndex(0)
    setIsLoading(false)
    toast.success("Interview questions ready!")
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in max-w-4xl">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-950/50 rounded-lg flex items-center justify-center">
            <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Interview Prep</h1>
          <Badge variant="secondary">Demo</Badge>
        </div>
        <p className="text-muted-foreground text-sm">Generate AI-powered interview questions and model answers based on any job description.</p>
      </div>

      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Job Description</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} className="min-h-[200px] text-xs font-mono bg-muted border-border resize-none" />
          <Button onClick={handleGenerate} disabled={isLoading} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {isLoading ? (
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 animate-spin" /> Generating questions...</span>
            ) : (
              <span className="flex items-center gap-2"><Brain className="w-4 h-4" /> Generate Interview Questions</span>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-3 animate-fade-in">
          <h2 className="text-base font-semibold text-foreground">{result.length} Interview Questions</h2>
          {result.map((q, i) => (
            <Card key={i} className="border-border smooth-hover hover:border-primary/30">
              <button
                className="w-full text-left p-4 flex items-start justify-between gap-3"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm font-medium text-foreground">{q.question}</p>
                </div>
                {openIndex === i ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                )}
              </button>
              {openIndex === i && (
                <CardContent className="pt-0 pb-4 px-4">
                  <div className="ml-9 p-3 bg-primary/5 border border-primary/15 rounded-lg">
                    <p className="text-xs font-medium text-primary mb-1.5">Model Answer</p>
                    <p className="text-sm text-foreground leading-relaxed">{q.answer}</p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
          <Link href="/auth/sign-up">
            <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
              Get questions for your own resume <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
