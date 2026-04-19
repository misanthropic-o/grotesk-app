import HeroSection from "./mainPage/heroSection";
import DesignerSection from "./mainPage/designerSection";
import { getHeroImages } from "./mainPage/heroImages";
import MoneyOnTopOfMe from "./recommendSection.js";

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
