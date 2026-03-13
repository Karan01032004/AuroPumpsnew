import { useState } from "react";
import PumpTabs from "./PumpTabs";
import PumpCategoryContent from "./PumpCategoryContent";
import ThemeButton from "../../components/ThemeButton";

const pumpData = [
    {
        id: 1,
        name: "MOLTEN SULFER",
        title: "Product of MOLTEN SULFER",
        tags: ["ACC-J", "ACCV-J"],
        mainImage: `${import.meta.env.BASE_URL}/assets/images/home-molten-sulfer-1.png`,
        sideImage: `${import.meta.env.BASE_URL}/assets/images/home-molten-sulfer-2.png`,
        applications: [
            "Organic and Inorganic Chemicals",
            "Acids and Corrosive Chemicals",
            "Solvent Hydrocarbons",
            "Chloralkali and Caustic Soda",
            "Sulphuric Acid and Molten Sulfur",
            "Bitumen and Coal Tar",
            "Waste Water Treatment",
            "Heat Treatment Furnaces",
            "Steel Production",
            "Power Plants and Mining",
            "Fertilizer Industry",
            "Nuclear Power",
        ],
    },
    {
        id: 2,
        name: "MOLTEN ZINC & GALVALUM",
        title: "Product of MOLTEN ZINC & GALVALUM",
        tags: ["AMZ"],
        mainImage: `${import.meta.env.BASE_URL}/assets/images/home-molten-sulfer-1.png`,
        sideImage: `${import.meta.env.BASE_URL}/assets/images/home-molten-sulfer-2.png`,
        applications: [
            "Galvanizing Plants",
            "Metal Processing",
            "Steel Plants",
            "Industrial Coating",
            "Alloy Manufacturing",
            "Metal Smelting",
        ],
    },
    {
        id: 3,
        name: "MOLTEN LEAD & TIN",
        title: "Product of MOLTEN LEAD & TIN",
        tags: ["AML"],
        mainImage: `${import.meta.env.BASE_URL}/assets/images/home-molten-sulfer-1.png`,
        sideImage: `${import.meta.env.BASE_URL}/assets/images/home-molten-sulfer-2.png`,
        applications: [
            "Battery Manufacturing",
            "Metal Smelting",
            "Casting Plants",
        ],
    },
    {
        id: 4,
        name: "MOLTEN SALT",
        title: "Product of MOLTEN SALT",
        tags: ["ACCV"],
        mainImage: `${import.meta.env.BASE_URL}/assets/images/home-molten-sulfer-1.png`,
        sideImage: `${import.meta.env.BASE_URL}/assets/images/home-molten-sulfer-2.png`,
        applications: [
            "Organic and Inorganic Chemicals",
            "Acids",
            "Solvent and Petrochemicals",
            "Chloroalkali and Caustic Soda",
            "Sulphuric Acid and Oleum",
            "Molten Sulfur",
            "Molten Salts and Solar Power Plants",
            "Heat Treatment Furnaces and Automotive Paint Lines",
            "Steel Production and Processing",
            "Power Plants and Mining",
            "Fertilizer Industry",
            "Nuclear Power"
        ]
    },
    {
        id: 5,
        name: "SULFURIC ACID",
        title: "Product of SULFURIC ACID",
        tags: ["ACC", "ACCV","APP"],
        mainImage: `${import.meta.env.BASE_URL}/assets/images/home-molten-sulfer-1.png`,
        sideImage: `${import.meta.env.BASE_URL}/assets/images/home-molten-sulfer-2.png`,
        applications: [
            "Organic and Inorganic Chemicals",
            "Acids and Corrosive Chemicals",
            "Solvent, Hydrocarbons and Petrochemicals",
            "Chloroalkali and Caustic Soda",
            "Sulphuric Acid and Molten Sulfur",
            "Bitumen and Coal-Tar",
            "Waste Water Treatment and Effluent Treatment Plants",
            "Heat Treatment Furnaces and Cooling Towers",
            "Steel Production and Processing",
            "Power Plants and Mining",
            "Fertilizer Industry",
            "Nuclear Power"
        ]
    },
];

export default function PumpCategories() {
    const [active, setActive] = useState(pumpData[0]);

    return (
        <section className="py-10 bg-[#F4F3FF]">

            {/* Heading */}
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-3 lg:mb-5">

                    <div>
                        <p className="text-lg font-medium text-primary uppercase">
                            APPLICATIONS
                        </p>

                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-2 text-secondary">
                            Pumps You Can Trust
                        </h2>
                    </div>

                    <ThemeButton
                        text="LEARN MORE"
                        link="application"
                        className="uppercase text-sm font-medium self-start md:self-auto"
                    />

                </div>
            </div>
             
            {/* Tabs */}
            <PumpTabs
                data={pumpData}
                active={active}
                setActive={setActive}
            />

            {/* Content */}
            <PumpCategoryContent data={active} />

        </section>
    );
}