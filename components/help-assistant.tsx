"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { MessageCircle, X, Sparkles, ArrowRight, Send } from "lucide-react"

type Preset = {
  q: string
  a: string
  links?: { label: string; href: string }[]
}

type Msg =
  | { role: "bot"; text: string; links?: { label: string; href: string }[] }
  | { role: "user"; text: string }

function buildPresets(basePath: string): { category: string; items: Preset[] }[] {
  const p = (slug: string) => `${basePath}/${slug}`
  return [
    {
      category: "Resume & Writing",
      items: [
        { q: "Improve my resume", a: "The AI Resume Improver rewrites your resume section-by-section with stronger, quantified bullet points. Paste your resume and hit improve.", links: [{ label: "Open Resume Improver", href: p("resume-improver") }] },
        { q: "Write a cover letter", a: "Cover Letter Maker generates a tailored letter from your resume + the job description, with adjustable tone.", links: [{ label: "Open Cover Letter Maker", href: p("cover-letter") }] },
        { q: "Write a follow-up email", a: "Email Maker drafts follow-ups, cold outreach, thank-you notes, and referral requests in seconds.", links: [{ label: "Open Email Maker", href: p("email-maker") }] },
      ],
    },
    {
      category: "ATS & Matching",
      items: [
        { q: "Check my ATS score", a: "ATS Checker scores your resume against a job, flags missing keywords, and lists formatting issues.", links: [{ label: "Open ATS Checker", href: p("ats-checker") }] },
        { q: "Boost my ATS score", a: "ATS Improver rewrites your resume to integrate the keywords and structure that applicant tracking systems reward.", links: [{ label: "Open ATS Improver", href: p("ats-improver") }] },
        { q: "Compare resume to a job", a: "Job-Resume Compare gives a match score with strengths, gaps, and targeted edit suggestions.", links: [{ label: "Open Job-Resume Compare", href: p("job-resume-compare") }] },
        { q: "Find my skill gaps", a: "Skill Gap Finder shows which skills you have vs. what a role needs, plus what to learn next.", links: [{ label: "Open Skill Gap Finder", href: p("skill-gap-finder") }] },
      ],
    },
    {
      category: "Jobs",
      items: [
        { q: "Find jobs for me", a: "Job Finder surfaces roles matched to your profile with a match % for each. You can Quick Apply or save them.", links: [{ label: "Open Job Finder", href: p("job-finder") }] },
        { q: "Track my applications", a: "Job Tracker keeps every application, status, and note organized in one board.", links: [{ label: "Open Job Tracker", href: p("job-tracker") }] },
        { q: "Is this job legit?", a: "Job Validity Checker analyzes a posting for scam/stale signals and gives a legitimacy score.", links: [{ label: "Open Job Validity", href: p("job-validity") }] },
        { q: "Prep for an interview", a: "Interview Prep generates likely questions with model answers tailored to the role.", links: [{ label: "Open Interview Prep", href: p("interview-questions") }] },
        { q: "Auto-apply to jobs", a: "Auto-Applier (Team plan) submits applications for you using browser automation, with review rules you control.", links: [{ label: "See Auto-Applier", href: p("auto-applier/start") }] },
      ],
    },
    {
      category: "Account & App",
      items: [
        { q: "Manage my resumes", a: "Resume Vault stores multiple resume versions and auto-fills them across every tool.", links: [{ label: "Open Resume Vault", href: p("memory") }] },
        { q: "See my usage", a: "The Analytics page shows your generation usage, ATS trends, and tool breakdown.", links: [{ label: "Open Analytics", href: p("analytics") }] },
        { q: "Pricing & plans", a: "There are 4 plans: Starter (free), Pro $15, Business $29, and Team $49. All paid plans include a 14-day trial.", links: [{ label: "View Plans", href: p("billing") }] },
        { q: "Change the theme/colors", a: "Click the palette icon in the top bar to switch color flavors (Caffeine, Mocha, Cat Meow, Matcha, and more) and toggle light/dark." },
        { q: "Talk to a human", a: "Our team is happy to help — email us and we'll get back to you fast.", links: [{ label: "Email support", href: "mailto:hello@applyo.app" }] },
      ],
    },
  ]
}

export function HelpAssistant({ basePath = "/dashboard" }: { basePath?: string }) {
  const [open, setOpen] = useState(false)
  const groups = buildPresets(basePath)
  const greeting: Msg = {
    role: "bot",
    text: "Hi! I'm the Applyo assistant 👋 Pick a topic below and I'll point you to the right tool.",
  }
  const [messages, setMessages] = useState<Msg[]>([greeting])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, open])

  const ask = (item: Preset) => {
    setMessages((m) => [
      ...m,
      { role: "user", text: item.q },
      { role: "bot", text: item.a, links: item.links },
    ])
  }

  const reset = () => setMessages([greeting])

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 h-13 w-13 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center smooth-hover hover:scale-105"
        style={{ height: 52, width: 52 }}
        aria-label="Open assistant"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-[min(92vw,22rem)] h-[min(70vh,32rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border bg-primary/5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">Applyo Assistant</p>
                <p className="text-[10px] text-muted-foreground leading-tight">Quick help · pick a topic</p>
              </div>
            </div>
            <button onClick={reset} className="text-[10px] text-muted-foreground hover:text-foreground font-medium uppercase tracking-wide">
              Reset
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((m, i) =>
              m.role === "bot" ? (
                <div key={i} className="flex gap-2 animate-fade-in">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3 text-primary" />
                  </div>
                  <div className="space-y-1.5 max-w-[85%]">
                    <div className="bg-muted rounded-2xl rounded-tl-sm px-3 py-2 text-xs text-foreground leading-relaxed">
                      {m.text}
                    </div>
                    {m.links?.map((l) =>
                      l.href.startsWith("mailto:") ? (
                        <a key={l.href} href={l.href} className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline">
                          {l.label} <ArrowRight className="w-3 h-3" />
                        </a>
                      ) : (
                        <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline">
                          {l.label} <ArrowRight className="w-3 h-3" />
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex justify-end animate-fade-in">
                  <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-3 py-2 text-xs max-w-[85%]">
                    {m.text}
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Preset chips */}
          <div className="border-t border-border p-3 shrink-0 max-h-44 overflow-y-auto">
            {groups.map((g) => (
              <div key={g.category} className="mb-2 last:mb-0">
                <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">{g.category}</p>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <button
                      key={item.q}
                      onClick={() => ask(item)}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-border bg-background hover:bg-primary/10 hover:border-primary/30 hover:text-primary text-muted-foreground smooth-hover"
                    >
                      {item.q}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="px-3 py-2 border-t border-border bg-muted/40 shrink-0 flex items-center gap-1.5">
            <Send className="w-3 h-3 text-muted-foreground" />
            <p className="text-[10px] text-muted-foreground">Tap a topic — no typing needed.</p>
          </div>
        </div>
      )}
    </>
  )
}
