"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12 md:py-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-foreground">Applyo</span>
        </div>
        <Link href="/auth/login">
          <Button variant="outline" size="sm">
            Login
          </Button>
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 py-20 md:px-12 text-center">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-balance bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Your AI-Powered Job Application Assistant
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            Craft winning resumes, cover letters, and interview answers powered by advanced AI. Land your dream job with
            confidence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 py-8 border-y border-border">
            <div className="space-y-2">
              <Sparkles className="w-8 h-8 text-primary mx-auto" />
              <h3 className="font-semibold text-foreground">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">Powered by Gemini for premium results</p>
            </div>
            <div className="space-y-2">
              <Zap className="w-8 h-8 text-accent mx-auto" />
              <h3 className="font-semibold text-foreground">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">Get results in seconds, not hours</p>
            </div>
            <div className="space-y-2">
              <Shield className="w-8 h-8 text-secondary mx-auto" />
              <h3 className="font-semibold text-foreground">Secure & Private</h3>
              <p className="text-sm text-muted-foreground">Your data is encrypted and private</p>
            </div>
          </div>

          <Link href="/auth/login" className="inline-block mt-8">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
