import { useState, useEffect } from "react";
import { IMAGE_BASE_URL } from "../../poweradmin/api/axios";
function ApplicationContent({ product, products, categoryTitle
    , categoryDescription }) {
    if (!product) return null;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);
    const [isTransitioning, setIsTransitioning] = useState(true);

    //const isSliderActive = products.length > itemsPerView;
    const isSliderActive = (products?.length || 0) > itemsPerView;
    const extendedProducts = isSliderActive
        ? [...products, ...products]
        : products;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 769) {
                setItemsPerView(1);
            } else if (window.innerWidth < 992) {
                setItemsPerView(2);
            } else {
                setItemsPerView(3);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (products.length <= itemsPerView) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => prev + 1);
            setIsTransitioning(true);
        }, 3000);

        return () => clearInterval(interval);
    }, [products, itemsPerView]);

    useEffect(() => {
        if (currentIndex >= products.length) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(0);
            }, 700);
        }
    }, [currentIndex, products.length]);

    return (    
        <>
            <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#2D258E] uppercase mb-3 lg:mb-4">
                    {categoryTitle}
                </h2>

                <div className="relative">
                    <div className="overflow-hidden">
                        <div
                            className={`flex ${isTransitioning
                                    ? "transition-transform duration-700 ease-in-out"
                                    : ""
                                }`}
                            style={{
                                transform: `translateX(-${currentIndex * (100 / itemsPerView)
                                    }%)`,
                            }}
                        >
                            {extendedProducts?.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 px-3"
                                    style={{ width: `${100 / itemsPerView}%` }}
                                >
                                    <div className="bg-white p-2 md:p-3 rounded-lg border border-gray-200 transition-all duration-300 overflow-hidden h-full">

                                        <div className="relative h-[200px] overflow-hidden">
                                            <img
                                                src={`${IMAGE_BASE_URL}${item}`}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {categoryDescription && (
                    <p className="my-3 md:my-5 text-md text-gray leading-relaxed">
                        {categoryDescription}
                    </p>
                )}
                <h2 className="text-xl md:text-2xl font-bold text-primary mb-3 lg:mb-3">
                    Associated Products
                </h2>

                <h3 className="text-xl md:text-xl font-bold text-gray mb-3 lg:mb-3 uppercase">
                    {product.name}
                </h3>

                <div className="bg-[#F4F3FF] p-0 lg:p-4">
                    <p className="mb-3 lg:mb-6 text-md text-gray">
                        {product.firstdescription}
                    </p>
                    <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6 ">

                        <div>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full rounded-xl object-cover" />
                        </div>

                        <div className="relative">
                            {product.pdf && product.pdf !== IMAGE_BASE_URL && (
                                <a
                                    href={product.pdf}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="absolute right-0 top-0 text-primary text-md font-semibold flex items-center gap-1" >
                                    <picture>
                                        <source
                                            srcSet={`${import.meta.env.BASE_URL}/assets/images/download-icon.webp`}
                                            type="image/webp" />
                                        <source
                                            srcSet={`${import.meta.env.BASE_URL}/assets/images/download-icon.png`}
                                            type="image/png" />
                                        <img
                                            src={`${import.meta.env.BASE_URL}/assets/images/download-icon.png`}
                                            alt="Download Icon"
                                            className="w-6 h-6" />
                                    </picture>
                                    DOWNLOAD PDF
                                </a>
                            )}
                            <div className="inline-block uppercase mb-4 px-4 py-1.5 rounded-full border border-primary text-gray text-md font-semibold bg-white">
                                {product.name}
                            </div>

                            <p className="text-gray text-md leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 space-y-1">
                        {product.specifications?.map((spec, index) => (
                            <div
                                key={index}
                                className={`grid grid-cols-1 md:grid-cols-[1.3fr_2fr] 
                     items-center px-2 py-2 lg:px-4 lg:py-3 text-md
                     ${index % 2 === 0
                                        ? "bg-primary text-white"
                                        : "bg-[#F5F4FF] text-gray-700"
                                    }`} >
                                <div className="font-semibold uppercase">
                                    {spec.label}
                                </div>

                                <div className="text-md">
                                    {spec.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
           
        </>
    );
}

export default ApplicationContent;