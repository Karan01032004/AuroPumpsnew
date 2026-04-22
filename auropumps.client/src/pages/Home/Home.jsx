import HeroSection from "../../components/HeroSection/HeroSection";
import PumpsSection from "../../components/PumpsSection/PumpsSection";
import ClienteleSection from "../../components/ClienteleSection/ClienteleSection";
import CompanyOverview from "../../components/CompanyOverview/CompanyOverview";
import ContactSection from "../../components/ContactSection/ContactSection";
import PumpCategories from "../../components/PumpCategories/PumpCategories";
import SuccessStoriesSection from "../../components/SuccessStoriesSection/SuccessStoriesSection";

function Home() {
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
