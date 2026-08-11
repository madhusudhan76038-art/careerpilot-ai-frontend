import type { ReactNode } from "react";
import { MarketingNavbar } from "@/components/marketing/MarketingNavbar";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";

export function LegalPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNavbar />
      <main className="mx-auto w-full max-w-3xl px-5 py-16 lg:py-24">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{intro}</p>
        <div className="mt-10 space-y-8">{children}</div>
      </main>
      <MarketingFooter />
    </div>
  );
}

export function LegalBlock({ heading, body }: { heading: string; body: string }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground">{heading}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </section>
  );
}
