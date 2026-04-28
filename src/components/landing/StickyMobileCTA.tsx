import { useEffect, useState } from "react";
import { hasJoined, openWaitlist } from "@/lib/waitlist-store";

export function StickyMobileCTA() {
  const [hidden, setHidden] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Hide if user already joined; show otherwise after they scroll a bit
  useEffect(() => {
    if (hasJoined()) {
      setHidden(true);
      return;
    }
    setHidden(false);
    const onScroll = () => setScrolled(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hidden) return null;

  return (
    <div
      className="kayaa-sticky-mobile"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 90,
        padding: "10px 14px calc(10px + env(safe-area-inset-bottom))",
        background: "rgba(13,17,23,0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(57,217,138,0.25)",
        transform: scrolled ? "translateY(0)" : "translateY(110%)",
        transition: "transform 0.3s ease",
      }}
    >
      <style>{`
        .kayaa-sticky-mobile { display: none; }
        @media (max-width: 768px) {
          .kayaa-sticky-mobile { display: block; }
        }
      `}</style>
      <button
        onClick={() => openWaitlist(1)}
        style={{
          width: "100%",
          background: "#39D98A",
          color: "#0D1117",
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: 15,
          padding: "14px 18px",
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(57,217,138,0.3)",
        }}
      >
        Join the waitlist →
      </button>
    </div>
  );
}