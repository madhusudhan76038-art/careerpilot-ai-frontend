import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Compact KPI tile used across the dashboard. */
export function DashboardCard({
  label,
  value,
  hint,
  icon,
  footer,
  className,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "surface-panel flex flex-col gap-3 p-5 transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {icon ? (
          <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent" aria-hidden="true">
            {icon}
          </span>
        ) : null}
      </div>
      <p className="font-display text-3xl font-semibold tracking-tight text-foreground">{value}</p>
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      {footer}
    </div>
  );
}
