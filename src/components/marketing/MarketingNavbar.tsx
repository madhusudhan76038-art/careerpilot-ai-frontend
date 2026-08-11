import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "Security", href: "/#security" },
];

export function MarketingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5" aria-label="Main">
        <Logo />
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="min-h-11 min-w-11" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-6">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="mt-6 flex flex-col gap-1">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <Button variant="outline" asChild onClick={() => setOpen(false)}>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild onClick={() => setOpen(false)}>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
