import { Nav } from "./Nav";
import { HeroCarousel } from "./HeroCarousel";
import { TruthSection } from "./TruthSection";
import { WhyMatters } from "./WhyMatters";
import { HowItWorks } from "./HowItWorks";
import { PlacesGallery } from "./PlacesGallery";
import { NominationAsk } from "./NominationAsk";
import { NeighbourhoodFeed } from "./NeighbourhoodFeed";
import { NeighbourhoodListener } from "./NeighbourhoodListener";
import { CityWaitlist } from "./CityWaitlist";
import { Footer } from "./Footer";
import { WaitlistModal } from "./WaitlistModal";
import { StickyMobileCTA } from "./StickyMobileCTA";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function LandingPage() {
  useScrollReveal();
  return (
    <div style={{ background: "var(--midnight)", minHeight: "100dvh", color: "var(--warm-white)" }}>
      <Nav />
      <HeroCarousel />
      <TruthSection />
      <WhyMatters />
      <NominationAsk />
      <HowItWorks />
      <PlacesGallery />
      <NeighbourhoodFeed />
      <NeighbourhoodListener />
      <CityWaitlist />
      <Footer />
      <WaitlistModal />
      <StickyMobileCTA />
    </div>
  );
}
