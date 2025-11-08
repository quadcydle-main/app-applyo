"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap } from "lucide-react"

export default function SkillGapFinderPage() {
  return (
    <div className="p-6 md:p-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Zap className="w-8 h-8 text-accent" />
          Skill Gap Finder
        </h1>
        <p className="text-muted-foreground mt-2">Identify skills you need to develop</p>
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
