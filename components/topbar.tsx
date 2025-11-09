"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Topbar() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    getUser()
  }, [supabase])

  return (
    <div className="h-14 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black flex items-center justify-between px-6 animate-slide-down">
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search features..."
            className="pl-9 h-9 bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 placeholder:text-neutral-400 text-sm focus:border-black dark:focus:border-white smooth-hover"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Avatar className="h-8 w-8 bg-black dark:bg-white smooth-hover hover:scale-105 cursor-pointer">
          <AvatarFallback className="bg-black dark:bg-white text-white dark:text-black text-xs font-semibold">
            {user?.email?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
