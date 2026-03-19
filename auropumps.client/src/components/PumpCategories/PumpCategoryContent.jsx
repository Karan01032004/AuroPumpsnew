import { Link } from "react-router-dom";
import ThemeButton from "../../components/ThemeButton";
export default function PumpCategoryContent({ data }) {
    return (
        <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-14 items-start">

                {/* LEFT SIDE */}
                <div>

                    <h3 className="text-lg lg:text-2xl font-semibold mb-2 lg:mb-4 text-primary">
                        {data.title}
                    </h3>

                    <div className="flex gap-3 lg:mb-6 flex-wrap">

                        {data.products?.map((product) => (

                            <Link
                                key={product.id}
                                to={`/application/${data.slug}/${product.slug}`}
                                className="inline-block uppercase px-4 py-1.5 rounded-full border border-primary text-gray text-md font-semibold bg-white"
                            >
                                {product.name}
                            </Link>

                        ))}
                    </div>
                    <div className="flex lg:hidden justify-center w-full">
                        <img
                            src={data.products?.[0]?.image}
                            alt={data.title}
                            className="w-full max-w-[460px] h-auto max-h-[420px] object-contain my-4"
                        />

                    </div>

                    {/* Description */}
                    <p className="text-gray leading-relaxed mb-3 md:mb-6">
                        {data.description}
                    </p>

                    <ThemeButton
                        text="KNOW MORE"
                        link={`/application/${data.slug}/${data.products?.[0]?.slug}`}
                        className="uppercase text-sm font-medium self-start md:self-auto"
                    />

                </div>

                {/* RIGHT SIDE */}
                <div className="hidden lg:flex justify-center w-full">

                    <img
                        src={data.image}
                        alt={data.title}
                        className="w-full max-w-[460px] h-auto max-h-[420px] object-contain"
                    />

                </div>
            </div>
        </div>
    );
}