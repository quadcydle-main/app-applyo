"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, CheckCircle2, ArrowRight, Zap, Star, Sparkles } from "lucide-react"
import Link from "next/link"

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    badge: null,
    badgeColor: "",
    description: "Perfect for exploring Applyo",
    limits: "25 AI generations/month · 3 resume slots",
    color: "border-border",
    buttonLabel: "Current Plan (Demo)",
    buttonDisabled: true,
    features: [
      "AI Resume Improver",
      "Cover Letter Maker",
      "ATS Checker & Improver",
      "Job Finder",
      "Job Tracker (5 jobs)",
      "Interview Prep",
      "Email Maker",
    ],
    missing: ["Skill Gap Finder", "Unlimited jobs", "Priority AI", "Analytics", "Auto-Applier"],
  },
  {
    name: "Pro",
    price: "$15",
    period: "/month",
    badge: "Most Popular",
    badgeColor: "bg-primary/10 text-primary",
    description: "Everything you need to land more interviews",
    limits: "300 AI generations/month · 15 resume slots",
    color: "border-primary ring-1 ring-primary/30",
    buttonLabel: "Upgrade to Pro",
    buttonDisabled: false,
    features: [
      "Everything in Starter",
      "Skill Gap Finder",
      "Job-Resume Compare",
      "Job Validity Checker",
      "Unlimited Job Tracker",
      "Usage Analytics",
      "Priority Gemini AI",
      "Export to PDF",
    ],
    missing: ["Auto-Applier", "Team seats", "Dedicated support"],
  },
  {
    name: "Business",
    price: "$29",
    period: "/month",
    badge: "New",
    badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400",
    description: "Unlimited AI power with advanced insights",
    limits: "Unlimited generations · Unlimited resumes",
    color: "border-border",
    buttonLabel: "Upgrade to Business",
    buttonDisabled: false,
    features: [
      "Everything in Pro",
      "Unlimited AI generations",
      "Follow-up templates",
      "Advanced analytics",
      "Custom email sequences",
      "Resume version history",
      "Priority support",
    ],
    missing: ["Auto-Applier", "5 team seats"],
  },
  {
    name: "Team",
    price: "$49",
    period: "/month",
    badge: "Best Value",
    badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400",
    description: "Full automation for serious job seekers",
    limits: "Unlimited · 5 team seats · Auto-Applier",
    color: "border-border",
    buttonLabel: "Upgrade to Team",
    buttonDisabled: false,
    features: [
      "Everything in Business",
      "Auto-Applier (Steel.dev)",
      "LinkedIn Easy Apply bot",
      "Indeed Quick Apply bot",
      "5 team seats",
      "Team analytics dashboard",
      "Dedicated account manager",
      "Custom integrations",
    ],
    missing: [],
  },
]

const PLAN_ICONS = [CreditCard, Zap, Sparkles, Star]

export default function DemoBillingPage() {
  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Billing & Plans</h1>
          <Badge variant="secondary">Demo</Badge>
        </div>
        <p className="text-muted-foreground text-sm">
          You&apos;re currently on the <strong>Starter (Free)</strong> plan. Upgrade to unlock more AI power.
        </p>
      </div>

      {/* Current usage */}
      <Card className="border-border bg-muted/40">
        <CardContent className="p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide">This month&apos;s usage</p>
            <p className="text-2xl font-bold text-foreground mt-1">6 <span className="text-sm font-normal text-muted-foreground">/ 25 generations</span></p>
          </div>
          <div className="flex-1 max-w-xs">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: "24%" }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">24% of monthly limit used</p>
          </div>
        </CardContent>
      </Card>

      {/* Plans grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        {PLANS.map((plan, i) => {
          const Icon = PLAN_ICONS[i]
          return (
            <Card key={plan.name} className={`border-2 flex flex-col ${plan.color}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 bg-secondary rounded-xl flex items-center justify-center">
                    <Icon className="w-4 h-4 text-foreground" />
                  </div>
                  {plan.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${plan.badgeColor}`}>
                      {plan.badge}
                    </span>
                  )}
                </div>
                <CardTitle className="text-base mt-2">{plan.name}</CardTitle>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription className="text-xs">{plan.description}</CardDescription>
                <p className="text-[11px] text-primary font-medium">{plan.limits}</p>
              </CardHeader>
              <CardContent className="flex-1 space-y-3 pt-0">
                <div className="space-y-1.5">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-xs text-foreground">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link href="/auth/sign-up" className="block mt-4">
                  <Button
                    size="sm"
                    disabled={plan.buttonDisabled}
                    className={`w-full text-xs gap-1.5 ${
                      plan.buttonDisabled
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : plan.name === "Pro"
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {plan.buttonLabel}
                    {!plan.buttonDisabled && <ArrowRight className="w-3 h-3" />}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <p className="text-xs text-muted-foreground text-center animate-fade-in">
        All plans include a 14-day free trial. Cancel anytime. No questions asked.
      </p>
    </div>
  )
}
