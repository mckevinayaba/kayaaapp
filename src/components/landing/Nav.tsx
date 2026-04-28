import { Link } from "@tanstack/react-router";
import { openWaitlist } from "@/lib/waitlist-store";

const NAV_LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#why", label: "For places" },
  { href: "#community", label: "Community" },
  { href: "#listener", label: "About" },
];

export function Nav() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        height: "64px",
        padding: "0 24px",
        background: "rgba(13,17,23,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <a
        href="/"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "22px",
          color: "var(--green)",
          textDecoration: "none",
          textShadow: "0 1px 12px rgba(0,0,0,0.55)",
        }}
      >
        kayaa
      </a>

      <div className="kayaa-nav-links">
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} className="kayaa-nav-link">
            {l.label}
          </a>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Link
          to="/auth"
          search={{ redirect: "/feed" } as never}
          className="kayaa-signin"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "rgba(255,255,255,0.6)",
            textDecoration: "none",
            transition: "color 0.2s",
            padding: "0 8px",
          }}
        >
          Sign in
        </Link>
        <button
          onClick={() => openWaitlist(1)}
          className="kayaa-nominate-btn"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "13px",
            color: "#39D98A",
            background: "transparent",
            border: "1px solid rgba(57,217,138,0.4)",
            padding: "9px 16px",
            borderRadius: "999px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          Nominate a place
        </button>
        <button
          onClick={() => openWaitlist(1)}
          className="kayaa-add-btn"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "13px",
            color: "#0D1117",
            background: "#39D98A",
            border: "none",
            padding: "9px 20px",
            borderRadius: "999px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          Join the waitlist →
        </button>
      </div>
      <style>{`
        .kayaa-nav-links {
          display: flex;
          gap: 28px;
          align-items: center;
        }
        .kayaa-nav-link {
          font-family: var(--font-body);
          font-size: 14px;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: color 0.2s;
        }
        .kayaa-nav-link:hover { color: #39D98A; }
        .kayaa-signin:hover { color: #FFFFFF !important; }
        .kayaa-add-btn:hover { filter: brightness(1.1); }
        .kayaa-nominate-btn:hover {
          background: rgba(57,217,138,0.08) !important;
          border-color: #39D98A !important;
        }
        @media (max-width: 920px) {
          .kayaa-nav-links { display: none; }
          .kayaa-nominate-btn { display: none; }
        }
      `}</style>
    </nav>
  );
}
