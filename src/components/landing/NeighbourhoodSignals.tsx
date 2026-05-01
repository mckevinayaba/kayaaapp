const SIGNALS = [
  {
    icon: "📡",
    title: "Neighbourhood feed",
    body:
      "A live view of places, updates, check-ins, and local posts nearby — so you can see what is active in your area in one place.",
  },
  {
    icon: "📍",
    title: "Place-based photos & videos",
    body:
      "Post nice places, useful moments, events, or updates and pin them to the exact location they happened — not floating content, real local context.",
  },
  {
    icon: "🔔",
    title: "Neighbourhood alerts",
    body:
      "Useful local signals and awareness posts tied to real places, so you stay more informed and more alert about what is happening around you.",
  },
  {
    icon: "✅",
    title: "Check-ins",
    body:
      "One tap when you walk in. Over time, this builds a visible record of which places people actually keep going back to.",
  },
  {
    icon: "♻️",
    title: "Regulars",
    body:
      "Repeat check-ins create a visible signal of loyalty — proof that a place already has the community most apps cannot see.",
  },
  {
    icon: "🏪",
    title: "Place dashboard",
    body:
      "Owners can manage their place, post updates, see check-ins, understand repeat activity, and stay visible — without needing a marketing budget.",
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
          What kayaa actually does
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
          See it. Discover it.
          <br />
          <span style={{ color: "var(--green)" }}>Help places grow from it.</span>
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
          kayaa does three things. It helps people see what is happening
          around them, discover the local places that matter, and helps those
          places stay visible, get found, and grow. Not star ratings. Not
          random opinions. Place-based sharing tied to real locations, with
          real neighbourhood utility.
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
        For neighbourhoods: clearer discovery and a practical view of local
        life. For places and businesses: visibility, repeat foot traffic, new
        nearby customers, and visible proof your community already exists.
      </p>
    </section>
  );
}