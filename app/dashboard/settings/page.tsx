"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="p-6 md:p-12 space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Settings className="w-8 h-8 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-2">Manage your account settings</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your Applyo experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">Settings coming soon</p>
        </CardContent>
      </Card>
    </div>
  )
}
