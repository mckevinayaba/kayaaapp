## Goal
Let the admin recover access to `/admin` when they forget their password, using Supabase's built-in password reset email.

## Flow
1. On `/admin`, add a **"Forgot password?"** link under the password field.
2. Clicking it reveals an inline email input + **"Send reset link"** button (no extra route needed). Submitting calls:
   ```ts
   supabase.auth.resetPasswordForEmail(email, {
     redirectTo: `${window.location.origin}/admin/reset-password`,
   })
   ```
   - Validate email with zod and gate on `isAdminEmail` before sending so non-admins get a generic "If this email is authorised, a reset link has been sent." message (no enumeration).
   - Show success / error inline using the same styling as existing `error` / `info` messages.

3. New route **`src/routes/admin.reset-password.tsx`** (public, `noindex`):
   - Same dark visual style as `/admin`.
   - On mount, subscribe to `supabase.auth.onAuthStateChange`; when event is `PASSWORD_RECOVERY` (Supabase fires this after the user clicks the email link and the session is established), enable the form.
   - Also call `supabase.auth.getSession()` to handle the case where the listener already fired before subscription.
   - Form: new password + confirm password (min 8, must match, zod-validated).
   - Submit calls `supabase.auth.updateUser({ password })`. On success, sign the user out (`supabase.auth.signOut()` — forces a clean re-login with the new password) and redirect to `/admin` with an `info` toast-style message via `navigate({ to: '/admin', search: { reset: '1' } })` OR just show success + a "Go to login" link. We'll use the latter to avoid adding search-param plumbing.
   - If no recovery session is present (user opened the page directly), show: "This link is invalid or has expired. Request a new reset email." with a link back to `/admin`.

4. `/admin` reads `?reset=1`? — not needed; reset page handles its own success state.

## Files
- **edit** `src/routes/admin.tsx` — add forgot-password UI + handler.
- **create** `src/routes/admin.reset-password.tsx` — recovery session listener + update-password form.

No DB changes, no RLS changes, no new server functions, no edge functions. Uses Supabase Auth's built-in recovery email (already enabled).

## Notes
- Supabase will send the default password recovery email to the redirect URL. The redirect URL `https://<domain>/admin/reset-password` must be on the project's allow-list. If the user reports the link bouncing, they'll need to add it under Auth → URL Configuration; I'll mention this after implementation.
- `isAdminEmail` check lives in `admin-config.server.ts` (server-only). For the client gate I'll reuse the same `ADMIN_EMAILS` array already mirrored at the top of `admin.tsx`.
