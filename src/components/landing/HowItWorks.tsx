const CARDS = [
  {
    icon: "📍",
    label: "DISCOVER",
    title: "Find what's happening nearby",
    body:
      "See which local places are open, busy, or hosting something today. Real places. Real people. Your area.",
  },
  {
    icon: "✅",
    label: "CHECK IN",
    title: "Check in where you belong",
    body:
      "Walk in. Tap check in. Build your regulars identity over time. No payment needed. No booking required.",
  },
  {
    icon: "🏡",
    label: "BELONG",
    title: "Become a neighbourhood regular",
    body:
      "The more you check in, the more your local places know you. Earn your Regular status. Unlock regulars-only posts.",
  },
];

export function HowItWorks() {
  return (
    <section
      style={{
        background: "var(--card-kayaa)",
        borderTop: "1px solid var(--border-kayaa)",
        borderBottom: "1px solid var(--border-kayaa)",
        padding: "100px 24px",
      }}
    >
      <style>{`
        .kayaa-hiw-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 768px) {
          .kayaa-hiw-grid { grid-template-columns: 1fr; }
        }
        .kayaa-hiw-card { transition: all 0.2s ease; }
        .kayaa-hiw-card:hover {
          border-color: var(--green) !important;
          box-shadow: 0 0 30px rgba(57,217,138,0.08);
          transform: translateY(-4px);
        }
      `}</style>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <div
            className="reveal"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--green)",
              marginBottom: 16,
            }}
          >
            HOW IT WORKS
          </div>
          <h2
            className="reveal"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              color: "#FFFFFF",
              marginBottom: 64,
            }}
          >
            Three things. That's it.
          </h2>
        </div>

        <div className="kayaa-hiw-grid">
          {CARDS.map((c, i) => (
            <div
              key={c.label}
              className="kayaa-hiw-card reveal"
              style={{
                background: "var(--midnight)",
                border: "1px solid var(--border-kayaa)",
                borderRadius: 12,
                padding: "32px 28px",
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 20 }}>{c.icon}</div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--green)",
                  marginBottom: 8,
                }}
              >
                {c.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 20,
                  color: "#FFFFFF",
                  marginBottom: 12,
                }}
              >
                {c.title}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: 15,
                  color: "var(--muted-kayaa)",
                  lineHeight: 1.6,
                }}
              >
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}