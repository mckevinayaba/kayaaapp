import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { TruthSection } from "./TruthSection";
import { SignWall } from "./SignWall";
import { HowItWorks } from "./HowItWorks";
import { ForOwners } from "./ForOwners";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function LandingPage() {
  useScrollReveal();
  return (
    <div style={{ background: "var(--midnight)", minHeight: "100dvh", color: "var(--warm-white)" }}>
      <Nav />
      <Hero />
      <TruthSection />
      <SignWall />
      <HowItWorks />
      <ForOwners />
    </div>
  );
}
