import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { PRE_LAUNCH } from "@/lib/waitlist-store";

export const Route = createFileRoute("/feed")({
  beforeLoad: () => {
    if (PRE_LAUNCH) {
      throw redirect({ to: "/", search: { waitlist: 1 } as never });
    }
  },
  head: () => ({
    meta: [
      { title: "Your feed — kayaa" },
      { name: "description", content: "Check in to local places near you." },
    ],
  }),
  component: FeedPage,
});

function FeedPage() {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated, signOut } = useAuth();

  // Client-side guard: redirect unauthenticated users to /auth with redirect-back
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate({
        to: "/auth",
        search: { redirect: "/feed" },
      });
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading || !isAuthenticated) {
    return (
      <div
        style={{
          minHeight: "100dvh",
          background: "#0D1117",
          color: "rgba(255,255,255,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.18em",
        }}
      >
        LOADING…
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100dvh", background: "#0D1117", color: "#F0F6FC" }}>
      <header
        style={{
          padding: "20px 32px",
          borderBottom: "1px solid #21262D",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 22,
            color: "#39D98A",
            textDecoration: "none",
          }}
        >
          kayaa
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
            {user?.email}
          </span>
          <button
            onClick={async () => {
              await signOut();
              navigate({ to: "/" });
            }}
            style={{
              background: "transparent",
              color: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "6px 14px",
              borderRadius: 999,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
            }}
          >
            Sign out
          </button>
        </div>
      </header>

      <main style={{ padding: "64px 32px", maxWidth: 720, margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "#39D98A",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          Your feed
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(34px, 5vw, 52px)",
            lineHeight: 1.05,
            margin: "12px 0 16px",
          }}
        >
          Welcome to kayaa.
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: "rgba(255,255,255,0.7)", margin: 0 }}>
          You're signed in. Soon, this is where you'll see local places near you,
          check in, and share what's worth supporting in your township.
        </p>

        <div
          style={{
            marginTop: 40,
            padding: 24,
            background: "#161B22",
            border: "1px solid #21262D",
            borderLeft: "3px solid #39D98A",
            borderRadius: 8,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              color: "#39D98A",
              margin: 0,
              marginBottom: 8,
            }}
          >
            COMING SOON
          </p>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.8)", fontSize: 15, lineHeight: 1.6 }}>
            Nearby check-ins, friends' favourite spots, and a way to add the
            places that have always been there.
          </p>
        </div>
      </main>
    </div>
  );
}