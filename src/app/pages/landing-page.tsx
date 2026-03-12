import { Header } from "../components/header";
import { HeroSection } from "../components/hero-section";
import { MembershipTiers } from "../components/membership-tiers";
import { MatchdayHub } from "../components/matchday-hub";
import { SocialProof } from "../components/social-proof";
import { Footer } from "../components/footer";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <HeroSection />
      <MembershipTiers />
      <MatchdayHub />
      <SocialProof />
      <Footer />
    </div>
  );
}
