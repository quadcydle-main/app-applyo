"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Sparkles } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push("/dashboard")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white dark:bg-black animate-fade-in">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8 animate-slide-down">
          <div className="w-7 h-7 bg-black dark:bg-white rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white dark:text-black" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-black dark:text-white">Applyo</span>
        </div>

        <Card className="border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 animate-slide-up">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-black dark:text-white">Welcome Back</CardTitle>
            <CardDescription className="text-sm text-neutral-500 dark:text-neutral-500">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="email" className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-9 text-sm bg-neutral-50 dark:bg-black border-neutral-200 dark:border-neutral-800 focus:border-black dark:focus:border-white smooth-hover"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="password" className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-9 text-sm bg-neutral-50 dark:bg-black border-neutral-200 dark:border-neutral-800 focus:border-black dark:focus:border-white smooth-hover"
                  />
                </div>
                {error && <p className="text-xs text-neutral-500 dark:text-neutral-500">{error}</p>}
                <Button 
                  type="submit" 
                  className="w-full h-9 text-sm bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 smooth-hover" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </div>
              <div className="mt-4 text-center text-xs text-neutral-500 dark:text-neutral-500">
                Don't have an account?{" "}
                <Link href="/auth/sign-up" className="text-black dark:text-white hover:underline font-medium">
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
