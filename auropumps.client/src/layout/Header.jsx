import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
const Header = () => {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDesktopMenu, setActiveDesktopMenu] = useState(null);
    const [mobileProductOpen, setMobileProductOpen] = useState(false);
    const [mobileApplicationOpen, setMobileApplicationOpen] = useState(false);
    const headerHeight = scrolled ? 76 : 100;
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Application", path: "/application" },
        { name: "Company", path: "/company" },
        { name: "Clients", path: "/clients" },
    ];
    const applicationMenu = {
        moltenSulphur: [
            { name: "ACC-J", path: "/application/molten-sulphur/acc-j" },
            { name: "ACCV-J", path: "/application/molten-sulphur/accv-j" },
        ],

        moltenZinc: [
            { name: "AMZ", path: "/application/molten-zinc/amz" },
        ],

        moltenLead: [
            { name: "AML", path: "/application/molten-lead/aml" },
        ],

        moltenSalt: [
            { name: "ACCV", path: "/application/molten-salt/accv" },
        ],

        sulfuricAcid: [
            { name: "ACC", path: "/application/sulfuric-acid/acc" },
            { name: "APP", path: "/application/sulfuric-acid/app" },
            { name: "APPV", path: "/application/sulfuric-acid/appv" },
        ],
    };
    const productMenu = {
        pumps: [
            { name: "ACC", path: "/products/acc" },
            { name: "ACC-J", path: "/products/acc-j" },
            { name: "ACTF", path: "/products/actf" },
            { name: "ACCTF", path: "/products/acctf" },
            { name: "ACCV", path: "/products/accv" },
            { name: "ACCV-J", path: "/products/accv-j" },

            { name: "ACMAG", path: "/products/acmag" },
            { name: "ACVMAG", path: "/products/acvmag" },
            { name: "APP", path: "/products/app" },
            { name: "APPV", path: "/products/appv" },
            { name: "ASP", path: "/products/asp" },
            { name: "PN", path: "/products/pn" },

            { name: "VA", path: "/products/va" },
            { name: "AMZ", path: "/products/amz" },
            { name: "AML", path: "/products/aml" },
            { name: "ACM", path: "/products/acm" },
            { name: "ACV", path: "/products/acv" },
        ],

        moltenSystems: [
            { name: "ACCV (Salt)", path: "/products/accv-salt" },
            { name: "AMZ", path: "/products/amz" },
            { name: "AML", path: "/products/aml" },
            { name: "AAG", path: "/products/aag" },
        ],

        moltenSulphur: [
            { name: "ACC-J", path: "/products/acc-j" },
            { name: "ACCV-J", path: "/products/accv-j" },
        ],

        dross: [
            { name: "DROSSER", path: "/products/drosser" },
        ],

        agitators: [
            { name: "AAG", path: "/products/aag" },
        ],
    };
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
    }, [open]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setOpen(false);
        setActiveDesktopMenu(null);
        setMobileProductOpen(false);
        setMobileApplicationOpen(false);
    }, [location.pathname]);

    const closeAllMenus = () => {
        setOpen(false);
        setActiveDesktopMenu(null);
        setMobileProductOpen(false);
        setMobileApplicationOpen(false);
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md transition-all duration-500 ease-out ${scrolled ? "shadow-lg shadow-black/30" : "shadow-md"
                    }`}
                style={{ height: `${headerHeight}px` }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

                    {/* LOGO */}
                    <NavLink to="/" onClick={closeAllMenus} className="flex items-center shrink-0 gap-2">
                        <div className={`relative overflow-hidden transition-all duration-500 ease-out ${scrolled ? "h-12 w-12 rounded-lg" : "h-20 w-20 rounded-xl"
                            } bg-white/95 shadow-md ring-1 ring-white/30 flex items-center justify-center`}>
                            <img
                                src={`${import.meta.env.BASE_URL}/assets/images/auropumps-logo.png`}
                                alt="Auro Pumps"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div
                            className={`flex flex-col leading-tight transition-all duration-300 ${scrolled ? "scale-95 opacity-90" : "scale-100"
                                }`}
                        >
                            {/* MAIN TITLE */}
                            <span className="hidden lg:block text-xl sm:text-3xl md:text-[18px] font-bold leading-tight  text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)] uppercase">
                                Auro Pumps
                            </span>

                            {/* SUBTITLE */}
                            <span className="hidden lg:block text-white/70 text-[10px] lg:text-[11px] uppercase tracking-[1px] mt-[2px]">
                                Industrial Solutions
                            </span>
                        </div>
                    </NavLink>

                    {/* DESKTOP NAV */}
                    {/* DESKTOP NAV */}
                    <nav className="hidden md:flex items-center gap-6">

                        {navLinks.map((item, i) => {

                            const navClass = ({ isActive }) =>
                                `relative px-4 py-2 rounded-lg text-[14px] transition-all duration-200
      ${isActive
                                    ? "bg-white/10 text-white font-medium after:opacity-100 after:w-5"
                                    : "text-white/80 hover:text-white hover:bg-white/10 after:opacity-0 after:w-0"
                                }
      after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2
      after:bottom-[4px] after:h-[2px] after:rounded-full after:bg-white
      after:transition-all after:duration-300`;

                            // 🔥 PRODUCTS
                            if (item.name === "Products") {
                                return (
                                    <div
                                        key={i}
                                        className="relative"
                                        onMouseEnter={() => setActiveDesktopMenu("Products")}
                                        onMouseLeave={() => setActiveDesktopMenu(null)}
                                    >

                                        <NavLink to={item.path} onClick={closeAllMenus} className={navClass}>
                                            {item.name}
                                        </NavLink>

                                        {/* MEGA MENU */}
                                        <div
  className="fixed left-0 
  w-full 
  bg-[#2D258E]/94  text-white 
  shadow-2xl border-t border-white/10
  opacity-0 invisible -translate-y-3
  transition-all duration-300 z-40"
  style={{
      top: `${headerHeight}px`,
      opacity: activeDesktopMenu === "Products" ? 1 : undefined,
      visibility: activeDesktopMenu === "Products" ? "visible" : undefined,
      transform: activeDesktopMenu === "Products" ? "translateY(0)" : undefined,
  }}
>
                                            <div className="max-w-[1300px] mx-auto px-6 lg:px-10 py-8">

                                                <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-10 text-sm">

                                                    {/* 🔥 PUMPS */}
                                                    <div className="col-span-2 md:col-span-6 lg:col-span-6">
                                                        <h4 className="font-semibold mb-4 border-b border-white/20 pb-2">
                                                            Pumps
                                                        </h4>

                                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8">
                                                            {[0, 1, 2].map((col) => (
                                                                <ul key={col} className="space-y-2 text-white/80">
                                                                    {productMenu.pumps
                                                                        .filter((_, i) => i % 3 === col)
                                                                        .map((item) => (
                                                                            <li key={item.name}>
                                                                                <NavLink
                                                                                    to={item.path}
                                                                                    onClick={closeAllMenus}
                                                                                    className="hover:text-white block transition"
                                                                                >
                                                                                    {item.name}
                                                                                </NavLink>
                                                                            </li>
                                                                        ))}
                                                                </ul>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* 🔥 MOLTEN SYSTEMS */}
                                                    <div className="col-span-2 md:col-span-3 lg:col-span-3 space-y-6">
                                                        <div>
                                                            <h4 className="font-semibold mb-3 border-b border-white/20 pb-2">
                                                                Molten Systems
                                                            </h4>
                                                            {productMenu.moltenSystems.map((item) => (
                                                                <NavLink key={item.name} to={item.path} onClick={closeAllMenus} className="block py-1 text-white/80 hover:text-white">
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </div>

                                                        <div>
                                                            <h4 className="font-semibold mb-3 border-b border-white/20 pb-2">
                                                                Dross Grabber
                                                            </h4>
                                                            {productMenu.dross.map((item) => (
                                                                <NavLink key={item.name} to={item.path} onClick={closeAllMenus} className="block py-1 text-white/80 hover:text-white">
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* 🔥 OTHER */}
                                                    <div className="col-span-2 md:col-span-3 lg:col-span-3 space-y-6">

                                                        <div>
                                                            <h4 className="font-semibold mb-3 border-b border-white/20 pb-2">
                                                                Molten Sulphur
                                                            </h4>
                                                            {productMenu.moltenSulphur.map((item) => (
                                                                <NavLink key={item.name} to={item.path} onClick={closeAllMenus} className="block py-1 text-white/80 hover:text-white">
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </div>

                                                        <div>
                                                            <h4 className="font-semibold mb-3 border-b border-white/20 pb-2">
                                                                Agitators
                                                            </h4>
                                                            {productMenu.agitators.map((item) => (
                                                                <NavLink key={item.name} to={item.path} onClick={closeAllMenus} className="block py-1 text-white/80 hover:text-white">
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            // 🔥 APPLICATION
                            if (item.name === "Application") {
                                return (
                                    <div
                                        key={i}
                                        className="relative"
                                        onMouseEnter={() => setActiveDesktopMenu("Application")}
                                        onMouseLeave={() => setActiveDesktopMenu(null)}
                                    >

                                        <NavLink to={item.path} onClick={closeAllMenus} className={navClass}>
                                            {item.name}
                                        </NavLink>

                                        {/* MEGA MENU */}
                                        <div
                                            className="fixed left-0 
  w-full 
  bg-[#2D258E]/94  text-white 
  shadow-2xl border-t border-white/10
  opacity-0 invisible -translate-y-3
  transition-all duration-300 z-40"
                                            style={{
                                                top: `${headerHeight}px`,
                                                opacity: activeDesktopMenu === "Application" ? 1 : undefined,
                                                visibility: activeDesktopMenu === "Application" ? "visible" : undefined,
                                                transform: activeDesktopMenu === "Application" ? "translateY(0)" : undefined,
                                            }}
                                        >
                                            <div className="max-w-[1300px] mx-auto px-6 lg:px-10 py-8">

                                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 text-sm">

                                                    {Object.entries(applicationMenu).map(([key, items]) => (
                                                        <div key={key}>
                                                            <h4 className="font-semibold mb-3 border-b border-white/20 pb-2 capitalize">
                                                                {key.replace(/([A-Z])/g, " $1")}
                                                            </h4>
                                                            {items.map((item) => (
                                                                <NavLink key={item.name} to={item.path} onClick={closeAllMenus} className="block py-1 text-white/80 hover:text-white">
                                                                    {item.name}
                                                                </NavLink>
                                                            ))}
                                                        </div>
                                                    ))}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            // 🔥 NORMAL LINKS
                            return (
                                <NavLink
                                    key={i}
                                    to={item.path}
                                    onClick={closeAllMenus}
                                    end={item.path === "/"}
                                    className={navClass}
                                >
                                    {item.name}
                                </NavLink>
                            );
                        })}

                        {/* CONTACT */}
                        <NavLink
                            to="/contact-us"
                            onClick={closeAllMenus}
                            className="ml-3 px-5 py-2 rounded-lg text-[14px] font-medium border text-white border-white/30 bg-white/10 hover:bg-white/20 transition"
                        >
                            Contact Us →
                        </NavLink>

                    </nav>
                    {/* MOBILE BTN */}
                    <button
                        onClick={() => setOpen(true)}
                        className="md:hidden text-white p-2"
                    >
                        ☰
                    </button>
                </div>
            </header>

            <div style={{ height: `${headerHeight}px` }} />
            {/* MOBILE DRAWER */}
            <div className={`fixed inset-0 z-[60] ${open ? "visible" : "invisible"}`}>

                {/* Overlay */}
                <div
                    onClick={() => setOpen(false)}
                    className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition ${open ? "opacity-100" : "opacity-0"
                        }`}
                />

                {/* Drawer */}
                <div
                    className={`absolute right-0 top-0 h-full w-[85%] max-w-[340px] 
        bg-primary text-white shadow-2xl 
        transform transition-transform duration-300 flex flex-col ${open ? "translate-x-0" : "translate-x-full"
                        }`}
                >

                    {/* 🔥 HEADER */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 sticky top-0 bg-primary z-10">
                        <span className="font-semibold text-lg">Menu</span>
                        <button onClick={() => setOpen(false)} className="text-xl">✕</button>
                    </div>

                    {/* 🔥 SCROLL AREA */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">

                        {navLinks.map((item, i) => {

                            if (item.name === "Products") {
                                return (
                                    <div key={i} className="bg-white/5 rounded-xl">

                                        {/* TOGGLE */}
                                        <button
                                            onClick={() => setMobileProductOpen(!mobileProductOpen)}
                                            className="w-full flex justify-between items-center px-4 py-3 text-left font-medium"
                                        >
                                            Products
                                            <span className={`transition ${mobileProductOpen ? "rotate-180" : ""}`}>
                                                <FiChevronDown size={18} />
                                            </span>
                                        </button>

                                        {/* CONTENT */}
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ${mobileProductOpen ? "max-h-[900px] pb-4" : "max-h-0"
                                                }`}
                                        >
                                            <div className="px-4 space-y-4 text-sm text-white/80">

                                                {/* 🔥 PUMPS */}
                                                <div>
                                                    <p className="text-white font-semibold mb-2">Pumps</p>
                                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                                        {productMenu.pumps.map((item) => (
                                                            <NavLink
                                                                key={item.name}
                                                                to={item.path}
                                                                onClick={() => setOpen(false)}
                                                                className="py-1 hover:text-white"
                                                            >
                                                                {item.name}
                                                            </NavLink>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* 🔥 DIVIDER */}
                                                <hr className="border-white/10" />

                                                {/* 🔥 MOLTEN SYSTEMS */}
                                                <div>
                                                    <p className="text-white font-semibold mb-2">Molten Systems</p>
                                                    {productMenu.moltenSystems.map((item) => (
                                                        <NavLink
                                                            key={item.name}
                                                            to={item.path}
                                                            onClick={() => setOpen(false)}
                                                            className="block py-1 hover:text-white"
                                                        >
                                                            {item.name}
                                                        </NavLink>
                                                    ))}
                                                </div>

                                                <hr className="border-white/10" />

                                                {/* 🔥 MOLTEN SULPHUR */}
                                                <div>
                                                    <p className="text-white font-semibold mb-2">Molten Sulphur</p>
                                                    {productMenu.moltenSulphur.map((item) => (
                                                        <NavLink
                                                            key={item.name}
                                                            to={item.path}
                                                            onClick={() => setOpen(false)}
                                                            className="block py-1 hover:text-white"
                                                        >
                                                            {item.name}
                                                        </NavLink>
                                                    ))}
                                                </div>

                                                <hr className="border-white/10" />

                                                {/* 🔥 AGITATORS */}
                                                <div>
                                                    <p className="text-white font-semibold mb-2">Agitators</p>
                                                    {productMenu.agitators.map((item) => (
                                                        <NavLink
                                                            key={item.name}
                                                            to={item.path}
                                                            onClick={() => setOpen(false)}
                                                            className="block py-1 hover:text-white"
                                                        >
                                                            {item.name}
                                                        </NavLink>
                                                    ))}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            if (item.name === "Application") {
                                return (
                                    <div key={i} className="bg-white/5 rounded-xl">

                                        {/* 🔥 TOGGLE */}
                                        <button
                                            onClick={() => setMobileApplicationOpen(!mobileApplicationOpen)}
                                            className="w-full flex justify-between items-center px-4 py-3 text-left font-medium"
                                        >
                                            Applications
                                            <span
                                                className={`transition-transform duration-300 ${mobileApplicationOpen ? "rotate-180" : ""
                                                    }`}
                                            >
                                                <FiChevronDown size={18} />
                                            </span>
                                        </button>

                                        {/* 🔥 CONTENT */}
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ${mobileApplicationOpen ? "max-h-[900px] pb-4" : "max-h-0"
                                                }`}
                                        >
                                            <div className="px-4 space-y-4 text-sm text-white/80">

                                                {/* 🔥 Molten Sulphur */}
                                                <div>
                                                    <p className="text-white font-semibold mb-2">Molten Sulphur</p>
                                                    {applicationMenu.moltenSulphur.map((item) => (
                                                        <NavLink
                                                            key={item.name}
                                                            to={item.path}
                                                            onClick={() => setOpen(false)}
                                                            className="block py-1 hover:text-white"
                                                        >
                                                            {item.name}
                                                        </NavLink>
                                                    ))}
                                                </div>

                                                <hr className="border-white/10" />

                                                {/* 🔥 Molten Zinc */}
                                                <div>
                                                    <p className="text-white font-semibold mb-2">Molten Zinc & Galvalum</p>
                                                    {applicationMenu.moltenZinc.map((item) => (
                                                        <NavLink
                                                            key={item.name}
                                                            to={item.path}
                                                            onClick={() => setOpen(false)}
                                                            className="block py-1 hover:text-white"
                                                        >
                                                            {item.name}
                                                        </NavLink>
                                                    ))}
                                                </div>

                                                <hr className="border-white/10" />

                                                {/* 🔥 Molten Lead */}
                                                <div>
                                                    <p className="text-white font-semibold mb-2">Molten Lead & Tin</p>
                                                    {applicationMenu.moltenLead.map((item) => (
                                                        <NavLink
                                                            key={item.name}
                                                            to={item.path}
                                                            onClick={() => setOpen(false)}
                                                            className="block py-1 hover:text-white"
                                                        >
                                                            {item.name}
                                                        </NavLink>
                                                    ))}
                                                </div>

                                                <hr className="border-white/10" />

                                                {/* 🔥 Molten Salt */}
                                                <div>
                                                    <p className="text-white font-semibold mb-2">Molten Salt</p>
                                                    {applicationMenu.moltenSalt.map((item) => (
                                                        <NavLink
                                                            key={item.name}
                                                            to={item.path}
                                                            onClick={() => setOpen(false)}
                                                            className="block py-1 hover:text-white"
                                                        >
                                                            {item.name}
                                                        </NavLink>
                                                    ))}
                                                </div>

                                                <hr className="border-white/10" />

                                                {/* 🔥 Sulfuric Acid */}
                                                <div>
                                                    <p className="text-white font-semibold mb-2">Sulfuric Acid</p>
                                                    {applicationMenu.sulfuricAcid.map((item) => (
                                                        <NavLink
                                                            key={item.name}
                                                            to={item.path}
                                                            onClick={() => setOpen(false)}
                                                            className="block py-1 hover:text-white"
                                                        >
                                                            {item.name}
                                                        </NavLink>
                                                    ))}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return (
                                <NavLink
                                    key={i}
                                    to={item.path}
                                    onClick={() => setOpen(false)}
                                    className="block px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition"
                                >
                                    {item.name}
                                </NavLink>
                            );
                        })}

                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
