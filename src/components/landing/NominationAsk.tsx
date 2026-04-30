import { openWaitlist } from "@/lib/waitlist-store";

export function NominationAsk() {
  return (
    <section
      id="nominate"
      style={{
        position: "relative",
        padding: "100px 6%",
        background:
          "linear-gradient(180deg, var(--midnight) 0%, #0A1018 100%)",
        borderTop: "1px solid var(--border-kayaa)",
        borderBottom: "1px solid var(--border-kayaa)",
        overflow: "hidden",
      }}
    >
      {/* soft green wash to draw the eye */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 900,
          background:
            "radial-gradient(circle, rgba(57,217,138,0.14) 0%, rgba(57,217,138,0) 65%)",
          pointerEvents: "none",
        }}
      />

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
          The ask
        </p>

        <h2
          className="reveal"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(32px, 4.8vw, 58px)",
            color: "var(--warm-white)",
            lineHeight: 1.06,
            letterSpacing: "-0.01em",
            margin: "0 0 26px",
          }}
        >
          Tell us the place in your area that
          <br />
          <span style={{ color: "var(--green)" }}>
            keeps pulling people back.
          </span>
        </h2>

        <p
          className="reveal"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 18,
            color: "rgba(255,255,255,0.72)",
            lineHeight: 1.6,
            margin: "0 auto 36px",
            maxWidth: 640,
          }}
        >
          What you share helps us understand which places matter, why they
          matter, and how to make them easier to see, easier to discover, and
          harder to overlook.
        </p>

        <div
          className="reveal"
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => openWaitlist(1)}
            className="kayaa-nominate-cta"
            style={{
              background: "var(--green)",
              color: "var(--midnight)",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 16,
              padding: "18px 36px",
              borderRadius: 12,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 12px 40px rgba(57,217,138,0.45)",
              transition: "all .2s ease",
            }}
          >
            Nominate a place →
          </button>
          <button
            type="button"
            onClick={() => openWaitlist(1)}
            className="kayaa-nominate-secondary"
            style={{
              background: "transparent",
              color: "var(--warm-white)",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 16,
              padding: "18px 28px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.22)",
              cursor: "pointer",
              transition: "all .2s ease",
            }}
          >
            Join the neighbourhood waitlist
          </button>
        </div>

        <p
          className="reveal"
          style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontSize: 14,
            color: "rgba(255,255,255,0.55)",
            margin: "20px 0 0",
          }}
        >
          One minute. No account. Just one place that deserves to be seen.
        </p>
      </div>

      <style>{`
        .kayaa-nominate-cta:hover { filter: brightness(1.08); transform: translateY(-2px); }
        .kayaa-nominate-secondary:hover {
          background: rgba(255,255,255,0.06) !important;
          border-color: rgba(255,255,255,0.5) !important;
        }
      `}</style>
    </section>
  );
}