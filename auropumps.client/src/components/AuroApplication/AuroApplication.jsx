import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CategorySidebar from "./CategorySidebar";
import ApplicationContent from "./ApplicationContent";
import api from "../../poweradmin/api/axios";
import { IMAGE_BASE_URL } from "../../poweradmin/api/axios";

function AuroApplication() {
    const { categoryId } = useParams();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(null);
    const [applicationProducts, setApplicationProducts] = useState([]);
    const navigate = useNavigate();
    const [applicationFaqs, setApplicationFaqs] = useState([]);

    // 1. Initial Load: Sirf ek baar chalega database se list nikalne ke liye
    useEffect(() => {
        const loadApplications = async () => {
            setLoading(true);
            try {
                const res = await api.get("/application/list");
                const formatted = res.data.map(app => ({
                    id: app.id,
                    title: app.title,
                    description: app.description || "",
                    slug: app.slug,
                    product_ids: app.product_ids,
                    images: [
                        app.image1, app.image2, app.image3 
                        
                    ].filter(Boolean)
                }));
                setApplications(formatted);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadApplications();
    }, []);

    const loadApplicationDetails = async (applicationId) => {
        try {
            const res = await api.get(`/application/${applicationId}`);

            setApplicationFaqs(res.data.faqs || []);
        } catch (err) {
            console.error(err);
        }
    };

    // 2. Logic Handler: CategoryId ya parameters badalne par chalega, bina applications loop ke!
    useEffect(() => {
        if (loading || !applications.length) return;

        const init = async () => {
            if (categoryId) {
                const category = applications.find((cat) => cat.slug === categoryId);

                if (category) {
                    setActiveCategory(category.id); 
                    const products = await loadProductsByIds(category.product_ids);
                    setApplicationProducts(products);
                    await loadApplicationDetails(category.id);
                }
            } else if (applications.length > 0) {
                const firstCategory = applications[0];
                navigate(`/application/${firstCategory.slug}`, { replace: true });
            }
        };

        init();
        // 🔥 FIX: Dependency array se 'applications' ko saaf kar diya!
    }, [categoryId, loading, applications.length]);

    const loadProductsByIds = async (ids) => {
        if (!ids) return [];
        try {
            const idsArray = ids.split(",").map(x => x.trim());
            const productPromises = idsArray.map(id => api.get(`/product/${id}`));
            const responses = await Promise.all(productPromises);

            return responses.map(res => {
                const data = res.data;
                const selectedImg = data.image1 ? data.image1 : data.image2;

                const allSpecs = [
                    { label: "Capacity", value: data.capacity },
                    { label: "Head", value: data.producthead },
                    { label: "Size", value: data.productsize },
                    { label: "Sloid Size", value: data.moc },
                    { label: "Suction Lift", value: data.applications },
                    { label: "Temperature", value: data.temperature },
                    { label: "Viscosity", value: data.viscosity },
                    { label: "shaft sealing options", value: data.shaftsealing },
                    { label: "Pressure", value: data.pressure },
                    { label: "MECHANICAL SEAL", value: data.mechanicalseal },
                    { label: "Impeller", value: data.impeller },
                    { label: "Slurry Handling", value: data.slurryhandling },
                    { label: "Submergence Length", value: data.submergenceLength },
                    { label: "Operating Frequency", value: data.operating_frequency },
                    { label: "Material", value: data.material },
                    { label: "Details", value: data.technicalDetails }
                ];

                const filteredSpecs = allSpecs.filter(spec => spec.value && spec.value.toString().trim() !== "");

                return {
                    id: data.id,
                    name: data.title,
                    slug: data.productSlug,
                    image: `${IMAGE_BASE_URL}${selectedImg}`,
                    description: data.description,
                    firstdescription: data.firstdescription,
                    isFeatured: data.isFeatured,
                    pdf: data.catelogue ? data.catelogue : null, // direct download tracking path
                    specifications: filteredSpecs
                };
            });
        } catch (err) {
            console.error(err);
            return [];
        }
    };

    const selectedCategory = applications.find((item) => item.id === activeCategory) || {};

    if (loading) {
        return (
            <section className="py-8 sm:py-14 md:py-16 lg:py-20">
                <div className="container mx-auto grid lg:grid-cols-[1.2fr_3fr] gap-5 lg:gap-7">
                    <div className="space-y-4">
                        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-4">
                        <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-40 w-full bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-8 sm:py-14 md:py-16 lg:py-20">
            <div className="container mx-auto items-start">
                <ApplicationContent
                    applicationProducts={applicationProducts}
                    products={selectedCategory.images}
                    categoryTitle={selectedCategory.title}
                    categoryDescription={selectedCategory.description}
                    faqs={applicationFaqs}
                />
            </div>
        </section>
    );
}

export default AuroApplication;