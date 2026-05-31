"use client"

import Link from "next/link"
import { Sparkles, X } from "lucide-react"

export function DemoBanner() {
  return (
    <div className="bg-primary text-primary-foreground px-4 py-2.5 flex items-center justify-between gap-4 text-sm z-50">
      <div className="flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 shrink-0" />
        <span className="font-medium">You&apos;re in Demo Mode</span>
        <span className="hidden sm:inline text-primary-foreground/80">
          — exploring as John Doe. Results are pre-computed examples.
        </span>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <Link
          href="/auth/sign-up"
          className="bg-primary-foreground text-primary px-3 py-1 rounded-md text-xs font-semibold hover:bg-primary-foreground/90 transition-colors"
        >
          Sign up free
        </Link>
        <Link
          href="/"
          className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          aria-label="Exit demo"
        >
          <X className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
