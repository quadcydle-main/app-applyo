"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"

export default function JobValidityPage() {
  return (
    <div className="p-6 md:p-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Shield className="w-8 h-8 text-secondary" />
          Job Listing Validity Checker
        </h1>
        <p className="text-muted-foreground mt-2">Verify job listings are legitimate</p>
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
