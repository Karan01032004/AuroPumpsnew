function CompanyIntro() {
    return (
        <section className="w-full py-100">
            <div className="container mx-auto">

                {/* Top Section */}
                <div className="flex flex-col lg:flex-row gap-10 items-start">

                    {/* Left Image */}
                    <div className="w-full lg:w-1/3">
                        <picture>
                            <source
                                srcSet={`${import.meta.env.BASE_URL}assets/images/jayesh-desai.webp`}
                                type="image/webp"
                            />
                            <img
                                src={`${import.meta.env.BASE_URL}assets/images/jayesh-desai.png`}
                                alt="Mr. Jayesh G. Desai"
                                className="w-full rounded-lg object-cover"
                                loading="lazy"
                            />
                        </picture>
                    </div>

                    {/* Right Content */}
                    <div className="w-full lg:w-2/3">

                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">
                            Mr. JAYESH G. DESAI
                        </h2>

                        <p className="mt-2 text-md text-gray font-semibold">
                            M.S. MECH. (USA), M.E.P. (IM-A)
                        </p>

                        <p className="text-md text-gray mt-1 font-semibold">
                            Founder & Managing Director
                        </p>

                        {/* Highlighted Description Box */}
                        <div className="mt-5 lg:mt-6 rounded-lg text-md text-gray leading-relaxed">
                            <p className="leading-relaxed mb-4">
                                Founded in 1984 by Mr. Jayesh G. Desai, Founder and Managing Director, AURO PUMPS Pvt. Ltd. was established through a technology transfer from POMPE VERGANI SpA of Italy. That grounding in proven European engineering, combined with a sustained commitment to innovation and quality, established AURO as a trusted name in India's industrial pumping sector and in markets across the world.
                            </p>
                            <p className="leading-relaxed mb-4">
                                The company is led by Mr. Jayesh G. Desai, a veteran of the pump industry, supported by his sons, Mr. Malav J. Desai and Mr. Malhar J. Desai, together with a team of more than 70 experienced professionals.
                            </p>
                            <p className="hidden xl:block leading-relaxed">
                                Quality and innovation are the foundations of the business. Every pump is inspected at each stage of production to ensure reliable performance and minimal downtime in the field, while continuous investment in research and development keeps AURO's products aligned with advances in pumping technology. Together, these priorities have earned the company a reputation for dependability and long service life, helping customers lower maintenance costs over the working life of their equipment.
                            </p>
                           
                        </div>

                    </div>
                </div>

                {/* Bottom Paragraph */}
                <div className="mt-4 lg:mt-8 text-md text-gray leading-relaxed">
                    <p className="leading-relaxed block xl:hidden">
                        Quality and innovation are the foundations of the business. Every pump is inspected at each stage of production to ensure reliable performance and minimal downtime in the field, while continuous investment in research and development keeps AURO's products aligned with advances in pumping technology. Together, these priorities have earned the company a reputation for dependability and long service life, helping customers lower maintenance costs over the working life of their equipment.
                    </p>
                    <p className="leading-relaxed mb-4">
                        Over more than four decades, AURO has developed and installed pumps across India and exported to more than 40 countries, from the United States to New Zealand.
                    </p>
                    <p className="leading-relaxed">
                        Beyond its standard range, AURO engineers and custom-manufactures pumping solutions for some of the most demanding applications in industry — including molten metals, molten salts, molten sulfur, sulfuric acid, and solvents — where material selection, sealing, and thermal design are critical to safe, reliable operation.
                    </p>
                </div>

            </div>
        </section>
    );
}

export default CompanyIntro;