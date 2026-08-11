import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/services/api";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — CareerPilot AI" },
      { name: "description", content: "Create a CareerPilot AI account to analyze your resume and build a personalized career profile." },
      { property: "og:title", content: "Create your account — CareerPilot AI" },
      { property: "og:description", content: "Create a CareerPilot AI account and build your career profile." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!values.fullName.trim()) next["fullName"] = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next["email"] = "Enter a valid email address.";
    if (values.password.length < 8) next["password"] = "Use at least 8 characters.";
    if (values.password !== values.confirmPassword) next["confirmPassword"] = "Passwords don't match.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    // FUTURE: Supabase Auth signUp happens inside services/api.ts
    await signUp({ fullName: values.fullName, email: values.email, password: values.password });
    setLoading(false);
    toast.success("Demo account created", { description: "Authentication is connected later." });
    navigate({ to: "/dashboard" });
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start with your resume — we'll build the profile."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-accent underline-offset-4 hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            autoComplete="name"
            value={values.fullName}
            onChange={set("fullName")}
            aria-invalid={!!errors["fullName"]}
            aria-describedby={errors["fullName"] ? "fullName-error" : undefined}
          />
          {errors["fullName"] ? <p id="fullName-error" className="text-xs text-destructive">{errors["fullName"]}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" value={values.email} onChange={set("email")} aria-invalid={!!errors["email"]} />
          {errors["email"] ? <p className="text-xs text-destructive">{errors["email"]}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" autoComplete="new-password" value={values.password} onChange={set("password")} aria-invalid={!!errors["password"]} />
          {errors["password"] ? <p className="text-xs text-destructive">{errors["password"]}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" autoComplete="new-password" value={values.confirmPassword} onChange={set("confirmPassword")} aria-invalid={!!errors["confirmPassword"]} />
          {errors["confirmPassword"] ? <p className="text-xs text-destructive">{errors["confirmPassword"]}</p> : null}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
          Create Account
        </Button>
      </form>
    </AuthShell>
  );
}
