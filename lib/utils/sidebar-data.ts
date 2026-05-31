// Legacy export — sidebar now generates data dynamically from basePath prop.
// Kept for any direct references elsewhere.
export const sidebarData = [
  {
    id: "core_intel",
    title: "Core Intelligence",
    icon: "Brain",
    children: [
      { id: "resume_improver", title: "AI Resume Improver", href: "/dashboard/resume-improver" },
      { id: "cover_letter", title: "Cover Letter Maker", href: "/dashboard/cover-letter" },
      { id: "ats_checker", title: "ATS Score Checker", href: "/dashboard/ats-checker" },
      { id: "ats_improver", title: "ATS Score Improver", href: "/dashboard/ats-improver" },
      { id: "job_resume_compare", title: "Job-Resume Compare", href: "/dashboard/job-resume-compare" },
      { id: "skill_gap", title: "Skill Gap Finder", href: "/dashboard/skill-gap-finder" },
      { id: "interview_q", title: "Interview Prep", href: "/dashboard/interview-questions" },
    ],
  },
  {
    id: "job_tools",
    title: "Job Tools",
    icon: "Briefcase",
    children: [
      { id: "job_finder", title: "Job Finder", href: "/dashboard/job-finder" },
      { id: "job_tracker", title: "Job Tracker", href: "/dashboard/job-tracker" },
      { id: "validity_checker", title: "Job Validity Checker", href: "/dashboard/job-validity" },
    ],
  },
  {
    id: "auto_applier",
    title: "Auto-Applier",
    icon: "Zap",
    children: [{ id: "start_auto_apply", title: "Start Auto-Apply", href: "/dashboard/auto-applier/start" }],
  },
  {
    id: "account",
    title: "Account",
    icon: "User",
    children: [
      { id: "profile", title: "Profile", href: "/dashboard/profile" },
      { id: "activity", title: "Activity Log", href: "/dashboard/activity" },
      { id: "settings", title: "Settings", href: "/dashboard/settings" },
    ],
  },
]
