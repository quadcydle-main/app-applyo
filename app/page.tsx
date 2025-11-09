"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12 border-b border-neutral-200 dark:border-neutral-800 animate-slide-down">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-black dark:bg-white rounded-md flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white dark:text-black" />
          </div>
          <span className="text-base font-semibold tracking-tight text-black dark:text-white">Applyo</span>
        </div>
        <Link href="/auth/login">
          <Button 
            variant="outline" 
            size="sm"
            className="h-8 text-sm border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 smooth-hover"
          >
            Login
          </Button>
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-6 py-16 md:px-12 text-center animate-fade-in">
        <div className="max-w-3xl space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-black dark:text-white animate-slide-up leading-tight">
            Your AI-Powered Job Application Assistant
          </h1>

          <p className="text-base md:text-lg text-neutral-500 dark:text-neutral-500 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Craft winning resumes, cover letters, and interview answers powered by advanced AI. Land your dream job with confidence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 py-8 border-y border-neutral-200 dark:border-neutral-800 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="space-y-2 smooth-hover hover:-translate-y-0.5">
              <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5 text-white dark:text-black" />
              </div>
              <h3 className="font-medium text-sm text-black dark:text-white">AI-Powered</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-500">Powered by Gemini for premium results</p>
            </div>
            <div className="space-y-2 smooth-hover hover:-translate-y-0.5">
              <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center mx-auto">
                <Zap className="w-5 h-5 text-white dark:text-black" />
              </div>
              <h3 className="font-medium text-sm text-black dark:text-white">Lightning Fast</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-500">Get results in seconds, not hours</p>
            </div>
            <div className="space-y-2 smooth-hover hover:-translate-y-0.5">
              <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center mx-auto">
                <Shield className="w-5 h-5 text-white dark:text-black" />
              </div>
              <h3 className="font-medium text-sm text-black dark:text-white">Secure & Private</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-500">Your data is encrypted and private</p>
            </div>
          </div>

          <Link href="/auth/login" className="inline-block mt-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Button 
              size="lg" 
              className="gap-2 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 smooth-hover h-10 px-6 text-sm"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
