import BannerSection from "../../components/BannerSection/BannerSection";
import CompanyIntro from "../../components/CompanyPage/CompanyIntro";
import Infrastructure from "../../components/CompanyPage/Infrastructure";
import IndustryTimeline from "../../components/CompanyPage/IndustryTimeline";
function Company() {
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