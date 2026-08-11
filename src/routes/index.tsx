import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  FileSearch,
  Upload,
  Sparkles,
  ShieldCheck,
  Lock,
  Trash2,
  BrainCircuit,
  Route as RouteIcon,
  BarChart3,
  UserRound,
} from "lucide-react";
import { MarketingNavbar } from "@/components/marketing/MarketingNavbar";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { HeroDashboardPreview } from "@/components/marketing/HeroDashboardPreview";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CareerPilot AI — Your AI Career Agent" },
      {
        name: "description",
        content:
          "Turn your resume, skills, and experience into a personalized career roadmap with CareerPilot AI's resume analysis and career profile.",
      },
      { property: "og:title", content: "CareerPilot AI — Your AI Career Agent" },
      {
        property: "og:description",
        content: "Turn your resume, skills, and experience into a personalized career roadmap.",
      },
    ],
  }),
  component: LandingPage,
});

const steps = [
  {
    icon: Upload,
    title: "Upload Your Resume",
    body: "Drop in a PDF or DOCX. Nothing is shared with anyone — it stays inside your account.",
  },
  {
    icon: BrainCircuit,
    title: "AI Builds Your Career Profile",
    body: "Your experience, skills, education and projects are structured into one living profile.",
  },
  {
    icon: Sparkles,
    title: "Discover Your Career Opportunities",
    body: "See where you stand today, what's missing, and which roles fit the profile you already have.",
  },
];

const features = [
  { icon: FileSearch, title: "AI Resume Analysis", body: "A scored breakdown of impact, clarity, skill coverage and ATS readability." },
  { icon: UserRound, title: "Career Profile", body: "One structured profile you own — editable, exportable, always current." },
  { icon: BarChart3, title: "Skill Analysis", body: "Skills detected and levelled, with the gaps that matter for your next role." },
  { icon: Sparkles, title: "Career Suggestions", body: "Role directions matched to your real experience, not keyword guesswork." },
  { icon: RouteIcon, title: "Personalized Roadmap", body: "A sequenced plan of what to learn, build and evidence next." },
];

const trust = [
  { icon: Lock, title: "Encrypted in transit and at rest", body: "Your resume is treated as sensitive career data from the moment it leaves your device." },
  { icon: ShieldCheck, title: "Never sold, never shared", body: "No recruiter marketplace, no data resale. Your documents are used only to build your profile." },
  { icon: Trash2, title: "Delete anything, anytime", body: "Remove a resume or your entire account and the underlying data goes with it." },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNavbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" aria-hidden="true" />
          <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:pb-28 lg:pt-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                Resume analysis · Career profile · Roadmap
              </span>
              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Your AI Career Agent
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Turn your resume, skills, and experience into a personalized career roadmap.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <Link to="/signup">
                    Get Started <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#how-it-works">See How It Works</a>
                </Button>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Free to start. Your documents stay private and deletable.
              </p>
            </div>

            <HeroDashboardPreview />
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="border-y border-border bg-surface py-20 lg:py-28">
          <div className="mx-auto w-full max-w-6xl px-5">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">How it works</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Three steps from resume to roadmap
              </h2>
            </div>
            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((step, i) => (
                <li key={step.title} className="surface-panel p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-accent-soft text-accent" aria-hidden="true">
                      <step.icon className="size-5" />
                    </span>
                    <span className="font-display text-sm font-semibold text-muted-foreground">Step {i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 lg:py-28">
          <div className="mx-auto w-full max-w-6xl px-5">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">Features</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Everything your career profile needs
              </h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <article key={f.title} className="surface-panel p-7 transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-accent-soft text-accent" aria-hidden="true">
                    <f.icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Trust */}
        <section id="security" className="border-y border-border bg-surface py-20 lg:py-28">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">Trust &amp; security</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                You control your career data
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                A resume is one of the most personal documents you own. CareerPilot AI handles it as sensitive data by
                default: private to your account, encrypted, and removable in one action.
              </p>
            </div>
            <ul className="grid gap-4">
              {trust.map((t) => (
                <li key={t.title} className="surface-panel flex gap-4 p-6">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent" aria-hidden="true">
                    <t.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{t.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto w-full max-w-4xl px-5">
            <div className="surface-panel relative overflow-hidden px-8 py-14 text-center sm:px-14">
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" aria-hidden="true" />
              <div className="relative">
                <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Build Your Career Profile
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
                  Upload a resume and get a scored analysis, a structured profile, and a roadmap in minutes.
                </p>
                <Button size="lg" className="mt-8" asChild>
                  <Link to="/signup">
                    Build Your Career Profile <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
