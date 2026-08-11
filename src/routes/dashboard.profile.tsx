import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Languages,
  Target,
  UserRound,
  Wand2,
} from "lucide-react";
import { ProfileSection } from "@/components/common/ProfileSection";
import { SkillBadge } from "@/components/common/SkillBadge";
import { Modal } from "@/components/common/Modal";
import { LoadingState } from "@/components/common/LoadingState";
import { ErrorState } from "@/components/common/ErrorState";
import { EmptyState } from "@/components/common/EmptyState";
import { ProgressBar } from "@/components/common/ProgressBar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProfile } from "@/hooks/use-career-data";
import type { CareerProfile } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/profile")({
  head: () => ({
    meta: [
      { title: "Career profile — CareerPilot AI" },
      { name: "description", content: "Review and edit your personal information, education, skills, experience, projects and interests." },
      { property: "og:title", content: "Career profile — CareerPilot AI" },
      { property: "og:description", content: "Your editable, structured career profile." },
    ],
  }),
  component: ProfilePage,
});

type EditKey = "personal" | "summary" | "skills" | "interests" | null;

function ProfilePage() {
  const { data, isLoading, isError, refetch } = useProfile();
  /** Local-only mock state — no persistence until the backend exists. */
  const [profile, setProfile] = useState<CareerProfile | null>(null);
  const [editing, setEditing] = useState<EditKey>(null);
  const [draft, setDraft] = useState({ fullName: "", email: "", headline: "", location: "", summary: "", skills: "", interests: "" });

  useEffect(() => {
    if (data) setProfile(data);
  }, [data]);

  if (isLoading || (!profile && !isError)) return <LoadingState title="Loading your profile" />;
  if (isError || !profile) return <ErrorState onRetry={() => refetch()} />;

  const p = profile;

  const openEdit = (key: Exclude<EditKey, null>) => {
    setDraft({
      fullName: p.user.fullName,
      email: p.user.email,
      headline: p.user.headline,
      location: p.user.location,
      summary: p.professionalSummary,
      skills: p.skills.map((s) => s.name).join(", "),
      interests: p.careerInterests.join(", "),
    });
    setEditing(key);
  };

  const save = () => {
    setProfile((prev) => {
      if (!prev) return prev;
      if (editing === "personal") {
        return { ...prev, user: { ...prev.user, fullName: draft.fullName, email: draft.email, headline: draft.headline, location: draft.location } };
      }
      if (editing === "summary") return { ...prev, professionalSummary: draft.summary };
      if (editing === "skills") {
        return {
          ...prev,
          skills: draft.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
            .map((name) => prev.skills.find((s) => s.name === name) ?? { name, level: "Intermediate" as const, category: "Other" }),
        };
      }
      if (editing === "interests") {
        return { ...prev, careerInterests: draft.interests.split(",").map((s) => s.trim()).filter(Boolean) };
      }
      return prev;
    });
    setEditing(null);
    toast.success("Saved locally", { description: "Demo state only — persistence arrives with the backend." });
  };

  const notEditable = () =>
    toast("Structured editing for this section ships with the backend.", {
      description: "The layout and forms are ready to connect.",
    });

  return (
    <div className="space-y-8">
      <header className="surface-panel flex flex-wrap items-center justify-between gap-6 p-6">
        <div className="flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-accent-soft font-display text-lg font-semibold text-accent" aria-hidden="true">
            {p.user.fullName.split(" ").map((n) => n[0]).join("")}
          </span>
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">{p.user.fullName}</h1>
            <p className="text-sm text-muted-foreground">{p.user.headline}</p>
            <p className="text-xs text-muted-foreground">{p.user.location}</p>
          </div>
        </div>
        <div className="w-full max-w-xs">
          <ProgressBar label="Profile completion" value={p.completion} showValue />
        </div>
      </header>

      <ProfileSection title="Personal Information" icon={<UserRound className="size-4" />} onEdit={() => openEdit("personal")}>
        <dl className="grid gap-4 sm:grid-cols-2">
          {[
            ["Full name", p.user.fullName],
            ["Email", p.user.email],
            ["Headline", p.user.headline],
            ["Location", p.user.location],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k}</dt>
              <dd className="mt-1 text-sm text-foreground">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Professional summary</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.professionalSummary}</p>
          <button
            type="button"
            onClick={() => openEdit("summary")}
            className="mt-2 text-xs font-medium text-accent underline-offset-4 hover:underline"
          >
            Edit summary
          </button>
        </div>
      </ProfileSection>

      <ProfileSection title="Skills" icon={<Wand2 className="size-4" />} onEdit={() => openEdit("skills")}>
        <div className="flex flex-wrap gap-2">
          {p.skills.map((s) => (
            <SkillBadge key={s.name} name={s.name} level={s.level} />
          ))}
        </div>
      </ProfileSection>

      <div className="grid gap-6 lg:grid-cols-2">
        <ProfileSection title="Education" icon={<GraduationCap className="size-4" />} onEdit={notEditable}>
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

        <ProfileSection title="Certifications" icon={<BadgeCheck className="size-4" />} onEdit={notEditable}>
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
            <EmptyState title="No certifications" description="Add one to strengthen your profile." />
          )}
        </ProfileSection>
      </div>

      <ProfileSection title="Experience" icon={<Briefcase className="size-4" />} onEdit={notEditable}>
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

      <ProfileSection title="Projects" icon={<FolderGit2 className="size-4" />} onEdit={notEditable}>
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

      <div className="grid gap-6 lg:grid-cols-2">
        <ProfileSection title="Languages" icon={<Languages className="size-4" />} onEdit={notEditable}>
          <ul className="space-y-2">
            {p.languages.map((l) => (
              <li key={l.name} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{l.name}</span>
                <span className="text-muted-foreground">{l.proficiency}</span>
              </li>
            ))}
          </ul>
        </ProfileSection>

        <ProfileSection title="Career Interests" icon={<Target className="size-4" />} onEdit={() => openEdit("interests")}>
          <div className="flex flex-wrap gap-2">
            {p.careerInterests.map((i) => (
              <SkillBadge key={i} name={i} />
            ))}
          </div>
        </ProfileSection>
      </div>

      <Modal
        open={editing === "personal"}
        onOpenChange={(o) => setEditing(o ? "personal" : null)}
        title="Edit personal information"
        description="Changes are held in local demo state."
        onSubmit={save}
      >
        <div className="space-y-2">
          <Label htmlFor="edit-name">Full name</Label>
          <Input id="edit-name" value={draft.fullName} onChange={(e) => setDraft({ ...draft, fullName: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-email">Email</Label>
          <Input id="edit-email" type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-headline">Headline</Label>
          <Input id="edit-headline" value={draft.headline} onChange={(e) => setDraft({ ...draft, headline: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-location">Location</Label>
          <Input id="edit-location" value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} />
        </div>
      </Modal>

      <Modal
        open={editing === "summary"}
        onOpenChange={(o) => setEditing(o ? "summary" : null)}
        title="Edit professional summary"
        onSubmit={save}
      >
        <div className="space-y-2">
          <Label htmlFor="edit-summary">Professional summary</Label>
          <Textarea id="edit-summary" rows={6} value={draft.summary} onChange={(e) => setDraft({ ...draft, summary: e.target.value })} />
        </div>
      </Modal>

      <Modal
        open={editing === "skills"}
        onOpenChange={(o) => setEditing(o ? "skills" : null)}
        title="Edit skills"
        description="Comma-separated list."
        onSubmit={save}
      >
        <div className="space-y-2">
          <Label htmlFor="edit-skills">Skills</Label>
          <Textarea id="edit-skills" rows={4} value={draft.skills} onChange={(e) => setDraft({ ...draft, skills: e.target.value })} />
        </div>
      </Modal>

      <Modal
        open={editing === "interests"}
        onOpenChange={(o) => setEditing(o ? "interests" : null)}
        title="Edit career interests"
        description="Comma-separated list."
        onSubmit={save}
      >
        <div className="space-y-2">
          <Label htmlFor="edit-interests">Career interests</Label>
          <Textarea id="edit-interests" rows={3} value={draft.interests} onChange={(e) => setDraft({ ...draft, interests: e.target.value })} />
        </div>
      </Modal>
    </div>
  );
}
