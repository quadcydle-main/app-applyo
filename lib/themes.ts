export type ThemePreset = {
  id: string
  name: string
  emoji: string
  /** swatch [light, dark] primary hex for the picker preview */
  swatch: [string, string]
  description: string
}

export const THEME_PRESETS: ThemePreset[] = [
  { id: "caffeine",  name: "Caffeine",  emoji: "☕", swatch: ["#b45309", "#f59e0b"], description: "Warm espresso amber" },
  { id: "mocha",     name: "Mocha",     emoji: "🍫", swatch: ["#8a5a44", "#b08968"], description: "Smooth coffee brown" },
  { id: "catmeow",   name: "Cat Meow",  emoji: "🐱", swatch: ["#db2777", "#f472b6"], description: "Playful pink" },
  { id: "matcha",    name: "Matcha",    emoji: "🍵", swatch: ["#4d7c0f", "#84cc16"], description: "Fresh green tea" },
  { id: "blueberry", name: "Blueberry", emoji: "🫐", swatch: ["#2563eb", "#60a5fa"], description: "Cool berry blue" },
  { id: "grape",     name: "Grape",     emoji: "🍇", swatch: ["#7c3aed", "#a78bfa"], description: "Rich royal purple" },
  { id: "rose",      name: "Rose",      emoji: "🌹", swatch: ["#e11d48", "#fb7185"], description: "Bold rose red" },
  { id: "midnight",  name: "Midnight",  emoji: "🌊", swatch: ["#0e7490", "#22d3ee"], description: "Electric cyan" },
]

export const DEFAULT_THEME = "mocha"
export const THEME_STORAGE_KEY = "applyo-theme"
export const CUSTOM_HEX_KEY = "applyo-theme-custom"
export const CUSTOM_FG_KEY = "applyo-theme-customfg"

const CUSTOM_VARS = [
  "--primary", "--primary-foreground", "--ring",
  "--sidebar-primary", "--sidebar-ring",
  "--secondary", "--secondary-foreground",
  "--accent", "--accent-foreground",
  "--sidebar-accent", "--sidebar-accent-foreground",
]

/** Pick black/white text for contrast against a hex background. */
export function contrastFg(hex: string): string {
  const h = hex.replace("#", "")
  if (h.length < 6) return "#ffffff"
  const r = parseInt(h.slice(0, 2), 16) / 255
  const g = parseInt(h.slice(2, 4), 16) / 255
  const b = parseInt(h.slice(4, 6), 16) / 255
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return lum > 0.6 ? "#0c0a09" : "#ffffff"
}

/** Apply a custom accent color via inline CSS vars (works in light & dark). */
export function applyCustomColor(hex: string) {
  if (typeof document === "undefined") return
  const fg = contrastFg(hex)
  const s = document.documentElement.style
  s.setProperty("--primary", hex)
  s.setProperty("--primary-foreground", fg)
  s.setProperty("--ring", hex)
  s.setProperty("--sidebar-primary", hex)
  s.setProperty("--sidebar-ring", hex)
  s.setProperty("--secondary", `color-mix(in srgb, ${hex} 16%, var(--background))`)
  s.setProperty("--secondary-foreground", hex)
  s.setProperty("--accent", `color-mix(in srgb, ${hex} 14%, var(--background))`)
  s.setProperty("--accent-foreground", hex)
  s.setProperty("--sidebar-accent", `color-mix(in srgb, ${hex} 14%, var(--background))`)
  s.setProperty("--sidebar-accent-foreground", hex)
  document.documentElement.setAttribute("data-theme", "custom")
  try {
    localStorage.setItem(THEME_STORAGE_KEY, "custom")
    localStorage.setItem(CUSTOM_HEX_KEY, hex)
    localStorage.setItem(CUSTOM_FG_KEY, fg)
  } catch {}
}

/** Remove inline custom vars so a CSS [data-theme] preset can take over. */
export function clearCustomColor() {
  if (typeof document === "undefined") return
  const s = document.documentElement.style
  CUSTOM_VARS.forEach((v) => s.removeProperty(v))
}
