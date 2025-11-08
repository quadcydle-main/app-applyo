"use client"

import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
  onClick: () => void
}

export function FeatureCard({ title, description, icon, onClick }: FeatureCardProps) {
  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="text-primary group-hover:scale-110 transition-transform">{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <Button onClick={onClick} className="w-full">
          Get Started
        </Button>
      </CardContent>
    </Card>
  )
}
