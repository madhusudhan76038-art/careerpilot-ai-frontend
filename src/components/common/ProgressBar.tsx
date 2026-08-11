import { cn } from "@/lib/utils";

/** Accessible horizontal progress bar built on the design tokens. */
export function ProgressBar({
  value,
  label,
  showValue = false,
  className,
  tone = "accent",
}: {
  value: number;
  label?: string;
  showValue?: boolean;
  className?: string;
  tone?: "accent" | "success" | "warning";
}) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const toneClass =
    tone === "success" ? "bg-success" : tone === "warning" ? "bg-warning" : "bg-accent";

  return (
    <div className={cn("w-full", className)}>
      {label || showValue ? (
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-muted-foreground">
          {label ? <span>{label}</span> : <span />}
          {showValue ? <span className="text-foreground">{clamped}%</span> : null}
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progress"}
        className="h-2 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className={cn("h-full rounded-full transition-[width] duration-700 ease-out", toneClass)}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
