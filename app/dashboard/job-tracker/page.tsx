"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { BookOpen, Plus, Trash2 } from "lucide-react"
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

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-black dark:text-white flex items-center gap-2 mb-2">
          <BookOpen className="w-6 h-6" />
          Job Tracker
        </h1>
        <p className="text-neutral-500 text-sm">Track your job applications</p>
      </div>

      <Card className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-black dark:text-white">Add New Application</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Company</Label>
              <Input
                placeholder="Company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="mt-1.5 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Job Title</Label>
              <Input
                placeholder="Job title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="mt-1.5 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="mt-1.5 h-9 text-sm">
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
              <Label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Date</Label>
              <Input
                type="date"
                value={appliedDate}
                onChange={(e) => setAppliedDate(e.target.value)}
                className="mt-1.5 text-sm"
              />
            </div>
          </div>

          <Button onClick={addJob} disabled={isAdding} className="w-full h-9 text-sm">
            {isAdding && <Spinner className="mr-2 w-3.5 h-3.5" />}
            <Plus className="w-3 h-3 mr-1" />
            Add Application
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-black dark:text-white">Applications</CardTitle>
          <CardDescription className="text-xs text-neutral-500">{jobs.length} total applications</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <Spinner className="w-8 h-8 mx-auto mb-4" />
              <p className="text-sm text-neutral-600">Loading...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-8 text-neutral-400 text-sm">
              No applications yet. Add one to get started!
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="border border-neutral-200 dark:border-neutral-800 p-3 rounded flex justify-between items-start"
                >
                  <div>
                    <h4 className="text-sm font-medium text-black dark:text-white">{job.job_title}</h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">{job.company_name}</p>
                    <div className="flex gap-2 mt-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          job.status === "offer"
                            ? "bg-green-100 dark:bg-green-900/20 text-green-900 dark:text-green-100"
                            : job.status === "rejected"
                              ? "bg-red-100 dark:bg-red-900/20 text-red-900 dark:text-red-100"
                              : "bg-blue-100 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100"
                        }`}
                      >
                        {job.status}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {new Date(job.applied_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => deleteJob(job.id)} className="text-xs h-7">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
