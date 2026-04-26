## Continue: Generate remaining township photos & wire them in

### What's done
- `01-made-in-soweto.jpg` already generated and saved to `public/landing/`.

### Remaining work

**1. Generate 7 more authentic township photos** (Nano Banana Pro, B&W documentary style, 35mm film grain, in the spirit of Ernest Cole / Santu Mofokeng)

Run in 2 batches of ~3-4 to avoid timeouts. Each ~16:9, saved to `public/landing/`:

- `02-koses-general-dealer.jpg` — corner spaza/general dealer with hand-painted signage, Alex
- `03-kwamahlangu-carwash.jpg` — open-lot car wash, buckets and hose, Tembisa feel
- `04-shisanyama-evening.jpg` — braai stand with smoke, plastic chairs, Soweto street
- `05-salon-container.jpg` — converted shipping-container hair salon, Khayelitsha
- `06-tuckshop-window.jpg` — burglar-bar tuckshop window, kids buying snacks
- `07-taxi-rank-morning.jpg` — minibus taxi rank, commuters, hand signs
- `08-street-tailor.jpg` — pavement tailor with Singer machine, Mitchells Plain

**2. Wire images into components**

- `HeroCarousel.tsx` — replace 7 hero slide `src` URLs with `/landing/0X-*.jpg`
- `PlacesGallery.tsx` — replace tile images with the new local files
- `EditorialPhotoBreak.tsx` — use `01-made-in-soweto.jpg` as the full-bleed hero photo

**3. Verify**
- Quick QA: open each generated image to confirm it's authentic-feeling B&W documentary, not generic stock.
- Confirm no broken references in the 3 components.

### Technical notes
- Use Lovable AI Gateway with model `google/gemini-3-pro-image-preview` (Nano Banana Pro) for max authenticity.
- Save base64 → `public/landing/*.jpg` directly (referenced as `/landing/...` from components).
- No DB or route changes needed.
