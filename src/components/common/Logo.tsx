import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className, to = "/" }: { className?: string; to?: string }) {
  return (
    <Link to={to} className={cn("group inline-flex items-center gap-2.5", className)} aria-label="CareerPilot AI home">
      <span className="relative flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l7 6-4.2 1.4L12 21l-2.8-10.6L5 9z" />
        </svg>
      </span>
      <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
        CareerPilot <span className="text-accent">AI</span>
      </span>
    </Link>
  );
}
