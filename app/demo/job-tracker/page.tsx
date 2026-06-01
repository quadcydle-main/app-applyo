"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ClipboardList, Calendar, Clock, GripVertical, ArrowRight, Plus } from "lucide-react"
import { DEMO_JOB_APPLICATIONS } from "@/lib/demo/data"
import Link from "next/link"
import { toast } from "sonner"

type Status = "applied" | "interviewing" | "offer" | "rejected"
type App = { id: string; company: string; job_title: string; status: Status; applied_date: string; followUp?: boolean }

const COLUMNS: { id: Status; label: string; accent: string; dot: string }[] = [
  { id: "applied",      label: "Applied",      accent: "border-t-slate-400",   dot: "bg-slate-400" },
  { id: "interviewing", label: "Interviewing", accent: "border-t-blue-500",    dot: "bg-blue-500" },
  { id: "offer",        label: "Offer",        accent: "border-t-emerald-500", dot: "bg-emerald-500" },
  { id: "rejected",     label: "Rejected",     accent: "border-t-rose-500",    dot: "bg-rose-500" },
]

export default function DemoJobTrackerPage() {
  const [apps, setApps] = useState<App[]>(
    DEMO_JOB_APPLICATIONS.map((a) => ({ ...a, status: a.status as Status, followUp: a.status === "applied" })),
  )
  const [dragId, setDragId] = useState<string | null>(null)
  const [overCol, setOverCol] = useState<Status | null>(null)

  const move = (id: string, status: Status) => {
    const app = apps.find((a) => a.id === id)
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status, followUp: status === "applied" } : a)))
    if (app && app.status !== status) {
      toast.success(`${app.company} moved to ${COLUMNS.find((c) => c.id === status)?.label}`)
    }
  }

  const onDrop = (status: Status) => {
    if (dragId) move(dragId, status)
    setDragId(null)
    setOverCol(null)
  }

  const daysAgo = (d: string) => {
    const diff = Math.round((Date.now() - new Date(d).getTime()) / 86400000)
    return diff <= 0 ? "today" : `${diff}d ago`
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in">
      <div className="animate-slide-up flex items-start justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-rose-100 dark:bg-rose-950/50 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Job Tracker</h1>
            <Badge variant="secondary">Demo</Badge>
          </div>
          <p className="text-muted-foreground text-sm">Drag cards between columns to update status. Follow-up reminders appear automatically.</p>
        </div>
        <Button size="sm" variant="outline" className="gap-1.5" onClick={() => toast.info("Sign up to add your own applications")}>
          <Plus className="w-3.5 h-3.5" /> Add application
        </Button>
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {COLUMNS.map((col) => {
          const items = apps.filter((a) => a.status === col.id)
          return (
            <div
              key={col.id}
              onDragOver={(e) => { e.preventDefault(); setOverCol(col.id) }}
              onDragLeave={() => setOverCol((c) => (c === col.id ? null : c))}
              onDrop={() => onDrop(col.id)}
              className={`rounded-xl border border-t-2 ${col.accent} bg-card/50 p-2.5 min-h-[220px] transition-colors ${overCol === col.id ? "bg-primary/5 !border-primary/30" : "border-border"}`}
            >
              <div className="flex items-center justify-between px-1.5 py-1.5 mb-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wide">{col.label}</span>
                </div>
                <span className="text-[10px] text-muted-foreground bg-muted rounded-full px-1.5 py-0.5">{items.length}</span>
              </div>

              <div className="space-y-2">
                {items.map((a) => (
                  <div
                    key={a.id}
                    draggable
                    onDragStart={() => setDragId(a.id)}
                    onDragEnd={() => { setDragId(null); setOverCol(null) }}
                    className={`group bg-card border border-border rounded-lg p-3 cursor-grab active:cursor-grabbing smooth-hover hover:border-primary/30 hover:shadow-sm ${dragId === a.id ? "opacity-50" : ""}`}
                  >
                    <div className="flex items-start gap-1.5">
                      <GripVertical className="w-3.5 h-3.5 text-muted-foreground/40 mt-0.5 shrink-0 group-hover:text-muted-foreground" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground leading-tight">{a.job_title}</p>
                        <p className="text-xs text-muted-foreground">{a.company}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-2.5 h-2.5" /> {daysAgo(a.applied_date)}
                          </span>
                          {a.followUp && (
                            <span className="text-[10px] text-amber-600 dark:text-amber-400 flex items-center gap-1 font-medium">
                              <Clock className="w-2.5 h-2.5" /> Follow up
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="text-[11px] text-muted-foreground/60 text-center py-6 border border-dashed border-border rounded-lg">
                    Drop here
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <Link href="/auth/sign-up">
        <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
          Sign up to track your real applications <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </Link>
    </div>
  )
}
