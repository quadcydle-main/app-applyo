"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ClipboardList, ArrowRight, Briefcase, Calendar } from "lucide-react"
import { DEMO_JOB_APPLICATIONS } from "@/lib/demo/data"
import Link from "next/link"

const STATUS_CONFIG = {
  applied: { label: "Applied", variant: "secondary" as const },
  interviewing: { label: "Interviewing", variant: "info" as const },
  offer: { label: "Offer", variant: "success" as const },
  rejected: { label: "Rejected", variant: "destructive" as const },
}

export default function DemoJobTrackerPage() {
  const [apps] = useState(DEMO_JOB_APPLICATIONS)

  const counts = {
    applied: apps.filter((a) => a.status === "applied").length,
    interviewing: apps.filter((a) => a.status === "interviewing").length,
    offer: apps.filter((a) => a.status === "offer").length,
    rejected: apps.filter((a) => a.status === "rejected").length,
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in max-w-4xl">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-rose-100 dark:bg-rose-950/50 rounded-lg flex items-center justify-center">
            <ClipboardList className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Job Tracker</h1>
          <Badge variant="secondary">Demo</Badge>
        </div>
        <p className="text-muted-foreground text-sm">Track every application in one place — status, dates, and outcomes.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(counts).map(([status, count]) => (
          <Card key={status} className="border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{count}</div>
              <div className="text-xs text-muted-foreground capitalize mt-0.5">{status}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add button (disabled in demo) */}
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold text-foreground">Applications ({apps.length})</h2>
        <Link href="/auth/sign-up">
          <Button size="sm" variant="outline" className="gap-1.5 text-xs">
            <Briefcase className="w-3.5 h-3.5" /> Add application
          </Button>
        </Link>
      </div>

      {/* List */}
      <div className="space-y-2">
        {apps.map((app) => {
          const status = STATUS_CONFIG[app.status as keyof typeof STATUS_CONFIG]
          return (
            <Card key={app.id} className="border-border smooth-hover hover:border-primary/30">
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{app.job_title}</p>
                  <p className="text-xs text-muted-foreground truncate">{app.company}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {app.applied_date}
                  </span>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Link href="/auth/sign-up">
        <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
          Sign up to track your own applications <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </Link>
    </div>
  )
}
