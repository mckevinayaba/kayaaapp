## Fix: admin login without waiting on email

The signup succeeded (auth logs show `user_repeated_signup` 200) but login fails with `invalid_credentials` because the account is unconfirmed and email confirmation is required.

### Changes

1. **Disable email confirmation** via auth config so new signups are usable immediately.
2. **Confirm the existing user** `mckevin.ayaba@gmail.com` (`auth.users.email_confirmed_at = now()`) via a migration so you don't need to re-register.

### After this ships
- Go to `/admin`, enter your email + the password you set on signup, log in → `/admin/waitlist`.
- If the password is wrong, click "Set admin password" again with a new password.

### Out of scope
- Custom email domain / branded auth emails (overkill for a single admin).
