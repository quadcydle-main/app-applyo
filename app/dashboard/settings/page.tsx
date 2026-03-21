"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Palette, Bell, Globe, Shield } from "lucide-react"

export default function SettingsPage() {
  const [theme, setTheme] = useState("system")
  const [language, setLanguage] = useState("en")
  const [notifications, setNotifications] = useState("all")

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-2xl animate-fade-in">
      <div className="animate-slide-up">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2 mb-1 tracking-tight">
          <Settings className="w-6 h-6 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground text-sm">Manage your account settings and preferences</p>
      </div>

      {/* Appearance */}
      <Card className="bg-card border-border animate-slide-up" style={{ animationDelay: "0.05s" }}>
        <CardHeader className="pb-4">
          <CardTitle className="text-base text-foreground flex items-center gap-2">
            <Palette className="w-4 h-4 text-primary" />
            Appearance
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">Customize how Applyo looks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-foreground">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="h-10 text-sm bg-muted border-border focus:border-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System Default</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Choose your preferred color scheme</p>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="bg-card border-border animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader className="pb-4">
          <CardTitle className="text-base text-foreground flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            Notifications
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">Control what you get notified about</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-foreground">Email Notifications</Label>
            <Select value={notifications} onValueChange={setNotifications}>
              <SelectTrigger className="h-10 text-sm bg-muted border-border focus:border-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Notifications</SelectItem>
                <SelectItem value="important">Important Only</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Choose which email notifications you receive</p>
          </div>
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
          <div className="space-y-1.5">
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
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card className="bg-card border-border animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <CardHeader className="pb-4">
          <CardTitle className="text-base text-foreground flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            Privacy & Security
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">Manage your data and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-xl border border-border">
            <p className="text-sm text-foreground font-medium mb-1">Your data is secure</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All data is encrypted in transit and at rest. Your resumes and personal information are never shared with third parties.
            </p>
          </div>
          <Button
            variant="outline"
            className="w-full h-10 text-sm border-destructive/30 text-destructive hover:bg-destructive/10 smooth-hover"
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
