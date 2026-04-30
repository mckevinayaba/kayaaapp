# Copy refresh — homepage + About

Pure copy swap across the existing sections. No redesign, no new sections, no removed sections, no visual changes. Only text strings and a few small list contents change.

## Guardrails (apply to every edit)
- Keep all layout, styles, animations, components, photo assets, section order.
- No competitor / platform names anywhere in visible copy.
- Drop motivational filler ("the world's apps pretend they don't exist", "before they disappear", "Just you and the place", etc.) in favour of the new clarity-led wording.
- Preserve the four anchor lines verbatim:
  - "We say support local. But we cannot even find local."
  - "Some of the places doing the most are still seen the least."
  - "We keep talking about community, but we ignore the places that make community possible."
  - "Different streets. Same wound."

## File-by-file changes

### 1. `src/components/landing/HeroCarousel.tsx` (slide 1 only — other slides untouched)
- Headline second line: change from "But we cannot find local." → **"But we cannot even find local."** (and update `highlight` prop to match).
- Replace the supporting paragraph with:
  > South Africa is full of neighbourhood places people trust, return to, recommend, and build routine around, but too many of them are still hard to find, easy to overlook, and invisible beyond word of mouth.
- Italic line under CTAs: replace "Tell us the place in your area that would hurt if it closed." with **"Tell us the place in your area that keeps pulling people back."**
- CTA labels stay ("Nominate a place" / "Join the neighbourhood waitlist"). Share row stays.

### 2. `src/components/landing/TruthSection.tsx`
- Expand `PLACE_LINES` to the full neighbourhood list from the new copy:
  Barbershop, Salon, Restaurant, Café, Tuckshop, Spaza shop, Shisanyama, Tavern, Club, Clothing shop, Car wash, Church hall, Pharmacy, Mechanic, Corner food spot.
- Replace the two trailing lines ("Trusted for years. Full every weekend." + "Still hard to find.") with:
  > The places every neighbourhood keeps going back to.
  > Still hard to find.
- Update `PILLS` to a representative subset reflecting the broadened list (e.g. Barbershops, Salons, Restaurants, Cafés, Tuckshops, Spazas, Shisanyamas, Taverns, Car washes, Pharmacies, Mechanics, Clothing shops). Wrapping already handles length.
- Keep "And this is not only a township problem.", italic city lines, and "Different streets. Same wound." unchanged.

### 3. `src/components/landing/WhyMatters.tsx`
- Keep the eight category cards and their one-liners (already match new copy).
- Replace the lead paragraph with:
  > Local places are not just businesses. They hold trust, routine, memory, and community. They also create everyday economic activity, repeat customer relationships, and neighbourhood visibility. When those places are hard to find, they lose more than attention. They lose discovery, repeat foot traffic, new customers, proof of demand, and opportunities to grow.
- Closing line "We keep talking about community — but we ignore the places that make community possible." stays.

### 4. `src/components/landing/HowItWorks.tsx`
- Replace the four `BEATS` bodies (titles stay close to current; rewrite to the new "feel like" copy):
  - 01 "You open kayaa." → "Your neighbourhood appears, with the places people actually use, trust, and keep returning to."
  - 02 "You walk in." → "One tap says you were there. No friction. No unnecessary steps."
  - 03 Title → "The place becomes easier to see." Body → "Its activity, its presence, and its relevance become more visible over time."
  - 04 Title → "The neighbourhood becomes clearer." Body → "The places holding it together become easier to discover, easier to return to, and harder to overlook."
- Bottom small line: change `PRE-LAUNCH · NO SPAM · WHATSAPP ONLY` → **`PRE-LAUNCH · NO SPAM · WHATSAPP OR EMAIL`** (removes WhatsApp-only language to match the modal's actual behaviour).

### 5. `src/components/landing/NominationAsk.tsx`
- Already matches new copy. No changes.

### 6. `src/components/landing/PlacesGallery.tsx`
- Keep tiles. Update the section eyebrow + intro to remove platform-comparison language:
  - Subhead paragraph: replace "Not the spots Google ranks. The places your neighbourhood actually revolves around." with **"The places your neighbourhood actually revolves around — the ones people keep going back to."**
- Heading "Soweto. Alex. Tembisa. Khayelitsha. / This is where kayaa lives." stays.

### 7. `src/components/landing/NeighbourhoodFeed.tsx`
- Keep the cards. Replace the section paragraph (currently mentions "kayaa wall at launch" — fine, but tighten):
  > A preview of what your neighbourhood wall will look like at launch — the kinds of places, signals, and stories your community will see. Real names will come from real neighbours like you.
- "Nominate the first place on your street →" CTA stays.

### 8. `src/components/landing/NeighbourhoodListener.tsx`
- Update the three steps to the new wording:
  - 01 Listen → "Notice the places people in your area keep going back to, the ones everyone knows but too few people can actually find."
  - 02 Nominate → "Tell us the place, where it is, and why it matters."
  - 03 Make it impossible to miss → "We use what people share to shape the future neighbourhood wall and make local places easier to see."
- Keep heading, CTA, italic, share row.

### 9. `src/components/landing/CityWaitlist.tsx`
- Replace the body paragraph with:
  > Tell us where you are, and we will let you know when kayaa reaches your area. We are building this carefully because the places we are building for deserve to be done right, not rushed.
- CTA label change: "Join the waitlist →" → **"Join the neighbourhood waitlist →"**.
- Replace the small caption "Takes 8 seconds · WhatsApp only · No spam" with two lines (small, muted, supportive — not a CTA):
  > Choose how you want to hear from us: WhatsApp or email.
  > Prefer to message us directly? WhatsApp us on +27 66 336 5296 (link to `https://wa.me/27663365296`).

### 10. `src/routes/about.tsx`
Rewrite section bodies to the new About copy while keeping the existing `Section` structure, "What kayaa is not" bullet list pattern, and closing card.
- Hero subhead change to **"But we cannot even find local."** (already correct) and replace the small grey paragraph with:
  > This page is the long version of why kayaa exists. No spin. No vague promises. Just the problem, the cost of leaving it unsolved, and what kayaa is being built to do about it.
- "The uncomfortable part" — replace title to "South Africa is full of neighbourhood places doing extraordinary things, and almost none of them are easy to find properly." and replace the four story paragraphs with the new barber/tuckshop/salon/shisanyama+car wash+church hall+café+mechanic+clothing shop block from the script.
- "What this costs us" — replace body with the new three-paragraph version (no platform names, ends with "the ones being seen the least.").
- "What kayaa is" — replace body with the new three-paragraph version ending in the three short lines: "Clearer discovery for neighbourhoods. / Better visibility for places. / More commercial possibility for businesses."
- Insert one new `Section` (using the same component) titled "What kayaa helps do" between "What kayaa is" and "What kayaa is not", with the three paragraphs from the script. (This is a copy section using the existing `Section` component, not a new visual pattern.)
- "What kayaa is not" — update the bullet array to the six new short lines from the script (no platform name).
- Closing "A note from us" paragraph + "Join the waitlist →" CTA → relabel CTA to **"Join the neighbourhood waitlist →"**, paragraph stays close to current ("done right, not done fast").
- Update the `head()` meta `title`/`description`/`og:*` to match the new About lead (no platform names).

### 11. `src/routes/__root.tsx`
- Update `description`, `og:description`, `twitter:description` to remove "We say support local. But we cannot find local." → use **"We say support local. But we cannot even find local."** and rewrite the second sentence to: "kayaa is the visibility layer for the local places people keep going back to — built so being known does not require a marketing budget."

### 12. `src/lib/share.ts`
- `DEFAULT_TEXT` and `nativeShare` title contain platform-style phrasing only ("a platform helping…"). Tighten to match new tone:
  - DEFAULT_TEXT → "I just nominated a place for kayaa. Tell them the place in your area that keeps pulling people back."
  - title → "kayaa — find local. support local." (already neutral; keep).

### 13. Files NOT changed
`Nav.tsx`, `Footer.tsx`, `StickyMobileCTA.tsx`, `WaitlistModal.tsx`, `ShareButton.tsx`, `NominationAsk.tsx` — already aligned. (Nav/Footer "Join the waitlist" labels stay because they are short utility links, not the primary CTA.)

## Out of scope
- No design system changes, no new components, no removed sections, no DB/schema changes, no logic changes.
- No changes to nomination flow, validation, contact-method choice, or share infrastructure.

## Acceptance check after implementation
- Every paragraph above appears verbatim on the page.
- No occurrence of competitor names anywhere in `src/` (`rg -i "google maps|yelp|whatsapp only"` returns nothing in user-visible copy).
- Anchor lines (the four quoted in Guardrails) all present.
- HowItWorks fine-print reads "WHATSAPP OR EMAIL".
- CityWaitlist shows the support WhatsApp number link.
