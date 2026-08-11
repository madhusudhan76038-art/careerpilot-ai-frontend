import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText, GaugeCircle, Sparkles, Wand2, GraduationCap, Briefcase, FolderGit2, BadgeCheck } from "lucide-react";
import { DashboardCard } from "@/components/common/DashboardCard";
import { ProgressBar } from "@/components/common/ProgressBar";
import { ProfileSection } from "@/components/common/ProfileSection";
import { SkillBadge } from "@/components/common/SkillBadge";
import { LoadingState } from "@/components/common/LoadingState";
import { ErrorState } from "@/components/common/ErrorState";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { useDashboardStats, useProfile } from "@/hooks/use-career-data";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Dashboard — CareerPilot AI" },
      { name: "description", content: "Track your resume score, profile completion, identified skills and career suggestions." },
      { property: "og:title", content: "Dashboard — CareerPilot AI" },
      { property: "og:description", content: "Your career workspace overview." },
    ],
  }),
  component: DashboardHome,
});

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function DashboardHome() {
  const stats = useDashboardStats();
  const profile = useProfile();

  if (profile.isLoading || stats.isLoading) return <LoadingState title="Loading your workspace" />;
  if (profile.isError || !profile.data) return <ErrorState onRetry={() => profile.refetch()} />;

  const p = profile.data;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {greeting()}, {p.user.fullName.split(" ")[0]}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Let's improve your career profile.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          label="Profile Completion"
          value={`${stats.data?.profileCompletion ?? p.completion}%`}
          icon={<GaugeCircle className="size-4" />}
          footer={<ProgressBar value={stats.data?.profileCompletion ?? p.completion} />}
        />
        <DashboardCard
          label="Resume Score"
          value={`${stats.data?.resumeScore ?? 0}/100`}
          icon={<FileText className="size-4" />}
          hint="Based on impact, clarity and ATS readability"
        />
        <DashboardCard
          label="Skills Identified"
          value={stats.data?.skillsIdentified ?? p.skills.length}
          icon={<Wand2 className="size-4" />}
          hint="Detected from your latest resume"
        />
        <DashboardCard
          label="Career Suggestions"
          value={stats.data?.careerSuggestions ?? 0}
          icon={<Sparkles className="size-4" />}
          hint="Roles matched to your profile"
        />
      </div>

      <div className="surface-panel flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="text-base font-semibold text-foreground">Next best action</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Add your certifications and languages to push completion past 90%.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link to="/dashboard/resume">Upload new resume</Link>
          </Button>
          <Button asChild>
            <Link to="/dashboard/profile">
              Complete Profile <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">Your Career Profile</h2>

        <ProfileSection title="Professional Summary" icon={<FileText className="size-4" />}>
          <p className="text-sm leading-relaxed text-muted-foreground">{p.professionalSummary}</p>
        </ProfileSection>

        <ProfileSection title="Top Skills" icon={<Wand2 className="size-4" />} description="Ranked by confidence from your resume">
          <div className="flex flex-wrap gap-2">
            {p.skills.slice(0, 10).map((s) => (
              <SkillBadge key={s.name} name={s.name} level={s.level} />
            ))}
          </div>
        </ProfileSection>

        <div className="grid gap-6 lg:grid-cols-2">
          <ProfileSection title="Education" icon={<GraduationCap className="size-4" />}>
            <ul className="space-y-4">
              {p.education.map((e) => (
                <li key={e.id}>
                  <p className="text-sm font-semibold text-foreground">{e.degree} · {e.field}</p>
                  <p className="text-sm text-muted-foreground">{e.institution}</p>
                  <p className="text-xs text-muted-foreground">{e.start} – {e.end}{e.grade ? ` · ${e.grade}` : ""}</p>
                </li>
              ))}
            </ul>
          </ProfileSection>

          <ProfileSection title="Certifications" icon={<BadgeCheck className="size-4" />}>
            {p.certifications.length ? (
              <ul className="space-y-4">
                {p.certifications.map((c) => (
                  <li key={c.id}>
                    <p className="text-sm font-semibold text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.issuer} · {c.issued}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState title="No certifications yet" description="Add certifications to strengthen your profile." />
            )}
          </ProfileSection>
        </div>

        <ProfileSection title="Experience" icon={<Briefcase className="size-4" />}>
          <ul className="space-y-6">
            {p.experience.map((x) => (
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
            {p.projects.map((pr) => (
              <li key={pr.id} className="rounded-xl border border-border bg-surface p-4">
                <p className="text-sm font-semibold text-foreground">{pr.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{pr.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {pr.tech.map((t) => (
                    <SkillBadge key={t} name={t} />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </ProfileSection>
      </div>
    </div>
  );
}
