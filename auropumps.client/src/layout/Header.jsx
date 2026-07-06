import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import api  from "../poweradmin/api/axios";

const Header = () => {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDesktopMenu, setActiveDesktopMenu] = useState(null);
    const [mobileProductOpen, setMobileProductOpen] = useState(false);
    const [mobileApplicationOpen, setMobileApplicationOpen] = useState(false);
    const headerHeight = scrolled ? 76 : 100;
    const [categories, setCategories] = useState([]);
    const [productsMap, setProductsMap] = useState({});
    const [applications, setApplications] = useState([]);
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Applications", path: "/application" },
        { name: "Company", path: "/company" },
        { name: "Clients", path: "/clients" },
    ]; 
    const normalizeCategoryValue = (value) =>
        String(value || "")
            .toLowerCase()
            .replace(/&/g, "and")
            .replace(/\s+/g, " ")
            .trim();

    const matchesCategoryGroup = (category, matcher) => {
        const title = normalizeCategoryValue(category?.title);
        const slug = normalizeCategoryValue(category?.slug);
        return matcher(title, slug);
    };

    const pumpCategories = categories.filter((category) =>
        matchesCategoryGroup(
            category,
            (title, slug) =>
                title === "HORIZONTAL PUMPS" || slug === "horizontal-pumps"
        )
    ); 

    const moltenMetalSystemCategories = categories.filter((category) =>
        matchesCategoryGroup(
            category,
            (title, slug) =>
                (title.includes("MOLTEN METAL EQUIPMENT") || slug.includes("molten-metal-equipment")) 
                //!title.includes("metal") &&
                //!slug.includes("metal")    
        
        
        )
    );

    const moltenSulphurCategories = categories.filter((category) =>
        matchesCategoryGroup(
            category,
            (title, slug) =>
                title.includes("MOLTEN SALT EQUIPMENTS") ||
                slug.includes("molten-salt-equipments") 
        )
    );
    const verticalPumpsCategories = categories.filter((category) =>
        matchesCategoryGroup(
            category,
            (title, slug) =>
                title.includes("VERTICAL PUMPS") ||
                slug.includes("vertical-pumps")
        )
    );

    const drossCategories = categories.filter((category) =>
        matchesCategoryGroup(
            category,
            (title, slug) => title.includes("dross") || slug.includes("dross")
        )
    );

    const agitatorCategories = categories.filter((category) =>
        matchesCategoryGroup(
            category,
            (title, slug) => title.includes("agitator") || slug.includes("agitator")
        )
    );

    const flattenCategoryProducts = (groupedCategories) =>
        groupedCategories.flatMap((category) =>
            (productsMap[category.id] || []).map((product) => ({
                ...product,
                categorySlug: category.slug,
            }))
        );

    const pumpProducts = flattenCategoryProducts(pumpCategories);
    // 🔥 NAYA CODE: Products ko barabar columns me divide karne ka logic
    const itemsPerColumn = Math.ceil(pumpProducts.length / 3);
    const pumpColumn1 = pumpProducts.slice(0, itemsPerColumn);
    const pumpColumn2 = pumpProducts.slice(itemsPerColumn, itemsPerColumn * 2);
    const pumpColumn3 = pumpProducts.slice(itemsPerColumn * 2);

    const allPumpColumns = [pumpColumn1, pumpColumn2, pumpColumn3];

    const moltenMetalSystemProducts = flattenCategoryProducts(moltenMetalSystemCategories);
    const moltenSaltSystemProducts = flattenCategoryProducts(moltenSulphurCategories);
    const verticalPumps = flattenCategoryProducts(verticalPumpsCategories);
    const drossProducts = flattenCategoryProducts(drossCategories);
    const agitatorProducts = flattenCategoryProducts(agitatorCategories);
    const pumpColumns = [0, 1, 2];

    const getProductsByIds = (ids) => {
        if (!ids) return [];

        const idArray = ids.split(",").map(id => parseInt(id));

        const uniqueProducts = new Map(); // ✅ duplicate remove karega

        Object.values(productsMap).forEach((productList) => {
            productList.forEach((product) => {
                if (idArray.includes(product.id)) {
                    uniqueProducts.set(product.id, product); // ✅ overwrite same id
                }
            });
        });

        return Array.from(uniqueProducts.values());
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 🔥 categories
                const catRes = await api.get("/ProductsCategory/category-list");

                const catData = Array.isArray(catRes.data)
                    ? catRes.data
                    : catRes.data?.data || [];

                setCategories(catData);

                // 🔥 products per category
                catData.forEach(async (cat) => {
                    try {
                        const prodRes = await api.get(`/product/list-by-category/${cat.id}`);

                        setProductsMap(prev => ({
                            ...prev,
                            [cat.id]: prodRes.data
                        }));

                    } catch (err) {
                        console.log(err);
                    }
                });

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await api.get("/application/list");

                const data = Array.isArray(res.data)
                    ? res.data
                    : res.data?.data || [];

                setApplications(data);

            } catch (err) {
                console.log(err);
            }
        };

        fetchApplications();
    }, []);
    const toSlug = (text) =>
        text?.toLowerCase().replace(/\s+/g, "-");
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
                className={`fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md transition-all duration-500 ease-out ${scrolled ? "shadow-lg shadow-black/30" : "shadow-md"
                    }`}
                style={{ height: `${headerHeight}px` }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-2 xl:px-8 h-full flex items-center justify-between">

                    {/* LOGO */}
                    <NavLink to="/" onClick={closeAllMenus} className="flex items-center shrink-0 gap-2">
                        <div className={`relative overflow-hidden transition-all duration-500 ease-out ${scrolled ? "h-12 w-12 rounded-lg" : "h-22 w-22 rounded-xl"
                            }  flex items-center justify-center`}>
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
                            <span className="hidden font-bold lg:block text-xl sm:text-3xl md:text-[18px] font-rockwell tracking-wide leading-tight text-primary uppercase">
                                Auro Pumps Pvt Ltd
                            </span>

                            {/* SUBTITLE */}
                            <span className="hidden lg:block text-slate-900 text-[10px] xl:text-[11px] mt-[5px]">
                                Est in 1984 with technology from Pompe Vergani SpA, Italy
                            </span>
                        </div>
                    </NavLink>

                    {/* DESKTOP NAV */}
                    <nav className="hidden md:flex items-center xl:gap-6">

                        {navLinks.map((item, i) => {

                            const navClass = ({ isActive }) =>
                                `relative px-4 py-2 rounded-lg text-[14px] transition-all duration-200
      ${isActive
                                    ? "bg-primary/10 text-primary font-bold after:opacity-100 after:w-5"
                                    : "text-primary hover:text-primary hover:bg-white/10 after:opacity-0 after:w-0"
                                }
      after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2
      after:bottom-[4px] after:h-[2px] after:rounded-full after:bg-primary
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
                                            <div className="max-w-[1380px] mx-auto px-6 lg:px-0 py-8">

                                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10 text-xs">
                                                    <div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-6">
                                                        <div>
                                                            <h4 className="mb-3 border-b border-white/20 pb-2 font-semibold text-sm">
                                                                VERTICAL PUMPS
                                                            </h4>
                                                            {verticalPumps.map((product) => (
                                                                <NavLink
                                                                    key={product.id}
                                                                    to={`/products/${product.categorySlug}/${product.slug}`}
                                                                    onClick={closeAllMenus}
                                                                    className="block py-1 text-white/80 transition hover:text-white"
                                                                >
                                                                    {product.name}
                                                                </NavLink>
                                                            ))}
                                                        </div>

                                                    </div>
                                                    <div className="col-span-2 md:col-span-4 lg:col-span-4">
                                                        <h4 className="mb-4 border-b border-white/20 pb-2 font-semibold text-sm">
                                                            HORIZONTAL PUMPS
                                                        </h4>

                                                        {/*<div className="grid grid-cols-1 sm:grid-cols-1 gap-x-8 gap-y-2 text-xs">*/}
                                                        {/*    {pumpColumns.map((column) => (*/}
                                                        {/*        <ul key={column} className="space-y-2 text-white/80">*/}
                                                        {/*            {pumpProducts*/}
                                                        {/*                .filter((_, index) => index % 2 === column)*/}
                                                        {/*                .map((product) => (*/}
                                                        {/*                    <li key={product.id}>*/}
                                                        {/*                        <NavLink*/}
                                                        {/*                            to={`/products/${product.categorySlug}/${product.slug}`}*/}
                                                        {/*                            onClick={closeAllMenus}*/}
                                                        {/*                            className="block transition hover:text-white"*/}
                                                        {/*                        >*/}
                                                        {/*                            {product.name}*/}
                                                        {/*                        </NavLink>*/}
                                                        {/*                    </li>*/}
                                                        {/*                ))}*/}
                                                        {/*        </ul>*/}
                                                        {/*    ))}*/}
                                                        {/*</div>*/}
                                                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-x-8 gap-y-2 text-xs">
                                                            {allPumpColumns.map((columnData, colIndex) => (
                                                                <ul key={colIndex} className="space-y-2 text-white/80">
                                                                    {columnData.map((product) => (
                                                                        <li key={product.id}>
                                                                            <NavLink
                                                                                to={`/products/${product.categorySlug}/${product.slug}`}
                                                                                onClick={closeAllMenus}
                                                                                className="block transition hover:text-white"
                                                                            >
                                                                                {product.name}
                                                                            </NavLink>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            ))}
                                                        </div>
                                                    </div>
                                                  
                                                    <div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-6">
                                                        <div>
                                                            <h4 className="mb-3 border-b border-white/20 pb-2 font-semibold text-sm">
                                                                MOLTEN METAL EQUIPMENTS
                                                            </h4>
                                                            {moltenMetalSystemProducts.map((product) => (
                                                                <NavLink
                                                                    key={product.id}
                                                                    to={`/products/${product.categorySlug}/${product.slug}`}
                                                                    onClick={closeAllMenus}
                                                                    className="block py-1 text-white/80 transition hover:text-white text-xs"
                                                                >
                                                                    {product.name}
                                                                </NavLink>
                                                            ))}
                                                        </div>
                                                        <div>
                                                            <h4 className="mb-3 border-b border-white/20 pb-2 font-semibold text-sm">
                                                                MOLTEN SALT EQUIPMENTS
                                                            </h4>
                                                            {moltenSaltSystemProducts.map((product) => (
                                                                <NavLink
                                                                    key={product.id}
                                                                    to={`/products/${product.categorySlug}/${product.slug}`}
                                                                    onClick={closeAllMenus}
                                                                    className="block py-1 text-white/80 transition hover:text-white text-xs"
                                                                >
                                                                    {product.name}
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
                            if (item.name === "Applications") {
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

                                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm">

                                                    {applications.map((app) => {
                                                        //const appProducts = getProductsByIds(app.product_ids);

                                                        return (
                                                            <div key={app.id}>

                                                                <NavLink
                                                                    to={`/application/${app.slug}`}
                                                                    onClick={closeAllMenus}
                                                                    className="font-semibold pb-2 block"
                                                                >
                                                                    {app.title}
                                                                </NavLink>

                                                                {/*<h4 className="font-semibold   pb-2">*/}
                                                                {/*    {app.title}*/}
                                                                {/*</h4>*/}

                                                                {/*<ul className="space-y-2 text-white/80">*/}
                                                                {/*    {appProducts.map((product) => (*/}
                                                                {/*        <li key={product.id}>*/}
                                                                {/*            <NavLink*/}
                                                                {/*                to={`/application/${app.slug}/${product.slug}`} // ya full route*/}
                                                                {/*                onClick={closeAllMenus}*/}
                                                                {/*                className="hover:text-white block transition"*/}
                                                                {/*            >*/}
                                                                {/*                {product.name}*/}
                                                                {/*            </NavLink>*/}
                                                                {/*        </li>*/}
                                                                {/*    ))}*/}
                                                                {/*</ul>*/}
                                                            </div>
                                                        );
                                                    })}

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
                            className="ml-3 px-5 lg:px-2 xl:px-5 py-2 rounded-lg text-[14px] lg:text-[12px] xl:text-[14px] font-medium border text-white border-white/30 bg-primary hover:bg-primary/10 transition"
                        >
                            Contact Us →
                        </NavLink>

                    </nav>
                    {/* MOBILE BTN */}
                    <button
                        onClick={() => setOpen(true)}
                        className="md:hidden text-black p-2"
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

                                                {categories.map((category) => (
                                                    <div key={category.id}>
                                                        <h4 className="font-bold mb-4 border-b border-white/20 pb-2">
                                                            {category.title}
                                                        </h4>

                                                        <ul className="space-y-2 text-white/80">
                                                            {(productsMap[category.id] || []).map((product) => (
                                                                <li key={product.id}>
                                                                    <NavLink
                                                                        to={`/products/${category.slug}/${product.slug}`} // ✅ slug URL
                                                                        onClick={closeAllMenus}
                                                                        className="hover:text-white block transition border-b border-white/10"
                                                                    >
                                                                        {product.name}
                                                                    </NavLink>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}

                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            if (item.name === "Applications") {
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

                                                {applications.map((app) => {
                                                   /* const appProducts = getProductsByIds(app.product_ids);*/

                                                    return (
                                                        <div key={app.id}>
                                                            <h4 className="font-semibold mb-3 border-b border-white/20 pb-2">
                                                                {app.title}
                                                            </h4>

                                                            {/*<ul className="space-y-2 text-white/80">*/}
                                                            {/*    {appProducts.map((product) => (*/}
                                                            {/*        <li key={product.id}>*/}
                                                            {/*            <NavLink*/}
                                                            {/*                to={`/application/${app.slug}/${product.slug}`}*/}
                                                            {/*                onClick={() => setOpen(false)}*/}
                                                            {/*                className="hover:text-white block transition"*/}
                                                            {/*            >*/}
                                                            {/*                {product.name}*/}
                                                            {/*            </NavLink>*/}
                                                            {/*        </li>*/}
                                                            {/*    ))}*/}
                                                            {/*</ul>*/}
                                                        </div>
                                                    );
                                                })}

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
