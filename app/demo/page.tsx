"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Brain, Briefcase, FileText, Zap, ArrowRight, Target, BookOpen, Sparkles, BarChart3, Search, ClipboardList,
} from "lucide-react"
import { DEMO_STATS, DEMO_USER } from "@/lib/demo/data"

const quickLinks = [
  { href: "/demo/resume-improver", icon: Brain, label: "AI Resume Improver", desc: "Enhance with AI", color: "bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400" },
  { href: "/demo/ats-checker", icon: Target, label: "ATS Score Checker", desc: "Check ATS compatibility", color: "bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400" },
  { href: "/demo/cover-letter", icon: FileText, label: "Cover Letter Maker", desc: "Create compelling cover letters", color: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400" },
  { href: "/demo/interview-questions", icon: Brain, label: "Interview Prep", desc: "Generate practice questions", color: "bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400" },
  { href: "/demo/job-finder", icon: Search, label: "Job Finder", desc: "Discover matching opportunities", color: "bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400" },
  { href: "/demo/job-tracker", icon: ClipboardList, label: "Job Tracker", desc: "Track your applications", color: "bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400" },
  { href: "/demo/skill-gap-finder", icon: BarChart3, label: "Skill Gap Finder", desc: "Know what you're missing", color: "bg-teal-100 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400" },
  { href: "/demo/job-resume-compare", icon: BookOpen, label: "Job-Resume Compare", desc: "Match score analysis", color: "bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400" },
]

export default function DemoDashboardPage() {
  return (
    <div className="p-6 md:p-8 space-y-8 animate-fade-in">
      <div className="animate-slide-up">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1 tracking-tight">
          Welcome, {DEMO_USER.name} 👋
        </h1>
        <p className="text-muted-foreground text-sm">
          You&apos;re exploring Applyo in demo mode. Click any tool to see it in action.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <Card className="bg-card border-border smooth-hover hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Generated Items</CardTitle>
            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-950/50 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{DEMO_STATS.generatedItems}</div>
            <p className="text-xs text-muted-foreground mt-1">Total AI generations</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border smooth-hover hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Resumes Saved</CardTitle>
            <div className="w-8 h-8 bg-amber-100 dark:bg-amber-950/50 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{DEMO_STATS.resumes}</div>
            <p className="text-xs text-muted-foreground mt-1">Ready to use</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border smooth-hover hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Cover Letters</CardTitle>
            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-950/50 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{DEMO_STATS.coverLetters}</div>
            <p className="text-xs text-muted-foreground mt-1">Created</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="space-y-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-lg font-semibold text-foreground">Explore All Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className="group">
              <Card className="bg-card border-border smooth-hover hover:border-primary/30 hover:-translate-y-0.5 cursor-pointer h-full hover:shadow-md">
                <CardHeader className="p-4">
                  <CardTitle className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${link.color}`}>
                        <link.icon className="w-4 h-4" />
                      </div>
                      <span className="text-foreground">{link.label}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground smooth-hover group-hover:translate-x-0.5 group-hover:text-primary" />
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground ml-11">{link.desc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Sign up CTA */}
      <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-5 flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-sm mb-1">Ready to use your own resume?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Sign up free to use all tools with your actual resume, save results, and track your applications.
              </p>
              <Link
                href="/auth/sign-up"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                Create free account <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
