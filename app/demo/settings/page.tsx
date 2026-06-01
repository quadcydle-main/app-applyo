"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AppearanceSettings } from "@/components/appearance-settings"
import { Settings, Bell, Globe, Shield, Mail, ArrowRight } from "lucide-react"
import { DEMO_USER } from "@/lib/demo/data"
import Link from "next/link"
import { toast } from "sonner"

type Toggles = { productNews: boolean; jobAlerts: boolean; weeklyDigest: boolean; securityAlerts: boolean }

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-6 rounded-full transition-colors shrink-0 ${checked ? "bg-primary" : "bg-muted-foreground/30"}`}
      role="switch"
      aria-checked={checked}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-4" : ""}`} />
    </button>
  )
}

export default function DemoSettingsPage() {
  const [language, setLanguage] = useState("en")
  const [toggles, setToggles] = useState<Toggles>({ productNews: true, jobAlerts: true, weeklyDigest: false, securityAlerts: true })

  const notifRows: { key: keyof Toggles; label: string; desc: string }[] = [
    { key: "productNews", label: "Product news & updates", desc: "New features and improvements" },
    { key: "jobAlerts", label: "Job match alerts", desc: "When new matching jobs are found" },
    { key: "weeklyDigest", label: "Weekly digest", desc: "A summary of your activity each week" },
    { key: "securityAlerts", label: "Security alerts", desc: "Important account & login notices" },
  ]

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-2xl animate-fade-in">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2 tracking-tight">
            <Settings className="w-6 h-6 text-primary" />
            Settings
          </h1>
          <Badge variant="secondary">Demo</Badge>
        </div>
        <p className="text-muted-foreground text-sm">
          Appearance works for real here — try the color flavors! Other settings are saved once you create an account.
        </p>
      </div>

      {/* Appearance — fully functional in demo too */}
      <AppearanceSettings delay={0.05} />

      {/* Notifications */}
      <Card className="bg-card border-border animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader className="pb-4">
          <CardTitle className="text-base text-foreground flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            Notifications
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">Control what you get emailed about</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {notifRows.map((row) => (
            <div key={row.key} className="flex items-center justify-between gap-4 py-1">
              <div>
                <p className="text-sm text-foreground font-medium">{row.label}</p>
                <p className="text-xs text-muted-foreground">{row.desc}</p>
              </div>
              <Toggle checked={toggles[row.key]} onChange={(v) => setToggles((t) => ({ ...t, [row.key]: v }))} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Language */}
      <Card className="bg-card border-border animate-slide-up" style={{ animationDelay: "0.15s" }}>
        <CardHeader className="pb-4">
          <CardTitle className="text-base text-foreground flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            Language & Region
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">Set your preferred language</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5 max-w-xs">
            <Label className="text-xs font-medium text-foreground">Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="h-10 text-sm bg-muted border-border focus:border-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => toast.info("Sign up to save your preferences")} className="h-9 text-sm bg-primary text-primary-foreground hover:bg-primary/90">
            Save preferences
          </Button>
        </CardContent>
      </Card>

      {/* Account */}
      <Card className="bg-card border-border animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <CardHeader className="pb-4">
          <CardTitle className="text-base text-foreground flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            Account
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">Demo account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-foreground">Email</Label>
            <Input value={DEMO_USER.email} disabled className="h-10 text-sm bg-muted border-border opacity-80" />
          </div>
          <Link href="/auth/sign-up">
            <Button className="h-9 text-sm bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              Create your account <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card className="bg-card border-border animate-slide-up" style={{ animationDelay: "0.25s" }}>
        <CardHeader className="pb-4">
          <CardTitle className="text-base text-foreground flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            Privacy & Security
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">How your data is handled</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted rounded-xl border border-border">
            <p className="text-sm text-foreground font-medium mb-1">Your data is secure</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All data is stored in Supabase with row-level security and encrypted in transit and at rest. We never sell or share your information.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
