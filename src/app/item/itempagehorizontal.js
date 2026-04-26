"use client";

import { useRef, useEffect } from "react";
import "./itempagehorizontal.css";
import HorizontalScrollBar from "./HorizontalScrollBar";

export default function ItemPageHorizontal() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onWheel = (e) => {
      e.preventDefault();
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
          <div key={index} className="horizontal-slide">
            <img src={src} alt={`item-${index}`} />
          </div>
        ))}
      </div>
      <HorizontalScrollBar scrollRef={scrollRef} />
    </div>
  );
}
