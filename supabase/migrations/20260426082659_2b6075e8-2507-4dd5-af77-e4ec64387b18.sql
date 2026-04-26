CREATE TABLE IF NOT EXISTS public.country_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  area text NOT NULL,
  contact text NOT NULL,
  contact_type text DEFAULT 'other',
  country_code text DEFAULT 'ZA',
  source text DEFAULT 'landing_page',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.country_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join the city waitlist"
ON public.country_waitlist
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(area) > 0 AND char_length(area) <= 200
  AND char_length(contact) > 0 AND char_length(contact) <= 200
  AND (contact_type IS NULL OR char_length(contact_type) <= 40)
  AND (country_code IS NULL OR char_length(country_code) <= 8)
);