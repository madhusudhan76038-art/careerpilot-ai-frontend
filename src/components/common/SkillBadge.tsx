import { cn } from "@/lib/utils";
import type { Skill } from "@/lib/mock-data";

const levelStyles: Record<Skill["level"], string> = {
  Beginner: "bg-muted text-muted-foreground border-border",
  Intermediate: "bg-secondary text-secondary-foreground border-border",
  Advanced: "bg-accent-soft text-accent border-accent/30",
  Expert: "bg-accent text-accent-foreground border-accent",
};

export function SkillBadge({
  name,
  level,
  className,
}: {
  name: string;
  level?: Skill["level"];
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        level ? levelStyles[level] : "border-border bg-secondary text-secondary-foreground",
        className,
      )}
    >
      {name}
      {level ? <span className="opacity-70">· {level}</span> : null}
    </span>
  );
}
