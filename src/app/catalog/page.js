"use client";

import { useState, useEffect, useRef } from "react";
import SearchBarComponent from "../SearchBarComponent";
import ItemCard from "./itemCard";
import "./page.css";

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Mali", "Mauritania", "Mauritius", "Mexico", "Moldova", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saudi Arabia", "Senegal", "Serbia", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const clothingSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const shoeSizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"];
const genders = ["Male", "Female", "Unisex"];
const conditions = ["New", "Like New", "Good", "Fair", "Poor"];
const garmentTypes = ["T-Shirt", "Hoodie", "Sweatshirt", "Jacket", "Coat", "Blazer", "Jeans", "Trousers", "Shorts", "Sweatpants", "Cargo Pants", "Shoes", "Sneakers", "Boots", "Dress Shoes", "Sandals", "Shirt", "Dress Shirt", "Polo Shirt", "Suit", "Vest", "Skirt", "Dress", "Jumpsuit", "Overalls", "Hat", "Cap", "Beanie", "Scarf", "Gloves", "Belt", "Tie", "Socks", "Underwear", "Swimwear", "Activewear", "Loungewear", "Sleepwear", "Parka", "Puffer Jacket", "Bomber Jacket", "Leather Jacket", "Denim Jacket", "Windbreaker", "Cardigan", "Turtleneck", "Hoodie Dress", "Tracksuit"];

function FilterInput({ placeholder, list, value, onChange }) {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = list.filter(item =>
    item.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div ref={wrapperRef} className="filter-input-wrapper" style={{ position: "relative" }}>
      <input
        className="filter-input"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsFocused(true);
          if (onChange) onChange(e);
        }}
        onFocus={() => setIsFocused(true)}
        autoComplete="off"
      />
      {isFocused && filtered.length > 0 && (
        <div className="filter-dropdown">
          {filtered.map((item) => (
            <div
              key={item}
              className="filter-dropdown-item"
              onMouseDown={(e) => {
                e.preventDefault();
                setInputValue(item);
                setIsFocused(false);
                if (onChange) onChange({ target: { value: item } });
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Catalog() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState({ top: 0, height: "100vh" });
  const [garmentType, setGarmentType] = useState("");

  useEffect(() => {
    const update = () => {
      const header = document.querySelector(".catalog-top-section");
      const searchSection = document.querySelector(".catalog-seciton");
      
      let top = 0;
      if (header) top += header.getBoundingClientRect().height;
      if (searchSection) top += searchSection.getBoundingClientRect().height;
      
      setMenuStyle({
        top,
        height: `calc(100vh - ${top}px)`,
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [isFilterOpen]);

  useEffect(() => {
    if (isFilterOpen) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollTop}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollTop = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollTop) {
        window.scrollTo(0, -parseInt(scrollTop));
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isFilterOpen]);

  const isShoes = garmentType.toLowerCase().includes("shoe");

  return (
    <>
      <div style={{ position: "relative", zIndex: isFilterOpen ? 1 : "auto" }}>
        <section className="catalog-seciton">
          <div className="catalog-searchfilter">
            <SearchBarComponent />
            <button
              className="filter-button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              FILTER
              <img src="/Vector.svg" alt="filter" />
            </button>
          </div>
        </section>
      </div>

      <div
        className={`filter-overlay ${isFilterOpen ? "visible" : ""}`}
        style={{ top: `${menuStyle.top}px`, height: menuStyle.height }}
        onClick={() => setIsFilterOpen(false)}
      />
      <div
        className={`filter-menu ${isFilterOpen ? "open" : ""}`}
        style={menuStyle}
      >
        <div className="filter-menu-inner">
          <h3>FILTER OPTIONS</h3>
          <FilterInput placeholder="SELLER COUNTRY" list={countries} />
          <FilterInput 
            placeholder="SIZE" 
            list={isShoes ? shoeSizes : clothingSizes} 
          />
          <FilterInput 
            placeholder="TYPE OF GARMENT" 
            list={garmentTypes}
            onChange={(e) => setGarmentType(e.target.value)}
          />
          <FilterInput placeholder="BRAND" list={[]} />
          <FilterInput placeholder="GENDER" list={genders} />
          <FilterInput placeholder="CONDITION" list={conditions} />
          <div style={{ marginBottom: "30px" }} />
          <div style={{ fontSize: "18px", marginBottom: "10px", marginTop: "20px" }}>PRICE RANGE</div>
          <div style={{ display: "flex", gap: "2rem", marginBottom: "15px" }}>
            <input 
              className="filter-input" 
              placeholder="PRICE FROM" 
              style={{ width: "50%", background: "none", cursor: "text" }} 
            />
            <input 
              className="filter-input" 
              placeholder="PRICE TO" 
              style={{ width: "50%", background: "none", cursor: "text" }} 
            />
          </div>
        </div>
      </div>

      <div style={{ position: "relative", zIndex: isFilterOpen ? 1 : "auto" }}>
        <div className="catalog-grid-container">
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>
      </div>
    </>
  );
}
