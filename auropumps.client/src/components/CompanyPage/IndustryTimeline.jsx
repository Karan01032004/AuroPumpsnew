import { useEffect, useRef } from "react";
import timelineData from "./timelineData";
function IndustryTimeline() {
    
    return (
        <section className="w-full py-10 sm:py-14 md:py-16 lg:py-100">
            <div className="container mx-auto grid lg:grid-cols-[2fr_3fr] gap-2 lg:gap-12 items-center">

                {/* ================= LEFT SIDE ================= */}
                <div>
                    <p className="text-lg font-medium text-primary uppercase">
                        History & Timeline
                    </p>

                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-2 text-secondary">
                        Powering Your Industry With Our Technology
                    </h2>

                    <div className="mt-8 rounded-xl overflow-hidden">
                        <img
                            src={`${import.meta.env.BASE_URL}/assets/images/timeline.png`}
                            alt="Industry"
                            className="w-full h-[400px] object-cover rounded-xl"
                        />
                    </div>
                </div>

                {/* ================= RIGHT SIDE TIMELINE ================= */}
                <div className="h-[300px] sm:h-[330px] md:h-[420px] lg:h-[500px] overflow-y-auto relative mt-6">
                    <div className="pr-6">

                        {timelineData.map((item, index) => (
                            <div key={index} className="flex gap-6 mb-6">

                                {/* LEFT COLUMN */}
                                <div className="w-16 flex flex-col items-center">

                                    {/* Year */}
                                    <h3 className="text-3xl font-semibold text-primary mb-2">
                                        {item.year}
                                    </h3>

                                    {/* Dot */}
                                    <div className="w-3 h-3 bg-primary rounded-full"></div>

                                    {/* Line */}
                                    {index !== timelineData.length && (
                                        <div className="w-[2px] flex-1 min-h-[80px] bg-[#464646]"></div>
                                    )} 

                                </div>

                                {/* RIGHT COLUMN */}
                                <div className="flex-1 flex items-center">
                                    <p className="text-gray text-md mt-10">
                                        {item.description}
                                    </p>
                                </div>

                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    );
}

export default IndustryTimeline;