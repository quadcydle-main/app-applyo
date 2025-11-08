"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, AlertCircle } from "lucide-react"
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
    <div className="p-6 md:p-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Briefcase className="w-8 h-8 text-muted-foreground" />
          Activity Log
        </h1>
        <p className="text-muted-foreground mt-2">Track all your AI generation activities</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Your latest AI-generated items and actions</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading activity...</div>
          ) : activity.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No activities yet. Start generating!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between p-4 bg-background rounded-lg border border-border"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{getActionLabel(item.action)}</p>
                    <p className="text-sm text-muted-foreground mt-1">
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
