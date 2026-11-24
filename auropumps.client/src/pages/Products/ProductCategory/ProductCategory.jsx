
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../../../poweradmin/api/axios";
import { IMAGE_BASE_URL } from "../../../poweradmin/api/axios";

function ProductCategory() {
    const { categorySlug } = useParams();

    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            setLoading(true);
            setCategory(null);
            setProducts([]);

            try {
                // 1. Fetch all categories
                const categoryRes = await api.get(
                    "/ProductsCategory/category-list"
                );

                const categories = Array.isArray(categoryRes.data)
                    ? categoryRes.data
                    : categoryRes.data?.data || [];

                // 2. Find category using URL slug
                const selectedCategory = categories.find(
                    (cat) =>
                        cat.slug?.toLowerCase() ===
                        categorySlug?.toLowerCase()
                );

                if (!selectedCategory) {
                    setCategory(null);
                    return;
                }

                setCategory(selectedCategory);

                // 3. Fetch products for selected category
                const productRes = await api.get(
                    `/product/list-by-category/${selectedCategory.id}`
                );

                const productData = Array.isArray(productRes.data)
                    ? productRes.data
                    : productRes.data?.data || [];

                setProducts(productData);
            } catch (error) {
                console.error(
                    "Error fetching category products:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        if (categorySlug) {
            fetchCategoryProducts();
        }
    }, [categorySlug]);

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-[#eef2ff] py-10 sm:py-14 md:py-16 lg:py-20">

            {/* Background Effects */}
            <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>

            <div className="pointer-events-none absolute -right-24 bottom-8 h-72 w-72 rounded-full bg-[#f89b32]/15 blur-3xl"></div>

            <div className="container mx-auto px-4">

                {/* Category Title and Description */}
                <div className="mb-6 border-b border-slate-200 pb-4 p-4 sm:p-5">

                    <p className="inline-block text-[11px] sm:text-xs tracking-[0.22em] font-bold text-primary uppercase">
                        {category?.accent || "Product Category"}
                    </p>

                    <h1 className="mt-3 text-xl sm:text-3xl font-bold text-slate-900 leading-tight">
                        {category?.title || "Product Category"}
                    </h1>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                        {category?.description ||
                            category?.content ||
                            ""}
                    </p>

                </div>

                {/* Products */}
                {loading ? (
                    <p className="py-10 text-center text-slate-600">
                        Loading products...
                    </p>
                ) : !category ? (
                    <p className="py-10 text-center text-slate-600">
                        Product category not found.
                    </p>
                ) : products.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">

                        {products.map((product, index) => (
                            <Link
                                key={`${product.id}-${product.slug}`}
                                to={`/metal-pumps-manufacturer-india/${category.slug}/${product.slug}`}
                                className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_18px_38px_rgba(45,37,142,0.16)]"
                            >

                                {/* Product Image */}
                                <div
                                    className={`flex h-[190px] items-center justify-center p-4 ${index % 2 === 0
                                            ? "bg-gradient-to-b from-slate-50 to-white"
                                            : "bg-gradient-to-b from-[#f7f6ff] to-white"
                                        }`}
                                >
                                    <img
                                        src={`${IMAGE_BASE_URL}${product.image2}`}
                                        alt={product.name}
                                        className="max-h-[150px] w-auto object-contain transition duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Product Name */}
                                <div className="border-t border-slate-200 bg-white px-4 py-4">

                                    <h2 className="text-center text-[15px] font-semibold leading-snug text-slate-800">
                                        {product.name}
                                    </h2>

                                    <p className="mt-2 text-center text-[11px] font-semibold tracking-[0.12em] text-primary uppercase opacity-0 transition group-hover:opacity-100">
                                        View Details
                                    </p>

                                </div>

                            </Link>
                        ))}

                    </div>
                ) : (
                    <p className="py-10 text-center text-slate-600">
                        No products found in this category.
                    </p>
                )}

            </div>
        </section>
    );
}

export default ProductCategory;
