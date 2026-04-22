import { useState, useEffect } from "react";
import { IMAGE_BASE_URL } from "../../poweradmin/api/axios";
import { FiDownload } from "react-icons/fi";

function ApplicationContent({
    product,
    products = [],
    categoryTitle,
    categoryDescription,
}) {
    if (!product) return null;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);
    const [isTransitioning, setIsTransitioning] = useState(true);

    const galleryItems = Array.isArray(products) ? products : [];
    const isSliderActive = galleryItems.length > itemsPerView;
    const extendedProducts = isSliderActive
        ? [...galleryItems, ...galleryItems]
        : galleryItems;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerView(1);
            } else if (window.innerWidth < 1100) {
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
        if (galleryItems.length <= itemsPerView) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => prev + 1);
            setIsTransitioning(true);
        }, 3200);

        return () => clearInterval(interval);
    }, [galleryItems.length, itemsPerView]);

    useEffect(() => {
        if (currentIndex >= galleryItems.length && galleryItems.length > 0) {
            const timeout = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(0);
            }, 700);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, galleryItems.length]);

    useEffect(() => {
        if (!isTransitioning) {
            const reset = requestAnimationFrame(() => {
                setIsTransitioning(true);
            });

            return () => cancelAnimationFrame(reset);
        }
    }, [isTransitioning]);

    return (
        <div className="space-y-10">
            <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_25px_60px_-40px_rgba(15,23,42,0.35)]">
                <div className="border-b border-slate-200 bg-gradient-to-r from-[#F5F3FF] via-white to-[#EEF4FF] px-5 py-8 sm:px-7 lg:px-10 lg:py-10">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.8fr)] lg:items-center">
                        <div>
                            <span className="inline-flex rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                                Application Area
                            </span>

                            <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                                {categoryTitle}
                            </h2>

                            {categoryDescription && (
                                <p className="mt-4 max-w-4xl text-sm leading-relaxed text-gray md:text-base">
                                    {categoryDescription}
                                </p>
                            )}
                        </div>

                        {galleryItems[0] && (
                            <div className="mx-auto w-full max-w-[420px]">
                                <div className="overflow-hidden rounded-[24px] border border-white/70 bg-white/90 p-4 shadow-[0_20px_50px_-35px_rgba(45,37,142,0.45)]">
                                    <div className="overflow-hidden rounded-[20px] bg-gradient-to-br from-[#FFF8E8] via-white to-[#F3F1FF]">
                                        <img
                                            src={`${IMAGE_BASE_URL}${galleryItems[0]}`}
                                            alt={categoryTitle}
                                            className="h-[260px] w-full object-cover sm:h-[300px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/*{extendedProducts.length > 0 && (*/}
                {/*    <div className="px-4 py-5 sm:px-6 lg:px-8 lg:py-7">*/}
                {/*        <div className="overflow-hidden rounded-[24px] bg-slate-50 p-2 sm:p-3">*/}
                {/*            <div*/}
                {/*                className={`flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}*/}
                {/*                style={{*/}
                {/*                    transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,*/}
                {/*                }}*/}
                {/*            >*/}
                {/*                {extendedProducts.map((item, index) => (*/}
                {/*                    <div*/}
                {/*                        key={`${item}-${index}`}*/}
                {/*                        className="flex-shrink-0 p-2"*/}
                {/*                        style={{ width: `${100 / itemsPerView}%` }}*/}
                {/*                    >*/}
                {/*                        <div className="group h-full overflow-hidden rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">*/}
                {/*                            <div className="flex h-[220px] items-center justify-center overflow-hidden rounded-[18px] bg-gradient-to-br from-[#FFF8E8] via-white to-[#F3F1FF]">*/}
                {/*                                <img*/}
                {/*                                    src={`${IMAGE_BASE_URL}${item}`}*/}
                {/*                                    alt={categoryTitle}*/}
                {/*                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"*/}
                {/*                                />*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                ))}*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}
            </section>

            <section className="rounded-xl border border-slate-200 bg-[#F7F5FF] shadow-[0_25px_60px_-40px_rgba(45,37,142,0.4)]">
                <div className="border-b rounded-xl border-primary/10 bg-white px-5 py-7 sm:px-7 lg:px-10">
                    <span className="inline-flex rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                        Associated Product
                    </span>

                    <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <h3 className="text-3xl font-bold uppercase tracking-tight text-slate-900">
                                {product.name}
                            </h3>
                            {product.firstdescription && (
                                <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                                    {product.firstdescription}
                                </p>
                            )}
                        </div>

                        {product.pdf && product.pdf !== IMAGE_BASE_URL && (
                            <a
                                href={product.pdf}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:opacity-90"
                            >
                                <FiDownload className="h-4 w-4" />
                                Download PDF
                            </a>
                        )}
                    </div>
                </div>

                <div className="px-5 py-6 sm:px-7 lg:px-10 lg:py-8">
                    <div className="grid gap-8 xl:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.3fr)]">
                        <div className="xl:sticky xl:top-28 xl:self-start">
                            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                                <div className="flex min-h-[320px] items-center justify-center rounded-[20px] bg-gradient-to-br from-white via-[#F7F5FF] to-[#EEF4FF] p-4">
                                    {product.image && product.image.toLowerCase().endsWith(".mp4") ? (
                                        <video
                                            src={product.image}
                                            className="w-full object-contain max-h-[520px]"
                                            controls
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full object-contain max-h-[520px]"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-xl border border-white/70 bg-white p-6 shadow-sm">
                                <div className="inline-flex rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                                    {product.name}
                                </div>

                                <p className="mt-5 text-base leading-8 text-slate-600" dangerouslySetInnerHTML={{ __html: product.description }}>
                                   
                                </p>
                            </div>

                            {product.specifications?.length > 0 && (
                                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                                    <div className="border-b border-slate-200 px-6 py-4">
                                        <h4 className="text-lg font-bold uppercase tracking-[0.08em] text-slate-900">
                                            Technical Specifications
                                        </h4>
                                    </div>

                                    <div className="divide-y divide-slate-200">
                                        {product.specifications.map((spec, index) => (
                                            <div
                                                key={`${spec.label}-${index}`}
                                                className={`grid gap-2 px-6 py-4 md:grid-cols-[220px_minmax(0,1fr)] ${index % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
                                            >
                                                <div className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
                                                    {spec.label}
                                                </div>
                                                <div className="text-sm leading-7 text-slate-700 sm:text-base">
                                                    {spec.value}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ApplicationContent;
