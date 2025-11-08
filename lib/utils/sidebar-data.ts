export const sidebarData = [
  {
    id: "core_intel",
    title: "Core Intelligence Features",
    icon: "Brain",
    children: [
      { id: "resume_improver", title: "AI Resume Improver", href: "/dashboard/resume-improver" },
      { id: "cover_letter", title: "Cover Letter Maker", href: "/dashboard/cover-letter" },
      { id: "ats_checker", title: "ATS Score Checker", href: "/dashboard/ats-checker" },
      { id: "ats_improver", title: "ATS Score Improver", href: "/dashboard/ats-improver" },
      { id: "job_resume_compare", title: "Job-to-Resume Comparison", href: "/dashboard/job-resume-compare" },
      { id: "skill_gap", title: "Skill Gap Finder", href: "/dashboard/skill-gap-finder" },
      { id: "interview_q", title: "Interview Question Generator", href: "/dashboard/interview-questions" },
    ],
  },
  {
    id: "job_tools",
    title: "Job Application Tools",
    icon: "Briefcase",
    children: [
      { id: "job_finder", title: "Job Finder", href: "/dashboard/job-finder" },
      { id: "job_tracker", title: "Job Tracker", href: "/dashboard/job-tracker" },
      { id: "validity_checker", title: "Job Listing Validity Checker", href: "/dashboard/job-validity" },
    ],
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
