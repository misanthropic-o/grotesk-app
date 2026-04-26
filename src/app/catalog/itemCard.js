"use client";

import "./ItemCard.css";
import ItemCardMenu from "./itemCardMenu";
import { useState } from "react";
import Link from "next/link";

export default function ItemCard() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="item-card-main">
      <Link href="/item" className="item-card-img">
        <div className={`item-card-menu-wrapper ${showMenu ? "open" : ""}`}>
          <ItemCardMenu />
        </div>
      </Link>
      <div className="item-card-info">
        <div className="item-card-content-top">
          <div className="item-card-brand-text">
            <p className="item-card-item-title">ITEM TITLE</p>
            <p className="item-card-brand-title">BRAND TITLE</p>
          </div>
          <p className="item-card-item-price">$69420.00</p>
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