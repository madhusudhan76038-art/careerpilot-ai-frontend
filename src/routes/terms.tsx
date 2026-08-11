import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalBlock } from "@/components/marketing/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — CareerPilot AI" },
      { name: "description", content: "Terms of use for the CareerPilot AI career analysis platform." },
      { property: "og:title", content: "Terms — CareerPilot AI" },
      { property: "og:description", content: "Terms of use for CareerPilot AI." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Terms"
      intro="Placeholder terms of use for the CareerPilot AI demo build. Final terms will be published before launch."
    >
      <LegalBlock heading="Using the service" body="You may use CareerPilot AI to analyze resumes you own or are authorized to upload." />
      <LegalBlock heading="AI-generated output" body="Scores, suggestions and roadmaps are guidance, not guarantees of employment outcomes." />
      <LegalBlock heading="Your content" body="You keep ownership of everything you upload. You grant us only the permission needed to process it for you." />
      <LegalBlock heading="Acceptable use" body="Do not upload other people's documents without consent, or attempt to disrupt the service." />
      <LegalBlock heading="Changes" body="We will note material changes to these terms in-product before they take effect." />
    </LegalPage>
  ),
});
