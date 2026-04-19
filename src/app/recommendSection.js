"use client";

import "./recommendSection.css";
import MainPageSlider from "./mainPageSlid";

export default function MoneyOnTopOfMe() {
  return (
    <section className="recommendSection">
      <MainPageSlider />
      <div className="featuredRecom">
        <p>FEATURED CATEGORIES</p>
      </div>
    </section>
  );
}
