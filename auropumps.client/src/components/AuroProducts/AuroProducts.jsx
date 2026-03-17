import { useState } from "react";
import productData from "./productData";
import ProductSidebar from "./ProductSidebar";
import ProductContent from "./ProductContent";

function AuroProducts() {

    const [activeCategory, setActiveCategory] = useState(productData[0].id);
    const [selectedProduct, setSelectedProduct] = useState(
        productData[0].products[0]
    );

    return (
        <section className="py-8 sm:py-14 md:py-16 lg:py-20">

            <div className="container mx-auto grid lg:grid-cols-[1.2fr_3fr] gap-5 lg:gap-7 items-start">

                <ProductSidebar
                    categories={productData}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                />

                <ProductContent product={selectedProduct} />

            </div>

        </section>
    );
}

export default AuroProducts;