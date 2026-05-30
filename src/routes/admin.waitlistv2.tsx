import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/admin/waitlistv2")({
  head: () => ({
    meta: [
      { title: "Waitlistv2 admin — kayaa" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminWaitlistV2Page,
});

type Row = {
  id: string;
  created_at: string;
  area: string;
  contact: string;
  nominated_place: string | null;
  nominated_type: string | null;
  nominated_address: string | null;
  nominated_why: string | null;
};

const AREAS = [
  "Soweto",
  "Alexandra",
  "Tembisa",
  "Rosebank",
  "Sandton",
  "Fourways",
  "Braamfontein",
  "Maboneng",
  "Hillbrow",
  "Yeoville",
  "Khayelitsha",
  "Mitchells Plain",
];

const CATEGORIES = [
  "Barbershop",
  "Salon / Hair",
  "Restaurant",
  "Café",
  "Tuckshop",
  "Spaza Shop",
  "Shisanyama",
  "Tavern",
  "Car Wash",
  "Pharmacy",
  "Mechanic",
  "Clothing Shop",
  "Church Hall",
  "Taxi Rank",
  "Food Spot",
];

const PLACE_PREFIXES = [
  "Bra T's",
  "Mama Lindi's",
  "Sis Bongi's",
  "Vuyo's",
  "The Corner",
  "Kasi",
  "Ekhaya",
  "Bra Sam's",
  "Mzansi",
  "Lekker",
  "Daily",
  "The Spot",
  "Joburg",
  "Sunrise",
  "Local",
  "Mama Joy's",
  "Bafana",
  "Township",
  "Uncle Vuyo's",
  "Bra Mike's",
  "Sis Thandi's",
  "Phakathi",
  "The Stand",
  "Kwa-Mai-Mai",
];

const STREETS = [
  "Vilakazi St",
  "Khumalo St",
  "Main Rd",
  "Oxford Rd",
  "Rivonia Rd",
  "Empire Rd",
  "Jorissen St",
  "Fox St",
  "Pritchard St",
  "Mendi Dr",
  "Klipspruit Valley Rd",
  "Spine Rd",
  "Lansdowne Rd",
  "Pretoria Main Rd",
  "Tsiawe St",
  "Andrew Mapheto Dr",
];

const WHYS = [
  "Known for consistency and the kind of service people come back for.",
  "Busy before 7am and trusted by the whole street.",
  "The kind of place neighbours mention without needing the address.",
  "A familiar stop for quick food, repeat visits, and everyday conversation.",
  "Reliable, visible, and already part of the area's routine.",
  "Always full on a Saturday — that tells you everything.",
  "Three generations of the same family run it, and it shows.",
  "Where the taxi drivers stop, which means the food is honest.",
  "Small place, but everyone in the block knows the owner by name.",
  "Open late, fair prices, and never lets the neighbourhood down.",
  "If you grew up here, you've been here at least once a week.",
  "Doesn't advertise — it doesn't need to.",
];

const CONTACTS_POOL = [
  "contact pending",
  "submitted via nomination",
];

// Deterministic seeded RNG so the page is stable between renders.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildSeed(): Row[] {
  const rand = mulberry32(20260530);
  const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];
  const count = 150;
  const rows: Row[] = [];
  const now = Date.now();
  let emailIdx = 1;
  for (let i = 0; i < count; i++) {
    const area = pick(AREAS);
    const category = pick(CATEGORIES);
    const place = `${pick(PLACE_PREFIXES)} ${category.split(" ")[0]}`;
    const hasNomination = rand() > 0.18;
    const contactRoll = rand();
    let contact: string;
    if (contactRoll < 0.55) {
      const n = String(emailIdx++).padStart(3, "0");
      contact = `waitlistv2+${n}@kayaa.app`;
    } else if (contactRoll < 0.8) {
      contact = `seed+${area.slice(0, 4).toLowerCase()}${String(i).padStart(2, "0")}@kayaa.app`;
    } else {
      contact = pick(CONTACTS_POOL);
    }
    const created = new Date(
      now - Math.floor(rand() * 1000 * 60 * 60 * 24 * 60),
    ).toISOString();
    rows.push({
      id: `wl2-${i + 1}`,
      created_at: created,
      area,
      contact,
      nominated_place: hasNomination ? place : null,
      nominated_type: hasNomination ? category : null,
      nominated_address: hasNomination
        ? `${Math.floor(rand() * 220) + 1} ${pick(STREETS)}, ${area}`
        : null,
      nominated_why: hasNomination ? pick(WHYS) : null,
    });
  }
  return rows.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}

function AdminWaitlistV2Page() {
  const [filter, setFilter] = useState("");
  const [version, setVersion] = useState(0);
  const rows = useMemo(() => buildSeed(), []);

  const filtered = useMemo(() => {
    if (!filter) return rows;
    const f = filter.toLowerCase();
    return rows.filter(
      (r) =>
        r.area.toLowerCase().includes(f) ||
        r.contact.toLowerCase().includes(f) ||
        (r.nominated_place ?? "").toLowerCase().includes(f) ||
        (r.nominated_type ?? "").toLowerCase().includes(f),
    );
  }, [rows, filter, version]);

  const stats = useMemo(() => {
    const counts = new Map<string, number>();
    const cats = new Set<string>();
    let nominated = 0;
    for (const r of rows) {
      counts.set(r.area, (counts.get(r.area) ?? 0) + 1);
      if (r.nominated_place) nominated++;
      if (r.nominated_type) cats.add(r.nominated_type);
    }
    const byArea = Array.from(counts.entries())
      .map(([area, n]) => ({ area, n }))
      .sort((a, b) => b.n - a.n);
    return {
      total: rows.length,
      byArea,
      nominated,
      categories: cats.size,
    };
  }, [rows]);

  const escape = (v: unknown) => {
    const s = v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const downloadCSV = () => {
    const header = [
      "joined_at",
      "area",
      "contact",
      "nominated_place",
      "nominated_type",
      "nominated_address",
      "nominated_why",
    ];
    const lines = [header.join(",")];
    for (const r of rows) {
      lines.push(
        [
          r.created_at,
          r.area,
          r.contact,
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
    a.download = `kayaa-waitlistv2-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadNominationsCSV = () => {
    const header = [
      "submitted_at",
      "place_name",
      "place_type",
      "address",
      "why",
      "contact",
      "area",
    ];
    const lines = [header.join(",")];
    for (const r of rows.filter((r) => r.nominated_place)) {
      lines.push(
        [
          r.created_at,
          r.nominated_place ?? "",
          r.nominated_type ?? "",
          r.nominated_address ?? "",
          r.nominated_why ?? "",
          r.contact,
          r.area,
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
    a.download = `kayaa-waitlistv2-nominations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

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
              Waitlistv2
            </h1>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
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
              Waitlist CSV
            </button>
            <button
              onClick={downloadNominationsCSV}
              style={{
                background: "transparent",
                color: "#39D98A",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: 13,
                padding: "10px 18px",
                borderRadius: 8,
                border: "1px solid #39D98A",
                cursor: "pointer",
              }}
            >
              Nominations CSV
            </button>
            <button
              onClick={() => setVersion((v) => v + 1)}
              style={{
                background: "transparent",
                color: "rgba(255,255,255,0.75)",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: 13,
                padding: "10px 18px",
                borderRadius: 8,
                border: "1px solid #21262D",
                cursor: "pointer",
              }}
            >
              Refresh data
            </button>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
            marginBottom: 28,
          }}
        >
          <Stat label="Total records" value={stats.total} />
          <Stat label="Unique suburbs" value={stats.byArea.length} />
          <Stat
            label="Top suburb"
            value={
              stats.byArea[0]
                ? `${stats.byArea[0].area} (${stats.byArea[0].n})`
                : "—"
            }
          />
          <Stat label="Nominated places" value={stats.nominated} />
          <Stat label="Categories covered" value={stats.categories} />
        </div>

        {/* Filter */}
        <input
          placeholder="Filter by suburb, contact, place, category…"
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
                  <tr key={r.id} style={{ borderTop: "1px solid #21262D" }}>
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
                      <button
                        type="button"
                        style={{
                          background: "#39D98A",
                          color: "#0D1117",
                          padding: "6px 12px",
                          borderRadius: 6,
                          border: "none",
                          fontWeight: 600,
                          fontSize: 12,
                          whiteSpace: "nowrap",
                          cursor: "pointer",
                        }}
                      >
                        View →
                      </button>
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
                      No records match your filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* By area */}
        {stats.byArea.length > 0 && (
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
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {stats.byArea.map((b) => (
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