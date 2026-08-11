/**
 * ============================================================
 * MOCK / DEMO DATA — CareerPilot AI (frontend-only phase)
 * ============================================================
 * Every value in this file is fake, hand-written demo content.
 * It exists ONLY so the UI can be developed before the FastAPI
 * backend + Supabase exist.
 *
 * When the backend lands, delete nothing here immediately —
 * instead flip `USE_MOCK_DATA` in `src/services/api.ts` to false.
 * No UI component should ever import fake data from anywhere else.
 * ============================================================
 */

export type CareerUser = {
  id: string;
  fullName: string;
  email: string;
  headline: string;
  location: string;
  avatarUrl?: string;
};

export type Skill = { name: string; level: "Beginner" | "Intermediate" | "Advanced" | "Expert"; category: string };
export type Education = { id: string; institution: string; degree: string; field: string; start: string; end: string; grade?: string };
export type Experience = { id: string; company: string; role: string; start: string; end: string; location: string; highlights: string[] };
export type Project = { id: string; name: string; description: string; tech: string[]; link?: string };
export type Certification = { id: string; name: string; issuer: string; issued: string; credentialId?: string };
export type Language = { name: string; proficiency: string };
export type CareerSuggestion = {
  id: string;
  title: string;
  matchScore: number;
  summary: string;
  missingSkills: string[];
  salaryRange: string;
};

export type CareerProfile = {
  user: CareerUser;
  completion: number;
  professionalSummary: string;
  skills: Skill[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  careerInterests: string[];
};

export type ResumeAnalysis = {
  id: string;
  fileName: string;
  analyzedAt: string;
  score: number;
  scoreBreakdown: { label: string; value: number }[];
  professionalSummary: string;
  topSkills: Skill[];
  weakAreas: { title: string; detail: string; severity: "low" | "medium" | "high" };
  weaknesses: { title: string; detail: string; severity: "low" | "medium" | "high" }[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  careerSuggestions: CareerSuggestion[];
  improvements: { title: string; detail: string }[];
};

/** MOCK: demo signed-in user */
export const mockUser: CareerUser = {
  id: "demo-user-001",
  fullName: "Ananya Rao",
  email: "ananya.rao@example.com",
  headline: "Backend Engineer · Python & Distributed Systems",
  location: "Bengaluru, India",
};

/** MOCK: skills extracted from the demo resume */
export const mockSkills: Skill[] = [
  { name: "Python", level: "Expert", category: "Languages" },
  { name: "TypeScript", level: "Advanced", category: "Languages" },
  { name: "SQL", level: "Advanced", category: "Languages" },
  { name: "FastAPI", level: "Advanced", category: "Frameworks" },
  { name: "Django", level: "Intermediate", category: "Frameworks" },
  { name: "React", level: "Intermediate", category: "Frameworks" },
  { name: "PostgreSQL", level: "Advanced", category: "Data" },
  { name: "Redis", level: "Intermediate", category: "Data" },
  { name: "Apache Kafka", level: "Intermediate", category: "Data" },
  { name: "Docker", level: "Advanced", category: "Platform" },
  { name: "Kubernetes", level: "Beginner", category: "Platform" },
  { name: "AWS", level: "Intermediate", category: "Platform" },
  { name: "CI/CD", level: "Advanced", category: "Practices" },
  { name: "System Design", level: "Intermediate", category: "Practices" },
];

/** MOCK: education history */
export const mockEducation: Education[] = [
  {
    id: "edu-1",
    institution: "National Institute of Technology, Trichy",
    degree: "B.Tech",
    field: "Computer Science and Engineering",
    start: "2017",
    end: "2021",
    grade: "8.7 CGPA",
  },
];

/** MOCK: work history */
export const mockExperience: Experience[] = [
  {
    id: "exp-1",
    company: "Northwind Systems",
    role: "Backend Engineer II",
    start: "Jul 2023",
    end: "Present",
    location: "Bengaluru, India",
    highlights: [
      "Designed an event pipeline processing 40M daily events with Kafka and Python.",
      "Cut median API latency from 480ms to 120ms through query and cache redesign.",
      "Mentored three junior engineers through onboarding and code review.",
    ],
  },
  {
    id: "exp-2",
    company: "Peakline Labs",
    role: "Software Engineer",
    start: "Aug 2021",
    end: "Jun 2023",
    location: "Remote",
    highlights: [
      "Built billing and invoicing services in FastAPI serving 60k businesses.",
      "Introduced contract testing that reduced production regressions by 35%.",
    ],
  },
];

/** MOCK: portfolio projects */
export const mockProjects: Project[] = [
  {
    id: "proj-1",
    name: "Ledgerly",
    description: "Open-source double-entry accounting engine with an event-sourced core.",
    tech: ["Python", "PostgreSQL", "FastAPI"],
    link: "https://example.com/ledgerly",
  },
  {
    id: "proj-2",
    name: "Streamfold",
    description: "Lightweight stream-processing toolkit for small teams running Kafka.",
    tech: ["Python", "Kafka", "Docker"],
  },
];

/** MOCK: certifications */
export const mockCertifications: Certification[] = [
  { id: "cert-1", name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", issued: "Mar 2024", credentialId: "AWS-SAA-DEMO-1194" },
  { id: "cert-2", name: "Certified Kubernetes Application Developer", issuer: "The Linux Foundation", issued: "Nov 2023" },
];

/** MOCK: languages */
export const mockLanguages: Language[] = [
  { name: "English", proficiency: "Professional" },
  { name: "Hindi", proficiency: "Native" },
  { name: "Kannada", proficiency: "Conversational" },
];

/** MOCK: AI-generated career suggestions */
export const mockCareerSuggestions: CareerSuggestion[] = [
  {
    id: "sug-1",
    title: "Senior Backend Engineer",
    matchScore: 91,
    summary: "Your distributed-systems depth and ownership of production pipelines map directly to senior backend scope.",
    missingSkills: ["Kubernetes at scale", "Incident command"],
    salaryRange: "₹32L – ₹46L",
  },
  {
    id: "sug-2",
    title: "Platform / Infrastructure Engineer",
    matchScore: 84,
    summary: "Strong Docker, CI/CD and AWS signal. Deepening Kubernetes and IaC would make this a natural move.",
    missingSkills: ["Terraform", "Service mesh"],
    salaryRange: "₹30L – ₹44L",
  },
  {
    id: "sug-3",
    title: "Data Platform Engineer",
    matchScore: 78,
    summary: "Kafka and PostgreSQL experience translate well to batch and streaming data platform work.",
    missingSkills: ["Spark", "dbt", "Airflow"],
    salaryRange: "₹28L – ₹42L",
  },
  {
    id: "sug-4",
    title: "Solutions Architect",
    matchScore: 71,
    summary: "System design plus client-facing project history suggest a viable architecture track.",
    missingSkills: ["Pre-sales experience", "Multi-cloud"],
    salaryRange: "₹34L – ₹50L",
  },
  {
    id: "sug-5",
    title: "Engineering Team Lead",
    matchScore: 66,
    summary: "Mentoring history is a start. Formal delivery ownership would strengthen this path.",
    missingSkills: ["Roadmap ownership", "Hiring experience"],
    salaryRange: "₹36L – ₹52L",
  },
];

/** MOCK: full career profile */
export const mockProfile: CareerProfile = {
  user: mockUser,
  completion: 72,
  professionalSummary:
    "Backend engineer with four years building high-throughput Python services and event-driven data pipelines. Comfortable owning services end to end, from schema design to on-call. Looking for senior scope on systems where reliability and latency actually matter.",
  skills: mockSkills,
  education: mockEducation,
  experience: mockExperience,
  projects: mockProjects,
  certifications: mockCertifications,
  languages: mockLanguages,
  careerInterests: ["Distributed systems", "Developer platforms", "Fintech infrastructure"],
};

/** MOCK: resume analysis result */
export const mockResumeAnalysis: ResumeAnalysis = {
  id: "analysis-001",
  fileName: "ananya-rao-resume.pdf",
  analyzedAt: "2026-08-11T09:24:00.000Z",
  score: 78,
  scoreBreakdown: [
    { label: "Impact & metrics", value: 82 },
    { label: "Skill coverage", value: 86 },
    { label: "Clarity & structure", value: 74 },
    { label: "ATS readability", value: 70 },
  ],
  professionalSummary: mockProfile.professionalSummary,
  topSkills: mockSkills.slice(0, 8),
  weakAreas: { title: "ATS formatting", detail: "Two-column layout can break automated parsers.", severity: "medium" },
  weaknesses: [
    { title: "Two-column layout", detail: "Many applicant tracking systems mis-parse multi-column resumes. A single-column layout is safer.", severity: "high" },
    { title: "Thin leadership signal", detail: "Mentoring is mentioned once. Add scope: how many people, over what period, with what outcome.", severity: "medium" },
    { title: "Missing cloud depth", detail: "AWS appears as a keyword but no project describes what you architected on it.", severity: "medium" },
    { title: "No summary keywords", detail: "Your summary omits target-role keywords like 'senior', 'reliability' and 'platform'.", severity: "low" },
  ],
  education: mockEducation,
  experience: mockExperience,
  projects: mockProjects,
  certifications: mockCertifications,
  careerSuggestions: mockCareerSuggestions,
  improvements: [
    { title: "Lead with quantified outcomes", detail: "Three of your eight bullets have no number. Add throughput, latency, cost or adoption figures." },
    { title: "Switch to a single-column layout", detail: "Improves ATS parsing accuracy and keeps section order predictable for recruiters." },
    { title: "Tighten the summary to three lines", detail: "Name the role you want, your strongest domain, and one proof point." },
    { title: "Group skills by category", detail: "Recruiters scan for stack fit. Languages / frameworks / infrastructure reads faster than one long list." },
    { title: "Add links to shipped work", detail: "Ledgerly and Streamfold deserve links — public work is the strongest differentiator you have." },
  ],
};

/** MOCK: dashboard summary tiles */
export const mockDashboardStats = {
  profileCompletion: 72,
  resumeScore: 78,
  skillsIdentified: 14,
  careerSuggestions: 5,
};
