"use client";

import { useRef, useEffect, useState } from "react";
import "./itempagevertical.css";
import VerticalScrollBar from "./VerticalScrollBar";
import PicMenu from "./PicMenu";

export default function ItemPageVertical() {
  const scrollRef = useRef(null);
  const [selectedSlide, setSelectedSlide] = useState(null);

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

  const images = [
    "imgs/ROslidertemplatehorizontal.png",
    "imgs/ROslidertemplatehorizontal.png",
    "imgs/ROslidertemplatehorizontal.png",
    "imgs/ROslidertemplatehorizontal.png",
    "imgs/ROslidertemplatehorizontal.png",
  ];

  return (
    <div className="vertical-slider-wrapper">
      <div className="vertical-slider-container">
        <VerticalScrollBar scrollRef={scrollRef} />
        <div className="vertical-slider" ref={scrollRef}>
          {images.map((src, index) => (
            <div key={index} className="vertical-slide" onClick={() => setSelectedSlide({ src, index })}>
              <img src={src} alt={`item-${index}`} />
            </div>
          ))}
        </div>
      </div>

      <PicMenu isOpen={selectedSlide !== null} onClose={() => setSelectedSlide(null)} items={images} />
    </div>
  );
}
