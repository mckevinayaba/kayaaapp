CREATE TABLE IF NOT EXISTS public.community_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  place_name text NOT NULL,
  place_type text,
  story text,
  contact text,
  source text DEFAULT 'landing_page',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.community_stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a community story"
ON public.community_stories
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(place_name) > 0
  AND char_length(place_name) <= 200
  AND (place_type IS NULL OR char_length(place_type) <= 200)
  AND (story IS NULL OR char_length(story) <= 4000)
  AND (contact IS NULL OR char_length(contact) <= 200)
);