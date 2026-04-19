"use client";

import { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearchClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
    if (onSearchClick) {
      onSearchClick(!isOpen);
    }
  };

  return (
    <div className="search-wrapper">
      <a className="search-trigger" onClick={handleTriggerClick}>
        <svg
          className="header-icn"
          width="14"
          height="14"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.83333 7.83333L11.5 11.5M4.77778 9.05556C2.41523 9.05556 0.5 7.14033 0.5 4.77778C0.5 2.41523 2.41523 0.5 4.77778 0.5C7.14033 0.5 9.05556 2.41523 9.05556 4.77778C9.05556 7.14033 7.14033 9.05556 4.77778 9.05556Z"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
      <div className={`search-bar ${isOpen ? "open" : ""}`}>
        <svg
          className="searchIcn"
          width="7"
          height="7"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.83333 7.83333L11.5 11.5M4.77778 9.05556C2.41523 9.05556 0.5 7.14033 0.5 4.77778C0.5 2.41523 2.41523 0.5 4.77778 0.5C7.14033 0.5 9.05556 2.41523 9.05556 4.77778C9.05556 7.14033 7.14033 9.05556 4.77778 9.05556Z"
            fill="#101010"
            stroke="#101010"
            strokeWidth="0.5"
          />
        </svg>
        <span className="search-divider"></span>
        <span className="search-text">SEARCH...</span>
      </div>
    </div>
  );
}