import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { LandingPage } from "@/components/landing/LandingPage";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "kayaa — find local. support local." },
      {
        name: "description",
        content:
          "kayaa is a neighbourhood discovery and check-in platform for South Africa. Find the local places that hold communities together.",
      },
      { property: "og:title", content: "kayaa — find local. support local." },
      {
        property: "og:description",
        content:
          "Neighbourhood discovery and check-ins. The places that hold local life together — finally findable.",
      },
    ],
  }),
});

function Index() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!active) return;
        if (data.session) {
          navigate({ to: "/feed" as string as "/" });
        } else {
          setChecked(true);
        }
      })
      .catch(() => active && setChecked(true));
    return () => {
      active = false;
    };
  }, [navigate]);

  if (!checked) {
    return (
      <div
        style={{
          minHeight: "100dvh",
          background: "var(--midnight)",
        }}
      />
    );
  }

  return <LandingPage />;
}
