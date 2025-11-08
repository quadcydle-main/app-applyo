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
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <Search className="w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search features..."
          className="bg-background border-border placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9 bg-primary">
          <AvatarFallback className="bg-primary text-background font-semibold">
            {user?.email?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
