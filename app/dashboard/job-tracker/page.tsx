"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

export default function JobTrackerPage() {
  return (
    <div className="p-6 md:p-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-accent" />
          Job Tracker
        </h1>
        <p className="text-muted-foreground mt-2">Track your job applications</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>Feature under development</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is being developed. Check back soon!</p>
        </CardContent>
      </Card>
    </div>
  )
}
