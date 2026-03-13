const applicationData = [
    {
        id: "molten-sulfur",
        title: "MOLTEN SULFER",
        products: [
            {
                id: "acc-j",
                name: "ACC-J",
                title: "MOLTEN SULFER",
                image: `${import.meta.env.BASE_URL}/assets/images/acc-j.png`,
                pdf: `${import.meta.env.BASE_URL}/assets/pdf/ACC-J & ACCV-J.pdf`,
                firstdescription:"Aumund Conveying & Construction Pvt. Ltd. (commonly abbreviated as ACC in industrial contexts) is known for manufacturing advanced material handling systems. In molten metal handling systems, ACC-type molten pumps are engineered for durability, temperature resistance, and corrosion protection.",
                description:
                    "ACC series pumps are centrifugal, single stage end suction pumps with over 39 different model sizes which provide flexibility on a wide range of duty points to satisfy varied industry requirements. Due to the versatile design of these pumps they are used across a wide spectrum of industries from water treatment to fertilizers & chemicals to nuclear applications. The back pull- out design ensures reduced maintenance downtime and costs while a sturdy bearing and shaft assembly ensures longer operating life of the pump.These pumps are in accordance with ISO2858, ISO 5199 and DIN 24256 standards.",
                specifications: [
                    { label: "Capacity", value: "up to 1000 m\u00B3/hour (higher flow rate provided on request)" },
                    { label: "Head", value: "up to 160 m" },
                    { label: "Size", value: "25 to 250 mm" },
                    { label: "Temperature", value: "-40\u00B0C to + 400\u00B0C" },
                    { label: "Viscosity", value: "up to 500 cP" },
                    { label: "Operating Frequency", value: "50 Hz and 60 Hz" },
                    { label: "Material of Construction", value: "Cast Iron, Cast Steel, WCB, WC6, WC9, CF8/CF3 (SS304/304L), CF8M/CF3M (SS316/316L), SS310, Bronze, Alloy-20, CD4MCu, CA6NM, Super Duplex Steel, Inconel, Monel, Nickel CZ-100, Hastelloy C276" }
                ]
            },

            {
                id: "acc-k",
                name: "ACCV-J",
                image: `${import.meta.env.BASE_URL}/assets/images/accv-j.png`,
                pdf: `${import.meta.env.BASE_URL}/assets/pdf/ACC-J & ACCV-J.pdf`,
                firstdescription: "ACCV-J is designed for precision inspection and monitoring in industrial environments. It is widely used for quality control, component verification, and internal visual inspection in manufacturing and engineering processes. The system helps detect defects in hard-to-reach areas, improving accuracy, efficiency, and overall product reliability.",
                description: "ACCV-J series pumps are centrifugal, single stage vertical submerged extended shaft pumps derived from our ACCV pumps. These are specially designed for handling crystalizing fluids. The fully jacketed pump assembly encompassing the volute casing, stuffing box, shaft assembly and discharge pipe ensures the liquid does not crystalize inside the pump assembly. A semi-open or open type impeller design prevents choking of the impeller vanes from the crystalizing liquid. High temperature gland packing, single or double acting mechanical seals provide reliable shaft sealing against hazardous fumes and vapor.",
                specifications: [
                    { label: "Capacity", value: "upto 1000 m\u00B3/hour" },
                    { label: "Head", value: "upto 160 m" },
                    { label: "Size", value: "25 to 250 mm" },
                    { label: "Temperature", value: "25\u00B0C to + 400\u00B0C" },
                    { label: "Submergence Length", value: "upto 6 m. Longer submergence lengths provided on request" },
                    { label: "Operating Frequency", value: "50Hz and 60Hz" },
                    { label: "Material of Construction", value: "WCB, WC6, WC9, CF8/CF3 (SS304/304L), CF8M/CF3M (SS316/316L), SS310, SS347/347H, Alloy-20, CD4MCu, CA6NM, Super Duplex Steel, Inconel, Monel, Hastelloy C276" }
                ]
            }
        ]
    },
    {
        id: "molten-zinc-galvalume",
        title: "MOLTEN ZINC & GALVALUM",
        products: [
            {
                id: "amz",
                name: "AMZ",
                image: `${import.meta.env.BASE_URL}/assets/images/acc-j.png`,
                pdf: `${import.meta.env.BASE_URL}/assets/pdf/AMZ - AML.pdf`,
                firstdescription: "Aumund Conveying & Construction Pvt. Ltd. (commonly abbreviated as ACC in industrial contexts) is known for manufacturing advanced material handling systems. In molten metal handling systems, ACC-type molten pumps are engineered for durability, temperature resistance, and corrosion protection.",
                description: "ACC series pumps are centrifugal...",
                specifications: [
                    { label: "Capacity", value: "up to 1000 m\u00B3/hour" },
                    { label: "Head", value: "up to 160 m" }
                ]
            },
        ]
    },

    {
        id: "molten-lead-tin",
        title: "MOLTEN LEAD & TIN",
        products: [
            {
                id: "aml",
                name: "AML",
                image: `${import.meta.env.BASE_URL}/assets/images/product.jpg`,
                pdf: `${import.meta.env.BASE_URL}/assets/pdf/AMZ - AML.pdf`,
                firstdescription: "Aumund Conveying & Construction Pvt. Ltd. (commonly abbreviated as ACC in industrial contexts) is known for manufacturing advanced material handling systems. In molten metal handling systems, ACC-type molten pumps are engineered for durability, temperature resistance, and corrosion protection.",
                description: "Dross grabbers are designed for efficient removal of dross and impurities from molten metal surfaces. They ensure safe handling and improved process efficiency in metal processing industries.",
                specifications: [
                    { label: "Capacity", value: "As per requirement" },
                    { label: "Material", value: "High temperature resistant steel" }
                ]
            }
        ]
    },
    {
        id: "molten-salt",
        title: "MOLTEN SALT",
        products: [
            {
                id: "accv",
                name: "ACCV",
                image: `${import.meta.env.BASE_URL}/assets/images/accv-j.png`,
                pdf: `${import.meta.env.BASE_URL}/assets/pdf/ACCV.pdf`,
                firstdescription: "ACCV pumps are centrifugal, single-stage vertical submerged pumps designed for reliable handling of molten salts and high-temperature fluids in demanding industrial applications. These pumps feature a downward axial suction and upward radial discharge, ensuring efficient fluid movement and stable operation.",
                description: "Auro's ACCV series pumps are centrifugal, single stage vertical submerged pumps with a downward axial suction and upward radial discharge. Over 36 different model sizes allow for a wide range of flexibility on duty points to satisfy varied industry requirements. The volute-impeller design is derived from our ACC series end suction pumps in accordance with ISO2858/DIN 24256 standards. The submergence length is customizable and can be extended with the use of single or multiple intermediate bearings. These intermediate radial bearings provide lateral support to the shaft and are made from various anti-friction materials which are selected in accordance with the liquid characteristics. These bearings are generally lubricated using the pumping fluid itself or, in special applications, external flushing can be provided.",
                specifications: [
                    { label: "Capacity", value: "upto 1000 m\u00B3/hour - Higher flowrate available on request" },
                    { label: "Head", value: "upto 160 m" },
                    { label: "Size", value: "25 to 250 mm" },
                    { label: "Submergence Length", value: "upto 6 m - Longer submergence length available on request" },
                    { label: "Temperature", value: "-40\u00B0C to + 600\u00B0C" },
                    { label: "Operating Frequency", value: "50Hz and 60Hz" },
                    { label: "Material of Construction", value: "Cast Iron, Cast Steel, WCB, WC6, CF8/CF3 (SS304/304L), CF8M/CF3M (SS316/316L), Alloy-20, Inconel, Monel, Nickel, Hastelloy C276" }
                ]
            },
        ]
    },
    {
        id: "sulfuric-acid",
        title: "SULFURIC ACID",
        products: [
            {
                id: "acc",
                name: "ACC",
                title: "PUMPS",
                image: `${import.meta.env.BASE_URL}/assets/images/acc-j.png`,
                pdf: `${import.meta.env.BASE_URL}/assets/pdf/ACC.pdf`,
                firstdescription: "ACC series pumps are centrifugal, single-stage end suction pumps designed for reliable performance across a wide range of industrial applications. With over 39 model sizes available, they provide flexibility for various duty conditions and process requirements.",
                description:
                    "ACC series pumps are centrifugal, single stage end suction pumps with over 39 different model sizes which provide flexibility on a wide range of duty points to satisfy varied industry requirements. Due to the versatile design of these pumps they are used across a wide spectrum of industries from water treatment to fertilizers & chemicals to nuclear applications. The back pull-out design ensures reduced maintenance downtime and costs while a sturdy bearing and shaft assembly ensures longer operating life of the pump.These pumps are in accordance with ISO2858, ISO 5199 and DIN 24256 standards.",
                specifications: [
                    { label: "Capacity", value: "up to 1000 m\u00B3/hour (higher flow rate provided on request)" },
                    { label: "Head", value: "up to 160 m" },
                    { label: "Size", value: "25 to 250 mm" },
                    { label: "Temperature", value: "-40\u00B0C to + 400\u00B0C" },
                    { label: "Viscosity", value: "up to 500 cP" },
                    { label: "Operating Frequency", value: "50 Hz and 60 Hz" },
                    { label: "Material of Construction", value: "Cast Iron, Cast Steel, WCB, WC6, WC9, CF8/CF3 (SS304/304L), CF8M/CF3M (SS316/316L), SS310, Bronze, Alloy-20, CD4MCu, CA6NM, Super Duplex Steel, Inconel, Monel, Nickel CZ-100, Hastelloy C276" }
                ]
            },
            {
                id: "accv",
                name: "ACCV",
                image: `${import.meta.env.BASE_URL}/assets/images/accv-j.png`,
                pdf: `${import.meta.env.BASE_URL}/assets/pdf/ACCV.pdf`,
                firstdescription: "ACCV pumps are centrifugal, single-stage vertical submerged pumps designed for reliable handling of molten salts and high-temperature fluids in demanding industrial applications. These pumps feature a downward axial suction and upward radial discharge, ensuring efficient fluid movement and stable operation.",
                description: "Auro's ACCV series pumps are centrifugal, single stage vertical submerged pumps with a downward axial suction and upward radial discharge. Over 36 different model sizes allow for a wide range of flexibility on duty points to satisfy varied industry requirements. The volute-impeller design is derived from our ACC series end suction pumps in accordance with ISO2858/DIN 24256 standards. The submergence length is customizable and can be extended with the use of single or multiple intermediate bearings. These intermediate radial bearings provide lateral support to the shaft and are made from various anti-friction materials which are selected in accordance with the liquid characteristics. These bearings are generally lubricated using the pumping fluid itself or, in special applications, external flushing can be provided.",
                specifications: [
                    { label: "Capacity", value: "upto 1000 m\u00B3/hour - Higher flowrate available on request" },
                    { label: "Head", value: "upto 160 m" },
                    { label: "Size", value: "25 to 250 mm" },
                    { label: "Submergence Length", value: "upto 6 m - Longer submergence length available on request" },
                    { label: "Temperature", value: "-40\u00B0C to + 600\u00B0C" },
                    { label: "Operating Frequency", value: "50Hz and 60Hz" },
                    { label: "Material of Construction", value: "Cast Iron, Cast Steel, WCB, WC6, CF8/CF3 (SS304/304L), CF8M/CF3M (SS316/316L), Alloy-20, Inconel, Monel, Nickel, Hastelloy C276" }
                ]
            },
            {
                id: "app",
                name: "APP",
                image: `${import.meta.env.BASE_URL}/assets/images/acc.png`,
                pdf: `${import.meta.env.BASE_URL}/assets/pdf/APP CATALOG.pdf`,
                firstdescription: "APP series pumps are vertical centrifugal pumps designed for efficient handling of corrosive and aggressive liquids in various industrial processes. Their vertical submerged design allows safe and reliable operation in tanks and sumps without the need for mechanical seals.",
                description: "",
                specifications: [

                ]
            },
        ]
    }
];

export default applicationData;