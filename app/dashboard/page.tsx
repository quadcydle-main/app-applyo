"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Briefcase, FileText, Zap, ArrowRight } from "lucide-react"
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
    <div className="p-6 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="animate-slide-up">
        <h1 className="text-2xl md:text-3xl font-semibold text-black dark:text-white mb-2 tracking-tight">
          Welcome to Applyo
        </h1>
        <p className="text-neutral-500 dark:text-neutral-500 text-sm">
          Empower your job search with AI-driven insights
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <Card className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 smooth-hover hover:border-black dark:hover:border-white hover:-translate-y-0.5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-neutral-500 dark:text-neutral-500">
              Generated Items
            </CardTitle>
            <Zap className="w-4 h-4 text-black dark:text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-black dark:text-white">{stats.items}</div>
            <p className="text-xs text-neutral-400 dark:text-neutral-600 mt-1">Total AI generations</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 smooth-hover hover:border-black dark:hover:border-white hover:-translate-y-0.5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-neutral-500 dark:text-neutral-500">
              Resumes Saved
            </CardTitle>
            <FileText className="w-4 h-4 text-black dark:text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-black dark:text-white">{stats.resumes}</div>
            <p className="text-xs text-neutral-400 dark:text-neutral-600 mt-1">Ready to use</p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 smooth-hover hover:border-black dark:hover:border-white hover:-translate-y-0.5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-neutral-500 dark:text-neutral-500">
              Cover Letters
            </CardTitle>
            <Brain className="w-4 h-4 text-black dark:text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-black dark:text-white">{stats.letters}</div>
            <p className="text-xs text-neutral-400 dark:text-neutral-600 mt-1">Created</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="space-y-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-lg font-semibold text-black dark:text-white">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href="/dashboard/resume-improver" className="group">
            <Card className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 smooth-hover hover:border-black dark:hover:border-white hover:-translate-y-0.5 cursor-pointer h-full">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center justify-between text-sm group-hover:text-black dark:group-hover:text-white">
                  <span className="flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    AI Resume Improver
                  </span>
                  <ArrowRight className="w-4 h-4 smooth-hover group-hover:translate-x-0.5" />
                </CardTitle>
                <CardDescription className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                  Enhance your resume with AI
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/dashboard/ats-checker" className="group">
            <Card className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 smooth-hover hover:border-black dark:hover:border-white hover:-translate-y-0.5 cursor-pointer h-full">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center justify-between text-sm group-hover:text-black dark:group-hover:text-white">
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    ATS Score Checker
                  </span>
                  <ArrowRight className="w-4 h-4 smooth-hover group-hover:translate-x-0.5" />
                </CardTitle>
                <CardDescription className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                  Check ATS compatibility
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/dashboard/cover-letter" className="group">
            <Card className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 smooth-hover hover:border-black dark:hover:border-white hover:-translate-y-0.5 cursor-pointer h-full">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center justify-between text-sm group-hover:text-black dark:group-hover:text-white">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Cover Letter Maker
                  </span>
                  <ArrowRight className="w-4 h-4 smooth-hover group-hover:translate-x-0.5" />
                </CardTitle>
                <CardDescription className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                  Create compelling cover letters
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/dashboard/activity" className="group">
            <Card className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 smooth-hover hover:border-black dark:hover:border-white hover:-translate-y-0.5 cursor-pointer h-full">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center justify-between text-sm group-hover:text-black dark:group-hover:text-white">
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Activity Log
                  </span>
                  <ArrowRight className="w-4 h-4 smooth-hover group-hover:translate-x-0.5" />
                </CardTitle>
                <CardDescription className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                  View your generation history
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
