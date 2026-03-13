import { Link } from "react-router-dom";

const BannerSection = ({ title, pageName }) => {
    return (
        <div
            className="relative w-full bg-cover bg-center py-10 sm:py-12 md:py-14 lg:py-16 text-center"
            style={{
                backgroundImage: `url(${import.meta.env.BASE_URL}/assets/images/auro-pumps-banner.png)`
            }}
        >
            <div className="container mx-auto px-4 relative">

                {/* Title */}
                <h1 className=" uppercase
                    text-xl sm:text-3xl md:text-3xl
                    font-bold mb-2 lg:mb-1 text-white ">
                    {title}
                </h1>
              
            </div>
        </div>
    );
};

export default BannerSection;