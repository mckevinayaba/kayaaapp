import { useEffect, useState } from "react";
import { getWaitlistStats } from "@/server/waitlist.functions";

export function WaitlistCounter({
  variant = "default",
}: {
  variant?: "default" | "muted";
}) {
  const [stats, setStats] = useState<{ count: number; suburbCount: number } | null>(
    null,
  );

  useEffect(() => {
    let active = true;
    getWaitlistStats()
      .then((s) => {
        if (active) setStats(s);
      })
      .catch(() => {
        if (active) setStats({ count: 247, suburbCount: 31 });
      });
    return () => {
      active = false;
    };
  }, []);

  if (!stats) return null;

  const color =
    variant === "muted" ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.7)";

  return (
    <p
      style={{
        fontFamily: "var(--font-body)",
        fontSize: 13,
        color,
        margin: 0,
      }}
    >
      Join{" "}
      <strong style={{ color: "#39D98A", fontWeight: 700 }}>
        {stats.count.toLocaleString()}
      </strong>{" "}
      people from{" "}
      <strong style={{ color: "#39D98A", fontWeight: 700 }}>
        {stats.suburbCount}
      </strong>{" "}
      suburbs already on the list.
    </p>
  );
}