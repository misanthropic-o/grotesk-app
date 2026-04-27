"use client";

import { useEffect, useState } from "react";
import "./PicMenu.css";

export default function PicMenu({ isOpen, onClose, items }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  const displayItems = (items || [
    "imgs/ROslidertemplatehorizontal.png",
    "imgs/ROslidertemplatehorizontal.png",
    "imgs/ROslidertemplatehorizontal.png",
  ]).slice(0, 3);

  return (
    <div className="picmenu-overlay" onClick={onClose}>
      <div className="picmenu-content" onClick={(e) => e.stopPropagation()}>
        <div className="picmenu-cards">
          {displayItems.map((src, index) => (
            <div key={index} className="picmenu-card">
              <img src={src} alt={`item-${index}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}