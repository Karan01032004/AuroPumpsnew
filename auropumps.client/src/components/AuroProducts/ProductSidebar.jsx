import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FaPlus, FaMinus } from "react-icons/fa";

function ProductSidebar({
    categories,
    products,
    activeCategory,
    setActiveCategory,
    selectedProduct,
    onProductClick
}) {

    //const [openCategory, setOpenCategory] = useState(null);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    //const toggleCategory = (id) => {
    //    if (openCategory === id) {
    //        setOpenCategory(null);
    //    } else {
    //        setOpenCategory(id);
    //        setActiveCategory(id);
    //    }
    //};
    const toggleCategory = (id) => {
        setActiveCategory(id);
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
    //useEffect(() => {
    //    if (activeCategory) {
    //        setOpenCategory(activeCategory);
    //    }
    //}, [activeCategory]);

    return (
        <>
            {/* DESKTOP */}
            <div className="hidden lg:block sticky top-6 bg-[#F4F3FF] rounded-2xl p-6">

                <h3 className="text-lg text-primary font-semibold">
                    Products
                </h3>

                <div className="h-[2px] bg-primary mt-4 mb-6"></div>

                {categories.map((category) => {

                    //const isOpen = openCategory === category.id;
                    const isOpen = activeCategory === category.id;
                    return (
                        <div key={category.id} className="mb-6">

                            {/* CATEGORY */}
                            <div
                                onClick={() => toggleCategory(category.id)}
                                className={`flex justify-between cursor-pointer font-semibold
                                ${isOpen ? "text-primary" : "text-gray"}`}
                            >
                                {category.title}
                                <span>{isOpen ? <FaMinus /> : <FaPlus />}</span>
                            </div>

                            {/* PRODUCTS */}
                            {isOpen && activeCategory === category.id && (
                                <ul className="ml-4 mt-3 space-y-3">

                                    {products.map((product) => (
                                        <li
                                            key={product.id}
                                            onClick={() => onProductClick(product.id)}
                                            className={`cursor-pointer flex gap-2
                                            ${selectedProduct?.id === product.id
                                                    ? "text-primary font-semibold"
                                                    : "text-gray"
                                                }`}
                                        >
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></span>
                                            {product.name}
                                        </li>
                                    ))}

                                </ul>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* MOBILE */}
            <div ref={dropdownRef} className="lg:hidden mb-1 relative">

                <label className="block text-primary font-semibold mb-2">
                    Products
                </label>

                <div
                    onClick={() => setOpen(!open)}
                    className="flex justify-between border border-primary rounded-lg px-4 py-3 bg-white cursor-pointer text-primary font-semibold"
                >
                    <span>{activeLabel}</span>
                    <FiChevronDown className={open ? "rotate-180" : ""} />
                </div>

                {open && (
                    <div className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-lg">

                        {categories.map((item) => (

                            <div key={item.id}>

                                <div
                                    onClick={() => {
                                        setActiveCategory(item.id);
                                    //    setOpenCategory(item.id);
                                    }}
                                    className="px-4 py-3 font-semibold cursor-pointer"
                                >
                                    {item.title}
                                </div>

                                {activeCategory === item.id && (
                                    <ul className="ml-4 space-y-2">

                                        {products.map((product) => (
                                            <li
                                                key={product.id}
                                                onClick={() => {
                                                    onProductClick(product.id);
                                                    setOpen(false);
                                                }}
                                                className="cursor-pointer text-sm"
                                            >
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