import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function LoadingState({
  title = "Loading",
  description = "Fetching your data…",
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card px-6 py-14 text-center",
        className,
      )}
    >
      <Loader2 className="size-6 animate-spin text-accent" aria-hidden="true" />
      <p className="font-medium text-foreground">{title}</p>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
