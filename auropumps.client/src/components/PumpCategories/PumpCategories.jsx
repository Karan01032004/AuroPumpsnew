import { useState, useEffect } from "react";
import PumpTabs from "./PumpTabs";
import PumpCategoryContent from "./PumpCategoryContent";
import ThemeButton from "../../components/ThemeButton";
import api from "../../poweradmin/api/axios";
import { IMAGE_BASE_URL } from "../../poweradmin/api/axios";

export default function PumpCategories() {

    const [applications, setApplications] = useState([]);
    const [active, setActive] = useState(null);

    useEffect(() => {

        const loadData = async () => {
            try {
                const res = await api.get("/application/list");

                const apps = await Promise.all(
                    res.data.map(async (app) => {

                        const idsArray = app.product_ids?.split(",").map(x => x.trim());

                        const productPromises = idsArray.map(id =>
                            api.get(`/product/${id}`)
                        );

                        const responses = await Promise.all(productPromises);

                        const products = responses.map(r => ({
                            id: r.data.id,
                            name: r.data.title,
                            slug: r.data.productSlug
                        }));

                        return {
                            id: app.id,
                            title: app.title,
                            slug: app.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                            description: app.description,
                            image: `${IMAGE_BASE_URL}${app.image1}`, //  application image
                            products
                        };
                    })
                );

                setApplications(apps);
                setActive(apps[0]);

            } catch (err) {
                console.error(err);
            }
        };

        loadData();

    }, []);

    if (!active) return null;

    return (
        <section className="py-10 bg-[#F4F3FF]">

            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-3 lg:mb-5">

                    <div>
                        <p className="text-lg font-medium text-primary uppercase">
                            APPLICATIONS
                        </p>

                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-2 text-secondary">
                            Pumps You Can Trust
                        </h2>
                    </div>

                    <ThemeButton
                        text="LEARN MORE"
                        link="application"
                    />
                </div>
            </div>

            <PumpTabs
                data={applications}
                active={active}
                setActive={setActive}
            />

            <PumpCategoryContent data={active} />

        </section>
    );
}