import { useParams } from "react-router-dom";
import BannerSection from "../../components/BannerSection/BannerSection";
import AllApplicationsCatalog from "../../components/AllApplicationsCatalog/AllApplicationsCatalog";
import AuroApplication from "../../components/AuroApplication/AuroApplication";
import { Helmet } from "react-helmet-async";

function Application() {
    const { categoryId } = useParams();

    const isDetailView = Boolean(categoryId);

    return (
        <>
            {!isDetailView && (
                <Helmet>
                    <title>Industrial Pump Applications by Industry</title>

                    <meta
                        name="description"
                        content="See how Auro Pumps' molten salt, molten metal & process pumps are engineered for caustic soda, sulfuric acid, solvents & molten sulfur industries."
                    />

                    <meta
                        name="keywords"
                        content="industrial pump applications, molten salt pump applications, molten metal pump applications, chemical process pump applications India, industrial pump solutions by application India, process pump applications for chemical and metal industries"
                    />

                    <link
                        rel="canonical"
                        href="https://auropumps.com/industrial-pump-applications"
                    />
                </Helmet>
            )}

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