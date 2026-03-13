// src/components/PumpsSection/PumpsSection.jsx

import React from "react";
import PumpsLeft from "./PumpsLeft";
import PumpsRight from "./PumpsRight";

const PumpsSection = () => {
    return (
        <section className="py-10 sm:py-14 md:py-16 lg:py-100">
            <div className="container mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10">
                <PumpsLeft />
                <PumpsRight />
            </div>
        </section>
    );
};

export default PumpsSection;