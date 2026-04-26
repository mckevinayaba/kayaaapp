import { useNavigate } from "@tanstack/react-router";

export function Nav() {
  const navigate = useNavigate();
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "60px",
        padding: "0 24px",
        background: "rgba(13, 17, 23, 0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-kayaa)",
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
        }}
      >
        kayaa
      </a>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <a
          href="/auth"
          className="kayaa-signin"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "var(--muted-kayaa)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
        >
          Sign in
        </a>
        <button
          onClick={() => navigate({ to: "/add-place" as string as "/" })}
          className="kayaa-add-btn"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "14px",
            color: "var(--green)",
            background: "transparent",
            border: "1px solid rgba(57,217,138,0.4)",
            padding: "8px 18px",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          Add your place →
        </button>
      </div>
      <style>{`
        .kayaa-signin:hover { color: var(--warm-white) !important; }
        .kayaa-add-btn:hover {
          background: rgba(57,217,138,0.08) !important;
          border-color: var(--green) !important;
        }
      `}</style>
    </nav>
  );
}
