import ThemeButton from "../../components/ThemeButton";

import React from "react";

const PumpsLeft = () => {
    return (
        <div className="w-full lg:w-1/3">
            <p className="text-lg font-medium text-primary uppercase">
                Products
            </p>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-2 text-secondary">
                Pumps You Can Trust
            </h2>

            <p className="mt-4 text-secondary text-md leading-relaxed">
                Molten salt pumps manufacturers, Auro Pump delivers high-quality pumps for molten salt applications. Our molten salt system manufacturers ensure robust performance, precision engineering, and long-lasting operation for industrial processes requiring high-temperature handling.
            </p>

            <ThemeButton
                text="VIEW ALL PRODUCTS"
                link="products"
                className="uppercase text-sm font-medium mt-3 lg:mt-5"
            />
        </div>
    );
};

export default PumpsLeft;