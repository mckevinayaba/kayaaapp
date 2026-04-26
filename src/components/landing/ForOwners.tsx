import { useNavigate } from "@tanstack/react-router";

const FEATURES = [
  "See who your real regulars are",
  "Know who hasn't visited in 14+ days",
  "Send a WhatsApp nudge in one tap",
  "Download your Community Proof Report",
  "Post events and stories to your regulars",
  "Get discovered by people nearby",
];

const TILES = [
  { n: "12", label: "Today", color: "var(--green)" },
  { n: "47", label: "This Week", color: "var(--warm-white)" },
  { n: "3", label: "Lapsed", color: "var(--amber)" },
  { n: "2", label: "New Faces", color: "var(--green)" },
];

const VISITORS = [
  { name: "Thabo", badge: "Regular", badgeBg: "rgba(57,217,138,0.12)", badgeColor: "var(--green)", visit: "Visit #11" },
  { name: "Sipho", badge: "Loyal", badgeBg: "rgba(57,217,138,0.18)", badgeColor: "var(--green)", visit: "Visit #18" },
  { name: "Lerato", badge: "Newcomer", badgeBg: "rgba(107,114,128,0.2)", badgeColor: "var(--muted-kayaa)", visit: "Visit #1" },
];

export function ForOwners() {
  const navigate = useNavigate();
  return (
    <section
      style={{
        background: "var(--midnight)",
        padding: "100px 24px",
      }}
    >
      <style>{`
        .kayaa-owners-grid {
          display: grid;
          grid-template-columns: 6fr 4fr;
          gap: 60px;
          max-width: 1000px;
          margin: 0 auto;
          align-items: center;
        }
        @media (max-width: 880px) {
          .kayaa-owners-grid { grid-template-columns: 1fr; }
        }
        .kayaa-owners-cta { transition: all 0.2s ease; }
        .kayaa-owners-cta:hover {
          filter: brightness(1.1);
          transform: scale(1.02);
        }
      `}</style>
      <div className="kayaa-owners-grid">
        <div className="reveal">
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--green)",
              marginBottom: 16,
            }}
          >
            FOR PLACE OWNERS
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: 24,
            }}
          >
            Your community is real.
            <br />
            Now make it visible.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              color: "var(--muted-kayaa)",
              lineHeight: 1.7,
              marginBottom: 16,
            }}
          >
            You already know your regulars by face. You know who comes every Saturday. You know who disappeared three weeks ago.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              color: "var(--muted-kayaa)",
              lineHeight: 1.7,
              marginBottom: 36,
            }}
          >
            kayaa gives that knowledge a record. So you can reach them when it's quiet. So you can prove your community exists to a bank, a brand, or a partner.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
            {FEATURES.map((f) => (
              <div key={f} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    background: "rgba(57,217,138,0.12)",
                    border: "1px solid rgba(57,217,138,0.3)",
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--green)",
                    fontSize: 12,
                    flexShrink: 0,
                  }}
                >
                  ✓
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    color: "var(--warm-white)",
                  }}
                >
                  {f}
                </div>
              </div>
            ))}
          </div>

          <button
            className="kayaa-owners-cta"
            onClick={() => navigate({ to: "/add-place" as string as "/" })}
            style={{
              background: "var(--green)",
              color: "var(--midnight)",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 15,
              padding: "14px 28px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              boxShadow: "0 0 30px rgba(57,217,138,0.2)",
            }}
          >
            Add your place — it's free →
          </button>
        </div>

        <div
          className="reveal"
          style={{
            background: "#0A0E14",
            border: "1px solid var(--border-kayaa)",
            borderRadius: 16,
            padding: 20,
            maxWidth: 320,
            boxShadow: "0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(57,217,138,0.08)",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 14,
                color: "var(--green)",
              }}
            >
              kayaa
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--green)",
                  boxShadow: "0 0 8px rgba(57,217,138,0.6)",
                  display: "inline-block",
                }}
              />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "var(--green)" }}>
                Live
              </span>
            </span>
          </div>

          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 12,
              color: "var(--warm-white)",
              marginBottom: 16,
            }}
          >
            Good morning, Sbu's Cuts ☀️
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginBottom: 16,
            }}
          >
            {TILES.map((t) => (
              <div
                key={t.label}
                style={{
                  background: "var(--card-kayaa)",
                  border: "1px solid var(--border-kayaa)",
                  borderRadius: 8,
                  padding: "10px 12px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 22,
                    color: t.color,
                  }}
                >
                  {t.n}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 9,
                    color: "var(--muted-kayaa)",
                    marginTop: 2,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {t.label}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--muted-kayaa)",
              marginBottom: 10,
            }}
          >
            TODAY'S VISITORS
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {VISITORS.map((v) => (
              <div
                key={v.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 10px",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: 6,
                  border: "1px solid var(--border-kayaa)",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--green)",
                    flexShrink: 0,
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: 12,
                    color: "var(--warm-white)",
                  }}
                >
                  {v.name}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 9,
                    borderRadius: 999,
                    padding: "2px 8px",
                    background: v.badgeBg,
                    color: v.badgeColor,
                    flexShrink: 0,
                  }}
                >
                  {v.badge}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 9,
                    color: "var(--muted-kayaa)",
                    marginLeft: "auto",
                  }}
                >
                  {v.visit}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 14,
              borderTop: "1px solid var(--border-kayaa)",
              paddingTop: 10,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 9,
                color: "var(--muted-kayaa)",
              }}
            >
              3 lapsed this week
            </span>
            <button
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 9,
                color: "var(--green)",
                border: "1px solid rgba(57,217,138,0.3)",
                borderRadius: 4,
                padding: "4px 10px",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              Nudge →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}