"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, AlertCircle, Clock } from "lucide-react"
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
      save_item: "Saved Item",
    }
    return labels[action] || action
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in">
      <div className="animate-slide-up">
        <h1 className="text-2xl md:text-3xl font-semibold text-black dark:text-white flex items-center gap-2 mb-2 tracking-tight">
          <Briefcase className="w-6 h-6" />
          Activity Log
        </h1>
        <p className="text-neutral-500 dark:text-neutral-500 text-sm">
          Track all your AI generation activities
        </p>
      </div>

      <Card className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-black dark:text-white">Recent Activities</CardTitle>
          <CardDescription className="text-xs text-neutral-500 dark:text-neutral-500">
            Your latest AI-generated items and actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-neutral-400 dark:text-neutral-600 text-sm">Loading activity...</div>
          ) : activity.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="w-8 h-8 text-neutral-300 dark:text-neutral-700 mb-3" />
              <p className="text-neutral-400 dark:text-neutral-600 text-sm">No activities yet. Start generating!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {activity.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between p-3 bg-neutral-50 dark:bg-black rounded-lg border border-neutral-200 dark:border-neutral-800 smooth-hover hover:border-black dark:hover:border-white animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-black dark:text-white">{getActionLabel(item.action)}</p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-600 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
