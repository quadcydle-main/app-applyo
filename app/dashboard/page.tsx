"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Briefcase, FileText, Zap } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [stats, setStats] = useState({ items: 0, resumes: 0, letters: 0 })
  const supabase = createClient()

  useEffect(() => {
    const fetchStats = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const [itemsRes, resumesRes, lettersRes] = await Promise.all([
        supabase.from("generated_items").select("id", { count: "exact" }).eq("user_id", user.id),
        supabase.from("resumes").select("id", { count: "exact" }).eq("user_id", user.id),
        supabase.from("cover_letters").select("id", { count: "exact" }).eq("user_id", user.id),
      ])

      setStats({
        items: itemsRes.count || 0,
        resumes: resumesRes.count || 0,
        letters: lettersRes.count || 0,
      })
    }

    fetchStats()
  }, [supabase])

  return (
    <div className="p-6 md:p-12 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to Applyo</h1>
        <p className="text-muted-foreground">Empower your job search with AI-driven insights</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Generated Items</CardTitle>
            <Zap className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.items}</div>
            <p className="text-xs text-muted-foreground">Total AI generations</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resumes Saved</CardTitle>
            <FileText className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.resumes}</div>
            <p className="text-xs text-muted-foreground">Ready to use</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cover Letters</CardTitle>
            <Brain className="w-4 h-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.letters}</div>
            <p className="text-xs text-muted-foreground">Created</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/dashboard/resume-improver">
            <Card className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Brain className="w-5 h-5 text-primary" />
                  AI Resume Improver
                </CardTitle>
                <CardDescription>Enhance your resume with AI</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/dashboard/ats-checker">
            <Card className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="w-5 h-5 text-accent" />
                  ATS Score Checker
                </CardTitle>
                <CardDescription>Check ATS compatibility</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/dashboard/cover-letter">
            <Card className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="w-5 h-5 text-secondary" />
                  Cover Letter Maker
                </CardTitle>
                <CardDescription>Create compelling cover letters</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/dashboard/activity">
            <Card className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Briefcase className="w-5 h-5 text-muted-foreground" />
                  Activity Log
                </CardTitle>
                <CardDescription>View your generation history</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
