import { useNavigate } from "@tanstack/react-router";

const LINKS: { label: string; to: string }[] = [
  { label: "Feed", to: "/feed" },
  { label: "Board", to: "/board" },
  { label: "Add Place", to: "/add-place" },
  { label: "Sign in", to: "/auth" },
];

export function Footer() {
  const navigate = useNavigate();
  return (
    <footer
      style={{
        background: "var(--card-kayaa)",
        borderTop: "1px solid var(--border-kayaa)",
        padding: "28px 24px",
      }}
    >
      <style>{`
        .kayaa-footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          max-width: 1000px;
          margin: 0 auto;
        }
        .kayaa-footer-link { transition: color 0.2s; }
        .kayaa-footer-link:hover { color: var(--warm-white) !important; }
        @media (max-width: 600px) {
          .kayaa-footer-inner {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
      <div className="kayaa-footer-inner">
        <button
          onClick={() => navigate({ to: "/" })}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 18,
            color: "var(--green)",
          }}
        >
          kayaa
        </button>

        <div
          style={{
            display: "flex",
            gap: 4,
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {LINKS.map((l, i) => (
            <span key={l.to} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <button
                className="kayaa-footer-link"
                onClick={() => navigate({ to: l.to as string as "/" })}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "0 6px",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "var(--muted-kayaa)",
                }}
              >
                {l.label}
              </button>
              {i < LINKS.length - 1 && (
                <span style={{ color: "var(--muted-kayaa)", fontSize: 13 }}>·</span>
              )}
            </span>
          ))}
        </div>

        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "var(--muted-kayaa)",
          }}
        >
          © 2026 kayaa
        </div>
      </div>
    </footer>
  );
}