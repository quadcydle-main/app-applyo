"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Brain, Search, Zap, Sparkles, ArrowRight, X, BookOpen, CheckCircle2,
} from "lucide-react"

const TUTORIAL_KEY = "applyo_demo_tutorial_done"

const CHAPTERS = [
  {
    id: 1,
    icon: Sparkles,
    color: "bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400",
    title: "Welcome to Applyo Demo",
    desc: "You're exploring Applyo as John Doe — a Senior Software Engineer. Every tool is pre-loaded with realistic data so you can see exactly what Applyo does.",
    hint: "👆 The sidebar on the left has all your tools, organized by category.",
  },
  {
    id: 2,
    icon: Brain,
    color: "bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400",
    title: "AI Resume & Cover Letter Tools",
    desc: "Under 'AI Tools' you'll find Resume Improver, Cover Letter Maker, ATS Checker, and more. Each tool uses Gemini AI to generate professional results in seconds.",
    hint: "🎯 Try the Resume Improver first — hit 'Improve My Resume' to see AI in action.",
  },
  {
    id: 3,
    icon: Search,
    color: "bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400",
    title: "Job Intelligence Tools",
    desc: "Under 'Job Intelligence' you can find matching jobs, track your applications, check if a job posting is legitimate, and compare your resume to any job description.",
    hint: "📋 The Job Tracker shows all your applications with status tracking and follow-up reminders.",
  },
  {
    id: 4,
    icon: Zap,
    color: "bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400",
    title: "Auto-Applier (Team Plan)",
    desc: "The Auto-Applier uses Steel.dev browser automation to automatically submit applications to LinkedIn, Indeed, and more — on your behalf, while you sleep.",
    hint: "⚡ Available on the Team Plan. Upgrade after signing up to unlock this feature.",
  },
  {
    id: 5,
    icon: CheckCircle2,
    color: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400",
    title: "You're ready to explore!",
    desc: "You've seen everything Applyo offers. When you're ready, create a free account to use all tools with your own resume and start landing more interviews.",
    hint: "🚀 Pro tip: Upload your real resume after signing up — Applyo pre-fills all tools automatically.",
  },
]

interface DemoTutorialProps {
  forceOpen?: boolean
  onClose?: () => void
}

export function DemoTutorial({ forceOpen, onClose }: DemoTutorialProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [chapter, setChapter] = useState(0)

  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true)
      setChapter(0)
      return
    }
    const done = localStorage.getItem(TUTORIAL_KEY)
    if (!done) setIsOpen(true)
  }, [forceOpen])

  const handleClose = () => {
    localStorage.setItem(TUTORIAL_KEY, "1")
    setIsOpen(false)
    onClose?.()
  }

  const handleNext = () => {
    if (chapter < CHAPTERS.length - 1) {
      setChapter(chapter + 1)
    } else {
      handleClose()
    }
  }

  if (!isOpen) return null

  const current = CHAPTERS[chapter]
  const Icon = current.icon
  const isLast = chapter === CHAPTERS.length - 1

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-4 sm:p-6 pointer-events-none">
      <Card className="pointer-events-auto w-full max-w-sm border-border bg-card shadow-2xl shadow-primary/10 animate-slide-up">
        {/* Header */}
        <div className="flex items-start justify-between p-4 pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${current.color}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Tutorial · Chapter {chapter + 1} of {CHAPTERS.length}
                </span>
              </div>
              <h3 className="text-sm font-bold text-foreground mt-0.5 leading-tight">{current.title}</h3>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground transition-colors mt-0.5 shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">{current.desc}</p>
          <div className="bg-muted rounded-lg p-3">
            <p className="text-xs text-foreground leading-relaxed">{current.hint}</p>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-between px-4 pb-4">
          <div className="flex items-center gap-1.5">
            {CHAPTERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setChapter(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === chapter ? "w-4 h-2 bg-primary" : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClose}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip tutorial
            </button>
            <Button
              size="sm"
              onClick={handleNext}
              className="h-7 text-xs gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLast ? "Start Exploring" : "Next"}
              <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export function TutorialRestartButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-[10px] text-muted-foreground hover:text-foreground transition-colors font-medium"
        title="Restart tutorial"
      >
        <BookOpen className="w-3 h-3" />
        Tutorial
      </button>
      {open && (
        <DemoTutorial forceOpen onClose={() => setOpen(false)} />
      )}
    </>
  )
}
