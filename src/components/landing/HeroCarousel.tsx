import { useEffect, useState, useCallback, useRef, type CSSProperties } from "react";
import { openWaitlist } from "@/lib/waitlist-store";

type Slide = {
  photo: string;
  alt: string;
  brightness: number;
  contrast: number;
  overlay: string;
  render: () => React.ReactNode;
};

const photoFilter = (b: number, c: number) => `contrast(${c}) brightness(${b})`;

const labelStyle: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--green)",
  margin: 0,
};

const headlineStyle = (extra: CSSProperties = {}): CSSProperties => ({
  fontFamily: "var(--font-display)",
  fontWeight: 800,
  fontSize: "clamp(36px, 5.4vw, 72px)",
  lineHeight: 1.02,
  letterSpacing: "-0.02em",
  color: "var(--warm-white)",
  margin: 0,
  ...extra,
});

const supportStyle = (extra: CSSProperties = {}): CSSProperties => ({
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: 17,
  color: "rgba(255,255,255,0.72)",
  lineHeight: 1.55,
  margin: 0,
  ...extra,
});

function SlideCTAs({ align = "left" }: { align?: "left" | "right" | "center" }) {
  const justify =
    align === "right" ? "flex-end" : align === "center" ? "center" : "flex-start";
  return (
    <div
      data-slide-ctas="true"
      style={{
        display: "flex",
        gap: 10,
        marginTop: 22,
        flexWrap: "wrap",
        justifyContent: justify,
      }}
    >
      <button
        type="button"
        onClick={() => openWaitlist(1)}
        className="kayaa-hero-primary"
        style={{
          background: "var(--green)",
          color: "var(--midnight)",
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: 13,
          padding: "12px 22px",
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          boxShadow: "0 0 40px var(--green-glow)",
          transition: "all .2s ease",
        }}
      >
        Nominate this kind of place
      </button>
      <button
        type="button"
        onClick={() => openWaitlist(1)}
        className="kayaa-hero-secondary"
        style={{
          background: "transparent",
          color: "var(--warm-white)",
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          fontSize: 13,
          padding: "12px 22px",
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.22)",
          cursor: "pointer",
          transition: "all .2s ease",
        }}
      >
        Join the waitlist →
      </button>
    </div>
  );
}

// Word-by-word reveal helper
function RevealWords({
  text,
  delay = 0,
  highlight,
  style,
}: {
  text: string;
  delay?: number;
  highlight?: string; // green-coloured words (substring)
  style?: CSSProperties;
}) {
  const words = text.split(" ");
  return (
    <span style={style}>
      {words.map((w, i) => {
        const isHL = highlight && text.indexOf(highlight) >= 0 &&
          // crude per-word highlight: matches if substring contains this word
          highlight.split(" ").includes(w.replace(/[.,]/g, ""));
        return (
          <span
            key={i}
            className="kayaa-word"
            style={{
              display: "inline-block",
              animationDelay: `${delay + i * 0.08}s`,
              color: isHL ? "var(--green)" : undefined,
              marginRight: "0.28em",
            }}
          >
            {w}
          </span>
        );
      })}
    </span>
  );
}

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const slides: Slide[] = [
    {
      photo: "/landing/01-made-in-soweto.jpg",
      alt: "South African neighbourhood street life",
      brightness: 0.62,
      contrast: 1.12,
      overlay:
        "linear-gradient(135deg, rgba(13,17,23,0.92) 0%, rgba(13,17,23,0.55) 55%, rgba(13,17,23,0.25) 100%)",
      render: () => (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "0 6% 11%",
            zIndex: 10,
            maxWidth: 980,
          }}
        >
          <h1 style={headlineStyle()}>
            <RevealWords text="We say support local." />
            <br />
            <RevealWords
              text="But we cannot find local."
              delay={0.45}
              highlight="cannot find local."
            />
          </h1>

          <p
            data-secondary="true"
            className="kayaa-fade-in"
            style={{
              ...supportStyle({ marginTop: 26, maxWidth: 540 }),
              animationDelay: "1.4s",
            }}
          >
            The corner shop, the salon, the shisanyama down the road — they're
            holding our neighbourhoods together while the world's apps pretend
            they don't exist. Help us put them on the map before they
            disappear.
          </p>

          <div
            className="kayaa-fade-in"
            style={{
              display: "flex",
              gap: 12,
              marginTop: 30,
              flexWrap: "wrap",
              animationDelay: "1.7s",
            }}
          >
            <button
              type="button"
              onClick={() => openWaitlist(1)}
              className="kayaa-hero-primary"
              style={{
                background: "var(--green)",
                color: "var(--midnight)",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: 15,
                padding: "15px 28px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 0 50px var(--green-glow)",
                transition: "all .2s ease",
              }}
            >
              Nominate a place now
            </button>
            <button
              type="button"
              onClick={() => openWaitlist(1)}
              className="kayaa-hero-secondary"
              style={{
                background: "transparent",
                color: "var(--warm-white)",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: 15,
                padding: "15px 28px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.22)",
                cursor: "pointer",
                transition: "all .2s ease",
              }}
            >
              Join the waitlist — be first when kayaa goes live
            </button>
          </div>
          <p
            data-secondary="true"
            className="kayaa-fade-in"
            style={{
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
              fontSize: 14,
              color: "rgba(240,246,252,0.55)",
              marginTop: 18,
              maxWidth: 520,
              animationDelay: "2s",
            }}
          >
            Tell us the place in your area that would hurt if it closed.
          </p>
        </div>
      ),
    },
    {
      photo: "/landing/09-township-barbershop.jpg",
      alt: "Township barbershop",
      brightness: 0.6,
      contrast: 1.12,
      overlay:
        "linear-gradient(to right, rgba(13,17,23,0) 0%, rgba(13,17,23,0) 25%, rgba(13,17,23,0.95) 100%)",
      render: () => (
        <div
          style={{
            position: "absolute",
            right: "6%",
            top: "50%",
            transform: "translateY(-50%)",
            maxWidth: 540,
            textAlign: "right",
            zIndex: 10,
          }}
        >
          <p style={{ ...labelStyle, marginBottom: 18 }}>The Barbershop</p>
          <h2 style={headlineStyle()}>
            He knows your cut.
            <br />
            He knows your story.
            <br />
            <span style={{ color: "var(--green)" }}>
              He just can't reach you
            </span>
            <br />
            when it's quiet.
          </h2>
          <p data-secondary="true" style={supportStyle({ marginTop: 22, fontSize: 16 })}>
            Every regular is invisible without a record.
          </p>
        </div>
      ),
    },
    {
      photo: "/landing/04-shisanyama-evening.jpg",
      alt: "Shisanyama at dusk",
      brightness: 0.6,
      contrast: 1.1,
      overlay:
        "linear-gradient(to top, rgba(13,17,23,0.97) 0%, rgba(13,17,23,0.55) 45%, rgba(13,17,23,0.1) 100%)",
      render: () => (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "0 10% 9%",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <p style={{ ...labelStyle, marginBottom: 18 }}>Friday Nights</p>
          <h2 style={headlineStyle()}>
            Friday is a feeling.
            <br />
            <span style={{ color: "var(--green)" }}>Not a day.</span>
          </h2>
          <p
            data-secondary="true"
            style={supportStyle({
              marginTop: 22,
              maxWidth: 600,
              marginInline: "auto",
            })}
          >
            The shisanyama doesn't need an Instagram page. It needs its
            regulars to find it.
          </p>
        </div>
      ),
    },
    {
      photo: "/landing/06-tuckshop-window.jpg",
      alt: "Tuckshop window",
      brightness: 0.62,
      contrast: 1.08,
      overlay:
        "radial-gradient(ellipse at 70% 50%, rgba(13,17,23,0) 0%, rgba(13,17,23,0.78) 60%, rgba(13,17,23,0.97) 100%)",
      render: () => (
        <div
          style={{
            position: "absolute",
            left: "6%",
            top: "50%",
            transform: "translateY(-50%)",
            maxWidth: 580,
            zIndex: 10,
          }}
        >
          <p style={{ ...labelStyle, marginBottom: 18 }}>The Tuckshop</p>
          <h2 style={headlineStyle()}>Trusted for years.</h2>
          <p
            style={headlineStyle({
              color: "rgba(255,255,255,0.65)",
              fontSize: "clamp(32px, 4.6vw, 60px)",
              marginTop: 6,
            })}
          >
            Full every weekend.
          </p>
          <p
            style={headlineStyle({
              color: "var(--green)",
              fontSize: "clamp(34px, 5vw, 64px)",
              marginTop: 10,
            })}
          >
            Still hard to find.
          </p>
        </div>
      ),
    },
  ];

  const total = slides.length;
  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);
  const prev = useCallback(
    () => setActive((a) => (a - 1 + total) % total),
    [total],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6500);
    return () => clearInterval(id);
  }, [paused, next]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      aria-label="kayaa story"
      className="kayaa-hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        width: "100vw",
        height: "100dvh",
        position: "relative",
        overflow: "hidden",
        background: "var(--midnight)",
      }}
    >
      <style>{`
        .kayaa-hero-primary:hover { filter: brightness(1.1); transform: translateY(-1px); }
        .kayaa-hero-secondary:hover { background: rgba(255,255,255,0.06) !important; border-color: rgba(255,255,255,0.5) !important; }
        .kayaa-dot { transition: all 0.3s ease; }
        .kayaa-progress-fill { animation: kayaaProgress 6.5s linear forwards; }
        .kayaa-progress-fill.kayaa-paused { animation-play-state: paused; }
        @keyframes kayaaProgress { from { width: 0%; } to { width: 100%; } }

        .kayaa-word {
          opacity: 0;
          transform: translateY(18px);
          animation: kayaaWordIn 0.7s cubic-bezier(.22,.61,.36,1) forwards;
        }
        @keyframes kayaaWordIn {
          to { opacity: 1; transform: translateY(0); }
        }
        .kayaa-fade-in {
          opacity: 0;
          animation: kayaaFadeIn 0.8s ease forwards;
        }
        @keyframes kayaaFadeIn { to { opacity: 1; } }

        @media (max-height: 760px) {
          .kayaa-hero h1, .kayaa-hero h2 {
            font-size: clamp(28px, 4.2vw, 52px) !important;
            line-height: 1.05 !important;
          }
          .kayaa-hero p[data-secondary="true"] { display: none !important; }
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "rgba(255,255,255,0.08)",
          zIndex: 50,
        }}
      >
        <div
          key={`${active}-${paused ? "p" : "r"}`}
          className={`kayaa-progress-fill ${paused ? "kayaa-paused" : ""}`}
          style={{ height: "100%", background: "var(--green)", width: 0 }}
        />
      </div>

      {slides.map((s, i) => (
        <div
          key={i}
          aria-hidden={i !== active}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === active ? 1 : 0,
            transition: "opacity 1s ease",
            pointerEvents: i === active ? "auto" : "none",
            background: "var(--midnight)",
          }}
        >
          <img
            src={s.photo}
            alt={s.alt}
            loading={i === 0 ? "eager" : "lazy"}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: photoFilter(s.brightness, s.contrast),
              zIndex: 0,
              transform: i === active ? "scale(1.04)" : "scale(1)",
              transition: "transform 8s ease-out",
            }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: s.overlay,
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          {i === active && s.render()}
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 8,
          zIndex: 50,
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setActive(i)}
            className="kayaa-dot"
            style={{
              width: i === active ? 24 : 6,
              height: 6,
              borderRadius: i === active ? 999 : "50%",
              border: "none",
              cursor: "pointer",
              background: i === active ? "var(--green)" : "rgba(255,255,255,0.25)",
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}
