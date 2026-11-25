
import BannerSection from "../../components/BannerSection/BannerSection";
import FAQAccordion from "../../components/FAQ/FAQ";
import { useEffect } from "react";
import { applySeo } from "../../utils/seoHead";

const FAQ_SEO = {
    title: "Frequently Asked Questions | Auro Pumps",
    description:
        "Find answers to frequently asked questions about Auro Pumps, industrial pumps, molten metal pumps, molten salt pumps, pump specifications, certifications and enquiries.",
    keywords:
        "Auro Pumps FAQ, frequently asked questions Auro Pumps, industrial pump FAQs, vertical pumps, horizontal pumps, molten metal pumps, molten salt pumps, thermic fluid pumps, pump manufacturer India",
    canonical: "https://auropumps.com/faq",
};
function FAQ() {
    const faqGroups = [
        {
            title: "About the Company",
            questions: [
                {
                    question: "Who is Auro Pumps?",
                    answer: "Auro Pumps Pvt Ltd was founded in 1984 by Mr. Jayesh G. Desai at Palej, Bharuch, Gujarat. It was established through a technology transfer from Pompe Vergani SpA of Italy. A team of more than 70 professionals works at the company.",
                },
                {
                    question: "Where are you located?",
                    answer: "Our works are at Plot No. 104/5 & 6, G.I.D.C., Palej, Bharuch District, Gujarat, India. Our corporate office is at 309 Nilamber Primero, Vasna-Bhayli Road, Vadodara 391410, Gujarat.",
                },
                {
                    question: "Do you export?",
                    answer: "Yes. We have supplied pumps across India and exported to more than 40 countries, from the United States to New Zealand.",
                },
                {
                    question: "What certifications do you hold?",
                    answer: "We are ISO 9001:2015 certified and CE marked. Both certificates can be downloaded from our website.",
                },
                {
                    question: "How is quality ensured?",
                    answer: "Every pump is inspected at each stage of production. Machining, fabrication, assembly, testing and packing all happen in-house. Every pump is hydraulically performance-tested on our in-house testbed before dispatch.",
                },
                {
                    question: "Which industries do you serve?",
                    answer: "Our customers include steel, galvanizing, chemical, pharma, fertilizer, petrochemical, power, engineering and atomic energy organizations in India and abroad.",
                },
            ],
        },
        {
            title: "Products",
            questions: [
                {
                    question: "What product categories do you offer?",
                    answer: "We offer four categories: vertical pumps, horizontal pumps, molten metal equipment and molten salt equipment.",
                },
                {
                    question: "What is the ACCV extended shaft vertical submerged pump?",
                    answer: "The ACCV is a single-stage centrifugal pump with downward axial suction and upward radial discharge. It comes in over 36 model sizes. The submergence length is customizable using single or multiple intermediate bearings. The base plate can be shaped to fit your tank or vessel.",
                },
                {
                    question: "Which pump should I use for abrasive or solids-laden liquids?",
                    answer: "The ACCV-C cantilever pump. It has no submerged bearing or sleeve assembly, which is prone to wear. It can handle liquids with up to 60% solids concentration over a wide range of particle sizes.",
                },
                {
                    question: "Which pumps handle liquids that crystallize?",
                    answer: "The ACCV-J (vertical) and ACC-J (horizontal end suction) jacketed pumps. The jacketing stops the liquid from crystallizing inside the pump. Semi-open or open impellers prevent choking, and single or double mechanical seals are available.",
                },
                {
                    question: "Do you make pumps for highly corrosive liquids?",
                    answer: "Yes. The APPV (vertical) and APP (horizontal) series are non-metallic. APP pumps have all wetted parts in injection-moulded polypropylene, rated up to 80°C, with strong resistance to acids, alkalis and solvents. They are used in the chemical, pharma and fertilizer industries.",
                },
                {
                    question: "What are ACC end suction pumps?",
                    answer: "ACC pumps are single-stage centrifugal pumps in over 39 model sizes. They follow ISO 2858, ISO 5199 and DIN 24256 and have a back pull-out design for lower maintenance downtime. They are used in applications from water treatment to fertilizers, chemicals and nuclear.",
                },
                {
                    question: "What is the difference between ACTF and ACCTF thermic fluid pumps?",
                    answer: `
        <ul class="list-disc pl-5 space-y-2">
            <li>
                <strong>ACTF (air-cooled):</strong> a built-in heat barrier protects the seal and bearings, so no water cooling is needed. Rated up to 350&deg;C. Single or double mechanical seals or metal bellow seals are available, along with a vertical inline variant.
            </li>
            <li>
                <strong>ACCTF (water-cooled):</strong> for temperatures beyond the range of air-cooled pumps, up to 410&deg;C.
            </li>
        </ul>
    `,
                },
                {
                    question: "Which pumps are self-priming?",
                    answer: "The ASP non-clog self-priming pump handles clean and contaminated liquids. An oil bath on the seal side prevents dry running. The VA multistage self-priming pump has a maximum suction capacity of 5 MWC.",
                },
                {
                    question: "What other horizontal and inline pumps do you make?",
                    answer: `
        <ul class="list-disc pl-5 space-y-1">
            <li>
                <strong>ACM:</strong> heavy-duty close-coupled pumps.
            </li>
            <li>
                <strong>ACVI:</strong> vertical inline pumps, used as booster pumps or where space is limited.
            </li>
            <li>
                <strong>PN:</strong> multistage high-pressure pumps for heads of 100 m and above (boiler feed, descaling, reverse osmosis, firefighting).
            </li>
        </ul>
    `,
                },
                {
                    question: "Do you offer magnetic drive pumps?",
                    answer: "Yes, in horizontal (ACMAG) and vertical (ACVMAG) versions. Please contact our sales team for specifications.",
                },
            ],
        },
        {
            title: "Molten Metal Equipment",
            questions: [
                {
                    question: "What are AMZ pumps used for?",
                    answer: "AMZ pumps handle molten zinc and Galvalume. They are used for transfer, furnace emptying, forced circulation in the furnace pot, snout de-drossing in continuous galvanizing lines, zinc smelting and recycling, die-casting lines, ingot casting and hot-dip galvanizing.",
                },
                {
                    question: "What are the AMZ pump types and ratings?",
                    answer: `
            <div class="overflow-x-auto">
                <table class="w-full min-w-[600px] border-collapse text-sm">
                    <thead>
                        <tr>
                            <th class="border border-gray-300 px-2 py-2 text-left">Type</th>
                            <th class="border border-gray-300 px-2 py-2 text-left">Temperature</th>
                            <th class="border border-gray-300 px-2 py-2 text-left">Capacity</th>
                            <th class="border border-gray-300 px-2 py-2 text-left">Immersion</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border border-gray-300 px-2 py-2">Transfer pumps</td>
                            <td class="border border-gray-300 px-2 py-2">Up to 600&deg;C</td>
                            <td class="border border-gray-300 px-2 py-2">Up to 300 tons/hr (higher on request)</td>
                            <td class="border border-gray-300 px-2 py-2">Up to 3.5 m</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 px-2 py-2">Circulation / snout pumps</td>
                            <td class="border border-gray-300 px-2 py-2">Up to 650&deg;C</td>
                            <td class="border border-gray-300 px-2 py-2">Up to 250 tons/hr (higher on request)</td>
                            <td class="border border-gray-300 px-2 py-2">Up to 1 m</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `,
                },
                {
                    question: "What are AML pumps used for?",
                    answer: "AML pumps handle molten lead and tin. They are used in transfer and emergency pump-out, forced circulation in furnaces, lead recycling plants, smelting and ingot casting lines, wire and strip patenting furnaces, die-casting lines and nuclear-sector R&D systems.",
                },
                {
                    question: "What are AAG molten lead agitators?",
                    answer: `
            <p class="mb-3">
                Immersion agitators for mixing and blending in lead and non-ferrous refinery kettles. Features:
            </p>
            <ul class="list-disc pl-5 space-y-1">
                <li>3- or 4-blade propellers</li>
                <li>VFD speed control</li>
                <li>Operating range of 330&deg;C to 700&deg;C</li>
            </ul>
        `,
                },
                {
                    question: "What is the ADG pneumatic dross grabber?",
                    answer: "A pneumatically operated clamshell grab that removes dross from galvanizing kettles while returning free zinc to the bath. Its flaps are perforated, it won't crush objects caught in the flaps, and it is built to order for deep kettles. It keeps operators away from the molten surface.",
                },
            ],
        },
        {
            title: "Molten Salt",
            questions: [
                {
                    question: "Why use molten salt as a heat transfer fluid?",
                    answer: "Molten salt systems operate from 200&deg;C to 1,100&deg;C depending on the formulation. Above 350&deg;C it is the medium of choice, because water becomes uneconomical above 200&deg;C and thermal oils degrade above 350&deg;C.",
                },
                {
                    question: "What molten salt pumps do you supply?",
                    answer: "ACCV molten salt pumps, made from proprietary engineered materials, for up to 800&deg;C. They are used in the chemical, solar and nuclear sectors. We have also developed a 2 KL pilot molten salt loop and a portable lab-scale loop for R&D.",
                },
                {
                    question: "Can you pump molten sulfur, sulfuric acid, solvents and caustic soda?",
                    answer: "Yes. We build pumps for molten sulfur, sulfuric acid and oleum, solvents and caustic soda, with materials, sealing and thermal design matched to each duty.",
                },
            ],
        },
        {
            title: "Enquiries",
            questions: [
                {
                    question: "Can you customize a pump?",
                    answer: "Yes. Submergence length, base plate shape, materials, seals and kettle-specific equipment can be customized.",
                },
                {
                    question: "What should I send with an enquiry?",
                    answer: "Please send the fluid, operating temperature, flow rate, head, pump type or installation constraints, and quantity.",
                },
                {
                    question: "How do I contact you?",
                    answer: `
            <ul class="list-disc pl-5 space-y-1">
                <li>
                    Email:
                    <a href="mailto:sales@auropumps.com" class="hover:text-[#2D258E] hover:underline">
                        sales@auropumps.com
                    </a>
                </li>
                <li>
                    Phone:
                    <a href="tel:+919227227768" class="hover:text-[#2D258E] hover:underline">
                        +91 92272 27768
                    </a>,
                    <a href="tel:+918866927768" class="hover:text-[#2D258E] hover:underline">
                        +91 88669 27768
                    </a>
                    or
                    <a href="tel:+919727955542" class="hover:text-[#2D258E] hover:underline">
                        +91 97279 55542
                    </a>
                </li>
                <li>
                    Or use the
                        contact form
                    on the website.
                </li>
            </ul>
        `,
                },
            ],
        },
    ];

    useEffect(() => {
        applySeo(FAQ_SEO);
    }, []);

    useEffect(() => {
        const script = document.createElement("script");

        script.type = "application/ld+json";
        script.id = "faq-page-schema";

        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Who is Auro Pumps?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Auro Pumps Pvt Ltd was founded in 1984 by Mr. Jayesh G. Desai at Palej, Bharuch, Gujarat. It was established through a technology transfer from Pompe Vergani SpA of Italy. A team of more than 70 professionals works at the company."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Where are you located?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Our works are at Plot No. 104/5 & 6, G.I.D.C., Palej, Bharuch District, Gujarat, India. Our corporate office is at 309 Nilamber Primero, Vasna-Bhayli Road, Vadodara 391410, Gujarat."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Do you export?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. We have supplied pumps across India and exported to more than 40 countries, from the United States to New Zealand."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What certifications do you hold?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We are ISO 9001:2015 certified and CE marked. Both certificates can be downloaded from our website."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How is quality ensured?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Every pump is inspected at each stage of production. Machining, fabrication, assembly, testing and packing all happen in-house. Every pump is hydraulically performance-tested on our in-house testbed before dispatch."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Which industries do you serve?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Our customers include steel, galvanizing, chemical, pharma, fertilizer, petrochemical, power, engineering and atomic energy organizations in India and abroad."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What product categories do you offer?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We offer four categories: vertical pumps, horizontal pumps, molten metal equipment and molten salt equipment."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is the ACCV extended shaft vertical submerged pump?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The ACCV is a single-stage centrifugal pump with downward axial suction and upward radial discharge. It comes in over 36 model sizes. The submergence length is customizable using single or multiple intermediate bearings, and the base plate can be shaped to fit your tank or vessel."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Which pump should I use for abrasive or solids-laden liquids?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The ACCV-C cantilever pump. It has no submerged bearing or sleeve assembly, which is prone to wear. It can handle liquids with up to 60% solids concentration over a wide range of particle sizes."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Which pumps handle liquids that crystallize?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The ACCV-J (vertical) and ACC-J (horizontal end suction) jacketed pumps. The jacketing stops the liquid from crystallizing inside the pump. Semi-open or open impellers prevent choking, and single or double mechanical seals are available."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Do you make pumps for highly corrosive liquids?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. The APPV (vertical) and APP (horizontal) series are non-metallic. APP pumps have all wetted parts in injection-moulded polypropylene, rated up to 80°C, with strong resistance to acids, alkalis and solvents. They are used in the chemical, pharma and fertilizer industries."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What are ACC end suction pumps?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "ACC pumps are single-stage centrifugal pumps in over 39 model sizes. They follow ISO 2858, ISO 5199 and DIN 24256 and have a back pull-out design for lower maintenance downtime. They are used in applications from water treatment to fertilizers, chemicals and nuclear."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is the difference between ACTF and ACCTF thermic fluid pumps?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "ACTF pumps are air-cooled, with a built-in heat barrier that protects the seal and bearings so no water cooling is needed. They are rated up to 350°C. ACCTF pumps are water-cooled and handle temperatures beyond the range of air-cooled pumps, up to 410°C."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Which pumps are self-priming?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The ASP non-clog self-priming pump handles clean and contaminated liquids, with an oil bath on the seal side to prevent dry running. The VA multistage self-priming pump has a maximum suction capacity of 5 MWC."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Do you offer magnetic drive pumps?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, in horizontal (ACMAG) and vertical (ACVMAG) versions. Please contact our sales team for specifications."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What are AMZ pumps used for?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "AMZ pumps handle molten zinc and Galvalume. They are used for transfer, furnace emptying, forced circulation in the furnace pot, snout de-drossing in continuous galvanizing lines, zinc smelting and recycling, die-casting lines, ingot casting and hot-dip galvanizing."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What are the AMZ pump types and ratings?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "AMZ transfer pumps operate up to 600°C with capacity up to 300 tons/hr (higher on request) and immersion up to 3.5 m. AMZ circulation and snout pumps operate up to 650°C with capacity up to 250 tons/hr (higher on request) and immersion up to 1 m."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What are AML pumps used for?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "AML pumps handle molten lead and tin. They are used in transfer and emergency pump-out, forced circulation in furnaces, lead recycling plants, smelting and ingot casting lines, wire and strip patenting furnaces, die-casting lines and nuclear-sector R&D systems."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What are AAG molten lead agitators?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Immersion agitators for mixing and blending in lead and non-ferrous refinery kettles. They have 3- or 4-blade propellers, VFD speed control and an operating range of 330°C to 700°C."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is the ADG pneumatic dross grabber?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A pneumatically operated clamshell grab that removes dross from galvanizing kettles while returning free zinc to the bath. Its flaps are perforated, it will not crush objects caught in the flaps, and it is built to order for deep kettles. It keeps operators away from the molten surface."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Why use molten salt as a heat transfer fluid?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Molten salt systems operate from 200°C to 1,100°C depending on the formulation. Above 350°C it is the medium of choice, because water becomes uneconomical above 200°C and thermal oils degrade above 350°C."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What molten salt pumps do you supply?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "ACCV molten salt pumps, made from proprietary engineered materials, for up to 800°C. They are used in the chemical, solar and nuclear sectors. We have also developed a 2 KL pilot molten salt loop and a portable lab-scale loop for R&D."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Can you pump molten sulfur, sulfuric acid, solvents and caustic soda?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. We build pumps for molten sulfur, sulfuric acid and oleum, solvents and caustic soda, with materials, sealing and thermal design matched to each duty."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Can you customize a pump?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. Submergence length, base plate shape, materials, seals and kettle-specific equipment can be customized."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What should I send with an enquiry?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Please send the fluid, operating temperature, flow rate, head, pump type or installation constraints, and quantity."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How do I contact Auro Pumps?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Email sales@auropumps.com or call +91 92272 27768, +91 88669 27768 or +91 97279 55542. You can also use the contact form on the website."
                    }
                }
            ]
        };

        script.textContent = JSON.stringify(faqSchema);

        // Remove any existing FAQ schema to avoid duplicates
        const existingScript = document.getElementById("faq-page-schema");
        if (existingScript) {
            existingScript.remove();
        }

        document.head.appendChild(script);

        return () => {
            const schemaScript = document.getElementById("faq-page-schema");
            if (schemaScript) {
                schemaScript.remove();
            }
        };
    }, []);

    return (
        <>
            <BannerSection title="Frequently Asked Questions" />

            <section className="py-10">
                <div className="container mx-auto">
                    <FAQAccordion faqGroups={faqGroups} />
                </div>
            </section>
        </>
    );
}
export default FAQ;
