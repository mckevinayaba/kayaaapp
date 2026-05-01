const PLACE_LINES = [
  "The barbershop.",
  "The salon.",
  "The restaurant.",
  "The café.",
  "The tuckshop.",
  "The spaza shop.",
  "The shisanyama.",
  "The tavern.",
  "The club.",
  "The clothing shop.",
  "The car wash.",
  "The church hall.",
  "The pharmacy.",
  "The mechanic.",
  "The corner food spot.",
];

const PILLS = [
  "Barbershops",
  "Salons",
  "Restaurants",
  "Cafés",
  "Tuckshops",
  "Spaza shops",
  "Shisanyamas",
  "Taverns",
  "Car washes",
  "Pharmacies",
  "Mechanics",
  "Clothing shops",
] as const;

const ITALIC_LINES = [
  "The family coffee shop in Rosebank.",
  "The trusted mechanic in Randburg.",
  "The salon in Sandton.",
  "The food spot in Maboneng.",
  "The corner pub in Fourways.",
  "The pharmacy in Braamfontein.",
  "The restaurant in Hillbrow.",
  "The shisanyama in Soweto.",
  "The car wash in Tembisa.",
  "The salon in Khayelitsha.",
  "The tuckshop in Mitchells Plain.",
];

const divider = {
  height: "1px",
  background: "var(--border-kayaa)",
  margin: "72px 0",
} as const;

export function TruthSection() {
  return (
    <section
      style={{
        background: "var(--midnight)",
        padding: "120px 24px",
        textAlign: "center",
      }}
    >
      <style>{`
        .kayaa-pill { transition: all 0.2s ease; }
        .kayaa-pill:hover {
          border-color: var(--green) !important;
          color: var(--green) !important;
        }
      `}</style>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div>
          {PLACE_LINES.map((line, i) => (
            <div
              key={line}
              className={`reveal`}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(32px, 4.5vw, 54px)",
                lineHeight: 1.15,
                color: "#FFFFFF",
                marginBottom: "6px",
                transitionDelay: `${i * 0.12}s`,
              }}
            >
              {line}
            </div>
          ))}
          <p
            className="reveal"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: 18,
              color: "var(--muted-kayaa)",
              marginTop: 28,
            }}
          >
            The places every neighbourhood keeps going back to.
          </p>
          <p
            className="reveal"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 22,
              color: "var(--green)",
              marginTop: 8,
            }}
          >
            Still hard to find.
          </p>
        </div>

        <div style={divider} />

        <div
          className="reveal"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 10,
            marginBottom: 64,
          }}
        >
          {PILLS.map((label) => (
            <span
              key={label}
              className="kayaa-pill"
              style={{
                background: "var(--card-kayaa)",
                border: "1px solid var(--border-kayaa)",
                borderRadius: 999,
                padding: "9px 18px",
                color: "var(--warm-white)",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "default",
              }}
            >
              {label}
            </span>
          ))}
        </div>

        <div style={divider} />

        <div>
          <h2
            className="reveal"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(24px, 3vw, 38px)",
              color: "#FFFFFF",
              marginBottom: 28,
            }}
          >
            This is the neighbourhood. Wherever it is.
          </h2>
          {ITALIC_LINES.map((line, i) => (
            <div
              key={line}
              className="reveal"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: 18,
                color: "var(--muted-kayaa)",
                lineHeight: 1.9,
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              {line}
            </div>
          ))}
          <p
            className="reveal"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(22px, 2.5vw, 32px)",
              color: "var(--green)",
              marginTop: 36,
            }}
          >
            Different streets. Same wound.
          </p>
        </div>
      </div>
    </section>
  );
}