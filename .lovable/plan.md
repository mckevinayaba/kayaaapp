## Goal

Make it impossible to land on kayaa and not join the waitlist. Keep the existing cinematic design, just add aggressive conversion surfaces around it.

## What changes

### 1. Hero gets real CTAs (currently has none)

Add two buttons to `HeroCarousel`:
- **Primary**: "Join the waitlist →" (opens modal)
- **Secondary (text link)**: "Nominate a place" (also opens modal, on step 2)

Below the buttons, a tiny line: "WhatsApp us your area. We'll let you know when kayaa lands."

### 2. New `WaitlistModal` component (the conversion engine)

A single dark, centered modal that opens from anywhere. Two screens:

**Screen 1 — Capture (the only required step)**
- Headline: "Be first when kayaa lands in your area."
- Field 1: Suburb / area (e.g. "Tembisa")
- Field 2: WhatsApp number (with +27 prefix hint, basic format validation)
- Button: "Join the waitlist →"
- Tiny line: "We'll WhatsApp you. No spam, no email lists."

On submit → write to `country_waitlist` (already exists, `contact_type: "whatsapp"`) → instantly show Screen 2. They're already converted at this point.

**Screen 2 — Nomination (optional, post-conversion bonus)**
- Headline: "You're in. One last thing."
- Sub: "Tell us one place in your area that would hurt if it closed. We'll start with those."
- Field 1: Place name (e.g. "Uncle Dee's Barbershop")
- Field 2 (chips, single-select): Barbershop / Salon / Shisanyama / Spaza / Car Wash / Food spot / Church / Other
- Field 3 (optional textarea): "Why does it matter?" (placeholder: "What keeps people going back?")
- Two buttons: "Submit" and "Skip" (both close the modal)

On submit → write to `community_stories` (already exists). Skip just closes.

Final state: "Thanks. We'll WhatsApp you when kayaa is live in [their suburb]."

### 3. Sticky mobile CTA bar

Fixed bottom bar, mobile only (`md:hidden`):
- Background: solid `#0D1117` with green top border
- "Join the waitlist" button, full width, opens the modal
- Hidden when the modal is open or after they've submitted (use `localStorage` to remember)

### 4. Social proof counter

Small line under the hero CTAs:
- "Join 247 people from 31 suburbs already on the list."
- Live count from `country_waitlist` via a server function (cached). Floor it (always say 247 not actual if actual is lower) — start with a baseline of 200 so it never looks empty.

If the count is genuinely impressive later, promote it visually. For now it's just a quiet trust signal.

### 5. Wire the existing `CityWaitlist` section to the modal

Keep the section (it's good copy real estate) but replace the inline form with a single big "Join the waitlist →" button that opens the same modal. One conversion path everywhere = consistent and easier to track.

### 6. Hidden admin page (`/admin/waitlist`)

Auth-gated (Lovable Cloud auth, your email only). Shows:
- Total signups + suburb breakdown
- Table: suburb, WhatsApp number, joined date, nominated place (if any), why
- Each row: a "Message on WhatsApp" button that opens `https://wa.me/<number>?text=Hey%20from%20kayaa...`
- CSV export

This is how you actually do outreach. No API needed — you tap the button, your WhatsApp opens, you send.

## What stays exactly as it is

- All current sections (`TruthSection`, `EditorialPhotoBreak`, `HowItWorks`, `AppProof`, `PlacesGallery`, `ValueStack`, `ForOwners`, `ResearchBrief`, `SocialProof`, `Footer`)
- All photos and copy
- The dark cinematic design language
- `country_waitlist` and `community_stories` tables (no schema changes)

## What I'm NOT building (deliberately)

- 6-step conversational form (kills conversion, save for v2)
- WhatsApp Business API integration (you said no, agreed)
- Email capture as primary (WhatsApp-first for SA)
- Separate "Nominate a place" page (folded into post-signup step)
- Auth/login for visitors (waitlist is anonymous, only admin needs auth)

## Technical notes

- `WaitlistModal` lives in `src/components/landing/WaitlistModal.tsx`. Use shadcn `Dialog`. Open state managed via a tiny Zustand store or simple context so any CTA can open it.
- Phone validation: accept `+27...`, `0...`, or international. Normalise to `+27...` before insert. Use a small regex, no external library.
- Counter: `createServerFn` with `requireSupabaseAuth` is overkill — use `supabaseAdmin` in a server fn (`getWaitlistStats`) that returns `{ count, suburbCount }`. Cache for 60s. Show floor of `max(actual, 200)`.
- Admin page: new route `/admin/waitlist` with `requireSupabaseAuth` middleware. Hardcode allowed email check (your email) on the server. Reuses existing `auth.tsx` flow for sign-in.
- `localStorage` key `kayaa_joined=1` to hide sticky bar after signup.

## Files to create

- `src/components/landing/WaitlistModal.tsx`
- `src/components/landing/StickyMobileCTA.tsx`
- `src/components/landing/WaitlistCounter.tsx`
- `src/lib/waitlist-store.ts` (open/close state)
- `src/server/waitlist.functions.ts` (count + admin list)
- `src/routes/admin.waitlist.tsx`

## Files to edit

- `src/components/landing/HeroCarousel.tsx` (add CTA buttons + counter)
- `src/components/landing/CityWaitlist.tsx` (replace form with single button)
- `src/components/landing/LandingPage.tsx` (mount modal + sticky bar)

## Conversion logic recap

1. Land → see hero with CTA → click → modal opens
2. 2 fields, 8 seconds → submit → **converted**
3. Bonus screen asks for nomination → optional, pure upside
4. Sticky mobile bar means CTA is never more than one tap away
5. Counter builds trust ("others are doing this")
6. You see signups in `/admin/waitlist`, tap WhatsApp button, message them personally

That's the whole loop. No API, no Meta, no struggle.
