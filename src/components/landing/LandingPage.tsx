import { Nav } from "./Nav";
import { HeroCarousel } from "./HeroCarousel";
import { TruthSection } from "./TruthSection";
import { SignWall } from "./SignWall";
import { HowItWorks } from "./HowItWorks";
import { ForOwners } from "./ForOwners";
import { ResearchBrief } from "./ResearchBrief";
import { FinalCTA } from "./FinalCTA";
import { Footer } from "./Footer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function LandingPage() {
  useScrollReveal();
  return (
    <div style={{ background: "var(--midnight)", minHeight: "100dvh", color: "var(--warm-white)" }}>
      <Nav />
      <HeroCarousel />
      <TruthSection />
      <SignWall />
      <HowItWorks />
      <ForOwners />
      <ResearchBrief />
      <FinalCTA />
      <Footer />
    </div>
  );
}
