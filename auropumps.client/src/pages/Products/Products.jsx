import BannerSection from "../../components/BannerSection/BannerSection";
import AuroProducts from "../../components/AuroProducts/AuroProducts";
import AllProductsCatalog from "../../components/AllProductsCatalog/AllProductsCatalog";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function Products() {
    const { categorySlug, productSlug } = useParams();

    const isDetailView =
        categorySlug !== undefined &&
        productSlug !== undefined;

    return (
        <>
            {!isDetailView && (
                <Helmet>
                    <title>
                        Metal & Molten Salt Pump Manufacturers in India
                    </title>

                    <meta
                        name="description"
                        content="Auro Pumps is a leading metal, molten salt & process pumps manufacturer in India, offering vertical, horizontal, magnetic drive & self-priming pump ranges."
                    />

                    <meta
                        name="keywords"
                        content="molten salt pumps manufacturers, molten zinc pump manufacturers, molten lead pump manufacturers, magnetic drive pumps manufacturers, vertical submerged pumps manufacturers, cantilever pumps manufacturers, pump manufacturers India, horizontal and vertical process pump manufacturer India, high temperature molten metal pump manufacturer"
                    />

                    <link
                        rel="canonical"
                        href="https://auropumps.com/metal-pumps-manufacturer-india"
                    />
                </Helmet>
            )}

            <BannerSection
                title={isDetailView ? "Product Details" : "All Products"}
            />

            {isDetailView ? (
                <AuroProducts />
            ) : (
                <AllProductsCatalog />
            )}
        </>
    );
}

export default Products;