/** @type {import('tailwindcss').Config} */

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            mobile: { max: '767px' },
            tablet: { max: '1023px' },
            xxsm: '340px',
            xsm: '480px',
            sm: '576px',
            md: '768px',
            lg: '992px',
            lg2: '1024px',
            xl: '1280px',
            '2xl': '1440px',
            '3xl': '1630px',
            '4xl': '1920px',
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '10px', // mobile
                md: '10px',
                lg: '24px',
                lg2: '30px',
                xl: '40px',
                '2xl': '60px',
            },
            screens: {
                md: '768px',
                lg: '992px',
                lg2: '1024px',
                xl: '1280px',
                '2xl': '1440px',
            },
        },
        extend: {
            fontFamily: {
                primary: ["Geist", "sans-serif"],
            },
            backgroundImage: {
                'primary-gradient': 'linear-gradient(90deg, #F89B32 0%, #CF3A38 100%)',

            },
            spacing: {
                30: "var(--space-30)",
                50: "var(--space-50)",
                70: "var(--space-70)",
                100: "var(--space-100)",
                200: "var(--space-200)",
            },
            fontSize: {
                xs: ['0.75rem', '1.25rem'],    // 12px
                sm: ['0.875rem', '1.4rem'],    // 14px
                base: ['1rem', '1.5rem'],      // 16px
                lg: ['1.125rem', '1.75rem'],   // 18px
                xl: ['1.5rem', '2rem'],        // 24px
                '2xl': ['1.625rem', '2.25rem'],// 26px
                '3xl': ['1.875rem', '2.5rem'], // 30px
                '34px': ['2.125rem', '2.625rem'], // 34px
                '4xl': ['2.3rem', '3rem'],     // 40px
                '5xl': ['3.125rem', '3.75rem'],// 50px
                '6xl': ['3.75rem', '4.25rem'], // 60px
                '7xl': ['4.5rem', '5rem'],     // 72px (optional jump)
                '8xl': ['6.25rem', '6.75rem'], // 100px
            },

            colors: {
                primary: '#2D258E',
                secondary: '#7C7C7C',
                gray: '#737373',
                dark: '#4B4B4B',
            },
            keyframes: {
                clientScroll: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-100%)" },
                },
            },
            animation: {
                clientScroll: "clientScroll 25s linear infinite",
            },

        },
    },
    plugins: [
        function ({ addComponents }) {
            addComponents({
                ".btn-primary": {
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "0.7rem 1.75rem",
                    borderRadius: "10px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    fontFamily: "Alexandria, sans-serif",
                    color: "#fff",

                    background:
                        "linear-gradient(90deg, #F89B32 0%, #CF3A38 100%)",
                    backgroundSize: "120% 120%",

                    transition:
                        "transform 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.25s cubic-bezier(.4,0,.2,1), background-position 0.4s ease",
                },

                /* Hover – lift + glow */
                ".btn-primary:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: "0 10px 24px rgba(207,58,56,0.25)",
                    backgroundPosition: "100% 0%",
                },

                /* SVG base */
                ".btn-primary svg": {
                    width: "1rem",
                    height: "1rem",
                    display: "inline-block",
                    transform: "translateX(0) rotate(0deg)",
                    transformOrigin: "center",
                    transformBox: "fill-box",
                    transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
                },

                /* SVG hover motion – smooth + confident */
                ".btn-primary:hover svg": {
                    transform: "translateX(6px) rotate(45deg)",
                },

                /* Active – press feel */
                ".btn-primary:active": {
                    transform: "translateY(0) scale(0.97)",
                    boxShadow: "0 6px 14px rgba(0,0,0,0.22)",
                },
                /* container-fluid utility */
                ".container-fluid": {
                    width: "100%",
                    paddingLeft: "0px",
                    paddingRight: "0px",
                },
                /* ========== SECONDARY BUTTON ========== */
                /* ========== SECONDARY BUTTON (PRIMARY STYLE, WHITE) ========== */
                ".btn-secondary": {
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "0.7rem 1.75rem",
                    borderRadius: "10px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    fontFamily: "Alexandria, sans-serif",

                    /* Only difference */
                    color: "#F97316",
                    background: "#ffffff",

                    backgroundSize: "120% 120%",

                    transition:
                        "transform 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.25s cubic-bezier(.4,0,.2,1), background-position 0.4s ease",
                },

                /* Hover – lift + glow (same feel) */
                ".btn-secondary:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
                },

                /* SVG base */
                ".btn-secondary svg": {
                    width: "1rem",
                    height: "1rem",
                    display: "inline-block",
                    transform: "translateX(0) rotate(0deg)",
                    transformOrigin: "center",
                    transformBox: "fill-box",
                    transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
                },

                /* SVG hover motion – SAME as primary */
                ".btn-secondary:hover svg": {
                    transform: "translateX(6px) rotate(45deg)",
                },

                /* Active – press feel */
                ".btn-secondary:active": {
                    transform: "translateY(0) scale(0.97)",
                    boxShadow: "0 6px 14px rgba(0,0,0,0.22)",
                },
                ".border-gradient-primary": {
                    border: "1px solid transparent",
                    borderRadius: "inherit",
                    background:
                        "linear-gradient(#fff, #fff) padding-box, linear-gradient(90deg, #F89B32 0%, #CF3A38 100%) border-box",
                },
            });
        },
    ]
}