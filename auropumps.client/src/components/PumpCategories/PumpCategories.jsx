import { useState } from "react";
import PumpTabs from "./PumpTabs";
import PumpCategoryContent from "./PumpCategoryContent";
import ThemeButton from "../../components/ThemeButton";
import applicationData from "../AuroApplication/applicationData";

export default function PumpCategories() {

    const [active, setActive] = useState(applicationData[0]);

    return (
        <section className="py-10 bg-[#F4F3FF]">

            {/* Heading */}
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
                        className="uppercase text-sm font-medium self-start md:self-auto"
                    />

                </div>
            </div>

            <PumpTabs
                data={applicationData}
                active={active}
                setActive={setActive}
            />

            <PumpCategoryContent data={active} />

        </section>
    );
}