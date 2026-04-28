import { openWaitlist } from "@/lib/waitlist-store";

export function CityWaitlist() {
  return (
    <section
      style={{
        background: "#0D1117",
        borderTop: "1px solid #21262D",
        padding: "80px 6%",
      }}
    >
      <style>{`
        .kayaa-wait-cta { transition: transform .2s ease, filter .2s ease; }
        .kayaa-wait-cta:hover { transform: translateY(-2px); filter: brightness(1.08); }
      `}</style>

      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <p
          className="reveal"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "#39D98A",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            margin: "0 0 16px",
          }}
        >
          Neighbourhood by neighbourhood
        </p>
        <h2
          className="reveal"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(24px, 3vw, 36px)",
            color: "#FFFFFF",
            lineHeight: 1.2,
            margin: "0 0 14px",
          }}
        >
          Want kayaa in your area next?
        </h2>
        <p
          className="reveal"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            color: "#6B7280",
            margin: "0 0 36px",
            lineHeight: 1.6,
          }}
        >
          We're launching one neighbourhood at a time. Tell us yours and we'll
          WhatsApp you the moment it goes live.
        </p>

        <button
          type="button"
          onClick={() => openWaitlist(1)}
          className="reveal reveal-delay-1 kayaa-wait-cta"
          style={{
            background: "#39D98A",
            color: "#0D1117",
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: 16,
            padding: "16px 36px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 0 60px rgba(57,217,138,0.3)",
          }}
        >
          Join the waitlist →
        </button>
        <p
          className="reveal reveal-delay-2"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "#6B7280",
            margin: "16px 0 0",
          }}
        >
          Takes 8 seconds. WhatsApp only — no spam, no email lists.
        </p>
      </div>
    </section>
  );
}