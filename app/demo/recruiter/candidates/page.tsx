"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Search, Star, Mail, MapPin, Briefcase, CheckCircle2 } from "lucide-react"
import { DEMO_CANDIDATES } from "@/lib/demo/data"
import { toast } from "sonner"

export default function DemoRecruiterCandidates() {
  const [query, setQuery] = useState("")
  const [shortlisted, setShortlisted] = useState<Set<string>>(new Set(["c2"]))
  const [contacted, setContacted] = useState<Set<string>>(new Set(["c5"]))

  const filtered = DEMO_CANDIDATES.filter((c) =>
    `${c.name} ${c.headline} ${c.skills.join(" ")} ${c.location}`.toLowerCase().includes(query.toLowerCase()),
  )

  const toggleShortlist = (id: string, name: string) => {
    setShortlisted((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else { next.add(id); toast.success(`${name} shortlisted`) }
      return next
    })
  }

  const contact = (id: string, name: string) => {
    setContacted((prev) => new Set([...prev, id]))
    toast.success(`Intro request sent to ${name}`)
  }

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in max-w-5xl">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-sky-100 dark:bg-sky-950/50 rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Browse Candidates</h1>
          <Badge variant="secondary">Demo</Badge>
          <Badge className="bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400 border-0 text-[10px] font-bold">ENTERPRISE</Badge>
        </div>
        <p className="text-muted-foreground text-sm">Opted-in candidates from the Applyo talent pool, scored against your roles.</p>
      </div>

      <div className="relative max-w-md animate-slide-up">
        <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search skills, role, location…" className="pl-9 h-9 bg-muted border-border text-sm" />
      </div>

      <div className="space-y-3">
        {filtered.map((c) => {
          const isShort = shortlisted.has(c.id)
          const isContacted = contacted.has(c.id)
          return (
            <Card key={c.id} className="border-border smooth-hover hover:border-primary/30">
              <CardContent className="p-5">
                <div className="flex items-start gap-4 flex-wrap">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">{c.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-semibold text-foreground">{c.name}</h3>
                      {c.openToWork && <Badge variant="success" className="text-[10px]">Open to work</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{c.summary}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{c.headline} · {c.experience}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.location}</span>
                      <span className="font-medium text-foreground">{c.salary}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {c.skills.map((s) => <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>)}
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <Button size="sm" variant={isShort ? "default" : "outline"} onClick={() => toggleShortlist(c.id, c.name)} className={`h-7 text-xs gap-1.5 ${isShort ? "bg-amber-500 hover:bg-amber-500/90 text-white" : ""}`}>
                        <Star className={`w-3 h-3 ${isShort ? "fill-current" : ""}`} /> {isShort ? "Shortlisted" : "Shortlist"}
                      </Button>
                      {isContacted ? (
                        <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium"><CheckCircle2 className="w-3.5 h-3.5" /> Contacted</span>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => contact(c.id, c.name)} className="h-7 text-xs gap-1.5">
                          <Mail className="w-3 h-3" /> Contact
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0 space-y-1">
                    <Badge variant="success" className="text-sm font-bold px-3 py-1">{c.match}% match</Badge>
                    <p className="text-[10px] text-muted-foreground">ATS {c.atsScore}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
        {filtered.length === 0 && <p className="text-sm text-muted-foreground text-center py-10">No candidates match “{query}”.</p>}
      </div>
    </div>
  )
}
