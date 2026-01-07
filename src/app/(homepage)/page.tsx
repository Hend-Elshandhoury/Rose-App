import HeroSection from "./_features/HeroSection";
import BenefitsSection from "./_features/BenefitsSection";
import OccasionsSection from "./_features/OccasionsSection";

export default function Home() {
  return <div className="flex flex-col gap-10">
    <HeroSection />
    <OccasionsSection />
    <BenefitsSection />
  </div>;
}
