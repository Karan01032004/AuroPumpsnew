import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BannerSection from "../../../components/BannerSection/BannerSection";
import api, { IMAGE_BASE_URL } from "../../../poweradmin/api/axios";
import { applySeo } from "../../../utils/seoHead";

const CATEGORY_META = {
    "vertical-pumps": {
        accent: "VERTICAL PUMPS",
        title: "Vertical Submerged & Cantilever Pumps",
        description:
            "Auro Pumps engineers heavy-duty vertical pumps designed for reliable liquid transfer from deep sumps, tanks, and pits without priming issues. Available in extended-shaft submerged (ACCV), bearing-free cantilever (ACCV-C), steam-jacketed (ACCV-J), non-metallic (APPV), sealless magnetic drive (ACVMAG), and specialized molten metal configurations (AMZ & AML), our vertical range safely handles corrosive acids, abrasive slurries, and extreme high-temperature fluids across chemical, pharmaceutical, and metallurgical industries.",
        keywords:
            "vertical submerged pumps, cantilever pumps, molten metal vertical pumps, steam jacketed vertical pumps, non metallic pumps, sealless magnetic drive vertical pumps, Auro Pumps vertical pumps",
    },
    "horizontal-pumps": {
        accent: "HORIZONTAL PUMPS",
        title: "Horizontal Process & Chemical Pumps",
        description:
            "Auro Pumps manufactures a versatile portfolio of horizontal centrifugal pumps engineered for continuous, heavy-duty fluid handling across chemical, pharmaceutical, and industrial process plants. Available in back-pull-out end-suction (ACC), steam-jacketed (ACC-J), air- and water-cooled thermic fluid (ACTF & ACCTF), sealless magnetic drive (ACMAG), non-metallic polypropylene (APP), non-clog self-priming (ASP), vertical inline (ACVI), close-coupled (ACM), and high-pressure multistage (PN & VA) configurations, our horizontal range delivers leak-free reliability for corrosive chemicals, high-temperature oils, volatile solvents, and solids-laden effluents.",
        keywords:
            "horizontal process pumps, chemical pumps, end suction centrifugal pumps, steam jacketed pumps, thermic fluid pumps, magnetic drive pumps, polypropylene pumps, self priming pumps, multistage pumps",
    },
    "molten-metal-equipments": {
        accent: "MOLTEN METAL EQUIPMENTS",
        title: "Molten Metal Handling Equipment",
        description:
            "Auro Pumps engineers specialized high-temperature equipment built to withstand the extreme thermal shock, corrosion, and erosion of metallurgical operations. Our comprehensive range—including vertical molten zinc and galvalume pumps (AMZ), molten lead and tin pumps (AML), heavy-duty molten lead agitators (AAG), and pneumatic dross grabbers (ADG)—ensures safe, continuous, and efficient metal transfer, kettle agitation, and dross skimming across continuous galvanizing lines, smelting furnaces, and battery manufacturing plants.",
        keywords:
            "molten metal equipment, molten zinc pumps, galvalume pumps, molten lead pumps, molten tin pumps, molten lead agitators, pneumatic dross grabbers, metallurgical equipment India",
    },
    "molten-salt-equipments": {
        accent: "MOLTEN SALT EQUIPMENTS",
        title: "Molten Salt Pumps & Thermal Storage Systems",
        description:
            "Auro Pumps engineers ultra-high-temperature vertical pumps and integrated thermal systems designed to safely circulate nitrate and chloride molten salts in extreme thermal environments. Our reliable ACCV-C cantilever molten salt pumps and MSL skid-mounted systems provide precise thermal stability and energy storage for concentrated solar power (CSP) plants, chemical reactors, and industrial heating loops.",
        keywords:
            "molten salt pumps, thermal storage systems, cantilever molten salt pumps, MSL skid mounted systems, concentrated solar power pumps, molten salt circulation pumps",
    },
};

// Aliases
CATEGORY_META["molten-metal-equipment"] = CATEGORY_META["molten-metal-equipments"];
CATEGORY_META["molten-salt-equipment"] = CATEGORY_META["molten-salt-equipments"];

const getCategoryMeta = (slug, title) => {
    const s = String(slug || "").toLowerCase().trim();
    const t = String(title || "").toLowerCase().trim();

    if (CATEGORY_META[s]) return CATEGORY_META[s];

    if (s.includes("vertical") || t.includes("vertical")) {
        return CATEGORY_META["vertical-pumps"];
    }
    if (s.includes("horizontal") || t.includes("horizontal")) {
        return CATEGORY_META["horizontal-pumps"];
    }
    if (s.includes("metal") || t.includes("metal")) {
        return CATEGORY_META["molten-metal-equipments"];
    }
    if (s.includes("salt") || t.includes("salt")) {
        return CATEGORY_META["molten-salt-equipments"];
    }
    return null;
};

const normalize = (val) =>
    String(val || "")
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]/g, "");

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

            const initialMeta = getCategoryMeta(categorySlug);

            try {
                // 1. Fetch all categories
                const categoryRes = await api.get(
                    "/ProductsCategory/category-list"
                );

                const categories = Array.isArray(categoryRes.data)
                    ? categoryRes.data
                    : categoryRes.data?.data || [];

                const cleanSlug = normalize(categorySlug);

                // 2. Find category using URL slug / keyword
                const selectedCategory = categories.find((cat) => {
                    const catSlug = normalize(cat.slug);
                    const catTitle = normalize(cat.title);

                    return (
                        catSlug === cleanSlug ||
                        catTitle === cleanSlug ||
                        (cleanSlug.includes("vertical") && (catSlug.includes("vertical") || catTitle.includes("vertical"))) ||
                        (cleanSlug.includes("horizontal") && (catSlug.includes("horizontal") || catTitle.includes("horizontal"))) ||
                        (cleanSlug.includes("metal") && (catSlug.includes("metal") || catTitle.includes("metal"))) ||
                        (cleanSlug.includes("salt") && (catSlug.includes("salt") || catTitle.includes("salt")))
                    );
                });

                if (!selectedCategory) {
                    if (initialMeta) {
                        setCategory({
                            slug: categorySlug,
                            accent: initialMeta.accent,
                            title: initialMeta.title,
                            description: initialMeta.description,
                        });
                        applySeo({
                            title: `${initialMeta.title} | Auro Pumps`,
                            description: initialMeta.description,
                            keywords: initialMeta.keywords,
                            canonical: `https://auropumps.com/products/${categorySlug}`,
                        });
                    } else {
                        setCategory(null);
                    }
                    return;
                }

                const meta = getCategoryMeta(selectedCategory.slug, selectedCategory.title) || initialMeta;

                const enrichedCategory = {
                    ...selectedCategory,
                    accent: selectedCategory.accent || selectedCategory.category_name || selectedCategory.title || meta?.accent || "Product Category",
                    title: selectedCategory.page_title || meta?.title || selectedCategory.title || "Product Category",
                    description: (selectedCategory.description && selectedCategory.description.trim()) ? selectedCategory.description : (meta?.description || ""),
                };

                setCategory(enrichedCategory);

                applySeo({
                    title: `${enrichedCategory.title} | Auro Pumps`,
                    description: enrichedCategory.description || `${enrichedCategory.title} manufactured by Auro Pumps India.`,
                    keywords: meta?.keywords || "",
                    canonical: `https://auropumps.com/products/${selectedCategory.slug || categorySlug}`,
                });

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
                if (initialMeta) {
                    setCategory({
                        slug: categorySlug,
                        accent: initialMeta.accent,
                        title: initialMeta.title,
                        description: initialMeta.description,
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        if (categorySlug) {
            fetchCategoryProducts();
        }
    }, [categorySlug]);

    return (
       <>
            <div
                className="relative w-full bg-cover bg-center py-10 sm:py-12 md:py-14 lg:py-16 text-center"
                style={{
                    backgroundImage: `url(${import.meta.env.BASE_URL}assets/images/auro-pumps-banner.png)`
                }}
            >
                <div className="absolute inset-0 bg-black/20"></div>

                <div className="container mx-auto px-4 relative">
                    <p className="uppercase text-xl sm:text-3xl md:text-3xl font-bold mb-2 lg:mb-1 text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
                        {category?.accent || "Product Category"}
                    </p>
                </div>
            </div>
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

                        <p className="mt-3 text-sm leading-7 text-slate-600">
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
                                            src={`${IMAGE_BASE_URL}${product.image2 || product.image}`}
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

        </>
    );
}

export default ProductCategory;
