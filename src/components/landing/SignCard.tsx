import type { CSSProperties } from "react";

export interface SignCardProps {
  emoji: string;
  name: string;
  type: string;
  area: string;
  quote?: string;
  featured?: boolean;
  floating?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function SignCard({
  emoji,
  name,
  type,
  area,
  quote,
  featured = false,
  floating = false,
  className,
  style,
}: SignCardProps) {
  const baseStyle: CSSProperties = {
    background: "var(--card-kayaa)",
    border: "1px solid var(--border-kayaa)",
    borderLeft: "3px solid var(--green)",
    borderRadius: "8px",
    padding: "12px 16px",
    transition: "all 0.2s ease",
    cursor: "default",
    ...(floating
      ? { pointerEvents: "none", opacity: 0.38, position: "absolute" }
      : {}),
    ...style,
  };

  return (
    <div
      className={`sign-card ${floating ? "" : "sign-card-hover"} ${className ?? ""}`}
      style={baseStyle}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: "12px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span aria-hidden style={{ fontSize: "14px" }}>{emoji}</span>
        <span>{name}</span>
      </div>
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "11px",
          color: "var(--muted-kayaa)",
          marginTop: "4px",
        }}
      >
        {type} · {area}
      </div>
      {featured && quote && (
        <div
          style={{
            borderTop: "1px solid var(--border-kayaa)",
            marginTop: "10px",
            paddingTop: "10px",
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontSize: "12px",
            color: "var(--muted-kayaa)",
            lineHeight: 1.5,
          }}
        >
          {quote}
        </div>
      )}
      <style>{`
        .sign-card-hover:hover {
          border-color: var(--green) !important;
          box-shadow: 0 0 24px rgba(57,217,138,0.15);
        }
      `}</style>
    </div>
  );
}
