import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { logIn } from "@/services/api";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — CareerPilot AI" },
      { name: "description", content: "Log in to CareerPilot AI to review your resume analysis and career profile." },
      { property: "og:title", content: "Log in — CareerPilot AI" },
      { property: "og:description", content: "Log in to your CareerPilot AI career workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next["email"] = "Enter a valid email address.";
    if (!values.password) next["password"] = "Enter your password.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    // FUTURE: Supabase Auth signInWithPassword happens inside services/api.ts
    await logIn(values);
    setLoading(false);
    toast.success("Signed in (demo)");
    navigate({ to: "/dashboard" });
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to pick up your career profile."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-accent underline-offset-4 hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            aria-invalid={!!errors["email"]}
          />
          {errors["email"] ? <p className="text-xs text-destructive">{errors["email"]}</p> : null}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <button
              type="button"
              onClick={() => toast("Password reset arrives with authentication.")}
              className="text-xs font-medium text-accent underline-offset-4 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={values.password}
            onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
            aria-invalid={!!errors["password"]}
          />
          {errors["password"] ? <p className="text-xs text-destructive">{errors["password"]}</p> : null}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
          Log In
        </Button>
      </form>
    </AuthShell>
  );
}
