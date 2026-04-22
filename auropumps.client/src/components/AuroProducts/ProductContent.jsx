import { IMAGE_BASE_URL } from "../../poweradmin/api/axios";
import { FiDownload } from "react-icons/fi";

function ProductContent({ product, categoryTitle }) {
    if (!product) return null;

    const specifications = (product.specifications || []).filter(
        (spec) => spec?.value && String(spec.value).trim() !== ""
    );

    return (
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

            <div className="grid gap-6 lg:grid-cols-[1fr_1.25fr] lg:items-start">
                <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white p-2">
                    <img
                        src={`${IMAGE_BASE_URL}${product.image}`}
                        alt={product.name}
                        className="h-full w-full rounded-xl object-cover"
                    />
                </div>

                <div className="">
                    {product.pdf && (
                        <a
                            href={`${IMAGE_BASE_URL}${product.pdf}`}
                            target="_blank"
                            rel="noreferrer"
                            className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-xs font-semibold tracking-[0.08em] text-primary uppercase transition hover:bg-primary hover:text-white"
                        >
                            <FiDownload className="h-4 w-4" />
                            Download PDF
                        </a>
                    )}

                    <p className="text-sm leading-relaxed text-gray md:text-base">
                        {product.description}
                    </p>
                </div>
            </div>

            {specifications.length > 0 && (
                <div className="mt-7">
                    <h3 className="mb-3 text-lg font-bold text-primary md:text-xl">
                        Technical Specifications
                    </h3>

                    <div className="overflow-hidden rounded-xl border border-primary/10">
                        {specifications.map((spec, index) => (
                            <div
                                key={index}
                                className={`grid grid-cols-1 items-start gap-2 px-4 py-3 md:grid-cols-[1.1fr_1.9fr] md:items-center lg:px-5 ${
                                    index % 2 === 0 ? "bg-primary text-white" : "bg-[#f3f1ff] text-gray-700"
                                }`}
                            >
                                <div className="text-sm font-semibold uppercase tracking-wide md:text-base">
                                    {spec.label}
                                </div>

                                <div className="text-sm leading-relaxed md:text-base">
                                    {spec.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductContent;
