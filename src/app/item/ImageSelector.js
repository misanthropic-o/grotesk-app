"use client";

import Image from "next/image";
import "./ImageSelector.css";

export default function ImageSelector({ images, selectedIndex, onSelect }) {
  return (
    <div className="imageselector-container">
      <div className="imageselector-groups">
        {images.map((src, index) => (
          <div
            key={index}
            className="imageselector-group"
            onClick={() => onSelect(index)}
          >
            <Image src={src} alt={`option-${index}`} width={155} height={177} />
          </div>
        ))}
      </div>
    </div>
  );
}