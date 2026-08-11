import { cn } from "@/lib/utils";

/** Circular score indicator (0-100). Pure SVG, no chart dependency. */
export function ScoreCard({
  score,
  max = 100,
  label = "Resume Score",
  caption,
  size = 168,
  className,
}: {
  score: number;
  max?: number;
  label?: string;
  caption?: string;
  size?: number;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(1, score / max));
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label={`${label}: ${score} out of ${max}`}
          className="-rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            strokeWidth={stroke}
            className="stroke-muted"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - pct)}
            className="stroke-accent transition-[stroke-dashoffset] duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-4xl font-semibold text-foreground">{score}</span>
          <span className="text-xs text-muted-foreground">out of {max}</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        {caption ? <p className="mt-1 max-w-xs text-xs text-muted-foreground">{caption}</p> : null}
      </div>
    </div>
  );
}
