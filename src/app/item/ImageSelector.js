"use client";

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
            <img src={src} alt={`option-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}