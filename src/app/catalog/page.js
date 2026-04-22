import SearchBar from "../SearchBar";
import SearchBarComponent from "../SearchBarComponent";
import "./page.css";

export default function Catalog() {
  return (
    <>
      <section className="catalog-seciton">
        <div className="catalog-searchfilter">
          <SearchBarComponent />
        </div>
      </section>
    </>
  );
}
