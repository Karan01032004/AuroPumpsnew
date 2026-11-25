import BannerSection from "../../components/BannerSection/BannerSection";
import AuroProducts from "../../components/AuroProducts/AuroProducts";
import AllProductsCatalog from "../../components/AllProductsCatalog/AllProductsCatalog";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { applySeo } from "../../utils/seoHead";

const PRODUCTS_SEO = {
    title: "Metal & Molten Salt Pump Manufacturers in India",
    description:
        "Auro Pumps is a leading metal, molten salt & process pumps manufacturer in India, offering vertical, horizontal, magnetic drive & self-priming pump ranges.",
    keywords:
        "molten salt pumps manufacturers, molten zinc pump manufacturers, molten lead pump manufacturers, magnetic drive pumps manufacturers, vertical submerged pumps manufacturers, cantilever pumps manufacturers, pump manufacturers India, horizontal and vertical process pump manufacturer India, high temperature molten metal pump manufacturer",
    canonical: "https://auropumps.com/metal-pumps-manufacturer-india",
};

function Products() {
    const { categorySlug, productSlug } = useParams();

    const isDetailView =
        categorySlug !== undefined &&
        productSlug !== undefined;

    useEffect(() => {
        // Detail view ka SEO ProductContent khud set karta hai
        if (!isDetailView) {
            applySeo(PRODUCTS_SEO);
        }
    }, [isDetailView]);

    useEffect(() => {
        if (isDetailView) return;

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = "products-itemlist-schema";

        script.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Auro Pumps Industrial & Molten Metal Pump Portfolio",
            "description": "Complete range of vertical submerged pumps, horizontal chemical pumps, molten metal equipments, and molten salt systems manufactured by Auro Pumps Pvt. Ltd.",
            "url": "https://auropumps.com/metal-pumps-manufacturer-india",
            "numberOfItems": 24,
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "item": {
                        "@type": "Product",
                        "name": "ACCV - Extended Shaft Vertical Submerged Pumps",
                        "sku": "ACCV",
                        "category": "Vertical Pumps",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/vertical-pumps/accv-extended-shaft-vertical-submerged-pumps",
                        "description": "Heavy-duty extended shaft vertical submerged centrifugal pumps designed for deep sump chemical, slurry, and high-temperature liquid transfer.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "item": {
                        "@type": "Product",
                        "name": "ACCV-C - Vertical Submerged Cantilever Pumps",
                        "sku": "ACCV-C",
                        "category": "Vertical Pumps",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/vertical-pumps/accv-c-vertical-submerged-cantilever-pumps",
                        "description": "Bearing-free vertical submerged cantilever pumps engineered to eliminate bottom bushing wear in abrasive and corrosive slurries.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "item": {
                        "@type": "Product",
                        "name": "ACCV-J - Extended Shaft Vertical Jacketed Pumps",
                        "sku": "ACCV-J",
                        "category": "Vertical Pumps",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/vertical-pumps/accv-j-extended-shaft-vertical-jacketed-pumps",
                        "description": "Steam- or thermic-oil-jacketed vertical submerged pumps designed to prevent solidification of molten sulfur and high-melting-point fluids.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 4,
                    "item": {
                        "@type": "Product",
                        "name": "APPV - Non Metallic Extended Shaft Vertical Pumps",
                        "sku": "APPV",
                        "category": "Vertical Pumps",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/vertical-pumps/appv-non-metallic-extended-shaft-vertical-pumps",
                        "description": "Corrosion-resistant polypropylene (PP) non-metallic extended shaft vertical submerged pumps for concentrated acids and alkalis.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 5,
                    "item": {
                        "@type": "Product",
                        "name": "AMZ - Molten Zinc and Galvalume Pumps",
                        "sku": "AMZ",
                        "category": "Vertical Pumps",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/vertical-pumps/amz-molten-zinc-and-galvalume-pumps",
                        "description": "Proprietary heat-resistant alloy vertical pumps engineered for molten zinc and galvalume circulation up to 600°C.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 6,
                    "item": {
                        "@type": "Product",
                        "name": "AML - Molten Lead & Tin Pumps",
                        "sku": "AML",
                        "category": "Vertical Pumps",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/vertical-pumps/aml-molten-lead-tin-pumps",
                        "description": "Heavy-duty vertical liquid metal pumps engineered for transferring molten lead and tin at temperatures up to 700°C.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 7,
                    "item": {
                        "@type": "Product",
                        "name": "ACVMAG - Vertical Magnetic Drive Pumps",
                        "sku": "ACVMAG",
                        "category": "Vertical Pumps",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/vertical-pumps/acvmag",
                        "description": "Hermetically sealed, seal-less vertical magnetic drive pumps for zero-leakage handling of hazardous, toxic, and volatile liquids.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 8,
                    "item": {
                        "@type": "Product",
                        "name": "ACC - End Suction Pumps",
                        "sku": "ACC",
                        "category": "Horizontal Pumps",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/horizontal-pumps/acc-end-suction-pumps",
                        "description": "Standardized horizontal end-suction centrifugal process pumps for chemical, petrochemical, and industrial fluid transfer.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 9,
                    "item": {
                        "@type": "Product",
                        "name": "ACC-J - Jacketed End Suction Pumps",
                        "sku": "ACC-J",
                        "category": "Horizontal Pumps",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/horizontal-pumps/acc-j-jacketed-end-suction-pumps",
                        "description": "Heated-casing horizontal end-suction pumps designed to maintain fluid temperature and prevent crystallization or solidification.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 10,
                    "item": {
                        "@type": "Product",
                        "name": "ACTF - Aircooled Thermic Fluid Pumps",
                        "sku": "ACTF",
                        "category": "Horizontal Pumps",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/horizontal-pumps/actf-aircooled-thermic-fluid-pumps",
                        "description": "Air-cooled horizontal centrifugal thermic fluid pumps rated for high-temperature heat-transfer oil circulation up to 350°C.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 11,
                    "item": {
                        "@type": "Product",
                        "name": "ACCTF - Water Cooled Thermic Fluid Pumps",
                        "sku": "ACCTF",
                        "category": "Horizontal Pumps",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/horizontal-pumps/acctf-water-cooled-thermic-fluid-pumps",
                        "description": "Water-cooled horizontal centrifugal thermic fluid pumps engineered for continuous high-temperature heat transfer up to 410°C.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 12,
                    "item": {
                        "@type": "Product",
                        "name": "ASP - Non-Clog Self Priming Pumps",
                        "sku": "ASP",
                        "category": "Horizontal Pumps",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/horizontal-pumps/asp-non-clog-self-priming-pumps",
                        "description": "Solids-handling, non-clog horizontal self-priming pumps for effluent transfer, slurry handling, and industrial sump dewatering.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 13,
                    "item": {
                        "@type": "Product",
                        "name": "ACM - Close Coupled Pumps",
                        "sku": "ACM",
                        "category": "Horizontal Pumps",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/horizontal-pumps/acm-close-coupled-pumps",
                        "description": "Compact monoblock close-coupled horizontal centrifugal pumps designed for space-constrained chemical and industrial installations.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 14,
                    "item": {
                        "@type": "Product",
                        "name": "ACVI - Vertical Inline Pumps",
                        "sku": "ACVI",
                        "category": "Horizontal Pumps",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/horizontal-pumps/acvi-vertical-inline-pumps",
                        "description": "Space-saving inline suction-and-discharge centrifugal pumps for booster systems, HVAC loops, and process circulation.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 15,
                    "item": {
                        "@type": "Product",
                        "name": "ACMAG - Magnetic Drive Pumps",
                        "sku": "ACMAG",
                        "category": "Horizontal Pumps",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/horizontal-pumps/acmag-magnetic-drive-pumps",
                        "description": "Seal-less, containment-shell-sealed horizontal magnetic drive pumps for 100% leak-free chemical, solvent, and hot oil transfer.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 16,
                    "item": {
                        "@type": "Product",
                        "name": "APP - Non Metallic PP Pumps",
                        "sku": "APP",
                        "category": "Horizontal Pumps",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/horizontal-pumps/app-non-metallic-pp-pumps",
                        "description": "Corrosion-proof polypropylene (PP) horizontal centrifugal pumps for concentrated sulfuric acid, hydrochloric acid, and pickling lines.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 17,
                    "item": {
                        "@type": "Product",
                        "name": "PN - Multistage High Pressure Pumps",
                        "sku": "PN",
                        "category": "Horizontal Pumps",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/horizontal-pumps/pn-multistage-high-pressure-pumps",
                        "description": "High-head multistage centrifugal pumps for boiler feed, high-pressure boosting, and long-distance chemical and LPG transfer.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 18,
                    "item": {
                        "@type": "Product",
                        "name": "VA - Multistage Self Priming Pumps",
                        "sku": "VA",
                        "category": "Horizontal Pumps",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/horizontal-pumps/va-multistage-self-priming-pumps",
                        "description": "High-pressure multistage self-priming pumps suited for volatile liquids, LPG, and fluids containing entrained gases.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 19,
                    "item": {
                        "@type": "Product",
                        "name": "AAG - Molten Lead Agitators",
                        "sku": "AAG",
                        "category": "Molten Metal Equipments",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/molten-metal-equipments/aag-molten-lead-agitators",
                        "description": "High-temperature vertical mechanical agitators engineered for homogenous alloying and refining in molten lead smelting kettles.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 20,
                    "item": {
                        "@type": "Product",
                        "name": "ADG - Pneumatic Dross Grabber",
                        "sku": "ADG",
                        "category": "Molten Metal Equipments",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/molten-metal-equipments/adg-pneumatic-dross-grabber",
                        "description": "Pneumatically operated dross grabber designed for safe, rapid skimming and removal of dross from molten metal baths.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 21,
                    "item": {
                        "@type": "Product",
                        "name": "AMZ - Molten Zinc and Galvalume Pumps (Molten Metal Equipment)",
                        "sku": "AMZ-MME",
                        "category": "Molten Metal Equipments",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/molten-metal-equipments/amz-molten-zinc-and-galvalume-pumps",
                        "description": "Submersible high-temperature alloy pumps for rapid kettle emptying and bath circulation in steel galvanizing lines.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 22,
                    "item": {
                        "@type": "Product",
                        "name": "AML - Molten Lead & Tin Pumps (Molten Metal Equipment)",
                        "sku": "AML-MME",
                        "category": "Molten Metal Equipments",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/molten-metal-equipments/aml-molten-lead-tin-pumps",
                        "description": "Rugged molten metal transfer pumps engineered for dense non-ferrous metals in lead-acid battery plants and smelters.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 23,
                    "item": {
                        "@type": "Product",
                        "name": "ACCV - Molten Salt Pumps",
                        "sku": "ACCV-MS",
                        "category": "Molten Salt Equipments",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/molten-salt-equipments/accv-molten-salt-pumps",
                        "description": "Extended-shaft vertical submerged pumps crafted from proprietary high-temperature alloys to pump molten salt up to 800°C.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 24,
                    "item": {
                        "@type": "Product",
                        "name": "MSL - Molten Salt Systems",
                        "sku": "MSL",
                        "category": "Molten Salt Equipments",
                        "url": "https://auropumps.com/metal-pumps-manufacturer-india/molten-salt-equipments/msl-molten-salt-systems",
                        "description": "Complete custom-engineered turnkey molten salt loops integrating pumps, electric heaters, high-temperature valves, and instrumentation.",
                        "brand": { "@type": "Brand", "name": "Auro Pumps" },
                        "manufacturer": { "@type": "Organization", "name": "Auro Pumps Pvt. Ltd." },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://auropumps.com/contact-us-for-molten-metal-pumps",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                }
            ]
        });

        document.head.appendChild(script);

        return () => {
            document.getElementById("products-itemlist-schema")?.remove();
        };
    }, [isDetailView]);

    return (
        <>
            <BannerSection
                title={isDetailView ? "Product Details" : "All Products"}
            />

            {isDetailView ? (
                <AuroProducts />
            ) : (
                <AllProductsCatalog />
            )}
        </>
    );
}

export default Products;