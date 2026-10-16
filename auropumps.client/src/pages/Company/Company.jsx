import BannerSection from "../../components/BannerSection/BannerSection";
import CompanyIntro from "../../components/CompanyPage/CompanyIntro";
import Infrastructure from "../../components/CompanyPage/Infrastructure";
import IndustryTimeline from "../../components/CompanyPage/IndustryTimeline";
import { useEffect } from "react";
import { applySeo } from "../../utils/seoHead";
const HOME_SEO = {
    title: "Molten Salt Pump Manufacturer India - Auro Pumps",
    description:
        "Auro Pumps Pvt. Ltd., est. 1984 with POMPE VERGANI SpA (Italy) technology, is a leading molten salt & molten metal pump manufacturer from Gujarat, India.",
    keywords:
        "molten salt pump manufacturer, molten metal pump manufacturer, snout pump manufacturer, pump manufacturer India since 1984, POMPE VERGANI technology, molten salt pump manufacturer with Italian technology, pump manufacturer in Gujarat India since 1984",
    canonical: "https://auropumps.com/about-molten-salt-pump-manufacturer",
};
function Company() {
    useEffect(() => {
        applySeo(HOME_SEO);
    }, []);
  return (
      <> 

          <BannerSection title="COMPANY" />
          <CompanyIntro />
          <Infrastructure />
          <IndustryTimeline />

      </>
  );
}

export default Company;
