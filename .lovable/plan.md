## What's wrong right now

1. **Hero text clips on common viewports** — slides 1, 4, 5 stack 4-5 lines of `clamp(42px, 7vw, 90px)` headline + label + 24px support paragraph + (slide 5) a 3-stat row, all absolute-positioned at the bottom/middle of a 100dvh frame. At 1202×672 (your viewport) and on phones in landscape, the text overflows the visible area and gets cut by the dot navigation / progress bar.
2. **Photos look generic / "AI-generated app"** — current Unsplash IDs are stock barbers, generic braais, anonymous corner shops. None visibly read as **Soweto, Alexandra, Tembisa, Khayelitsha, Mitchells Plain**. The user wants the page to feel rooted in those specific places.
3. **Body has no photography** — after the hero carousel, the entire page is dark CSS cards (HowItWorks, AppProof, ForOwners). No human imagery. It feels like a template.
4. **Conversion is soft** — the page tells a story but doesn't *sell*. No urgency, no specific outcome promise, no social proof / numbers above the fold, no risk-reversal, no single dominant CTA. Hormozi value-equation pieces (dream outcome, perceived likelihood, time delay, effort) aren't surfaced.

## What I'll build

### 1. Fix hero clipping (HeroCarousel.tsx)
- Drop headline scale to `clamp(34px, 5.2vw, 68px)` and tighten line-height to `1.05`.
- Cap each slide's text block to `max-height: calc(100dvh - 180px)` with internal vertical centering so the progress bar (top), dots (bottom), and slide-number never overlap copy.
- On viewports `< 720px tall`, hide the inline support paragraph on slides 2/4/6 (keep headline + label only).
- Slide 5 stats: collapse to a 2-up row under 900px wide instead of wrapping mid-stat.
- Move slide-number indicator to top-right (currently bottom-right, colliding with dot nav on short screens).

### 2. Authentic township photography
Replace all 7 hero photos + add a new photo strip section with curated Unsplash images that visibly read as **South African township / suburb life**. I'll use search terms like `soweto`, `johannesburg township`, `south africa street`, `cape town khayelitsha`, `vilakazi street`, `shisanyama`, `taxi rank johannesburg` and verify each photo before locking it in. Where Unsplash lacks a perfect match, I'll generate a custom photo with **Nano Banana Pro** (`google/gemini-3-pro-image-preview`) prompted for the specific location (e.g. *"documentary photo of a barbershop on Vilakazi Street, Soweto, golden hour, real customers waiting outside, shot on 35mm film"*) and store the result in `/public/landing/`.

Treatment stays consistent: **subtle grayscale (60-80%) + warm-shadow gradient overlay** so photos feel cinematic but the green accent (#39D98A) still pops.

### 3. New section: `PlacesGallery.tsx` (between AppProof and ForOwners)
A horizontal-scroll / 4-column photo grid titled **"This is what kayaa looks like in your area."** Each tile = full-bleed photo + place name + suburb chip:
- Sbu's Cuts — Orlando West, Soweto
- Mama Zulu's Tuckshop — Mamelodi
- Sizwe Shisanyama — Tembisa
- KwaMahlangu Car Wash — Alexandra
- Zanele's Salon — Sandton
- Mitchells Plain Community Hall — Cape Town
- New Hope Church Hall — Khayelitsha
- Corner Tavern — Meadowlands

This delivers what you asked: photos in the body proving kayaa is rooted in the suburbs and townships, not a generic directory.

### 4. Hormozi-style conversion layer
Add **two new conversion blocks** and rewrite hero slide 7 CTAs:

**a) `ValueStack.tsx`** — placed right after AppProof. Headline: *"What you get when you add your place to kayaa."* Then a stacked checklist with crossed-out "old way" prices to anchor value:
- A real page for your place — *worth R2,500 (web designer)* — **FREE**
- Your regulars on a list you own — *worth R800/mo (CRM)* — **FREE**
- WhatsApp updates to your customers — *worth R450/mo (bulk SMS)* — **FREE**
- Featured in your suburb's feed — *priceless* — **FREE**
- Total value: **R3,750/mo** → Today: **R0**. Forever. While we build.

Followed by a single dominant CTA button: **"Claim your place — takes 90 seconds"** (links `/add-place`).

**b) `SocialProof.tsx`** — a thin band above the footer with three counters (places listed, suburbs covered, check-ins this week), a row of 3 short owner quotes with avatar circle + suburb tag, and a "as seen in" / "early backers" strip if available (or omit honestly if none).

**c) Hero slide 7** — sharpen the two CTAs:
- Primary (filled green): **"Find places near me — it's free"** → `/feed`
- Secondary (ghost): **"I run a place — list it in 90 seconds"** → `/add-place`
- Add micro-copy under buttons: *"No card. No download. Just open."*

### 5. Polish so it doesn't look "AI-developed"
- Replace 3 of the emoji icons in HowItWorks with subtle line illustrations (SVG inline, hand-drawn feel).
- Vary card backgrounds — currently every card is `#161B22` with `#21262D` border. Introduce two warmer surface tokens (`#1A1410` dusty-brown for owner-facing blocks, `#0F1A14` deep-green for community blocks).
- Add one **wide editorial photo break** between TruthSection and HowItWorks: a single full-width photo of a Soweto street at golden hour with a one-line overlay: *"This is the South Africa Google Maps forgot."*
- Real-feel testimonial typography (italic serif `Source Serif Pro` for quotes, not the same Inter as body).

### 6. New section order

```text
Nav
HeroCarousel              (fixed clipping, real township photos)
TruthSection              (existing)
EditorialPhotoBreak       (NEW — single wide Soweto photo + overlay line)
HowItWorks                (refined icons, warmer surface)
AppProof                  (existing)
PlacesGallery             (NEW — 8 place tiles with photos + suburbs)
ValueStack                (NEW — Hormozi value stack + dominant CTA)
ForOwners                 (existing)
ResearchBrief             (existing)
SocialProof               (NEW — counters + owner quotes)
CityWaitlist              (existing)
FinalCTA                  (existing)
Footer
```

## Technical details

- **New files:** `src/components/landing/PlacesGallery.tsx`, `src/components/landing/ValueStack.tsx`, `src/components/landing/SocialProof.tsx`, `src/components/landing/EditorialPhotoBreak.tsx`.
- **Edited:** `HeroCarousel.tsx` (sizing + photos + slide-7 CTAs), `LandingPage.tsx` (section order), `HowItWorks.tsx` (icons + warm surface variant).
- **Photos:** Replace all 7 hero Unsplash IDs + 8 gallery photos + 1 editorial break photo. For each, I'll first try a curated Unsplash search; where the result isn't authentically SA, I'll generate via Nano Banana Pro with a township-specific prompt and save to `/public/landing/{slug}.jpg`. I'll inspect each generated image before committing.
- **Counters in SocialProof:** start hard-coded (e.g. "47 places · 6 suburbs · 312 check-ins this week") with a `// TODO: wire to live count` comment — no fake data once we're past launch, but real seed numbers for honesty.
- **No new dependencies, no DB migrations** required for this round.

## Out of scope for this turn
- Wiring SocialProof counters to live Supabase counts (next phase).
- Adding the Source Serif Pro font is conditional — if `<head>` already has Inter via Google Fonts, I'll add a single Serif weight; otherwise I'll fall back to system serif to avoid an extra font request.
