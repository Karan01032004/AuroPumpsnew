import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    const [open, setOpen] = useState(false);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Application", path: "/application" },
        { name: "Company", path: "/company" },
        { name: "Contact", path: "/contact-us" },
    ];

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
    }, [open]);

    return (
        <section className="w-full bg-primary relative z-50">

            <div className="container mx-auto">
                <div className="absolute left-4 lg:left-10 top-0 z-50">
                    <picture>
                        <source
                            srcSet={`${import.meta.env.BASE_URL}/assets/images/auro-pumps-logo.webp`}
                            type="image/webp"
                        />
                        <img
                            src={`${import.meta.env.BASE_URL}/assets/images/auro-pumps-logo.png`}
                            alt="Auro Logo"
                            className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto object-contain -mt-0"
                        />
                    </picture>
                </div>

                {/* MAIN HEADER */}
                <div className="flex items-center justify-end h-[80px]">

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-8 lg:gap-16 text-white text-base lg:text-md">
                        {navLinks.map((item, i) => (
                            <NavLink
                                key={i}
                                to={item.path}
                                end={item.path === "/"}
                                className={({ isActive }) =>
                                    `relative transition ${isActive
                                        ? "font-medium text-large after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-[65%] after:h-[2px] after:bg-white"
                                        : "opacity-80 hover:opacity-100"
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setOpen(true)}
                        className="md:hidden text-white text-2xl"
                    >
                        ☰
                    </button>

                </div>
            </div>

            {/* ================= MOBILE DRAWER ================= */}
            <div
                className={`fixed inset-0 z-50 transition ${open ? "visible" : "invisible"
                    }`}
            >
                {/* Overlay */}
                <div
                    onClick={() => setOpen(false)}
                    className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"
                        }`}
                />

                {/* Drawer */}
                <div
                    className={`absolute right-0 top-0 h-full w-72 bg-primary text-white shadow-xl transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between px-6 py-6 border-b border-white/20">
                        <span className="text-lg font-semibold">Menu</span>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-2xl"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Mobile Nav */}
                    <nav className="flex flex-col px-6 py-6 space-y-6 text-base lg:text-md">
                          {navLinks.map((item, i) => (
                            <NavLink
                              key={i}
                              to={item.path}
                              end={item.path === "/"}
                              onClick={() => setOpen(false)}
                              className={({ isActive }) =>
                                isActive
                                  ? "font-medium"
                                  : "opacity-80 hover:opacity-100 transition"
                              }
                            >
                              {item.name}
                            </NavLink>
                          ))}
                        </nav>
                </div>
            </div>
        </section>
    );
};

export default Header;