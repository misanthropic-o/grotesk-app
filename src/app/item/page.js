import "./itempage.css";
import PageHeader from "../mainPage/PageHeader";
import Breadcrumbs from "../breadcrumbs";
import ItemPageHorizontal from "./itempagehorizontal";

export default function ItemPage() {
  return (
    <>
      <PageHeader />
      <Breadcrumbs />
      <div className="item-page-content">
        <ItemPageHorizontal />
      </div>
    </>
  );
}
