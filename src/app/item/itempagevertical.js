"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import "./itempagevertical.css";
import VerticalScrollBar from "./VerticalScrollBar";

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

export default function ItemPageVertical() {
  const scrollRef = useRef(null);
  const [displayImages, setDisplayImages] = useState(allItemImages.slice(0, 5));
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [zoomedIndex, setZoomedIndex] = useState(null);
  const cursorPosRef = useRef({ x: 0, y: 0 });
  const [zoomStyle, setZoomStyle] = useState({});
  const slideRefs = useRef([]);
  const zoomRef = useRef(null);
  const zoomTextRef = useRef(null);

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

  const handleMouseMove = (e, index) => {
    cursorPosRef.current = { x: e.clientX, y: e.clientY };
    
    if (zoomTextRef.current && hoveredIndex === index) {
      zoomTextRef.current.style.left = `${e.clientX + 10}px`;
      zoomTextRef.current.style.top = `${e.clientY + 10}px`;
    }
    
    if (zoomedIndex === index && slideRefs.current[index]) {
      const rect = slideRefs.current[index].getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width;
      const yPct = (e.clientY - rect.top) / rect.height;
      const zoomFactor = 2;
      const bgWidth = rect.width * zoomFactor;
      const bgHeight = rect.height * zoomFactor;
      
      if (zoomRef.current) {
        zoomRef.current.style.left = `${e.clientX + 15}px`;
        zoomRef.current.style.top = `${e.clientY + 15}px`;
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
    <div className="vertical-slider-wrapper">
      <div className="vertical-slider-container">
        <VerticalScrollBar scrollRef={scrollRef} />
        <div className="vertical-slider" ref={scrollRef}>
          {displayImages.map((src, index) => (
            <div
              key={index}
              className="vertical-slide"
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
                className="vertical-slide-image"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      </div>
      {hoveredIndex !== null && (
        <div
          ref={zoomTextRef}
          style={{
            position: "fixed",
            left: `${cursorPosRef.current.x + 10}px`,
            top: `${cursorPosRef.current.y + 10}px`,
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
            left: `${cursorPosRef.current.x + 15}px`,
            top: `${cursorPosRef.current.y + 15}px`,
            ...zoomStyle,
          }}
        />
      )}
    </div>
  );
}
