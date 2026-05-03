import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

// Mirrors src/server/admin-config.server.ts — keep in sync.
const ADMIN_EMAILS = ["mckevin.ayaba@gmail.com"];
const isAdmin = (email?: string | null) =>
  !!email && ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(email.toLowerCase());

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Access — kayaa" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

const credsSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(200),
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Auto-redirect if already signed in as admin
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const e = data.session?.user?.email;
      if (e && isAdmin(e)) {
        navigate({ to: "/admin/waitlist" });
      }
    });
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    const parsed = credsSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    if (!isAdmin(parsed.data.email)) {
      setError("This email isn't authorised for admin access.");
      return;
    }

    setBusy(true);
    try {
      if (mode === "signup") {
        const { error: signUpErr } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (signUpErr) throw signUpErr;
        // Try immediate sign-in (works if email confirmation is disabled)
        const { error: signInErr } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (signInErr) {
          setInfo("Account created. Check your email to confirm, then sign in.");
          setMode("signin");
          return;
        }
        navigate({ to: "/admin/waitlist" });
      } else {
        const { error: signInErr } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (signInErr) throw signInErr;
        navigate({ to: "/admin/waitlist" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#0D1117",
        color: "#F0F6FC",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        <Link
          to="/"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 22,
            color: "#39D98A",
            textDecoration: "none",
            display: "block",
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          kayaa
        </Link>

        <div
          style={{
            background: "#0F141A",
            border: "1px solid #21262D",
            borderRadius: 14,
            padding: "32px 28px",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 26,
              margin: 0,
              textAlign: "center",
            }}
          >
            Admin Access
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 14,
              textAlign: "center",
              margin: "6px 0 26px",
            }}
          >
            kayaa management only
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                required
                placeholder="Enter admin email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                style={inputStyle}
                autoComplete="email"
              />
            </div>
            <div>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                required
                minLength={8}
                placeholder="Enter password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                style={inputStyle}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
              />
            </div>

            {error && (
              <p style={{ color: "#FF7A7A", fontSize: 13, margin: 0 }}>{error}</p>
            )}
            {info && (
              <p style={{ color: "#39D98A", fontSize: 13, margin: 0 }}>{info}</p>
            )}

            <button
              type="submit"
              disabled={busy}
              style={{
                marginTop: 6,
                padding: "13px 16px",
                background: "#39D98A",
                color: "#0D1117",
                border: "none",
                borderRadius: 8,
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: 15,
                cursor: busy ? "not-allowed" : "pointer",
              }}
            >
              {busy ? "Please wait…" : mode === "signin" ? "Login" : "Create admin account"}
            </button>
          </form>

          <p
            style={{
              marginTop: 18,
              fontSize: 13,
              color: "rgba(255,255,255,0.55)",
              textAlign: "center",
            }}
          >
            {mode === "signin" ? "First time? " : "Already set up? "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setError(null);
                setInfo(null);
              }}
              style={{
                background: "none",
                border: "none",
                color: "#39D98A",
                cursor: "pointer",
                fontSize: 13,
                padding: 0,
                textDecoration: "underline",
              }}
            >
              {mode === "signin" ? "Set admin password" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontFamily: "var(--font-body)",
  fontWeight: 600,
  fontSize: 13,
  color: "#F0F6FC",
  marginBottom: 6,
} as const;

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  background: "#0B1016",
  color: "#F0F6FC",
  border: "1px solid #21262D",
  borderRadius: 8,
  fontFamily: "var(--font-body)",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
} as const;
