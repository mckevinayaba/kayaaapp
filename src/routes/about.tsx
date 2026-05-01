import { createFileRoute, Link } from "@tanstack/react-router";
import { openWaitlist } from "@/lib/waitlist-store";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { WaitlistModal } from "@/components/landing/WaitlistModal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About kayaa — we say support local. But we cannot even find local." },
      {
        name: "description",
        content:
          "The long version of why kayaa exists. The problem, the cost of leaving it unsolved, and what kayaa is being built to do about it.",
      },
      {
        property: "og:title",
        content: "About kayaa — we say support local. But we cannot even find local.",
      },
      {
        property: "og:description",
        content:
          "South Africa is full of neighbourhood places doing extraordinary things, and almost none of them are easy to find properly. kayaa is the visibility layer being built to change that.",
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
            vague promises. Just the problem, the cost of leaving it
            unsolved, and what kayaa is being built to do about it.
          </p>
        </div>
      </section>

      {/* THE TRUTH */}
      <Section
        label="The uncomfortable part"
        title={
          <>
            South Africa is full of neighbourhood places doing extraordinary
            things, and almost
            <span style={{ color: "var(--green)" }}> none of them are easy to find properly.</span>
          </>
        }
      >
        <p>
          The barber who has cut three generations of the same family has no
          visible record of the community he has built and no simple way to
          stay connected to the people who already trust him.
        </p>
        <p style={{ marginTop: 18 }}>
          The tuckshop that fed a street through lockdown cannot clearly show
          the consistency of the customers it serves, even though the same
          people keep coming back every single day.
        </p>
        <p style={{ marginTop: 18 }}>
          The salon that taught a generation of women how to feel beautiful
          has no real archive of that trust, no visible trail of what it
          means to the people who depend on it, and no durable neighbourhood
          presence beyond the day itself.
        </p>
        <p style={{ marginTop: 18 }}>
          The shisanyama where birthdays end, the car wash where football
          debates happen, the church hall that holds weddings and funerals in
          the same week, the café people keep recommending, the mechanic
          people trust with their week, and the clothing shop people return
          to before every important moment are often visible only to the
          people who already know them.
        </p>
        <p style={{ marginTop: 18 }}>
          Not to the neighbourhood. To everyone else.
        </p>
        <p style={{ marginTop: 18 }}>
          And this is true across every kind of South African area —
          Sandton, Rosebank, Fourways, Randburg, Braamfontein, Hillbrow,
          Maboneng, Soweto, Alexandra, Tembisa, Khayelitsha, Mitchells
          Plain. Different streets. Same wound.
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
          When a place cannot be seen properly, it becomes harder to attract
          new customers, harder to prove value, harder to build continuity,
          harder to create momentum, and harder to grow beyond the limits of
          word of mouth.
        </p>
        <p style={{ marginTop: 18 }}>
          When a place stays invisible for too long, it does not only lose
          attention. It loses opportunity.
        </p>
        <p style={{ marginTop: 18 }}>
          We keep telling each other to support local. But you cannot support
          what you cannot see clearly. And we have built a country where many
          of the places doing the most are still the ones being seen the
          least.
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
          kayaa is a neighbourhood-first visibility and discovery platform
          where people can see the places that matter, follow what is
          happening around them, and share useful local updates tied to real
          places — built so that being known does not require a marketing
          budget.
        </p>
        <p style={{ marginTop: 18 }}>
          You will be able to open kayaa, see the places around you, follow
          the updates people are sharing, see useful neighbourhood signals
          and alerts, and share photos, videos, and posts tied to the exact
          place they happened. Walk in and tap once to show you were there.
          Places get a real page, a visible record of community activity,
          and a clearer way to stay connected to the people who already know
          them — and the people nearby who should.
        </p>
        <p style={{ marginTop: 18 }}>
          A living neighbourhood layer. Not just a place directory.
        </p>
        <p style={{ marginTop: 18 }}>
          Clearer discovery for neighbourhoods.
          <br />
          Better visibility for places.
          <br />
          More commercial possibility for businesses.
          <br />
          More awareness of what is happening around you.
        </p>
      </Section>

      {/* WHAT IT HELPS DO */}
      <Section
        label="What kayaa helps do"
        title={
          <>
            Easier to find.
            <br />
            <span style={{ color: "var(--green)" }}>
              Easier to return to. Easier to grow.
            </span>
          </>
        }
      >
        <p>
          kayaa is being built to help local places become easier to find,
          easier to return to, and easier to grow.
        </p>
        <p style={{ marginTop: 18 }}>
          For neighbourhoods, that means less guesswork, clearer local
          discovery, and a practical view of what is happening nearby —
          useful alerts, community updates, and place-based posts that help
          people stay more informed, more alert, and better connected to
          local life.
        </p>
        <p style={{ marginTop: 18 }}>
          For businesses and places, that means stronger visibility, more
          repeat recognition, and a better chance of turning everyday trust
          into something visible, usable, and commercially meaningful.
        </p>
        <p style={{ marginTop: 18 }}>
          Because the problem is not only that local places are loved. The
          problem is that too many of them — and too much of what is
          happening around them — are still digitally hard to see.
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
            "Not a rating game. This is not built to reduce places to stars and scores.",
            "Not a global directory. This is built around neighbourhood visibility and local relevance.",
            "Not a chain showcase. This is for the places people already trust, not only the places with the biggest budgets.",
            "Not another noisy content feed. This is built around places, neighbourhood life, and local visibility.",
            "Not a payments app. The cash that already moves through these places is not the first problem. Visibility is.",
            "Not live yet. We are pre-launch. One neighbourhood at a time, wherever people speak up first.",
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
            Join the neighbourhood waitlist →
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
