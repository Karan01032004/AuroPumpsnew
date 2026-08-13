import { useState } from "react";
import { IMAGE_BASE_URL } from "../../poweradmin/api/axios";
import { FiDownload } from "react-icons/fi";
import api from "../../poweradmin/api/axios";
import { toast } from "react-hot-toast";

import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
function ProductContent({ product, categoryTitle }) {

   
    const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
    const [pdfFormData, setPdfFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    if (!product) return null;

    const applications =
        product.applicationtags
            ?.split(",")
            .map(tag => tag.trim())
            .filter(tag => tag !== "") || [];

    const specifications = (product.specifications || []).filter(
        (spec) => spec?.value && String(spec.value).trim() !== ""
    );

    

    const closePdfModal = () => {
        setIsPdfModalOpen(false);
    };

    const handlePdfFormChange = (event) => {
        const { name, value } = event.target;
        setPdfFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
 

    //const handleDownloadClick = () => {
    //    if (product.isFeatured) {
    //        setIsPdfModalOpen(true); // form open
    //    } else {
    //        if (pdfUrl) {
    //            window.open(pdfUrl, "_blank");
    //        }
    //    }
    //};
    const handleDownloadClick = () => {
        
        setIsPdfModalOpen(true);
    };
    const handlePdfSubmit = async (event) => {
        event.preventDefault();

        try {

            toast.success("PDF will be sent to your email!");

            setIsPdfModalOpen(false);
            setPdfFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
                companyname: ""
            });
            const res = await api.post("/product/send-pdf", {
                ...pdfFormData,
                productId: product.id
            });



        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    return (
        <>

            <div className="flex justify-end mb-5">
                <Link
                    to="/metal-pumps-manufacturer-india"
                    replace
                    className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-5 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-primary transition-all duration-300 hover:border-primary hover:bg-primary/5"
                >
                    <IoArrowBack className="text-sm" />
                    Back
                </Link>
            </div>
            <div className="rounded-2xl border border-primary/10 bg-gradient-to-b from-white to-[#f7f6ff] p-4 shadow-[0_14px_34px_rgba(45,37,142,0.09)] lg:p-6">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-primary/10 pb-4">

                    <h2 className="mt-1 text-xl font-bold text-slate-900 md:text-2xl">
                        {product.name}
                    </h2>

                    <div>
                        <span className="inline-flex rounded-full border border-primary/30 bg-white px-4 py-1.5 text-xs font-semibold tracking-[0.08em] text-primary uppercase">
                            {categoryTitle}
                        </span>
                    </div>
                </div>
                <div className="space-y-6">

                    <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-primary/10 bg-white p-3">

                        {/* Download Button */}
                        {product.pdf && (
                            <button
                                type="button"
                                onClick={handleDownloadClick}
                                className="absolute top-5 right-5 z-20 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-primary backdrop-blur-md shadow-md transition hover:bg-primary hover:text-white"
                            >
                                <FiDownload className="h-4 w-4" />
                                Download PDF
                            </button>
                        )}

                        <div className="flex items-center justify-center h-[355px] bg-white rounded-xl">
                            {product.image &&
                                product.image.toLowerCase().endsWith(".mp4") ? (
                                <video
                                    src={`${IMAGE_BASE_URL}${product.image}`}
                                    className="max-h-full max-w-full object-contain"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                />
                            ) : (
                                <img
                                    src={`${IMAGE_BASE_URL}${product.image}`}
                                    alt={product.name}
                                    className="max-h-full max-w-full object-contain"
                                />
                            )}
                        </div>

                    </div>

                    {/* Description */}
                    <div
                        className="prose prose-sm max-w-none text-sm leading-relaxed text-gray md:text-base"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                </div>
                <div className="clear-both"></div>
                {specifications.length > 0 && (
                    <div className="mt-7">
                        <h3 className="mb-3 text-lg font-bold text-primary md:text-xl">
                            Technical Specifications
                        </h3>

                        <div className="overflow-hidden rounded-xl border border-primary/10">
                            {specifications.map((spec, index) => (
                                <div
                                    key={index}
                                    className={`grid items-start gap-2 px-4 py-3 lg:px-5 ${spec.label
                                        ? "grid-cols-1 md:grid-cols-[1.1fr_1.9fr] md:items-center"
                                        : "grid-cols-1"
                                        } ${index % 2 === 0 ? "bg-primary text-white" : "bg-[#f3f1ff] text-gray-700"
                                        }`}
                                >
                                    {spec.label && (
                                        <div className="text-sm font-semibold uppercase tracking-wide md:text-base">
                                            {spec.label}
                                        </div>
                                    )}
                                    <div className={`text-sm leading-relaxed md:text-base ${!spec.label ? "col-span-full" : ""}`}>
                                        {spec.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {applications.length > 0 && (
                    <div className="mt-7">
                        <h3 className="mb-3 text-lg font-bold text-primary md:text-xl">
                            Applications
                        </h3>

                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {applications.map((item, index) => (
                                <div
                                    key={index}
                                    className="group flex min-h-[90px] items-center justify-center rounded-xl border border-primary/20 bg-white p-4 text-center shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
                                >
                                    <p className="text-[14px] font-medium leading-5 tracking-tight text-primary transition-all duration-300 group-hover:tracking-normal">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>

                {isPdfModalOpen && (
                    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                        <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl">
                            <div className="flex items-start justify-between gap-4 border-b border-primary/10 px-5 py-4 sm:px-6">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">
                                        Contact us for more  details
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Fill in your details to continue.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={closePdfModal}
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-primary hover:text-primary"
                                    aria-label="Close modal"
                                >
                                    x
                                </button>
                            </div>

                            <form onSubmit={handlePdfSubmit} className="space-y-4 px-5 py-5 sm:px-6 sm:py-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-slate-700">
                                            Name <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"

                                            maxLength="50"
                                            value={pdfFormData.name}
                                            onChange={handlePdfFormChange}
                                            onKeyPress={(e) => {
                                                if (!/[a-zA-Z\s]/.test(e.key)) {
                                                    e.preventDefault();
                                                }
                                            }}
                                            placeholder="Enter your name"
                                            required
                                            className="w-full rounded-sm border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-slate-700">
                                            Email ID <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={pdfFormData.email}
                                            onChange={handlePdfFormChange}
                                            placeholder="Enter your email"
                                            required
                                            className="w-full rounded-sm border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary"
                                        />
                                        {/*<p className="mt-2 text-xs text-slate-500">*/}
                                        {/*    *You'll get the details at the email you provide here. */}
                                        {/*</p>*/}
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-slate-700">
                                            Product Name
                                        </label>
                                        <input
                                            type="text"
                                            value={product.name}
                                            disabled
                                            className="w-full cursor-not-allowed rounded-sm border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500 outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-slate-700">
                                            Phone No <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={pdfFormData.phone}
                                            onChange={handlePdfFormChange}
                                            onKeyPress={(e) => {
                                                if (!/[0-9]/.test(e.key)) {
                                                    e.preventDefault();
                                                }
                                            }}

                                            onInput={(e) => {
                                                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 15);
                                            }}

                                            placeholder="Enter your phone number"
                                            required
                                            className="w-full rounded-sm border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-slate-700">
                                        Company Name <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="companyname"
                                        value={pdfFormData.companyname}
                                        onChange={handlePdfFormChange}
                                        onKeyPress={(e) => {
                                            if (!/[a-zA-Z\s]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        maxLength="30"
                                        placeholder="Enter your company name"

                                        className="w-full rounded-sm border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-slate-700">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={pdfFormData.message}
                                        onChange={handlePdfFormChange}
                                        onKeyPress={(e) => {
                                            if (!/[a-zA-Z0-9\s]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        placeholder="Enter your message"
                                        rows="4"
                                        className="w-full rounded-sm border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-primary"
                                    />
                                </div>

                                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                                    <button
                                        type="button"
                                        onClick={closePdfModal}
                                        className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:opacity-90"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
        </>
    );
}

export default ProductContent;
