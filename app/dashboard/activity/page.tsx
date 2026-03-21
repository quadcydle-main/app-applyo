"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertCircle, Clock, Brain, FileText, Target, Zap } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default function ActivityPage() {
  const [activity, setActivity] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchActivity = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return
      

      const { data, error } = await supabase
        .from("activity_log")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50)

      if (!error && data) {
        setActivity(data)
      }
      setIsLoading(false)
    }

    fetchActivity()
  }, [supabase])

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      generate_resume: "Generated Resume Improvement",
      generate_cover_letter: "Generated Cover Letter",
      check_ats: "Checked ATS Score",
      improve_ats: "Improved ATS Score",
      compare_job: "Compared Job-to-Resume",
      find_skills: "Analyzed Skill Gaps",
      find_jobs: "Searched for Jobs",
      generate_questions: "Generated Interview Questions",
      check_validity: "Checked Job Validity",
      save_item: "Saved Item",
    }
    return labels[action] || action
  }

  const getActionIcon = (action: string) => {
    if (action.includes("resume") || action.includes("ats")) return Brain
    if (action.includes("cover")) return FileText
    if (action.includes("job") || action.includes("find")) return Target
    return Zap
  }

  const getActionColor = (action: string) => {
    if (action.includes("resume")) return "bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400"
    if (action.includes("cover")) return "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
    if (action.includes("ats")) return "bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400"
    if (action.includes("job") || action.includes("find")) return "bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
    return "bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400"
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in">
      <div className="animate-slide-up">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2 mb-1 tracking-tight">
          <Activity className="w-6 h-6 text-primary" />
          Activity Log
        </h1>
        <p className="text-muted-foreground text-sm">
          Track all your AI generation activities
        </p>
      </div>

      <Card className="bg-card border-border animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-foreground">Recent Activities</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Your latest AI-generated items and actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg">
                  <div className="w-9 h-9 bg-muted animate-pulse rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted animate-pulse rounded w-48" />
                    <div className="h-3 bg-muted animate-pulse rounded w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : activity.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mb-4">
                <AlertCircle className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="text-foreground font-medium mb-1">No activities yet</p>
              <p className="text-muted-foreground text-sm">Start using AI tools to see your activity here</p>
            </div>
          ) : (
            <div className="space-y-2">
              {activity.map((item, index) => {
                const IconComponent = getActionIcon(item.action)
                const colorClass = getActionColor(item.action)
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-border smooth-hover hover:border-primary/20 hover:bg-muted animate-fade-in"
                    style={{ animationDelay: `${index * 0.03}s` }}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{getActionLabel(item.action)}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
