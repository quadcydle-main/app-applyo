"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AppearanceSettings } from "@/components/appearance-settings"
import { Settings, Bell, Globe, Shield, Mail, KeyRound, LogOut, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type Toggles = { productNews: boolean; jobAlerts: boolean; weeklyDigest: boolean; securityAlerts: boolean }
const DEFAULT_TOGGLES: Toggles = { productNews: true, jobAlerts: true, weeklyDigest: false, securityAlerts: true }
const NOTIF_KEY = "applyo-notif-prefs"
const LANG_KEY = "applyo-language"

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

export default function SettingsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [language, setLanguage] = useState("en")
  const [toggles, setToggles] = useState<Toggles>(DEFAULT_TOGGLES)
  const [savingNotif, setSavingNotif] = useState(false)
  const [sendingReset, setSendingReset] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email || ""))
    try {
      const n = localStorage.getItem(NOTIF_KEY)
      if (n) setToggles({ ...DEFAULT_TOGGLES, ...JSON.parse(n) })
      const l = localStorage.getItem(LANG_KEY)
      if (l) setLanguage(l)
    } catch {}
  }, [])

  const saveNotifications = async () => {
    setSavingNotif(true)
    try {
      localStorage.setItem(NOTIF_KEY, JSON.stringify(toggles))
      localStorage.setItem(LANG_KEY, language)
      await new Promise((r) => setTimeout(r, 400))
      toast.success("Preferences saved")
    } finally {
      setSavingNotif(false)
    }
  }

  const sendPasswordReset = async () => {
    if (!email) return
    setSendingReset(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/login`,
    })
    setSendingReset(false)
    if (error) toast.error(error.message)
    else toast.success("Password reset link sent to your email")
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      const res = await fetch("/api/account/delete", { method: "POST" })
      if (!res.ok) throw new Error((await res.json()).error || "Failed")
      toast.success("Account deleted")
      router.push("/")
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not delete account")
      setDeleting(false)
    }
  }

  const notifRows: { key: keyof Toggles; label: string; desc: string }[] = [
    { key: "productNews", label: "Product news & updates", desc: "New features and improvements" },
    { key: "jobAlerts", label: "Job match alerts", desc: "When new matching jobs are found" },
    { key: "weeklyDigest", label: "Weekly digest", desc: "A summary of your activity each week" },
    { key: "securityAlerts", label: "Security alerts", desc: "Important account & login notices" },
  ]

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-2xl animate-fade-in">
      <div className="animate-slide-up">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2 mb-1 tracking-tight">
          <Settings className="w-6 h-6 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground text-sm">Manage your account settings and preferences</p>
      </div>

      {/* Appearance (real, working) */}
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
          <Button onClick={saveNotifications} disabled={savingNotif} className="h-9 text-sm bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
            {savingNotif ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving</> : "Save preferences"}
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
          <CardDescription className="text-xs text-muted-foreground">Your login and security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-foreground">Email</Label>
            <Input value={email} disabled className="h-10 text-sm bg-muted border-border opacity-80" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={sendPasswordReset} disabled={sendingReset || !email} variant="outline" className="h-9 text-sm gap-2">
              {sendingReset ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <KeyRound className="w-3.5 h-3.5" />}
              Reset password
            </Button>
            <Button onClick={handleSignOut} variant="outline" className="h-9 text-sm gap-2">
              <LogOut className="w-3.5 h-3.5" /> Sign out
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & danger */}
      <Card className="bg-card border-border animate-slide-up" style={{ animationDelay: "0.25s" }}>
        <CardHeader className="pb-4">
          <CardTitle className="text-base text-foreground flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            Privacy & Security
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">Manage your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-xl border border-border">
            <p className="text-sm text-foreground font-medium mb-1">Your data is secure</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All data is stored in Supabase with row-level security and encrypted in transit and at rest. We never sell or share your information.
            </p>
          </div>

          {!confirmDelete ? (
            <Button
              variant="outline"
              onClick={() => setConfirmDelete(true)}
              className="w-full h-10 text-sm border-destructive/30 text-destructive hover:bg-destructive/10 smooth-hover"
            >
              Delete Account
            </Button>
          ) : (
            <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/5 space-y-3">
              <p className="text-sm font-medium text-destructive">This permanently deletes your account and all data. This cannot be undone.</p>
              <div className="flex gap-2">
                <Button onClick={handleDelete} disabled={deleting} className="h-9 text-sm bg-destructive text-destructive-foreground hover:bg-destructive/90 gap-2">
                  {deleting ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Deleting</> : "Yes, delete everything"}
                </Button>
                <Button onClick={() => setConfirmDelete(false)} variant="outline" className="h-9 text-sm">Cancel</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
