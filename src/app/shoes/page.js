import "./shoes.css";
import PageHeader from "../mainPage/PageHeader";
import Breadcrumbs from "../breadcrumbs";
import ShoeViewer from "./ShoeViewer";

export default function ShoesPage() {
  return (
    <>
      <PageHeader />
      <Breadcrumbs />
      <div className="shoes-page-content">
        <ShoeViewer />
      </div>
    </>
  );
}
