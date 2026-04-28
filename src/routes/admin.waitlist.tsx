import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getWaitlistList } from "@/server/waitlist.functions";

export const Route = createFileRoute("/admin/waitlist")({
  head: () => ({
    meta: [
      { title: "Waitlist admin — kayaa" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminWaitlistPage,
});

type Row = {
  id: string;
  area: string;
  contact: string;
  contact_type: string | null;
  created_at: string;
  source: string | null;
  nominated_place: string | null;
  nominated_type: string | null;
  nominated_address: string | null;
  nominated_why: string | null;
};

function AdminWaitlistPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    total: number;
    byArea: { area: string; n: number }[];
    rows: Row[];
  } | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate({
          to: "/auth",
          search: { redirect: "/admin/waitlist" } as never,
        });
        return;
      }
      try {
        const result = await getWaitlistList();
        if (!cancelled) {
          setData(result as never);
          setLoading(false);
        }
      } catch (e) {
        if (cancelled) return;
        const status =
          e instanceof Response
            ? e.status
            : (e as { status?: number })?.status;
        if (status === 403) {
          setError("Your account doesn't have admin access.");
        } else if (status === 401) {
          navigate({
            to: "/auth",
            search: { redirect: "/admin/waitlist" } as never,
          });
          return;
        } else {
          setError("Couldn't load the waitlist.");
        }
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const downloadCSV = () => {
    if (!data) return;
    const header = [
      "joined_at",
      "area",
      "contact",
      "contact_type",
      "source",
      "nominated_place",
      "nominated_type",
      "nominated_address",
      "nominated_why",
    ];
    const escape = (v: unknown) => {
      const s = v == null ? "" : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const lines = [header.join(",")];
    for (const r of data.rows) {
      lines.push(
        [
          r.created_at,
          r.area,
          r.contact,
          r.contact_type ?? "",
          r.source ?? "",
          r.nominated_place ?? "",
          r.nominated_type ?? "",
          r.nominated_address ?? "",
          r.nominated_why ?? "",
        ]
          .map(escape)
          .join(","),
      );
    }
    const blob = new Blob([lines.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kayaa-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const waUrl = (raw: string, area: string) => {
    const num = raw.replace(/[^\d]/g, "");
    const text = encodeURIComponent(
      `Hey from kayaa 👋 — you joined the waitlist for ${area}. We just wanted to say hi and let you know we're working on it.`,
    );
    return `https://wa.me/${num}?text=${text}`;
  };

  const rows = data?.rows ?? [];
  const filtered = filter
    ? rows.filter((r) => {
        const f = filter.toLowerCase();
        return (
          r.area.toLowerCase().includes(f) ||
          r.contact.toLowerCase().includes(f) ||
          (r.nominated_place ?? "").toLowerCase().includes(f)
        );
      })
    : rows;

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#0D1117",
        color: "#F0F6FC",
        padding: "32px 24px 80px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 28,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <Link
              to="/"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 22,
                color: "#39D98A",
                textDecoration: "none",
              }}
            >
              kayaa
            </Link>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 28,
                margin: "8px 0 0",
              }}
            >
              Waitlist
            </h1>
          </div>
          {data && (
            <button
              onClick={downloadCSV}
              style={{
                background: "#39D98A",
                color: "#0D1117",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: 13,
                padding: "10px 18px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
              }}
            >
              Download CSV
            </button>
          )}
        </div>

        {loading && (
          <p style={{ color: "rgba(255,255,255,0.5)" }}>Loading…</p>
        )}

        {error && (
          <div
            style={{
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.3)",
              borderRadius: 10,
              padding: 18,
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "#F59E0B",
            }}
          >
            {error}
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 13,
                marginTop: 10,
              }}
            >
              Add your email to <code>ADMIN_EMAILS</code> in{" "}
              <code>src/server/admin-config.server.ts</code>.
            </p>
          </div>
        )}

        {data && (
          <>
            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 12,
                marginBottom: 28,
              }}
            >
              <Stat label="Total signups" value={data.total} />
              <Stat label="Unique suburbs" value={data.byArea.length} />
              <Stat
                label="Top suburb"
                value={
                  data.byArea[0]
                    ? `${data.byArea[0].area} (${data.byArea[0].n})`
                    : "—"
                }
              />
              <Stat
                label="Nominated places"
                value={
                  data.rows.filter((r) => r.nominated_place).length
                }
              />
            </div>

            {/* Filter */}
            <input
              placeholder="Filter by suburb, contact, place…"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                width: "100%",
                background: "#161B22",
                border: "1px solid #21262D",
                borderRadius: 8,
                padding: "12px 14px",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "#F0F6FC",
                marginBottom: 18,
                outline: "none",
              }}
            />

            {/* Table */}
            <div
              style={{
                background: "#161B22",
                border: "1px solid #21262D",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    minWidth: 900,
                  }}
                >
                  <thead>
                    <tr style={{ background: "#0D1117" }}>
                      <Th>Joined</Th>
                      <Th>Suburb</Th>
                      <Th>Contact</Th>
                      <Th>Nominated</Th>
                      <Th>Where</Th>
                      <Th>Why</Th>
                      <Th>Action</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r) => (
                      <tr
                        key={r.id}
                        style={{
                          borderTop: "1px solid #21262D",
                        }}
                      >
                        <Td>
                          {new Date(r.created_at).toLocaleString("en-ZA", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Td>
                        <Td>
                          <strong>{r.area}</strong>
                        </Td>
                        <Td>
                          <span style={{ fontFamily: "var(--font-mono)" }}>
                            {r.contact}
                          </span>
                        </Td>
                        <Td>
                          {r.nominated_place ? (
                            <>
                              {r.nominated_place}
                              {r.nominated_type && (
                                <span
                                  style={{
                                    color: "rgba(255,255,255,0.5)",
                                    marginLeft: 6,
                                    fontSize: 12,
                                  }}
                                >
                                  · {r.nominated_type}
                                </span>
                              )}
                            </>
                          ) : (
                            <span style={{ color: "rgba(255,255,255,0.3)" }}>
                              —
                            </span>
                          )}
                        </Td>
                        <Td>
                          {r.nominated_address ? (
                            <span style={{ color: "rgba(255,255,255,0.75)" }}>
                              {r.nominated_address}
                            </span>
                          ) : (
                            <span style={{ color: "rgba(255,255,255,0.3)" }}>
                              —
                            </span>
                          )}
                        </Td>
                        <Td>
                          <span
                            style={{
                              color: "rgba(255,255,255,0.6)",
                              fontStyle: "italic",
                              maxWidth: 240,
                              display: "inline-block",
                            }}
                          >
                            {r.nominated_why ?? ""}
                          </span>
                        </Td>
                        <Td>
                          {r.contact_type === "whatsapp" && (
                            <a
                              href={waUrl(r.contact, r.area)}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                background: "#39D98A",
                                color: "#0D1117",
                                padding: "6px 12px",
                                borderRadius: 6,
                                textDecoration: "none",
                                fontWeight: 600,
                                fontSize: 12,
                                whiteSpace: "nowrap",
                              }}
                            >
                              WhatsApp →
                            </a>
                          )}
                        </Td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          style={{
                            padding: 24,
                            textAlign: "center",
                            color: "rgba(255,255,255,0.4)",
                          }}
                        >
                          No signups yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* By area */}
            {data.byArea.length > 0 && (
              <div style={{ marginTop: 32 }}>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 18,
                    marginBottom: 12,
                  }}
                >
                  By suburb
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  {data.byArea.map((b) => (
                    <span
                      key={b.area}
                      style={{
                        background: "#161B22",
                        border: "1px solid #21262D",
                        borderRadius: 999,
                        padding: "6px 12px",
                        fontFamily: "var(--font-body)",
                        fontSize: 12,
                        color: "rgba(255,255,255,0.75)",
                      }}
                    >
                      {b.area}{" "}
                      <strong style={{ color: "#39D98A" }}>{b.n}</strong>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div
      style={{
        background: "#161B22",
        border: "1px solid #21262D",
        borderRadius: 10,
        padding: 16,
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.5)",
          margin: 0,
          textTransform: "uppercase",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 24,
          color: "#FFFFFF",
          margin: "6px 0 0",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      style={{
        textAlign: "left",
        padding: "12px 14px",
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.14em",
        color: "rgba(255,255,255,0.5)",
        textTransform: "uppercase",
        fontWeight: 500,
      }}
    >
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td
      style={{
        padding: "12px 14px",
        verticalAlign: "top",
        color: "rgba(255,255,255,0.85)",
      }}
    >
      {children}
    </td>
  );
}