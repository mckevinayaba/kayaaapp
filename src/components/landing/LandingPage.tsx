import { Nav } from "./Nav";
import { Hero } from "./Hero";

export function LandingPage() {
  return (
    <div style={{ background: "var(--midnight)", minHeight: "100dvh", color: "var(--warm-white)" }}>
      <Nav />
      <Hero />
    </div>
  );
}
