"use client";

import { useEffect, useState, useRef } from "react";
import "./PicMenu.css";
import ImageSelector from "./ImageSelector";

export default function PicMenu({ isOpen, onClose, items, selectorImages, onSelectorClick }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [zoomStyle, setZoomStyle] = useState({});
  const [zoomPos, setZoomPos] = useState({ left: 0, top: 0 });
  const cardRefs = useRef([]);

  const displayItems = items ? items.slice(0, 3) : [];

  const handleMouseMove = (e) => {
    const newX = e.clientX;
    const newY = e.clientY;
    
    let zoomLeft = newX - 150;
    let zoomTop = newY - 100;
    if (zoomLeft < 0) zoomLeft = 0;
    if (zoomTop < 0) zoomTop = 0;
    if (zoomLeft + 300 > window.innerWidth) zoomLeft = window.innerWidth - 300;
    if (zoomTop + 200 > window.innerHeight) zoomTop = window.innerHeight - 200;
    setZoomPos({ left: zoomLeft, top: zoomTop });
    
    if (hoveredIndex !== null && cardRefs.current[hoveredIndex]) {
      const card = cardRefs.current[hoveredIndex];
      const rect = card.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width;
      const yPct = (e.clientY - rect.top) / rect.height;
      const zoomFactor = 2;
      const bgWidth = 555 * zoomFactor;
      const bgHeight = 770 * zoomFactor;
      const currentImg = displayItems[hoveredIndex];
      if (currentImg) {
        setZoomStyle({
          backgroundImage: `url(${currentImg})`,
          backgroundSize: `${bgWidth}px ${bgHeight}px`,
          backgroundPosition: `${xPct * 100}% ${yPct * 100}%`,
          backgroundRepeat: "no-repeat",
        });
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="picmenu-overlay" onClick={onClose} onMouseMove={handleMouseMove}>
      <div className="picmenu-content" onClick={(e) => e.stopPropagation()}>
        <div className="picmenu-main">
          <div className="picmenu-cards">
            {displayItems.map((src, index) => (
              <div
                key={index}
                className="picmenu-card"
                ref={(el) => (cardRefs.current[index] = el)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img src={src} alt={`item-${index}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="picmenu-selector">
          <ImageSelector 
            images={selectorImages} 
            onSelect={onSelectorClick}
          />
        </div>
        {hoveredIndex !== null && displayItems[hoveredIndex] && (
          <div
            className="picmenu-zoom"
            style={{
              left: zoomPos.left,
              top: zoomPos.top,
              ...zoomStyle,
            }}
          />
        )}
      </div>
    </div>
  );
}