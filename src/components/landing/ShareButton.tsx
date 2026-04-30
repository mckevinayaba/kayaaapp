import { useState } from "react";
import {
  getWhatsAppHref,
  nativeShare,
  SHARE_DEFAULT_TEXT,
} from "@/lib/share";

type Variant = "primary" | "ghost" | "soft";

type Props = {
  label?: string;
  text?: string;
  variant?: Variant;
  /** Show a small WhatsApp shortcut alongside the main share button. */
  showWhatsApp?: boolean;
  /** Optional inline style overrides for the wrapper. */
  style?: React.CSSProperties;
  /** Alignment of the row. */
  align?: "left" | "center" | "right";
};

const variantStyle = (v: Variant): React.CSSProperties => {
  if (v === "primary") {
    return {
      background: "var(--green)",
      color: "var(--midnight)",
      border: "none",
      boxShadow: "0 0 30px rgba(57,217,138,0.35)",
    };
  }
  if (v === "soft") {
    return {
      background: "rgba(57,217,138,0.10)",
      color: "var(--green)",
      border: "1px solid rgba(57,217,138,0.4)",
    };
  }
  return {
    background: "transparent",
    color: "var(--warm-white)",
    border: "1px solid rgba(255,255,255,0.22)",
  };
};

export function ShareButton({
  label = "Share this page",
  text = SHARE_DEFAULT_TEXT,
  variant = "ghost",
  showWhatsApp = true,
  style,
  align = "left",
}: Props) {
  const [status, setStatus] = useState<null | "copied" | "shared">(null);

  const justify =
    align === "right" ? "flex-end" : align === "center" ? "center" : "flex-start";

  const onShare = async () => {
    const result = await nativeShare(text);
    if (result === "shared") {
      setStatus("shared");
      setTimeout(() => setStatus(null), 1800);
    } else if (result === "copied" || result === "unsupported") {
      setStatus("copied");
      setTimeout(() => setStatus(null), 1800);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap",
        justifyContent: justify,
        ...style,
      }}
    >
      <button
        type="button"
        onClick={onShare}
        className="kayaa-share-btn"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          fontSize: 13,
          padding: "10px 18px",
          borderRadius: 999,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          transition: "all .2s ease",
          ...variantStyle(variant),
        }}
        aria-label="Share kayaa with someone"
      >
        <span aria-hidden style={{ fontSize: 14, lineHeight: 1 }}>↗</span>
        {label}
      </button>

      {showWhatsApp && (
        <a
          href={getWhatsAppHref(text)}
          target="_blank"
          rel="noopener noreferrer"
          className="kayaa-share-wa"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: 13,
            padding: "10px 16px",
            borderRadius: 999,
            background: "rgba(37,211,102,0.12)",
            color: "#25D366",
            border: "1px solid rgba(37,211,102,0.4)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            transition: "all .2s ease",
          }}
          aria-label="Share on WhatsApp"
        >
          <span aria-hidden>💬</span> WhatsApp
        </a>
      )}

      {status && (
        <span
          role="status"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "rgba(255,255,255,0.65)",
          }}
        >
          {status === "copied" ? "Link copied — paste it anywhere" : "Thanks for sharing"}
        </span>
      )}

      <style>{`
        .kayaa-share-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
        .kayaa-share-wa:hover { background: rgba(37,211,102,0.2) !important; }
      `}</style>
    </div>
  );
}