import { useState, useEffect } from "react";
import { IMAGE_BASE_URL } from "../../poweradmin/api/axios";
import { FiDownload } from "react-icons/fi";
import api from "../../poweradmin/api/axios";
import { toast } from "react-hot-toast";
import FAQ from "../FAQ/FAQ";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

import "swiper/css";
function ApplicationContent({
    applicationProducts = [],
    products = [],
    categoryTitle,
    categoryDescription,
    faqs = []
}) {
    // ================= STATES =================
    const [pdfFormData, setPdfFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        companyname: "" // ?? Handled Form Key
    });
    const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
    const [selectedProductForPdf, setSelectedProductForPdf] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);
    const [isTransitioning, setIsTransitioning] = useState(true);

    const galleryItems = Array.isArray(products) ? products : [];
    const navigate = useNavigate();

    // ================= HANDLERS =================
    //const handleDownloadClick = (productItem) => {
    //    if (!productItem) return;

    //    // ? LOGIC: Agar product isFeatured true hai toh modal form open karo
    //    if (productItem.isFeatured) {
    //        setSelectedProductForPdf(productItem);
    //        setIsPdfModalOpen(true);
    //    } else {
    //        // Direct download if not featured
    //        const directPdfUrl = productItem.pdf ? `${productItem.pdf}` : "";
    //        if (directPdfUrl) {
    //            window.open(directPdfUrl, "_blank");
    //        } else {
    //            toast.error("PDF path not found!");
    //        }
    //    }
    //};
    const handleDownloadClick = (productItem) => {
        if (!productItem) return;

        // Ab Featured ho ya na ho, form hamesha khulega
        setSelectedProductForPdf(productItem);
        setIsPdfModalOpen(true);
    };

    const closePdfModal = () => {
        setIsPdfModalOpen(false);
        setSelectedProductForPdf(null);
    };

    const handlePdfFormChange = (event) => {
        const { name, value } = event.target;
        setPdfFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ?? ?? DYNAMIC FORM SUBMIT LOGIC ?? ??
    const handlePdfSubmit = async (event) => {
        event.preventDefault();

        if (!pdfFormData.name.trim() || !pdfFormData.email.trim() || !pdfFormData.phone.trim() || !pdfFormData.companyname.trim()) {
            toast.error("Please fill all required fields");
            return;
        }

        try {
            // Loader/Toast notification trigger
            toast.success("PDF request submitted! It will be sent to your email.");
            setIsPdfModalOpen(false);

            // Backend API hits with complete payload mapping
            await api.post("/product/send-pdf", {
                name: pdfFormData.name,
                email: pdfFormData.email,
                phone: pdfFormData.phone,
                message: pdfFormData.message,
                companyname: pdfFormData.companyname,
                productId: selectedProductForPdf?.id // Trailing referenced product ID
            });

            // Form states reset logic
            setPdfFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
                companyname: ""
            });
            setSelectedProductForPdf(null);

        } catch (err) {
            console.error("PDF Submission Error: ", err);
            toast.error("Something went wrong, please try again!");
        }
    };

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

    return (
        <div className="space-y-10">
            <div className="flex justify-end mb-5">
                <button
                    onClick={() => navigate("/industrial-pump-applications")}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-5 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-primary transition-all duration-300 hover:border-primary hover:bg-primary/5"
                >
                    <IoArrowBack className="text-sm" />
                    Back
                </button>
            </div>
            {/* MAIN CATEGORY JUMBOTRON CARD */}
            <section className="rounded-[28px] border border-slate-200 bg-white shadow-[0_25px_60px_-40px_rgba(15,23,42,0.35)]">
               
                <div className="border-b border-slate-200 bg-gradient-to-r from-[#F5F3FF] via-white to-[#EEF4FF] px-5 py-8 sm:px-7 lg:px-10 lg:py-10 rounded-[28px]">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.8fr)] lg:items-start">
                        <div>
                            <span className="inline-flex rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                                Application Area
                            </span>

                            <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                                {categoryTitle}
                            </h2>

                            {categoryDescription && (
                                <div
                                    className="mt-4 max-w-4xl text-sm leading-relaxed text-gray md:text-base prose prose-slate"
                                    dangerouslySetInnerHTML={{ __html: categoryDescription }}
                                />
                            )}
                            <FAQ faqs={faqs} />
                        </div>

                        {galleryItems?.length > 0 && (
                            <div className="mx-auto w-full max-w-[420px] lg:sticky lg:top-24 lg:self-start">
                                <div className="overflow-hidden rounded-[24px] border border-white/70 bg-white/90 p-4 shadow-[0_20px_50px_-35px_rgba(45,37,142,0.45)]">
                                    <div className="overflow-hidden rounded-[20px] bg-gradient-to-br from-[#FFF8E8] via-white to-[#F3F1FF]">

                                        <Swiper
                                            modules={[Autoplay]}
                                            loop={galleryItems.length > 1}
                                            speed={1000}
                                            spaceBetween={24}
                                            autoplay={{
                                                delay: 4000,
                                                disableOnInteraction: false,
                                                pauseOnMouseEnter: true,
                                            }}
                                        >
                                            {galleryItems.map((item, index) => (
                                                <SwiperSlide key={index}>
                                                    <img
                                                        src={`${IMAGE_BASE_URL}${item}`}
                                                        alt={`${categoryTitle} ${index + 1}`}
                                                        className="w-full h-auto object-contain"
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ASSOCIATED PRODUCTS NAVIGATION BLOCKS */}
            <section>
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-[11px] tracking-[0.22em] font-semibold text-primary uppercase">
                            Associated Product
                        </span>
                    </div>

                    <div className="mt-7">
                        {/* Mobile Dropdown */}
                        <div className="block md:hidden">
                            <select
                                className="w-full rounded-lg border border-primary/20 bg-white px-4 py-3 text-sm font-medium text-primary"
                                onChange={(e) => {
                                    if (e.target.value) {
                                        document.querySelector(e.target.value)?.scrollIntoView({
                                            behavior: "smooth"
                                        });
                                    }
                                }}
                                defaultValue=""
                            >
                                <option value="" disabled>Select a product...</option>
                                {applicationProducts.map(product => (
                                    <option key={product.id} value={`#product-${product.slug}`}>
                                        {product.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Desktop Tags Nav */}
                        <div className="hidden md:flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                            {applicationProducts.map(product => (
                                <a
                                    key={product.id}
                                    href={`#product-${product.slug}`}
                                    className="rounded-full border border-primary/20 bg-white px-4 py-2 text-[11px] font-semibold tracking-[0.1em] text-primary uppercase hover:bg-slate-50 transition"
                                >
                                    {product.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* PRODUCT MAP PIPELINE */}
            {applicationProducts.map(product => {
                const isVideoProduct = product.image?.toLowerCase().endsWith(".mp4");

                return (
                    <section
                        key={product.id}
                        id={`product-${product.slug}`}
                        className="scroll-mt-40 rounded-xl border border-slate-200 bg-[#F7F5FF] shadow-[0_25px_60px_-40px_rgba(45,37,142,0.4)]"
                    >
                        <div className="border-b rounded-t-xl border-primary/10 bg-white px-5 py-7 sm:px-7 lg:px-10">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
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

                                {/* Download Action Button Trigger */}
                                {product.pdf && (
                                    <button
                                        type="button"
                                        onClick={() => handleDownloadClick(product)}
                                        className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:opacity-90 shadow-sm cursor-pointer"
                                    >
                                        <FiDownload className="h-4 w-4" />
                                        Download PDF
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="px-5 py-6 sm:px-7 lg:px-10 lg:py-8">
                            <div className="grid gap-8 xl:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.3fr)] xl:items-start">
                                <div className="xl:sticky xl:self-start" style={{ top: '6rem' }}>
                                    <div className={isVideoProduct ? "" : "rounded-xl border border-slate-200 bg-white shadow-sm"}>
                                        <div className={isVideoProduct ? "p-0" : "bg-gradient-to-br from-white via-[#F7F5FF] to-[#EEF4FF] p-4 rounded-[20px] min-h-[300px] flex items-center justify-center"}>
                                            {isVideoProduct ? (
                                                <video
                                                    src={product.image}
                                                    className="block h-full max-h-[520px] w-full bg-white object-contain rounded-xl border border-slate-200 shadow-sm"
                                                     autoPlay muted loop playsInline
                                                />
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

                                {/* SPECIFICATIONS PANEL CARD */}
                                {/* SPECIFICATIONS PANEL CARD */}
                                <div className="space-y-6">
                                    {product.specifications?.length > 0 ? (
                                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                                            <div className="border-b border-slate-200 px-6 py-4">
                                                <h4 className="text-lg font-bold uppercase tracking-[0.08em] text-slate-900">
                                                    Technical Specifications
                                                </h4>
                                            </div>

                                            <div className="divide-y divide-slate-200">
                                                {product.specifications.map((spec, index) => {
                                                    const isDetailsRow = spec.label === "Details";

                                                    return (
                                                        <div
                                                            key={`${spec.label}-${index}`}
                                                            className={`grid gap-2 px-6 py-4 ${isDetailsRow
                                                                    ? "grid-cols-1"
                                                                    : "md:grid-cols-[220px_minmax(0,1fr)]"
                                                                } ${index % 2 === 0
                                                                    ? "bg-white"
                                                                    : "bg-slate-50"
                                                                }`}
                                                        >
                                                            {!isDetailsRow && (
                                                                <div className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
                                                                    {spec.label}
                                                                </div>
                                                            )}

                                                            <div className="text-sm leading-7 text-slate-700 sm:text-base">
                                                                {spec.value}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="rounded-xl border border-primary/15 bg-white p-6 text-center shadow-sm">
                                            <h4 className="text-lg font-bold text-slate-900">
                                                    Please contact us for detailed information about this product.
                                            </h4>

                                       

                                            <a
                                                href="https://www.auropumps.com/contact-us"
                                         
                                                rel="noopener noreferrer"
                                                className="mt-5 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:opacity-90"
                                            >
                                                Contact for Product Details
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                );
            })}

            {/* MODAL POPUP GATEWAY */}
            {isPdfModalOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-start justify-between gap-4 border-b border-primary/10 px-5 py-4 sm:px-6">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">
                                    Contact us for more details
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    Fill in your details to continue downloading.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={closePdfModal}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-primary hover:text-primary cursor-pointer"
                            >
                                x
                            </button>
                        </div>

                        <form onSubmit={handlePdfSubmit} className="space-y-4 px-5 py-5 sm:px-6 sm:py-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-slate-700">Name <span className="text-red-600">*</span></label>
                                    <input type="text" name="name" maxLength="50" value={pdfFormData.name} onChange={handlePdfFormChange} placeholder="Enter your name" required className="w-full rounded-sm border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary" />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-slate-700">Email ID <span className="text-red-600">*</span></label>
                                    <input type="email" name="email" value={pdfFormData.email} onChange={handlePdfFormChange} placeholder="Enter your email" required className="w-full rounded-sm border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary" />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-slate-700">Product Name</label>
                                    <input type="text" value={selectedProductForPdf?.name || ""} disabled className="w-full cursor-not-allowed rounded-sm border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500 outline-none" />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-slate-700">Phone No <span className="text-red-600">*</span></label>
                                    <input type="tel" name="phone" value={pdfFormData.phone} onChange={handlePdfFormChange} placeholder="Enter your phone number" required className="w-full rounded-sm border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary" />
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-semibold text-slate-700">Company Name <span className="text-red-600">*</span></label>
                                <input type="text" name="companyname" value={pdfFormData.companyname} onChange={handlePdfFormChange} placeholder="Enter your company name" required className="w-full rounded-sm border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary" />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-semibold text-slate-700">Message</label>
                                <textarea name="message" value={pdfFormData.message} onChange={handlePdfFormChange} placeholder="Enter your message" rows="4" className="w-full rounded-sm border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary" />
                            </div>
                            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                                <button type="button" onClick={closePdfModal} className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary cursor-pointer">Cancel</button>
                                <button type="submit" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:opacity-90 cursor-pointer">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ApplicationContent;