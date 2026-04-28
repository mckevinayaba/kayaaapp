// Tiny global event bus for opening the waitlist modal from anywhere.
// Avoids adding zustand for a single boolean.

const OPEN_EVENT = "kayaa:waitlist-open";
const JOINED_KEY = "kayaa_joined";

export function openWaitlist(initialStep: 1 | 2 = 1) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(OPEN_EVENT, { detail: { step: initialStep } }),
  );
}

export function onWaitlistOpen(
  cb: (step: 1 | 2) => void,
): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = (e: Event) => {
    const detail = (e as CustomEvent).detail as { step?: 1 | 2 } | undefined;
    cb(detail?.step ?? 1);
  };
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}

export function markJoined() {
  try {
    localStorage.setItem(JOINED_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function hasJoined(): boolean {
  try {
    return localStorage.getItem(JOINED_KEY) === "1";
  } catch {
    return false;
  }
}

// Normalise SA WhatsApp numbers to +27...
export function normaliseZAPhone(raw: string): string | null {
  const cleaned = raw.replace(/[\s\-()]/g, "");
  if (/^\+27\d{9}$/.test(cleaned)) return cleaned;
  if (/^27\d{9}$/.test(cleaned)) return "+" + cleaned;
  if (/^0\d{9}$/.test(cleaned)) return "+27" + cleaned.slice(1);
  // Allow other international numbers if they look plausible
  if (/^\+\d{8,15}$/.test(cleaned)) return cleaned;
  return null;
}