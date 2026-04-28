import { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import {
  markJoined,
  normaliseZAPhone,
  onWaitlistOpen,
} from "@/lib/waitlist-store";

const PLACE_TYPES = [
  "Barbershop",
  "Salon",
  "Spaza",
  "Tuckshop",
  "Shisanyama",
  "Car wash",
  "Food spot",
  "Church",
  "Garage",
  "Café",
  "Other",
] as const;

const OWNERSHIP = [
  { key: "mine", label: "Yes, it's mine" },
  { key: "other", label: "No, it belongs to someone else" },
] as const;

type StepKey =
  | "area"
  | "place"
  | "type"
  | "why"
  | "ownership"
  | "contact"
  | "done";

const STEPS: StepKey[] = [
  "area",
  "place",
  "type",
  "why",
  "ownership",
  "contact",
];

const phoneSchema = z
  .string()
  .trim()
  .min(6, "Add your WhatsApp number")
  .max(40);
const emailSchema = z
  .string()
  .trim()
  .email("Check the email")
  .max(200)
  .optional()
  .or(z.literal(""));

export function WaitlistModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<StepKey>("area");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [area, setArea] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [placeAddress, setPlaceAddress] = useState("");
  const [placeType, setPlaceType] = useState<string>("");
  const [why, setWhy] = useState("");
  const [ownership, setOwnership] = useState<"mine" | "other" | "">("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const dialogRef = useRef<HTMLDivElement>(null);

  const stepIndex = STEPS.indexOf(step);
  const totalSteps = STEPS.length;
  const progress = step === "done" ? 100 : ((stepIndex) / totalSteps) * 100;

  useEffect(() => {
    return onWaitlistOpen(() => {
      setError(null);
      setStep("area");
      setOpen(true);
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      setError(null);
      if (step === "done") {
        setStep("area");
        setArea("");
        setPlaceName("");
        setPlaceAddress("");
        setPlaceType("");
        setWhy("");
        setOwnership("");
        setPhone("");
        setEmail("");
      }
    }, 200);
  };

  const goNext = () => {
    setError(null);
    if (step === "area") {
      if (area.trim().length < 2) return setError("Tell us your neighbourhood");
      setStep("place");
    } else if (step === "place") {
      if (placeName.trim().length < 2) return setError("Add the place name");
      if (placeAddress.trim().length < 2)
        return setError("Add where it is — suburb, area, or street");
      setStep("type");
    } else if (step === "type") {
      if (!placeType) return setError("Pick a category");
      setStep("why");
    } else if (step === "why") {
      // optional, but encourage
      setStep("ownership");
    } else if (step === "ownership") {
      if (!ownership) return setError("Pick one");
      setStep("contact");
    }
  };

  const goBack = () => {
    setError(null);
    const idx = STEPS.indexOf(step);
    if (idx > 0) setStep(STEPS[idx - 1]);
  };

  const submitFinal = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const phoneParsed = phoneSchema.safeParse(phone);
    if (!phoneParsed.success) {
      setError(phoneParsed.error.issues[0]?.message ?? "Add your WhatsApp number");
      return;
    }
    const normalised = normaliseZAPhone(phoneParsed.data);
    if (!normalised) {
      setError("Use a valid WhatsApp number (e.g. 071 234 5678 or +27...)");
      return;
    }
    const emailParsed = emailSchema.safeParse(email);
    if (!emailParsed.success) {
      setError(emailParsed.error.issues[0]?.message ?? "Check the email");
      return;
    }

    setSubmitting(true);

    // 1) Waitlist record (the contact)
    const contactPayload = email.trim()
      ? `${normalised} | ${email.trim().slice(0, 180)}`
      : normalised;

    const { error: waitlistErr } = await supabase
      .from("country_waitlist")
      .insert({
        area: area.trim().slice(0, 200),
        contact: contactPayload.slice(0, 200),
        contact_type: email.trim() ? "whatsapp+email" : "whatsapp",
        country_code: "ZA",
        source: "landing_flow",
      });

    if (waitlistErr) {
      setSubmitting(false);
      setError("Couldn't send right now. Try again.");
      return;
    }

    // 2) Place nomination
    const story = [
      placeAddress.trim() ? `Address: ${placeAddress.trim()}` : "",
      why.trim(),
      ownership === "mine" ? "[owner]" : ownership === "other" ? "[neighbour]" : "",
      area.trim() ? `Area: ${area.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n")
      .slice(0, 4000);

    await supabase.from("community_stories").insert({
      place_name: placeName.trim().slice(0, 200),
      place_type: placeType ? placeType.slice(0, 200) : null,
      story: story || null,
      contact: normalised,
      source: "landing_flow",
    });

    setSubmitting(false);
    markJoined();
    setStep("done");
  };

  const heading = useMemo(() => {
    switch (step) {
      case "area":
        return "What neighbourhood are you speaking from?";
      case "place":
        return "What's the place?";
      case "type":
        return "What kind of place is it?";
      case "why":
        return "Why does it matter?";
      case "ownership":
        return "Is this your place?";
      case "contact":
        return "Where should we notify you?";
      case "done":
        return "You're in.";
    }
  }, [step]);

  if (!open) return null;

  const onEnterAdvance = (e: React.KeyboardEvent) => {
    if (
      e.key === "Enter" &&
      step !== "why" &&
      step !== "contact" &&
      step !== "place"
    ) {
      e.preventDefault();
      goNext();
    }
  };

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
        background: "rgba(5,8,12,0.82)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        animation: "kayaaModalFade 0.2s ease",
      }}
    >
      <style>{`
        @keyframes kayaaModalFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes kayaaModalSlide {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes kayaaStepIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .kayaa-wm-input {
          width: 100%;
          background: #0D1117;
          border: 1px solid #21262D;
          border-radius: 10px;
          padding: 16px 18px;
          font-family: var(--font-body);
          font-size: 17px;
          color: #F0F6FC;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          box-sizing: border-box;
        }
        .kayaa-wm-input:focus {
          border-color: #39D98A;
          box-shadow: 0 0 0 3px rgba(57,217,138,0.15);
        }
        .kayaa-wm-input::placeholder { color: #4B5563; }
        .kayaa-wm-chip {
          background: #0D1117;
          border: 1px solid #21262D;
          border-radius: 999px;
          padding: 10px 16px;
          font-family: var(--font-body);
          font-size: 14px;
          color: rgba(255,255,255,0.78);
          cursor: pointer;
          transition: all 0.15s;
        }
        .kayaa-wm-chip:hover { border-color: rgba(57,217,138,0.5); color: #FFFFFF; }
        .kayaa-wm-chip[data-active="true"] {
          background: rgba(57,217,138,0.14);
          border-color: #39D98A;
          color: #39D98A;
        }
        .kayaa-wm-step { animation: kayaaStepIn 0.25s ease; }
        .kayaa-wm-ownership {
          display: block;
          width: 100%;
          text-align: left;
          background: #0D1117;
          border: 1px solid #21262D;
          border-radius: 12px;
          padding: 18px 20px;
          font-family: var(--font-body);
          font-size: 16px;
          color: #F0F6FC;
          cursor: pointer;
          transition: all 0.15s;
          margin-bottom: 10px;
        }
        .kayaa-wm-ownership:hover { border-color: rgba(57,217,138,0.5); }
        .kayaa-wm-ownership[data-active="true"] {
          background: rgba(57,217,138,0.10);
          border-color: #39D98A;
          color: #39D98A;
        }
      `}</style>

      <div
        ref={dialogRef}
        style={{
          width: "100%",
          maxWidth: 500,
          maxHeight: "92vh",
          overflowY: "auto",
          background: "#161B22",
          border: "1px solid #21262D",
          borderRadius: 18,
          padding: 0,
          position: "relative",
          animation: "kayaaModalSlide 0.25s ease",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(57,217,138,0.06)",
        }}
      >
        {/* Progress */}
        {step !== "done" && (
          <div
            style={{
              height: 3,
              background: "#21262D",
              borderTopLeftRadius: 18,
              borderTopRightRadius: 18,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "#39D98A",
                boxShadow: "0 0 16px rgba(57,217,138,0.6)",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        )}

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
            zIndex: 2,
          }}
        >
          ×
        </button>

        <div style={{ padding: "32px 28px 28px" }}>
          {step !== "done" && (
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "#39D98A",
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                margin: "0 0 14px",
              }}
            >
              Step {stepIndex + 1} of {totalSteps} · Neighbourhood waitlist
            </p>
          )}

          <h2
            id="kayaa-waitlist-title"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(22px, 4vw, 28px)",
              color: "#FFFFFF",
              margin: "0 0 20px",
              lineHeight: 1.22,
            }}
          >
            {heading}
          </h2>

          {/* STEP CONTENT */}
          {step === "area" && (
            <div className="kayaa-wm-step">
              <input
                className="kayaa-wm-input"
                placeholder="e.g. Tembisa, Khayelitsha, Soweto..."
                value={area}
                onChange={(e) => setArea(e.target.value)}
                onKeyDown={onEnterAdvance}
                autoFocus
                maxLength={120}
              />
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.45)",
                  margin: "10px 2px 0",
                }}
              >
                We launch one neighbourhood at a time.
              </p>
            </div>
          )}

          {step === "place" && (
            <div className="kayaa-wm-step">
              <input
                className="kayaa-wm-input"
                placeholder="e.g. Uncle Dee's Barbershop"
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
                autoFocus
                maxLength={200}
                style={{ marginBottom: 10 }}
              />
              <input
                className="kayaa-wm-input"
                placeholder="Where is it? e.g. Randpark Ridge, Randburg"
                value={placeAddress}
                onChange={(e) => setPlaceAddress(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    goNext();
                  }
                }}
                maxLength={200}
              />
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.45)",
                  margin: "10px 2px 0",
                }}
              >
                The place that would hurt if it closed — and where to find it.
              </p>
            </div>
          )}

          {step === "type" && (
            <div className="kayaa-wm-step">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {PLACE_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="kayaa-wm-chip"
                    data-active={placeType === t}
                    onClick={() => setPlaceType(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "why" && (
            <div className="kayaa-wm-step">
              <textarea
                className="kayaa-wm-input"
                placeholder="What keeps people going back?"
                value={why}
                onChange={(e) => setWhy(e.target.value)}
                rows={4}
                maxLength={500}
                autoFocus
                style={{ resize: "vertical", minHeight: 110, fontSize: 16 }}
              />
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.45)",
                  margin: "10px 2px 0",
                }}
              >
                Optional — but the truth is what makes kayaa.
              </p>
            </div>
          )}

          {step === "ownership" && (
            <div className="kayaa-wm-step">
              {OWNERSHIP.map((o) => (
                <button
                  key={o.key}
                  type="button"
                  className="kayaa-wm-ownership"
                  data-active={ownership === o.key}
                  onClick={() => setOwnership(o.key)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          )}

          {step === "contact" && (
            <form onSubmit={submitFinal} className="kayaa-wm-step">
              <input
                className="kayaa-wm-input"
                placeholder="WhatsApp number (e.g. 071 234 5678)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputMode="tel"
                autoFocus
                required
                maxLength={40}
                style={{ marginBottom: 10 }}
              />
              <input
                className="kayaa-wm-input"
                placeholder="Email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                maxLength={200}
              />
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.45)",
                  margin: "10px 2px 0",
                }}
              >
                We'll only WhatsApp you. Never sold, never shared.
              </p>
              {/* hidden submit so Enter works */}
              <button type="submit" style={{ display: "none" }} aria-hidden />
            </form>
          )}

          {step === "done" && (
            <div className="kayaa-wm-step" style={{ textAlign: "center", padding: "8px 0 4px" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "rgba(57,217,138,0.12)",
                  border: "1px solid rgba(57,217,138,0.4)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "4px auto 20px",
                  fontSize: 30,
                  color: "#39D98A",
                  boxShadow: "0 0 50px rgba(57,217,138,0.35)",
                }}
                aria-hidden
              >
                ✓
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 16,
                  color: "rgba(255,255,255,0.78)",
                  lineHeight: 1.55,
                  margin: "0 0 8px",
                }}
              >
                You're now part of the kayaa neighbourhood waitlist.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.55,
                  margin: "0 0 24px",
                }}
              >
                We'll WhatsApp you when kayaa is live in{" "}
                <strong style={{ color: "#39D98A" }}>{area || "your area"}</strong>{" "}
                — and when places like{" "}
                <strong style={{ color: "#FFFFFF" }}>{placeName || "yours"}</strong>{" "}
                begin to appear.
              </p>
              <button
                onClick={close}
                style={{
                  background: "#0D1117",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: 14,
                  padding: "12px 26px",
                  borderRadius: 8,
                  border: "1px solid #21262D",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          )}

          {error && step !== "done" && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "#F59E0B",
                margin: "14px 2px 0",
              }}
            >
              {error}
            </p>
          )}

          {/* Footer nav */}
          {step !== "done" && (
            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 26,
                alignItems: "center",
              }}
            >
              {stepIndex > 0 ? (
                <button
                  type="button"
                  onClick={goBack}
                  style={{
                    background: "transparent",
                    color: "rgba(255,255,255,0.55)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: 14,
                    padding: "14px 18px",
                    borderRadius: 8,
                    border: "1px solid #21262D",
                    cursor: "pointer",
                  }}
                >
                  ← Back
                </button>
              ) : (
                <span />
              )}

              {step === "why" && (
                <button
                  type="button"
                  onClick={() => {
                    setWhy("");
                    setStep("ownership");
                  }}
                  style={{
                    background: "transparent",
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    padding: "14px 10px",
                    border: "none",
                    cursor: "pointer",
                    marginLeft: "auto",
                  }}
                >
                  Skip
                </button>
              )}

              {step === "contact" ? (
                <button
                  type="button"
                  onClick={(e) => submitFinal(e as unknown as React.FormEvent)}
                  disabled={submitting}
                  style={{
                    flex: 1,
                    background: "#39D98A",
                    color: "#0D1117",
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: 15,
                    padding: "15px 22px",
                    borderRadius: 10,
                    border: "none",
                    cursor: submitting ? "wait" : "pointer",
                    opacity: submitting ? 0.7 : 1,
                    boxShadow: "0 0 40px rgba(57,217,138,0.28)",
                    marginLeft: stepIndex > 0 ? 0 : "auto",
                  }}
                >
                  {submitting ? "Joining..." : "Join the waitlist →"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={goNext}
                  style={{
                    flex: 1,
                    background: "#39D98A",
                    color: "#0D1117",
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: 15,
                    padding: "15px 22px",
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 0 40px rgba(57,217,138,0.22)",
                    marginLeft: stepIndex > 0 ? 0 : "auto",
                  }}
                >
                  Continue →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}