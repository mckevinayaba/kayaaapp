import { useEffect, useRef, useState } from "react";
import { openWaitlist } from "@/lib/waitlist-store";

const BEATS = [
  {
    n: "01",
    title: "You open kayaa.",
    body:
      "Your street appears — every place that actually matters, mapped by the people who walk past them every day.",
  },
  {
    n: "02",
    title: "You walk in.",
    body:
      "One tap says: I was here. No booking. No payment. No friction. Just you and the place.",
  },
  {
    n: "03",
    title: "The place sees you back.",
    body:
      "Your face becomes a name. Your visits become a record. The owner finally has a way to reach the people who already love them.",
  },
  {
    n: "04",
    title: "Your neighbourhood becomes visible.",
    body:
      "The places holding it together stop being invisible — to banks, councils, newcomers, sponsors, and to the people who live two streets away and still don't know they exist.",
  },
];

export function HowItWorks() {
  const [activeIdx, setActiveIdx] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActiveIdx((cur) => Math.max(cur, i));
          });
        },
        { rootMargin: "-40% 0px -40% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      id="how"
      style={{
        background: "var(--midnight)",
        padding: "120px 6%",
        borderTop: "1px solid var(--border-kayaa)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto 64px", textAlign: "center" }}>
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
          What kayaa is going to feel like
        </p>
        <h2
          className="reveal"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(30px, 4.4vw, 54px)",
            color: "var(--warm-white)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          Four moments. <span style={{ color: "var(--green)" }}>One shift.</span>
        </h2>
      </div>

      <div
        style={{
          maxWidth: 820,
          margin: "0 auto",
          position: "relative",
          paddingLeft: 56,
        }}
      >
        {/* Vertical track */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 18,
            top: 8,
            bottom: 8,
            width: 2,
            background: "var(--border-kayaa)",
            borderRadius: 2,
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 18,
            top: 8,
            width: 2,
            height: `${((activeIdx + 1) / BEATS.length) * 100}%`,
            background: "var(--green)",
            borderRadius: 2,
            boxShadow: "0 0 12px rgba(57,217,138,0.6)",
            transition: "height 0.6s cubic-bezier(.22,.61,.36,1)",
          }}
        />

        {BEATS.map((b, i) => {
          const isOn = i <= activeIdx;
          return (
            <div
              key={b.n}
              ref={(el) => {
                refs.current[i] = el;
              }}
              style={{
                position: "relative",
                padding: "32px 0",
                opacity: isOn ? 1 : 0.35,
                transition: "opacity 0.6s ease",
              }}
            >
              {/* Node */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: -56 + 12,
                  top: 38,
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  background: isOn ? "var(--green)" : "var(--card-kayaa)",
                  border: `2px solid ${isOn ? "var(--green)" : "var(--border-kayaa)"}`,
                  boxShadow: isOn ? "0 0 18px rgba(57,217,138,0.55)" : "none",
                  transition: "all 0.4s ease",
                }}
              />
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--green)",
                  letterSpacing: "0.18em",
                  marginBottom: 10,
                }}
              >
                {b.n}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(22px, 2.8vw, 34px)",
                  color: "var(--warm-white)",
                  letterSpacing: "-0.01em",
                  margin: "0 0 12px",
                  lineHeight: 1.15,
                }}
              >
                {b.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 17,
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.65,
                  margin: 0,
                  maxWidth: 620,
                }}
              >
                {b.body}
              </p>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center", marginTop: 64 }}>
        <button
          type="button"
          onClick={() => openWaitlist(1)}
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
            transition: "all .2s ease",
          }}
        >
          Join the waitlist →
        </button>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.16em",
            marginTop: 14,
          }}
        >
          PRE-LAUNCH · NO SPAM · WHATSAPP ONLY
        </p>
      </div>
    </section>
  );
}
