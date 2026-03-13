import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

function ProductSidebar({ categories, active, setActive }) {

    const [open, setOpen] = useState(false);

    const activeItem = categories.find(item => item.id === active);

    return (
        <>

            {/* ====================== */}
            {/* DESKTOP SIDEBAR */}
            {/* ====================== */}
            <div className="hidden lg:block sticky top-6 self-start bg-[#F4F3FF] rounded-2xl p-6">

                <h3 className="text-lg text-primary font-semibold">
                    Select Category
                </h3>

                <div className="h-[2px] bg-primary mt-4 mb-6"></div>

                <ul className="space-y-8">
                    {categories.map((item) => {

                        const isActive = active === item.id;

                        return (
                            <li
                                key={item.id}
                                onClick={() => setActive(item.id)}
                                className="flex items-center justify-between cursor-pointer"
                            >
                                <span
                                    className={
                                        isActive
                                            ? "text-primary font-semibold"
                                            : "text-gray font-semibold hover:text-primary transition-colors duration-200"
                                    }
                                >
                                    {item.title}
                                </span>

                                {isActive && (
                                    <span className="w-5 h-[3px] bg-primary"></span>
                                )}
                            </li>
                        );
                    })}
                </ul>

            </div>


            {/* ====================== */}
            {/* MOBILE DROPDOWN */}
            {/* ====================== */}
            <div className="lg:hidden mb-6 relative">

                <label className="block text-primary font-semibold mb-2">
                    Select Category
                </label>

                {/* Selected Item */}
                <div
                    onClick={() => setOpen(!open)}
                    className="flex justify-between items-center 
                               border border-primary 
                               rounded-lg px-4 py-3 
                               bg-white cursor-pointer"
                >
                    <span className="font-medium">
                        {activeItem?.title}
                    </span>

                    <FiChevronDown
                        className={`transition-transform duration-300 
                        ${open ? "rotate-180" : ""}`}
                    />
                </div>


                {/* Dropdown */}
                {open && (
                    <div className="absolute z-50 mt-2 w-full 
                                    bg-white border border-gray-200 
                                    rounded-lg shadow-lg overflow-hidden">

                        {categories.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => {
                                    setActive(item.id);
                                    setOpen(false);
                                }}
                                className={`px-4 py-3 cursor-pointer transition 
                                ${active === item.id
                                        ? "bg-primary text-white"
                                        : "hover:bg-gray-100"
                                    }`}
                            >
                                {item.title}
                            </div>
                        ))}

                    </div>
                )}

            </div>

        </>
    );
}

export default ProductSidebar;