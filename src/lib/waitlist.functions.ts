import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { isAdminEmail } from "./admin-config.server";

const COUNTER_FLOOR = 200;

// Public — counter for the landing page.
export const getWaitlistStats = createServerFn({ method: "GET" }).handler(
  async () => {
    const { count, error } = await supabaseAdmin
      .from("country_waitlist")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("getWaitlistStats count error:", error);
      return { count: COUNTER_FLOOR, suburbCount: 31 };
    }

    const actual = count ?? 0;

    // Get suburb breakdown (cap at 1000 rows for performance)
    const { data: rows, error: rowsErr } = await supabaseAdmin
      .from("country_waitlist")
      .select("area")
      .limit(1000);

    let suburbCount = 31;
    if (!rowsErr && rows) {
      const set = new Set(
        rows
          .map((r) => (r.area || "").trim().toLowerCase())
          .filter(Boolean),
      );
      suburbCount = Math.max(set.size, 31);
    }

    return {
      count: Math.max(actual, COUNTER_FLOOR),
      suburbCount,
    };
  },
);

// Admin only — list signups + nominations.
export const getWaitlistList = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = (context.claims as { email?: string } | null)?.email;
    if (!isAdminEmail(email)) {
      throw new Response("Forbidden", { status: 403 });
    }

    const [signupsRes, storiesRes] = await Promise.all([
      supabaseAdmin
        .from("country_waitlist")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1000),
      supabaseAdmin
        .from("community_stories")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1000),
    ]);

    if (signupsRes.error) {
      console.error(signupsRes.error);
      throw new Response("Failed to load signups", { status: 500 });
    }

    const signups = signupsRes.data ?? [];
    const stories = storiesRes.data ?? [];

    // Match each signup to its nomination by contact (best-effort).
    const storyByContact = new Map<string, typeof stories>();
    for (const s of stories) {
      const key = (s.contact || "").trim();
      if (!key) continue;
      const list = storyByContact.get(key) ?? [];
      list.push(s);
      storyByContact.set(key, list);
    }

    const enriched = signups.map((s) => {
      const nom = storyByContact.get((s.contact || "").trim())?.[0];
      const rawStory = nom?.story ?? "";
      // Pull out "Address: ..." line if present
      const addrMatch = rawStory.match(/^Address:\s*(.+)$/m);
      const nominated_address = addrMatch ? addrMatch[1].trim() : null;
      const nominated_why = rawStory
        .split("\n")
        .filter(
          (l) =>
            !/^Address:/i.test(l) &&
            !/^Area:/i.test(l) &&
            l.trim() !== "[owner]" &&
            l.trim() !== "[neighbour]",
        )
        .join("\n")
        .trim();
      return {
        id: s.id,
        area: s.area,
        contact: s.contact,
        contact_type: s.contact_type,
        created_at: s.created_at,
        source: s.source,
        nominated_place: nom?.place_name ?? null,
        nominated_type: nom?.place_type ?? null,
        nominated_address,
        nominated_why: nominated_why || null,
      };
    });

    // Suburb breakdown
    const counts = new Map<string, number>();
    for (const s of signups) {
      const k = (s.area || "Unknown").trim();
      counts.set(k, (counts.get(k) ?? 0) + 1);
    }
    const byArea = Array.from(counts.entries())
      .map(([area, n]) => ({ area, n }))
      .sort((a, b) => b.n - a.n);

    return {
      total: signups.length,
      byArea,
      rows: enriched,
      orphanStories: stories.filter(
        (s) => !s.contact || !signups.some((sg) => sg.contact === s.contact),
      ),
      nominations: stories.map((s) => ({
        id: s.id,
        created_at: s.created_at,
        place_name: s.place_name,
        place_type: s.place_type,
        story: s.story,
        contact: s.contact,
        source: s.source,
        linked: !!s.contact && signups.some((sg) => sg.contact === s.contact),
      })),
    };
  });