# Add place address field to waitlist flow

## The problem

Right now the "What's the name of the place?" step only accepts a place **name** (e.g. "Uncle Dee's Barbershop"). There's no room to add **where** the place is — like "Randpark Ridge, Randburg" or a street address. Users are trying to cram name + address into one input and running out of meaning.

The Suburb step at the start captures the *user's* neighbourhood (where they're speaking from), not the place's location. Those are often different — someone in Sandton might nominate a barbershop in Alex.

## The fix

Split the place step into **two clean inputs on one screen** instead of adding a 7th step (which would hurt completion rate):

```text
Step 2 of 6 — What's the place?

[ Name of the place                              ]
  e.g. Uncle Dee's Barbershop

[ Where is it? (suburb, area, or street)         ]
  e.g. Randpark Ridge, Randburg

                                    [ Continue → ]
```

Both fields visible together, name auto-focused, Tab moves to address, Enter on either advances. Address is **required** (otherwise we can't actually find the place later) but accepts free-form text up to 200 chars.

## Where this data goes

- `place_name` → unchanged, stores just the name
- `place_address` → NEW, appended into the existing `community_stories.story` field as a prefixed line (no schema change needed):
  ```
  Address: Randpark Ridge, Randburg
  [original "why does it matter" text]
  [owner|neighbour]
  Area: [user's suburb]
  ```
  This keeps the admin export readable and avoids a database migration. If you'd rather have a dedicated `place_address` column in `community_stories`, say the word — it's a small migration.

## Other small polish in the same change

- Increase `place_name` `maxLength` from 200 → keep at 200 (DB cap), but make the input visually wider on mobile.
- Update the admin dashboard CSV export to surface the address line clearly (parse out the `Address:` prefix into its own column).

## Files touched

- `src/components/landing/WaitlistModal.tsx` — split the "place" step into name + address inputs, add `placeAddress` state, validation, and include it when writing to `community_stories`.
- `src/server/waitlist.functions.ts` — in `getWaitlistList`, parse the `Address:` line out of `story` so it appears as its own field for the admin table + CSV.
- `src/routes/admin.waitlist.tsx` — add an "Address" column.

## What stays the same

- 6-step flow, progress bar, WhatsApp-only contact, all existing copy and animations.
- No DB migration. No new tables. No auth changes.

Approve and I'll ship it.