import Image from "next/image";
import "./itemmenu.css";

export default function ItemMenu() {
  return (
    <div className="slider-menu">
      <Image
        src="/brandlogodesc.png"
        alt="Brand Logo"
        width={247}
        height={28}
        className="menu-logo"
      />
      <div className="menu-title-row">
        <div className="menu-title-texts">
          <p className="menu-item-name">oversized hoodie</p>
          <p className="menu-collection">ss26 temple</p>
        </div>
        <p className="menu-price">$ 600.00</p>
      </div>
      <div className="menu-description">
        DRKSHDW SS26 TEMPLE OVERSIZED HOODIE IN BLACK/MILK FURKA HEAVY
        SWEATSHIRT JERSEY
        <br />
        THIS OVERSIZED HOODIE IS HIP-LENGTH, WITH A LOOSE FIT AND LONG SLEEVES.
        IT HAS A HOOD WITH A DRAWSTRING, RIBBED CUFFS AND WAISTBAND. IT FEATURES
        THE SIGNATURE LEVEL SHOULDER SEAMS AND SINGLE SEAM RUNNING DOWN THE
        CENTRE BACK SPINE. THIS HEAVYWEIGHT COTTON SWEATSHIRT JERSEY HAS A SOFT
        AND WASHED HANDFEEL. THIS JERSEY IS GARMENT DYED. THIS FABRIC IS MADE
        USING GOTS CERTIFIED ORGANIC COTTON WHICH MEANS THE NATURAL FIBER IS
        GROWN WITHOUT HARMFUL CHEMICALS, LEAVING OUR SOIL, AIR AND WATER CLEANER
        FROM CONTAMINATES.
        <br />
        <br />
        COLOR: BLACK/MILK
        <br />
        MATERIAL: 100% COTTON   MODEL IS 189CM TALL MODEL WEARS SIZE S TAXES AND
        FEES INCLUDED
      </div>
    </div>
  );
}
