"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Settings, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DemoSettingsPage() {
  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in max-w-2xl">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
            <Settings className="w-4 h-4 text-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Settings</h1>
          <Badge variant="secondary">Demo</Badge>
        </div>
        <p className="text-muted-foreground text-sm">Settings are available after creating an account.</p>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-sm">Available Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 opacity-60 pointer-events-none">
          {["Theme (Light / Dark / System)", "Notification preferences", "Language", "Account & privacy"].map((s) => (
            <div key={s} className="h-10 px-3 bg-muted border border-border rounded-md flex items-center text-sm text-muted-foreground">
              {s}
            </div>
          ))}
        </CardContent>
      </Card>

      <Link href="/auth/sign-up">
        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          Create account to manage settings <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  )
}
