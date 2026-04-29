import { createFileRoute, Link } from "@tanstack/react-router";
import { openWaitlist } from "@/lib/waitlist-store";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { WaitlistModal } from "@/components/landing/WaitlistModal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About kayaa — we say support local. but we cannot find local." },
      {
        name: "description",
        content:
          "kayaa is a neighbourhood-first discovery platform for the South African places that hold our communities together. An honest look at why visibility matters.",
      },
      {
        property: "og:title",
        content: "About kayaa — we say support local. but we cannot find local.",
      },
      {
        property: "og:description",
        content:
          "Townships hold a R900-billion economy and most of the places inside it don't exist on Google Maps. kayaa is building the visibility layer.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AboutPage,
});

function Section({
  label,
  title,
  children,
}: {
  label?: string;
  title?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        padding: "80px 6%",
        borderTop: "1px solid var(--border-kayaa)",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {label && (
          <p
            className="reveal"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--green)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              margin: "0 0 18px",
            }}
          >
            {label}
          </p>
        )}
        {title && (
          <h2
            className="reveal"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(28px, 3.6vw, 44px)",
              color: "var(--warm-white)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              margin: "0 0 28px",
            }}
          >
            {title}
          </h2>
        )}
        <div
          className="reveal"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 18,
            color: "rgba(255,255,255,0.78)",
            lineHeight: 1.75,
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  useScrollReveal();
  return (
    <div style={{ background: "var(--midnight)", minHeight: "100dvh", color: "var(--warm-white)" }}>
      <Nav />

      {/* HERO */}
      <section
        style={{
          padding: "160px 6% 100px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-20%",
            left: "50%",
            width: 800,
            height: 800,
            transform: "translateX(-50%)",
            background:
              "radial-gradient(circle, rgba(57,217,138,0.10) 0%, rgba(57,217,138,0) 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: 880, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.2em",
              color: "var(--green)",
              margin: "0 0 24px",
              textTransform: "uppercase",
            }}
          >
            About kayaa · An honest letter
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(40px, 6vw, 76px)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              color: "var(--warm-white)",
              margin: 0,
            }}
          >
            We say support local.
            <br />
            <span style={{ color: "var(--green)" }}>
              But we cannot even find local.
            </span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 19,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.6,
              margin: "32px auto 0",
              maxWidth: 580,
            }}
          >
            This page is the long version of why kayaa exists. No spin. No
            slogans we can't back up.
          </p>
        </div>
      </section>

      {/* THE TRUTH */}
      <Section
        label="The uncomfortable part"
        title={
          <>
            South Africa is full of places doing
            extraordinary things — and almost
            <span style={{ color: "var(--green)" }}> none of them are findable.</span>
          </>
        }
      >
        <p>
          Townships in this country hold a R900-billion economy. And most of
          the places inside that economy do not exist on Google Maps.
        </p>
        <p style={{ marginTop: 18 }}>
          The barber who has cut three generations of the same family has no
          page, no record, no way to call back his own regulars when it's
          quiet on a Tuesday afternoon.
        </p>
        <p style={{ marginTop: 18 }}>
          The tuckshop that fed a street through lockdown cannot prove to a
          bank that it has customers — even though it serves the same fifty
          people every single day.
        </p>
        <p style={{ marginTop: 18 }}>
          The salon that taught a generation of women how to feel beautiful
          has no archive of any of it. No story. No trail. Nothing that
          outlives the day.
        </p>
        <p style={{ marginTop: 18 }}>
          The shisanyama where every birthday on the street ends, the car
          wash where the football debates happen, the church hall that holds
          weddings and funerals in the same week — invisible. Not to the
          neighbourhood. To everyone else.
        </p>
      </Section>

      {/* THE COST */}
      <Section
        label="What this costs us"
        title={
          <>
            Invisibility is not neutral.
            <br />
            <span style={{ color: "var(--green)" }}>It costs real things.</span>
          </>
        }
      >
        <p>
          When a place cannot be found, it cannot be funded. It cannot
          negotiate a lease. It cannot attract a sponsor. It cannot prove its
          customer base. It cannot pass anything on to the next generation.
        </p>
        <p style={{ marginTop: 18 }}>
          When a place cannot be found, it dies quietly — and gets replaced
          by a chain that doesn't know anyone's name.
        </p>
        <p style={{ marginTop: 18 }}>
          We keep telling each other to support local. But you cannot support
          what you cannot see. And we have built a country where the places
          doing the most are the ones being seen the least.
        </p>
      </Section>

      {/* WHAT IT IS */}
      <Section
        label="What kayaa is"
        title={
          <>
            A visibility layer for the
            <br />
            <span style={{ color: "var(--green)" }}>
              places that already matter.
            </span>
          </>
        }
      >
        <p>
          kayaa is a neighbourhood-first discovery platform for the local
          places that hold South African communities together — built so that
          being known doesn't require a marketing budget.
        </p>
        <p style={{ marginTop: 18 }}>
          You will be able to open kayaa, see the places on your street, walk
          in, tap once, and become a regular. The places will get a real page,
          a real record of their community, and a real way to reach the
          people who already love them.
        </p>
        <p style={{ marginTop: 18 }}>
          That is the entire product. Discovery for the people who live there.
          Visibility for the places that hold them.
        </p>
      </Section>

      {/* WHAT IT IS NOT */}
      <Section label="What kayaa is not">
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {[
            "Not Yelp. We are not here to rate, rank or score anyone.",
            "Not Google Maps. We are not building a global directory.",
            "Not a chain showcase. We are not for franchises with marketing teams.",
            "Not a payments app. The cash that flows through these places already works.",
            "Not live yet. We are pre-launch. Johannesburg first. Then everywhere.",
          ].map((line) => (
            <li
              key={line}
              style={{
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
              }}
            >
              <span
                aria-hidden
                style={{
                  flexShrink: 0,
                  marginTop: 11,
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: "var(--green)",
                  boxShadow: "0 0 8px var(--green)",
                }}
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* CLOSING */}
      <section
        style={{
          padding: "120px 6%",
          borderTop: "1px solid var(--border-kayaa)",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p
            className="reveal"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--green)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              margin: "0 0 24px",
            }}
          >
            A note from us
          </p>
          <p
            className="reveal"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(24px, 3vw, 36px)",
              color: "var(--warm-white)",
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              margin: "0 0 36px",
            }}
          >
            We are South Africans building this for South African
            neighbourhoods. We are doing it slowly, on purpose, one
            neighbourhood at a time — because the places we are building for
            deserve to be done right, not done fast.
          </p>
          <button
            onClick={() => openWaitlist(1)}
            style={{
              background: "var(--green)",
              color: "var(--midnight)",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 16,
              padding: "16px 36px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 50px var(--green-glow)",
            }}
          >
            Join the waitlist →
          </button>
          <div style={{ marginTop: 24 }}>
            <Link
              to="/"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
              }}
            >
              ← Back to the home page
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WaitlistModal />
    </div>
  );
}
