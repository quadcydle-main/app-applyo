import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "Applyo — AI-Powered Job Application Assistant",
  description:
    "Land your dream job faster with AI. Resume improvement, ATS scoring, cover letters, interview prep, and automated job applications — all in one place.",
  keywords: ["job application", "AI resume", "ATS checker", "cover letter generator", "interview prep"],
  openGraph: {
    title: "Applyo — AI-Powered Job Application Assistant",
    description: "Land your dream job faster with AI.",
    type: "website",
  },
}

const themeScript = `(function(){try{var t=localStorage.getItem('applyo-theme')||'mocha';var d=document.documentElement;d.setAttribute('data-theme',t);if(t==='custom'){var h=localStorage.getItem('applyo-theme-custom'),f=localStorage.getItem('applyo-theme-customfg')||'#fff';if(h){var s=d.style;s.setProperty('--primary',h);s.setProperty('--primary-foreground',f);s.setProperty('--ring',h);s.setProperty('--sidebar-primary',h);s.setProperty('--sidebar-ring',h);s.setProperty('--secondary','color-mix(in srgb, '+h+' 16%, var(--background))');s.setProperty('--secondary-foreground',h);s.setProperty('--accent','color-mix(in srgb, '+h+' 14%, var(--background))');s.setProperty('--accent-foreground',h);s.setProperty('--sidebar-accent','color-mix(in srgb, '+h+' 14%, var(--background))');s.setProperty('--sidebar-accent-foreground',h);}}}catch(e){}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`} data-theme="mocha">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          {children}
          <Toaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
