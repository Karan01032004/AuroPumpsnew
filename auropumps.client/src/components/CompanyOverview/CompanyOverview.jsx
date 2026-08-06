
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

                        <div className="relative overflow-hidden rounded-xl shadow-2xl border border-white/20">

                            <img
                                src={`${import.meta.env.BASE_URL}assets/images/comapny-overview-new.png`}
                                alt="Industrial Pump"
                                className="w-full h-full object-cover transition duration-700 group-hover:scale-104"
                            />

                            {/* Bottom Gradient */}
                            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                            {/* Experience Content */}
                            <div className="absolute bottom-5 left-6 right-2 flex justify-end items-end gap-4 text-white">

                                <h3 className="text-5xl md:text-6xl font-bold leading-none">
                                    41+
                                </h3>

                                <p className="text-sm md:text-lg leading-tight max-w-[240px] mb-2">
                                    Years of Experience of
                                    
                                    working in Industry
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* ================= RIGHT CONTENT ================= */}
                    <div>

                        {/* Label */}
                        <span className="inline-block text-[11px] sm:text-xs tracking-[0.22em] font-bold text-primary uppercase bg-primary/10 px-4 py-2 rounded-full">
                            Company Overview
                        </span>

                        {/* Heading */}
                        <h2 className="mt-5 text-xl sm:text-4xl font-bold text-slate-900 leading-tight">
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
                        {/* CTA + Certifications */}
                        <div className="mt-8 md:mt-1 flex items-end justify-between gap-4">
                            <ThemeButton
                                text="Learn More"
                                link="company"
                                className="uppercase text-sm font-semibold px-6 py-3"
                            />

                            <div className="flex items-start gap-3 shrink-0">
                                <a
                                    href={`${import.meta.env.BASE_URL}/assets/pdf/auro-pumps-ce-certificate-md.pdf`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="CE Certificate"
                                >
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/images/ce-certification-mark-europe-compliance-logo-dark.png`}
                                        alt="CE Certified"
                                        className="h-12 sm:h-16 lg:h-22 w-auto hover:scale-105 transition-transform"
                                    />
                                </a>

                                <a
                                    href={`${import.meta.env.BASE_URL}/assets/pdf/auro-pumps-iso-9001-2015-certificate.pdf`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="ISO Certificate"
                                >
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/images/iso-9001-2015-quality-certification-logo-dark.png`}
                                        alt="ISO 9001:2015"
                                        className="h-12 sm:h-16 lg:h-22 w-auto hover:scale-105 transition-transform"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CompanyOverview;