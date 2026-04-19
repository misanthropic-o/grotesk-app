import HeroSection from "./heroSection";
import DesignerSection from "./designerSection";
import { getHeroImages } from "./heroImages";
import MoneyOnTopOfMe from "./recommendSection";

export default async function MainPage() {
  const heroImages = await getHeroImages();

  return (
    <>
      <HeroSection heroImages={heroImages} />
      <DesignerSection />
      <MoneyOnTopOfMe />
    </>
  );
}
