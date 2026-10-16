import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BannerSection from "../../components/BannerSection/BannerSection";
import AllApplicationsCatalog from "../../components/AllApplicationsCatalog/AllApplicationsCatalog";
import AuroApplication from "../../components/AuroApplication/AuroApplication";
import { applySeo } from "../../utils/seoHead";

const APPLICATIONS_SEO = {
    title: "Industrial Pump Applications by Industry",
    description:
        "See how Auro Pumps' molten salt, molten metal & process pumps are engineered for caustic soda, sulfuric acid, solvents & molten sulfur industries.",
    keywords:
        "industrial pump applications, molten salt pump applications, molten metal pump applications, chemical process pump applications India, industrial pump solutions by application India, process pump applications for chemical and metal industries",
    canonical: "https://auropumps.com/industrial-pump-applications",
};

function Application() {
    const { categoryId } = useParams();

    const isDetailView = Boolean(categoryId);

    useEffect(() => {
        // Detail view ka SEO ApplicationContent khud set karta hai
        if (!isDetailView) {
            applySeo(APPLICATIONS_SEO);
        }
    }, [isDetailView]);

    return (
        <>
            <BannerSection
                title={isDetailView ? "Application Details" : "Applications"}
            />

            {isDetailView ? (
                <AuroApplication />
            ) : (
                <AllApplicationsCatalog />
            )}
        </>
    );
}

export default Application;