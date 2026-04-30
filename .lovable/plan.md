## Goal

Make the hero feel like a global startup built for African neighbourhood realities — not a generic AI landing page. Every slide should make the visitor feel seen and immediately give them a way to act. The pre-launch chip goes away, the opening tagline gets a sharper, uncomfortable second line, and CTAs lead with **Nominate a place now** (the emotional, low-friction action) followed by **Join the waitlist** (the commitment).

## Changes — Slide 1 (the opening tagline)

Edit `src/components/landing/HeroCarousel.tsx`, slide index 0 only:

1. **Remove** the green "Pre-launch · Johannesburg first" chip entirely (the whole rounded badge block above the headline).
2. **Keep** the existing two-line headline:
   - "We say support local."
   - "But we cannot find local." (with "cannot find local." in green)
3. **Replace** the current support paragraph ("kayaa is a neighbourhood-first way…") with a tighter, uncomfortable subline that shifts blame from the community to the system and asks for help. Proposed copy (we'll use this unless you want to tweak):

   > "The corner shop, the salon, the shisanyama down the road — they're holding our neighbourhoods together while the world's apps pretend they don't exist. Help us put them on the map before they disappear."

4. **Reorder and relabel the CTAs** so the emotional ask comes first:
   - Primary (green, filled): **"Nominate a place now"** → `openWaitlist(1)`
   - Secondary (outline): **"Join the waitlist — be first when kayaa goes live"** → `openWaitlist(1)`
5. **Keep** the italic micro-line ("Tell us the place in your area that would hurt if it closed.") — it reinforces the nominate CTA.

## Changes — Slides 2, 3, 4 (every image gets a CTA)

Right now slides 2–4 are pure copy with no action. Add a small, consistent CTA row under each slide's support text so the visitor is never more than one tap from acting. For each of the Barbershop, Friday Nights, and Tuckshop slides:

- Add a CTA row with two buttons styled like the hero but smaller (≈13px font, 12/22 padding):
  - Primary: **"Nominate this kind of place"** → `openWaitlist(1)`
  - Ghost link: **"Join the waitlist →"** → `openWaitlist(1)`
- Match the slide's text alignment (right for Barbershop, centre for Friday Nights, left for Tuckshop) so the CTAs feel native to the layout, not bolted on.
- Keep the `data-secondary="true"` responsive rule in mind — on short viewports the support paragraph hides, so put the CTA row on its own line so it survives.

## Why this works

- **Removes the AI-template tells**: the "PRE-LAUNCH · JOHANNESBURG FIRST" chip, the explainer paragraph that starts with the product name, and the passive secondary CTA are the three biggest "this was generated" signals on the page. All three go.
- **Leads with emotion, not status**: "Nominate a place now" is a community ask, not a sign-up. It lets people contribute before they commit, which is what converts on a pre-launch page.
- **Every slide converts**: today only slide 1 has buttons. After this change all four slides end with the same two-action pattern, so wherever the carousel pauses, the visitor has a way in.
- **The new subline names the pain**: "while the world's apps pretend they don't exist" + "before they disappear" — uncomfortable, specific, and frames kayaa as the fix without saying "we are the fix".

## Out of scope (flag for next pass)

- The nav still says "Join the waitlist" as the primary; once you approve the hero direction we can mirror the same Nominate-first hierarchy in the Nav and StickyMobileCTA so the whole page speaks with one voice.
- Slide imagery — we're not swapping photos in this pass; if any current slide photo feels generic to you, point it out and we'll replace it with a more specific township/neighbourhood frame.

## Files touched

- `src/components/landing/HeroCarousel.tsx` (only file edited)

Approve and I'll ship it. If you want different wording for the subline or the CTA labels, drop the wording in your reply and I'll use yours verbatim.