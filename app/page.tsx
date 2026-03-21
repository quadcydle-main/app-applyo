"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap, Shield, Brain, FileText, Target, Briefcase } from "lucide-react"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12 border-b border-border animate-slide-down">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">Applyo</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/auth/login">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 text-sm text-foreground hover:bg-muted smooth-hover"
            >
              Login
            </Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button
              size="sm"
              className="h-9 text-sm bg-primary text-primary-foreground hover:bg-primary/90 smooth-hover"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-20 md:py-28 md:px-12 text-center animate-fade-in">
        <div className="max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full text-sm font-medium animate-slide-down">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Job Application Assistant
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground animate-slide-up leading-[1.1]">
            Land Your Dream Job{" "}
            <span className="text-primary">Faster</span> with AI
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
            Craft winning resumes, cover letters, and ace your interviews. Powered by advanced AI to give you the competitive edge in your job search.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <Link href="/auth/sign-up">
              <Button
                size="lg"
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 smooth-hover h-12 px-8 text-base font-semibold shadow-lg shadow-primary/25"
              >
                Start Free <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 h-12 px-8 text-base border-border hover:bg-muted smooth-hover"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 md:px-12 bg-muted/50 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Why Choose Applyo?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to supercharge your job search, all in one place.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="bg-card border border-border rounded-xl p-6 space-y-3 smooth-hover hover:-translate-y-1 hover:shadow-lg hover:border-primary/30">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-950/50 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold text-foreground">AI-Powered</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Powered by Gemini AI for professional-quality resume improvements and cover letters.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 space-y-3 smooth-hover hover:-translate-y-1 hover:shadow-lg hover:border-primary/30">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950/50 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-semibold text-foreground">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Get results in seconds. Improve your resume, generate cover letters, and prep for interviews instantly.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 space-y-3 smooth-hover hover:-translate-y-1 hover:shadow-lg hover:border-primary/30">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/50 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-semibold text-foreground">Secure & Private</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Your data is encrypted and protected. We never share your personal information.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="px-6 py-16 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Powerful Tools at Your Fingertips</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">From resume optimization to automated job applications.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            {[
              { icon: Brain, label: "Resume Improver", desc: "Enhance with AI" },
              { icon: Target, label: "ATS Checker", desc: "Score your resume" },
              { icon: FileText, label: "Cover Letters", desc: "Generate instantly" },
              { icon: Briefcase, label: "Job Tracker", desc: "Track applications" },
            ].map((tool, i) => (
              <div
                key={tool.label}
                className="bg-card border border-border rounded-xl p-5 text-center space-y-2 smooth-hover hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="w-10 h-10 mx-auto bg-secondary rounded-lg flex items-center justify-center">
                  <tool.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium text-sm text-foreground">{tool.label}</h3>
                <p className="text-xs text-muted-foreground">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:px-12 bg-primary/5 border-t border-border">
        <div className="max-w-2xl mx-auto text-center space-y-6 animate-slide-up">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Ready to Level Up Your Job Search?</h2>
          <p className="text-muted-foreground">Join thousands of job seekers already using Applyo to land their dream roles.</p>
          <Link href="/auth/sign-up">
            <Button
              size="lg"
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 smooth-hover h-12 px-8 text-base font-semibold shadow-lg shadow-primary/25"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 md:px-12 border-t border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground">Applyo</span>
          </div>
          <p className="text-xs text-muted-foreground">Built with AI. Made for job seekers.</p>
        </div>
      </footer>
    </main>
  )
}
