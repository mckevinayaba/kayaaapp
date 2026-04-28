import { Nav } from "./Nav";
import { HeroCarousel } from "./HeroCarousel";
import { HowItWorks } from "./HowItWorks";
import { ForOwners } from "./ForOwners";
import { ResearchBrief } from "./ResearchBrief";
import { AppProof } from "./AppProof";
import { CityWaitlist } from "./CityWaitlist";
import { Footer } from "./Footer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { TruthSection } from "./TruthSection";
import { EditorialPhotoBreak } from "./EditorialPhotoBreak";
import { PlacesGallery } from "./PlacesGallery";
import { ValueStack } from "./ValueStack";
import { SocialProof } from "./SocialProof";
import { CheckInCTA } from "./CheckInCTA";
import { WaitlistModal } from "./WaitlistModal";
import { StickyMobileCTA } from "./StickyMobileCTA";
import { WhyMatters } from "./WhyMatters";
import { NeighbourhoodFeed } from "./NeighbourhoodFeed";
import { NeighbourhoodListener } from "./NeighbourhoodListener";

export function LandingPage() {
  useScrollReveal();
  return (
    <div style={{ background: "#0D1117", minHeight: "100dvh", color: "#F0F6FC" }}>
      <Nav />
      <HeroCarousel />
      <CheckInCTA />
      <TruthSection />
      <WhyMatters />
      <EditorialPhotoBreak />
      <HowItWorks />
      <AppProof />
      <PlacesGallery />
      <NeighbourhoodFeed />
      <ValueStack />
      <ForOwners />
      <ResearchBrief />
      <SocialProof />
      <NeighbourhoodListener />
      <CityWaitlist />
      <Footer />
      <WaitlistModal />
      <StickyMobileCTA />
    </div>
  );
}
