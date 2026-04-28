"use client";

import "./ItemCard.css";
import ItemCardMenu from "./itemCardMenu";
import { useState } from "react";
import Link from "next/link";

export default function ItemCard() {
  const [showMenu, setShowMenu] = useState(false);
  const [confirmClick, setConfirmClick] = useState(false);

  const handleClick = () => {
    if (confirmClick) {
      return true;
    }
    setConfirmClick(true);
    setTimeout(() => setConfirmClick(false), 2000);
  };

  return (
    <div className="item-card-main">
      <div className="item-card-img">
        <div className={`item-card-menu-wrapper ${showMenu ? "open" : ""}`}>
          <ItemCardMenu />
        </div>
      </div>
      <div className="item-card-info">
        <div className="item-card-content-top">
          <Link href={confirmClick ? "/item" : "#"} onClick={(e) => { if (!confirmClick) { e.preventDefault(); handleClick(); } }} className="item-card-link-area">
            <div className="item-card-brand-text">
              <p className="item-card-item-title">{confirmClick ? "CLICK AGAIN" : "ITEM TITLE"}</p>
              <p className="item-card-brand-title">BRAND TITLE</p>
            </div>
            <p className="item-card-item-price">$69420.00</p>
          </Link>
        </div>
        <div className="item-card-content-bottom">
          <button>
            <span>+</span> ADD TO CART
          </button>
          <button onClick={() => setShowMenu(!showMenu)}>
            QUICK BUY <span>{showMenu ? "−" : "+"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}