import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { MarketingNavbar } from "@/components/marketing/MarketingNavbar";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — CareerPilot AI" },
      { name: "description", content: "Get in touch with the CareerPilot AI team about the product, privacy, or partnerships." },
      { property: "og:title", content: "Contact — CareerPilot AI" },
      { property: "og:description", content: "Get in touch with the CareerPilot AI team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <MarketingNavbar />
      <main className="mx-auto w-full max-w-3xl px-5 py-16 lg:py-24">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-accent-soft text-accent" aria-hidden="true">
          <Mail className="size-5" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Contact</h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          Questions about the product, your data, or working together? Send a note and we'll come back to you.
        </p>

        <form
          className="surface-panel mt-10 space-y-5 p-6 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            toast.success("Message queued (demo)", { description: "Sending connects with the backend." });
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="c-name">Name</Label>
              <Input id="c-name" required autoComplete="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-email">Email</Label>
              <Input id="c-email" type="email" required autoComplete="email" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="c-message">Message</Label>
            <Textarea id="c-message" rows={5} required />
          </div>
          <Button type="submit">Send message</Button>
          {sent ? (
            <p role="status" className="text-sm text-success">
              Thanks — your message is queued in this demo build.
            </p>
          ) : null}
        </form>
      </main>
      <MarketingFooter />
    </div>
  );
}
