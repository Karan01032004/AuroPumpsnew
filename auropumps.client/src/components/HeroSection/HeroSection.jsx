import ThemeButton from "../../components/ThemeButton";
import bannerData from "../../data/bannerData";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";

const HeroSection = () => {
    const swiperRef = useRef(null);
    return (
        <section className="relative w-full h-[55vh] sm:h-[60vh] md:h-[75vh] lg:h-[90vh] xl:h-screen overflow-hidden">

            <Swiper
                modules={[Autoplay]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                slidesPerView={1}
                loop
                speed={1000}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                className="h-full w-full"
            >
                {bannerData.map((banner) => (
                    <SwiperSlide className="!w-full" key={banner.id}>
                        <div className="relative w-full h-[55vh] sm:h-[60vh] md:h-[75vh] lg:h-[90vh] xl:h-screen">

                            {/* Background Image */}
                            <div className="absolute inset-0 overflow-hidden">
                                <img
                                    src={banner.image}
                                    alt={banner.title}
                                    className="hero-image-zoom w-full h-full object-cover"
                                />
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent"></div>

                            <div className="hero-soft-glow absolute -left-24 top-1/4 h-60 w-60 rounded-full bg-white/20 blur-3xl"></div>

                            {/* Content */}
                            <div className="relative z-10 container mx-auto h-full flex items-center">
                                <div className="hero-content-rise lg:ms-14 max-w-2xl text-white">

                                    {/*<h1 className="text-xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4 text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)] whitespace-pre-line">*/}
                                    {/*    {banner.title}*/}
                                    {/*</h1>*/}

                                    <p className="text-sm sm:text-base px-10 lg:px-0 md:text-lg text-gray-200 mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                                        {banner.description}
                                    </p>

                                    <ThemeButton
                                        text="DISCOVER SOLUTIONS"
                                        link="about-molten-salt-pump-manufacturer"
                                        className="uppercase text-sm font-medium mx-10 lg:mx-0" 
                                    />

                                </div>
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Previous */}
            <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute left-2 min-[576px]:left-6 top-1/2 -translate-y-1/2 z-20
               flex items-center justify-center w-6 h-8
               min-[576px]:w-8 min-[576px]:h-10
                lg:w-10 lg:h-14
               rounded-md
               bg-black/35
               backdrop-blur-sm
               text-white
               hover:bg-primary
               transition-all duration-300"
            >
                <FaChevronLeft className="lg:text-lg" />
            </button>

            {/* Next */}
            <button
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute right-2 min-[576px]:right-6 top-1/2 -translate-y-1/2 z-20
               flex items-center justify-center
             w-6 h-8
               min-[576px]:w-8 min-[576px]:h-10
                lg:w-10 lg:h-14
               rounded-md
               bg-black/45
               backdrop-blur-sm
               text-white
               hover:bg-primary
               transition-all duration-300"
            >
                <FaChevronRight className="lg:text-lg" />
            </button>

        </section>
    );
};

export default HeroSection;