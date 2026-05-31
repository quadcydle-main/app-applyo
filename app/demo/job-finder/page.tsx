"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search, Sparkles, ArrowRight, MapPin, DollarSign, Briefcase,
  ExternalLink, BookmarkPlus, CheckCircle2,
} from "lucide-react"
import { DEMO_JOB_LISTINGS } from "@/lib/demo/data"
import Link from "next/link"
import { toast } from "sonner"

export default function DemoJobFinderPage() {
  const [jobTitle, setJobTitle] = useState("Senior Software Engineer")
  const [location, setLocation] = useState("Remote")
  const [result, setResult] = useState<typeof DEMO_JOB_LISTINGS | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [saved, setSaved] = useState<Set<number>>(new Set())
  const [applied, setApplied] = useState<Set<number>>(new Set())

  const handleSearch = async () => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setResult(DEMO_JOB_LISTINGS)
    setIsLoading(false)
    toast.success(`Found ${DEMO_JOB_LISTINGS.length} matching jobs!`)
  }

  const handleSave = (i: number) => {
    setSaved((prev) => new Set([...prev, i]))
    toast.success("Job saved to tracker!")
  }

  const handleApply = (i: number, company: string) => {
    setApplied((prev) => new Set([...prev, i]))
    toast.success(`Application started for ${company}! Sign up to track it.`)
  }

  const matchColor = (score: number) =>
    score >= 85 ? "success" : score >= 70 ? "warning" : "secondary"

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in max-w-4xl">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-950/50 rounded-lg flex items-center justify-center">
            <Search className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Job Finder</h1>
          <Badge variant="secondary">Demo</Badge>
        </div>
        <p className="text-muted-foreground text-sm">Discover jobs matched to your profile with AI-powered scoring.</p>
      </div>

      <Card className="border-border">
        <CardContent className="pt-4 pb-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Job Title / Keywords</label>
              <Input
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="h-9 text-sm bg-muted border-border"
                placeholder="e.g. Software Engineer"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Location</label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-9 text-sm bg-muted border-border"
                placeholder="e.g. Remote, New York"
              />
            </div>
          </div>
          <Button onClick={handleSearch} disabled={isLoading} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {isLoading ? (
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 animate-spin" /> Searching...</span>
            ) : (
              <span className="flex items-center gap-2"><Search className="w-4 h-4" /> Find Jobs</span>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-3 animate-fade-in">
          <p className="text-sm text-muted-foreground font-medium">{result.length} jobs found matching your profile</p>
          {result.map((job, i) => (
            <Card key={i} className="border-border smooth-hover hover:border-primary/30 hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 space-y-2 min-w-0">
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{job.salary}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.type}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {job.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-1">
                      {applied.has(i) ? (
                        <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Applied
                        </span>
                      ) : (
                        <Button
                          size="sm"
                          className="h-7 text-xs gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
                          onClick={() => handleApply(i, job.company)}
                        >
                          <ExternalLink className="w-3 h-3" /> Quick Apply
                        </Button>
                      )}
                      {saved.has(i) ? (
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                          <CheckCircle2 className="w-3 h-3" /> Saved
                        </span>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs gap-1.5"
                          onClick={() => handleSave(i)}
                        >
                          <BookmarkPlus className="w-3 h-3" /> Save
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <Badge variant={matchColor(job.match) as "success" | "warning" | "secondary"} className="text-sm font-bold px-3 py-1">
                      {job.match}% match
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Link href="/auth/sign-up">
            <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
              Sign up to search with your real resume <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
