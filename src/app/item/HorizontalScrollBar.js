"use client";

import { useState, useEffect } from "react";
import "./HorizontalScrollBar.css";

export default function HorizontalScrollBar({ scrollRef }) {
  const [scrollRatio, setScrollRatio] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(100);

  useEffect(() => {
    if (!scrollRef?.current) return;
    const container = scrollRef.current;

    const update = () => {
      const trackWidth = 579;
      const contentWidth = container.scrollWidth;
      const thumbW = (container.clientWidth / contentWidth) * trackWidth;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const ratio = maxScroll > 0 ? container.scrollLeft / maxScroll : 0;
      setThumbWidth(thumbW);
      setScrollRatio(ratio);
    };

    container.addEventListener("scroll", update);
    update();
    return () => container.removeEventListener("scroll", update);
  }, []);

  const trackWidth = 579;
  const maxTranslate = trackWidth - thumbWidth;
  const translateX = maxTranslate * scrollRatio;

  return (
    <div className="horizontal-scrollbar-track" style={{ width: trackWidth, height: 9 }}>
      <div
        className="horizontal-scrollbar-thumb"
        style={{
          width: thumbWidth,
          transform: `translateX(${translateX}px)`,
        }}
      ></div>
    </div>
  );
}