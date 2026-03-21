"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronLeft, ChevronRight, Brain, Briefcase, User, LogOut, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { sidebarData } from "@/lib/utils/sidebar-data"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const iconMap = {
  Brain: <Brain className="w-4 h-4" />,
  Briefcase: <Briefcase className="w-4 h-4" />,
  User: <User className="w-4 h-4" />,
  Zap: <Zap className="w-4 h-4" />,
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
      className={`h-screen bg-card border-r border-border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
        isCollapsed ? "w-16" : "w-60"
      } animate-fade-in`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-bold text-base tracking-tight text-foreground">Applyo</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-muted smooth-hover"
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {sidebarData.map((group, groupIndex) => (
          <div key={group.id} className="animate-slide-up" style={{ animationDelay: `${groupIndex * 0.05}s` }}>
            <button
              onClick={() => toggleGroup(group.id)}
              className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isCollapsed ? "justify-center" : ""
              } ${
                expandedGroups.has(group.id)
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              title={isCollapsed ? group.title : ""}
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  {iconMap[group.icon as keyof typeof iconMap] ? (
                    <div className="w-4 h-4">{iconMap[group.icon as keyof typeof iconMap]}</div>
                  ) : (
                    <Brain className="w-4 h-4" />
                  )}
                </div>
                {!isCollapsed && <span className="text-sm font-medium">{group.title}</span>}
              </div>
              {!isCollapsed && (
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${expandedGroups.has(group.id) ? "rotate-180" : ""}`}
                />
              )}
            </button>

            {/* Children */}
            {expandedGroups.has(group.id) && !isCollapsed && (
              <div className="ml-3 space-y-0.5 mt-0.5 animate-slide-down">
                {group.children.map((child, childIndex) => {
                  const isActive = pathname === child.href
                  return (
                    <Link key={child.id} href={child.href}>
                      <button
                        className={`w-full text-left px-2.5 py-1.5 rounded-md text-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] animate-fade-in ${
                          isActive
                            ? "bg-secondary text-secondary-foreground font-medium border border-primary/20"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground hover:translate-x-0.5"
                        }`}
                        style={{ animationDelay: `${childIndex * 0.03}s` }}
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
      <div className="border-t border-border px-3 py-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full h-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 justify-start gap-2 smooth-hover text-sm"
        >
          <LogOut className="w-3.5 h-3.5" />
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </aside>
  )
}
