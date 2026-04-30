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
          One neighbourhood at a time.
          <br />
          <span style={{ color: "var(--green)" }}>Tell us where you are.</span>
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
          Tell us where you are, and we will let you know when kayaa reaches
          your area. We are building this carefully because the places we are
          building for deserve to be done right, not rushed.
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
          Join the neighbourhood waitlist →
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
          Choose how you want to hear from us: WhatsApp or email
        </p>
        <p
          className="reveal reveal-delay-2"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "rgba(255,255,255,0.5)",
            margin: "10px 0 0",
          }}
        >
          Prefer to message us directly?{" "}
          <a
            href="https://wa.me/27663365296"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--green)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(57,217,138,0.4)",
            }}
          >
            WhatsApp us on +27 66 336 5296
          </a>
        </p>
      </div>
    </section>
  );
}