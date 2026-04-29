import { openWaitlist } from "@/lib/waitlist-store";

const NAV_LINKS = [
  { href: "/#how", label: "How it works" },
  { href: "/#why", label: "For places" },
  { href: "/about", label: "About" },
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
        height: 64,
        padding: "0 24px",
        background: "rgba(13,17,23,0.78)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
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
          fontSize: 22,
          color: "var(--green)",
          textDecoration: "none",
          letterSpacing: "-0.02em",
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

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button
          onClick={() => openWaitlist(1)}
          className="kayaa-nominate-btn"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: 13,
            color: "var(--warm-white)",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.18)",
            padding: "9px 16px",
            borderRadius: 999,
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
            fontSize: 13,
            color: "var(--midnight)",
            background: "var(--green)",
            border: "none",
            padding: "9px 20px",
            borderRadius: 999,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          Join the waitlist →
        </button>
      </div>
      <style>{`
        .kayaa-nav-links { display: flex; gap: 32px; align-items: center; }
        .kayaa-nav-link {
          font-family: var(--font-body);
          font-size: 14px;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          transition: color 0.2s;
        }
        .kayaa-nav-link:hover { color: var(--green); }
        .kayaa-add-btn:hover { filter: brightness(1.1); }
        .kayaa-nominate-btn:hover {
          background: rgba(255,255,255,0.05) !important;
          border-color: rgba(255,255,255,0.4) !important;
        }
        @media (max-width: 920px) {
          .kayaa-nav-links { display: none; }
          .kayaa-nominate-btn { display: none; }
        }
      `}</style>
    </nav>
  );
}
