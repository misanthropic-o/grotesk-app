"use client";

import "./designerSection.css";
import DesignerCard from "./designerCard";

export default function DesignerSection() {
  return (
    <section className="designerSection">
      <DesignerCard />
      <DesignerCard />
      <DesignerCard />
    </section>
  );
}
