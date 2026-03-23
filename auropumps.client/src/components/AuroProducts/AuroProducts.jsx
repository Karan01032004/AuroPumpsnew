import { useState, useEffect } from "react";
import ProductSidebar from "./ProductSidebar";
import ProductContent from "./ProductContent";
 
import api from "../../poweradmin/api/axios";
import { useParams } from "react-router-dom";
 
function AuroProducts() {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    //const { id } = useParams();
    const { categorySlug, productSlug } = useParams();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const selectedCategory = categories.find(
        (cat) => cat.id === activeCategory
    );
    // 1. Helper function for Product Details (Isse Sidebar bhi use kar sakega)
    const fetchProductDetails = async (id) => {
        if (!id) return;
        try {
            const res = await api.get(`/product/${id}`);
            const data = res.data;
            setSelectedProduct({
                id: data.id,
                name: data.title,
                image: data.image1 || data.image2,
                //image: data.image1,
                pdf: data.catelogue,
                description: data.description,
                specifications: [
                    { label: "Capacity", value: data.capacity },
                    { label: "Head", value: data.producthead },
                    { label: "Size", value: data.productsize },
                    { label: "Temperature", value: data.temperature },
                    { label: "Viscosity", value: data.viscosity },
                    { label: "Submergence Length", value: data.SubmergenceLength },
                    { label: "Operating Frequency", value: data.operating_frequency },
                    { label: "Material", value: data.material }
                ]   
            });
        } catch (err) { console.error(err); }
    };
    useEffect(() => {
        if (!categories.length || !categorySlug) return;

        const matchedCategory = categories.find(
            cat => cat.slug === categorySlug
        );

        if (matchedCategory) {
            setActiveCategory(matchedCategory.id);
        }
    }, [categories, categorySlug]);
    useEffect(() => {
        if (!products.length || !productSlug) return;

        const matchedProduct = products.find(
            p => p.slug?.toLowerCase() === productSlug?.toLowerCase()
        );

        if (matchedProduct) {
            fetchProductDetails(matchedProduct.id);
        }
    }, [products, productSlug]);
    // 2. Load Categories on Mount
    useEffect(() => {
        const loadCategories = async () => {
            setLoading(true); //   start loading
            try {
                const res = await api.get("/ProductsCategory/category-list");
                setCategories(res.data);
                if (res.data.length > 0) {
                    setActiveCategory(res.data[0].id);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false); //   stop loading
            }
        };
        loadCategories();
    }, []);
 

    // 3. Load Products when category changes
    useEffect(() => {
        if (!activeCategory) return;

        const loadProducts = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/product/list-by-category/${activeCategory}`);
                setProducts(res.data);

                if (!productSlug && res.data.length > 0) {
                    fetchProductDetails(res.data[0].id);
                }

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [activeCategory]);
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
    return (
        <section className="py-8 sm:py-14 md:py-16 lg:py-20">
            <div className="container mx-auto grid lg:grid-cols-[1.2fr_3fr] gap-5 lg:gap-7 items-start">
                <ProductSidebar
                    categories={categories}
                    products={products}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    selectedProduct={selectedProduct}
                    onProductClick={fetchProductDetails}
                />
                {/*<ProductContent product={selectedProduct} />*/}
                <ProductContent
                    product={selectedProduct}
                    categoryTitle={selectedCategory?.title}
                />
            </div>
        </section>
    );
}

export default AuroProducts;