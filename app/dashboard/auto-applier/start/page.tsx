"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Zap, AlertCircle, CheckCircle, X, Globe, ExternalLink } from "lucide-react"

const JOB_PRESETS = [
  { name: "LinkedIn", url: "https://www.linkedin.com/jobs", icon: "💼" },
  { name: "Indeed", url: "https://www.indeed.com/jobs", icon: "🔍" },
  { name: "Monster", url: "https://www.monster.com", icon: "👹" },
  { name: "Glassdoor", url: "https://www.glassdoor.com/Jobs", icon: "🏢" },
  { name: "ZipRecruiter", url: "https://www.ziprecruiter.com", icon: "⚡" },
  { name: "AngelList", url: "https://angel.co/jobs", icon: "😇" },
]

export default function StartAutoApplyPage() {
  const [targetUrl, setTargetUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error" | "applying">("idle")
  const [taskId, setTaskId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [isBrowserOpen, setIsBrowserOpen] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(600)
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

  const handlePresetClick = async (presetUrl: string) => {
    setTargetUrl(presetUrl)
    setError(null)

    try {
      const fakeResponse = await fetch("https://httpbin.org/status/200", { method: "GET" })
      if (fakeResponse.ok) {
        console.log("[v0] Preset selected:", presetUrl)
      }
    } catch {
      // Silently fail for fake API
    }

    startApplying(presetUrl)
  }

  const startApplying = async (url: string) => {
    if (!url.trim()) {
      setError("Please enter a target URL or select a preset")
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
        body: JSON.stringify({ targetUrl: url.trim() }),
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setStatus("error")
      setIsApplying(false)
      setIsBrowserOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartAutoApply = () => {
    startApplying(targetUrl)
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
      <div className="h-screen flex flex-col bg-background">
        <div className="sticky top-0 z-50 flex items-center justify-between p-4 bg-card border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">Auto-Applying to Jobs</span>
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${timeRemaining > 60
                ? "bg-primary/10 text-primary"
                : "bg-destructive/10 text-destructive"
                }`}
            >
              {formatTime(timeRemaining)}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleStopApplying}
            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-hidden">
          <iframe
            ref={iframeRef}
            src={`https://agent.steel.dev/?token=ste-jzsZ8AbnF9WsXwwMJ9BKtEEkRprGBxwjIdC7hlW6v5ldWNxdIVEn3aue4VOWSokeLGAf9JNI25wLhYW0ssqgGIdFLeGEJ6mK958&url=${encodeURIComponent(targetUrl)}&task=apply_jobs`}
            className="w-full h-full border-0"
            title="applyo.app Browser Automation"
            sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-scripts allow-forms allow-top-navigation"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 animate-fade-in">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="animate-slide-up">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-950/50 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Start Auto-Apply</h1>
              <p className="text-sm text-muted-foreground">Automatically apply to jobs from a target website</p>
            </div>
          </div>
        </div>

        {/* Presets */}
        <Card className="bg-card border-border animate-slide-up" style={{ animationDelay: "0.05s" }}>
          <CardHeader className="pb-4">
            <CardTitle className="text-base text-foreground flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              Popular Job Sites
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Click to get started with a major hiring platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {JOB_PRESETS.map((preset) => (
                <button
                  key={preset.url}
                  onClick={() => handlePresetClick(preset.url)}
                  disabled={isLoading}
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-border bg-muted/50 hover:border-primary/30 hover:bg-primary/5 smooth-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-2xl">{preset.icon}</span>
                  <span className="text-xs font-medium text-foreground">{preset.name}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Custom URL */}
        <Card className="bg-card border-border animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="pb-4">
            <CardTitle className="text-base text-foreground flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-primary" />
              Or Enter Custom URL
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Enter the URL of any job site you want to auto-apply to
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="url" className="text-xs font-medium text-foreground mb-1.5 block">Target URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com/jobs"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                disabled={isLoading}
                className="h-10 text-sm bg-muted border-border focus:border-primary smooth-hover"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                <p className="text-xs text-destructive">{error}</p>
              </div>
            )}

            {status === "success" && taskId && (
              <div className="flex items-start gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-lg">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                <div className="space-y-0.5">
                  <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Auto-apply job queued</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">Task ID: {taskId}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">Status: Active</p>
                </div>
              </div>
            )}

            <Button
              onClick={handleStartAutoApply}
              disabled={isLoading}
              className="w-full h-10 text-sm bg-primary text-primary-foreground hover:bg-primary/90 smooth-hover font-medium"
            >
              {isLoading && <Spinner className="mr-2 w-3.5 h-3.5" />}
              {isLoading ? "Starting..." : "Start Auto-Apply"}
            </Button>
          </CardContent>
        </Card>

        {/* How it works */}
        <Card className="bg-primary/5 border-primary/15 animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-foreground">How it works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground">
            <p className="flex items-start gap-2"><span className="text-primary font-semibold">1.</span> Select a preset or enter a custom job site URL</p>
            <p className="flex items-start gap-2"><span className="text-primary font-semibold">2.</span> Click the button to open the Steel.dev browser</p>
            <p className="flex items-start gap-2"><span className="text-primary font-semibold">3.</span> You have 10 minutes to apply to jobs</p>
            <p className="flex items-start gap-2"><span className="text-primary font-semibold">4.</span> Use the Stop button (top right) to exit early</p>
            <p className="flex items-start gap-2"><span className="text-primary font-semibold">5.</span> Track all applications in your Activity Log</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
