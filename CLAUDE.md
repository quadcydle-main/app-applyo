# app-applyo — Applyo Main Application

## What this is

The primary production application for **Applyo** — an AI-powered job application assistant. This is a full-featured Next.js app (v16, React 19) with Supabase auth/database and Gemini AI integration.

The companion project `applyo.app/` is an earlier prototype with a fancier landing page but far fewer features. This is the one to develop.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Auth + DB | Supabase (SSR, RLS) |
| AI | Google Gemini 2.0 Flash (`gemini-2.0-flash-exp`) |
| PDF Parsing | `pdf-parse`, `pdfjs-dist` |
| Package Manager | pnpm |

---

## Project Structure

```
app-applyo/
├── app/
│   ├── page.tsx                    # Landing page (public)
│   ├── layout.tsx                  # Root layout + ThemeProvider
│   ├── globals.css                 # Global styles + animations
│   ├── auth/
│   │   ├── login/page.tsx          # Email/password login
│   │   ├── sign-up/page.tsx        # Registration
│   │   └── sign-up-success/page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx              # Dashboard shell (Sidebar + Topbar), auth guard
│   │   ├── page.tsx                # Dashboard home (stats + quick links)
│   │   ├── resume-improver/        # AI resume enhancement
│   │   ├── ats-checker/            # ATS compatibility scoring
│   │   ├── ats-improver/           # ATS-targeted improvements
│   │   ├── cover-letter/           # AI cover letter generation
│   │   ├── interview-questions/    # Interview prep question generator
│   │   ├── job-finder/             # Job discovery
│   │   ├── job-tracker/            # Application tracking (CRUD)
│   │   ├── job-resume-compare/     # Resume vs. job description match
│   │   ├── job-validity/           # Job posting validity check
│   │   ├── skill-gap-finder/       # Skills gap analysis
│   │   ├── auto-applier/start/     # Automated application starter (Steel browser)
│   │   ├── activity/               # Activity log
│   │   ├── profile/                # User profile
│   │   └── settings/               # App settings
│   └── api/
│       ├── core/                   # AI feature endpoints
│       │   ├── resume-improver/    POST - improve resume text
│       │   ├── ats-checker/        POST - score ATS compatibility
│       │   ├── ats-improver/       POST - ATS-targeted improvements
│       │   ├── cover-letter/       POST - generate cover letter
│       │   ├── interview-questions/ POST - generate interview questions
│       │   ├── job-finder/         POST - find matching jobs
│       │   ├── job-resume-compare/ POST - compare resume to job
│       │   ├── job-validity/       POST - check job validity
│       │   └── skill-gap-finder/   POST - find skill gaps
│       ├── auto/apply/start/       POST - trigger Steel browser auto-apply
│       ├── upload/resume/          POST - PDF resume upload + parsing
│       ├── profile/                GET/PUT - user profile CRUD
│       └── items/                  GET - fetch generated items history
├── components/
│   ├── sidebar.tsx                 # Dashboard navigation sidebar
│   ├── topbar.tsx                  # Dashboard top bar (theme toggle, user menu)
│   ├── resume-uploader.tsx         # PDF drag-and-drop uploader
│   ├── feature-card.tsx            # Reusable feature card
│   ├── theme-provider.tsx          # next-themes provider
│   └── ui/                         # shadcn/ui components
├── lib/
│   ├── gemini.ts                   # Gemini API client (callGemini function)
│   ├── supabase/
│   │   ├── client.ts               # Browser-side Supabase client
│   │   ├── server.ts               # Server-side Supabase client (SSR)
│   │   ├── admin.ts                # Service-role admin client
│   │   ├── middleware.ts           # Session refresh middleware helper
│   │   ├── profile-helpers.ts      # Profile CRUD helpers
│   │   └── validation-helpers.ts   # Input validation
│   └── utils/
│       ├── prompts.ts              # All Gemini prompt templates
│       ├── pdf-parser.ts           # PDF text extraction
│       ├── gibberish-detector.ts   # Resume quality check
│       ├── sidebar-data.ts         # Sidebar nav config
│       └── validation.ts           # Zod schemas
├── scripts/
│   ├── schema.sql                  # Initial DB schema (run first)
│   ├── schema_additions.sql        # Adds job_applications table
│   └── schema_v2_additions.sql     # Adds auto_tasks + resume upload columns
├── middleware.ts                   # Next.js middleware → session refresh + auth redirect
└── steel-starter/                  # Steel browser Python integration (auto-applier)
```

---

## Environment Variables

File: `.env` (not committed — create locally)

```env
NEXT_PUBLIC_SUPABASE_URL="https://xefkhuwyxkjjabxefooc.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<anon key>"
SUPABASE_SERVICE_ROLE_KEY="<service role key>"
SUPABASE_URL="https://xefkhuwyxkjjabxefooc.supabase.co"
GEMINI_API_KEY="<gemini key>"
```

> Supabase project ref: `xefkhuwyxkjjabxefooc`

---

## Database Schema

Run SQL scripts in this order against the Supabase project:

1. `scripts/schema.sql` — core tables
2. `scripts/schema_additions.sql` — job_applications table
3. `scripts/schema_v2_additions.sql` — resume upload columns + auto_tasks table

### Tables

| Table | Purpose |
|---|---|
| `profiles` | Extra user info (name, headline, tones) |
| `generated_items` | Log of all AI feature outputs |
| `resumes` | Saved resume texts + metadata |
| `cover_letters` | Saved cover letters |
| `activity_log` | User activity events |
| `job_applications` | Job tracker entries |
| `auto_tasks` | Auto-applier task queue |

All tables use Row Level Security (RLS) — users can only see their own rows.

---

## Authentication

- Supabase email/password auth
- Middleware at `middleware.ts` refreshes sessions and redirects unauthenticated users to `/auth/login`
- Dashboard layout (`app/dashboard/layout.tsx`) has a server-side auth guard
- Public routes: `/` (landing), `/auth/*`

---

## AI Integration

All AI calls go through `lib/gemini.ts → callGemini()`. Prompts are centralized in `lib/utils/prompts.ts`. Each API route (`app/api/core/*/route.ts`) calls Gemini and saves the result to `generated_items`.

---

## Running Locally

```bash
cd app-applyo
pnpm install
pnpm dev       # starts at http://localhost:3000
```

---

## Known Issues / TODOs

- `steel-starter/` (auto-applier Python backend) requires separate setup with a Steel API key
- Resume upload stores files in Supabase Storage (bucket must be created: `resumes`)
- All schema SQL must be run manually in the Supabase dashboard SQL editor
