import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const storySchema = z.object({
  place_name: z.string().trim().min(1, "Place name is required").max(200),
  place_type: z.string().trim().max(200).optional().or(z.literal("")),
  story: z.string().trim().max(4000).optional().or(z.literal("")),
  contact: z.string().trim().max(200).optional().or(z.literal("")),
});

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--card-kayaa)",
  border: "1px solid var(--border-kayaa)",
  borderRadius: 8,
  padding: "13px 16px",
  color: "var(--warm-white)",
  fontFamily: "var(--font-body)",
  fontSize: 14,
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

export function ResearchBrief() {
  const [form, setForm] = useState({ place_name: "", place_type: "", story: "", contact: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const parsed = storySchema.safeParse(form);
    if (!parsed.success) {
      setErrorMsg(parsed.error.issues[0]?.message ?? "Please check the form.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    const { error } = await supabase.from("community_stories").insert({
      place_name: parsed.data.place_name,
      place_type: parsed.data.place_type || null,
      story: parsed.data.story || null,
      contact: parsed.data.contact || null,
      source: "landing_page",
    });
    if (error) {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
      return;
    }
    setStatus("success");
  };

  return (
    <section
      className="kayaa-brief"
      style={{
        background: "var(--midnight)",
        position: "relative",
        padding: "120px 24px",
        overflow: "hidden",
      }}
    >
      <style>{`
        .kayaa-brief::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .kayaa-brief input:focus,
        .kayaa-brief textarea:focus {
          border-color: var(--green) !important;
          box-shadow: 0 0 0 3px rgba(57,217,138,0.1);
        }
        .kayaa-brief input::placeholder,
        .kayaa-brief textarea::placeholder {
          color: var(--muted-kayaa);
        }
        .kayaa-brief-submit { transition: all 0.2s ease; }
        .kayaa-brief-submit:not(:disabled):hover {
          filter: brightness(1.08);
          box-shadow: 0 0 44px rgba(57,217,138,0.28);
          transform: translateY(-1px);
        }
      `}</style>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 600,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          className="reveal"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginBottom: 24,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--green)",
              boxShadow: "0 0 6px rgba(57,217,138,0.5)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--muted-kayaa)",
            }}
          >
            kayaa · Community Research Brief 001
          </span>
        </div>

        <h2
          className="reveal"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 50px)",
            color: "#FFFFFF",
            lineHeight: 1.15,
            marginBottom: 24,
            transitionDelay: "0.1s",
          }}
        >
          What is that place in your area?
        </h2>

        <div
          className="reveal"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 17,
            color: "var(--muted-kayaa)",
            lineHeight: 1.9,
            marginBottom: 52,
            transitionDelay: "0.2s",
          }}
        >
          <div>The one that keeps pulling people back.</div>
          <div>The one that would hurt if it closed.</div>
          <div>The one whose story deserves to be told.</div>
        </div>

        <div
          className="reveal"
          style={{
            textAlign: "left",
            background: "var(--card-kayaa)",
            border: "1px solid var(--border-kayaa)",
            borderLeft: "3px solid var(--green)",
            borderRadius: 10,
            padding: "20px 24px",
            marginBottom: 52,
            transitionDelay: "0.3s",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--warm-white)",
            }}
          >
            🚗 KWAMAHLANGU CAR WASH · Car wash · Alexandra
          </div>
          <div style={{ borderTop: "1px solid var(--border-kayaa)", margin: "12px 0" }} />
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
              fontSize: 14,
              color: "var(--muted-kayaa)",
              lineHeight: 1.65,
            }}
          >
            "Even now, people come for more than the wash. They come for the conversations, the connections, and the feeling of being part of something."
          </div>
        </div>

        {status === "success" ? (
          <div
            style={{
              animation: "fadeInUp 0.4s ease",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "rgba(57,217,138,0.1)",
                border: "1px solid rgba(57,217,138,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                color: "var(--green)",
                margin: "0 auto 20px",
              }}
            >
              ✓
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 22,
                color: "#FFFFFF",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Thank you.
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                color: "var(--muted-kayaa)",
                textAlign: "center",
                lineHeight: 1.6,
              }}
            >
              This place is now part of the kayaa community archive.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "var(--muted-kayaa)",
                textAlign: "center",
                marginTop: 8,
                opacity: 0.7,
              }}
            >
              These stories help us build kayaa for the places that matter most.
            </p>
          </div>
        ) : (
          <>
            <div
              className="reveal"
              style={{
                textAlign: "left",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 12,
                color: "var(--warm-white)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 14,
                transitionDelay: "0.4s",
              }}
            >
              Tell us yours:
            </div>
            <form
              onSubmit={onSubmit}
              className="reveal"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                textAlign: "left",
                transitionDelay: "0.5s",
              }}
            >
              <input
                type="text"
                name="place_name"
                placeholder="Place name"
                required
                maxLength={200}
                value={form.place_name}
                onChange={onChange}
                style={inputStyle}
              />
              <input
                type="text"
                name="place_type"
                placeholder="What kind of place is it? (barbershop, café, shisanyama...)"
                maxLength={200}
                value={form.place_type}
                onChange={onChange}
                style={inputStyle}
              />
              <textarea
                name="story"
                rows={4}
                placeholder="One thing that makes it matter — a story, a memory, a detail you'd want people to know."
                maxLength={4000}
                value={form.story}
                onChange={onChange}
                style={{ ...inputStyle, resize: "vertical" }}
              />
              <input
                type="text"
                name="contact"
                placeholder="Your WhatsApp or email (optional)"
                maxLength={200}
                value={form.contact}
                onChange={onChange}
                style={inputStyle}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="kayaa-brief-submit"
                style={{
                  width: "100%",
                  background: "var(--green)",
                  color: "var(--midnight)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: 15,
                  padding: "14px 20px",
                  borderRadius: 8,
                  border: "none",
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  boxShadow: "0 0 30px rgba(57,217,138,0.15)",
                  opacity: status === "loading" ? 0.7 : 1,
                }}
              >
                {status === "loading" ? "Sharing..." : "Share this place →"}
              </button>
              {status === "error" && errorMsg && (
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    color: "#EF4444",
                    marginTop: 8,
                  }}
                >
                  {errorMsg}
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </section>
  );
}