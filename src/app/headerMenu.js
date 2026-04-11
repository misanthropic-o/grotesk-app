import "./headerMenu.css";
import HeaderMenuCategory from "./headerMenuCategories";

export default function HeaderMenu({ isOpen, isSticky }) {
  return (
    <div className={`header-menu ${isOpen ? "open" : ""} ${isSticky ? "down" : "up"}`}>
      <div className="menu-content"></div>
    </div>
  );
}
