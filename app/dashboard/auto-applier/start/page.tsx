"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Zap, AlertCircle, CheckCircle, X } from "lucide-react"

export default function StartAutoApplyPage() {
  const [targetUrl, setTargetUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error" | "applying">("idle")
  const [taskId, setTaskId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [isBrowserOpen, setIsBrowserOpen] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(600) // 10 minutes in seconds
  const [isApplying, setIsApplying] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (!isApplying || timeRemaining <= 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (timeRemaining <= 0 && isApplying) {
        handleStopApplying()
      }
      return
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsApplying(false)
          setIsBrowserOpen(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isApplying, timeRemaining])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartAutoApply = async () => {
    if (!targetUrl.trim()) {
      setError("Please enter a target URL")
      return
    }

    setIsLoading(true)
    setError(null)
    setStatus("applying")
    setIsApplying(true)
    setIsBrowserOpen(true)
    setTimeRemaining(600)

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
        setIsApplying(false)
        setIsBrowserOpen(false)
        return
      }

      setTaskId(data.taskId)
      setStatus("success")
      setTargetUrl("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setStatus("error")
      setIsApplying(false)
      setIsBrowserOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStopApplying = () => {
    setIsApplying(false)
    setIsBrowserOpen(false)
    setTimeRemaining(600)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  if (isBrowserOpen && isApplying) {
    return (
      <div className="h-screen flex flex-col bg-neutral-50 dark:bg-black">
        <div className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-black dark:text-white">Auto-Applying to Jobs</span>
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                timeRemaining > 60
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                  : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
              }`}
            >
              {formatTime(timeRemaining)}
            </span>
          </div>
          <button
            onClick={handleStopApplying}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-black dark:text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <iframe
            ref={iframeRef}
            src={`https://agent.steel.dev/?token=YOUR_STEEL_TOKEN&url=${encodeURIComponent(targetUrl)}&task=apply_jobs`}
            className="w-full h-full border-0"
            title="Steel.dev Browser"
            sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-scripts allow-forms allow-top-navigation"
          />
        </div>
      </div>
    )
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
                  <p className="text-xs text-green-600 dark:text-green-400">Status: Active</p>
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
            <p>2. Click Start Auto-Apply to open the browser</p>
            <p>3. You have 10 minutes to apply to jobs</p>
            <p>4. Use the Stop button to exit early</p>
            <p>5. Track all applications in your Activity Log</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
