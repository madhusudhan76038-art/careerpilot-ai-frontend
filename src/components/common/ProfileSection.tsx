import type { ReactNode } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Titled panel used for every career-profile / analysis section. */
export function ProfileSection({
  title,
  description,
  icon,
  onEdit,
  editLabel = "Edit",
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  onEdit?: () => void;
  editLabel?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("surface-panel p-6", className)} aria-labelledby={`section-${title.replace(/\s+/g, "-").toLowerCase()}`}>
      <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {icon ? (
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent" aria-hidden="true">
              {icon}
            </span>
          ) : null}
          <div>
            <h2
              id={`section-${title.replace(/\s+/g, "-").toLowerCase()}`}
              className="text-base font-semibold text-foreground"
            >
              {title}
            </h2>
            {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
          </div>
        </div>
        {action ??
          (onEdit ? (
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Pencil className="size-3.5" aria-hidden="true" />
              {editLabel} <span className="sr-only">{title}</span>
            </Button>
          ) : null)}
      </header>
      {children}
    </section>
  );
}
