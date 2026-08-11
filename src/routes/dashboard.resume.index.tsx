import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { ResumeUploader } from "@/components/resume/ResumeUploader";
import { Button } from "@/components/ui/button";
import { mockResumeAnalysis } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/resume/")({
  head: () => ({
    meta: [
      { title: "Upload your resume — CareerPilot AI" },
      { name: "description", content: "Upload a PDF or DOCX resume and let CareerPilot AI analyze and structure it." },
      { property: "og:title", content: "Upload your resume — CareerPilot AI" },
      { property: "og:description", content: "Upload a PDF or DOCX resume for AI analysis." },
    ],
  }),
  component: ResumeUploadPage,
});

function ResumeUploadPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">My Resume</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          One upload builds your score, your skills and your career profile.
        </p>
      </header>

      <ResumeUploader onComplete={() => navigate({ to: "/dashboard/resume/analysis" })} />

      <div className="surface-panel flex flex-wrap items-center justify-between gap-4 p-6">
        <div className="flex items-start gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent" aria-hidden="true">
            <ShieldCheck className="size-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">Your resume stays private</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Used only to build your profile. Delete it any time from Settings → Privacy.
            </p>
          </div>
        </div>
      </div>

      <div className="surface-panel flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <p className="text-sm font-semibold text-foreground">Latest analysis</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {mockResumeAnalysis.fileName} · score {mockResumeAnalysis.score}/100
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/dashboard/resume/analysis">
            View analysis <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
