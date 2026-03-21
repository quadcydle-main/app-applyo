"use client"

import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
  onClick: () => void
}

export function FeatureCard({ title, description, icon, onClick }: FeatureCardProps) {
  return (
    <Card className="bg-card border-border smooth-hover hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-base text-foreground">{title}</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">{description}</CardDescription>
          </div>
          <div className="text-primary group-hover:scale-110 smooth-hover">{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          onClick={onClick}
          className="w-full h-9 text-sm bg-primary text-primary-foreground hover:bg-primary/90 smooth-hover font-medium gap-2"
        >
          Get Started <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </CardContent>
    </Card>
  )
}
