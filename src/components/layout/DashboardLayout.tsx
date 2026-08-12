import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Menu } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navGroups } from "@/config/navigation";
import { mockUser } from "@/lib/mock-data";
import { logOut } from "@/services/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4" aria-label="Dashboard">
      {navGroups.map((group) => (
        <div key={group.title}>
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {group.title}
          </p>
          <ul className="space-y-1">
            {group.items.map((item) => (
              <li key={`${group.title}-${item.label}`}>
                {item.soon ? (
                  <span
                    aria-disabled="true"
                    className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground/70"
                  >
                    <item.icon className="size-4 shrink-0" aria-hidden="true" />
                    <span className="flex-1">{item.label}</span>
                    <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase">Soon</span>
                  </span>
                ) : (
                  <Link
                    to={item.to}
                    onClick={onNavigate}
                    activeOptions={{ exact: true }}
                    activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground" }}
                    inactiveProps={{ className: "text-sidebar-foreground hover:bg-secondary" }}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
                  >
                    <item.icon className="size-4 shrink-0" aria-hidden="true" />
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function SidebarFooter() {
  const navigate = useNavigate();
  return (
    <div className="border-t border-sidebar-border p-3">
      <div className="flex items-center gap-3 rounded-xl px-2 py-2">
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent"
          aria-hidden="true"
        >
          {mockUser.fullName.split(" ").map((n) => n[0]).join("")}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-sidebar-foreground">{mockUser.fullName}</p>
          <p className="truncate text-xs text-muted-foreground">{mockUser.email}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        className="mt-1 w-full justify-start text-muted-foreground"
        onClick={async () => {
          await logOut();
          toast("Signed out");
          navigate({ to: "/login", replace: true });
        }}
      >
        <LogOut className="size-4" aria-hidden="true" />
        Log out
      </Button>
    </div>
  );
}

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <div className="flex h-16 items-center border-b border-sidebar-border px-5">
          <Logo to="/dashboard" />
        </div>
        <SidebarNav />
        <SidebarFooter />
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="min-h-11 min-w-11 lg:hidden" aria-label="Open navigation">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 bg-sidebar p-0">
                <SheetTitle className="sr-only">Dashboard navigation</SheetTitle>
                <div className="flex h-16 items-center border-b border-sidebar-border px-5">
                  <Logo to="/dashboard" />
                </div>
                <div className="flex h-[calc(100%-4rem)] flex-col">
                  <SidebarNav onNavigate={() => setOpen(false)} />
                  <SidebarFooter />
                </div>
              </SheetContent>
            </Sheet>
            <span className="font-display text-sm font-semibold text-foreground lg:hidden">CareerPilot AI</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button size="sm" asChild>
              <Link to="/dashboard/resume">Upload resume</Link>
            </Button>
          </div>
        </header>

        <main className={cn("mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8")}>{children}</main>
      </div>
    </div>
  );
}
