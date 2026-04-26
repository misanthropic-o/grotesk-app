"use client";

import "./ItemCardMenu.css";
import { useState } from "react";

const CounterBtn = () => (
  <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.52364 7.52087L4.51255 0.501465L0.501465 7.52087" stroke="#101010" strokeWidth="1.00277" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SIZES = ["XS", "S", "M", "XL", "XXL"];
const COLORS = ["black", "orange", "blue", "red"];
const COLOR_HEX = { black: "#000000", orange: "#FF6600", blue: "#0066FF", red: "#FF0000" };

export default function ItemCardMenu() {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);

  const cycleSize = (e) => {
    e.stopPropagation();
    setSizeIndex((prev) => (prev + 1 + SIZES.length) % SIZES.length);
  };

  const cycleColor = (e) => {
    e.stopPropagation();
    setColorIndex((prev) => (prev + 1 + COLORS.length) % COLORS.length);
  };

  return (
    <>
      <div className="button-panel-item-card-menu">
        <button className="buy-now-button-item-card">BUY NOW</button>
        <div className="size-color-selectors-item-card">
          <div className="selector-shit item-card-size">
            <span>{SIZES[sizeIndex]}</span>
          </div>
          <div className="counter-buttons-item-card">
            <button className="btn-placeholder-item-card add item-card" onClick={cycleSize}><CounterBtn /></button>
            <button className="btn-placeholder-item-card remove-item-button" onClick={cycleSize}><CounterBtn /></button>
          </div>
        </div>
        <div className="size-color-selectors-item-card">
          <div className="selector-shit item-card-color">
            <div className="color-block" style={{ backgroundColor: COLOR_HEX[COLORS[colorIndex]] }}></div>
            <span className="color-name">{COLORS[colorIndex]}</span>
          </div>
          <div className="counter-buttons-item-card">
            <button className="btn-placeholder-item-card add-item-card" onClick={cycleColor}><CounterBtn /></button>
            <button className="btn-placeholder-item-card remove-item-button" onClick={cycleColor}><CounterBtn /></button>
          </div>
        </div>
      </div>
    </>
  );
}