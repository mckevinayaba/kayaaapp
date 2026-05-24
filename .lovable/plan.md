I found the actual issue: sign-in is working, but the admin waitlist data request is not reliably sending the logged-in session token to the protected backend function. That leaves `/admin/waitlist` stuck at “Loading…” instead of showing the waitlist or a clear auth error.

Plan:
1. Add the missing TanStack Start `src/start.ts` configuration and register the existing `attachSupabaseAuth` middleware so protected server functions receive the admin bearer token.
2. Update the `/admin/waitlist` page to call `getWaitlistList` through `useServerFn`, which is the correct client-side call path for TanStack server functions.
3. Improve the waitlist page failure handling so any backend/auth error stops the loading state and displays the real error details instead of hanging on “Loading…”.
4. Leave the password reset and login UI alone; the problem is after login, in the protected waitlist fetch path.

Technical details:
- `src/lib/waitlist.functions.ts` uses `requireSupabaseAuth`, which expects an `Authorization: Bearer <token>` header.
- `src/integrations/supabase/auth-attacher.ts` already exists, but there is currently no `src/start.ts` registering it as `functionMiddleware`.
- Without that middleware, the backend rejects the protected waitlist request as unauthorized even though the browser has a valid session.