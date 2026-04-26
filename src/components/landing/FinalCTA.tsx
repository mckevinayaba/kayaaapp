import { useNavigate } from "@tanstack/react-router";

export function FinalCTA() {
  const navigate = useNavigate();
  return (
    <section
      className="kayaa-final"
      style={{
        height: "100dvh",
        background: "var(--midnight)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <style>{`
        .kayaa-final::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(57,217,138,0.07) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }
        .kayaa-final::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.008) 2px,
            rgba(255,255,255,0.008) 4px
          );
          background-size: 4px 4px;
        }
        .kayaa-final-primary { transition: all 0.2s ease; }
        .kayaa-final-primary:hover {
          filter: brightness(1.1);
          transform: scale(1.02);
          box-shadow: 0 0 70px rgba(57,217,138,0.4) !important;
        }
        .kayaa-final-secondary { transition: all 0.2s ease; }
        .kayaa-final-secondary:hover {
          background: rgba(57,217,138,0.08) !important;
          border-color: var(--green) !important;
        }
      `}</style>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 600,
          margin: "0 auto",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <h2
          className="reveal"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(36px, 5.5vw, 64px)",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          <span style={{ color: "#FFFFFF" }}>Every place that makes a neighbourhood.</span>
          <br />
          <span style={{ color: "var(--green)" }}>One network.</span>
        </h2>

        <p
          className="reveal"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 17,
            color: "var(--muted-kayaa)",
            lineHeight: 1.7,
            maxWidth: 440,
            margin: "28px auto 44px",
            transitionDelay: "0.15s",
          }}
        >
          Find your local places. Check in. Become a regular. Or add your place and let your community find you.
        </p>

        <div
          className="reveal"
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
            transitionDelay: "0.3s",
          }}
        >
          <button
            className="kayaa-final-primary"
            onClick={() => navigate({ to: "/feed" as string as "/" })}
            style={{
              background: "var(--green)",
              color: "var(--midnight)",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 15,
              padding: "15px 32px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 50px rgba(57,217,138,0.25)",
            }}
          >
            Explore kayaa →
          </button>
          <button
            className="kayaa-final-secondary"
            onClick={() => navigate({ to: "/add-place" as string as "/" })}
            style={{
              background: "transparent",
              border: "1px solid rgba(57,217,138,0.35)",
              color: "var(--green)",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: 15,
              padding: "15px 32px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Add your place — free
          </button>
        </div>

        <p
          className="reveal"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "var(--muted-kayaa)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginTop: 44,
            transitionDelay: "0.45s",
          }}
        >
          Built in South Africa 🇿🇦 · For every neighbourhood
        </p>
      </div>
    </section>
  );
}