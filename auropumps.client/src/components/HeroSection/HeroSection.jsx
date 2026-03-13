import ThemeButton from "../../components/ThemeButton";
const HeroSection = () => {
    return (
        <section className="relative w-full h-[55vh] sm:h-[60vh] md:h-[75vh] lg:h-[90vh] xl:h-screen overflow-hidden">

            {/* Background Image */}
            <img
                src={`${import.meta.env.BASE_URL}/assets/images/home-banner.png`}
                alt="Premier Pumping Solutions"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent"></div>

            {/* Content */}
            <div className="relative z-10 container mx-auto h-full flex items-center">
                <div className="max-w-2xl text-white">

                    <h1 className="text-xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4 text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
                        Premier Pumping Solutions,
                        <br className="hidden md:block" />
                        Powered by Decades of Expertise
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                        Since 1984, our commitment to innovation and quality has positioned us as a trusted leader in the pump manufacturing industry, backed by extensive experience and advanced materials know-how.
                    </p>

                    <ThemeButton
                        text="DISCOVER SOLUTIONS"
                        link="company"
                        className="uppercase text-sm font-medium"
                    />

                </div>
            </div>

        </section>
    );
};

export default HeroSection;