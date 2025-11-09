"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { FileText, Copy, Check } from "lucide-react"

export default function CoverLetterPage() {
  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [tone, setTone] = useState("professional")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      setError("Please enter job description")
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/core/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: resumeText || undefined,
          jobDescription,
          tone,
        }),
      })

      if (!response.ok) throw new Error("Failed to generate cover letter")
      const data = await response.json()
      setResult(data.result.cover_letter)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in">
      <div className="animate-slide-up">
        <h1 className="text-2xl md:text-3xl font-semibold text-black dark:text-white flex items-center gap-2 mb-2 tracking-tight">
          <FileText className="w-6 h-6" />
          Cover Letter Maker
        </h1>
        <p className="text-neutral-500 dark:text-neutral-500 text-sm">
          Generate tailored cover letters with AI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 lg:h-fit animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-black dark:text-white">Create Cover Letter</CardTitle>
            <CardDescription className="text-xs text-neutral-500 dark:text-neutral-500">
              Provide your resume and job details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="resume" className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                Resume (Optional)
              </Label>
              <Textarea
                id="resume"
                placeholder="Paste your resume to personalize the letter..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="mt-1.5 min-h-32 text-sm bg-neutral-50 dark:bg-black border-neutral-200 dark:border-neutral-800 resize-none focus:border-black dark:focus:border-white smooth-hover"
              />
            </div>

            <div>
              <Label htmlFor="jd" className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                Job Description
              </Label>
              <Textarea
                id="jd"
                placeholder="Paste the job description..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="mt-1.5 min-h-32 text-sm bg-neutral-50 dark:bg-black border-neutral-200 dark:border-neutral-800 resize-none focus:border-black dark:focus:border-white smooth-hover"
              />
            </div>

            <div>
              <Label htmlFor="tone" className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                Tone
              </Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="mt-1.5 h-9 text-sm bg-neutral-50 dark:bg-black border-neutral-200 dark:border-neutral-800 focus:border-black dark:focus:border-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-xs text-neutral-500 dark:text-neutral-500">{error}</p>}

            <Button 
              onClick={handleGenerate} 
              disabled={isLoading} 
              className="w-full h-9 text-sm bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 smooth-hover"
            >
              {isLoading && <Spinner className="mr-2 w-3.5 h-3.5" />}
              {isLoading ? "Generating..." : "Generate Cover Letter"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base text-black dark:text-white">Your Cover Letter</CardTitle>
                <CardDescription className="text-xs text-neutral-500 dark:text-neutral-500 mt-0.5">
                  Ready to customize and send
                </CardDescription>
              </div>
              {result && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleCopy} 
                  className="gap-1.5 h-7 text-xs border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 smooth-hover"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!result ? (
              <div className="text-center py-12 text-neutral-400 dark:text-neutral-600 text-sm">
                Generate a cover letter to see results
              </div>
            ) : (
              <div className="bg-neutral-50 dark:bg-black p-4 rounded-lg max-h-[500px] overflow-y-auto border border-neutral-200 dark:border-neutral-800 animate-fade-in">
                <p className="text-xs text-black dark:text-white whitespace-pre-wrap leading-relaxed">
                  {result}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
