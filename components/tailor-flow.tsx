"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Wand2, Sparkles, Brain, FileText, Target, Check, Loader2, Copy, Download, ArrowRight, Circle,
} from "lucide-react"
import { DEMO_RESUME, DEMO_JOB_DESCRIPTION, DEMO_IMPROVED_RESUME, DEMO_COVER_LETTER, DEMO_ATS_RESULT } from "@/lib/demo/data"
import { printDocument } from "@/lib/print"
import { toast } from "sonner"
import Link from "next/link"

type StepState = "idle" | "running" | "done"
type Results = { resume?: string; cover?: string; atsScore?: number; missing?: string[] }

const STEPS = [
  { id: "resume", label: "Tailoring your resume", icon: Brain },
  { id: "cover", label: "Writing your cover letter", icon: FileText },
  { id: "ats", label: "Running ATS analysis", icon: Target },
] as const

export function TailorFlow({ isDemo = false }: { isDemo?: boolean }) {
  const [resumeText, setResumeText] = useState(isDemo ? DEMO_RESUME : "")
  const [jobDescription, setJobDescription] = useState(isDemo ? DEMO_JOB_DESCRIPTION : "")
  const [states, setStates] = useState<Record<string, StepState>>({ resume: "idle", cover: "idle", ats: "idle" })
  const [results, setResults] = useState<Results>({})
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)

  const setStep = (id: string, s: StepState) => setStates((p) => ({ ...p, [id]: s }))

  const runDemo = async () => {
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    setStep("resume", "running"); await wait(1300)
    setResults((r) => ({ ...r, resume: DEMO_IMPROVED_RESUME })); setStep("resume", "done")
    setStep("cover", "running"); await wait(1300)
    setResults((r) => ({ ...r, cover: DEMO_COVER_LETTER })); setStep("cover", "done")
    setStep("ats", "running"); await wait(1100)
    setResults((r) => ({ ...r, atsScore: DEMO_ATS_RESULT.score, missing: DEMO_ATS_RESULT.missingKeywords })); setStep("ats", "done")
  }

  const runReal = async () => {
    // 1. Resume
    setStep("resume", "running")
    const r1 = await fetch("/api/core/resume-improver", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeText }),
    }).then((r) => r.json()).catch(() => null)
    const improved = r1?.improved_resume || r1?.improvedResume || r1?.result?.improved_resume || (typeof r1 === "string" ? r1 : JSON.stringify(r1?.result ?? r1 ?? {}, null, 2))
    setResults((r) => ({ ...r, resume: improved })); setStep("resume", "done")

    // 2. Cover letter (use improved resume)
    setStep("cover", "running")
    const r2 = await fetch("/api/core/cover-letter", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeText: improved || resumeText, jobDescription }),
    }).then((r) => r.json()).catch(() => null)
    const cover = r2?.cover_letter || r2?.result?.cover_letter || (typeof r2 === "string" ? r2 : "")
    setResults((r) => ({ ...r, cover })); setStep("cover", "done")

    // 3. ATS check
    setStep("ats", "running")
    const r3 = await fetch("/api/core/ats-checker", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeText: improved || resumeText, jobDescription }),
    }).then((r) => r.json()).catch(() => null)
    setResults((r) => ({ ...r, atsScore: r3?.score ?? r3?.result?.score, missing: r3?.missingKeywords ?? r3?.result?.missingKeywords ?? [] }))
    setStep("ats", "done")
  }

  const handleRun = async () => {
    if (!isDemo && (!resumeText.trim() || !jobDescription.trim())) {
      toast.error("Add your resume and the job description first")
      return
    }
    setRunning(true); setDone(false); setResults({})
    setStates({ resume: "idle", cover: "idle", ats: "idle" })
    try {
      if (isDemo) await runDemo()
      else await runReal()
      setDone(true)
      toast.success("All done! Your tailored application is ready 🎉")
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setRunning(false)
    }
  }

  const copy = (text: string) => { navigator.clipboard.writeText(text); toast.success("Copied to clipboard") }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in max-w-4xl">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Wand2 className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Tailor Everything</h1>
          {isDemo && <Badge variant="secondary">Demo</Badge>}
          <Badge className="bg-primary/10 text-primary border-0 text-[10px] font-bold">1-CLICK</Badge>
        </div>
        <p className="text-muted-foreground text-sm">
          One click runs your resume tailoring, cover letter, and ATS check in sequence — a complete application kit.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="border-border">
          <CardContent className="pt-4 pb-4 space-y-1.5">
            <label className="text-xs font-medium text-foreground">Your Resume</label>
            <Textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} className="text-xs bg-muted border-border resize-none min-h-[140px] font-mono" placeholder="Paste your resume…" />
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-4 pb-4 space-y-1.5">
            <label className="text-xs font-medium text-foreground">Job Description</label>
            <Textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} className="text-xs bg-muted border-border resize-none min-h-[140px] font-mono" placeholder="Paste the job description…" />
          </CardContent>
        </Card>
      </div>

      <Button onClick={handleRun} disabled={running} size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
        {running ? <><Loader2 className="w-4 h-4 animate-spin" /> Tailoring…</> : <><Sparkles className="w-4 h-4" /> Tailor Everything</>}
      </Button>

      {/* Pipeline */}
      {(running || done) && (
        <div className="space-y-2 animate-fade-in">
          {STEPS.map((s) => {
            const st = states[s.id]
            return (
              <div key={s.id} className={`flex items-center gap-3 p-3 rounded-xl border smooth-hover ${st === "done" ? "border-emerald-500/30 bg-emerald-500/5" : st === "running" ? "border-primary/40 bg-primary/5" : "border-border"}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${st === "done" ? "bg-emerald-500/15 text-emerald-500" : st === "running" ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {st === "done" ? <Check className="w-4 h-4" /> : st === "running" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Circle className="w-3.5 h-3.5" />}
                </div>
                <span className={`text-sm ${st === "idle" ? "text-muted-foreground" : "text-foreground font-medium"}`}>{s.label}</span>
                {st === "done" && <Check className="w-3.5 h-3.5 text-emerald-500 ml-auto" />}
              </div>
            )
          })}
        </div>
      )}

      {/* Results */}
      {done && (
        <div className="space-y-4 animate-slide-up">
          {/* ATS score */}
          {typeof results.atsScore === "number" && (
            <Card className="border-border">
              <CardContent className="p-5 flex items-center gap-5">
                <div className="relative w-16 h-16 shrink-0">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-muted" strokeWidth="3" />
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-primary" strokeWidth="3" strokeDasharray={`${results.atsScore} 100`} strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-foreground">{results.atsScore}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">ATS Match Score</p>
                  <p className="text-xs text-muted-foreground mb-1.5">After tailoring your resume to this job</p>
                  {results.missing && results.missing.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {results.missing.slice(0, 6).map((k) => <Badge key={k} variant="outline" className="text-[10px]">{k}</Badge>)}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Resume */}
          {results.resume && (
            <Card className="border-border">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5"><Brain className="w-3.5 h-3.5 text-primary" /> Tailored Resume</h3>
                  <div className="flex gap-1.5">
                    <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => copy(results.resume!)}><Copy className="w-3 h-3" /> Copy</Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => printDocument("Tailored Resume", results.resume!)}><Download className="w-3 h-3" /> PDF</Button>
                  </div>
                </div>
                <pre className="text-xs text-muted-foreground font-sans whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">{results.resume}</pre>
              </CardContent>
            </Card>
          )}

          {/* Cover letter */}
          {results.cover && (
            <Card className="border-border">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-primary" /> Cover Letter</h3>
                  <div className="flex gap-1.5">
                    <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => copy(results.cover!)}><Copy className="w-3 h-3" /> Copy</Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => printDocument("Cover Letter", results.cover!)}><Download className="w-3 h-3" /> PDF</Button>
                  </div>
                </div>
                <pre className="text-xs text-muted-foreground font-sans whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">{results.cover}</pre>
              </CardContent>
            </Card>
          )}

          {isDemo && (
            <Link href="/auth/sign-up">
              <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
                Sign up to tailor with your real resume <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
