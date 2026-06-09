import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FaPlus, FaMinus } from "react-icons/fa";

function ProductSidebar({
    categories,
    products,
    activeCategory,
    setActiveCategory,
    onCategoryClick,
    selectedProduct,
    onProductClick
}) {
    const categoryList = Array.isArray(categories)
        ? categories
        : Array.isArray(categories?.data)
            ? categories.data
            : [];

    // By default null rakha hai taaki slug se aane par bhi sab collapse rahe
    const [openCategory, setOpenCategory] = useState(null);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleCategory = (id) => {
        if (openCategory === id) {
            setOpenCategory(null); // Agar khuli hui par click kiya toh band kar do
        } else {
            setOpenCategory(id);   // Nayi category expand karo
            setActiveCategory(id); // Active id update karo taaki sahi products load hon
            onCategoryClick?.();   // Scroll helper call karo
        }
    };

    const activeCategoryItem = categoryList.find(
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
            {/* DESKTOP */}
            <div className="hidden lg:block sticky top-6 bg-[#F4F3FF] rounded-2xl p-6">
                <h3 className="text-lg text-primary font-semibold">
                    Products
                </h3>

                <div className="h-[2px] bg-primary mt-4 mb-6"></div>

                {categoryList.map((category) => {
                    // FIX 1: activeCategory ki jagah openCategory se check hoga expand/collapse
                    const isOpen = openCategory === category.id;

                    return (
                        <div key={category.id} className="mb-6">
                            {/* CATEGORY */}
                            <div
                                onClick={() => toggleCategory(category.id)}
                                className={`flex justify-between cursor-pointer font-semibold
                                ${activeCategory === category.id ? "text-primary" : "text-gray"}`}
                            >
                                {category.title}
                                <span>{isOpen ? <FaMinus /> : <FaPlus />}</span>
                            </div>

                            {/* PRODUCTS */}
                            {/* FIX 2: List tabhi dikhegi jab user ne click karke open kiya ho */}
                            {isOpen && (
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
                        {categoryList.map((item) => {
                            // FIX 3: Mobile dropdown ke andar sub-categories toggle setup
                            const isMobileOpen = openCategory === item.id;

                            return (
                                <div key={item.id}>
                                    <div
                                        onClick={() => {
                                            if (openCategory === item.id) {
                                                setOpenCategory(null);
                                            } else {
                                                setOpenCategory(item.id);
                                                setActiveCategory(item.id);
                                                onCategoryClick?.();
                                            }
                                        }}
                                        className={`px-4 py-3 font-semibold cursor-pointer flex justify-between items-center
                                        ${activeCategory === item.id ? "text-primary" : "text-gray"}`}
                                    >
                                        <span>{item.title}</span>
                                        <span className="text-xs">{isMobileOpen ? <FaMinus /> : <FaPlus />}</span>
                                    </div>

                                    {/* FIX 4: Mobile par bhi products toggle condition fix ki */}
                                    {isMobileOpen && (
                                        <ul className="ml-6 my-2 space-y-2 border-l-2 border-gray-200 pl-2">
                                            {products.map((product) => (
                                                <li
                                                    key={product.id}
                                                    onClick={() => {
                                                        onProductClick(product.id);
                                                        setOpen(false);
                                                    }}
                                                    className={`cursor-pointer py-1 text-sm ${selectedProduct?.id === product.id
                                                            ? "text-primary font-semibold"
                                                            : "text-gray"
                                                        }`}
                                                >
                                                    {product.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}

export default ProductSidebar;