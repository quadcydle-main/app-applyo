"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { BookOpen, Plus, Trash2, Briefcase, Calendar } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"

export default function JobTrackerPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [companyName, setCompanyName] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [status, setStatus] = useState("applied")
  const [appliedDate, setAppliedDate] = useState(new Date().toISOString().split("T")[0])
  const [isAdding, setIsAdding] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  )

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from("job_applications")
        .select("*")
        .eq("user_id", user.id)
        .order("applied_date", { ascending: false })

      if (!error) setJobs(data || [])
    } catch (err) {
      console.error("Failed to load jobs")
    } finally {
      setIsLoading(false)
    }
  }

  const addJob = async () => {
    if (!companyName.trim() || !jobTitle.trim()) return

    setIsAdding(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from("job_applications")
        .insert([
          {
            user_id: user.id,
            company_name: companyName,
            job_title: jobTitle,
            status,
            applied_date: appliedDate,
          },
        ])
        .select()

      if (!error) {
        setJobs([data[0], ...jobs])
        setCompanyName("")
        setJobTitle("")
        setStatus("applied")
      }
    } catch (err) {
      console.error("Failed to add job")
    } finally {
      setIsAdding(false)
    }
  }

  const deleteJob = async (id: string) => {
    try {
      await supabase.from("job_applications").delete().eq("id", id)
      setJobs(jobs.filter((j) => j.id !== id))
    } catch (err) {
      console.error("Failed to delete job")
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "offer":
        return "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
      case "rejected":
        return "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
      case "interviewing":
        return "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
      default:
        return "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
    }
  }

  const statusCounts = {
    total: jobs.length,
    applied: jobs.filter(j => j.status === "applied").length,
    interviewing: jobs.filter(j => j.status === "interviewing").length,
    offer: jobs.filter(j => j.status === "offer").length,
    rejected: jobs.filter(j => j.status === "rejected").length,
  }

  return (
    <div className="p-6 md:p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="animate-slide-up">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950/50 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Job Tracker</h1>
              <p className="text-sm text-muted-foreground">Track your job applications</p>
            </div>
          </div>
        </div>

        {/* Status Summary */}
        {jobs.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-slide-up" style={{ animationDelay: "0.05s" }}>
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{statusCounts.applied}</div>
              <div className="text-[10px] text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wide">Applied</div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-amber-700 dark:text-amber-300">{statusCounts.interviewing}</div>
              <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium uppercase tracking-wide">Interviewing</div>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300">{statusCounts.offer}</div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium uppercase tracking-wide">Offers</div>
            </div>
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-red-700 dark:text-red-300">{statusCounts.rejected}</div>
              <div className="text-[10px] text-red-600 dark:text-red-400 font-medium uppercase tracking-wide">Rejected</div>
            </div>
          </div>
        )}

        {/* Add New Application */}
        <Card className="bg-card border-border animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="pb-4">
            <CardTitle className="text-base text-foreground flex items-center gap-2">
              <Plus className="w-4 h-4 text-primary" />
              Add New Application
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />
                  Company
                </Label>
                <Input
                  placeholder="Company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="h-10 text-sm bg-muted border-border focus:border-primary smooth-hover"
                />
              </div>
              <div>
                <Label className="text-xs font-medium text-foreground mb-1.5 block">Job Title</Label>
                <Input
                  placeholder="Job title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="h-10 text-sm bg-muted border-border focus:border-primary smooth-hover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-medium text-foreground mb-1.5 block">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="h-10 text-sm bg-muted border-border focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="interviewing">Interviewing</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                  Date
                </Label>
                <Input
                  type="date"
                  value={appliedDate}
                  onChange={(e) => setAppliedDate(e.target.value)}
                  className="h-10 text-sm bg-muted border-border focus:border-primary smooth-hover"
                />
              </div>
            </div>

            <Button
              onClick={addJob}
              disabled={isAdding || !companyName.trim() || !jobTitle.trim()}
              className="w-full h-10 text-sm bg-primary text-primary-foreground hover:bg-primary/90 smooth-hover font-medium"
            >
              {isAdding && <Spinner className="mr-2 w-3.5 h-3.5" />}
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Add Application
            </Button>
          </CardContent>
        </Card>

        {/* Applications List */}
        <Card className="bg-card border-border animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <CardHeader className="pb-4">
            <CardTitle className="text-base text-foreground flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              Applications
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">{jobs.length} total applications</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">
                <Spinner className="w-8 h-8 mx-auto mb-3 text-primary" />
                <p className="text-sm text-muted-foreground">Loading...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-14 h-14 mx-auto bg-muted rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1 text-sm">No Applications Yet</h3>
                  <p className="text-muted-foreground text-xs">Add your first application to get started!</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2 max-h-125 overflow-y-auto">
                {jobs.map((job, i) => (
                  <div
                    key={job.id}
                    className="border border-border bg-muted/50 p-4 rounded-xl flex justify-between items-start smooth-hover hover:border-primary/20 animate-fade-in"
                    style={{ animationDelay: `${i * 0.03}s` }}
                  >
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-medium text-foreground">{job.job_title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{job.company_name}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${getStatusStyle(job.status)}`}>
                          {job.status}
                        </span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5" />
                          {new Date(job.applied_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteJob(job.id)}
                      className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
