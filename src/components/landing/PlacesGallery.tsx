const PLACES = [
  {
    name: "Sbu's Cuts",
    type: "Barbershop",
    suburb: "Orlando West, Soweto",
    photo: "https://images.unsplash.com/photo-1559762705-2123aa9b62cb?w=900&q=80",
  },
  {
    name: "Mama Zulu's Tuckshop",
    type: "Tuckshop",
    suburb: "Mamelodi, Pretoria",
    photo: "https://images.unsplash.com/photo-1604348849899-7c4f0c66c5f9?w=900&q=80",
  },
  {
    name: "Sizwe Shisanyama",
    type: "Shisanyama",
    suburb: "Tembisa, Ekurhuleni",
    photo: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=900&q=80",
  },
  {
    name: "KwaMahlangu Car Wash",
    type: "Car Wash",
    suburb: "Alexandra, Joburg",
    photo: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=900&q=80",
  },
  {
    name: "Zanele's Salon",
    type: "Salon",
    suburb: "Diepkloof, Soweto",
    photo: "https://images.unsplash.com/photo-1535086181678-5a5c4d23aa7c?w=900&q=80",
  },
  {
    name: "Mitchells Plain Hall",
    type: "Community Hall",
    suburb: "Mitchells Plain, Cape Town",
    photo: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=900&q=80",
  },
  {
    name: "New Hope Church Hall",
    type: "Church Hall",
    suburb: "Khayelitsha, Cape Town",
    photo: "https://images.unsplash.com/photo-1612825173281-9a193378527e?w=900&q=80",
  },
  {
    name: "Corner Tavern",
    type: "Tavern",
    suburb: "Meadowlands, Soweto",
    photo: "https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=900&q=80",
  },
];

export function PlacesGallery() {
  return (
    <section
      style={{
        background: "#0A0E14",
        padding: "100px 6%",
        borderTop: "1px solid #21262D",
      }}
    >
      <style>{`
        .kayaa-gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .kayaa-gallery-tile {
          position: relative;
          aspect-ratio: 4/5;
          border-radius: 12px;
          overflow: hidden;
          background: #161B22;
          transition: transform 0.3s ease;
          cursor: pointer;
        }
        .kayaa-gallery-tile:hover { transform: translateY(-4px); }
        .kayaa-gallery-tile img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          filter: grayscale(35%) contrast(1.05) brightness(0.85);
          transition: filter 0.4s ease, transform 0.6s ease;
        }
        .kayaa-gallery-tile:hover img { filter: grayscale(0%) brightness(1); transform: scale(1.05); }
        @media (max-width: 1000px) { .kayaa-gallery-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 520px) { .kayaa-gallery-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: 56 }}>
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
          The places we're for
        </p>
        <h2
          className="reveal"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(28px, 3.5vw, 44px)",
            color: "#FFFFFF",
            margin: 0,
            maxWidth: 720,
            marginInline: "auto",
            lineHeight: 1.15,
          }}
        >
          Soweto. Alex. Tembisa. Khayelitsha.
          <br />
          <span style={{ color: "#39D98A" }}>This is where kayaa lives.</span>
        </h2>
        <p
          className="reveal"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            color: "rgba(240,246,252,0.6)",
            margin: "20px auto 0",
            maxWidth: 540,
            lineHeight: 1.6,
          }}
        >
          Not the spots Google ranks. The places your neighbourhood actually
          revolves around.
        </p>
      </div>

      <div className="kayaa-gallery-grid">
        {PLACES.map((p) => (
          <div key={p.name} className="kayaa-gallery-tile reveal">
            <img src={p.photo} alt={`${p.name} in ${p.suburb}`} loading="lazy" />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(13,17,23,0.95) 0%, rgba(13,17,23,0.4) 50%, rgba(13,17,23,0) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 16,
                right: 16,
                bottom: 14,
                color: "#FFFFFF",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  color: "#39D98A",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                {p.type}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 17,
                  lineHeight: 1.2,
                }}
              >
                {p.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.65)",
                  marginTop: 4,
                }}
              >
                {p.suburb}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}