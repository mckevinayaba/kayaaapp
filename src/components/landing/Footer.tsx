import { Link } from "@tanstack/react-router";
import { openWaitlist } from "@/lib/waitlist-store";

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--card-kayaa)",
        borderTop: "1px solid var(--border-kayaa)",
        padding: "56px 24px 40px",
      }}
    >
      <style>{`
        .kayaa-footer-inner {
          display: grid;
          grid-template-columns: 1.3fr 1fr 1fr;
          gap: 48px;
          max-width: 1100px;
          margin: 0 auto;
        }
        @media (max-width: 760px) {
          .kayaa-footer-inner { grid-template-columns: 1fr; gap: 32px; text-align: left; }
        }
        .kayaa-footer-link {
          font-family: var(--font-body);
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          display: block;
          padding: 4px 0;
          transition: color .2s;
        }
        .kayaa-footer-link:hover { color: var(--green); }
        .kayaa-footer-h {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin: 0 0 14px;
        }
      `}</style>

      <div className="kayaa-footer-inner">
        <div>
          <a
            href="/"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 22,
              color: "var(--green)",
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
          >
            kayaa
          </a>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.6,
              margin: "16px 0 24px",
              maxWidth: 360,
            }}
          >
            A neighbourhood-first way to see the local places that hold South
            Africa together. Built in Johannesburg. Coming neighbourhood by
            neighbourhood.
          </p>
          <button
            onClick={() => openWaitlist(1)}
            style={{
              background: "var(--green)",
              color: "var(--midnight)",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 14,
              padding: "12px 22px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
            }}
          >
            Join the waitlist →
          </button>
        </div>

        <div>
          <p className="kayaa-footer-h">The page</p>
          <a href="/#how" className="kayaa-footer-link">How it works</a>
          <a href="/#why" className="kayaa-footer-link">For places</a>
          <a href="/#community" className="kayaa-footer-link">Community</a>
          <Link to="/about" className="kayaa-footer-link">About</Link>
        </div>

        <div>
          <p className="kayaa-footer-h">Talk to us</p>
          <a className="kayaa-footer-link" href="https://wa.me/27000000000" target="_blank" rel="noreferrer">WhatsApp</a>
          <a className="kayaa-footer-link" href="https://instagram.com/kayaa.app" target="_blank" rel="noreferrer">Instagram</a>
          <a className="kayaa-footer-link" href="mailto:hello@kayaa.co.za">hello@kayaa.co.za</a>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1100,
          margin: "40px auto 0",
          paddingTop: 24,
          borderTop: "1px solid var(--border-kayaa)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.35)",
          textTransform: "uppercase",
        }}
      >
        <span>© 2026 kayaa · Built in South Africa 🇿🇦</span>
        <span>Pre-launch · Joining the wait keeps you first</span>
      </div>
    </footer>
  );
}
