import "./pageHeader.css";

export default function PageHeaderMenuCategory({ title, items }) {
  return (
    <div className="page-header-menu-category">
      <a className="page-header-menu-category-title">{title}</a>
      <div className="page-header-menu-category-btns">
        {items.map((item, i) => (
          <a key={i} className="page-header-menu-category-btn">
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}