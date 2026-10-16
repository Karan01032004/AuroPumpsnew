import BannerSection from "../../components/BannerSection/BannerSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import { applySeo } from "../../utils/seoHead";
import { useEffect } from "react";
const HOME_SEO = {
    title: "Molten Metal & Salt Pump Manufacturer in India",
    description:
        "Contact Auro Pumps, Palej, Gujarat for molten salt pumps, molten metal pumps, cantilever pumps & magnetic drive pumps manufacturing enquiries.",
    keywords:
        "cantilever pumps manufacturer contact, magnetic drive pumps manufacturer contact, Auro Pumps contact, pump manufacturer India contact, molten salt and metal pump manufacturer contact India, get quote for cantilever and magnetic drive pumps",
    canonical: "https://auropumps.com/contact-us-for-molten-metal-pumps",
};
function ContactUs() {
    useEffect(() => {
        applySeo(HOME_SEO);
    }, []);
  return (
      <>
            
          <BannerSection title="CONTACT US" />
          <ContactSection />

      </>
  );
}

export default ContactUs;
