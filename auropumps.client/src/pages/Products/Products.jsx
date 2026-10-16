import BannerSection from "../../components/BannerSection/BannerSection";
import AuroProducts from "../../components/AuroProducts/AuroProducts";
import AllProductsCatalog from "../../components/AllProductsCatalog/AllProductsCatalog";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { applySeo } from "../../utils/seoHead";

const PRODUCTS_SEO = {
    title: "Metal & Molten Salt Pump Manufacturers in India",
    description:
        "Auro Pumps is a leading metal, molten salt & process pumps manufacturer in India, offering vertical, horizontal, magnetic drive & self-priming pump ranges.",
    keywords:
        "molten salt pumps manufacturers, molten zinc pump manufacturers, molten lead pump manufacturers, magnetic drive pumps manufacturers, vertical submerged pumps manufacturers, cantilever pumps manufacturers, pump manufacturers India, horizontal and vertical process pump manufacturer India, high temperature molten metal pump manufacturer",
    canonical: "https://auropumps.com/metal-pumps-manufacturer-india",
};

function Products() {
    const { categorySlug, productSlug } = useParams();

    const isDetailView =
        categorySlug !== undefined &&
        productSlug !== undefined;

    useEffect(() => {
        // Detail view ka SEO ProductContent khud set karta hai
        if (!isDetailView) {
            applySeo(PRODUCTS_SEO);
        }
    }, [isDetailView]);

    return (
        <>
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