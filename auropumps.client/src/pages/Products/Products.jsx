import BannerSection from "../../components/BannerSection/BannerSection";
import AuroProducts from "../../components/AuroProducts/AuroProducts";
import AllProductsCatalog from "../../components/AllProductsCatalog/AllProductsCatalog";
import { useParams } from "react-router-dom";

function Products() {
    const { categorySlug, productSlug } = useParams();

    const isDetailView =
        categorySlug !== undefined &&
        productSlug !== undefined;

  return (
      <>
          <BannerSection title={isDetailView ? "Product Details" : "All Products"} />
          {isDetailView ? <AuroProducts /> : <AllProductsCatalog />}

      </>
  );
}

export default Products;
