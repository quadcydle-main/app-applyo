"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, UserPlus, Star, Briefcase, ArrowRight, Sparkles, TrendingUp } from "lucide-react"
import { DEMO_RECRUITER, DEMO_RECRUITER_STATS, DEMO_CANDIDATES } from "@/lib/demo/data"
import Link from "next/link"

export default function DemoRecruiterDashboard() {
  const stats = [
    { label: "Talent Pool", value: DEMO_RECRUITER_STATS.talentPool.toLocaleString(), icon: Users, color: "text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-950/50" },
    { label: "New This Week", value: `+${DEMO_RECRUITER_STATS.newThisWeek}`, icon: UserPlus, color: "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/50" },
    { label: "Shortlisted", value: DEMO_RECRUITER_STATS.shortlisted, icon: Star, color: "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/50" },
    { label: "Active Roles", value: DEMO_RECRUITER_STATS.activeRoles, icon: Briefcase, color: "text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-950/50" },
  ]

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in max-w-5xl">
      <div className="animate-slide-up flex items-start justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-sky-100 dark:bg-sky-950/50 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Recruiter Hub</h1>
            <Badge variant="secondary">Demo</Badge>
            <Badge className="bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400 border-0 text-[10px] font-bold">ENTERPRISE</Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Welcome back, {DEMO_RECRUITER.name.split(" ")[0]}. Discover and vet opted-in candidates from the Applyo talent pool.
          </p>
        </div>
        <Link href="/demo/recruiter/candidates">
          <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
            Browse candidates <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        {stats.map((s) => (
          <Card key={s.label} className="border-border">
            <CardContent className="p-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${s.color}`}>
                <s.icon className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top matches */}
      <div className="space-y-3 animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-primary" /> Top matches for your open roles
          </h2>
          <Link href="/demo/recruiter/candidates" className="text-xs text-primary hover:underline font-medium">View all</Link>
        </div>
        {DEMO_CANDIDATES.slice(0, 3).map((c) => (
          <Card key={c.id} className="border-border smooth-hover hover:border-primary/30">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary text-sm font-bold">{c.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.headline} · {c.experience} · {c.location}</p>
              </div>
              <Badge variant="success" className="text-xs font-bold shrink-0">{c.match}% match</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* How it works */}
      <Card className="border-border bg-muted/30 animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /> How the Recruiter Hub works</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-muted-foreground">
          <div><span className="font-semibold text-foreground">1. Opted-in talent</span><br />Only candidates on a paid plan who chose to share their profile appear here.</div>
          <div><span className="font-semibold text-foreground">2. AI match scores</span><br />Each candidate is scored against your open roles automatically.</div>
          <div><span className="font-semibold text-foreground">3. Vet & reach out</span><br />Shortlist, leave notes, and contact candidates directly.</div>
        </CardContent>
      </Card>
    </div>
  )
}
