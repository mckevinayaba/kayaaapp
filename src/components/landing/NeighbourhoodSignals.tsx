const SIGNALS = [
  {
    icon: "📍",
    title: "Place-based posts",
    body:
      "Photos, videos, and updates tied to a real location, so you can see exactly where something happened, was seen, or was shared.",
  },
  {
    icon: "🔔",
    title: "Useful local alerts",
    body:
      "Quick neighbourhood signals about what people are noticing nearby — from helpful tips to things worth being aware of in your area.",
  },
  {
    icon: "✨",
    title: "Good things nearby",
    body:
      "A new spot worth trying, a beautiful moment on your street, a place doing something great — shared with the neighbourhood that would actually care.",
  },
  {
    icon: "🗺️",
    title: "A clearer view of your area",
    body:
      "Trusted places, community updates, and real local signals — all in one neighbourhood layer, so daily life is easier to see and easier to understand.",
  },
];

export function NeighbourhoodSignals() {
  return (
    <section
      id="signals"
      style={{
        position: "relative",
        padding: "120px 6%",
        background: "var(--midnight)",
        borderTop: "1px solid var(--border-kayaa)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-15%",
          right: "-10%",
          width: 640,
          height: 640,
          background:
            "radial-gradient(circle, rgba(57,217,138,0.10) 0%, rgba(57,217,138,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <style>{`
        .kayaa-signals-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          max-width: 980px;
          margin: 56px auto 0;
        }
        .kayaa-signal-card {
          background: var(--card-kayaa);
          border: 1px solid var(--border-kayaa);
          border-radius: 16px;
          padding: 28px 26px;
          transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease;
        }
        .kayaa-signal-card:hover {
          transform: translateY(-4px);
          border-color: rgba(57,217,138,0.35);
          box-shadow: 0 18px 40px rgba(0,0,0,0.45), 0 0 24px rgba(57,217,138,0.12);
        }
        @media (max-width: 720px) { .kayaa-signals-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div
        style={{
          position: "relative",
          maxWidth: 880,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p
          className="reveal"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--green)",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            margin: "0 0 18px",
          }}
        >
          More than discovery
        </p>
        <h2
          className="reveal"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(30px, 4.4vw, 54px)",
            color: "var(--warm-white)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            margin: "0 0 22px",
          }}
        >
          See what is happening
          <br />
          <span style={{ color: "var(--green)" }}>around you.</span>
        </h2>
        <p
          className="reveal"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 17,
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.65,
            margin: 0,
            maxWidth: 640,
            marginInline: "auto",
          }}
        >
          From trusted places and neighbourhood updates to useful alerts,
          photos, videos, and real local signals, kayaa helps make
          neighbourhood life easier to see and easier to understand. Share
          what you are seeing, enjoying, or want others to know — tied to the
          exact place it happened.
        </p>
      </div>

      <div className="kayaa-signals-grid">
        {SIGNALS.map((s, i) => (
          <article
            key={s.title}
            className={`kayaa-signal-card reveal reveal-delay-${(i % 4) + 1}`}
          >
            <div
              aria-hidden
              style={{
                fontSize: 24,
                marginBottom: 14,
                filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))",
              }}
            >
              {s.icon}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 20,
                color: "var(--warm-white)",
                margin: "0 0 10px",
                letterSpacing: "-0.01em",
              }}
            >
              {s.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {s.body}
            </p>
          </article>
        ))}
      </div>

      <p
        className="reveal"
        style={{
          textAlign: "center",
          fontFamily: "var(--font-body)",
          fontStyle: "italic",
          fontSize: 14,
          color: "rgba(255,255,255,0.5)",
          margin: "44px auto 0",
          maxWidth: 620,
          lineHeight: 1.6,
        }}
      >
        Practical visibility. Place-based community updates. A neighbourhood
        layer for the things that actually matter where you live.
      </p>
    </section>
  );
}