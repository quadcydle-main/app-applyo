"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Building2, Globe, MapPin, Briefcase, Sparkles } from "lucide-react"
import { DEMO_RECRUITER } from "@/lib/demo/data"
import { toast } from "sonner"

export default function DemoRecruiterPortfolio() {
  const [company, setCompany] = useState(DEMO_RECRUITER.company)
  const [website, setWebsite] = useState(DEMO_RECRUITER.website)
  const [about, setAbout] = useState(DEMO_RECRUITER.about)

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in max-w-2xl">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-sky-100 dark:bg-sky-950/50 rounded-lg flex items-center justify-center">
            <Building2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Recruiter Portfolio</h1>
          <Badge variant="secondary">Demo</Badge>
          <Badge className="bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400 border-0 text-[10px] font-bold">ENTERPRISE</Badge>
        </div>
        <p className="text-muted-foreground text-sm">This is what candidates see when you reach out. Keep it sharp.</p>
      </div>

      {/* Recruiter identity */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-lg font-bold">{DEMO_RECRUITER.initials}</span>
            </div>
            <div>
              <CardTitle className="text-base">{DEMO_RECRUITER.name}</CardTitle>
              <CardDescription>{DEMO_RECRUITER.title} · {DEMO_RECRUITER.company}</CardDescription>
              <p className="text-xs text-muted-foreground mt-0.5">{DEMO_RECRUITER.email}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Editable company info */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2"><Building2 className="w-4 h-4 text-primary" /> Company Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Company</label>
              <Input value={company} onChange={(e) => setCompany(e.target.value)} className="h-9 text-sm bg-muted border-border" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground flex items-center gap-1"><Globe className="w-3 h-3" /> Careers URL</label>
              <Input value={website} onChange={(e) => setWebsite(e.target.value)} className="h-9 text-sm bg-muted border-border" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">About</label>
            <Textarea value={about} onChange={(e) => setAbout(e.target.value)} className="text-sm bg-muted border-border resize-none min-h-[90px]" />
          </div>
          <Button size="sm" onClick={() => toast.info("Sign up for Enterprise to save your recruiter portfolio")} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
            <Sparkles className="w-3.5 h-3.5" /> Save portfolio
          </Button>
        </CardContent>
      </Card>

      {/* Roles & locations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Card className="border-border">
          <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Briefcase className="w-4 h-4 text-primary" /> Hiring For</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-1.5">
            {DEMO_RECRUITER.hiringFor.map((r) => <Badge key={r} variant="outline" className="text-xs">{r}</Badge>)}
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Locations</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-1.5">
            {DEMO_RECRUITER.locations.map((l) => <Badge key={l} variant="outline" className="text-xs">{l}</Badge>)}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
