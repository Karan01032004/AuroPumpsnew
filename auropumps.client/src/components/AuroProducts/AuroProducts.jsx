import { useState } from "react";
import productData from "./productData";
import ProductSidebar from "./ProductSidebar";
import ProductContent from "./ProductContent";
import ProductAccordion from "./ProductAccordion";
function AuroProducts() {

    const [activeCategory, setActiveCategory] = useState(productData[0].id);

    const selectedCategory = productData.find(
        (item) => item.id === activeCategory
    );

    return (
        <section className="py-8 sm:py-14 md:py-16 lg:py-100">
            <div className="container mx-auto grid lg:grid-cols-[1.2fr_3fr] gap-0 md:gap-5 lg:gap-7">

                <ProductSidebar
                    categories={productData}
                    active={activeCategory}
                    setActive={setActiveCategory}
                />

                {selectedCategory.products.length > 1 ? (
                    <ProductAccordion products={selectedCategory.products} />
                ) : (
                    <ProductContent product={selectedCategory.products[0]} />
                )}

            </div>
        </section>
    );
}

export default AuroProducts;