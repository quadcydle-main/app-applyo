"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, Brain, FileText, Target, Search, BarChart3, ArrowRight } from "lucide-react"
import Link from "next/link"

const DEMO_ACTIVITY = [
  { action: "Improved resume with AI", icon: Brain, time: "2 minutes ago", feature: "Resume Improver" },
  { action: "Generated cover letter", icon: FileText, time: "15 minutes ago", feature: "Cover Letter" },
  { action: "Ran ATS score check", icon: Target, time: "1 hour ago", feature: "ATS Checker" },
  { action: "Found 4 matching jobs", icon: Search, time: "3 hours ago", feature: "Job Finder" },
  { action: "Analyzed skill gaps", icon: BarChart3, time: "Yesterday", feature: "Skill Gap Finder" },
  { action: "Generated interview questions", icon: Brain, time: "2 days ago", feature: "Interview Prep" },
]

export default function DemoActivityPage() {
  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in max-w-3xl">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4 text-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Activity Log</h1>
          <Badge variant="secondary">Demo</Badge>
        </div>
        <p className="text-muted-foreground text-sm">A history of everything John Doe has done in Applyo.</p>
      </div>

      <div className="space-y-2">
        {DEMO_ACTIVITY.map((item, i) => (
          <Card key={i} className="border-border smooth-hover hover:border-primary/30">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{item.action}</p>
                <p className="text-xs text-muted-foreground">{item.feature}</p>
              </div>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Link href="/auth/sign-up">
        <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
          Track your own activity <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </Link>
    </div>
  )
}
