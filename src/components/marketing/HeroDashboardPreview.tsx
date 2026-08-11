import { Sparkles, FileText, Target } from "lucide-react";
import { ProgressBar } from "@/components/common/ProgressBar";
import { SkillBadge } from "@/components/common/SkillBadge";
import { mockDashboardStats, mockSkills, mockCareerSuggestions } from "@/lib/mock-data";

/** Static hero visual: a stylized preview of the product dashboard (demo data). */
export function HeroDashboardPreview() {
  return (
    <div className="relative">
      <div className="surface-panel overflow-hidden p-5 shadow-[var(--shadow-lift)] sm:p-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Career workspace</p>
            <p className="font-display text-sm font-semibold text-foreground">Profile overview</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent">
            <Sparkles className="size-3" aria-hidden="true" /> Analyzed
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="text-xs text-muted-foreground">Resume Score</p>
            <p className="mt-1 font-display text-2xl font-semibold text-foreground">
              {mockDashboardStats.resumeScore}
              <span className="text-sm text-muted-foreground">/100</span>
            </p>
            <ProgressBar className="mt-3" value={mockDashboardStats.resumeScore} />
          </div>
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="text-xs text-muted-foreground">Profile Completion</p>
            <p className="mt-1 font-display text-2xl font-semibold text-foreground">
              {mockDashboardStats.profileCompletion}%
            </p>
            <ProgressBar className="mt-3" value={mockDashboardStats.profileCompletion} tone="success" />
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-border bg-surface p-4">
          <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <FileText className="size-3.5" aria-hidden="true" /> Skills identified · {mockDashboardStats.skillsIdentified}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {mockSkills.slice(0, 6).map((s) => (
              <SkillBadge key={s.name} name={s.name} />
            ))}
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-border bg-surface p-4">
          <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Target className="size-3.5" aria-hidden="true" /> Career suggestions
          </p>
          <ul className="mt-3 space-y-2.5">
            {mockCareerSuggestions.slice(0, 3).map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3">
                <span className="truncate text-sm font-medium text-foreground">{s.title}</span>
                <span className="shrink-0 text-xs font-semibold text-accent">{s.matchScore}% match</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
