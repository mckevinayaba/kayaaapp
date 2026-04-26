import { useNavigate } from "@tanstack/react-router";
import { SignCard } from "./SignCard";

type Card = {
  emoji: string;
  name: string;
  type: string;
  area: string;
  featured?: boolean;
  quote?: string;
};

const CARDS: Card[] = [
  {
    emoji: "🚗",
    name: "KWAMAHLANGU CAR WASH",
    type: "Car Wash",
    area: "Alexandra",
    featured: true,
    quote:
      "People come for more than the wash. They come for the conversations, the connections, and the feeling of being part of something.",
  },
  {
    emoji: "💈",
    name: "UNCLE DEE'S BARBERSHOP",
    type: "Barbershop",
    area: "Meadowlands, Soweto",
    featured: true,
    quote:
      "Every Saturday, the same faces. The barber knows your name, your cut, and your story before you sit down.",
  },
  {
    emoji: "🍖",
    name: "MAMA ZULU'S SHISANYAMA",
    type: "Shisanyama",
    area: "Tembisa",
    featured: true,
    quote:
      "It's not just the meat. It's where the neighbourhood gathers every Friday night.",
  },
  { emoji: "⛪", name: "NEW HOPE CHURCH HALL", type: "Church Hall", area: "Khayelitsha" },
  { emoji: "🛒", name: "NTOMBENHLE TUCKSHOP", type: "Tuckshop", area: "Mamelodi" },
  { emoji: "💅", name: "ZANELE'S SALON", type: "Salon", area: "Sandton" },
  { emoji: "☕", name: "CORNER CAFÉ", type: "Café", area: "Rosebank" },
  { emoji: "🔧", name: "TRUSTED MECHANIC", type: "Mechanic", area: "Randburg" },
  { emoji: "🍺", name: "CORNER TAVERN", type: "Tavern", area: "Orlando West, Soweto" },
  { emoji: "📍", name: "COMMUNITY HALL", type: "Community", area: "Mitchells Plain" },
  { emoji: "🏪", name: "SIPHO CORNER SPAZA", type: "Spaza Shop", area: "Alexandra" },
  { emoji: "🎵", name: "LOCAL MUSIC STUDIO", type: "Music Studio", area: "Maboneng" },
];

export function SignWall() {
  const navigate = useNavigate();
  return (
    <section
      className="kayaa-signwall"
      style={{
        background: "var(--midnight)",
        position: "relative",
        padding: "100px 24px",
      }}
    >
      <style>{`
        .kayaa-signwall::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(57,217,138,0.05) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }
        .kayaa-signgrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 768px) {
          .kayaa-signgrid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .kayaa-signgrid { grid-template-columns: 1fr; }
        }
        .kayaa-seeall:hover { text-decoration: underline; }
      `}</style>

      <p
        className="reveal"
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          fontFamily: "var(--font-body)",
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--muted-kayaa)",
          marginBottom: 48,
        }}
      >
        These are the places kayaa is building for.
      </p>

      <div className="kayaa-signgrid">
        {CARDS.map((c, i) => (
          <div
            key={c.name}
            className="reveal"
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <SignCard
              emoji={c.emoji}
              name={c.name}
              type={c.type}
              area={c.area}
              featured={c.featured}
              quote={c.quote}
            />
          </div>
        ))}
      </div>

      <div
        className="reveal"
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: 60,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            color: "var(--muted-kayaa)",
            marginBottom: 10,
          }}
        >
          Over 100 types of places. Every neighbourhood. One network.
        </p>
        <button
          className="kayaa-seeall"
          onClick={() => navigate({ to: "/feed" as string as "/" })}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--green)",
            fontFamily: "var(--font-body)",
            fontSize: 14,
            cursor: "pointer",
            padding: 0,
          }}
        >
          See all place categories →
        </button>
      </div>
    </section>
  );
}