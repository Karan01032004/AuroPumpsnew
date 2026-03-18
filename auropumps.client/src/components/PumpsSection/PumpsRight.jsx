// src/components/PumpsSection/PumpsRight.jsx

import React, { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const tabs = [
    {
        id: "pumps",
        label: "PUMPS",
        products: [
            {
                name: "ACC",
                img: `${import.meta.env.BASE_URL}/assets/images/acc.png`,
            },
            {
                name: "AML",
                img: `${import.meta.env.BASE_URL}/assets/images/aml.png`,
            },
            {
                name: "APP",
                img: `${import.meta.env.BASE_URL}/assets/images/app.png`,
            },
        ],
    },
    {
        id: "agitators",
        label: "AGITATORS",
        products: [
            {
                name: "AG1",
                img: `${import.meta.env.BASE_URL}/assets/images/pump1.png`,
            },
            {
                name: "AG2",
                img: `${import.meta.env.BASE_URL}/assets/images/pump2.png`,
            },
            {
                name: "AG3",
                img: `${import.meta.env.BASE_URL}/assets/images/pump3.png`,
            },
        ],
    },
    {
        id: "dross",
        label: "DROSS GRABBER",
        products: [
            {
                name: "DG1",
                img: `${import.meta.env.BASE_URL}/assets/images/pump1.png`,
            },
            {
                name: "DG2",
                img: `${import.meta.env.BASE_URL}/assets/images/pump2.png`,
            },
            {
                name: "DG3",
                img: `${import.meta.env.BASE_URL}/assets/images/pump3.png`,
            },
        ],
    },

    {
        id: "molten-salt",
        label: "MOLTEN SALT SYSTEMS",
        products: [
            {
                name: "DG1",
                img: `${import.meta.env.BASE_URL}/assets/images/pump1.png`,
            },
            {
                name: "DG2",
                img: `${import.meta.env.BASE_URL}/assets/images/pump2.png`,
            },
            {
                name: "DG3",
                img: `${import.meta.env.BASE_URL}/assets/images/pump3.png`,
            },
        ],
    },

    {
        id: "molten-metal",
        label: "MOLTEN METAL SYSTEMS",
        products: [
            {
                name: "DG1",
                img: `${import.meta.env.BASE_URL}/assets/images/pump1.png`,
            },
            {
                name: "DG2",
                img: `${import.meta.env.BASE_URL}/assets/images/pump2.png`,
            },
            {
                name: "DG3",
                img: `${import.meta.env.BASE_URL}/assets/images/pump3.png`,
            },
        ],
    },
];

const PumpsRight = () => {
    const [activeTab, setActiveTab] = useState("pumps");
    const [isOpen, setIsOpen] = useState(false);
    const currentTab = tabs.find((tab) => tab.id === activeTab);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);
    const [isTransitioning, setIsTransitioning] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 769) {
                setItemsPerView(1);
            } else if (window.innerWidth < 992) {
                setItemsPerView(2);
            } else {
                setItemsPerView(3);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const products = currentTab.products;

    const isSliderActive = products.length > itemsPerView;

    const extendedProducts = isSliderActive
        ? [...products, ...products]
        : products;

    useEffect(() => {
        if (!isSliderActive) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => prev + 1);
            setIsTransitioning(true);
        }, 3000);

        return () => clearInterval(interval);
    }, [products, itemsPerView]);

    useEffect(() => {
        if (currentIndex >= products.length) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(0);
            }, 700);
        }
    }, [currentIndex, products.length]);

    useEffect(() => {
        setCurrentIndex(0);
    }, [activeTab]);

    return (
        <div className="w-full lg:w-2/3 lg:mt-10">

            {/* ================= MOBILE DROPDOWN (<769px) ================= */}
            <div className="relative block lg:hidden mb-6">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex justify-between items-center px-4 py-3 rounded-md 
                    bg-[#F4F3FF] border border-gray-200 text-secondary text-sm font-medium"
                >
                    {tabs.find((tab) => tab.id === activeTab)?.label}
                    <FiChevronDown
                        className={`text-primary text-sm transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                            }`}
                    />
                </button>

                {isOpen && (
                    <div className="absolute left-0 w-full mt-2 bg-white shadow-md rounded-md z-50 overflow-hidden">
                        {tabs.map((tab) => (
                            <div
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setIsOpen(false);
                                }}
                                className={`px-4 py-3 text-sm cursor-pointer transition border-b border-gray-200 last:border-b-0
    ${activeTab === tab.id
                                        ? "bg-primary text-white"
                                        : "text-secondary hover:bg-[#F4F3FF]"
                                    }`}
                            >
                                {tab.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ================= DESKTOP TABS (>=769px) ================= */}
            <div className="hidden lg:flex flex-wrap gap-1 mb-6 bg-[#F4F3FF] p-1 rounded-md">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-3 py-3 rounded-md text-sm font-medium transition
            ${activeTab === tab.id
                                ? "bg-primary text-white"
                                : "text-secondary hover:bg-white"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* ================= PRODUCTS ================= */}
            <div className="relative">
                <div className="overflow-hidden">
                    <div
                        className={`flex ${isTransitioning
                                ? "transition-transform duration-700 ease-in-out"
                                : ""
                            }`}
                        style={{
                            transform: `translateX(-${currentIndex * (100 / itemsPerView)
                                }%)`,
                        }}
                    >
                        {extendedProducts.map((product, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 px-3"
                                style={{
                                    width: `${100 / itemsPerView}%`,
                                }}
                            >
                                <div className="bg-[#F4F3FF] rounded-xl shadow-sm p-4 hover:shadow-md transition h-full">
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-full h-48 object-contain"
                                    />
                                    <h4 className="mt-4 text-sm font-semibold text-secondary text-center">
                                        {product.name}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PumpsRight;