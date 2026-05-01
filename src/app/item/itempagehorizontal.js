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
  const [zoomStyle, setZoomStyle] = useState({});
  const slideRefs = useRef([]);
  const zoomRef = useRef(null);
  const zoomTextRef = useRef(null);

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
    const nextPos = { x: e.clientX, y: e.clientY };
    setCursorPos(nextPos);

    if (zoomTextRef.current && hoveredIndex === index) {
      zoomTextRef.current.style.left = `${nextPos.x + 10}px`;
      zoomTextRef.current.style.top = `${nextPos.y + 10}px`;
    }

    if (zoomedIndex !== null && slideRefs.current[index]) {
      const rect = slideRefs.current[index].getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width;
      const yPct = (e.clientY - rect.top) / rect.height;
      const zoomFactor = 2;
      const bgWidth = rect.width * zoomFactor;
      const bgHeight = rect.height * zoomFactor;

      if (zoomRef.current) {
        zoomRef.current.style.left = `${nextPos.x + 15}px`;
        zoomRef.current.style.top = `${nextPos.y + 15}px`;
      }

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
          </div>
        ))}
      </div>
      <HorizontalScrollBar scrollRef={scrollRef} />
      {hoveredIndex !== null && (
        <div
          ref={zoomTextRef}
          style={{
            position: "fixed",
            left: `${cursorPos.x + 10}px`,
            top: `${cursorPos.y + 10}px`,
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
      {zoomedIndex !== null && (
        <div
          ref={zoomRef}
          className="slider-zoom"
          style={{
            left: `${cursorPos.x + 15}px`,
            top: `${cursorPos.y + 15}px`,
            ...zoomStyle,
          }}
        />
      )}
    </div>
  );
}
