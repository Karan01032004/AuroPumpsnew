import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
export default function PumpTabs({ data, active, setActive }) {
    const [open, setOpen] = useState(false);
    return (
        <div>

            {/* MOBILE DROPDOWN */}
            <div className="lg:hidden container mx-auto mb-6 relative">

                <button
                    onClick={() => setOpen(!open)}
                    className="w-full bg-[#2D258E] text-white py-3 px-4 rounded-md uppercase text-sm flex justify-between items-center"
                >
                    <span className="font-semibold">{active.title}</span>

                    <FiChevronDown
                        className={`text-xl transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                    />
                </button>

                {open && (
                    <div className="absolute left-0 w-full bg-[#2D258E] mt-1 rounded-md overflow-hidden z-50">

                        {data.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActive(item);
                                    setOpen(false);
                                }}
                                className={`block w-full text-left px-4 py-3 uppercase text-sm border-b border-white/20
                                ${active.id === item.id ? "font-bold text-white" : "text-white/80 hover:text-white"}`}
                            >
                                {item.title}
                            </button>
                        ))}

                    </div>
                )}
            </div>


            {/* DESKTOP TABS */}
            <div className="hidden lg:flex justify-center overflow-x-auto bg-[#2D258E] text-white mb-6 mx-2">
                {data.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActive(item)}
                        className={`px-4 lg:px-13 py-4 tab-btn whitespace-nowrap font-semibold border-r border-white/40 last:border-r-0 uppercase transition
            ${active.id === item.id ? "text-white" : "text-white/40 hover:text-white"}
            `}
                    >
                        {item.title}
                    </button>
                ))}
            </div>
        </div>
    );
}