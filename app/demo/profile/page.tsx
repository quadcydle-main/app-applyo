"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, ArrowRight } from "lucide-react"
import { DEMO_USER } from "@/lib/demo/data"
import Link from "next/link"

export default function DemoProfilePage() {
  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in max-w-2xl">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Profile</h1>
          <Badge variant="secondary">Demo</Badge>
        </div>
        <p className="text-muted-foreground text-sm">This is John Doe&apos;s demo profile.</p>
      </div>

      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <span className="text-primary-foreground text-2xl font-bold">{DEMO_USER.initials}</span>
            </div>
            <div>
              <CardTitle className="text-lg">{DEMO_USER.name}</CardTitle>
              <CardDescription>{DEMO_USER.headline}</CardDescription>
              <p className="text-xs text-muted-foreground mt-1">{DEMO_USER.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3 opacity-60 pointer-events-none">
            {[
              { label: "Full Name", value: DEMO_USER.name },
              { label: "Professional Headline", value: DEMO_USER.headline },
              { label: "Email", value: DEMO_USER.email },
            ].map((field) => (
              <div key={field.label} className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">{field.label}</label>
                <div className="h-9 px-3 bg-muted border border-border rounded-md flex items-center text-sm text-foreground">
                  {field.value}
                </div>
              </div>
            ))}
          </div>
          <Link href="/auth/sign-up">
            <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              Create your own profile <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
