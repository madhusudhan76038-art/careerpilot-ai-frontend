import { useCallback, useRef, useState } from "react";
import { UploadCloud, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileUploadProgress, formatBytes } from "@/components/common/FileUploadProgress";
import { ErrorState } from "@/components/common/ErrorState";
import { uploadResume, type UploadStage } from "@/services/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const MAX_BYTES = 8 * 1024 * 1024;
const ACCEPTED = [".pdf", ".docx"];

function validate(file: File): string | null {
  const ok = ACCEPTED.some((ext) => file.name.toLowerCase().endsWith(ext));
  if (!ok) return "Only PDF and DOCX files are supported.";
  if (file.size > MAX_BYTES) return "That file is larger than the 8 MB limit.";
  return null;
}

export function ResumeUploader({ onComplete }: { onComplete?: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [stage, setStage] = useState<UploadStage>("idle");
  const [percent, setPercent] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback((selected: File) => {
    const problem = validate(selected);
    if (problem) {
      setError(problem);
      setFile(null);
      toast.error(problem);
      return;
    }
    setError(null);
    setStage("idle");
    setPercent(0);
    setFile(selected);
  }, []);

  const start = useCallback(async () => {
    if (!file) return;
    setError(null);
    setStage("uploading");
    try {
      await uploadResume(file, {
        onProgress: (p, s) => {
          setPercent(p);
          setStage(s);
        },
      });
      setStage("complete");
      toast.success("Analysis complete", { description: "Your resume analysis is ready to review." });
      onComplete?.();
    } catch {
      setStage("error");
      setError("We couldn't process that resume. Please try again.");
    }
  }, [file, onComplete]);

  const reset = () => {
    setFile(null);
    setStage("idle");
    setPercent(0);
    setError(null);
  };

  const busy = stage === "uploading" || stage === "analyzing";

  return (
    <div className="flex flex-col gap-5">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const dropped = e.dataTransfer.files?.[0];
          if (dropped) handleFile(dropped);
        }}
        className={cn(
          "flex flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 py-14 text-center transition-colors duration-300",
          dragging ? "border-accent bg-accent-soft" : "border-border bg-card",
        )}
      >
        <span className="flex size-14 items-center justify-center rounded-2xl bg-accent-soft text-accent" aria-hidden="true">
          <UploadCloud className="size-7" />
        </span>
        <h2 className="mt-4 font-display text-xl font-semibold text-foreground">Upload your resume</h2>
        <p className="mt-1 text-sm text-muted-foreground">Upload PDF or DOCX — or drag and drop it here.</p>
        <p className="mt-1 text-xs text-muted-foreground">Maximum file size: 8 MB</p>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          className="sr-only"
          id="resume-file-input"
          onChange={(e) => {
            const selected = e.target.files?.[0];
            if (selected) handleFile(selected);
          }}
        />
        <Button className="mt-6" onClick={() => inputRef.current?.click()} disabled={busy}>
          Choose File
        </Button>

        <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full border border-border px-2.5 py-1 font-medium">PDF</span>
          <span className="rounded-full border border-border px-2.5 py-1 font-medium">DOCX</span>
        </div>
      </div>

      {error && !file ? <ErrorState title="File not accepted" description={error} /> : null}

      {file ? (
        <div className="flex flex-col gap-4">
          <FileUploadProgress
            fileName={file.name}
            fileSize={file.size}
            stage={stage}
            percent={percent}
            onRemove={busy ? undefined : reset}
          />
          {stage === "error" ? (
            <ErrorState description={error ?? "Upload failed."} onRetry={start} />
          ) : null}
          <div className="flex flex-wrap items-center gap-3">
            {stage === "idle" ? (
              <>
                <Button onClick={start}>Start analysis</Button>
                <p className="text-xs text-muted-foreground">
                  {file.name} · {formatBytes(file.size)} ready to analyze
                </p>
              </>
            ) : null}
            {stage === "complete" ? (
              <p className="inline-flex items-center gap-2 text-sm font-medium text-success">
                <CheckCircle2 className="size-4" aria-hidden="true" /> Analysis complete
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
