
import React from "react";
import { FaCheckCircle, FaAward } from "react-icons/fa";
import ThemeButton from "../ThemeButton";

const CompanyOverview = () => {
    return (
        <section className="relative py-14 sm:py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">

            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 blur-3xl rounded-full -z-10"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/10 blur-3xl rounded-full -z-10"></div>

            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* ================= LEFT IMAGE ================= */}
                    <div className="relative group">

                        {/* Main Image */}
                        <div className="relative overflow-hidden rounded-xl shadow-2xl border border-white/20">

                            <img
                                src={`${import.meta.env.BASE_URL}/assets/images/comapny-overview.png`}
                                alt="Industrial Pump"
                                className="w-full h-full object-cover transition duration-700 group-hover:scale-104"
                            />

         
                        </div>

                    </div>

                    {/* ================= RIGHT CONTENT ================= */}
                    <div>

                        {/* Label */}
                        <span className="inline-block text-[11px] sm:text-xs tracking-[0.22em] font-bold text-primary uppercase bg-primary/10 px-4 py-2 rounded-full">
                            Company Overview
                        </span>

                        {/* Heading */}
                        <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                            Decades of Expertise in
                            <span className="block text-primary mt-2">
                                Precision Pumping Solutions
                            </span>
                        </h2>


                        {/* Description */}
                        <p className="mt-6 text-slate-600 text-sm sm:text-base leading-relaxed">
                            A specialist in critical application pumping, AURO PUMPS has comprehensive knowledge in many specific industrial pumping areas. Established in 1984 in technology transfer from POMPE VERGANI SpA of Italy, the foundation of our extensive product range is based on decades of experience in pump manufacturing, expansive materials know-how and our desire to broaden the horizons of pumping possibilities.
                        </p>


                        {/* CTA */}
                        <div className="mt-8">
                            <ThemeButton
                                text="Learn More"
                                link="company"
                                className="uppercase text-sm font-semibold px-6 py-3"
                            />
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default CompanyOverview;