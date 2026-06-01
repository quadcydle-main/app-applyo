"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ClipboardCheck, Check, X, Star, Calendar } from "lucide-react"
import { DEMO_RECRUITER_APPLICATIONS } from "@/lib/demo/data"
import { toast } from "sonner"

type Stage = "review" | "shortlist" | "rejected"

export default function DemoRecruiterApplications() {
  const [apps, setApps] = useState(
    DEMO_RECRUITER_APPLICATIONS.map((a) => ({ ...a, stage: a.stage as Stage })),
  )

  const setStage = (id: string, stage: Stage, name: string) => {
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, stage } : a)))
    toast.success(`${name} → ${stage === "shortlist" ? "Shortlisted" : stage === "rejected" ? "Rejected" : "In review"}`)
  }

  const stageBadge = (s: Stage) =>
    s === "shortlist" ? <Badge variant="success" className="text-[10px]">Shortlisted</Badge>
    : s === "rejected" ? <Badge variant="destructive" className="text-[10px]">Rejected</Badge>
    : <Badge variant="secondary" className="text-[10px]">In review</Badge>

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in max-w-4xl">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-sky-100 dark:bg-sky-950/50 rounded-lg flex items-center justify-center">
            <ClipboardCheck className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Vet Applications</h1>
          <Badge variant="secondary">Demo</Badge>
          <Badge className="bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400 border-0 text-[10px] font-bold">ENTERPRISE</Badge>
        </div>
        <p className="text-muted-foreground text-sm">Review candidates who applied to your roles. Shortlist or pass with one click.</p>
      </div>

      <div className="space-y-3">
        {apps.map((a) => (
          <Card key={a.id} className="border-border smooth-hover hover:border-primary/30">
            <CardContent className="p-4 flex items-start gap-4 flex-wrap">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-bold text-sm">{a.initials}</span>
              </div>
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-foreground">{a.candidate}</h3>
                  {stageBadge(a.stage)}
                </div>
                <p className="text-xs text-muted-foreground">Applied for <span className="text-foreground font-medium">{a.role}</span></p>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{a.appliedDate}</span>
                  <Badge variant="success" className="text-[10px]">{a.match}% match</Badge>
                  <span>ATS {a.atsScore}%</span>
                </div>
                {a.note && <p className="text-xs text-muted-foreground italic bg-muted rounded-md px-2.5 py-1.5">📝 {a.note}</p>}
                <div className="flex items-center gap-2 pt-1">
                  <Button size="sm" onClick={() => setStage(a.id, "shortlist", a.candidate)} className="h-7 text-xs gap-1.5 bg-amber-500 hover:bg-amber-500/90 text-white">
                    <Star className="w-3 h-3" /> Shortlist
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setStage(a.id, "review", a.candidate)} className="h-7 text-xs gap-1.5">
                    <Check className="w-3 h-3" /> Review
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setStage(a.id, "rejected", a.candidate)} className="h-7 text-xs gap-1.5 text-destructive hover:bg-destructive/10 border-destructive/30">
                    <X className="w-3 h-3" /> Pass
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
