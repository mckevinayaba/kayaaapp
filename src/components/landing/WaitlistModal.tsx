import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import {
  hasJoined,
  markJoined,
  normaliseZAPhone,
  onWaitlistOpen,
} from "@/lib/waitlist-store";

const PLACE_TYPES = [
  "Barbershop",
  "Salon",
  "Shisanyama",
  "Spaza / Tuckshop",
  "Car wash",
  "Food spot",
  "Church",
  "Café",
  "Mechanic",
  "Other",
] as const;

const step1Schema = z.object({
  area: z.string().trim().min(2, "Tell us your suburb").max(120),
  contact: z.string().trim().min(6, "Add your WhatsApp number").max(40),
});

type Step = "capture" | "nominate" | "done";

export function WaitlistModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("capture");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [area, setArea] = useState("");
  const [contact, setContact] = useState("");
  const [normalisedContact, setNormalisedContact] = useState("");

  const [placeName, setPlaceName] = useState("");
  const [placeType, setPlaceType] = useState<string>("");
  const [why, setWhy] = useState("");

  const dialogRef = useRef<HTMLDivElement>(null);

  // Listen for global open events
  useEffect(() => {
    return onWaitlistOpen((initialStep) => {
      // If they've already joined, jump to nominate flow
      if (hasJoined()) {
        setStep("nominate");
      } else {
        setStep(initialStep === 2 ? "nominate" : "capture");
      }
      setError(null);
      setOpen(true);
    });
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    // Reset after fade
    setTimeout(() => {
      setError(null);
      if (step === "done") {
        // keep done state cached but reset for next session
        setStep("capture");
        setArea("");
        setContact("");
        setPlaceName("");
        setPlaceType("");
        setWhy("");
      }
    }, 200);
  };

  const submitCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = step1Schema.safeParse({ area, contact });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check the form");
      return;
    }
    const normalised = normaliseZAPhone(parsed.data.contact);
    if (!normalised) {
      setError("Use a valid WhatsApp number (e.g. 071 234 5678 or +27...)");
      return;
    }
    setSubmitting(true);
    const { error: dbError } = await supabase.from("country_waitlist").insert({
      area: parsed.data.area,
      contact: normalised,
      contact_type: "whatsapp",
      country_code: "ZA",
      source: "landing_modal",
    });
    setSubmitting(false);
    if (dbError) {
      setError("Couldn't send right now. Try again.");
      return;
    }
    setNormalisedContact(normalised);
    markJoined();
    setStep("nominate");
  };

  const submitNominate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!placeName.trim()) {
      setError("Add the place name (or skip)");
      return;
    }
    setSubmitting(true);
    const { error: dbError } = await supabase.from("community_stories").insert({
      place_name: placeName.trim().slice(0, 200),
      place_type: placeType || null,
      story: why.trim() ? why.trim().slice(0, 4000) : null,
      contact: normalisedContact || null,
      source: "landing_modal",
    });
    setSubmitting(false);
    if (dbError) {
      setError("Couldn't save the place. Try again.");
      return;
    }
    setStep("done");
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="kayaa-waitlist-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(5,8,12,0.78)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        animation: "kayaaModalFade 0.2s ease",
      }}
    >
      <style>{`
        @keyframes kayaaModalFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes kayaaModalSlide {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .kayaa-wm-input {
          width: 100%;
          background: #0D1117;
          border: 1px solid #21262D;
          border-radius: 8px;
          padding: 14px 16px;
          font-family: var(--font-body);
          font-size: 16px;
          color: #F0F6FC;
          outline: none;
          transition: border-color 0.15s;
          box-sizing: border-box;
        }
        .kayaa-wm-input:focus { border-color: #39D98A; }
        .kayaa-wm-input::placeholder { color: #4B5563; }
        .kayaa-wm-chip {
          background: #0D1117;
          border: 1px solid #21262D;
          border-radius: 999px;
          padding: 8px 14px;
          font-family: var(--font-body);
          font-size: 13px;
          color: rgba(255,255,255,0.75);
          cursor: pointer;
          transition: all 0.15s;
        }
        .kayaa-wm-chip:hover { border-color: rgba(57,217,138,0.5); color: #FFFFFF; }
        .kayaa-wm-chip[data-active="true"] {
          background: rgba(57,217,138,0.12);
          border-color: #39D98A;
          color: #39D98A;
        }
      `}</style>

      <div
        ref={dialogRef}
        style={{
          width: "100%",
          maxWidth: 460,
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#161B22",
          border: "1px solid #21262D",
          borderRadius: 16,
          padding: 28,
          position: "relative",
          animation: "kayaaModalSlide 0.25s ease",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(57,217,138,0.06)",
        }}
      >
        <button
          aria-label="Close"
          onClick={close}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 32,
            height: 32,
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.5)",
            cursor: "pointer",
            fontSize: 22,
            lineHeight: 1,
            borderRadius: 6,
          }}
        >
          ×
        </button>

        {step === "capture" && (
          <form onSubmit={submitCapture}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "#39D98A",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                margin: "0 0 12px",
              }}
            >
              Join the waitlist
            </p>
            <h2
              id="kayaa-waitlist-title"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 26,
                color: "#FFFFFF",
                margin: "0 0 8px",
                lineHeight: 1.2,
              }}
            >
              Be first when kayaa lands in your area.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "rgba(255,255,255,0.6)",
                margin: "0 0 24px",
                lineHeight: 1.5,
              }}
            >
              We'll WhatsApp you the moment kayaa goes live where you are. No
              spam, no email lists.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input
                className="kayaa-wm-input"
                placeholder="Your suburb (e.g. Tembisa)"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                autoFocus
                required
                maxLength={120}
              />
              <input
                className="kayaa-wm-input"
                placeholder="WhatsApp number (e.g. 071 234 5678)"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                inputMode="tel"
                required
                maxLength={40}
              />
            </div>

            {error && (
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "#F59E0B",
                  margin: "12px 0 0",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: "100%",
                marginTop: 20,
                background: "#39D98A",
                color: "#0D1117",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: 15,
                padding: "15px 22px",
                borderRadius: 8,
                border: "none",
                cursor: submitting ? "wait" : "pointer",
                opacity: submitting ? 0.7 : 1,
                boxShadow: "0 0 40px rgba(57,217,138,0.25)",
              }}
            >
              {submitting ? "Joining..." : "Join the waitlist →"}
            </button>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
                margin: "14px 0 0",
                textAlign: "center",
              }}
            >
              We'll only WhatsApp you. Never sold, never shared.
            </p>
          </form>
        )}

        {step === "nominate" && (
          <form onSubmit={submitNominate}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "#39D98A",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                margin: "0 0 12px",
              }}
            >
              {hasJoined() && !normalisedContact
                ? "Nominate a place"
                : "You're in. One last thing."}
            </p>
            <h2
              id="kayaa-waitlist-title"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 24,
                color: "#FFFFFF",
                margin: "0 0 8px",
                lineHeight: 1.25,
              }}
            >
              Tell us one place that would hurt if it closed.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "rgba(255,255,255,0.6)",
                margin: "0 0 22px",
                lineHeight: 1.5,
              }}
            >
              We'll start with the places you nominate.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input
                className="kayaa-wm-input"
                placeholder="Place name (e.g. Uncle Dee's Barbershop)"
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
                autoFocus
                maxLength={200}
              />

              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.5)",
                    margin: "0 0 8px",
                  }}
                >
                  What kind of place?
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {PLACE_TYPES.map((t) => (
                    <button
                      type="button"
                      key={t}
                      className="kayaa-wm-chip"
                      data-active={placeType === t}
                      onClick={() => setPlaceType(placeType === t ? "" : t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                className="kayaa-wm-input"
                placeholder="Why does it matter? (optional)"
                value={why}
                onChange={(e) => setWhy(e.target.value)}
                rows={3}
                maxLength={500}
                style={{ resize: "vertical", minHeight: 80 }}
              />
            </div>

            {error && (
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "#F59E0B",
                  margin: "12px 0 0",
                }}
              >
                {error}
              </p>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button
                type="button"
                onClick={() => setStep("done")}
                style={{
                  flex: "0 0 auto",
                  background: "transparent",
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: 14,
                  padding: "14px 18px",
                  borderRadius: 8,
                  border: "1px solid #21262D",
                  cursor: "pointer",
                }}
              >
                Skip
              </button>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  flex: 1,
                  background: "#39D98A",
                  color: "#0D1117",
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: 15,
                  padding: "14px 22px",
                  borderRadius: 8,
                  border: "none",
                  cursor: submitting ? "wait" : "pointer",
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? "Sending..." : "Submit place →"}
              </button>
            </div>
          </form>
        )}

        {step === "done" && (
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(57,217,138,0.12)",
                border: "1px solid rgba(57,217,138,0.4)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 18px",
                fontSize: 28,
                color: "#39D98A",
              }}
              aria-hidden
            >
              ✓
            </div>
            <h2
              id="kayaa-waitlist-title"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 24,
                color: "#FFFFFF",
                margin: "0 0 10px",
              }}
            >
              You're in.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.55,
                margin: "0 0 24px",
              }}
            >
              We'll WhatsApp you when kayaa is live in <strong style={{ color: "#39D98A" }}>{area || "your area"}</strong>. Tell a neighbour.
            </p>
            <button
              onClick={close}
              style={{
                background: "#0D1117",
                color: "#FFFFFF",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: 14,
                padding: "12px 22px",
                borderRadius: 8,
                border: "1px solid #21262D",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}