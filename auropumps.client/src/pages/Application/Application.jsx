import { useParams } from "react-router-dom";
import BannerSection from "../../components/BannerSection/BannerSection";
import AllApplicationsCatalog from "../../components/AllApplicationsCatalog/AllApplicationsCatalog";
import AuroApplication from "../../components/AuroApplication/AuroApplication";

function Application() {
    const { categoryId } = useParams();

    const isDetailView = Boolean(categoryId);

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