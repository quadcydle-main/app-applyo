"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Zap, AlertCircle, CheckCircle } from "lucide-react"

export default function StartAutoApplyPage() {
  const [targetUrl, setTargetUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [taskId, setTaskId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleStartAutoApply = async () => {
    if (!targetUrl.trim()) {
      setError("Please enter a target URL")
      return
    }

    setIsLoading(true)
    setError(null)
    setStatus("idle")

    try {
      const response = await fetch("/api/auto/apply/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUrl: targetUrl.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Failed to start auto-apply")
        setStatus("error")
        return
      }

      setTaskId(data.taskId)
      setStatus("success")
      setTargetUrl("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setStatus("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in">
      <div className="animate-slide-up">
        <h1 className="text-2xl md:text-3xl font-semibold text-black dark:text-white flex items-center gap-2 mb-2 tracking-tight">
          <Zap className="w-6 h-6" />
          Start Auto-Apply
        </h1>
        <p className="text-neutral-500 dark:text-neutral-500 text-sm">
          Automatically apply to jobs from a target website
        </p>
      </div>

      <div className="max-w-2xl">
        <Card className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 animate-slide-up">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-black dark:text-white">Target Job Listing</CardTitle>
            <CardDescription className="text-xs text-neutral-500 dark:text-neutral-500">
              Enter the URL of the job site you want to auto-apply to
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="url" className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                Target URL
              </Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com/jobs"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                disabled={isLoading}
                className="mt-1.5 h-9 text-sm bg-neutral-50 dark:bg-black border-neutral-200 dark:border-neutral-800 focus:border-black dark:focus:border-white"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {status === "success" && taskId && (
              <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-xs font-medium text-green-600 dark:text-green-400">Auto-apply job queued</p>
                  <p className="text-xs text-green-600 dark:text-green-400">Task ID: {taskId}</p>
                  <p className="text-xs text-green-600 dark:text-green-400">Status: Queued</p>
                </div>
              </div>
            )}

            <Button
              onClick={handleStartAutoApply}
              disabled={isLoading}
              className="w-full h-9 text-sm bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 smooth-hover"
            >
              {isLoading && <Spinner className="mr-2 w-3.5 h-3.5" />}
              {isLoading ? "Starting..." : "Start Auto-Apply"}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 animate-slide-up mt-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-black dark:text-white">How it works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
            <p>1. Enter the target job listing URL</p>
            <p>2. The system will queue the auto-apply task</p>
            <p>3. Applications are processed automatically</p>
            <p>4. Track progress in your Activity Log</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
