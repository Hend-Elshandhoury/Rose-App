import HeroSection from "./_features/hero-section";
import BenefitsSection from "./_features/benefits-section";
import OccasionsSection from "./_features/occasions-section";

export default function Home() {
  return <div className="flex flex-col gap-10">
    <HeroSection />
    <OccasionsSection />
    <BenefitsSection />
  </div>;
}
