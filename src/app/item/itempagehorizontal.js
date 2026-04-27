"use client";

import { useRef, useEffect, useState } from "react";
import "./itempagehorizontal.css";
import HorizontalScrollBar from "./HorizontalScrollBar";
import PicMenu from "./PicMenu";

export default function ItemPageHorizontal() {
  const scrollRef = useRef(null);
  const [selectedSlide, setSelectedSlide] = useState(null);

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

  const images = [
    "imgs/ROslidertemplatehorizontal.png",
    "imgs/ROslidertemplatehorizontal.png",
    "imgs/ROslidertemplatehorizontal.png",
    "imgs/ROslidertemplatehorizontal.png",
    "imgs/ROslidertemplatehorizontal.png",
  ];

  return (
    <div className="horizontal-slider-wrapper">
      <div className="horizontal-slider" ref={scrollRef}>
        {images.map((src, index) => (
          <div key={index} className="horizontal-slide" onClick={() => setSelectedSlide({ src, index })}>
            <img src={src} alt={`item-${index}`} />
          </div>
        ))}
      </div>
      <HorizontalScrollBar scrollRef={scrollRef} />

      <PicMenu isOpen={selectedSlide !== null} onClose={() => setSelectedSlide(null)} items={images} />
    </div>
  );
}
