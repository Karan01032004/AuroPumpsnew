import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CategorySidebar from "./CategorySidebar";
import ApplicationContent from "./ApplicationContent";
import { useNavigate } from "react-router-dom";
import api from "../../poweradmin/api/axios"; 
import { IMAGE_BASE_URL } from "../../poweradmin/api/axios";
function AuroApplication() {

    const { categoryId, productId } = useParams();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
 
    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
       
        const loadApplications = async () => {
            setLoading(true);
            try {
                const res = await api.get("/application/list");

                const formatted = res.data.map(app => ({
                    id: app.id,
                    title: app.title,
                    slug: app.title
                        ?.toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, ""),
                    description: app.description,
                    product_ids: app.product_ids,

                    images: [
                        app.image1,
                        app.image2,
                        app.image3,
                        app.image4,
                        app.image5,
                        app.image6,
                        app.image7,
                        app.image8
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
    useEffect(() => {
        if (loading) return;
        if (!applications.length) return;

        const init = async () => {

            if (categoryId && productId) {

                const category = applications.find(
                    (cat) => cat.slug === categoryId
                );

                if (category) {

                    setActiveCategory(category.id);

                    let products = category.products;

                    if (!products || products.length === 0) {
                        products = await loadProductsByIds(category.product_ids);

                        setApplications(prev =>
                            prev.map(c =>
                                c.id === category.id
                                    ? { ...c, products }
                                    : c
                            )
                        );
                    }

                    const product = products.find(
                        (p) => p.slug === productId
                    );

                    setSelectedProduct(product || products[0]);
                }

            } else if (!categoryId && applications.length > 0) {

                const firstCategory = applications[0];
                const products = await loadProductsByIds(firstCategory.product_ids);

                if (products.length > 0) {
                    navigate(`/application/${firstCategory.slug}/${products[0].slug}`, { replace: true });
                }
            }
        };

        init();

    }, [categoryId, productId, loading, applications]);
    const loadProductsByIds = async (ids) => {
    
        try {
            const idsArray = ids?.split(",").map(x => x.trim());
            const productPromises = idsArray.map(id => api.get(`/product/${id}`));
            const responses = await Promise.all(productPromises);

            return responses.map(res => {
                const data = res.data;

                // 🔥 Logic 1: Image 1 agar hai toh wo, nahi toh Image 2
                const selectedImg = data.image1 ? data.image1 : data.image2;

                // 🔥 Logic 2: Specifications filter (sirf wo jinme value ho)
                const allSpecs = [
                    { label: "Capacity", value: data.capacity },
                    { label: "Head", value: data.producthead },
                    { label: "Size", value: data.productsize },
                    { label: "Temperature", value: data.temperature },
                    { label: "Viscosity", value: data.viscosity },
                    { label: "Submergence Length", value: data.SubmergenceLength },
                    { label: "Operating Frequency", value: data.operating_frequency },
                    { label: "Material", value: data.material }
                ];

                // Filter out null, undefined, or empty strings
                const filteredSpecs = allSpecs.filter(spec => spec.value && spec.value.toString().trim() !== "");

                return {
                    id: data.id,
                    name: data.title,
                    slug: data.productSlug,
                    image: `${IMAGE_BASE_URL}${selectedImg}`,
                    description: data.description,
                    // Agar catelogue null ya empty hai toh pdf null rakhein
                    pdf: data.catelogue ? `${IMAGE_BASE_URL}${data.catelogue}` : null,
                    specifications: filteredSpecs
                };
            });
        } catch (err) {
            console.error(err);
            return [];
        }
         
    };
    const selectedCategory = applications.find(
        (item) => item.id === activeCategory
    )     || {};
    //if (loading) return <div>Loading...</div>;
    //if (!selectedCategory || !selectedProduct) return null;
    if (loading) {
        return (
            <section className="py-8 sm:py-14 md:py-16 lg:py-20">
                <div className="container mx-auto grid lg:grid-cols-[1.2fr_3fr] gap-5 lg:gap-7">

                    {/* Sidebar Skeleton */}
                    <div className="space-y-4">
                        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-6 w-28 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                    {/* Content Skeleton */}
                    <div className="space-y-4">
                        <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-40 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                </div>
            </section>
        );
    }
    //if (!selectedCategory || !selectedProduct) {
    //    return <div className="p-6">No data found</div>;
    //}
    return (

        <section className="py-8 sm:py-14 md:py-16 lg:py-20">

            <div className="container mx-auto grid lg:grid-cols-[1.2fr_3fr] gap-5 lg:gap-7 items-start">

                <CategorySidebar
                    categories={applications}
                    activeCategory={activeCategory} 
                    setActiveCategory={setActiveCategory}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                    loadProductsByIds={loadProductsByIds}   // ✅ ADD THIS
                    setApplications={setApplications}  
                />

                <ApplicationContent
                    product={selectedProduct}
                    products={selectedCategory.images}
                    categoryTitle={selectedCategory.title}
                    categoryDescription={selectedCategory.description}
                />

            </div>

        </section>
    );
}

export default AuroApplication;