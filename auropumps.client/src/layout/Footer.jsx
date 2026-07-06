import { NavLink } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="w-full bg-primary text-white">

            {/* MAIN SECTION */}
            <div className="container mx-auto px-4 py-6 lg:py-8 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">

                {/* LEFT - LOGO */}
                <NavLink to="/" className="flex justify-center lg:justify-start">
                    <picture>
                        <source
                            srcSet={`${import.meta.env.BASE_URL}/assets/images/auropumps-technology-transfer-from-pompe-vergani-spa-of-italy.webp`}
                            type="image/webp"
                        />
                        <img
                            src={`${import.meta.env.BASE_URL}/assets/images/auropumps-technology-transfer-from-pompe-vergani-spa-of-italy.png`}
                            alt="Auro Pumps"
                            className="h-20 lg:h-28 w-auto"
                        />
                    </picture>
                </NavLink>

                {/* CENTER - CONTENT */}
                <div className="text-center lg:text-left text-[12px] lg:text-sm text-white/90 leading-relaxed space-y-2 max-w-3xl">

                    {/* ADDRESS */}
                    <p>
                        {/* Desktop */}
                        <span className="hidden lg:inline">
                            WORKS: 104/5/6, G.I.D.C., Palej - 32220, Bharuch, Gujarat, India
                        </span>

                        {/* Mobile */}
                        <span className="lg:hidden font-semibold">WORKS:</span>
                        <span className="lg:hidden block ">
                            104/5/6, G.I.D.C., Palej - 32220<br />
                            Bharuch, Gujarat, India
                        </span>
                    </p>

                    <p>
                        {/* Desktop */}
                        <span className="hidden lg:inline text-sm">
                            CORPORATE OFFICE: 309 Nilamber Primero, Vasna - Bhayli Road, Vadodara - 391410, Gujarat, India
                        </span>

                        {/* Mobile */}
                        <span className="lg:hidden font-semibold">CORPORATE OFFICE:</span>
                        <span className="lg:hidden block">
                            309 Nilamber Primero<br />
                            Vasna - Bhayli Road<br />
                            Vadodara - 391410
                        </span>
                    </p>

                    {/* PHONE */}
                    <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-1 lg:gap-3 text-white/80 text-[12px] lg:text-sm">

                        {/* Desktop single icon */}
                        <div className="hidden lg:flex items-center gap-2">
                            <FaPhoneAlt size={14} />
                        </div>

                        {/* Mobile items (each with icon) */}
                        <div className="flex items-center gap-2 lg:hidden">
                            <FaPhoneAlt size={12} />
                            <a href="tel:+919227227768">+91 92272 27768</a>
                        </div>

                        {/* Desktop item */}
                        <a href="tel:+919227227768" className="hidden lg:inline hover:text-white">
                            +91 92272 27768
                        </a>

                        <span className="hidden lg:inline">|</span>

                        <div className="flex items-center gap-2 lg:hidden">
                            <FaPhoneAlt size={12} />
                            <a href="tel:+918866927768">+91 88669 27768</a>
                        </div>

                        <a href="tel:+918866927768" className="hidden lg:inline hover:text-white">
                            +91 88669 27768
                        </a>

                        <span className="hidden lg:inline">|</span>

                        <div className="flex items-center gap-2 lg:hidden">
                            <FaPhoneAlt size={12} />
                            <a href="tel:+919727955542">+91 97279 55542</a>
                        </div>

                        <a href="tel:+919727955542" className="hidden lg:inline hover:text-white">
                            +91 97279 55542
                        </a>

                    </div>

                    {/* EMAIL */}
                    <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-1 lg:gap-3 text-white/80 text-xs lg:text-sm">

                        {/* Desktop single icon */}
                        <div className="hidden lg:flex items-center gap-2">
                            <FaEnvelope size={14} />
                        </div>

                        {/* Mobile */}
                        <div className="flex items-center gap-2 lg:hidden">
                            <FaEnvelope size={12} />
                            <a href="mailto:sales@auropumps.com">sales@auropumps.com</a>
                        </div>

                        {/* Desktop */}
                        <a href="mailto:sales@auropumps.com" className="hidden lg:inline hover:text-white">
                            sales@auropumps.com
                        </a>

                        {/*<span className="hidden lg:inline">|</span>*/}

                        {/* Mobile */}
                        {/*<div className="flex items-center gap-2 lg:hidden">*/}
                        {/*    <FaEnvelope size={12} />*/}
                        {/*    <a href="mailto:purchase@auropumps.com">purchase@auropumps.com</a>*/}
                        {/*</div>*/}

                        {/* Desktop */}
                        {/*<a href="mailto:purchase@auropumps.com" className="hidden lg:inline hover:text-white">*/}
                        {/*    purchase@auropumps.com*/}
                        {/*</a>*/}

                    </div>
                </div>

                {/* RIGHT - CERTIFICATIONS */}
                <div className="flex items-center gap-4 lg:gap-5 justify-center mt-2 lg:mt-0">

                    <a
                        href={`${import.meta.env.BASE_URL}/assets/pdf/auro-pumps-ce-certificate-md.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View CE Certificate"
                    >
                        <picture>
                            <source
                                srcSet={`${import.meta.env.BASE_URL}/assets/images/ce-certification-mark-europe-compliance-logo.webp`}
                                type="image/webp"
                            />
                            <img
                                src={`${import.meta.env.BASE_URL}/assets/images/ce-certification-mark-europe-compliance-logo.png`}
                                alt="CE Certification"
                                className="h-12 lg:h-18 w-auto hover:opacity-100 transition"
                                loading="lazy"
                            />
                        </picture>
                    </a>

                    <a
                        href={`${import.meta.env.BASE_URL}/assets/pdf/auro-pumps-iso-9001-2015-certificate.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View ISO 9001:2015 Certificate"
                    >
                        <picture>
                            <source
                                srcSet={`${import.meta.env.BASE_URL}/assets/images/iso-9001-2015-quality-certification-logo.webp`}
                                type="image/webp"
                            />
                            <img
                                src={`${import.meta.env.BASE_URL}/assets/images/iso-9001-2015-quality-certification-logo.png`}
                                alt="ISO Certification"
                                className="h-12 lg:h-18 w-auto hover:opacity-100 transition"
                                loading="lazy"
                            />
                        </picture>
                    </a>

                </div>
            </div>

            {/* DIVIDER */}
            <div className="h-[1px] bg-white/20 w-full" />

            {/* BOTTOM */}
            <div className="container mx-auto px-4 py-3 lg:py-4 flex flex-col md:flex-row justify-between items-center text-xs lg:text-sm text-white text-center md:text-left">

                <p>
                    ©{new Date().getFullYear()} Auro Pumps, All rights reserved |{" "}
                    <NavLink
                        to="/sitemap"
                        className="hover:text-white transition"
                    >
                        Sitemap
                    </NavLink>
                </p>
                <p className="mt-2 md:mt-0">
                    Website Design by{" "}
                    <a
                        href="https://www.dotsandcoms.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition"
                    >
                        Dots and Coms
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Footer;