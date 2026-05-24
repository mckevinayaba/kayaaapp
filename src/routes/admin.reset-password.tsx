import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset password — kayaa" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ResetPasswordPage,
});

const passwordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters").max(200),
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

function ResetPasswordPage() {
  const [ready, setReady] = useState(false);
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || (event === "SIGNED_IN" && session)) {
        setReady(true);
      }
    });
    (async () => {
      const search = new URLSearchParams(window.location.search);
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const code = search.get("code");
      const tokenHash = search.get("token_hash");
      const accessToken = hash.get("access_token");
      const refreshToken = hash.get("refresh_token");
      if (code) {
        const { error: exchangeErr } = await supabase.auth.exchangeCodeForSession(code);
        if (exchangeErr && !cancelled) setError(exchangeErr.message);
      } else if (accessToken && refreshToken && hash.get("type") === "recovery") {
        const { error: sessionErr } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (sessionErr && !cancelled) setError(sessionErr.message);
      } else if (tokenHash && search.get("type") === "recovery") {
        const { error: verifyErr } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: "recovery",
        });
        if (verifyErr && !cancelled) setError(verifyErr.message);
      }
      const { data } = await supabase.auth.getSession();
      if (!cancelled) {
        if (data.session) setReady(true);
        setChecked(true);
      }
    })();
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = passwordSchema.safeParse({ password, confirm });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setBusy(true);
    try {
      const { error: updErr } = await supabase.auth.updateUser({
        password: parsed.data.password,
      });
      if (updErr) throw updErr;
      await supabase.auth.signOut();
      setDone(true);
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
              fontSize: 24,
              margin: 0,
              textAlign: "center",
            }}
          >
            Reset password
          </h1>

          {!checked ? (
            <p
              style={{
                marginTop: 22,
                color: "rgba(255,255,255,0.6)",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              Checking your reset link…
            </p>
          ) : done ? (
            <>
              <p
                style={{
                  marginTop: 18,
                  color: "#39D98A",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                Password updated. You can now sign in with your new password.
              </p>
              <div style={{ marginTop: 20, textAlign: "center" }}>
                <Link
                  to="/admin"
                  style={{
                    color: "#39D98A",
                    fontSize: 14,
                    textDecoration: "underline",
                  }}
                >
                  Go to login
                </Link>
              </div>
            </>
          ) : !ready ? (
            <>
              <p
                style={{
                  marginTop: 18,
                  color: "#FF7A7A",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                This link is invalid or has expired. Request a new reset email.
              </p>
              <div style={{ marginTop: 20, textAlign: "center" }}>
                <Link
                  to="/admin"
                  style={{
                    color: "#39D98A",
                    fontSize: 14,
                    textDecoration: "underline",
                  }}
                >
                  Back to login
                </Link>
              </div>
            </>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                marginTop: 22,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div>
                <label style={labelStyle}>New password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  style={inputStyle}
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label style={labelStyle}>Confirm password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  placeholder="Repeat new password"
                  value={confirm}
                  onChange={(ev) => setConfirm(ev.target.value)}
                  style={inputStyle}
                  autoComplete="new-password"
                />
              </div>

              {error && (
                <p style={{ color: "#FF7A7A", fontSize: 13, margin: 0 }}>{error}</p>
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
                {busy ? "Updating…" : "Update password"}
              </button>
            </form>
          )}
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