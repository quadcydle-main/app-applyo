"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "lucide-react"

export default function ProfilePage() {
  const [fullName, setFullName] = useState("")
  const [headline, setHeadline] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
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
    const { error } = await supabase.from("profiles").upsert({ id: user.id, full_name: fullName, headline }).select()

    setIsSaving(false)
    if (!error) {
      // Show success feedback (optional)
    }
  }

  return (
    <div className="p-6 md:p-12 space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <User className="w-8 h-8 text-primary" />
          Profile
        </h1>
        <p className="text-muted-foreground mt-2">Manage your Applyo profile</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : (
            <>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="mt-2 bg-background border-border text-muted-foreground"
                />
              </div>

              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="mt-2 bg-background border-border"
                />
              </div>

              <div>
                <Label htmlFor="headline">Professional Headline</Label>
                <Input
                  id="headline"
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g., Full-Stack Developer | React Specialist"
                  className="mt-2 bg-background border-border"
                />
              </div>

              <Button onClick={handleSave} disabled={isSaving} className="w-full">
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
