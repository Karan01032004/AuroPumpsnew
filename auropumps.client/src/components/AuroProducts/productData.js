const productData = [
    {
        id: "pumps",
        slug: "pumps",
        title: "PUMPS",
        products: [
            {
                id: "acc",
                slug: "acc",
                name: "ACC",
                title: "PUMPS",
                image: `${import.meta.env.BASE_URL}/assets/images/acc-j.png`,
                pdf: `${import.meta.env.BASE_URL}/assets/pdf/ACC.pdf`,
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
                id: "acc-j",
                slug: "acc-j",
                name: "ACC-J",
                title: "PUMPS",
                image: `${import.meta.env.BASE_URL}/assets/images/acc-j.png`,
                pdf: `${import.meta.env.BASE_URL}/assets/pdf/ACC-J & ACCV-J.pdf`,
                description:
                    "ACC-J series pumps are centrifugal, single stage end suction pumps derived from our ACC pumps. These are specially designed for handling crystalizing fluids. The jacketed volute casing and stuffing box design ensures that the liquid does not crystalize inside the pump assembly. A semi-open or open type impeller design prevents choking of the impeller vanes from the crystalizing liquid. Specially designed single or double acting mechanical seals provide reliable shaft sealing for such challenging applications. These pumps are in accordance with ISO2858, ISO 5199 and DIN 24256 standards.",
                specifications: [
                    { label: "Capacity", value: "up to 1000 m\u00B3/hour" },
                    { label: "Head", value: "up to 160 m" },
                    { label: "Size", value: "25 to 250 mm" },
                    { label: "Temperature", value: "-25\u00B0C to + 400\u00B0C" },
                    { label: "Operating Frequency", value: "50 Hz and 60 Hz" },
                    { label: "Material of Construction", value: "WCB, WC6, WC9, CF8/CF3 (SS304/304L), CF8M/CF3M (SS316/316L), SS310, SS347/347H, Alloy-20, CD4MCu, CA6NM, Super Duplex Steel, Inconel, Monel, Hastelloy C276" }
                ]
            },

            {
                id: "accv-j-products",
                slug: "accv-j",
                name: "ACCV-J",
                image: `${import.meta.env.BASE_URL}/assets/images/accv-j.png`,
                pdf: `${import.meta.env.BASE_URL}/assets/pdf/ACC-J & ACCV-J.pdf`,
                description: "ACCV-J series pumps are centrifugal, single stage vertical submerged extended shaft pumps derived from our ACCV pumps. These are specially designed for handling crystalizing fluids. The fully jacketed pump assembly encompassing the volute casing, stuffing box, shaft assembly and discharge pipe ensures the liquid does not crystalize inside the pump assembly. A semi-open or open type impeller design prevents choking of the impeller vanes from the crystalizing liquid. High temperature gland packing, single or double acting mechanical seals provide reliable shaft sealing against hazardous fumes and vapor.",
                specifications: [
                    { label: "Capacity", value: "upto 1000 m\u00B3/hour" },
                    { label: "Head", value: "upto 160 m" },
                    { label: "Submergence Length", value: "upto 6 m. Longer submergence lengths provided on request" },
                    { label: "Size", value: "25 to 250 mm" },
                    { label: "Temperature", value: "25\u00B0C to + 400\u00B0C" },
                    { label: "Operating Frequency", value: "50Hz and 60Hz" },
                    { label: "Material of Construction", value: "WCB, WC6, WC9, CF8/CF3 (SS304/304L), CF8M/CF3M (SS316/316L), SS310, SS347/347H, Alloy-20, CD4MCu, CA6NM, Super Duplex Steel, Inconel, Monel, Hastelloy C276" }
                ]
            },
            {
                id: "accv-product",
                slug: "accv",
                name: "ACCV",
                image: `${import.meta.env.BASE_URL}/assets/images/accv-j.png`,
                pdf: `${import.meta.env.BASE_URL}/assets/pdf/ACCV.pdf`,
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
                id: "actf-product",
                slug: "actf",
                name: "ACTF",
                image: `${import.meta.env.BASE_URL}/assets/images/acc.png`,
                pdf: `${import.meta.env.BASE_URL}/assets/pdf/ACTF & ACCTF.pdf`,
                description: "Heat transfer is a critical part of any industrial process and ACTF pumps are developed specifically for thermic fluid and hot water applications. ACTF pumps are air-cooled pumps with an in-built heat barrier that keeps away the damaging heat of the hot oil from the mechanical seal and bearings. The self-cooling design eliminates the need for expensive water cooling to the pump and reduces operational costs. The mechanical seal does not require external cooling and uses the pumped liquid for lubrication.",
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
                id: "acctf-product",
                slug: "acctf",
                name: "ACCTF",
                image: `${import.meta.env.BASE_URL}/assets/images/acc.png`,
                pdf: `${import.meta.env.BASE_URL}/assets/pdf/ACTF & ACCTF.pdf`,
                description: "ACCTF Water-cooled thermic fluid pumps are designed to handle applications that ACTF Air-cooled pumps cannot. The water-cooled assembly allows these pumps to operate at temperatures beyond the range of air-cooled pumps.",
                specifications: [
                    { label: "Capacity", value: "upto 750 m\u00B3/hour" },
                    { label: "Head", value: "upto 150 m" },
                    { label: "Pressure", value: "upto 16 bar" },
                    { label: "Size", value: "25 to 250 mm" },
                    { label: "Temperature Range", value: "upto 420\u00B0C for thermic fluids and 180\u00B0C for hot water" },
                    { label: "Operating Frequency", value: "50Hz and 60Hz" },
                    { label: "Material of Construction", value: "WCB, WC6, WC9, CF8, CF8M" },
                    { label: "Back Pull - Out Design", value: "For easy maintenance and operation" },
                    { label: "Shaft Sealing Options", value: "High temperature gland packing, single acting mechanical seal with internal flushing and double acting mechanical seal with external flushing." }
                ]
            },
            {
                id: "app",
                slug: "app",
                name: "APP",
                image: `${import.meta.env.BASE_URL}/assets/images/acc.png`,
                pdf: `${import.meta.env.BASE_URL}/assets/pdf/APP CATALOG.pdf`,
                description: "",
                specifications: [
                    
                ]
            },
        ]
    },
    {
        id: "agitators",
        slug: "agitators",
        title: "AGITATORS",
        products: [
            {
                id: "acc-j",
                slug: "acc-j",
                name: "ACC-J",
                title: "PUMPS",
                image: `${import.meta.env.BASE_URL}/assets/images/acc-j.png`,
                pdf: `${import.meta.env.BASE_URL}/assets/pdf/ACC-J & ACCV-J.pdf`,
                description:
                    "ACC-J series pumps are centrifugal, single stage end suction pumps derived from our ACC pumps. These are specially designed for handling crystalizing fluids. The jacketed volute casing and stuffing box design ensures that the liquid does not crystalize inside the pump assembly. A semi-open or open type impeller design prevents choking of the impeller vanes from the crystalizing liquid. Specially designed single or double acting mechanical seals provide reliable shaft sealing for such challenging applications. These pumps are in accordance with ISO2858, ISO 5199 and DIN 24256 standards.",
                specifications: [
                    { label: "Capacity", value: "up to 1000 m\u00B3/hour" },
                    { label: "Head", value: "up to 160 m" },
                    { label: "Size", value: "25 to 250 mm" },
                    { label: "Temperature", value: "-25\u00B0C to + 400\u00B0C" },
                    { label: "Operating Frequency", value: "50 Hz and 60 Hz" },
                    { label: "Material of Construction", value: "WCB, WC6, WC9, CF8/CF3 (SS304/304L), CF8M/CF3M (SS316/316L), SS310, SS347/347H, Alloy-20, CD4MCu, CA6NM, Super Duplex Steel, Inconel, Monel, Hastelloy C276" }
                ]
            },
        ]
    },

    {
        id: "dross-grabber",
        slug: "dross-grabber",
        title: "DROSS GRABBER",
        products: [
            {
                id: "dg-1",
                slug: "dg-1",
                name: "DG-1",
                image: `${import.meta.env.BASE_URL}/assets/images/product.jpg`,
                pdf: "#",
                description: "Dross grabbers are designed for efficient removal of dross and impurities from molten metal surfaces. They ensure safe handling and improved process efficiency in metal processing industries.",
                specifications: [
                    { label: "Capacity", value: "As per requirement" },
                    { label: "Material", value: "High temperature resistant steel" }
                ]
            }
        ]
    },
    {
        id: "molten-salt-systems",
        slug: "molten-salt-systems",
        title: "MOLTEN SALT SYSTEMS",
        products: [
            {
                id: "accv-product",
                slug: "accv",
                name: "ACCV",
                image: `${import.meta.env.BASE_URL}/assets/images/accv-j.png`,
                pdf: `${import.meta.env.BASE_URL}/assets/pdf/ACCV.pdf`,
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
        id: "molten-metal-systems",
        slug: "molten-metal-systems",
        title: "MOLTEN METAL SYSTEMS",
        products: [
            {
                id: "amz-product",
                slug: "amz",
                name: "AMZ",
                image: `${import.meta.env.BASE_URL}/assets/images/product.jpg`,
                pdf: "#",
                description: "Molten metal systems are designed to safely handle and transport molten metals in high-temperature industrial environments.",
                specifications: [
                    { label: "Temperature Range", value: "Up to 800\u00B0C" },
                    { label: "Material of Construction", value: "High-grade alloy steel" }
                ]
            },
            {
                id: "aml-product",
                slug: "aml",
                name: "AML",
                image: `${import.meta.env.BASE_URL}/assets/images/product.jpg`,
                pdf: "#",
                description: "Molten metal systems are designed to safely handle and transport molten metals in high-temperature industrial environments.",
                specifications: [
                    { label: "Temperature Range", value: "Up to 400\u00B0C" },
                    { label: "Material of Construction", value: "High-grade alloy steel" }
                ]
            },
        ]
    }
   
];

export default productData;