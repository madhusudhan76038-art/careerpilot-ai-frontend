import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalBlock } from "@/components/marketing/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — CareerPilot AI" },
      { name: "description", content: "How CareerPilot AI handles resumes and career data: encryption, no resale, and deletion on request." },
      { property: "og:title", content: "Privacy — CareerPilot AI" },
      { property: "og:description", content: "How CareerPilot AI handles your resume and career data." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Privacy"
      intro="A plain-language summary of how CareerPilot AI intends to handle your career data. This is placeholder policy copy for the demo build."
    >
      <LegalBlock heading="What we collect" body="Your account details and any resume you choose to upload, plus the structured profile derived from it." />
      <LegalBlock heading="How it is used" body="Only to analyze your resume, build your career profile, and generate suggestions for you. Nothing is sold or shared with recruiters." />
      <LegalBlock heading="Storage and encryption" body="Documents are encrypted in transit and at rest, and scoped to your account." />
      <LegalBlock heading="Deletion" body="You can delete an individual resume or your entire account. Deleting the account removes the derived profile and analyses." />
      <LegalBlock heading="Contact" body="Privacy questions can be sent through the contact page." />
    </LegalPage>
  ),
});
