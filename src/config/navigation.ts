import { LayoutDashboard, FileText, UserRound, Sparkles, Settings, Briefcase, MessagesSquare, Mic } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
  /** Future modules are rendered disabled with a "Soon" badge. */
  soon?: boolean;
};

export type NavGroup = { title: string; items: NavItem[] };

/**
 * Sidebar navigation config. Future agent modules (Job Matching,
 * Career Coach, Mock Interview, Recruiter, Email, Application) slot in
 * here without touching the layout component.
 */
export const navGroups: NavGroup[] = [
  {
    title: "Workspace",
    items: [
      { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
      { label: "My Resume", to: "/dashboard/resume", icon: FileText },
      { label: "Career Profile", to: "/dashboard/profile", icon: UserRound },
      { label: "Career Suggestions", to: "/dashboard/suggestions", icon: Sparkles },
    ],
  },
  {
    title: "Coming soon",
    items: [
      { label: "Job Matching", to: "/dashboard", icon: Briefcase, soon: true },
      { label: "Career Coach", to: "/dashboard", icon: MessagesSquare, soon: true },
      { label: "Mock Interview", to: "/dashboard", icon: Mic, soon: true },
    ],
  },
  {
    title: "Account",
    items: [{ label: "Settings", to: "/dashboard/settings", icon: Settings }],
  },
];
