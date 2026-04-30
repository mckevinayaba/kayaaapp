## Reframe the "Live from our neighbourhoods" section

The section currently reads like a real, active feed (live dot, "2h ago", check-in counts, "Live signals" badge). With no real users yet, this looks fabricated. We'll reframe it explicitly as **a preview of what the wall will look like once kayaa goes live** — honest, aspirational, and still emotionally compelling.

### Changes to `src/components/landing/NeighbourhoodFeed.tsx`

**1. Section header — swap the framing**
- Replace the "● LIVE SIGNALS" pill with a calmer label: **"A GLIMPSE OF WHAT'S COMING"** (no pulsing dot, no "live" language).
- Headline change:
  - From: *"Live from our neighbourhoods."*
  - To: *"This is what your neighbourhood wall will look like."* — with the second line *"Once we're live."* in green.
- Subline change:
  - From: *"A small preview of the wall kayaa is building — places nominated by the people who keep going back."*
  - To: *"A mock-up of the kayaa wall at launch — the kinds of places, signals, and stories your community will see when you check in. Real names will come from real neighbours like you."*

**2. Cards — remove fake-realtime cues**
- Remove the green pulsing "live dot" + relative timestamp ("2h ago", "Yesterday", "Friday night") chip on each photo.
- Replace it with a small honest tag: **"PREVIEW"** in muted mono type (no pulse, no green glow).
- Keep the place name, type, area, and the italic quote — these read as illustrative storytelling, not claims.
- Replace the metrics row (`📌 142 check-ins · ♥ 38 · 💬 12`) with a single line in muted text: *"check-ins · hearts · mentions — coming when kayaa goes live"* (icons only, no numbers). This keeps the visual rhythm but removes the fabricated numbers.

**3. Footer CTA**
- Keep the button but tighten copy: **"Nominate the first place on your street →"** — connects the preview directly to the action that makes it real.

### Why this works
- Removes any implication that these are real check-ins (which would feel dishonest on inspection).
- Keeps the emotional payload: people still see their neighbourhood reflected.
- Reframes the section as **a promise of what they're joining**, not a claim of what already exists — which is more powerful for a waitlist conversion.

### Files touched
- `src/components/landing/NeighbourhoodFeed.tsx` (only file)
