import BannerSection from "../../components/BannerSection/BannerSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import { Helmet } from "react-helmet-async";
function ContactUs() {
  return (
      <>
          <Helmet>
              <title>Molten Metal & Salt Pump Manufacturer in India</title>

              <meta
                  name="description"
                  content="Contact Auro Pumps, Palej, Gujarat for molten salt pumps, molten metal pumps, cantilever pumps & magnetic drive pumps manufacturing enquiries."
              />

              <meta
                  name="keywords"
                  content="cantilever pumps manufacturer contact, magnetic drive pumps manufacturer contact, Auro Pumps contact, pump manufacturer India contact, molten salt and metal pump manufacturer contact India, get quote for cantilever and magnetic drive pumps"
              />

              <link
                  rel="canonical"
                  href="https://auropumps.com/contact-us-for-molten-metal-pumps"
              />
          </Helmet>

          <BannerSection title="CONTACT US" />
          <ContactSection />

      </>
  );
}

export default ContactUs;