"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { THEME_PRESETS, DEFAULT_THEME, THEME_STORAGE_KEY } from "@/lib/themes"
import {
  Sparkles, Target, FileText, Search, Rocket, ArrowRight, ArrowLeft, Check, X, Wand2,
} from "lucide-react"

const GOALS = [
  { id: "first-job", label: "Land my first job", icon: Rocket },
  { id: "switch", label: "Switch careers", icon: Target },
  { id: "level-up", label: "Get a better role", icon: FileText },
  { id: "explore", label: "Just exploring", icon: Search },
]

export function OnboardingWizard({ basePath = "/dashboard" }: { basePath?: string }) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [goal, setGoal] = useState<string | null>(null)
  const [preset, setPreset] = useState(DEFAULT_THEME)
  const key = `applyo-onboarded-${basePath}`

  useEffect(() => {
    try {
      if (!localStorage.getItem(key)) setOpen(true)
      const t = localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME
      setPreset(t)
    } catch {}
  }, [key])

  const finish = () => {
    try {
      localStorage.setItem(key, "1")
      if (goal) localStorage.setItem("applyo-goal", goal)
    } catch {}
    setOpen(false)
  }

  const applyPreset = (id: string) => {
    setPreset(id)
    document.documentElement.setAttribute("data-theme", id)
    try { localStorage.setItem(THEME_STORAGE_KEY, id) } catch {}
  }

  if (!open) return null

  const steps = [
    // 0 — welcome
    <div key="welcome" className="text-center space-y-4">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center animate-float">
        <Sparkles className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-2xl font-bold text-foreground">Welcome to Applyo 👋</h2>
      <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
        Your AI-powered job application toolkit. Let's set things up in 3 quick steps — it takes about 20 seconds.
      </p>
    </div>,
    // 1 — goal
    <div key="goal" className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-foreground">What brings you here?</h2>
        <p className="text-sm text-muted-foreground mt-1">We'll tailor your experience.</p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {GOALS.map((g) => {
          const active = goal === g.id
          return (
            <button
              key={g.id}
              onClick={() => setGoal(g.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border smooth-hover ${
                active ? "border-primary bg-primary/5 text-primary" : "border-border hover:bg-muted text-foreground"
              }`}
            >
              <g.icon className="w-5 h-5" />
              <span className="text-xs font-medium text-center">{g.label}</span>
            </button>
          )
        })}
      </div>
    </div>,
    // 2 — theme
    <div key="theme" className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-foreground">Pick your vibe 🎨</h2>
        <p className="text-sm text-muted-foreground mt-1">Choose a color flavor — change it anytime in Settings.</p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {THEME_PRESETS.map((p) => {
          const active = preset === p.id
          return (
            <button
              key={p.id}
              onClick={() => applyPreset(p.id)}
              className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border smooth-hover ${
                active ? "border-primary bg-primary/5" : "border-border hover:bg-muted"
              }`}
              title={p.description}
            >
              <span
                className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${p.swatch[0]} 50%, ${p.swatch[1]} 50%)` }}
              >
                {active && <Check className="w-3.5 h-3.5 text-white drop-shadow" />}
              </span>
              <span className="text-[10px] text-foreground leading-tight">{p.emoji}</span>
            </button>
          )
        })}
      </div>
    </div>,
    // 3 — done
    <div key="done" className="text-center space-y-4">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
        <Check className="w-8 h-8 text-emerald-500" />
      </div>
      <h2 className="text-2xl font-bold text-foreground">You're all set!</h2>
      <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
        Tip: press <kbd className="text-[10px] font-mono bg-muted border border-border rounded px-1.5 py-0.5">⌘K</kbd> anytime to jump to any tool. Want a head start?
      </p>
      <Link
        href={`${basePath}/tailor`}
        onClick={finish}
        className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 smooth-hover text-sm font-medium"
      >
        <Wand2 className="w-4 h-4" /> Try “Tailor Everything”
      </Link>
    </div>,
  ]

  const isLast = step === steps.length - 1
  const canNext = step !== 1 || goal !== null

  return (
    <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <span key={i} className={`rounded-full transition-all ${i === step ? "w-5 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-border"}`} />
            ))}
          </div>
          <button onClick={finish} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
        </div>

        <div className="p-6">{steps[step]}</div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          {step > 0 && !isLast ? (
            <button onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          ) : (
            <button onClick={finish} className="text-xs text-muted-foreground hover:text-foreground">Skip</button>
          )}
          {!isLast ? (
            <button
              onClick={() => canNext && setStep((s) => s + 1)}
              disabled={!canNext}
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold disabled:opacity-50"
            >
              {step === 0 ? "Get started" : "Next"} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button onClick={finish} className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg border border-border text-foreground hover:bg-muted text-xs font-semibold">
              Explore on my own
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
