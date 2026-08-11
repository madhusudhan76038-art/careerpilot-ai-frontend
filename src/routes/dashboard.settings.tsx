import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bell, Lock, Palette, ShieldCheck, Trash2, UserRound } from "lucide-react";
import { ProfileSection } from "@/components/common/ProfileSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTheme } from "@/hooks/use-theme";
import { mockUser } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({
    meta: [
      { title: "Settings — CareerPilot AI" },
      { name: "description", content: "Manage your profile, account, privacy, notifications, appearance and security settings." },
      { property: "og:title", content: "Settings — CareerPilot AI" },
      { property: "og:description", content: "Manage your CareerPilot AI account settings." },
    ],
  }),
  component: SettingsPage,
});

function Row({ title, description, control }: { title: string; description: string; control: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6 py-4">
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="shrink-0 pt-1">{control}</div>
    </div>
  );
}

function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({ analysis: true, suggestions: true, product: false });
  const [privacy, setPrivacy] = useState({ retainResume: true, improveModels: false });
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Settings</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Manage your account, privacy and appearance.</p>
      </header>

      <ProfileSection title="Profile" icon={<UserRound className="size-4" />}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="set-name">Full name</Label>
            <Input id="set-name" defaultValue={mockUser.fullName} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="set-headline">Headline</Label>
            <Input id="set-headline" defaultValue={mockUser.headline} />
          </div>
        </div>
        <Button className="mt-5" onClick={() => toast.success("Saved locally (demo)")}>
          Save profile
        </Button>
      </ProfileSection>

      <ProfileSection title="Account" icon={<Lock className="size-4" />}>
        <div className="space-y-2">
          <Label htmlFor="set-email">Email</Label>
          <Input id="set-email" type="email" defaultValue={mockUser.email} />
          <p className="text-xs text-muted-foreground">Email changes will require verification once authentication is connected.</p>
        </div>
      </ProfileSection>

      <ProfileSection title="Privacy" icon={<ShieldCheck className="size-4" />} description="You control how your career data is stored.">
        <div className="divide-y divide-border">
          <Row
            title="Keep my uploaded resumes"
            description="Turn off to delete resume files after analysis and keep only the structured profile."
            control={
              <Switch
                checked={privacy.retainResume}
                onCheckedChange={(v) => setPrivacy((s) => ({ ...s, retainResume: v }))}
                aria-label="Keep my uploaded resumes"
              />
            }
          />
          <Row
            title="Help improve analysis quality"
            description="Off by default. Your documents are never used for training unless you opt in."
            control={
              <Switch
                checked={privacy.improveModels}
                onCheckedChange={(v) => setPrivacy((s) => ({ ...s, improveModels: v }))}
                aria-label="Help improve analysis quality"
              />
            }
          />
        </div>
      </ProfileSection>

      <ProfileSection title="Notifications" icon={<Bell className="size-4" />}>
        <div className="divide-y divide-border">
          <Row
            title="Analysis complete"
            description="Email me when a resume analysis finishes."
            control={<Switch checked={notifications.analysis} onCheckedChange={(v) => setNotifications((s) => ({ ...s, analysis: v }))} aria-label="Analysis complete emails" />}
          />
          <Row
            title="New career suggestions"
            description="Notify me when new role matches appear."
            control={<Switch checked={notifications.suggestions} onCheckedChange={(v) => setNotifications((s) => ({ ...s, suggestions: v }))} aria-label="Career suggestion emails" />}
          />
          <Row
            title="Product updates"
            description="Occasional updates about new agents and features."
            control={<Switch checked={notifications.product} onCheckedChange={(v) => setNotifications((s) => ({ ...s, product: v }))} aria-label="Product update emails" />}
          />
        </div>
      </ProfileSection>

      <ProfileSection title="Appearance" icon={<Palette className="size-4" />}>
        <Row
          title="Dark mode"
          description="Switch between the light and dark interface."
          control={
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(v) => setTheme(v ? "dark" : "light")}
              aria-label="Dark mode"
            />
          }
        />
      </ProfileSection>

      <ProfileSection title="Security" icon={<Lock className="size-4" />}>
        <div className="space-y-2">
          <Label htmlFor="set-password">New password</Label>
          <Input id="set-password" type="password" placeholder="••••••••" autoComplete="new-password" />
          <p className="text-xs text-muted-foreground">Password management activates with authentication.</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">Delete account</p>
            <p className="mt-1 text-sm text-muted-foreground">Permanently removes your profile, resumes and analyses.</p>
          </div>
          <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
            <Trash2 className="size-4" aria-hidden="true" />
            Delete Account
          </Button>
        </div>
      </ProfileSection>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete your account?</AlertDialogTitle>
            <AlertDialogDescription>
              This would permanently delete your profile, resumes and analyses. Account deletion is not wired up in this
              demo build.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => toast("Deletion is disabled in the demo build.")}>
              I understand
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
