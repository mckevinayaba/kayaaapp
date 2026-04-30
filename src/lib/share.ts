// Tiny helper around the Web Share API with WhatsApp + copy-link fallbacks.
// Used by the hero, Neighbourhood Listener, and waitlist confirmation.

const DEFAULT_TEXT =
  "I just nominated a place for kayaa. Tell them the place in your area that keeps pulling people back.";

export type ShareResult = "shared" | "copied" | "cancelled" | "unsupported";

export function getShareUrl(): string {
  if (typeof window === "undefined") return "https://kayaa.app";
  return window.location.origin + "/";
}

export function getWhatsAppHref(text = DEFAULT_TEXT, url = getShareUrl()): string {
  const msg = encodeURIComponent(`${text}\n\n${url}`);
  return `https://wa.me/?text=${msg}`;
}

export async function nativeShare(
  text = DEFAULT_TEXT,
  url = getShareUrl(),
  title = "kayaa — find local. support local.",
): Promise<ShareResult> {
  if (typeof navigator === "undefined") return "unsupported";
  // Prefer the native sheet on mobile (WhatsApp, Messages, etc.)
  if (typeof navigator.share === "function") {
    try {
      await navigator.share({ title, text, url });
      return "shared";
    } catch (err) {
      // User dismissed
      const name = (err as { name?: string })?.name;
      if (name === "AbortError") return "cancelled";
      // fall through to clipboard
    }
  }
  // Clipboard fallback
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(`${text}\n\n${url}`);
      return "copied";
    }
  } catch {
    /* ignore */
  }
  return "unsupported";
}

export const SHARE_DEFAULT_TEXT = DEFAULT_TEXT;