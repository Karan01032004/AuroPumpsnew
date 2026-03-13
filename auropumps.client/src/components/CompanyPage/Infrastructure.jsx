function Infrastructure() {
    return (
        <section>
            <div className="container mx-auto">
                <p className="text-lg font-medium text-primary uppercase">
                    Infrastructure
                </p>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-2 text-secondary">
                    Powering Your Industry With Our Technology
                </h2>

                {/* Grid Layout */}
                <div className="mt-8 grid lg:grid-cols-[3fr_2fr] gap-6">

                    {/* Card 1 */}
                    <div>
                        {/*<div className="relative group overflow-hidden rounded-xl lg:h-[520px]">*/}
                        <div className="relative group overflow-hidden rounded-xl lg:h-full">
                            <picture>
                                <source
                                    srcSet={`${import.meta.env.BASE_URL}/assets/images/auro-pumps-builduing.webp`}
                                    type="image/webp"
                                />
                                <img
                                    src={`${import.meta.env.BASE_URL}/assets/images/auro-pumps-builduing.jpg`}
                                    alt="Factory Building"
                                    className="w-full h-full object-cover rounded-xl"
                                    loading="lazy"
                                />
                            </picture>

                            {/* Desktop hover overlay */}
                            <div className="hidden lg:flex absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500 items-end p-6">
                                <p className="text-white text-md leading-relaxed">
                                    AURO PUMPS has a fully equipped in-house facility with advanced technology, including machine, fabrication, assembly, testing, and packing sections. All components are manufactured and tested in-house at our GIDC Palej plant to ensure strict quality standards.
                                </p>
                            </div>
                        </div>

                        {/* Mobile text */}
                        <p className="lg:hidden mt-4 text-gray-700 text-md leading-relaxed">
                            AURO PUMPS has a fully equipped in-house facility with advanced technology, including machine, fabrication, assembly, testing, and packing sections. All components are manufactured and tested in-house at our GIDC Palej plant to ensure strict quality standards.
                        </p>
                    </div>


                    {/* Right column */}
                    {/*<div className="grid gap-6 lg:grid-rows-2 lg:h-[520px]">*/}
                    <div className="grid gap-6">
                        {/* Card 2 */}
                        <div>
                            <div className="relative group overflow-hidden rounded-xl">
                                <picture>
                                    <source
                                        srcSet={`${import.meta.env.BASE_URL}/assets/images/infrastructure-1.webp`}
                                        type="image/webp"
                                    />
                                    <img
                                        src={`${import.meta.env.BASE_URL}/assets/images/infrastructure-1.jpg`}
                                        alt="Machinery"
                                        className="w-full h-full object-cover rounded-xl"
                                        loading="lazy"
                                    />
                                </picture>

                                <div className="hidden lg:flex absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500 items-end p-6">
                                    <p className="text-white text-md">
                                        AURO's Engineering and R&D team uses advanced CAD-CAM software and innovations to ensure our pumps are durable and exceed industry standards.
                                    </p>
                                </div>
                            </div>

                            <p className="lg:hidden mt-4 text-gray-700 text-md">
                                AURO's Engineering and R&D team uses advanced CAD-CAM software and innovations to ensure our pumps are durable and exceed industry standards.
                            </p>
                        </div>


                        {/* Card 3 */}
                        <div>
                            <div className="relative group overflow-hidden rounded-xl">
                                <picture>
                                    <source
                                        srcSet={`${import.meta.env.BASE_URL}/assets/images/infrastructure-2.webp`}
                                        type="image/webp"
                                    />
                                    <img
                                        src={`${import.meta.env.BASE_URL}/assets/images/infrastructure-2.jpg`}
                                        alt="Assembly Section"
                                        className="w-full h-full object-cover rounded-xl"
                                        loading="lazy"
                                    />
                                </picture>

                                <div className="hidden lg:flex absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500 items-end p-6">
                                    <p className="text-white text-md">
                                        Our machine shop is equipped with advanced CNC and conventional machines. Each pump is rigorously tested on our in-house test bed per IS 5120 and API 610 standards to ensure quality and customer satisfaction.
                                    </p>
                                </div>
                            </div>

                            <p className="lg:hidden mt-4 text-gray-700 text-md">
                                Our machine shop is equipped with advanced CNC and conventional machines. Each pump is rigorously tested on our in-house test bed per IS 5120 and API 610 standards to ensure quality and customer satisfaction.
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}

export default Infrastructure;