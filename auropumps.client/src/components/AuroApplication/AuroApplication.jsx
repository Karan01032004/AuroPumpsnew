import { useState } from "react";
import CategorySidebar from "./CategorySidebar";
import ApplicationContent from "./ApplicationContent";
import applicationData from "./applicationData";
import ApplicationAccordion from "./ApplicationAccordion";
function AuroApplication() {
    const [activeCategory, setActiveCategory] = useState(
        applicationData[0].id
    );

    const selectedCategory = applicationData.find(
        (item) => item.id === activeCategory
    );

    return (
        <section className="w-full py-8 sm:py-14 md:py-16 lg:py-100">
            <div className="container mx-auto grid md:grid-cols-[1.2fr_3fr] gap-0 md:gap-5 lg:gap-7">

                {/* Sidebar */}
                <div>
                    <CategorySidebar
                        categories={applicationData}
                        active={activeCategory}
                        setActive={setActiveCategory}
                    />
                </div>

                

                <div className="space-y-10 md:space-y-16 lg:space-y-20">
                    <h2 className="text-3xl font-bold text-[#2D258E] mb-3 lg:mb-6">
                        Associated Products
                    </h2>
                    {selectedCategory.products.length > 1 ? (
                        <ApplicationAccordion products={selectedCategory.products} />
                    ) : (
                        <ApplicationContent product={selectedCategory.products[0]} />
                    )}
                </div>

            </div>
        </section>
    );
}

export default AuroApplication;