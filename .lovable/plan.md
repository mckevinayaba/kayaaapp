## Goal

Produce a single, complete handoff bundle that Claude Code can drop into its repo to recreate this entire kayaa project — **including the 9 township photos** (which are the part Claude Code currently can't see).

## What Claude Code is missing

Claude Code can read code files you paste, but it can't see:
1. The 9 generated `.jpg` photos in `public/landing/`
2. The full file tree (which components depend on which)
3. Setup steps (packages, Supabase config, env vars)

## Deliverable

I'll create **one zip** at `/mnt/documents/kayaa-handoff.zip` containing:

### 1. All photos (binary)
- `public/landing/01-made-in-soweto.jpg` … `09-township-barbershop.jpg` (the actual image files)

### 2. All source files (full contents, not snippets)
- **Routes**: `__root.tsx`, `index.tsx`, `auth.tsx`, `feed.tsx`
- **Auth**: `src/hooks/use-auth.tsx`, `src/integrations/lovable/index.ts`
- **Landing components** (all 19): Nav, Hero, HeroCarousel, ValueStack, PlacesGallery, EditorialPhotoBreak, CheckInCTA, ForOwners, HowItWorks, AppProof, SocialProof, TruthSection, ResearchBrief, SignWall, SignCard, CityWaitlist, FinalCTA, Footer, LandingPage
- **Hooks/utils**: `use-scroll-reveal.ts`, `use-mobile.tsx`, `lib/utils.ts`
- **Styles**: `src/styles.css`
- **Config**: `package.json`, `vite.config.ts`, `tsconfig.json`, `wrangler.jsonc`, `components.json`

### 3. `README-HANDOFF.md` at the root with:
- Tech stack summary (TanStack Start v1, React 19, Tailwind v4, Supabase)
- `bun install` + run commands
- Supabase setup: required env vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`), enable Google OAuth
- SQL for the 2 tables (`community_stories`, `country_waitlist`) with RLS policies
- Note that `routeTree.gen.ts` and `src/integrations/supabase/{client,types}.ts` auto-generate
- File map showing which photo goes where
- Known gaps (`/add-place` route not built, `/feed` is a stub)

### 4. A second deliverable: `kayaa-handoff.md` (text-only version)
For when Claude Code can't unzip — a single markdown file with every source file inlined in fenced code blocks, plus instructions to download the photos separately from a manifest.

## Output

After running, you'll get:
- `kayaa-handoff.zip` — drop into Claude Code's project root and unzip
- `kayaa-handoff.md` — paste into Claude Code if zip isn't workable

Both downloadable from the chat as artifacts.
