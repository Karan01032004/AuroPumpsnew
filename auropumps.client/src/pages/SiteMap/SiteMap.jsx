import BannerSection from "../../components/BannerSection/BannerSection";
import { Link } from "react-router-dom";
function SiteMap() {
  return (
      <>
          <BannerSection
              title="Sitemap"
              />
          <section className="w-full py-10 sm:py-14 md:py-16 lg:py-100">
              <div className="container mx-auto">

                  
                  {/* ================= HOME ================= */}
                  <h2 className="text-2xl font-bold text-primary mb-3">
                      <Link to="/" className="hover:underline">
                          Home
                      </Link>
                  </h2>

                  <p className="text-secondary leading-relaxed mb-3">
                      Auro Pumps is a trusted manufacturer of high-performance industrial
                      pumps designed for demanding applications across various industries.
                      With decades of engineering expertise, we specialize in developing
                      reliable pumping solutions that ensure efficiency, durability, and
                      consistent performance. Our commitment to innovation and quality
                      allows us to deliver advanced pumping technologies that support
                      industrial growth and operational excellence.
                  </p>


                  {/* ================= PRODUCTS ================= */}
                  <h2 className="text-2xl font-bold text-primary mb-3">
                      <Link to="/products" className="hover:underline">
                          Products
                      </Link>
                  </h2>

                  <p className="text-secondary leading-relaxed mb-3">
                      Auro Pumps offers a wide range of industrial pumps engineered for
                      high efficiency and reliability in critical operations. Our product
                      portfolio includes specialized pumps designed for chemical
                      processing, oil & gas, power plants, and other industrial sectors.
                      Each pump is manufactured using premium materials and advanced
                      technology to deliver superior performance, corrosion resistance,
                      and long service life.
                  </p>


                  {/* ================= APPLICATION ================= */}
                  <h2 className="text-2xl font-bold text-primary mb-3">
                      <Link to="/application" className="hover:underline">
                          Application
                      </Link>
                  </h2>

                  <p className="text-secondary leading-relaxed mb-3">
                      Our pumps are widely used across multiple industries including
                      chemical processing, petrochemical plants, power generation,
                      pharmaceuticals, steel manufacturing, and water treatment systems.
                      Auro Pumps solutions are designed to handle high temperatures,
                      corrosive fluids, and demanding industrial environments while
                      maintaining optimal efficiency and operational safety.
                  </p>


                  {/* ================= COMPANY ================= */}
                  <h2 className="text-2xl font-bold text-primary mb-3">
                      <Link to="/company" className="hover:underline">
                          Company
                      </Link>
                  </h2>

                  <p className="text-secondary leading-relaxed mb-3">
                      Established in 1984, Auro Pumps has grown into a respected name in
                      the pump manufacturing industry. Our journey is built on a strong
                      foundation of engineering excellence, continuous innovation, and
                      customer satisfaction. With modern manufacturing facilities and a
                      dedicated team of experts, we strive to deliver advanced pumping
                      solutions that meet the evolving needs of industries worldwide.
                  </p>


                  {/* ================= CONTACT ================= */}
                  <h2 className="text-2xl font-bold text-primary mb-3">
                      <Link to="/contact-us" className="hover:underline">
                          Contact
                      </Link>
                  </h2>

                  <p className="text-secondary leading-relaxed mb-3">
                      Get in touch with Auro Pumps for product inquiries, technical
                      support, or business collaborations. Our team is always ready to
                      assist you with expert guidance and customized pumping solutions
                      tailored to your industrial requirements. Contact us today to learn
                      how Auro Pumps can help improve efficiency and reliability in your
                      operations.
                  </p>

                  <ul className="space-y-6 text-sm lg:mt-5 mt-3 text-gray-333333">

                      <li className="flex items-start gap-4">
                          <span className="bg-primary p-2 rounded-full flex-shrink-0">
                              <picture>
                                  <source
                                      srcSet={`${import.meta.env.BASE_URL}/assets/images/location-icon.webp`}
                                      type="image/webp"
                                  />
                                  <img
                                      src={`${import.meta.env.BASE_URL}/assets/images/location-icon.png`}
                                      alt="Location"
                                      className="h-4 w-4 object-contain"
                                  />
                              </picture>
                          </span>
                          <span className="leading-relaxed text-secondary">
                              <h3 className="text-lg text-primary font-bold mb-1">
                                  Auro Pumps
                              </h3>
                              Plot No. 104/5 & 6<br />
                              G.I.D.C. Palej, Bharuch District, Gujarat - 392220, INDIA
                          </span>
                      </li>

                      <li className="flex items-start gap-4">

                          <span className="bg-primary p-2 rounded-full flex-shrink-0">
                              <picture>
                                  <source
                                      srcSet={`${import.meta.env.BASE_URL}/assets/images/email-icon.webp`}
                                      type="image/webp"
                                  />
                                  <img
                                      src={`${import.meta.env.BASE_URL}/assets/images/email-icon.png`}
                                      alt="Email"
                                      className="h-4 w-4 object-contain"
                                  />
                              </picture>
                          </span>

                          {/* Emails Column */}
                          <div className="flex flex-col">
                              <a
                                  href="mailto:sales@auropumps.com"
                                  className="hover:text-primary text-secondary"
                              >
                                  sales@auropumps.com
                              </a>

                              <a
                                  href="mailto:purchase@auropumps.com"
                                  className="hover:text-primary text-secondary"
                              >
                                  purchase@auropumps.com
                              </a>
                          </div>

                      </li>

                  </ul>

              </div>
          </section>
      </>
  );
}

export default SiteMap;