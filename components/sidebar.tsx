"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronLeft, ChevronRight, Brain, Briefcase, User, LogOut, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { sidebarData } from "@/lib/utils/sidebar-data"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const iconMap = {
  Brain: <Brain className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  User: <User className="w-5 h-5" />,
}

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(["core_intel", "account"]))
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const toggleGroup = (id: string) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedGroups(newExpanded)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <aside
      className={`h-screen bg-card border-r border-border transition-all duration-300 flex flex-col ${isCollapsed ? "w-20" : "w-64"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-bold text-foreground">Applyo</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-muted-foreground hover:text-foreground"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {sidebarData.map((group) => (
          <div key={group.id}>
            <button
              onClick={() => toggleGroup(group.id)}
              className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg transition-colors ${
                isCollapsed ? "justify-center" : ""
              } ${
                expandedGroups.has(group.id)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-border hover:text-foreground"
              }`}
              title={isCollapsed ? group.title : ""}
            >
              <div className="flex items-center gap-2">
                {iconMap[group.icon as keyof typeof iconMap] || <Brain className="w-5 h-5" />}
                {!isCollapsed && <span className="text-sm font-medium">{group.title}</span>}
              </div>
              {!isCollapsed && (
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${expandedGroups.has(group.id) ? "rotate-180" : ""}`}
                />
              )}
            </button>

            {/* Children */}
            {expandedGroups.has(group.id) && !isCollapsed && (
              <div className="ml-4 space-y-1 mt-2">
                {group.children.map((child) => {
                  const isActive = pathname === child.href
                  return (
                    <Link key={child.id} href={child.href}>
                      <button
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive
                            ? "bg-primary text-background font-medium"
                            : "text-muted-foreground hover:bg-border hover:text-foreground"
                        }`}
                      >
                        {child.title}
                      </button>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full text-muted-foreground hover:text-foreground justify-start gap-2"
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </aside>
  )
}
