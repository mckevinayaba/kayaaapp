import { openWaitlist } from "@/lib/waitlist-store";

const FEED = [
  {
    photo: "/landing/09-township-barbershop.jpg",
    name: "Uncle Dee's Barbershop",
    type: "Barbershop",
    area: "Alexandra · Joburg",
    quote: "He's been cutting three generations of the same family.",
    checkins: 142,
    hearts: 38,
    mentions: 12,
    timeAgo: "2h ago",
  },
  {
    photo: "/landing/02-koses-general-dealer.jpg",
    name: "Zanele's Spaza",
    type: "Spaza Shop",
    area: "Orlando East · Soweto",
    quote: "Open at 5am. Knows everyone's name. Never closes when you need her.",
    checkins: 287,
    hearts: 64,
    mentions: 23,
    timeAgo: "4h ago",
  },
  {
    photo: "/landing/03-kwamahlangu-carwash.jpg",
    name: "KwaMahlangu Car Wash",
    type: "Car Wash",
    area: "Tembisa · Ekurhuleni",
    quote: "The conversations here are worth more than the wash.",
    checkins: 96,
    hearts: 41,
    mentions: 8,
    timeAgo: "Yesterday",
  },
  {
    photo: "/landing/04-shisanyama-evening.jpg",
    name: "Mama Zulu's Shisanyama",
    type: "Shisanyama",
    area: "Diepkloof · Soweto",
    quote: "Every celebration on this street ends here.",
    checkins: 412,
    hearts: 128,
    mentions: 47,
    timeAgo: "Friday night",
  },
  {
    photo: "/landing/07-taxi-rank-morning.jpg",
    name: "Faith Assembly Hall",
    type: "Church Hall",
    area: "Khayelitsha · Cape Town",
    quote: "Weddings, funerals, choir practice — held by the same four walls.",
    checkins: 73,
    hearts: 52,
    mentions: 14,
    timeAgo: "Sunday",
  },
  {
    photo: "/landing/05-salon-container.jpg",
    name: "Sisi's Hair & Nails",
    type: "Salon",
    area: "Mitchells Plain · Cape Town",
    quote: "She remembers how everyone takes their coffee.",
    checkins: 188,
    hearts: 71,
    mentions: 19,
    timeAgo: "1d ago",
  },
];

export function NeighbourhoodFeed() {
  return (
    <section
      id="community"
      style={{
        background: "var(--midnight)",
        padding: "120px 6%",
        borderTop: "1px solid var(--border-kayaa)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 480,
          height: 480,
          background:
            "radial-gradient(circle, rgba(57,217,138,0.12) 0%, rgba(57,217,138,0) 70%)",
          pointerEvents: "none",
        }}
      />
      <style>{`
        .kayaa-feed-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .kayaa-feed-card {
          position: relative;
          background: var(--card-kayaa);
          border: 1px solid var(--border-kayaa);
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease;
        }
        .kayaa-feed-card:hover {
          transform: translateY(-4px);
          border-color: rgba(57,217,138,0.4);
          box-shadow: 0 18px 40px rgba(0,0,0,0.5);
        }
        .kayaa-feed-photo {
          position: relative;
          aspect-ratio: 16/10;
          overflow: hidden;
        }
        .kayaa-feed-photo img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: contrast(1.06) brightness(0.85);
          transition: transform .6s ease;
        }
        .kayaa-feed-card:hover .kayaa-feed-photo img { transform: scale(1.06); }
        .kayaa-live-dot {
          width: 8px; height: 8px; border-radius: 999px;
          background: var(--green);
          box-shadow: 0 0 10px var(--green);
          animation: kayaaLivePulse 1.6s ease-in-out infinite;
        }
        @keyframes kayaaLivePulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.85); }
        }
        @media (max-width: 1000px) { .kayaa-feed-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .kayaa-feed-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ maxWidth: 880, margin: "0 auto 56px", textAlign: "center", position: "relative" }}>
        <div
          className="reveal"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(57,217,138,0.08)",
            border: "1px solid rgba(57,217,138,0.25)",
            padding: "6px 14px",
            borderRadius: 999,
            marginBottom: 20,
          }}
        >
          <span className="kayaa-live-dot" aria-hidden />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--green)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Live signals
          </span>
        </div>
        <h2
          className="reveal"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(30px, 4.4vw, 54px)",
            color: "var(--warm-white)",
            lineHeight: 1.1,
            margin: "0 0 18px",
          }}
        >
          Live from our
          <span style={{ color: "var(--green)" }}> neighbourhoods.</span>
        </h2>
        <p
          className="reveal"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 17,
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.6,
            margin: 0,
            maxWidth: 560,
            marginInline: "auto",
          }}
        >
          A small preview of the wall kayaa is building — places nominated by
          the people who keep going back.
        </p>
      </div>

      <div className="kayaa-feed-grid">
        {FEED.map((p, i) => (
          <article key={p.name} className={`kayaa-feed-card reveal reveal-delay-${(i % 3) + 1}`}>
            <div className="kayaa-feed-photo">
              <img src={p.photo} alt={`${p.name} in ${p.area}`} loading="lazy" />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(13,17,23,0.7) 0%, rgba(13,17,23,0) 60%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(13,17,23,0.78)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(57,217,138,0.3)",
                  borderRadius: 999,
                  padding: "4px 10px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  color: "var(--green)",
                  textTransform: "uppercase",
                }}
              >
                <span className="kayaa-live-dot" aria-hidden /> {p.timeAgo}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 12,
                  left: 14,
                  right: 14,
                  color: "var(--warm-white)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--green)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  {p.type}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 19,
                    lineHeight: 1.2,
                  }}
                >
                  {p.name}
                </div>
              </div>
            </div>

            <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.04em",
                }}
              >
                📍 {p.area}
              </div>
              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontSize: 15,
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.5,
                  margin: 0,
                  flex: 1,
                }}
              >
                "{p.quote}"
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  paddingTop: 12,
                  borderTop: "1px dashed rgba(255,255,255,0.08)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.6)",
                  letterSpacing: "0.04em",
                }}
              >
                <span>📌 {p.checkins} check-ins</span>
                <span style={{ color: "var(--green)" }}>♥ {p.hearts}</span>
                <span>💬 {p.mentions}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 56 }}>
        <button
          type="button"
          onClick={() => openWaitlist(1)}
          className="reveal"
          style={{
            background: "transparent",
            color: "var(--green)",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: 15,
            padding: "14px 28px",
            borderRadius: 999,
            border: "1px solid rgba(57,217,138,0.4)",
            cursor: "pointer",
            transition: "all .2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(57,217,138,0.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          }}
        >
          Add a place to the wall →
        </button>
      </div>
    </section>
  );
}