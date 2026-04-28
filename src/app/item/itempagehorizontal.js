"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import "./itempagehorizontal.css";
import HorizontalScrollBar from "./HorizontalScrollBar";

const allItemImages = [
  "/imgs/presetitemimg1.webp",
  "/imgs/presetitemimg2.webp",
  "/imgs/presetitemimg3.webp",
  "/imgs/presetitemimg4.webp",
  "/imgs/presetitemimg5.webp",
  "/imgs/presetitemimg6.webp",
  "/imgs/presetitemimg1.webp",
  "/imgs/presetitemimg2.webp",
  "/imgs/presetitemimg3.webp",
  "/imgs/presetitemimg4.webp",
  "/imgs/presetitemimg5.webp",
  "/imgs/presetitemimg6.webp",
];

export default function ItemPageHorizontal() {
  const scrollRef = useRef(null);
  const [displayImages, setDisplayImages] = useState(allItemImages.slice(0, 5));
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [zoomedIndex, setZoomedIndex] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [zoomPos, setZoomPos] = useState({ left: 0, top: 0 });
  const [zoomStyle, setZoomStyle] = useState({});
  const slideRefs = useRef([]);

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

  const handleMouseMove = (e, index) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    
    if (zoomedIndex === index && slideRefs.current[index]) {
      const rect = slideRefs.current[index].getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width;
      const yPct = (e.clientY - rect.top) / rect.height;
      const zoomFactor = 2;
      const bgWidth = rect.width * zoomFactor;
      const bgHeight = rect.height * zoomFactor;
      
      setZoomPos({ left: e.clientX + 15, top: e.clientY + 15 });
      setZoomStyle({
        backgroundImage: `url(${displayImages[index]})`,
        backgroundSize: `${bgWidth}px ${bgHeight}px`,
        backgroundPosition: `${xPct * 100}% ${yPct * 100}%`,
        backgroundRepeat: "no-repeat",
      });
    }
  };

  const handleClick = (index) => {
    if (zoomedIndex === index) {
      setZoomedIndex(null);
    } else {
      setZoomedIndex(index);
    }
  };

  return (
    <div className="horizontal-slider-wrapper">
      <div className="horizontal-slider" ref={scrollRef}>
        {displayImages.map((src, index) => (
          <div
            key={index}
            className="horizontal-slide"
            ref={(el) => (slideRefs.current[index] = el)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onClick={() => handleClick(index)}
          >
            <Image
              src={src}
              alt={`item-${index}`}
              fill
              className="horizontal-slide-image"
              sizes="(max-width: 768px) 100vw, 640px"
            />
            {hoveredIndex === index && (
              <div
                style={{
                  position: "fixed",
                  left: cursorPos.x + 10,
                  top: cursorPos.y + 10,
                  pointerEvents: "none",
                  zIndex: 10000,
                  background: "rgba(0,0,0,0.7)",
                  color: "white",
                  padding: "2px 6px",
                  fontSize: "12px",
                }}
              >
                ZOOM
              </div>
            )}
          </div>
        ))}
      </div>
      <HorizontalScrollBar scrollRef={scrollRef} />
      {zoomedIndex !== null && (
        <div
          className="slider-zoom"
          style={{
            left: zoomPos.left,
            top: zoomPos.top,
            ...zoomStyle,
          }}
        />
      )}
    </div>
  );
}
