## Problem

Three places on the site frame kayaa using "kinds of neighbourhoods" language. This implies kayaa started for one type of neighbourhood and is now stretching to include others — exactly the impression the user wants to avoid.

The lines to fix:

1. `src/components/landing/TruthSection.tsx` (heading above the italic suburb list)
   - Current: **"This is every neighbourhood, not one kind of neighbourhood."**

2. `src/components/landing/PlacesGallery.tsx`
   - Heading line: **"Every neighbourhood. Same idea."**
   - Subhead: **"The places your neighbourhood actually revolves around — across every kind of South African area, not just one."**

3. `src/routes/about.tsx` (the "uncomfortable part" section)
   - **"And this is true across every kind of South African area — Sandton, Rosebank, Fourways, Randburg, Braamfontein, Hillbrow, Maboneng, Soweto, Alexandra, Tembisa, Khayelitsha, Mitchells Plain. Different streets. Same wound."**

## Reframing principle

Speak about **the neighbourhood** as a single, universal idea. Drop "kind of", "not just one", "every kind of area". The list of suburbs is fine — it shows scope — but the framing line above it should read as if kayaa has always been built for the neighbourhood, full stop.

## Copy changes

**1. `TruthSection.tsx` — heading above italic suburb lines**

Replace:
> This is every neighbourhood, not one kind of neighbourhood.

With:
> This is the neighbourhood. Wherever it is.

(Keeps the universal pivot, removes the "kinds" framing entirely.)

**2. `PlacesGallery.tsx` — heading + subhead**

Replace heading final line:
> Every neighbourhood. Same idea.

With:
> The neighbourhood, made visible.

Replace subhead:
> The places your neighbourhood actually revolves around — across every kind of South African area, not just one.

With:
> The places your neighbourhood actually revolves around. Wherever your neighbourhood is.

**3. `about.tsx` — the "uncomfortable part" closing paragraph**

Replace:
> And this is true across every kind of South African area — Sandton, Rosebank, Fourways, Randburg, Braamfontein, Hillbrow, Maboneng, Soweto, Alexandra, Tembisa, Khayelitsha, Mitchells Plain. Different streets. Same wound.

With:
> The same thing is happening in Sandton, Rosebank, Fourways, Randburg, Braamfontein, Hillbrow, Maboneng, Soweto, Alexandra, Tembisa, Khayelitsha, Mitchells Plain. Different streets. Same wound.

(Keeps the suburb roll-call and the closing line, removes the "every kind of area" framing.)

## What stays untouched

- Visual design, layout, and structure of all three sections
- The italic suburb lines in `TruthSection`
- The places gallery tiles and grid
- The rest of the About page narrative
- All other product, waitlist, and feature copy from previous prompts

## Files to edit

- `src/components/landing/TruthSection.tsx` — one heading line
- `src/components/landing/PlacesGallery.tsx` — heading line + subhead
- `src/routes/about.tsx` — one paragraph in the "uncomfortable part" section
