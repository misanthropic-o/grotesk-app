"use client";

import { useRef, useEffect, useState } from "react";
import "./itempagevertical.css";
import VerticalScrollBar from "./VerticalScrollBar";
import PicMenu from "./PicMenu";

const allItemImages = Array.from({ length: 12 }, (_, i) => `imgs/ROslidertemplatehorizontal.png`);

export default function ItemPageVertical() {
  const scrollRef = useRef(null);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [displayImages, setDisplayImages] = useState([]);

  useEffect(() => {
    setDisplayImages(allItemImages.slice(0, 5));
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onWheel = (e) => {
      const canScroll = container.scrollHeight > container.clientHeight;
      if (!canScroll) return;

      e.preventDefault();
      e.stopPropagation();
      container.scrollTop += e.deltaY * 1.3;
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  const handleSelectorClick = (selectorIndex) => {
    const newDisplay = [...displayImages];
    newDisplay[selectorIndex % 3] = allItemImages[3 + selectorIndex];
    setDisplayImages(newDisplay);
  };

  const selectorImages = allItemImages.slice(3, 6);

  return (
    <div className="vertical-slider-wrapper">
      <div className="vertical-slider-container">
        <VerticalScrollBar scrollRef={scrollRef} />
        <div className="vertical-slider" ref={scrollRef}>
          {displayImages.map((src, index) => (
            <div key={index} className="vertical-slide" onClick={() => setSelectedSlide({ src, index })}>
              <img src={src} alt={`item-${index}`} />
            </div>
          ))}
        </div>
      </div>

      <PicMenu 
        isOpen={selectedSlide !== null} 
        onClose={() => setSelectedSlide(null)} 
        items={displayImages}
        selectorImages={selectorImages}
        onSelectorClick={handleSelectorClick}
      />
    </div>
  );
}