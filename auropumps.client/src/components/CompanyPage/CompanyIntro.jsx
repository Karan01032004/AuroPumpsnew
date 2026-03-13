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
                                srcSet={`${import.meta.env.BASE_URL}/assets/images/jayesh-desai.webp`}
                                type="image/webp"
                            />
                            <img
                                src={`${import.meta.env.BASE_URL}/assets/images/jayesh-desai.png`}
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
                        <div className="mt-5 lg:mt-20 rounded-lg text-md text-gray leading-relaxed">
                            <p className="leading-relaxed">Founded in 1984 by our Founder and Managing Director, Mr. Jayesh G. Desai, AURO PUMPS Pvt. Ltd. has launched on a path fuelled by innovation and dedication. With technology transfer from POMPE VERGANI SpA of Italy, our company quickly established itself as a key leader in India's industrial landscape and beyond. AURO is professionally managed by Mr. Jayesh G. Desai, a pump industry veteran, and assisted by his sons, Mr. Malav J. Desai and Mr. Malhar J. Desai. The company employs over 70 experienced professionals. Over the last 36 years, we've developed and installed over 1,000,000 pumpsets, meeting important industrial demands in India and around the world.
                        </p>
                        </div>

                    </div>
                </div>

                {/* Bottom Paragraph */}
                <div className="mt-8 text-md text-gray leading-relaxed">
                    <p>
                        Quality is the foundation of our activities. Each AURO pump is meticulously inspected throughout the production process, ensuring flawless performance and minimal downtime for end users. Our strict quality control systems have earned us a reputation for dependability and durability, resulting in lower maintenance costs for our loyal customers. Our promise is to continually innovate. We stay on the forefront of technical developments by incorporating the most recent research and development into our products. This devotion enables us to provide high-quality pumps at affordable costs, allowing industries to thrive in an ever-changing market. With a global presence in over 25 countries, AURO PUMPS Pvt. Ltd. has established itself as a reliable partner in industrial pumping solutions. From the United States to Sri Lanka, our pumps provide unrivalled reliability and performance to industries around the world. As we celebrate almost three decades of achievement, our journey demonstrates our unwavering commitment to quality. Businesses can rely on AURO pumps for outstanding performance, dependability, and longevity, ensuring success today and in the future.
                    </p>
                </div>

            </div>
        </section>
    );
}

export default CompanyIntro;