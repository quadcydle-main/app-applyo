"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Lock, ArrowRight } from "lucide-react"

export default function DemoAutoApplierPage() {
  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in max-w-2xl">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-950/50 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Auto-Applier</h1>
          <Badge variant="outline">Team Plan</Badge>
        </div>
        <p className="text-muted-foreground text-sm">Automatically apply to jobs using Steel.dev browser automation.</p>
      </div>

      <Card className="border-border bg-muted/30">
        <CardContent className="p-8 text-center space-y-4">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Available on Team Plan</h2>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
            The Auto-Applier uses Steel.dev to control a real browser and automatically submit applications to LinkedIn, Indeed, and more — on your behalf.
          </p>
          <div className="space-y-2 text-left max-w-xs mx-auto">
            {["LinkedIn Easy Apply", "Indeed Quick Apply", "Glassdoor, ZipRecruiter, AngelList", "Custom job board URLs", "10-minute automated sessions"].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-foreground">
                <Zap className="w-3.5 h-3.5 text-primary shrink-0" /> {f}
              </div>
            ))}
          </div>
          <Link href="/auth/sign-up">
            <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              Upgrade to Team Plan <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
