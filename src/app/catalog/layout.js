import PageHeader from "../mainPage/PageHeader";
import Breadcrumbs from "../breadcrumbs";

export default function CatalogLayout({ children }) {
  return (
    <>
      <PageHeader />
      <Breadcrumbs />
      {children}
    </>
  );
}