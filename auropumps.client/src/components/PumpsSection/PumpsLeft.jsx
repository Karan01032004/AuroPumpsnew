import ThemeButton from "../../components/ThemeButton";
import React from "react";

const PumpsLeft = () => {
    return (
        <div className="w-full lg:w-1/3">

            <div className="space-y-4">

                {/* Label */}
                <span className="inline-block text-[11px] sm:text-xs tracking-widest font-semibold text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
                    Products
                </span>

                {/* Heading */}
                <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                    Pumps You Can Trust 
                    <span className="block text-primary mt-2">
                         Proven Performance
                    </span>
                </h2>

            </div>

            {/* Content */}
            <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed">
                Molten salt pumps manufacturers, Auro Pump delivers high-quality pumps for molten salt applications. Our molten salt system manufacturers ensure robust performance, precision engineering, and long-lasting operation for industrial processes requiring high-temperature handling.
            </p>

            {/* CTA */}
            <div className="mt-6">
                <ThemeButton
                    text="View All Products"
                    link="products"
                    className="uppercase text-xs sm:text-sm font-semibold px-5 py-2.5"
                />
            </div>

        </div>
    );
};

export default PumpsLeft;
