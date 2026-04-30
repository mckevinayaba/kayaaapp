import { openWaitlist } from "@/lib/waitlist-store";
import { ShareButton } from "./ShareButton";

const STEPS = [
  {
    n: "01",
    title: "Listen",
    body: "Notice the places people on your street keep going back to. The ones nobody talks about online.",
  },
  {
    n: "02",
    title: "Nominate",
    body: "Tell us the place. Where it is. Why it matters. One minute, no account.",
  },
  {
    n: "03",
    title: "Make it impossible to miss",
    body: "We bring it onto the kayaa wall, where the rest of the neighbourhood can finally see it too.",
  },
];

export function NeighbourhoodListener() {
  return (
    <section
      id="listener"
      style={{
        position: "relative",
        padding: "120px 6%",
        background: "var(--midnight)",
        borderTop: "1px solid var(--border-kayaa)",
        overflow: "hidden",
      }}
    >
      {/* atmospheric photo backdrop */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/landing/01-made-in-soweto.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.25) contrast(1.1) saturate(0.9)",
          opacity: 0.55,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(10,14,20,0.82) 0%, rgba(10,14,20,0.6) 50%, rgba(10,14,20,0.95) 100%)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          width: 720,
          height: 720,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(57,217,138,0.18) 0%, rgba(57,217,138,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <style>{`
        .kayaa-listener-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          max-width: 1100px;
          margin: 56px auto 0;
        }
        .kayaa-listener-card {
          background: rgba(13,17,23,0.72);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(57,217,138,0.18);
          border-radius: 16px;
          padding: 28px 24px;
        }
        .kayaa-listener-cta:hover {
          filter: brightness(1.1);
          transform: translateY(-2px);
          box-shadow: 0 14px 40px rgba(57,217,138,0.45) !important;
        }
        @media (max-width: 820px) { .kayaa-listener-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ position: "relative", maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
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
          A movement, not a directory
        </p>
        <h2
          className="reveal"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(34px, 5vw, 60px)",
            color: "var(--warm-white)",
            lineHeight: 1.05,
            margin: "0 0 22px",
          }}
        >
          Be a <span style={{ color: "var(--green)" }}>Neighbourhood Listener.</span>
        </h2>
        <p
          className="reveal"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 18,
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.6,
            margin: 0,
            maxWidth: 620,
            marginInline: "auto",
          }}
        >
          Share a place you love — or your own. Help make it impossible to miss.
          One nomination is one place pulled out of invisibility.
        </p>
      </div>

      <div className="kayaa-listener-grid">
        {STEPS.map((s, i) => (
          <div key={s.n} className={`kayaa-listener-card reveal reveal-delay-${i + 1}`}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--green)",
                letterSpacing: "0.16em",
                marginBottom: 14,
              }}
            >
              {s.n}
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 24,
                color: "var(--warm-white)",
                marginBottom: 12,
              }}
            >
              {s.title}
            </div>
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
          </div>
        ))}
      </div>

      <div style={{ position: "relative", textAlign: "center", marginTop: 56 }}>
        <button
          type="button"
          onClick={() => openWaitlist(1)}
          className="kayaa-listener-cta reveal"
          style={{
            background: "var(--green)",
            color: "var(--midnight)",
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: 16,
            padding: "18px 40px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 10px 38px rgba(57,217,138,0.4)",
            transition: "all .2s ease",
          }}
        >
          Nominate a place →
        </button>
        <p
          className="reveal"
          style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontSize: 14,
            color: "rgba(255,255,255,0.55)",
            margin: "18px 0 0",
          }}
        >
          Tell us the place in your area that keeps pulling people back.
        </p>
        <div
          className="reveal"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 22,
          }}
        >
          <ShareButton
            label="Share this with your street"
            variant="soft"
            showWhatsApp
            align="center"
          />
        </div>
      </div>
    </section>
  );
}