import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  BadgeCheck,
  Briefcase,
  FileText,
  FolderGit2,
  GraduationCap,
  Lightbulb,
  Sparkles,
  Wand2,
} from "lucide-react";
import { ScoreCard } from "@/components/common/ScoreCard";
import { ProgressBar } from "@/components/common/ProgressBar";
import { ProfileSection } from "@/components/common/ProfileSection";
import { SkillBadge } from "@/components/common/SkillBadge";
import { LoadingState } from "@/components/common/LoadingState";
import { ErrorState } from "@/components/common/ErrorState";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useResumeAnalysis } from "@/hooks/use-career-data";

export const Route = createFileRoute("/dashboard/resume/analysis")({
  head: () => ({
    meta: [
      { title: "Resume analysis — CareerPilot AI" },
      { name: "description", content: "Your scored resume analysis: strengths, weak areas, skills and improvement suggestions." },
      { property: "og:title", content: "Resume analysis — CareerPilot AI" },
      { property: "og:description", content: "See your resume score, weak areas and improvement suggestions." },
    ],
  }),
  component: AnalysisPage,
});

const severityTone = {
  high: "text-destructive",
  medium: "text-warning",
  low: "text-muted-foreground",
} as const;

function AnalysisPage() {
  const { data, isLoading, isError, refetch } = useResumeAnalysis();

  if (isLoading) return <LoadingState title="Analyzing" description="Pulling together your resume analysis…" />;
  if (isError || !data) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Your Resume Analysis
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {data.fileName} · analyzed {new Date(data.analyzedAt).toLocaleDateString()}
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/dashboard/resume">Upload a new version</Link>
        </Button>
      </header>

      <div className="surface-panel grid gap-8 p-6 md:grid-cols-[auto_1fr] md:items-center md:p-8">
        <ScoreCard score={data.score} caption="A solid resume with clear room to sharpen impact and ATS parsing." />
        <div className="space-y-4">
          {data.scoreBreakdown.map((b) => (
            <ProgressBar key={b.label} label={b.label} value={b.value} showValue />
          ))}
        </div>
      </div>

      <ProfileSection title="Professional Summary" icon={<FileText className="size-4" />}>
        <p className="text-sm leading-relaxed text-muted-foreground">{data.professionalSummary}</p>
      </ProfileSection>

      <ProfileSection title="Top Skills" icon={<Wand2 className="size-4" />} description="Extracted and levelled from your resume">
        <div className="flex flex-wrap gap-2">
          {data.topSkills.map((s) => (
            <SkillBadge key={s.name} name={s.name} level={s.level} />
          ))}
        </div>
      </ProfileSection>

      <ProfileSection title="Weak Areas" icon={<AlertTriangle className="size-4" />} description="What's holding the score back">
        {data.weaknesses.length ? (
          <Accordion type="single" collapsible className="w-full">
            {data.weaknesses.map((w, i) => (
              <AccordionItem key={w.title} value={`weak-${i}`}>
                <AccordionTrigger className="text-left text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <span className={severityTone[w.severity]}>●</span>
                    {w.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{w.detail}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <EmptyState title="No weak areas found" description="Nothing is dragging your score down right now." />
        )}
      </ProfileSection>

      <div className="grid gap-6 lg:grid-cols-2">
        <ProfileSection title="Education" icon={<GraduationCap className="size-4" />}>
          <ul className="space-y-4">
            {data.education.map((e) => (
              <li key={e.id}>
                <p className="text-sm font-semibold text-foreground">{e.degree} · {e.field}</p>
                <p className="text-sm text-muted-foreground">{e.institution}</p>
                <p className="text-xs text-muted-foreground">{e.start} – {e.end}</p>
              </li>
            ))}
          </ul>
        </ProfileSection>

        <ProfileSection title="Certifications" icon={<BadgeCheck className="size-4" />}>
          <ul className="space-y-4">
            {data.certifications.map((c) => (
              <li key={c.id}>
                <p className="text-sm font-semibold text-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.issuer} · {c.issued}</p>
              </li>
            ))}
          </ul>
        </ProfileSection>
      </div>

      <ProfileSection title="Experience" icon={<Briefcase className="size-4" />}>
        <ul className="space-y-6">
          {data.experience.map((x) => (
            <li key={x.id} className="border-l-2 border-border pl-4">
              <p className="text-sm font-semibold text-foreground">{x.role}</p>
              <p className="text-sm text-muted-foreground">{x.company} · {x.location}</p>
              <p className="text-xs text-muted-foreground">{x.start} – {x.end}</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                {x.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </ProfileSection>

      <ProfileSection title="Projects" icon={<FolderGit2 className="size-4" />}>
        <ul className="grid gap-4 sm:grid-cols-2">
          {data.projects.map((p) => (
            <li key={p.id} className="rounded-xl border border-border bg-surface p-4">
              <p className="text-sm font-semibold text-foreground">{p.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <SkillBadge key={t} name={t} />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </ProfileSection>

      <ProfileSection
        title="Career Suggestions"
        icon={<Sparkles className="size-4" />}
        action={
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard/suggestions">See all</Link>
          </Button>
        }
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {data.careerSuggestions.slice(0, 4).map((s) => (
            <li key={s.id} className="rounded-xl border border-border bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-foreground">{s.title}</p>
                <span className="shrink-0 text-xs font-semibold text-accent">{s.matchScore}%</span>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.summary}</p>
            </li>
          ))}
        </ul>
      </ProfileSection>

      <ProfileSection title="Resume Improvement Suggestions" icon={<Lightbulb className="size-4" />}>
        <Accordion type="single" collapsible className="w-full">
          {data.improvements.map((imp, i) => (
            <AccordionItem key={imp.title} value={`imp-${i}`}>
              <AccordionTrigger className="text-left text-sm font-medium">{imp.title}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{imp.detail}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ProfileSection>
    </div>
  );
}
