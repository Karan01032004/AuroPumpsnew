import React, { useEffect, useState } from "react";

const clients = [
    { name: "INTAS", logo: `${import.meta.env.BASE_URL}/assets/images/intas.png` },
    { name: "JSW", logo: `${import.meta.env.BASE_URL}/assets/images/jsw.png` },
    { name: "Raymond", logo: `${import.meta.env.BASE_URL}/assets/images/raymond.png` },
    { name: "Oil India", logo: `${import.meta.env.BASE_URL}/assets/images/oil-india.png` },
    { name: "Aarti Industries", logo: `${import.meta.env.BASE_URL}/assets/images/aarti-industries.png` },
];

const ClienteleSection = () => {
    const [current, setCurrent] = useState(0);

    // Auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % clients.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="bg-white py-8 sm:py-14 md:py-16 lg:py-100">
            <div className="container mx-auto">

                {/* Heading */}
                <p className="text-lg font-medium text-primary uppercase">
                    Clientele
                </p>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-2 text-secondary">
                    Partnering for Performance, Driven by Experience
                </h2>

                {/* ================= DESKTOP GRID ================= */}
                <div className="hidden lg:block mt-6 border border-[#7C7C7C] rounded-lg overflow-hidden">
                    <div className="grid grid-cols-5">
                        {clients.map((client, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center p-6 border border-[#7C7C7C] hover:bg-gray-50 transition"
                            >
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className="max-h-18 object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ================= MOBILE / TABLET SLIDER ================= */}
                <div className="lg:hidden mt-8">

                    {/* Slider */}
                    <div className="relative overflow-hidden border border-gray-300 rounded-lg">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${current * 100}%)` }}
                        >
                            {clients.map((client, index) => (
                                <div
                                    key={index}
                                    className="min-w-full flex items-center justify-center p-8"
                                >
                                    <img
                                        src={client.logo}
                                        alt={client.name}
                                        className="max-h-24 object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center mt-4 gap-2">
                        {clients.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`w-2.5 h-2.5 rounded-full transition
                  ${current === index ? "bg-primary w-6" : "bg-gray-300"}
                `}
                            />
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
};

export default ClienteleSection;