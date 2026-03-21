"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Check, Mail, Briefcase } from "lucide-react"

export default function ProfilePage() {
  const [fullName, setFullName] = useState("")
  const [headline, setHeadline] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      setEmail(user.email || "")

      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      if (data) {
        setFullName(data.full_name || "")
        setHeadline(data.headline || "")
      }
      setIsLoading(false)
    }

    fetchProfile()
  }, [supabase])

  const handleSave = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    setIsSaving(true)
    setSaveSuccess(false)
    const { error } = await supabase.from("profiles").upsert({ id: user.id, full_name: fullName, headline }).select()

    setIsSaving(false)
    if (!error) {
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-2xl animate-fade-in">
      <div className="animate-slide-up">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2 mb-1 tracking-tight">
          <User className="w-6 h-6 text-primary" />
          Profile
        </h1>
        <p className="text-muted-foreground text-sm">Manage your Applyo profile</p>
      </div>

      {/* Avatar Section */}
      <Card className="bg-card border-border animate-slide-up" style={{ animationDelay: "0.05s" }}>
        <CardContent className="p-6 flex items-center gap-5">
          <Avatar className="h-16 w-16 bg-primary">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
              {fullName ? fullName[0]?.toUpperCase() : email?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{fullName || "Your Name"}</h2>
            <p className="text-sm text-muted-foreground">{headline || "Add a professional headline"}</p>
            <p className="text-xs text-muted-foreground mt-1">{email}</p>
          </div>
        </CardContent>
      </Card>

      {/* Profile Form */}
      <Card className="bg-card border-border animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader className="pb-4">
          <CardTitle className="text-base text-foreground">Profile Information</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">Update your profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-10 bg-muted animate-pulse rounded-lg" />
              <div className="h-10 bg-muted animate-pulse rounded-lg" />
              <div className="h-10 bg-muted animate-pulse rounded-lg" />
            </div>
          ) : (
            <>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-medium text-foreground flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="h-10 text-sm bg-muted border-border text-muted-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fullName" className="text-xs font-medium text-foreground flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-muted-foreground" />
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="h-10 text-sm bg-muted border-border focus:border-primary smooth-hover"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="headline" className="text-xs font-medium text-foreground flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />
                  Professional Headline
                </Label>
                <Input
                  id="headline"
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g., Full-Stack Developer | React Specialist"
                  className="h-10 text-sm bg-muted border-border focus:border-primary smooth-hover"
                />
              </div>

              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full h-10 text-sm bg-primary text-primary-foreground hover:bg-primary/90 smooth-hover font-medium"
              >
                {saveSuccess ? (
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Saved Successfully
                  </span>
                ) : isSaving ? (
                  "Saving..."
                ) : (
                  "Save Changes"
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
