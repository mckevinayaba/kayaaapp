import { openWaitlist } from "@/lib/waitlist-store";

export function CityWaitlist() {
  return (
    <section
      style={{
        background: "var(--midnight)",
        borderTop: "1px solid var(--border-kayaa)",
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
            color: "var(--green)",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            margin: "0 0 16px",
          }}
        >
          Neighbourhood by neighbourhood
        </p>
        <h2
          className="reveal"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(28px, 3.4vw, 42px)",
            color: "var(--warm-white)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            margin: "0 0 14px",
          }}
        >
          We're starting in Johannesburg.
          <br />
          <span style={{ color: "var(--green)" }}>Tell us where you are next.</span>
        </h2>
        <p
          className="reveal"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 17,
            color: "rgba(255,255,255,0.6)",
            margin: "0 0 36px",
            lineHeight: 1.6,
          }}
        >
          We launch one neighbourhood at a time so we can get it right.
          Add yours and we'll WhatsApp you the moment kayaa goes live there.
        </p>

        <button
          type="button"
          onClick={() => openWaitlist(1)}
          className="reveal reveal-delay-1 kayaa-wait-cta"
          style={{
            background: "var(--green)",
            color: "var(--midnight)",
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: 16,
            padding: "16px 36px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 0 50px var(--green-glow)",
          }}
        >
          Join the waitlist →
        </button>
        <p
          className="reveal reveal-delay-2"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            margin: "16px 0 0",
          }}
        >
          Takes 8 seconds · WhatsApp only · No spam
        </p>
      </div>
    </section>
  );
}