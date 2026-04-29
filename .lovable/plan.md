
# Make kayaa feel real, professional, and pre-launch

The user has three core complaints:
1. Fake numbers and quotes (SocialProof, ValueStack pricing, "47 places listed", testimonials from Sbu / Mama Zulu / Sizwe, "312 check-ins this week") make the site look dishonest. We are pre-launch — none of this is true.
2. Live product flows (`/feed`, `/auth`, `/add-place`, "Check in nearby", "Sign in") give the impression the app is shipped. It isn't. People should *see* what's coming, but only the waitlist should be reachable.
3. The page still reads "AI/Lovable-built": filler sections, generic hover transitions, repetitive CTAs, decorative pricing charts. It needs to feel like a real South African product team made it — fewer sections, sharper writing, real animation, one undeniable narrative arc, and a brutally honest About page.

## What ships

### 1. Remove every fake/unearned signal
- **Delete `SocialProof.tsx`** entirely (Sbu / Mama Zulu / Sizwe quotes + 47 / 6 / 312 counters).
- **Delete `ValueStack.tsx`** (R3,750/month → R0 forever pricing block — invented and off-brand for a movement).
- **Delete `WaitlistCounter`** usage in `CityWaitlist` (no fake "X people joined" number).
- **Delete `AppProof.tsx`** mock screens for /feed, /venue, /board — they imply a shipped product and the "See the feed →" button leaks the gated feed.
- **Delete `CheckInCTA.tsx`** ("Check in nearby today" CTA → /auth).
- **Delete `ResearchBrief.tsx`** standalone story-form section (its job is now done by the waitlist nominate flow — duplicate ask, weakens the page).
- **Remove `EditorialPhotoBreak`** as a standalone slab — fold its single line ("This is the South Africa Google Maps forgot.") into a tighter cinematic moment inside the new flow.

Result: every counter, quote, testimonial, fake price, and mock screenshot on the landing page is gone. Nothing on the page can be called a lie.

### 2. Gate the product, keep the preview
- **Hide `/feed`, `/auth`, `/add-place` from the public landing page.** All buttons that route there get replaced with `openWaitlist()` triggers.
  - `Nav.tsx`: remove "Sign in" link. Keep only "Nominate a place" + "Join the waitlist" (both → waitlist).
  - `Footer.tsx`: replace the Feed / Board / Add Place / Sign in links with anchor links to landing sections (How it works, For places, About) + a single "Join waitlist" button. No leaks to gated routes.
  - `ForOwners.tsx` "Add your place — it's free" → `openWaitlist()`.
  - `FinalCTA.tsx` "Explore kayaa →" and "Add your place — free" → `openWaitlist()` (one primary CTA only).
- The `/feed` and `/auth` routes themselves stay in code (so they still build and work for us internally), but nothing public links to them. Users land on `/` only.
- **Add a small "Coming soon — join the waitlist to be first" badge** on the hero so the gating is honest, not hidden.

### 3. Tighten the narrative — fewer, stronger sections
New landing flow (top → bottom), each section earning its place:

```text
Nav  ── kayaa · How it works · For places · About · [Join waitlist]
Hero ── "We say support local. But we cannot find local."
        Subline + 1 primary CTA (Join waitlist) + 1 secondary (Nominate a place)
        Small chip: "Pre-launch · Johannesburg first · Then everywhere"
TruthSection (kept, tightened copy)
WhyMatters (kept — the 8 categories card grid)
HowItWorks (rewritten as 4 phases that build anticipation, not 3 generic steps)
PlacesGallery (kept — but relabel as "Places we're building kayaa for", real SA spots, no fake stats)
NeighbourhoodListener (kept — the "movement" section)
CityWaitlist (kept, no fake counter; copy: "We're starting in Johannesburg. Tell us where you are next.")
Footer (cleaned, no leaks)
```

Total sections drop from ~14 to 8. Each one does one job.

### 4. Rewrite "How it works" so people can't wait
Replace the current generic "Find / Check in / Become a regular" with a 4-beat reveal of *what kayaa is going to feel like*, framed as a timeline so it reads like a coming-soon trailer rather than a feature list. Beats:
1. **You open kayaa.** Your street appears — every place that actually matters, mapped by your neighbours.
2. **You walk in.** One tap says "I was here." No booking, no payment, no friction.
3. **The place sees you back.** The owner knows your face becomes a name, your visits become a record.
4. **Your neighbourhood becomes visible.** The places holding it together stop being invisible to anyone who needs to find them — banks, councils, newcomers, you.

Each beat: large numeral, single sentence, soft scroll-locked transitions.

### 5. Real motion, not decorative hover
Add a small set of *intentional* animations (still respecting `prefers-reduced-motion`):
- **Hero headline**: word-by-word reveal on load (staggered fade+rise) so "We say support local. But we cannot find local." lands like a statement, not a label.
- **TruthSection**: each "The barbershop. / The tuckshop. / The shisanyama." line types in / fades in sequentially, then "Still hard to find." flashes in green — already partly there, tighten timing and remove the rest of the noise.
- **HowItWorks new version**: scroll-driven progress line down the left edge that fills as the 4 beats come into view (IntersectionObserver, no library).
- **NeighbourhoodListener**: subtle parallax on the photo backdrop (translateY tied to scroll) — one effect, done well.
- Remove the generic `:hover { transform: translateY(-4px) }` from cards that don't need it. Keep hover only where it adds meaning (place tiles, CTAs).

### 6. New `/about` page — brutal, honest, emotional
Add `src/routes/about.tsx`. Link it from nav and footer. Structure:

1. **Opening line** (same as hero, deliberately): *"We say support local. But we cannot even find local."*
2. **The uncomfortable truth** — short, written like a letter, not marketing:
   - Townships hold a R900-billion economy and most of the places inside it do not exist on Google Maps.
   - The barber who has cut three generations of one family has no page, no record, no way to call back his own regulars when it's quiet.
   - The tuckshop that fed a street through lockdown cannot prove to a bank that it has customers.
   - The salon that taught a generation of women to feel beautiful has no archive of any of it.
3. **What this costs us** — visibility = funding, leases, sponsors, succession, dignity. Without it, the places that hold our neighbourhoods together die quietly and get replaced by chains that don't know anyone's name.
4. **What kayaa is** — one paragraph: a neighbourhood-first discovery layer for the local places that already matter, built so that being known doesn't require a marketing budget.
5. **What kayaa is not** — not Yelp, not Google Maps, not a directory of franchises, not a payments app. Pre-launch. Johannesburg first. Built by South Africans for South African neighbourhoods.
6. **Founders' note + one CTA** → "Join the waitlist". No fake team photos.

Page uses the same design tokens (`var(--midnight)`, `var(--green)`, Space Grotesk / Inter) — consistent, editorial, lots of whitespace.

### 7. Polish pass to kill the "AI look"
- Replace remaining hardcoded `#0D1117 / #39D98A / #161B22 / #21262D / #F0F6FC` with the existing CSS variables across `HowItWorks`, `Footer`, `CityWaitlist`, `WaitlistModal`, `StickyMobileCTA`, `Nav`, `HeroCarousel` — design system applied consistently.
- Update `__root.tsx` head meta to real kayaa metadata (title, description, OG, twitter) — currently "Lovable App" / "Lovable Generated Project".
- Remove the emoji-heavy chip rows in `TruthSection` (12 emoji pills feels like a stock template). Keep 6 max, monochrome, no emoji.
- Cap the Hero carousel at 4 slides instead of 7 (currently 853 lines of slide config) — long carousels read as filler. The 4 strongest: Made in Soweto, Barbershop, Shisanyama, Tuckshop stats. Pause-on-hover stays.
- Single, consistent CTA voice across the whole site: **"Join the waitlist"** (primary) and **"Nominate a place"** (secondary). Kill all variants ("Claim your place", "Add your place — free", "Explore kayaa", "See the feed", "Check in nearby", "Add a place to the wall").

## Technical details

- Files to delete: `SocialProof.tsx`, `ValueStack.tsx`, `AppProof.tsx`, `CheckInCTA.tsx`, `ResearchBrief.tsx`, `EditorialPhotoBreak.tsx`, `WaitlistCounter.tsx`.
- Files to edit: `LandingPage.tsx` (new section order, drop deleted imports), `Nav.tsx`, `Footer.tsx`, `HeroCarousel.tsx` (trim slides + word-reveal animation), `HowItWorks.tsx` (rewrite to 4-beat scroll-progress), `TruthSection.tsx` (tighten pills), `ForOwners.tsx` (CTA → openWaitlist, drop "/add-place" nav), `FinalCTA.tsx` (single CTA → openWaitlist), `CityWaitlist.tsx` (remove WaitlistCounter), `__root.tsx` (real meta), `styles.css` (add keyframes for word-reveal + scroll progress).
- New file: `src/routes/about.tsx` — TanStack file route at `/about`, full About page content above, head() meta with title/description/og.
- Keep `/feed`, `/auth`, `/admin.waitlist` route files intact — only public links are removed. Internal users (us) can still hit `/auth` directly.
- Waitlist functionality (`WaitlistModal`, `waitlist.functions.ts`, `country_waitlist`, `community_stories` tables) unchanged — already real and working.
- All animations gated behind `@media (prefers-reduced-motion: reduce)` (already in `styles.css`).

## Out of scope for this round

- No new database changes.
- No payments, no auth flow changes.
- No real social proof (we'll add it once we have real check-ins from real users).
- The `/feed` page itself — it stays as-is internally; we'll redesign it when we're closer to opening it up.

After your approval I'll implement everything in one pass and confirm the build is clean.
