function ApplicationContent({ product }) {
    if (!product) return null;

    return (
        <>
            <div>
                
              
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

                            <div className="inline-block uppercase mb-4 px-4 py-1.5 rounded-full border border-primary text-[#4B4B4B] text-md font-semibold bg-white">
                                {product.name}
                            </div>

                            <p className="text-gray text-md leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 space-y-1">
                        {product.specifications.map((spec, index) => (
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