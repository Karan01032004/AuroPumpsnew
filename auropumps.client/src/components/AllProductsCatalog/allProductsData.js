const baseImagePath = `${import.meta.env.BASE_URL}/assets/images`;

export const allProductsData = [
    {
        id: "pumps",
        routeSlug: "pumps",
        title: "PUMPS",
        accent: "Core Industrial Pumps",
        products: [
            { name: "ACC HORIZONTAL END SUCTION PUMPS", slug: "acc", image: `${baseImagePath}/acc.png` },
            { name: "ACMAG MAGNETIC DRIVE PUMPS", slug: "acmag", image: `${baseImagePath}/app.png` },
            { name: "ACTF AIR COOLED THERMIC FLUID PUMPS", slug: "actf", image: `${baseImagePath}/acc.png` },
            { name: "ACCTF WATER COOLED THERMIC FLUID PUMPS", slug: "acctf", image: `${baseImagePath}/acc-j.png` },
            { name: "ASP NON CLOG SELF PRIMING PUMPS", slug: "asp", image: `${baseImagePath}/accv-j.png` },
            { name: "ACCV VERTICAL SUBMERGED PUMPS", slug: "accv", image: `${baseImagePath}/accv-j.png` },
            { name: "ACC-J JACKETED PROCESS PUMPS", slug: "acc-j", image: `${baseImagePath}/acc-j.png` },
            { name: "ACCV-J JACKETED SUBMERGED PUMPS", slug: "accv-j", image: `${baseImagePath}/accv-j.png` },
            { name: "APP PROCESS PUMPS", slug: "app", image: `${baseImagePath}/app.png` },
        ],
    },
    {
        id: "agitators",
        routeSlug: "agitators",
        title: "AGITATORS",
        accent: "Mixing & Process Motion",
        products: [
            { name: "AAG INDUSTRIAL AGITATORS", slug: "aag", image: `${baseImagePath}/app.png` },
        ],
    },
    {
        id: "dross-grabber",
        routeSlug: "dross-grabber",
        title: "DROSS GRABBER",
        accent: "Molten Surface Handling",
        products: [
            { name: "DROSSER DROSS GRABBER", slug: "drosser", image: `${baseImagePath}/aml.png` },
        ],
    },
    {
        id: "molten-salt-systems",
        routeSlug: "molten-salt-systems",
        title: "MOLTEN SALT SYSTEMS",
        accent: "High Temperature Transfer",
        products: [
            { name: "ACCV (SALT) SYSTEMS", slug: "accv", image: `${baseImagePath}/molten-salt-pumps-manufacturer-sucess-story.png` },
            { name: "AMZ MOLTEN ZINC SYSTEMS", slug: "amz", image: `${baseImagePath}/molten-zinc-galvalume-pumps-manufacturer-sucess-story.png` },
            { name: "AML MOLTEN LEAD SYSTEMS", slug: "aml", image: `${baseImagePath}/molten-lead-pumps-manufacturer-sucess-story.png` },
            { name: "AAG AGITATED MOLTEN SYSTEMS", slug: "aag", image: `${baseImagePath}/high-temperature-thermic-fluid-pumps-manufacturer-sucess-story.png` },
        ],
    },
    {
        id: "molten-metal-systems",
        routeSlug: "molten-metal-systems",
        title: "MOLTEN METAL SYSTEMS",
        accent: "Engineered for Extreme Media",
        products: [
            { name: "AMZ MOLTEN METAL PUMPS", slug: "amz", image: `${baseImagePath}/molten-zinc-galvalume-pumps-manufacturer-sucess-story.png` },
            { name: "AML MOLTEN METAL PUMPS", slug: "aml", image: `${baseImagePath}/molten-lead-pumps-manufacturer-sucess-story.png` },
            { name: "HIGH PRESSURE CHEMICAL & LPG PUMPS", slug: "app", image: `${baseImagePath}/high-pressure-chemicals-and-lgp-pumps.png` },
        ],
    },
];
