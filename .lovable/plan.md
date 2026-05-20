## Goal
Show all nominated places (from `community_stories`) in the admin dashboard, including ones not linked to a waitlist signup.

## Current state
- `/admin/waitlist` shows waitlist signups with a "Nominated" column that joins by contact. This hides:
  - Nominations submitted without joining the waitlist (orphan stories — already returned by the server as `orphanStories` but never rendered).
  - Multiple nominations from the same contact (only the first match shows).

## Changes

1. **`src/routes/admin.waitlist.tsx`** — add a new "Nominations" section below the existing waitlist table:
   - Stat card: total nominations count.
   - Table with columns: Submitted, Place, Type, Address, Why, Contact, Linked to signup? (yes/no badge).
   - Renders the full list of community stories (both matched and orphan), newest first.
   - Filter input also searches nominations by place / contact / address.
   - CSV export gets a second button: "Download nominations CSV".

2. **`src/server/waitlist.functions.ts`** — extend `getWaitlistList` return shape:
   - Add `nominations: Story[]` containing every row from `community_stories` (already fetched), each with a `linked: boolean` flag indicating whether its contact matches a waitlist signup.
   - Keep existing `rows` / `byArea` / `orphanStories` untouched so nothing else breaks.

No DB schema or RLS changes. No new routes.
