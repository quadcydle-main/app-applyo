"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, Sun, Moon, Monitor, Check } from "lucide-react"
import { THEME_PRESETS, DEFAULT_THEME, THEME_STORAGE_KEY, CUSTOM_HEX_KEY, applyCustomColor, clearCustomColor } from "@/lib/themes"

export function AppearanceSettings({ delay = 0 }: { delay?: number }) {
  const [preset, setPreset] = useState(DEFAULT_THEME)
  const [customHex, setCustomHex] = useState("#7c3aed")
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const stored = (typeof window !== "undefined" && localStorage.getItem(THEME_STORAGE_KEY)) || DEFAULT_THEME
    setPreset(stored)
    try {
      const savedHex = localStorage.getItem(CUSTOM_HEX_KEY)
      if (savedHex) setCustomHex(savedHex)
    } catch {}
    document.documentElement.setAttribute("data-theme", stored)
  }, [])

  const applyPreset = (id: string) => {
    setPreset(id)
    clearCustomColor()
    document.documentElement.setAttribute("data-theme", id)
    try { localStorage.setItem(THEME_STORAGE_KEY, id) } catch {}
  }

  const applyCustom = (hex: string) => {
    setCustomHex(hex)
    setPreset("custom")
    applyCustomColor(hex)
  }

  const modes = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "system", label: "Auto", icon: Monitor },
  ]

  return (
    <Card className="bg-card border-border animate-slide-up" style={{ animationDelay: `${delay}s` }}>
      <CardHeader className="pb-4">
        <CardTitle className="text-base text-foreground flex items-center gap-2">
          <Palette className="w-4 h-4 text-primary" />
          Appearance
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Pick a color flavor and light/dark mode. Your choice is saved on this device.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Mode */}
        {mounted && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-foreground">Mode</p>
            <div className="grid grid-cols-3 gap-2 max-w-xs">
              {modes.map((m) => {
                const active = theme === m.id
                return (
                  <button
                    key={m.id}
                    onClick={() => setTheme(m.id)}
                    className={`flex flex-col items-center gap-1 py-2.5 rounded-lg border text-xs smooth-hover ${
                      active ? "border-primary bg-primary/10 text-primary font-medium" : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <m.icon className="w-4 h-4" />
                    {m.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Color flavor */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-foreground">Color Flavor</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {THEME_PRESETS.map((p) => {
              const active = preset === p.id
              return (
                <button
                  key={p.id}
                  onClick={() => applyPreset(p.id)}
                  className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl border smooth-hover ${
                    active ? "border-primary bg-primary/5" : "border-border hover:bg-muted"
                  }`}
                  title={p.description}
                >
                  <span
                    className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${p.swatch[0]} 50%, ${p.swatch[1]} 50%)` }}
                  >
                    {active && <Check className="w-4 h-4 text-white drop-shadow" />}
                  </span>
                  <span className="text-[11px] font-medium text-foreground leading-tight text-center">
                    {p.emoji} {p.name}
                  </span>
                </button>
              )
            })}
          </div>
          <p className="text-xs text-muted-foreground">{THEME_PRESETS.find((p) => p.id === preset)?.description}</p>
        </div>

        {/* Custom color */}
        <div className="space-y-2 pt-1 border-t border-border">
          <p className="text-xs font-medium text-foreground pt-2">Custom Color</p>
          <div className="flex items-center gap-3">
            <label className={`relative w-10 h-10 rounded-xl border-2 cursor-pointer overflow-hidden smooth-hover ${preset === "custom" ? "border-primary" : "border-border"}`} style={{ background: customHex }}>
              <input
                type="color"
                value={customHex}
                onChange={(e) => applyCustom(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer"
                aria-label="Pick a custom color"
              />
              {preset === "custom" && <Check className="w-4 h-4 text-white drop-shadow absolute inset-0 m-auto" />}
            </label>
            <div className="flex-1">
              <p className="text-xs text-foreground font-medium">Pick any color</p>
              <p className="text-[11px] text-muted-foreground">Use the swatch to choose your own accent — applied instantly.</p>
            </div>
            <span className="text-xs font-mono text-muted-foreground uppercase">{customHex}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
