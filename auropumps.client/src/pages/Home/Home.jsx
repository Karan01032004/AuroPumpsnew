import { useEffect } from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
    import PumpsSection from "../../components/PumpsSection/PumpsSection";
    import ClienteleSection from "../../components/ClienteleSection/ClienteleSection";
    import CompanyOverview from "../../components/CompanyOverview/CompanyOverview";
    import ContactSection from "../../components/ContactSection/ContactSection";
import PumpCategories from "../../components/PumpCategories/PumpCategories";
import { applySeo } from "../../utils/seoHead";
    import SuccessStoriesSection from "../../components/SuccessStoriesSection/SuccessStoriesSection";
const HOME_SEO = {
    title: "Molten Salt Pump & Molten Metal Pump Manufacturers India",
    description:
        "Auro Pumps manufactures molten salt pumps, molten zinc & lead pumps, vertical submerged, cantilever & magnetic drive pumps since 1984 from Gujarat, India.",
    keywords:
        "molten salt pumps manufacturers, molten salt system manufacturers, molten zinc pump manufacturers, molten lead pump manufacturers, molten aluminum pump manufacturers, snout pump manufacturers, galvalume pumps manufacturers, vertical submerged pumps manufacturers, non-metallic vertical pumps manufacturers, slurry pumps manufacturers, cantilever pumps manufacturers, magnetic drive pumps manufacturers, pump manufacturers India, extended shaft vertical submerged pump manufacturer in India, sealless magnetic drive pump manufacturer for hazardous chemicals",
    canonical: "https://auropumps.com/",
};
function Home() {
    useEffect(() => {
        applySeo(HOME_SEO);
    }, []);
        return (
            <>
               

                <HeroSection />
                <CompanyOverview /> 
                <SuccessStoriesSection />
                <PumpsSection />
         
         
           
            </>
        );
    }

    export default Home;

