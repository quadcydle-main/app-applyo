"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight, Sparkles, Zap, Shield, Brain, FileText, Target, Briefcase,
  CheckCircle, Star, Users, TrendingUp, Search, ClipboardList, BookOpen,
  BarChart3, Play, Mail, FolderOpen, CreditCard, BarChart2, ChevronRight,
  Cpu, Lock,
} from "lucide-react"

const tools = [
  { icon: Brain,       label: "Resume Improver",    desc: "AI-enhanced resume in seconds",         href: "/demo/resume-improver",    color: "bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400" },
  { icon: Target,      label: "ATS Checker",         desc: "Score & beat applicant tracking",       href: "/demo/ats-checker",         color: "bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400" },
  { icon: Brain,       label: "ATS Improver",        desc: "Optimize resume for ATS automatically", href: "/demo/ats-improver",        color: "bg-yellow-100 dark:bg-yellow-950/50 text-yellow-600 dark:text-yellow-400" },
  { icon: FileText,    label: "Cover Letter Maker",  desc: "Personalized cover letters instantly",  href: "/demo/cover-letter",        color: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400" },
  { icon: Mail,        label: "Email Maker",         desc: "Follow-up & cold outreach emails",      href: "/demo/email-maker",         color: "bg-teal-100 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400", badge: "New" },
  { icon: BookOpen,    label: "Interview Prep",      desc: "AI-generated practice questions",       href: "/demo/interview-questions", color: "bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400" },
  { icon: Search,      label: "Job Finder",          desc: "Discover matching opportunities",       href: "/demo/job-finder",          color: "bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400" },
  { icon: ClipboardList, label: "Job Tracker",       desc: "Track every application in one place",  href: "/demo/job-tracker",         color: "bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400" },
  { icon: BarChart3,   label: "Skill Gap Finder",    desc: "Know exactly what you're missing",      href: "/demo/skill-gap-finder",    color: "bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400" },
  { icon: BookOpen,    label: "Job-Resume Match",    desc: "Match score for any job description",   href: "/demo/job-resume-compare",  color: "bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400" },
  { icon: FolderOpen,  label: "Resume Vault",        desc: "Store & manage all resume versions",    href: "/demo/memory",              color: "bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400", badge: "New" },
  { icon: Zap,         label: "Auto-Applier",        desc: "Apply to 100s of jobs automatically",   href: "/demo/auto-applier/start",  color: "bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400", badge: "Team" },
]

const pricingPlans = [
  {
    name: "Starter",
    price: "$0",
    period: "",
    desc: "Try everything, no credit card needed.",
    cta: "Try Demo",
    ctaHref: "/demo",
    highlight: false,
    badge: null,
    features: [
      "Full demo mode with sample data",
      "Explore all 12 AI tools",
      "See real AI-generated outputs",
      "No account required",
    ],
    missing: ["Save results", "Use your own resume", "300+ generations/mo"],
  },
  {
    name: "Pro",
    price: "$15",
    period: "/month",
    desc: "Everything you need to land more interviews.",
    cta: "Get Started",
    ctaHref: "/auth/sign-up",
    highlight: true,
    badge: "Most Popular",
    features: [
      "300 AI generations/month",
      "All 12 AI tools",
      "Resume & cover letter storage",
      "Job tracker (unlimited apps)",
      "Email Maker",
      "Resume Vault (15 slots)",
      "Usage analytics",
      "Priority Gemini AI",
      "PDF resume upload & parsing",
    ],
    missing: ["Auto-Applier", "Team seats"],
  },
  {
    name: "Business",
    price: "$29",
    period: "/month",
    desc: "Unlimited power with advanced insights.",
    cta: "Get Business",
    ctaHref: "/auth/sign-up",
    highlight: false,
    badge: "New",
    features: [
      "Unlimited AI generations",
      "Everything in Pro",
      "Follow-up email sequences",
      "Advanced analytics & insights",
      "Resume version history",
      "Unlimited Resume Vault",
      "Priority support",
      "Export to PDF",
    ],
    missing: ["Auto-Applier", "5 team seats"],
  },
  {
    name: "Team",
    price: "$49",
    period: "/month",
    desc: "Full automation for serious job seekers & coaches.",
    cta: "Get Team",
    ctaHref: "/auth/sign-up",
    highlight: false,
    badge: "Best Value",
    features: [
      "Everything in Business",
      "Auto-Applier (Steel.dev)",
      "LinkedIn & Indeed bot",
      "5 team seats included",
      "Team analytics dashboard",
      "Bulk resume processing",
      "Dedicated account manager",
      "Custom integrations",
    ],
    missing: [],
  },
]

const stats = [
  { value: "50K+",  label: "Resumes improved" },
  { value: "120K+", label: "Cover letters generated" },
  { value: "89%",   label: "Interview rate increase" },
  { value: "4.9★",  label: "Average user rating" },
]

const testimonials = [
  {
    name: "Sarah K.",
    role: "Product Designer",
    text: "I went from zero callbacks to three interviews in two weeks. The ATS checker showed me exactly what was wrong with my resume.",
    rating: 5,
  },
  {
    name: "Marcus T.",
    role: "Software Engineer",
    text: "The cover letter generator is scarily good. I customized one in minutes and got a response the same day.",
    rating: 5,
  },
  {
    name: "Priya M.",
    role: "Marketing Manager",
    text: "The skill gap finder helped me target the right roles. I knew exactly what to learn and which jobs to apply for.",
    rating: 5,
  },
]

const steps = [
  {
    num: "01",
    icon: FileText,
    title: "Upload your resume",
    desc: "Paste or upload a PDF. Applyo parses it instantly and pre-fills every single tool with your data.",
  },
  {
    num: "02",
    icon: Cpu,
    title: "Pick your AI tool",
    desc: "Run ATS checks, write cover letters, prep for interviews, or find matching jobs — all AI-powered.",
  },
  {
    num: "03",
    icon: TrendingUp,
    title: "Apply with confidence",
    desc: "Use polished, tailored materials. Track every application, follow up automatically, and land more roles.",
  },
]

const PLAN_BADGE_COLORS: Record<string, string> = {
  "Most Popular": "bg-primary/10 text-primary",
  "New":          "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400",
  "Best Value":   "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400",
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* ── Navigation ──────────────────────────────── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5 md:px-12 border-b border-border bg-background/80 backdrop-blur-md animate-slide-down">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm shadow-primary/30">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">Applyo</span>
        </div>
        <div className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#features"    className="hover:text-foreground smooth-hover transition-colors">Features</a>
          <a href="#tools"       className="hover:text-foreground smooth-hover transition-colors">Tools</a>
          <a href="#how-it-works" className="hover:text-foreground smooth-hover transition-colors">How it works</a>
          <a href="#pricing"     className="hover:text-foreground smooth-hover transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/demo">
            <Button variant="ghost" size="sm" className="h-9 text-sm gap-1.5 smooth-hover">
              <Play className="w-3.5 h-3.5 text-primary" /> Try Demo
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="ghost" size="sm" className="h-9 text-sm smooth-hover hidden sm:flex">Login</Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button size="sm" className="h-9 text-sm bg-primary text-primary-foreground hover:bg-primary/90 smooth-hover shadow-sm shadow-primary/30">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-24 pb-20 md:pt-32 md:pb-28 md:px-12 text-center gradient-hero overflow-hidden">
        {/* background orbs */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute top-0 -right-40 w-72 h-72 rounded-full bg-orange-200/20 dark:bg-orange-900/10 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute bottom-0 -left-32 w-64 h-64 rounded-full bg-amber-200/20 dark:bg-amber-900/10 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

        <div className="relative max-w-4xl space-y-8 animate-fade-in">
          <Badge variant="secondary" className="gap-1.5 px-4 py-1.5 text-sm animate-pop-in">
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse-soft" />
            Powered by Gemini 2.0 Flash
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground animate-slide-up leading-[1.05]">
            Land Your Dream Job{" "}
            <span className="gradient-text">Faster</span>{" "}
            with AI
          </h1>

          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
            Craft winning resumes, generate tailored cover letters, ace interviews, and track every application — 12 AI-powered tools in one seamless workspace.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <Link href="/auth/sign-up">
              <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 smooth-hover h-12 px-8 text-base font-semibold shadow-lg shadow-primary/25 hover-lift">
                Start Free <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="gap-2 h-12 px-8 text-base border-border hover:bg-muted smooth-hover">
                <Play className="w-4 h-4 text-primary" />
                Try Demo — No sign up
              </Button>
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 animate-slide-up border-t border-border" style={{ animationDelay: "0.2s" }}>
            {stats.map((s, i) => (
              <div key={s.label} className="text-center animate-scale-in" style={{ animationDelay: `${0.25 + i * 0.07}s` }}>
                <div className="text-2xl md:text-3xl font-bold text-primary">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────── */}
      <section id="features" className="px-6 py-16 md:px-12 bg-muted/50 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Why Applyo?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to supercharge your job search — in one workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Sparkles,
                color: "bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400",
                title: "Gemini AI-Powered",
                desc: "All 12 tools run on Google Gemini 2.0 Flash — the fastest, most capable AI model available for professional outputs.",
              },
              {
                icon: Zap,
                color: "bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400",
                title: "Results in Seconds",
                desc: "Improve resumes, generate cover letters, write follow-up emails, and prep for interviews — all under 10 seconds per generation.",
              },
              {
                icon: Shield,
                color: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400",
                title: "Secure & Private",
                desc: "Your data lives in Supabase with row-level security and end-to-end encryption. We never sell or share your information.",
              },
            ].map((f, i) => (
              <div
                key={f.title}
                className="bg-card border border-border rounded-xl p-6 space-y-3 hover-lift animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${f.color}`}>
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools Grid ──────────────────────────────── */}
      <section id="tools" className="px-6 py-16 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">12 Powerful AI Tools</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From resume optimization to fully automated job applications.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {tools.map((tool, i) => (
              <Link key={tool.label} href={tool.href} className="group">
                <div
                  className="bg-card border border-border rounded-xl p-4 text-center space-y-2.5 hover-lift cursor-pointer animate-scale-in relative"
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  {tool.badge && (
                    <span className={`absolute top-2.5 right-2.5 text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      tool.badge === "New"  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400" :
                      tool.badge === "Team" ? "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400"   : ""
                    }`}>
                      {tool.badge.toUpperCase()}
                    </span>
                  )}
                  <div className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center ${tool.color} group-hover:scale-110 smooth-transform`}>
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-medium text-sm text-foreground leading-tight">{tool.label}</h3>
                  <p className="text-xs text-muted-foreground leading-snug">{tool.desc}</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 smooth-opacity font-medium">
                    Try it <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/demo">
              <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 smooth-hover shadow-md shadow-primary/20">
                <Play className="w-4 h-4" /> Try All 12 Tools in Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it Works ────────────────────────────── */}
      <section id="how-it-works" className="px-6 py-16 md:px-12 bg-muted/50 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">How It Works</h2>
            <p className="text-muted-foreground">Three steps to your next job offer.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, i) => (
              <div key={step.num} className="relative text-center space-y-4 animate-slide-up" style={{ animationDelay: `${i * 0.12}s` }}>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+32px)] right-0 border-t-2 border-dashed border-primary/20" />
                )}
                <div className="relative w-14 h-14 bg-primary/10 border-2 border-primary/20 rounded-2xl flex items-center justify-center mx-auto animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
                  <step.icon className="w-6 h-6 text-primary" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">{step.num.replace("0","")}</span>
                </div>
                <h3 className="font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────── */}
      <section className="px-6 py-16 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Loved by Job Seekers</h2>
            <p className="text-muted-foreground">Real results from real people.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="bg-card border border-border rounded-xl p-6 space-y-4 hover-lift animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────── */}
      <section id="pricing" className="px-6 py-16 md:px-12 bg-muted/50 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground">Start free. Upgrade when you're ready. Cancel anytime.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {pricingPlans.map((plan, i) => (
              <div
                key={plan.name}
                className={`bg-card border-2 rounded-2xl p-6 flex flex-col gap-5 animate-slide-up ${
                  plan.highlight
                    ? "border-primary shadow-xl shadow-primary/10 relative"
                    : "border-border hover-lift"
                }`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                    <Badge className="shadow-md shadow-primary/20 px-4">Most Popular</Badge>
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground uppercase tracking-wide">{plan.name}</p>
                    {plan.badge && !plan.highlight && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${PLAN_BADGE_COLORS[plan.badge]}`}>
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground text-sm">{plan.period}</span>}
                  </div>
                  <p className="text-xs text-muted-foreground">{plan.desc}</p>
                </div>

                <Link href={plan.ctaHref} className="block">
                  <Button
                    className={`w-full gap-1.5 ${
                      plan.highlight
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20"
                        : plan.name === "Starter"
                        ? "bg-muted text-foreground hover:bg-muted/80 border border-border"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {plan.cta} <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>

                <ul className="space-y-2 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                  {plan.missing?.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground/50 line-through">
                      <div className="w-3.5 h-3.5 shrink-0 mt-0.5 rounded-full border border-muted-foreground/20" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6 animate-fade-in">
            All paid plans include a 14-day free trial · No credit card required to start · Cancel anytime
          </p>
        </div>
      </section>

      {/* ── Security trust bar ──────────────────────── */}
      <section className="px-6 py-10 md:px-12 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: Lock,    title: "End-to-end encryption",   desc: "Your data is encrypted at rest and in transit" },
              { icon: Shield,  title: "RLS on all tables",        desc: "Row-level security via Supabase — only you see your data" },
              { icon: Users,   title: "No data selling",          desc: "We never share or sell your personal information" },
              { icon: Cpu,     title: "Gemini AI",                desc: "Powered by Google's latest large language model" },
            ].map((item, i) => (
              <div key={item.title} className="space-y-2 animate-slide-up" style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center mx-auto">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <p className="text-xs font-semibold text-foreground">{item.title}</p>
                <p className="text-[11px] text-muted-foreground leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="px-6 py-24 md:px-12">
        <div className="max-w-2xl mx-auto text-center space-y-6 animate-slide-up">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto animate-float">
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Ready to Level Up Your Job Search?
          </h2>
          <p className="text-muted-foreground">
            Join thousands of job seekers already using Applyo to land their dream roles. Try the full demo — no account needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/sign-up">
              <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 smooth-hover h-12 px-8 text-base font-semibold shadow-lg shadow-primary/25">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="h-12 px-8 gap-2 smooth-hover">
                <Play className="w-4 h-4 text-primary" /> Try Demo First
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────── */}
      <footer className="px-6 py-8 md:px-12 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold text-foreground">Applyo</span>
              <span className="text-xs text-muted-foreground">— AI Job Application Assistant</span>
            </div>
            <div className="flex items-center flex-wrap justify-center gap-5 text-xs text-muted-foreground">
              <a href="#features"     className="hover:text-foreground smooth-hover">Features</a>
              <a href="#tools"        className="hover:text-foreground smooth-hover">Tools</a>
              <a href="#pricing"      className="hover:text-foreground smooth-hover">Pricing</a>
              <Link href="/demo"      className="hover:text-foreground smooth-hover">Demo</Link>
              <Link href="/auth/sign-up" className="hover:text-foreground smooth-hover">Sign Up</Link>
              <Link href="/auth/login"   className="hover:text-foreground smooth-hover">Login</Link>
              <Link href="/privacy"      className="hover:text-foreground smooth-hover">Privacy</Link>
              <Link href="/terms"        className="hover:text-foreground smooth-hover">Terms</Link>
            </div>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Applyo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
