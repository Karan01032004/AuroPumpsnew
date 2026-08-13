import HeroSection from "../../components/HeroSection/HeroSection";
import PumpsSection from "../../components/PumpsSection/PumpsSection";
import ClienteleSection from "../../components/ClienteleSection/ClienteleSection";
import CompanyOverview from "../../components/CompanyOverview/CompanyOverview";
import ContactSection from "../../components/ContactSection/ContactSection";
import PumpCategories from "../../components/PumpCategories/PumpCategories";
import SuccessStoriesSection from "../../components/SuccessStoriesSection/SuccessStoriesSection";
import { Helmet } from 'react-helmet-async'
function Home() {
    return (
        <>
            <Helmet>
                <title>Molten Salt Pump & Molten Metal Pump Manufacturers India</title>

                <meta
                    name="description"
                    content="Auro Pumps manufactures molten salt pumps, molten zinc & lead pumps, vertical submerged, cantilever & magnetic drive pumps since 1984 from Gujarat, India."
                />

                <meta
                    name="keywords"
                    content="molten salt pumps manufacturers, molten salt system manufacturers, molten zinc pump manufacturers, molten lead pump manufacturers, molten aluminum pump manufacturers, snout pump manufacturers, galvalume pumps manufacturers, vertical submerged pumps manufacturers, non-metallic vertical pumps manufacturers, slurry pumps manufacturers, cantilever pumps manufacturers, magnetic drive pumps manufacturers, pump manufacturers India, extended shaft vertical submerged pump manufacturer in India, sealless magnetic drive pump manufacturer for hazardous chemicals"
                />

                <link rel="canonical" href="https://auropumps.com/" />
            </Helmet>

            <HeroSection />
            <CompanyOverview /> 
            <SuccessStoriesSection />
            <PumpsSection />
         
         
           
        </>
    );
}

export default Home;
