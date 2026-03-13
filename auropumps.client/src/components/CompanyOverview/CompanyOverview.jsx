// src/components/CompanyOverviewSection/CompanyOverviewSection.jsx

import React from "react";
import ThemeButton from "../ThemeButton";

const CompanyOverview = () => {
    return (
        <section className="">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center lg:gap-10">

                    {/* ================= LEFT IMAGE ================= */}
                    <div className="relative w-full lg:w-1/2 hidden lg:block">

                        <img
                            src={`${import.meta.env.BASE_URL}/assets/images/comapny-overview.png`}
                            alt="Industrial Pump"
                            className="w-full h-full object-cover rounded-md"
                        />

                        
                    </div>

                    {/* ================= RIGHT CONTENT ================= */}
                    <div className="w-full lg:w-1/2">

                        <p className="text-lg font-medium text-primary uppercase">
                            Company
                        </p>

                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-2 text-secondary">
                            Decades of Expertise in
                            Precision Pumping Solutions
                        </h2>
                        <div className="relative w-full block lg:hidden my-4">
                            <img
                                src={`${import.meta.env.BASE_URL}/assets/images/comapny-overview.png`}
                                alt="Industrial Pump"
                                className="w-full h-auto object-cover rounded-md"
                            />
                        </div>
                        <p className="mt-5 text-secondary text-md md:text-base leading-relaxed">
                            A specialist in critical application pumping, AURO PUMPS has
                            comprehensive knowledge in many specific industrial pumping areas.
                            Established in 1984 in technology transfer from POMPE VERGANI Spa of Italy,
                            the foundation of our extensive product range is based on decades of
                            experience in pump manufacturing, expansive materials know-how and our
                            desire to broaden the horizons of pumping possibilities.
                        </p>

                        <div className="mt-6">
                            <ThemeButton
                                text="Learn More"
                                link="company"
                                className="uppercase text-sm font-medium"
                            />
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default CompanyOverview;