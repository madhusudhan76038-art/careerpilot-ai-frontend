import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { LoadingState } from "@/components/common/LoadingState";
import { ErrorState } from "@/components/common/ErrorState";
import { EmptyState } from "@/components/common/EmptyState";
import { SkillBadge } from "@/components/common/SkillBadge";
import { ProgressBar } from "@/components/common/ProgressBar";
import { useCareerSuggestions } from "@/hooks/use-career-data";

export const Route = createFileRoute("/dashboard/suggestions")({
  head: () => ({
    meta: [
      { title: "Career suggestions — CareerPilot AI" },
      { name: "description", content: "Role directions matched to your experience, with the skills you'd need to close the gap." },
      { property: "og:title", content: "Career suggestions — CareerPilot AI" },
      { property: "og:description", content: "Roles matched to your real experience." },
    ],
  }),
  component: SuggestionsPage,
});

function SuggestionsPage() {
  const { data, isLoading, isError, refetch } = useCareerSuggestions();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Career Suggestions
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Matched to the profile built from your resume.</p>
      </header>

      {isLoading ? <LoadingState title="Matching roles" /> : null}
      {isError ? <ErrorState onRetry={() => refetch()} /> : null}
      {data && data.length === 0 ? (
        <EmptyState
          icon={<Sparkles className="size-5" />}
          title="No suggestions yet"
          description="Upload a resume to unlock matched career directions."
        />
      ) : null}

      {data && data.length > 0 ? (
        <ul className="grid gap-5 lg:grid-cols-2">
          {data.map((s) => (
            <li key={s.id} className="surface-panel p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-foreground">{s.title}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">{s.salaryRange}</p>
                </div>
                <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                  {s.matchScore}% match
                </span>
              </div>
              <ProgressBar className="mt-4" value={s.matchScore} />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Skills to close</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {s.missingSkills.map((m) => (
                    <SkillBadge key={m} name={m} />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
