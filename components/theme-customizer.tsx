"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { Palette, Check, Sun, Moon, Monitor } from "lucide-react"
import { THEME_PRESETS, DEFAULT_THEME, THEME_STORAGE_KEY, CUSTOM_HEX_KEY, applyCustomColor, clearCustomColor } from "@/lib/themes"

export function ThemeCustomizer() {
  const [open, setOpen] = useState(false)
  const [preset, setPreset] = useState(DEFAULT_THEME)
  const [customHex, setCustomHex] = useState("#7c3aed")
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
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
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center h-9 w-9 rounded-lg hover:bg-muted smooth-hover text-muted-foreground hover:text-foreground"
        title="Customize theme"
        aria-label="Customize theme"
      >
        <Palette className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-card border border-border rounded-xl shadow-xl animate-slide-down z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Palette className="w-3.5 h-3.5 text-primary" /> Customize
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Pick a color flavor & mode</p>
          </div>

          {/* Light / Dark / Auto */}
          {mounted && (
            <div className="p-3 border-b border-border">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Appearance</p>
              <div className="grid grid-cols-3 gap-1.5">
                {modes.map((m) => {
                  const active = theme === m.id
                  return (
                    <button
                      key={m.id}
                      onClick={() => setTheme(m.id)}
                      className={`flex flex-col items-center gap-1 py-2 rounded-lg border text-[11px] smooth-hover ${
                        active
                          ? "border-primary bg-primary/10 text-primary font-medium"
                          : "border-border text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <m.icon className="w-3.5 h-3.5" />
                      {m.label}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Color presets */}
          <div className="p-3">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Color Flavor</p>
            <div className="grid grid-cols-2 gap-1.5">
              {THEME_PRESETS.map((p) => {
                const active = preset === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => applyPreset(p.id)}
                    className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-left smooth-hover ${
                      active ? "border-primary bg-primary/5" : "border-border hover:bg-muted"
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full shrink-0 border border-black/10 flex items-center justify-center text-[10px]"
                      style={{ background: `linear-gradient(135deg, ${p.swatch[0]} 50%, ${p.swatch[1]} 50%)` }}
                    >
                      {active && <Check className="w-3 h-3 text-white drop-shadow" />}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-medium text-foreground leading-tight truncate">
                        {p.emoji} {p.name}
                      </span>
                      <span className="block text-[10px] text-muted-foreground leading-tight truncate">{p.description}</span>
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Custom */}
            <label className={`mt-2 flex items-center gap-2 px-2.5 py-2 rounded-lg border cursor-pointer smooth-hover ${preset === "custom" ? "border-primary bg-primary/5" : "border-border hover:bg-muted"}`}>
              <span className="w-5 h-5 rounded-full border border-black/10 shrink-0 flex items-center justify-center" style={{ background: customHex }}>
                {preset === "custom" && <Check className="w-3 h-3 text-white drop-shadow" />}
              </span>
              <span className="text-xs font-medium text-foreground flex-1">🎨 Custom color</span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase">{customHex}</span>
              <input type="color" value={customHex} onChange={(e) => applyCustom(e.target.value)} className="absolute opacity-0 w-0 h-0" aria-label="Custom color" />
            </label>
          </div>
        </div>
      )}
    </div>
  )
}
