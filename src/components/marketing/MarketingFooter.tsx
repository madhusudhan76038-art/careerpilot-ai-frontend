import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/common/Logo";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            An AI career agent that turns your resume into a clear, personalized plan for what comes next.
          </p>
        </div>
        <nav aria-label="Product">
          <h3 className="text-sm font-semibold text-foreground">Product</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><a href="/#features" className="transition-colors hover:text-foreground">Features</a></li>
            <li><a href="/#how-it-works" className="transition-colors hover:text-foreground">How it works</a></li>
            <li><Link to="/dashboard" className="transition-colors hover:text-foreground">Dashboard</Link></li>
          </ul>
        </nav>
        <nav aria-label="Legal">
          <h3 className="text-sm font-semibold text-foreground">Legal</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/privacy" className="transition-colors hover:text-foreground">Privacy</Link></li>
            <li><Link to="/terms" className="transition-colors hover:text-foreground">Terms</Link></li>
          </ul>
        </nav>
        <nav aria-label="Company">
          <h3 className="text-sm font-semibold text-foreground">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/contact" className="transition-colors hover:text-foreground">Contact</Link></li>
            <li><Link to="/signup" className="transition-colors hover:text-foreground">Create account</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto w-full max-w-6xl px-5 py-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} CareerPilot AI. Demo interface — no live data is processed.
        </p>
      </div>
    </footer>
  );
}
