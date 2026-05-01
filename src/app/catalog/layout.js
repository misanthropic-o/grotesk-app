import PageHeader from "../mainPage/PageHeader";
import Breadcrumbs from "../breadcrumbs";

export default function CatalogLayout({ children }) {
  return (
    <>
      <div style={{ position: "relative", zIndex: 1000 }} className="catalog-top-section">
        <PageHeader />
        <Breadcrumbs />
      </div>
      {children}
    </>
  );
}