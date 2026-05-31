"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FolderOpen, FileText, Upload, CheckCircle2, ArrowRight, Clock, Star } from "lucide-react"
import { DEMO_USER, DEMO_RESUME } from "@/lib/demo/data"
import Link from "next/link"

const SAVED_RESUMES = [
  {
    name: "Resume_Senior_v3.pdf",
    updated: "2 days ago",
    score: 82,
    size: "142 KB",
    isPrimary: true,
  },
  {
    name: "Resume_Startup_Focused.pdf",
    updated: "1 week ago",
    score: 74,
    size: "118 KB",
    isPrimary: false,
  },
  {
    name: "Resume_Backend_Specialist.pdf",
    updated: "2 weeks ago",
    score: 79,
    size: "131 KB",
    isPrimary: false,
  },
]

export default function DemoMemoryPage() {
  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in max-w-3xl">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-amber-100 dark:bg-amber-950/50 rounded-lg flex items-center justify-center">
            <FolderOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Resume Vault</h1>
          <Badge variant="secondary">Demo</Badge>
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-0 text-[10px] font-bold">NEW</Badge>
        </div>
        <p className="text-muted-foreground text-sm">
          Store multiple resume versions. Applyo remembers your data across all tools.
        </p>
      </div>

      {/* Profile memory */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Remembered Profile</CardTitle>
            <Badge variant="outline" className="text-xs">Auto-populated across all tools</Badge>
          </div>
          <CardDescription className="text-xs">
            Applyo pre-fills your resume and profile into every single tool automatically.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0">
              <span className="text-primary-foreground text-sm font-bold">{DEMO_USER.initials}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{DEMO_USER.name}</p>
              <p className="text-xs text-muted-foreground">{DEMO_USER.headline}</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Active
            </div>
          </div>
          <div className="space-y-2">
            {[
              "AI Resume Improver — pre-fills your resume",
              "Cover Letter Maker — knows your name, headline & job history",
              "ATS Checker — uses your latest resume automatically",
              "Job Finder — matches to your saved skills",
              "Email Maker — signs with your name & contact info",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Saved resumes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Saved Resumes</h2>
          <Badge variant="outline" className="text-xs">3 of 5 slots used (Free)</Badge>
        </div>
        {SAVED_RESUMES.map((resume, i) => (
          <Card key={i} className="border-border smooth-hover hover:border-primary/30">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-9 h-9 bg-orange-100 dark:bg-orange-950/50 rounded-lg flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground truncate">{resume.name}</p>
                  {resume.isPrimary && (
                    <span className="flex items-center gap-0.5 text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-semibold shrink-0">
                      <Star className="w-2.5 h-2.5" /> Primary
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />{resume.updated}
                  </span>
                  <span className="text-xs text-muted-foreground">{resume.size}</span>
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">ATS {resume.score}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center gap-2 opacity-60">
          <Upload className="w-6 h-6 text-muted-foreground" />
          <p className="text-xs text-muted-foreground font-medium">Upload a resume (PDF)</p>
          <p className="text-[11px] text-muted-foreground">Create an account to upload your real resume</p>
        </div>
      </div>

      {/* Resume preview */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-foreground">Active Resume Preview</h2>
        <Card className="border-border">
          <CardContent className="p-4">
            <pre className="text-xs text-muted-foreground font-sans whitespace-pre-wrap leading-relaxed line-clamp-10">
              {DEMO_RESUME}
            </pre>
          </CardContent>
        </Card>
      </div>

      <Link href="/auth/sign-up">
        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          Create account to upload your real resume <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  )
}
