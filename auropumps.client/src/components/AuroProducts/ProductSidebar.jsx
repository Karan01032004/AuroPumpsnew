import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FaPlus, FaMinus } from "react-icons/fa";

function ProductSidebar({
    categories,
    activeCategory,
    setActiveCategory,
    selectedProduct,
    setSelectedProduct
}) {

    const [openCategory, setOpenCategory] = useState(activeCategory);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleCategory = (id) => {

        if (openCategory === id) {
            setOpenCategory(null);
        } else {

            setOpenCategory(id);
            setActiveCategory(id);

            // Find selected category
            const selectedCategory = categories.find(cat => cat.id === id);

            // Set first product active
            if (selectedCategory?.products?.length > 0) {
                setSelectedProduct(selectedCategory.products[0]);
            }
        }
    };

    const activeCategoryItem = categories.find(
        (cat) => cat.id === activeCategory
    );

    const activeLabel = activeCategoryItem && selectedProduct
        ? `${activeCategoryItem.title} - ${selectedProduct.name}`
        : "Products";


    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    return (
        <>
            {/* DESKTOP SIDEBAR */}

            <div className="hidden lg:block sticky top-6 bg-[#F4F3FF] rounded-2xl p-6">

                <h3 className="text-lg text-primary font-semibold">
                    Products
                </h3>

                <div className="h-[2px] bg-primary mt-4 mb-6"></div>

                {categories.map((category) => {

                    const isOpen = openCategory === category.id;

                    return (
                        <div key={category.id} className="mb-6">

                            {/* CATEGORY HEADER */}
                            <div
                                onClick={() => toggleCategory(category.id)}
                                className={`flex items-center justify-between cursor-pointer
                                font-semibold text-md transition-all duration-200
                                
                                ${isOpen
                                        ? "text-primary"
                                        : "text-gray hover:text-primary"
                                    }`}
                            >

                                {category.title}

                                <span className="text-sm">
                                    {isOpen ? <FaMinus /> : <FaPlus />}
                                </span>

                            </div>


                            {/* PRODUCTS LIST */}
                            <div
                                className={`overflow-hidden transition-all duration-300
                                ${isOpen ? "max-h-[500px] mt-3" : "max-h-0"}
                                `}
                            >
                                <ul className="ml-4 space-y-3">

                                    {category.products.map((product) => (

                                        <li
                                            key={product.id}
                                            onClick={() => setSelectedProduct(product)}
                                            className={`group flex items-center gap-3 text-gray font-semibold cursor-pointer text-md transition-all duration-200
    
                                                ${selectedProduct?.id === product.id
                                                    ? "text-primary font-semibold"
                                                    : "hover:text-primary hover:font-semibold"
                                                }`}
                                        >

                                            <span
                                                className={`w-1.5 h-1.5 rounded-full transition-colors
                                            ${selectedProduct?.id === product.id
                                                        ? "bg-primary"
                                                        : "bg-gray-400 group-hover:bg-primary"
                                                    }`}
                                            ></span>

                                            {product.name}

                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* MOBILE DROPDOWN */}

            <div ref={dropdownRef} className="lg:hidden mb-1 relative">

                <label className="block text-primary font-semibold mb-2">
                    Products
                </label>

                <div
                    onClick={() => setOpen(!open)}
                    className="flex justify-between items-center 
                        border border-primary 
                        rounded-lg px-4 py-3 
                        bg-white cursor-pointer text-primary font-semibold"
                >
                    <span className="font-semibold">
                        {activeLabel}
                    </span>

                    <FiChevronDown
                        className={`transition-transform duration-300
        ${open ? "rotate-180" : ""}`}
                    />
                </div>

                {open && (
                    <div className="absolute z-50 mt-2 w-full 
                    bg-white border border-gray-200 
                    rounded-lg shadow-lg overflow-hidden">

                        {categories.map((item) => (

                            <div key={item.id} className="border-b border-gray-100">

                                {/* CATEGORY */}
                                <div
                                    onClick={() => {

                                        if (openCategory === item.id) {
                                            setOpenCategory(null);
                                            return;
                                        }
                                        setActiveCategory(item.id);

                                        const firstProduct = item.products?.[0];
                                        if (firstProduct) {
                                            setSelectedProduct(firstProduct);
                                        }

                                        setOpenCategory(item.id);

                                    }}
                                    className={`flex justify-between items-center px-4 py-3 font-semibold text-gray cursor-pointer
    
                                        ${activeCategory === item.id
                                            ? "text-primary"
                                            : "hover:bg-gray-100"
                                        }`}
                                >

                                    {item.title}

                                    <span className="text-sm">
                                        {openCategory === item.id ? <FaMinus /> : <FaPlus />}
                                    </span>

                                </div>

                                {/* PRODUCTS */}
                                {openCategory === item.id && (

                                    <ul className="mt-2 mb-3 ml-4 pl-4 space-y-3">

                                        {item.products.map((product) => (

                                            <li
                                                key={product.id}
                                                onClick={() => {
                                                    setSelectedProduct(product);
                                                    setOpen(false);
                                                }}
                                                className={`flex items-center gap-3 cursor-pointer text-sm transition-all
                                                    ${selectedProduct?.id === product.id
                                                        ? "text-primary font-semibold"
                                                        : "text-gray-600 hover:text-primary"
                                                    }`} >

                                                {/* Custom Bullet */}
                                                <span
                                                    className={`w-1.5 h-1.5 rounded-full
                                                    ${selectedProduct?.id === product.id
                                                            ? "bg-primary"
                                                            : "bg-gray-400"
                                                        }`}
                                                ></span>
                                                {product.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default ProductSidebar;