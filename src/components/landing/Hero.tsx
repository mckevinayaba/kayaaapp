import { useNavigate } from "@tanstack/react-router";
import { SignCard } from "./SignCard";

const FLOATING_CARDS = [
  { emoji: "💈", name: "GENTS BARBERSHOP", type: "Barbershop", area: "Orlando West, Soweto", style: { top: "8%", left: "2%", animation: "floatCard 11s ease-in-out infinite", animationDelay: "0s", "--rotate": "-1deg" } },
  { emoji: "🛒", name: "NTOMBENHLE TUCKSHOP", type: "Tuckshop", area: "Mamelodi", style: { top: "20%", left: "4%", animation: "floatCard 14s ease-in-out infinite", animationDelay: "2s", "--rotate": "1.5deg" } },
  { emoji: "🍖", name: "SIZWE SHISANYAMA", type: "Shisanyama", area: "Tembisa", style: { top: "7%", right: "2%", animation: "floatCard 12s ease-in-out infinite", animationDelay: "1s", "--rotate": "1deg" } },
  { emoji: "⛪", name: "NEW HOPE CHURCH HALL", type: "Church Hall", area: "Khayelitsha", style: { top: "24%", right: "3%", animation: "floatCard 9s ease-in-out infinite", animationDelay: "3s", "--rotate": "-1.5deg" } },
  { emoji: "🚗", name: "KWAMAHLANGU CAR WASH", type: "Car Wash", area: "Alexandra", style: { top: "48%", left: "1%", animation: "floatCard 15s ease-in-out infinite", animationDelay: "0.5s", "--rotate": "-2deg" } },
  { emoji: "💅", name: "ZANELE'S SALON", type: "Salon", area: "Sandton", style: { top: "42%", right: "1%", animation: "floatCard 13s ease-in-out infinite", animationDelay: "2.5s", "--rotate": "1deg" } },
  { emoji: "🔧", name: "TRUSTED MECHANIC", type: "Mechanic", area: "Randburg", style: { bottom: "22%", left: "3%", animation: "floatCard 10s ease-in-out infinite", animationDelay: "1.5s", "--rotate": "2deg" } },
  { emoji: "☕", name: "CORNER CAFÉ", type: "Café", area: "Rosebank", style: { bottom: "10%", left: "7%", animation: "floatCard 11s ease-in-out infinite", animationDelay: "4s", "--rotate": "-1deg" } },
  { emoji: "🍺", name: "CORNER TAVERN", type: "Tavern", area: "Meadowlands, Soweto", style: { bottom: "20%", right: "3%", animation: "floatCard 12s ease-in-out infinite", animationDelay: "0.8s", "--rotate": "-1.5deg" } },
  { emoji: "📍", name: "COMMUNITY HALL", type: "Community", area: "Mitchells Plain", style: { bottom: "7%", right: "6%", animation: "floatCard 10s ease-in-out infinite", animationDelay: "3.5s", "--rotate": "1deg" } },
] as const;

export function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="kayaa-hero"
      style={{
        height: "100dvh",
        position: "relative",
        overflow: "hidden",
        background: "var(--midnight)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <style>{`
        .kayaa-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          background-image: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.008) 2px,
            rgba(255,255,255,0.008) 4px
          );
          background-size: 4px 4px;
        }
        .kayaa-cta-primary:hover {
          filter: brightness(1.1);
          transform: scale(1.02);
          box-shadow: 0 0 60px rgba(57,217,138,0.35) !important;
        }
        .kayaa-cta-secondary:hover {
          background: rgba(57,217,138,0.08) !important;
          border-color: var(--green) !important;
        }
      `}</style>

      {FLOATING_CARDS.map((c, i) => (
        <SignCard
          key={i}
          emoji={c.emoji}
          name={c.name}
          type={c.type}
          area={c.area}
          floating
          style={{ ...(c.style as React.CSSProperties), zIndex: 2 }}
        />
      ))}

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "720px",
          margin: "0 auto",
          padding: "80px 24px 40px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            background: "rgba(57,217,138,0.08)",
            border: "1px solid rgba(57,217,138,0.22)",
            color: "var(--green)",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            padding: "5px 16px",
            borderRadius: "999px",
            marginBottom: "32px",
            opacity: 0,
            animation: "fadeInUp 0.5s ease forwards",
            animationDelay: "0.1s",
          }}
        >
          COMMUNITY RESEARCH BRIEF 001
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(38px, 6vw, 70px)",
            lineHeight: 1.08,
            marginBottom: "24px",
            opacity: 0,
            animation: "fadeInUp 0.5s ease forwards",
            animationDelay: "0.3s",
          }}
        >
          <span style={{ color: "var(--muted-kayaa)" }}>We say </span>
          <span style={{ color: "var(--warm-white)" }}>support local.</span>
          <br />
          <span style={{ color: "var(--muted-kayaa)" }}>But we cannot even </span>
          <span style={{ color: "var(--green)" }}>find local.</span>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "var(--muted-kayaa)",
            lineHeight: 1.6,
            maxWidth: "500px",
            marginBottom: "44px",
            opacity: 0,
            animation: "fadeInUp 0.5s ease forwards",
            animationDelay: "0.5s",
          }}
        >
          The places that hold neighbourhood life together are still invisible online.
        </p>

        <div
          style={{
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
            justifyContent: "center",
            opacity: 0,
            animation: "fadeInUp 0.5s ease forwards",
            animationDelay: "0.7s",
          }}
        >
          <button
            className="kayaa-cta-primary"
            onClick={() => navigate({ to: "/feed" as string as "/" })}
            style={{
              background: "var(--green)",
              color: "var(--midnight)",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "15px",
              padding: "14px 28px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 40px rgba(57,217,138,0.2)",
              transition: "all 0.2s ease",
            }}
          >
            Explore your neighbourhood →
          </button>
          <button
            className="kayaa-cta-secondary"
            onClick={() => navigate({ to: "/add-place" as string as "/" })}
            style={{
              background: "transparent",
              border: "1px solid rgba(57,217,138,0.35)",
              color: "var(--green)",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "15px",
              padding: "14px 28px",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Add your place — it's free
          </button>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          color: "var(--muted-kayaa)",
          fontFamily: "var(--font-body)",
          fontSize: "10px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          zIndex: 10,
        }}
      >
        <span>SCROLL</span>
        <span style={{ fontSize: "16px", animation: "kayaaBounce 1.8s ease infinite" }}>▾</span>
      </div>
    </section>
  );
}
