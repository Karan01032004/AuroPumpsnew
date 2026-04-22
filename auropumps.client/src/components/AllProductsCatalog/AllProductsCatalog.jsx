import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../poweradmin/api/axios"; // axios instance
import { IMAGE_BASE_URL } from "../../poweradmin/api/axios";

const AllProductsCatalog = () => {

    const [categories, setCategories] = useState([]);
    const [productsMap, setProductsMap] = useState({}); // { categoryId: products[] }
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get("/ProductsCategory/category-list");

                const data = Array.isArray(res.data)
                    ? res.data
                    : res.data?.data || [];

                setCategories(data);

                // ?? 2. Har category ke products fetch karo
                data.forEach(async (cat) => {
                    try {
                        const prodRes = await api.get(`/product/list-by-category/${cat.id}`);

                        setProductsMap(prev => ({
                            ...prev,
                            [cat.id]: prodRes.data
                        }));

                    } catch (err) {
                        console.log(err);
                    }
                });

            } catch (err) {
                console.log(err);
            }
        };

        fetchCategories();
    }, []);

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-[#eef2ff] py-10 sm:py-14 md:py-16 lg:py-20">
            <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
            <div className="pointer-events-none absolute -right-24 bottom-8 h-72 w-72 rounded-full bg-[#f89b32]/15 blur-3xl"></div>

            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-[11px] tracking-[0.22em] font-semibold text-primary uppercase">
                        Product Portfolio
                    </span>
                    <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                        Explore All Product Categories
                    </h2>
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                    {/*{allProductsData.map((category) => (*/}
                    {/*    <a*/}
                    {/*        key={`chip-${category.id}`}*/}
                    {/*        href={`#${category.id}`}*/}
                    {/*        className="rounded-full border border-primary/20 bg-white px-4 py-2 text-[11px] font-semibold tracking-[0.1em] text-primary uppercase transition hover:border-primary/40 hover:bg-primary/5"*/}
                    {/*    >*/}
                    {/*        {category.title}*/}
                    {/*    </a>*/}
                    {/*))}*/}
                    {categories.map((category) => (
                        <a
                            key={`chip-${category.id}`}
                            href={`#${category.slug}`}
                            className="rounded-full border border-primary/20 bg-white px-4 py-2 text-[11px] font-semibold tracking-[0.1em] text-primary uppercase transition hover:border-primary/40 hover:bg-primary/5"
                        >
                            {category.title}
                        </a>
                    ))}
                </div>

                <div className="mt-10 space-y-10">
                    {categories.map((category, index) => (
                        <article
                            id={category.slug}
                            key={category.id}
                            className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_16px_44px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-6"
                        >   
                            <div className="mb-6 mb-5 border-b border-slate-200 pb-4 p-4 sm:p-5">
                                <p className="inline-block text-[11px] sm:text-xs tracking-[0.22em] font-bold text-primary uppercase">
                                    {category.accent || "Category"}
                                </p>
                                <h3 className="mt-3 text-3xl sm:text-3xl font-bold text-slate-900 leading-tight">
                                    {category.title}
                                </h3>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {(productsMap[category.id] || []).map((product) => (
                                    <Link
                                        key={`${category.id}-${product.slug}-${product.name}`}
                                        to={`/products/${category.slug}/${product.slug}`} // ? s
                                        className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_18px_38px_rgba(45,37,142,0.16)]"
                                    >
                                        <div className={`flex h-[190px] items-center justify-center p-4 ${index % 2 === 0 ? "bg-gradient-to-b from-slate-50 to-white" : "bg-gradient-to-b from-[#f7f6ff] to-white"}`}>
                                            <img
                                                src={`${IMAGE_BASE_URL}${product.image2}`} // ?? image2 already mapped
                                                alt={product.name} 
                                                className="max-h-[150px] w-auto object-contain transition duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        </div>

                                        <div className="border-t border-slate-200 bg-white px-4 py-4">
                                            <h4 className="text-center text-[15px] font-semibold leading-snug text-slate-800">
                                                {product.name}
                                            </h4>
                                            <p className="mt-2 text-center text-[11px] font-semibold tracking-[0.12em] text-primary uppercase opacity-0 transition group-hover:opacity-100">
                                                View Details
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default AllProductsCatalog;
