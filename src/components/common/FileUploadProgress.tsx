import { FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/common/ProgressBar";
import type { UploadStage } from "@/services/api";

const stageCopy: Record<Exclude<UploadStage, "idle">, string> = {
  uploading: "Uploading…",
  analyzing: "Analyzing…",
  complete: "Analysis complete",
  error: "Upload failed",
};

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/** File card + progress for the resume upload flow. */
export function FileUploadProgress({
  fileName,
  fileSize,
  stage,
  percent,
  onRemove,
}: {
  fileName: string;
  fileSize: number;
  stage: UploadStage;
  percent: number;
  onRemove?: (() => void) | undefined;
}) {
  const tone = stage === "error" ? "warning" : stage === "complete" ? "success" : "accent";

  return (
    <div className="surface-panel flex flex-col gap-4 p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent" aria-hidden="true">
          <FileText className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">{fileName}</p>
          <p className="text-xs text-muted-foreground">
            {formatBytes(fileSize)}
            {stage !== "idle" ? ` · ${stageCopy[stage]}` : ""}
          </p>
        </div>
        {onRemove ? (
          <Button variant="ghost" size="icon" aria-label="Remove file" className="min-h-11 min-w-11" onClick={onRemove}>
            <X className="size-4" />
          </Button>
        ) : null}
      </div>
      <ProgressBar
        value={stage === "analyzing" || stage === "complete" ? 100 : percent}
        tone={tone}
        showValue={stage === "uploading"}
      />
    </div>
  );
}
