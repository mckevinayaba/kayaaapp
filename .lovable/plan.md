# Landing page — honest audit & targeted upgrade

## TL;DR — Is it good enough to convert?

**Almost, but not yet.** The page looks beautiful and the writing is genuinely good — that part is rare and it's the hardest thing to fix, so credit where it's due. But three things are blocking conversion right now:

1. **The page tells a story but never shows the product.** Seven cinematic slides of mood photography, then a phone mockup, then a form. A first-time visitor never sees the actual feed, an actual venue page, an actual check-in. Conversion needs proof, not just poetry.
2. **The asks are weak for both sides of the marketplace.** Owners get one button ("Add your place"). Locals get… nothing specific. There's no "find places near me," no email capture, no waitlist for cities not yet live, no WhatsApp option (and you said WhatsApp is the operating system).
3. **The story-submission form is the primary CTA on a section that should be secondary.** A research brief belongs lower. The primary ask should be: *get the app / add my place / see my city*.

Everything else (visuals, copy, structure, mobile, performance) is solid.

## What's working — keep it

- **The hero carousel concept and copy.** "We say support local. But we cannot even find local." is a thesis statement, not a tagline. Don't touch the wording.
- **The For Owners phone mockup.** This is the single most concrete asset on the page. It earns its place.
- **The "Your turn" story form.** Keep it — but demote it.
- **Design system & motion discipline.** Consistent palette, restrained animation, scroll-reveal. Don't over-design from here.

## What to change — concrete edits

### 1. Add a real "What you actually get" section (NEW — between HowItWorks and ForOwners)
Three real screenshots from inside the app:
- The **feed** with a real venue card (Sbu's Cuts, Soweto)
- A **venue page** with stories + check-in CTA
- The **board** with a Lost & Found post + WhatsApp button

Caption each in one line. No copy gymnastics. Just: *"This is the app."* This is the proof the carousel is missing.

### 2. Strengthen the dual CTA in Slide 7 (final hero slide)
Currently: two generic buttons. Replace with:
- **Primary (locals):** "Find places near me" → opens email capture if no city is live yet, otherwise → /feed
- **Secondary (owners):** "I run a place — add it free" → /add-place

Make the locals-side action work even when there are no venues seeded yet (city waitlist).

### 3. Add a city waitlist module (NEW — small, before the footer)
One line: *"kayaa is launching neighbourhood by neighbourhood. Tell us yours."*
- Single input: suburb / area name + email or WhatsApp number
- Writes to `country_waitlist` (table needs to be created — see Technical)
- Replaces the "coming soon countries" idea you said to drop, but does the same job: capturing demand without lying about coverage.

### 4. WhatsApp-first contact option on every form
On the story form and the city waitlist: the contact field accepts email **or** WhatsApp number. Helper text under the field: *"Email or WhatsApp — whichever you actually check."* Tiny change, big signal that you understand the audience.

### 5. Demote the research brief
Move the "Your turn" story form to **after** the For Owners section, not as the climactic CTA. The climactic CTA should be the choose-your-side block (locals vs owners).

### 6. Footer — show you're real
Currently four nav links + copyright. Add:
- A one-line address: *"Built in Johannesburg. Launching across South Africa, neighbourhood by neighbourhood."*
- A WhatsApp contact link
- An Instagram link (placeholder ok)

People in this market trust businesses that look reachable. A bare footer reads "side project."

### 7. Trust-by-numbers strip (small, optional — between TruthSection and HowItWorks)
Three quiet stats: *"X places listed · Y check-ins this week · Z neighbourhoods live."* Pull live counts from Supabase if you have them; otherwise hardcode honest seed numbers. **Do not invent numbers.** If there are zero, skip this section entirely until launch — empty stats are worse than no stats.

### 8. Fix the obvious gaps you flagged in your own audit
These directly affect this page rendering / functioning:
- Confirm `community_stories` table exists (migration was run — verify with a read query)
- Create `country_waitlist` table for the new waitlist module
- Footer link to `/auth` works; `/add-place` works

## What I'm explicitly NOT recommending

- **Don't add a video background or a hero video.** Page is already heavy on imagery.
- **Don't add testimonials yet.** You don't have real ones. Fake testimonials kill trust faster than no testimonials.
- **Don't add pricing.** It's free for owners. Saying "free" once in the For Owners CTA is enough.
- **Don't add a country selector** (you said this; agreed).

## Honest verdict on the question you asked

> *"Is this landing page good enough for conversion? Does it really sell and give value to kayaa? Does it really give justice to what kayaa is supposed to do?"*

- **Justice to the mission:** Yes. The writing and visual tone genuinely respect what kayaa is. A barbershop owner in Tembisa would not feel patronised by this page. That is the bar, and you're over it.
- **Sells the value:** Partially. Owners are sold (the dashboard mockup does the work). Locals are not — there's no concrete "this is what's near me" moment.
- **Converts:** Not yet. Two reasons: no in-app proof, and the climactic CTA is a research form, not an action. The seven changes above fix both.

After these changes, the page goes from "beautiful brand statement" to "beautiful brand statement that also moves people to act." That's the gap.

---

## Technical (for the build phase after approval)

**New components**
- `src/components/landing/AppProof.tsx` — three-screenshot grid (use real screenshots saved to `/public/landing/`; if not available yet, use high-fidelity CSS mockups built the same way as `ForOwners`)
- `src/components/landing/CityWaitlist.tsx` — suburb + email/WhatsApp form, inserts into `country_waitlist`
- `src/components/landing/TrustStrip.tsx` — optional, conditional on real numbers

**Edits**
- `HeroCarousel.tsx` slide 7 — split CTAs (locals primary, owners secondary), wire locals CTA to scroll to CityWaitlist when no venues yet
- `ResearchBrief.tsx` — add helper text on contact field; no behavior change otherwise
- `Footer.tsx` — add tagline line, WhatsApp link, Instagram link
- `LandingPage.tsx` — new section order:
  ```text
  Nav
  HeroCarousel
  TruthSection (already there)
  TrustStrip (optional, only if real numbers)
  HowItWorks
  AppProof (NEW)
  ForOwners
  ResearchBrief (demoted, copy unchanged)
  CityWaitlist (NEW)
  Footer (expanded)
  ```

**Database**
- Migration: create `country_waitlist` table with RLS allowing anon insert only:
  - columns: `id uuid pk`, `area text not null`, `contact text not null`, `contact_type text` (email|whatsapp|other), `country_code text default 'ZA'`, `created_at timestamptz default now()`
  - RLS: insert-only for anon + authenticated, with length checks mirroring `community_stories`
- Verify `community_stories` exists (run a read query before assuming).

**Assets**
- If real app screenshots aren't ready, build the AppProof tiles as CSS mockups in the same style as the ForOwners phone — consistent, controllable, no broken-image risk.

**Out of scope for this plan**
- Storage bucket fix, magic-link → WhatsApp OTP, seeding venues, dashboard nudge feature. All real, all important, but not landing-page work — they belong in their own tasks so this one stays focused and shippable.
