import { useRef } from "react";
import { Link } from "react-router-dom";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { successStoriesData } from "./successStoriesData";

import "swiper/css";
import "swiper/css/pagination";

const SuccessStoriesSection = () => {
    const swiperRef = useRef(null);

    return (
        <section className="relative overflow-hidden bg-primary py-10 sm:py-14 md:py-16 lg:py-100">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(255,255,255,0.24),transparent_36%),radial-gradient(circle_at_84%_78%,rgba(255,255,255,0.17),transparent_40%)]"></div>

            <div className="container mx-auto px-4">
                {/* Heading */}
                <div className="relative z-10 mx-auto max-w-3xl text-center">
                    <span className="inline-block rounded-full border border-white/30 bg-white/20 px-4 py-2 text-[11px] tracking-[0.22em] text-white uppercase backdrop-blur-md">
                        Proven In Critical Applications
                    </span>
                    <h2 className="mt-4 text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug text-white">
                        Our Success Stories in Critical Applications
                    </h2>
                </div>

                {/* Slider */}
                <div className="relative z-10">
                    <Swiper
                        modules={[Pagination, Autoplay]} // ✅ FIX HERE
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        loop={true} // ✅ IMPORTANT for smooth autoplay
                        speed={600}
                        spaceBetween={22}
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        className="success-stories-swiper !pb-12"
                    >
                        {successStoriesData.map((story) => (
                            <SwiperSlide key={story.id} className="!h-auto pt-8">
                                <article className="group h-[620px] rounded-xl [perspective:1400px] lg:h-[580px]">
                                    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/30 bg-white/5 backdrop-blur-md transition duration-500 ease-out group-hover:-translate-y-2">

                                        {/* Image */}
                                        <div className="overflow-hidden rounded-t-xl">
                                            <picture>
                                                <source srcSet={story.imageWebp} type="image/webp" />
                                                <source srcSet={story.imagePng} type="image/png" />
                                                <img
                                                    src={story.imagePng}
                                                    alt={story.alt}
                                                    className="h-[280px] w-full object-contain transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </picture>
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-1 flex-col bg-[#2D258E] p-5 text-white">
                                            <h3 className="mt-2 text-base font-bold leading-snug">
                                                {story.title}
                                            </h3>

                                            <p className="mt-3 flex-1 overflow-hidden text-sm leading-6 text-white/90">
                                                {story.description}
                                            </p>

                                            <Link
                                                to="/contact-us"
                                                className="mt-4 inline-flex w-fit items-center rounded-full border border-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white/10"
                                            >
                                                Request Consultation
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default SuccessStoriesSection;