const CATEGORIES = [
  {
    emoji: "💈",
    title: "Barbershops",
    line: "More than cuts. It's confidence.",
    photo: "/landing/09-township-barbershop.jpg",
  },
  {
    emoji: "💅",
    title: "Salons",
    line: "More than hair. It's how you walk into Monday.",
    photo: "/landing/05-salon-container.jpg",
  },
  {
    emoji: "🏪",
    title: "Spaza shops & tuckshops",
    line: "More than stock. It's survival.",
    photo: "/landing/02-koses-general-dealer.jpg",
  },
  {
    emoji: "🍖",
    title: "Shisanyamas",
    line: "More than food. It's family.",
    photo: "/landing/04-shisanyama-evening.jpg",
  },
  {
    emoji: "🚗",
    title: "Car washes",
    line: "More than a wash. It's where the street talks.",
    photo: "/landing/03-kwamahlangu-carwash.jpg",
  },
  {
    emoji: "⛪",
    title: "Churches & halls",
    line: "More than service. It's where Sunday begins.",
    photo: "/landing/07-taxi-rank-morning.jpg",
  },
  {
    emoji: "☕",
    title: "Cafés & food spots",
    line: "More than a meal. It's the table you keep coming back to.",
    photo: "/landing/06-tuckshop-window.jpg",
  },
  {
    emoji: "🔧",
    title: "Garages & mechanics",
    line: "More than a fix. It's the person you trust with your week.",
    photo: "/landing/08-street-tailor.jpg",
  },
];

export function WhyMatters() {
  return (
    <section
      id="why"
      style={{
        background: "#0A0E14",
        padding: "120px 6%",
        borderTop: "1px solid #21262D",
        position: "relative",
      }}
    >
      <style>{`
        .kayaa-why-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .kayaa-why-card {
          position: relative;
          aspect-ratio: 4/5;
          border-radius: 14px;
          overflow: hidden;
          background: #161B22;
          border: 1px solid #21262D;
          transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease;
          cursor: default;
        }
        .kayaa-why-card:hover {
          transform: translateY(-6px);
          border-color: rgba(57,217,138,0.45);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(57,217,138,0.18);
        }
        .kayaa-why-card img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          filter: contrast(1.05) brightness(0.55) saturate(1.05);
          transition: filter .5s ease, transform .8s ease;
        }
        .kayaa-why-card:hover img { filter: contrast(1.08) brightness(0.7); transform: scale(1.05); }
        @media (max-width: 1000px) { .kayaa-why-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 520px)  { .kayaa-why-grid { grid-template-columns: 1fr; } .kayaa-why-card { aspect-ratio: 16/10; } }
      `}</style>

      <div style={{ maxWidth: 880, margin: "0 auto 64px", textAlign: "center" }}>
        <p
          className="reveal"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "#39D98A",
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            margin: "0 0 18px",
          }}
        >
          Why this matters
        </p>
        <h2
          className="reveal"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(30px, 4.4vw, 54px)",
            color: "#FFFFFF",
            lineHeight: 1.1,
            margin: "0 0 22px",
          }}
        >
          Some of the places doing the most
          <br />
          <span style={{ color: "#39D98A" }}>are still seen the least.</span>
        </h2>
        <p
          className="reveal"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 17,
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.6,
            margin: 0,
            maxWidth: 620,
            marginInline: "auto",
          }}
        >
          Local places aren't just businesses. They hold trust, routine, memory
          and community. They deserve to be visible.
        </p>
      </div>

      <div className="kayaa-why-grid">
        {CATEGORIES.map((c, i) => (
          <article
            key={c.title}
            className={`kayaa-why-card reveal reveal-delay-${(i % 4) + 1}`}
          >
            <img src={c.photo} alt={c.title} loading="lazy" />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(13,17,23,0.96) 0%, rgba(13,17,23,0.55) 55%, rgba(13,17,23,0.15) 100%)",
              }}
              aria-hidden
            />
            <div
              style={{
                position: "absolute",
                left: 18,
                right: 18,
                bottom: 18,
                color: "#FFFFFF",
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  marginBottom: 8,
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))",
                }}
                aria-hidden
              >
                {c.emoji}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 17,
                  lineHeight: 1.2,
                  marginBottom: 6,
                }}
              >
                {c.title}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontStyle: "italic",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.45,
                }}
              >
                {c.line}
              </div>
            </div>
          </article>
        ))}
      </div>

      <p
        className="reveal"
        style={{
          textAlign: "center",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(20px, 2.4vw, 28px)",
          color: "rgba(255,255,255,0.85)",
          margin: "72px auto 0",
          maxWidth: 760,
          lineHeight: 1.35,
        }}
      >
        We keep talking about community —
        <br />
        <span style={{ color: "#39D98A" }}>
          but we ignore the places that make community possible.
        </span>
      </p>
    </section>
  );
}