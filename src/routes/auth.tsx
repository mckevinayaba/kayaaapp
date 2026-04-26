import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : "/feed",
  }),
  head: () => ({
    meta: [
      { title: "Sign in — kayaa" },
      { name: "description", content: "Sign in to check in to local places near you." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // If already signed in, bounce to redirect target
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: redirect as "/" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (s) navigate({ to: redirect as "/" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate, redirect]);

  const handleEmail = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/feed" },
        });
        if (error) throw error;
        setError("Check your email to confirm your account, then sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/feed",
    });
    if (result.error) {
      setError(result.error instanceof Error ? result.error.message : "Google sign-in failed.");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    // Tokens received — onAuthStateChange will redirect
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
        padding: "24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 400 }}>
        <Link
          to="/"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 24,
            color: "#39D98A",
            textDecoration: "none",
            display: "block",
            marginBottom: 32,
          }}
        >
          kayaa
        </Link>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 32,
            margin: 0,
            marginBottom: 8,
          }}
        >
          {mode === "signin" ? "Welcome back." : "Join kayaa."}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, marginBottom: 28 }}>
          {mode === "signin"
            ? "Check in to your local places."
            : "Create an account to find and check in to local places near you."}
        </p>

        <button
          onClick={handleGoogle}
          disabled={busy}
          style={{
            width: "100%",
            padding: "12px 16px",
            background: "#FFFFFF",
            color: "#0D1117",
            border: "none",
            borderRadius: 8,
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: 15,
            cursor: busy ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: 16,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"/>
            <path fill="#FBBC05" d="M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.05l3.01-2.33z"/>
            <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 9 0 9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/>
          </svg>
          Continue with Google
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            margin: "20px 0",
            color: "rgba(255,255,255,0.4)",
            fontSize: 12,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.14em",
          }}
        >
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
          OR
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
        </div>

        <form onSubmit={handleEmail} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          {error && (
            <p style={{ color: "#FF7A7A", fontSize: 13, margin: 0 }}>{error}</p>
          )}
          <button
            type="submit"
            disabled={busy}
            style={{
              padding: "12px 16px",
              background: "#39D98A",
              color: "#0D1117",
              border: "none",
              borderRadius: 8,
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 15,
              cursor: busy ? "not-allowed" : "pointer",
              marginTop: 4,
            }}
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <p style={{ marginTop: 20, fontSize: 14, color: "rgba(255,255,255,0.6)", textAlign: "center" }}>
          {mode === "signin" ? "New here? " : "Already have an account? "}
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            style={{
              background: "none",
              border: "none",
              color: "#39D98A",
              cursor: "pointer",
              fontSize: 14,
              padding: 0,
              textDecoration: "underline",
            }}
          >
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "12px 14px",
  background: "#161B22",
  color: "#F0F6FC",
  border: "1px solid #21262D",
  borderRadius: 8,
  fontFamily: "var(--font-body)",
  fontSize: 15,
  outline: "none",
} as const;