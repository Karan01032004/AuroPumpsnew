import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { successStoriesData } from "./successStoriesData";
import "swiper/css";
import "swiper/css/pagination";

const SuccessStoriesSection = () => {
    const swiperRef = useRef(null);
    const sectionRef = useRef(null);
    const isScrollingRef = useRef(false);   // debounce flag
    const snapInProgressRef = useRef(false); // prevent re-snap while smoothScrolling

    useEffect(() => {
        const handleWheel = (e) => {
            if (window.innerWidth < 1024) return;

            const swiper = swiperRef.current;
            const section = sectionRef.current;
            if (!swiper || !section) return;

            const rect = section.getBoundingClientRect();
            const vh = window.innerHeight;
            const { deltaY } = e;

            if (Math.abs(deltaY) < 5) return;

            // ── ZONE 1: Section is entering the viewport from below (scrolling down)
            // Snap the section to fill the screen so scroll-jack can begin
            if (
                deltaY > 0 &&
                rect.top > 0 &&
                rect.top < vh * 0.8 &&
                !snapInProgressRef.current &&
                swiper.isBeginning
            ) {
                e.preventDefault();
                snapInProgressRef.current = true;
                section.scrollIntoView({ behavior: "smooth", block: "start" });
                setTimeout(() => { snapInProgressRef.current = false; }, 900);
                return;
            }

            // ── ZONE 2: Section is entering from above (scrolling up)
            // Snap back into view so scroll-jack can resume from the end
            if (
                deltaY < 0 &&
                rect.bottom > 0 &&
                rect.bottom < vh * 0.8 &&
                !snapInProgressRef.current &&
                swiper.isEnd
            ) {
                e.preventDefault();
                snapInProgressRef.current = true;
                section.scrollIntoView({ behavior: "smooth", block: "start" });
                setTimeout(() => { snapInProgressRef.current = false; }, 900);
                return;
            }

            // ── ZONE 3: Section fills the viewport — scroll-jack is active
            const sectionFillsViewport = rect.top <= 5 && rect.bottom >= vh - 5;
            if (!sectionFillsViewport) return;

            // Debounce: one scroll event → one slide transition
            if (isScrollingRef.current) {
                e.preventDefault();
                return;
            }

            if (deltaY > 0 && !swiper.isEnd) {
                e.preventDefault();
                isScrollingRef.current = true;
                swiper.slideNext();
                setTimeout(() => { isScrollingRef.current = false; }, 750);
            } else if (deltaY < 0 && !swiper.isBeginning) {
                e.preventDefault();
                isScrollingRef.current = true;
                swiper.slidePrev();
                setTimeout(() => { isScrollingRef.current = false; }, 750);
            }
            // If at start/end, we do NOT preventDefault → normal page scroll resumes
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => window.removeEventListener("wheel", handleWheel);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="success-stories-scroll-lock relative overflow-hidden bg-primary py-10 sm:py-14 md:py-16 lg:py-100"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(255,255,255,0.24),transparent_36%),radial-gradient(circle_at_84%_78%,rgba(255,255,255,0.17),transparent_40%)]"></div>

            <div className="container mx-auto px-4">
                <div className="relative z-10 mx-auto max-w-3xl text-center">
                    <span className="inline-block rounded-full border border-white/30 bg-white/20 px-4 py-2 text-[11px] tracking-[0.22em] text-white uppercase backdrop-blur-md">
                        Proven In Critical Applications
                    </span>
                    <h2 className="mt-4 text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug text-white">
                        Our Success Stories in Critical Applications
                    </h2>
                </div>

                <div className="relative z-10">
                    <Swiper
                        modules={[Pagination]}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        loop={false}
                        speed={850}
                        spaceBetween={22}
                        pagination={{ clickable: true }}
                        className="success-stories-swiper !pb-12"
                    >
                        {successStoriesData.map((story) => (
                            <SwiperSlide key={story.id} className="!h-auto pt-8">
                                <article className="group h-[600px] rounded-xl [perspective:1400px] sm:h-[480px]">
                                    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/30 bg-white/5 backdrop-blur-md transition duration-500 ease-out group-hover:-translate-y-2">
                                        <div>
                                            <picture>
                                                <source srcSet={story.imageWebp} type="image/webp" />
                                                <source srcSet={story.imagePng} type="image/png" />
                                                <img
                                                    src={story.imagePng}
                                                    alt={story.alt}
                                                    width="1200"
                                                    height="160"
                                                    loading="lazy"
                                                    className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105"
                                                />
                                            </picture>
                                        </div>

                                        <div className="flex flex-1 flex-col bg-[#2D258E] p-5 text-white">
                                         
                                            <h3 className="mt-2 text-base font-bold leading-snug">
                                                {story.title}
                                            </h3>
                                            <p
                                                className="mt-3 flex-1 overflow-hidden text-sm leading-6 text-white/90"
                                              
                                            >
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