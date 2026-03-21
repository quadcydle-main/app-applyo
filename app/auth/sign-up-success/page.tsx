"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Sparkles, Mail } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background animate-fade-in">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2.5 mb-8 animate-slide-down">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
            <Sparkles className="w-4.5 h-4.5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">Applyo</span>
        </div>

        <Card className="border-border bg-card shadow-xl shadow-primary/5 animate-slide-up">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 rounded-2xl flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">Account Created!</CardTitle>
            <CardDescription className="text-muted-foreground">Check your email to confirm your account</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-5">
            <div className="flex items-center gap-3 p-4 bg-muted rounded-xl border border-border">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <p className="text-sm text-muted-foreground text-left">
                We've sent a confirmation link to your email. Click it to verify your account and get started.
              </p>
            </div>
            <Link href="/auth/login">
              <Button className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 smooth-hover font-medium">
                Return to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
