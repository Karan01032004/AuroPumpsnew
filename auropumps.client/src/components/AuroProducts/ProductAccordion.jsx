import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import ProductContent from "./ProductContent";

function ProductAccordion({ products }) {

    const [openId, setOpenId] = useState(null);

    const toggleAccordion = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="space-y-5">

            {products.map((product) => {

                const isOpen = openId === product.id;

                return (
                    <div
                        key={product.id}
                        className="bg-[#F4F3FF] border border-[#E3E2F5] rounded-xl overflow-hidden transition-all duration-300"
                    >

                        {/* Header */}
                        <button
                            onClick={() => toggleAccordion(product.id)}
                            className={`w-full flex items-center justify-between p-3 lg:p-4 text-left font-semibold text-md transition-all duration-300
                            
                            ${isOpen
                                    ? "bg-primary text-white"
                                : "bg-[#F4F3FF] text-gray border-transparent hover:bg-primary hover:text-white"
                                }`}
                        >

                            <span>{product.name}</span>

                            <span className={`text-md transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                                {isOpen ? <FaMinus /> : <FaPlus />}
                            </span>

                        </button>

                        {/* Body */}
                        <div
                            className={`transition-all duration-500 ease-in-out
                            ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
                        >

                            <div className="bg-white">
                                <ProductContent product={product} />
                            </div>

                        </div>

                    </div>
                );
            })}
        </div>
    );
}

export default ProductAccordion;