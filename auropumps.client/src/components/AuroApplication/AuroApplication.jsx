import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CategorySidebar from "./CategorySidebar";
import ApplicationContent from "./ApplicationContent";
import applicationData from "./applicationData";
import { useNavigate } from "react-router-dom";

function AuroApplication() {

    const { categoryId, productId } = useParams();

    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        // CASE 1: URL has category + product
        if (categoryId && productId) {

            const category = applicationData.find(
                (cat) => cat.slug === categoryId
            );

            if (category) {

                setActiveCategory(category.id);

                const product = category.products.find(
                    (p) => p.slug === productId
                );

                setSelectedProduct(product || category.products[0]);
            }

        }

        // CASE 2: ONLY /application (no params)
        else if (!categoryId && applicationData.length > 0) {

            const firstCategory = applicationData[0];
            const firstProduct = firstCategory.products?.[0];

            if (firstProduct) {
                navigate(`/application/${firstCategory.slug}/${firstProduct.slug}`, { replace: true });
            }
        }

    }, [categoryId, productId]);

    const selectedCategory = applicationData.find(
        (item) => item.id === activeCategory
    );

    if (!selectedCategory || !selectedProduct) return null;

    return (

        <section className="py-8 sm:py-14 md:py-16 lg:py-20">

            <div className="container mx-auto grid lg:grid-cols-[1.2fr_3fr] gap-5 lg:gap-7 items-start">

                <CategorySidebar
                    categories={applicationData}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                />

                <ApplicationContent
                    product={selectedProduct}
                    products={selectedCategory.products}
                    categoryDescription={selectedCategory?.categoryDescription}
                />

            </div>

        </section>
    );
}

export default AuroApplication;