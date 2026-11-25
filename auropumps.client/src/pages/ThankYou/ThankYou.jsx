import { useEffect } from "react";
import BannerSection from "../../components/BannerSection/BannerSection";
import { applySeo } from "../../utils/seoHead";

const THANK_YOU_SEO = {
    title: "Thank You | Auro Pumps",
    description:
        "Thank you for contacting Auro Pumps. We have received your enquiry and our team will get back to you shortly.",
    keywords:
        "Auro Pumps thank you, Auro Pumps enquiry confirmation, contact Auro Pumps, industrial pump enquiry, pump manufacturer India",
    canonical: "https://auropumps.com/thank-you",
};

function ThankYou() {

    // 🔥 Scroll to top when page loads
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant" // you can use "smooth" if you want animation
        });
    }, []);

    useEffect(() => {
        applySeo(THANK_YOU_SEO);
    }, []);

    return (
        <>
            <BannerSection
                title="Thank You"
                />
            <section className="bg-gray-50 flex items-center justify-center px-4 py-10 sm:py-14 md:py-16 lg:py-100">
                <div className="bg-white rounded-2xl border border-gray-200 w-full max-w-2xl text-center px-6 sm:px-12 py-12 sm:py-16 shadow-sm">

                    {/* Heading */}
                    <h1 className="text-2xl sm:text-3xl md:text-3xl font-semibold text-gray-444444 leading-tight mb-6">
                        Thank you for getting in touch!
                    </h1>

                    {/* Message */}
                    <div className="space-y-3 text-gray-444444 text-sm sm:text-base md:text-lg">
                        <p>
                            We have received your mail and we will revert back to you.
                        </p>

                        <p>
                            Have a great day!
                        </p>
                    </div>

                    {/* Company */}
                    <h2 className="mt-10 text-lg sm:text-xl md:text-2xl font-semibold text-primary">
                        - Auro Pumps
                    </h2>

                </div>
            </section>
        </>
    );
}

export default ThankYou;
