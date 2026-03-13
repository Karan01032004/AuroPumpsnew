export default function PumpCategoryContent({ data }) {
    return (
        <>
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-14 items-start">

                    {/* LEFT SIDE */}
                    <div>

                        <h3 className="text-lg lg:text-2xl font-semibold mb-2 lg:mb-4 text-primary">
                            {data.title}
                        </h3>

                        {/* Tags */}
                        <div className="flex gap-3 mb-3 lg:mb-6">
                            {data.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="border border-gray-400 px-3 py-1 rounded-full text-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
     
                        {/* Applications */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">

                            {data?.applications?.map((app, index) => (
                                <div
                                    key={index}
                                    className="bg-primary text-white text-md p-2 lg:p-3 text-center flex items-center justify-center"
                                >
                                    {app}
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center justify-center gap-4">
                        <img
                            src={data.mainImage}
                            alt="pump"
                            className="w-[70%] sm:w-[75%] lg:max-w-[460px] h-auto object-contain"
                        />

                        <img
                            src={data.sideImage}
                            alt="vertical pump"
                            className="w-[30%] sm:w-[25%] lg:max-w-[180px] h-auto object-contain"
                        />

                    </div>
                </div>
            </div>
        </>
    );
}