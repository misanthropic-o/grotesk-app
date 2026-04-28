"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import "./itempagehorizontal.css";
import HorizontalScrollBar from "./HorizontalScrollBar";
import PicMenu from "./PicMenu";

const allItemImages = Array.from(
  { length: 12 },
  (_, i) => `/imgs/ROslidertemplatehorizontal.png`,
);

export default function ItemPageHorizontal() {
  const scrollRef = useRef(null);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [displayImages, setDisplayImages] = useState(allItemImages.slice(0, 5));

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onWheel = (e) => {
      const canScroll = container.scrollWidth > container.clientWidth;
      if (!canScroll) return;

      e.preventDefault();
      e.stopPropagation();
      container.scrollLeft += e.deltaY * 1.3;
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  const handleSelectorClick = (selectorIndex) => {
    const usedIndices = [0, 1, 2];
    const replaceIndex = selectorIndex % 3;
    const newImage = allItemImages[3 + selectorIndex];

    const newDisplay = [...displayImages];
    newDisplay[replaceIndex] = newImage;
    setDisplayImages(newDisplay);
  };

  const selectorImages = allItemImages.slice(3, 6);

  return (
    <div className="horizontal-slider-wrapper">
      <div className="horizontal-slider" ref={scrollRef}>
        {displayImages.map((src, index) => (
          <div
            key={index}
            className="horizontal-slide"
            onClick={() => setSelectedSlide({ src, index })}
          >
            <Image
              src={src}
              alt={`item-${index}`}
              fill
              className="horizontal-slide-image"
              sizes="(max-width: 768px) 100vw, 640px"
            />
          </div>
        ))}
      </div>
      <HorizontalScrollBar scrollRef={scrollRef} />

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
