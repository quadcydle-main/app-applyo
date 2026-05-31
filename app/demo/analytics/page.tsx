"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart2, TrendingUp, Zap, Target, FileText, ArrowRight, Lock } from "lucide-react"
import Link from "next/link"

const WEEKLY_DATA = [
  { day: "Mon", count: 3 },
  { day: "Tue", count: 7 },
  { day: "Wed", count: 4 },
  { day: "Thu", count: 9 },
  { day: "Fri", count: 5 },
  { day: "Sat", count: 2 },
  { day: "Sun", count: 6 },
]
const MAX_COUNT = Math.max(...WEEKLY_DATA.map((d) => d.count))

const TOOL_USAGE = [
  { tool: "Resume Improver",  uses: 8, color: "bg-orange-500" },
  { tool: "Cover Letter",     uses: 6, color: "bg-emerald-500" },
  { tool: "ATS Checker",      uses: 5, color: "bg-amber-500" },
  { tool: "Job Finder",       uses: 3, color: "bg-purple-500" },
  { tool: "Email Maker",      uses: 2, color: "bg-blue-500" },
]

export default function DemoAnalyticsPage() {
  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in max-w-4xl">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-950/50 rounded-lg flex items-center justify-center">
            <BarChart2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Usage Analytics</h1>
          <Badge variant="secondary">Demo</Badge>
          <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400 border-0 text-[10px] font-bold">PRO</Badge>
        </div>
        <p className="text-muted-foreground text-sm">Track how you&apos;re using Applyo and measure your job search progress.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        {[
          { label: "Total Generations", value: "24", icon: Zap, color: "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/50" },
          { label: "ATS Score Avg",     value: "82%", icon: Target, color: "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/50" },
          { label: "Resumes Improved",  value: "3",   icon: FileText, color: "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/50" },
          { label: "Jobs Tracked",      value: "4",   icon: TrendingUp, color: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/50" },
        ].map((stat) => (
          <Card key={stat.label} className="border-border">
            <CardContent className="p-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly usage bar chart */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-sm">Generations This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-28">
            {WEEKLY_DATA.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-foreground">{d.count}</span>
                <div
                  className="w-full bg-primary rounded-t-sm transition-all"
                  style={{ height: `${(d.count / MAX_COUNT) * 80}px` }}
                />
                <span className="text-[10px] text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tool breakdown */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-sm">Tool Usage Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {TOOL_USAGE.map((item) => (
            <div key={item.tool} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-foreground font-medium">{item.tool}</span>
                <span className="text-muted-foreground">{item.uses} uses</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color}`}
                  style={{ width: `${(item.uses / 10) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Pro upsell */}
      <Card className="border-border bg-muted/30">
        <CardContent className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground mb-1">Full analytics on Pro Plan</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Unlock insights like interview conversion rate, response rates by resume version, and salary trend matching.
            </p>
          </div>
          <Link href="/auth/sign-up" className="shrink-0">
            <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 text-xs h-8">
              Upgrade <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
