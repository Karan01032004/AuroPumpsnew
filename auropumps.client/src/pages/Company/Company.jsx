import BannerSection from "../../components/BannerSection/BannerSection";
import CompanyIntro from "../../components/CompanyPage/CompanyIntro";
import Infrastructure from "../../components/CompanyPage/Infrastructure";
import IndustryTimeline from "../../components/CompanyPage/IndustryTimeline";
import { Helmet } from "react-helmet-async";
function Company() {
  return (
      <>
          <Helmet>
              <title>Molten Salt Pump Manufacturer India - Auro Pumps</title>

              <meta
                  name="description"
                  content="Auro Pumps Pvt. Ltd., est. 1984 with POMPE VERGANI SpA (Italy) technology, is a leading molten salt & molten metal pump manufacturer from Gujarat, India."
              />

              <meta
                  name="keywords"
                  content="molten salt pump manufacturer, molten metal pump manufacturer, snout pump manufacturer, pump manufacturer India since 1984, POMPE VERGANI technology, molten salt pump manufacturer with Italian technology, pump manufacturer in Gujarat India since 1984"
              />

              <link
                  rel="canonical"
                  href="https://auropumps.com/about-molten-salt-pump-manufacturer"
              />
          </Helmet>

          <BannerSection title="COMPANY" />
          <CompanyIntro />
          <Infrastructure />
          <IndustryTimeline />

      </>
  );
}

export default Company;