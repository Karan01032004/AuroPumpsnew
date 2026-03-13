import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="w-full bg-[#F5F4FF] text-[#2D258E]">

            {/* TOP SECTION */}
            <div className="container mx-auto">

                <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16">

                    {/* LEFT - LOGO + TEXT */}
                    <div className="w-full xl:max-w-[320px] lg:pb-12">
                        <picture>
                            <source
                                srcSet={`${import.meta.env.BASE_URL}/assets/images/auro-pumps-logo.webp`}
                                type="image/webp"
                            />
                            <img
                                src={`${import.meta.env.BASE_URL}/assets/images/auro-pumps-logo.png`}
                                alt="Auro Pumps"
                                className="h-44 w-auto"
                            />
                        </picture>

                        <p className="mt-4 text-md text-gray leading-relaxed">
                            A specialist in critical application pumping, AURO PUMPS has comprehensive knowledge in many specific industrial pumping areas. 
                        </p>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex-1 pb-6 pt-0 lg:pt-26">

                        {/* QUICK LINKS */}
                        <h3 className="font-semibold mb-4 tracking-wide text-gray text-lg">
                            QUICK LINKS
                        </h3>

                        <div className="flex flex-col xl:flex-row justify-center xl:justify-start gap-3 xl:gap-8 text-md text-gray">
                            <NavLink to="/" className="hover:text-primary transition">Home</NavLink>
                            <NavLink to="/products" className="hover:text-primary transition">Process Pumps</NavLink>
                            <NavLink to="/products" className="hover:text-primary transition">Molten Salt Pumps</NavLink>
                            <NavLink to="/products" className="hover:text-primary transition">Molten Metal Pumps</NavLink>
                            <NavLink to="/company" className="hover:text-primary transition">About Us</NavLink>
                            <NavLink to="/contact-us" className="hover:text-primary transition">Contact Us</NavLink>
                        </div>

                        {/* SOCIAL MEDIA */}
                        <div className="mt-8 text-gray">
                            <h3 className="font-semibold mb-4 tracking-wide text-lg">
                                SOCIAL MEDIA
                            </h3>
                            <div className="flex gap-6">

                                <a
                                    href="https://in.linkedin.com/company/auro-pumps-private-limited" target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition"
                                >
                                    <picture>
                                        <source
                                            srcSet={`${import.meta.env.BASE_URL}/assets/images/linkedin.webp`}
                                            type="image/webp"
                                        />
                                        <img
                                            src={`${import.meta.env.BASE_URL}/assets/images/linkedin.png`}
                                            alt="LinkedIn"
                                            className="w-5 h-5 object-contain"
                                        />
                                    </picture>
                                </a>

                               

                            </div>
                        </div>

                    </div>

                </div>

            </div>

            {/* GRADIENT BORDER LINE */}
            <div
                className="h-[1px] mb-2"
                style={{
                    background:
                        "linear-gradient(90deg, rgba(45,37,142,0) 0%, #2D258E 51.44%, rgba(45,37,142,0) 100%)",
                }}
            />

            {/* BOTTOM BAR */}
            <div className="container mx-auto py-4 flex flex-col md:flex-row justify-between items-center text-md text-[#464646] font-medium">
                <p>©2026 Auro Pumps. All rights reserved.  |{" "}
                    <NavLink
                        to="/sitemap"
                        className={({ isActive }) =>
                            `transition hover:text-primary ${isActive ? "text-primary font-semibold" : ""
                            }`
                        }
                    >
                        Sitemap
                    </NavLink></p>
                <p className="mt-2 md:mt-0">Website Design by{" "}
                    <a
                        href="https://www.dotsandcoms.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition"
                    >
                        D&C
                    </a></p>
            </div>

        </footer>
    );
};

export default Footer;