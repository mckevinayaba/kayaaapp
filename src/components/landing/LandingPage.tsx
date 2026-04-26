import { Nav } from "./Nav";
import { HeroCarousel } from "./HeroCarousel";
import { HowItWorks } from "./HowItWorks";
import { ForOwners } from "./ForOwners";
import { ResearchBrief } from "./ResearchBrief";
import { Footer } from "./Footer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function LandingPage() {
  useScrollReveal();
  return (
    <div style={{ background: "#0D1117", minHeight: "100dvh", color: "#F0F6FC" }}>
      <Nav />
      <HeroCarousel />
      <HowItWorks />
      <ForOwners />
      <ResearchBrief />
      <Footer />
    </div>
  );
}
