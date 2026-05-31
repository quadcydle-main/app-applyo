"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Sparkles, Copy, CheckCircle2, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { DEMO_USER } from "@/lib/demo/data"

const EMAIL_TYPES = [
  { value: "followup",    label: "Follow-up after interview" },
  { value: "cold",        label: "Cold outreach to recruiter" },
  { value: "thank_you",   label: "Thank-you email post-interview" },
  { value: "referral",    label: "Referral request" },
  { value: "status",      label: "Application status check" },
]

const DEMO_EMAILS: Record<string, string> = {
  followup: `Subject: Following Up — Senior Frontend Engineer Interview

Hi Sarah,

Thank you for taking the time to interview me for the Senior Frontend Engineer position at Acme Technologies. I really enjoyed our conversation about the team's approach to performance optimization and the exciting roadmap ahead.

I wanted to follow up on our discussion about the React architecture migration. I've been thinking about the approach you mentioned and I'd love to share a few ideas I have around incremental server-side rendering that could reduce time-to-interactive by roughly 30%.

I'm very enthusiastic about the opportunity to contribute to Acme's product — the scale and the engineering challenges are exactly what I've been looking for. Please let me know if there's anything else you need from my end.

Looking forward to hearing from you!

Best,
${DEMO_USER.name}
john.doe@example.com | linkedin.com/in/johndoe`,

  cold: `Subject: Senior Engineer Open to Opportunities — 6 YOE in React/Node.js

Hi [Recruiter Name],

I came across your profile on LinkedIn and noticed you specialize in placing senior engineering talent at growth-stage companies — right up my alley.

I'm ${DEMO_USER.name}, a Senior Software Engineer with 6+ years building scalable web applications. Most recently at TechCorp, I led a microservices migration that cut system latency by 45% and shipped a real-time analytics dashboard to 200K+ daily users.

I'm selectively open to new opportunities, particularly at companies where I can own impactful engineering decisions from day one. If you have any roles that might be a good fit, I'd love to connect for a quick call.

Best regards,
${DEMO_USER.name}`,

  thank_you: `Subject: Thank You — Senior Frontend Engineer Interview

Hi Sarah,

I wanted to send a quick thank-you for the wonderful interview experience today. Meeting the team and learning more about Acme's vision for the product really solidified my excitement about this opportunity.

I was particularly inspired by the conversation around accessibility standards and your commitment to building for all users. It aligns strongly with work I've championed in my current role.

Thank you again for your time and the thoughtful process. I look forward to the next steps!

Warmly,
${DEMO_USER.name}`,

  referral: `Subject: Would love your help — Referral at Acme Technologies

Hi [Name],

Hope you're doing well! I saw you work at Acme Technologies and I wanted to reach out. I've been following Acme's engineering blog for a while and I recently came across an opening for a Senior Frontend Engineer that looks like a fantastic fit.

I have 6 years of React/TypeScript experience and led several high-impact projects at TechCorp — I'd love to apply and would greatly appreciate a referral if you feel comfortable with that after seeing my profile.

No worries if it's not the right time — just thought I'd ask. Here's a link to my LinkedIn: linkedin.com/in/johndoe

Thanks so much!
${DEMO_USER.name}`,

  status: `Subject: Checking In — Senior Frontend Engineer Application

Hi [Hiring Manager],

I wanted to follow up on my application for the Senior Frontend Engineer role I submitted on [Date]. I remain very interested in the position and Acme's mission.

If there are any updates or if you need any additional information from me, I'd be happy to provide it. I'm flexible for interviews and can accommodate any timeline that works for your team.

Thank you for your consideration!

Best,
${DEMO_USER.name}`,
}

export default function DemoEmailMakerPage() {
  const [emailType, setEmailType] = useState("followup")
  const [context, setContext] = useState("Senior Frontend Engineer at Acme Technologies. Interviewed with Sarah Johnson (Engineering Manager) last Tuesday.")
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1800))
    setResult(DEMO_EMAILS[emailType] ?? DEMO_EMAILS.followup)
    setIsLoading(false)
    toast.success("Email drafted!")
  }

  const handleCopy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    toast.success("Copied to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in max-w-3xl">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-950/50 rounded-lg flex items-center justify-center">
            <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Email Maker</h1>
          <Badge variant="secondary">Demo</Badge>
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-0 text-[10px] font-bold">NEW</Badge>
        </div>
        <p className="text-muted-foreground text-sm">
          AI-crafted follow-up emails, cold outreach, and thank-you notes — perfectly professional.
        </p>
      </div>

      <Card className="border-border">
        <CardContent className="pt-4 pb-4 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Email Type</label>
            <Select value={emailType} onValueChange={setEmailType}>
              <SelectTrigger className="h-9 text-sm bg-muted border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EMAIL_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value} className="text-sm">{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Context (role, company, who you spoke with)</label>
            <Textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="text-sm bg-muted border-border resize-none min-h-[80px]"
              placeholder="e.g. Applied for Software Engineer at Google, spoke with Jane from HR..."
            />
          </div>
          <Button
            onClick={handleGenerate}
            disabled={isLoading}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? (
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 animate-spin" /> Drafting email...</span>
            ) : (
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> Generate Email</span>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Generated Email</h3>
            <Button size="sm" variant="outline" onClick={handleCopy} className="h-7 text-xs gap-1.5">
              {copied ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <Card className="border-border">
            <CardContent className="p-4">
              <pre className="text-sm text-foreground font-sans whitespace-pre-wrap leading-relaxed">{result}</pre>
            </CardContent>
          </Card>
          <Link href="/auth/sign-up">
            <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
              Sign up to use your real info <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
