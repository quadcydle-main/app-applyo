"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Briefcase } from "lucide-react"
import { ResumeUploader } from "@/components/resume-uploader"

export default function JobFinderPage() {
  const [resumeText, setResumeText] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [location, setLocation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!resumeText.trim()) {
      setError("Please provide your resume")
      return
    }
    if (!jobTitle.trim()) {
      setError("Please specify job title")
      return
    }

    const words = resumeText.trim().split(/\s+/).length
    if (words < 100) {
      setError(`Resume must be at least 100 words. Current: ${words} words`)
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/core/job-finder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobTitle, location }),
      })

      if (!response.ok) throw new Error("Failed to find jobs")
      const data = await response.json()
      setResult(data.result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-black dark:text-white flex items-center gap-2 mb-2">
          <Briefcase className="w-6 h-6" />
          Job Finder
        </h1>
        <p className="text-neutral-500 text-sm">Discover job opportunities matching your profile</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-black dark:text-white">Search Criteria</CardTitle>
            <CardDescription className="text-xs text-neutral-500">Find matching opportunities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ResumeUploader
              onSuccess={(text) => {
                setResumeText(text)
                setError(null)
              }}
              onError={(msg) => setError(msg)}
              disabled={isLoading}
            />

            <div>
              <Label htmlFor="title" className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                Job Title
              </Label>
              <Input
                id="title"
                placeholder="e.g., Frontend Developer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="mt-1.5 text-sm"
              />
            </div>

            <div>
              <Label htmlFor="location" className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                Location (Optional)
              </Label>
              <Input
                id="location"
                placeholder="e.g., Remote, New York, India"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1.5 text-sm"
              />
            </div>

            {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}

            <Button onClick={handleGenerate} disabled={isLoading} className="w-full h-9 text-sm">
              {isLoading && <Spinner className="mr-2 w-3.5 h-3.5" />}
              {isLoading ? "Searching..." : "Find Opportunities"}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-black dark:text-white">Job Matches</CardTitle>
            <CardDescription className="text-xs text-neutral-500">Opportunities for you</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <Spinner className="w-8 h-8 mx-auto mb-4" />
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Finding jobs...</p>
              </div>
            ) : !result ? (
              <div className="text-center py-12 text-neutral-400 text-sm">Results will appear here</div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {result.opportunities?.map((job: any, i: number) => (
                  <div key={i} className="border border-neutral-200 dark:border-neutral-800 p-3 rounded">
                    <h4 className="text-sm font-medium text-black dark:text-white">{job.title}</h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">{job.company}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">{job.location}</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">Match: {job.match_score}%</p>
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
