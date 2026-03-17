import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productData from "./productData";
import ProductSidebar from "./ProductSidebar";
import ProductContent from "./ProductContent";

function AuroProducts() {

    const { categorySlug, productSlug } = useParams();

    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {

        if (!categorySlug || !productSlug) return;

        const category = productData.find(
            (cat) => cat.slug === categorySlug
        );

        if (!category) return;

        const product = category.products.find(
            (p) => p.slug === productSlug
        );

        if (!product) return;

        setActiveCategory(category.id);
        setSelectedProduct(product);

    }, [categorySlug, productSlug]);

    useEffect(() => {

        if (!activeCategory && productData.length > 0) {

            const firstCategory = productData[0];
            const firstProduct = firstCategory.products[0];

            setActiveCategory(firstCategory.id);
            setSelectedProduct(firstProduct);
        }

    }, []);

    const selectedCategory = productData.find(
        (cat) => cat.id === activeCategory
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

                <ProductContent
                    product={selectedProduct}
                    categoryTitle={selectedCategory?.title}
                />

            </div>

        </section>
    );
}

export default AuroProducts;