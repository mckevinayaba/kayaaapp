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
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 24px;
        }
        .kayaa-footer-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 10px 18px;
          font-family: var(--font-body);
          font-size: 14px;
        }
        .kayaa-footer-link {
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font: inherit;
          transition: color .2s;
        }
        .kayaa-footer-link:hover { color: var(--green); }
        .kayaa-footer-sep {
          color: rgba(255,255,255,0.25);
          user-select: none;
        }
      `}</style>

      <div className="kayaa-footer-inner">
        <a
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 24,
            color: "var(--green)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          kayaa
        </a>

        <nav className="kayaa-footer-links" aria-label="Footer">
          <a href="/#how" className="kayaa-footer-link">How it works</a>
          <span className="kayaa-footer-sep">·</span>
          <a href="/#why" className="kayaa-footer-link">For places</a>
          <span className="kayaa-footer-sep">·</span>
          <Link to="/about" className="kayaa-footer-link">About</Link>
          <span className="kayaa-footer-sep">·</span>
          <button onClick={() => openWaitlist(1)} className="kayaa-footer-link">
            Nominate a place
          </button>
          <span className="kayaa-footer-sep">·</span>
          <button onClick={() => openWaitlist(1)} className="kayaa-footer-link">
            Join the waitlist
          </button>
        </nav>

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
          }}
        >
          © 2026 kayaa
        </div>
      </div>
    </footer>
  );
}
