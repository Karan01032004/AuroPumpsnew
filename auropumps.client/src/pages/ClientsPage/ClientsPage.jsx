// src/components/ClientsPage.jsx

import BannerSection from "../../components/BannerSection/BannerSection";
import clientsData from "../../data/clientsData";

function ClientsPage() {
    const getWebpLogo = (logoPath) => logoPath.replace(/\.jpg$/i, ".webp");

    return (
        <>
            <BannerSection title="Clients" />
        
        <section className="bg-gradient-to-b from-white to-slate-50 py-14 md:py-20">
            <div className="container mx-auto px-4 md:px-6">

                <div className="mx-auto mb-12 max-w-3xl text-center">
                   
                        <span className="inline-block text-[11px] sm:text-xs tracking-[0.22em] font-bold text-primary uppercase bg-primary/10 px-4 py-2 rounded-full">
                            Trusted Worldwide
                        </span>

                        <h1 className="mt-5 text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                        Our Valued Clients
                    </h1>

                    <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
                        We are proud to serve leading companies across steel, power,
                        chemical, pharma, fertilizer, engineering and manufacturing sectors.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {clientsData.map((client) => (
                        <div
                            key={client.id}
                            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
                        >
                            <div className="flex items-center justify-center">
                                <picture>
                                    <source
                                        srcSet={getWebpLogo(client.logo)}
                                        type="image/webp"
                                    />
                                    <img
                                        src={client.logo}
                                        alt={client.name}
                                        loading="lazy"
                                        className="max-h-full w-auto max-w-full object-contain h-32 transition duration-300 group-hover:grayscale-0"
                                    />
                                </picture>
                            </div>

                            <h2 className="mt-4 text-center text-xs font-medium text-slate-600 md:text-sm">
                                {client.name}
                            </h2>
                        </div>
                    ))}
                </div>

                <section className="mt-16 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_25px_70px_-40px_rgba(15,23,42,0.35)]">
                    <div className="bg-gradient-to-r from-primary via-primary to-primary/85 px-6 py-10 text-center text-white md:px-12 md:py-12">
                        <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-white/90">
                            Global Reach
                        </span>

                        <h3 className="mx-auto mt-5 max-w-2xl text-2xl font-bold leading-tight md:text-4xl">
                            Auro Pumps Serving Industries Across India and International Markets
                        </h3>

                        <p className="mx-auto mt-4 max-w-5xl text-sm leading-7 text-white/85 md:text-base">
                            Our client network extends across Asia, the Middle East, Europe,
                            Africa, North America and Oceania, reflecting the trust placed in
                            Auro Pumps for dependable pumping solutions and long-term engineering support.
                        </p>
                    </div>

                    <div className="bg-slate-50 p-3 sm:p-4 md:p-6">
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                            <img
                                src="/auropumps/assets/images/map-auropumps.png"
                                alt="Auro Pumps global client network map"
                                loading="lazy"
                                className="h-auto w-full object-cover"
                            />
                        </div>
                    </div>
                </section>
            </div>
            </section>
        </>
    );
}

export default ClientsPage;
