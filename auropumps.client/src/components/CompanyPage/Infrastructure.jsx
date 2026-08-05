import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import infrastructureData from "../../data/infrastructureData";
import "swiper/css";
function Infrastructure() {
    return (
        <section>
            <div className="container mx-auto">
                
                {/* Label */}
                <span className="inline-block text-[11px] sm:text-xs tracking-[0.22em] font-bold text-primary uppercase bg-primary/10 px-4 py-2 rounded-full">
                    Infrastructure
                </span>

                {/* Heading */}
                <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                    Powering Your Industry   <span className="text-primary"> With Our Technology</span>
                   
                </h2>

                {/* Grid Layout */}
                <Swiper
                    modules={[Autoplay]}
                    loop={true}
                    speed={1000} // 1 second transition
                    spaceBetween={24}
                    autoplay={{
                        delay: 4000, // Wait 4 seconds before next slide
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        992: {
                            slidesPerView: 3,
                        },
                    }}
                    className="mt-10 infrastructureSwiper"
                >
                    {infrastructureData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md flex flex-col h-full">
                                <div className="overflow-hidden">
                                    <picture>
                                        <source
                                            srcSet={`${import.meta.env.BASE_URL}/assets/images/${item.image}.webp`}
                                            type="image/webp"
                                        />

                                        <img
                                            src={`${import.meta.env.BASE_URL}/assets/images/${item.image}.png`}
                                            alt={item.title}
                                            loading="lazy"
                                            className="w-full h-64 object-cover transition-transform duration-720 ease-in-out group-hover:scale-110"
                                        />
                                    </picture>
                                </div>

                                <div className="p-4 md:p-5 flex-1 flex flex-col">
                                    <p className="text-gray leading-relaxed">
                                        {item.description}
                                    </p>

                                </div>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

export default Infrastructure;