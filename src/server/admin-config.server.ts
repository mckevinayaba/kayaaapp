// Server-only config — do NOT import in client code.
// Add your email(s) here to access /admin and /admin/waitlist.

export const ADMIN_EMAILS: string[] = [
  "mckevin.ayaba@gmail.com",
];

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(
    email.toLowerCase(),
  );
}
