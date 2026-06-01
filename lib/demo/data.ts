export const DEMO_USER = {
  name: "John Doe",
  email: "john.doe@example.com",
  headline: "Senior Software Engineer",
  initials: "JD",
}

export const DEMO_RESUME = `John Doe
Senior Software Engineer | john.doe@example.com | linkedin.com/in/johndoe | github.com/johndoe

SUMMARY
Results-driven Software Engineer with 6+ years of experience building scalable web applications and distributed systems. Proven track record of leading cross-functional teams and shipping high-impact features at top-tier tech companies. Passionate about clean code, performance optimization, and mentoring junior developers.

EXPERIENCE
Senior Software Engineer — TechCorp Inc. (2021–Present)
• Led development of a microservices migration that reduced system latency by 45%
• Architected and shipped a real-time analytics dashboard used by 200K+ daily active users
• Mentored a team of 4 junior engineers, improving team velocity by 30%
• Reduced AWS infrastructure costs by $120K/year through intelligent auto-scaling

Software Engineer — StartupXYZ (2018–2021)
• Built the core payment processing pipeline handling $2M in daily transactions
• Designed and implemented a GraphQL API layer serving 500 requests/second
• Increased test coverage from 40% to 92%, reducing production incidents by 60%

Junior Developer — WebAgency Co. (2016–2018)
• Developed 15+ client websites using React and Node.js
• Optimized database queries reducing page load time by 35%

EDUCATION
B.S. Computer Science — State University (2012–2016)
GPA: 3.7/4.0 | Dean's List 3 years

SKILLS
Languages: JavaScript, TypeScript, Python, Go, SQL
Frontend: React, Next.js, Vue.js, Tailwind CSS
Backend: Node.js, Express, FastAPI, GraphQL
Infrastructure: AWS, GCP, Docker, Kubernetes, Terraform
Databases: PostgreSQL, MongoDB, Redis, DynamoDB

PROJECTS
• Open-source CLI tool (2.1K GitHub stars) for automating code reviews
• Real-time collaborative whiteboard app with WebSocket support`

export const DEMO_JOB_DESCRIPTION = `Senior Frontend Engineer — Acme Technologies

About the Role:
We're looking for a Senior Frontend Engineer to join our growing product team. You'll work on our core product used by 500K+ users worldwide.

Responsibilities:
• Build performant, accessible React components and features
• Collaborate with design and backend teams to deliver end-to-end features
• Lead technical decisions for the frontend architecture
• Mentor junior frontend engineers

Requirements:
• 5+ years of professional frontend experience
• Expert-level React and TypeScript skills
• Experience with Next.js and server-side rendering
• Strong understanding of web performance and accessibility
• Experience with REST APIs and GraphQL
• Familiarity with CI/CD pipelines and cloud platforms (AWS/GCP)

Nice to Have:
• Experience with Tailwind CSS and component libraries
• Knowledge of testing frameworks (Jest, Playwright)
• Prior startup experience

Compensation: $140K–$180K + equity + benefits
Location: Remote (US timezones)`

export const DEMO_IMPROVED_RESUME = `John Doe
Senior Software Engineer | john.doe@example.com | linkedin.com/in/johndoe | github.com/johndoe

PROFESSIONAL SUMMARY
Results-driven Senior Software Engineer with 6+ years of experience architecting scalable web applications for high-growth companies. Expert in React, TypeScript, and Next.js with a proven track record of reducing infrastructure costs, improving system performance by up to 45%, and growing engineering teams. Passionate about accessible, performant user experiences and clean, maintainable code.

PROFESSIONAL EXPERIENCE

Senior Software Engineer — TechCorp Inc. (Jan 2021–Present)
• Architected microservices migration reducing P99 API latency by 45%, directly improving retention metrics
• Delivered real-time analytics dashboard (Next.js + GraphQL) serving 200K+ DAU with <100ms load times
• Established WCAG 2.1 AA accessible component standards adopted across 3 product teams
• Configured CI/CD pipelines (GitHub Actions + AWS CodeDeploy), reducing deployment failures by 75%
• Mentored 4 junior engineers via structured 1:1s and pair programming; 2 promoted within 12 months
• Achieved $120K/year AWS cost reduction through auto-scaling and reserved instance optimization

Software Engineer — StartupXYZ (Mar 2018–Dec 2020)
• Built PCI-compliant payment pipeline (Node.js + Stripe) processing $2M+ in daily transactions
• Designed GraphQL API serving 500 req/s with <50ms median response time
• Raised test coverage from 40% to 92% using Jest and Playwright, reducing production incidents by 60%

Junior Developer — WebAgency Co. (Jun 2016–Feb 2018)
• Delivered 15+ client projects on time using React and Node.js
• Optimized PostgreSQL queries reducing average page load by 35%

EDUCATION
B.S. Computer Science — State University (2016) | GPA: 3.7/4.0 | Dean's List

TECHNICAL SKILLS
Languages: TypeScript, JavaScript, Python, Go, SQL
Frontend: React 18, Next.js 14, Vue.js, Tailwind CSS, Framer Motion
Testing: Jest, Playwright, Cypress, React Testing Library
Backend: Node.js, Express, FastAPI, GraphQL (Apollo)
Infrastructure: AWS (EC2, Lambda, RDS, S3), Docker, Kubernetes, Terraform, GitHub Actions
Databases: PostgreSQL, MongoDB, Redis, DynamoDB

KEY IMPROVEMENTS MADE
• Added measurable impact metrics throughout experience section
• Highlighted leadership, mentoring, and CI/CD experience
• Added accessibility (WCAG) and testing frameworks (Jest, Playwright) to match job requirements
• Restructured skills section with specificity and versions`

export const DEMO_ATS_RESULT = {
  score: 82,
  missingKeywords: ["Playwright", "Jest", "CI/CD", "WCAG", "accessibility"],
  formattingIssues: ["Consider adding a dedicated skills section near the top", "Ensure consistent date formatting"],
  strengths: ["Clear chronological work history", "Quantified achievements throughout", "Relevant tech stack mentioned"],
  suggestions: [
    "Add testing frameworks (Jest, Playwright) explicitly to skills",
    "Mention CI/CD tools used (GitHub Actions, etc.)",
    "Add accessibility (WCAG) experience to stand out",
  ],
}

export const DEMO_ATS_IMPROVED = {
  resume: `John Doe — Senior Software Engineer
john.doe@example.com | linkedin.com/in/johndoe | github.com/johndoe

KEY SKILLS: React • TypeScript • Next.js • GraphQL • AWS • CI/CD • Jest • Playwright • WCAG Accessibility

EXPERIENCE
Senior Software Engineer — TechCorp Inc. (2021–Present)
• Architected CI/CD pipelines (GitHub Actions) reducing deployment failures by 75%
• Built accessible (WCAG 2.1 AA) React component library adopted across 3 teams
• Implemented Jest + Playwright test suite raising coverage to 92%
• Led microservices migration reducing latency by 45%, serving 200K+ DAU

...rest of resume unchanged...`,
  keywordsAdded: ["CI/CD", "Jest", "Playwright", "WCAG", "accessibility"],
  changes: [
    "Added skills summary at top for ATS scanning",
    "Integrated CI/CD experience with specific tools (GitHub Actions)",
    "Added Jest and Playwright to testing experience",
    "Added WCAG accessibility work explicitly",
  ],
}

export const DEMO_COVER_LETTER = `Dear Hiring Team at Acme Technologies,

I'm excited to apply for the Senior Frontend Engineer role. With 6+ years of experience building scalable web products and deep expertise in React and TypeScript, I'm confident I can make an immediate impact on your product team.

At TechCorp Inc., I led development of a real-time analytics dashboard serving 200,000+ daily active users — the kind of scale your team works with daily. My experience with Next.js, GraphQL, and web performance optimization directly aligns with Acme's technical requirements. I've also established WCAG 2.1 accessibility standards across multiple teams, knowing accessibility is a core requirement for your role.

What draws me to Acme specifically is your product's reputation for exceptional user experience and the engineering team's thoughtful approach to frontend architecture. I've been following your engineering blog and the recent posts on server component patterns resonated strongly with work I've been doing.

Beyond technical skills, I bring leadership experience mentoring 4 junior engineers, two of whom were promoted within a year of my mentorship. I believe great engineering culture is built from within, and I'd love to contribute to yours.

I'd welcome the chance to discuss how my background aligns with your team's goals.

Best regards,
John Doe`

export const DEMO_INTERVIEW_QUESTIONS = [
  {
    question: "Tell me about a complex frontend architecture decision you've made and its business impact.",
    answer:
      "At TechCorp I led migration from a monolithic React app to micro-frontends using Module Federation. Four separate teams could now deploy independently. Deployment conflicts dropped 80% and release cycles shrunk from 2 weeks to 2 days. The key challenge was shared state — we used a pub/sub event bus pattern which kept team boundaries clean.",
  },
  {
    question: "How do you approach performance optimization in a large React application?",
    answer:
      "I start with profiling — React DevTools Profiler and Lighthouse — to find actual bottlenecks, not guesses. Then I apply React.memo for expensive pure components, useMemo/useCallback for derived state, code splitting with dynamic imports, and virtualization for long lists. I also analyze network waterfalls and implement aggressive caching. I recently cut our dashboard's LCP from 4.2s to 0.9s using these techniques.",
  },
  {
    question: "Describe your experience mentoring junior engineers. What's your approach?",
    answer:
      "I mentored 4 junior engineers at TechCorp through weekly 1:1s, pair programming, and structured code reviews. I created a quarterly learning path system with clear goals. Within 6 months, two engineers were shipping production features independently. I also built internal docs that cut onboarding time from 3 weeks to 1 week. I believe mentoring is multiplied impact — every person I grow makes the whole team stronger.",
  },
  {
    question: "How do you ensure accessibility in your frontend work?",
    answer:
      "I treat accessibility as a feature, not an afterthought. I use axe-core in CI to catch regressions automatically, follow WCAG 2.1 AA guidelines, test with screen readers (NVDA, VoiceOver), and ensure keyboard navigation works everywhere. At TechCorp I established accessible component standards adopted across 3 product teams — this approach prevented accessibility bugs at the component level rather than fixing them at the page level.",
  },
]

export const DEMO_JOB_LISTINGS = [
  {
    title: "Senior Frontend Engineer",
    company: "Acme Technologies",
    location: "Remote (US)",
    salary: "$140K–$180K",
    match: 92,
    type: "Full-time",
    tags: ["React", "Next.js", "TypeScript"],
    url: "#",
  },
  {
    title: "Staff Software Engineer",
    company: "DataStream Corp",
    location: "San Francisco, CA (Hybrid)",
    salary: "$160K–$200K",
    match: 78,
    type: "Full-time",
    tags: ["TypeScript", "GraphQL", "AWS"],
    url: "#",
  },
  {
    title: "Principal Engineer",
    company: "CloudBase Inc.",
    location: "Remote",
    salary: "$180K–$220K",
    match: 71,
    type: "Full-time",
    tags: ["Go", "Kubernetes", "Distributed Systems"],
    url: "#",
  },
  {
    title: "Engineering Manager",
    company: "GrowthTech",
    location: "New York, NY (Hybrid)",
    salary: "$190K–$240K",
    match: 65,
    type: "Full-time",
    tags: ["Leadership", "React", "System Design"],
    url: "#",
  },
]

export const DEMO_JOB_APPLICATIONS = [
  {
    id: "1",
    company: "Acme Technologies",
    job_title: "Senior Frontend Engineer",
    status: "interviewing",
    applied_date: "2025-05-20",
  },
  {
    id: "2",
    company: "DataStream Corp",
    job_title: "Staff Engineer",
    status: "applied",
    applied_date: "2025-05-25",
  },
  {
    id: "3",
    company: "StartupABC",
    job_title: "Engineering Lead",
    status: "offer",
    applied_date: "2025-05-15",
  },
  {
    id: "4",
    company: "BigTech Inc.",
    job_title: "Senior SWE",
    status: "rejected",
    applied_date: "2025-05-10",
  },
]

export const DEMO_SKILL_GAP = {
  matching: [
    "React / Next.js",
    "TypeScript",
    "GraphQL",
    "AWS",
    "Team leadership",
    "Mentoring",
    "Node.js",
    "System design",
  ],
  missing: [
    "Jest / Playwright (testing frameworks)",
    "Accessibility / WCAG 2.1",
    "CI/CD pipeline configuration",
    "Tailwind CSS (explicitly)",
  ],
  recommendations: [
    "Add testing frameworks (Jest, Playwright) explicitly to your skills section",
    "Highlight WCAG accessibility experience from TechCorp more prominently",
    "Document your CI/CD pipeline work with specific tools (GitHub Actions, etc.)",
    "Mention Tailwind CSS if you've used it, even on side projects",
  ],
}

export const DEMO_COMPARE_RESULT = {
  score: 85,
  strengths: [
    "React and TypeScript expertise matches exactly (5+ years)",
    "Next.js and SSR experience is a direct fit for the role",
    "Leadership and mentoring experience aligns with senior level",
    "GraphQL API experience is directly relevant",
    "AWS infrastructure knowledge matches requirement",
  ],
  gaps: [
    "Testing frameworks (Jest, Playwright) not explicitly mentioned in resume",
    "Accessibility / WCAG experience buried rather than highlighted",
    "CI/CD pipeline configuration experience could be more prominent",
  ],
  recommendations: [
    "Lead with accessibility experience — it's explicitly required",
    "Add a testing section or mention Jest/Playwright in skills",
    "Quantify CI/CD impact (deployment frequency, failure rate, etc.)",
  ],
}

export const DEMO_JOB_VALIDITY = {
  score: 94,
  verdict: "Legitimate",
  greenFlags: [
    "Company has verifiable LinkedIn presence with 500+ employees",
    "Salary range ($140K–$180K) is realistic for the role and market",
    "Detailed, specific job requirements — not a generic posting",
    "Clear company description and product mentioned",
    "Professional tone with realistic expectations",
  ],
  redFlags: [],
  fitAnalysis:
    "This role is an excellent match for your profile. The requirements align closely with your experience at TechCorp and StartupXYZ. The compensation is competitive for your seniority level.",
}

export const DEMO_STATS = {
  generatedItems: 24,
  resumes: 3,
  coverLetters: 7,
}

// ─── Recruiter Hub (Enterprise) demo data ───────────────────
export const DEMO_RECRUITER = {
  name: "Sarah Johnson",
  initials: "SJ",
  title: "Senior Technical Recruiter",
  company: "Acme Technologies",
  email: "sarah.johnson@acme.tech",
  website: "acme.tech/careers",
  about:
    "We're building the future of developer tooling. Always looking for exceptional frontend and full-stack engineers who care about craft, performance, and accessibility.",
  hiringFor: ["Senior Frontend Engineer", "Staff Engineer", "Engineering Manager", "Product Designer"],
  locations: ["Remote (US)", "San Francisco, CA", "New York, NY"],
  perks: ["Top-of-market comp + equity", "Remote-first", "Learning budget", "4-day onboarding"],
}

export const DEMO_RECRUITER_STATS = {
  talentPool: 1284,
  newThisWeek: 47,
  shortlisted: 12,
  activeRoles: 4,
}

export const DEMO_CANDIDATES = [
  {
    id: "c1", name: "John Doe", initials: "JD", headline: "Senior Software Engineer",
    location: "Remote (US)", experience: "6 yrs", match: 94, atsScore: 88, status: "new",
    skills: ["React", "TypeScript", "Next.js", "GraphQL", "AWS"],
    summary: "6+ years building scalable web apps. Led microservices migration cutting latency 45%.",
    openToWork: true, salary: "$150K–$180K",
  },
  {
    id: "c2", name: "Maria Garcia", initials: "MG", headline: "Staff Frontend Engineer",
    location: "San Francisco, CA", experience: "9 yrs", match: 91, atsScore: 92, status: "shortlisted",
    skills: ["React", "Vue", "TypeScript", "Design Systems", "WCAG"],
    summary: "Design-systems expert. Shipped component libraries used by 40+ teams.",
    openToWork: true, salary: "$190K–$220K",
  },
  {
    id: "c3", name: "David Chen", initials: "DC", headline: "Full-Stack Engineer",
    location: "New York, NY", experience: "5 yrs", match: 86, atsScore: 81, status: "new",
    skills: ["Node.js", "React", "PostgreSQL", "Docker", "GraphQL"],
    summary: "Full-stack generalist who ships fast. Built payment pipeline handling $2M/day.",
    openToWork: true, salary: "$140K–$165K",
  },
  {
    id: "c4", name: "Aisha Patel", initials: "AP", headline: "Senior Product Designer",
    location: "Remote (US)", experience: "7 yrs", match: 83, atsScore: 79, status: "new",
    skills: ["Figma", "Design Systems", "User Research", "Prototyping"],
    summary: "Product designer bridging design and engineering. Accessibility advocate.",
    openToWork: true, salary: "$135K–$160K",
  },
  {
    id: "c5", name: "Tom Wright", initials: "TW", headline: "Engineering Manager",
    location: "Remote (US)", experience: "11 yrs", match: 80, atsScore: 84, status: "contacted",
    skills: ["Leadership", "React", "Hiring", "Architecture", "Mentoring"],
    summary: "Built and led teams of 12+. Player-coach who still ships code.",
    openToWork: false, salary: "$210K–$250K",
  },
]

export const DEMO_RECRUITER_APPLICATIONS = [
  {
    id: "a1", candidate: "John Doe", initials: "JD", role: "Senior Frontend Engineer",
    appliedDate: "2025-05-28", match: 94, atsScore: 88, stage: "review",
    note: "Strong React + perf background. Move to phone screen.",
  },
  {
    id: "a2", candidate: "Maria Garcia", initials: "MG", role: "Staff Engineer",
    appliedDate: "2025-05-27", match: 91, atsScore: 92, stage: "shortlist",
    note: "Excellent design-systems fit. Fast-track.",
  },
  {
    id: "a3", candidate: "David Chen", initials: "DC", role: "Senior Frontend Engineer",
    appliedDate: "2025-05-26", match: 86, atsScore: 81, stage: "review",
    note: "",
  },
  {
    id: "a4", candidate: "Aisha Patel", initials: "AP", role: "Product Designer",
    appliedDate: "2025-05-24", match: 83, atsScore: 79, stage: "review",
    note: "",
  },
]
