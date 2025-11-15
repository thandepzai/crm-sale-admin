/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    corePlugins: {
        // preflight: false
    },
    theme: {
        // extends
        extend: {
            spacing: {
                4.5: "1.125rem",
                5.5: "1.375rem",
                6.5: "1.675rem"
            },
            colors: {
                primary: "var(--primary)",
                "primary-light": "var(--primary-light)",
                secondary: "var(--secondary)",
                background: "var(--background)",
                block: "var(--block)",
                "primary-typo": "var(--primary-typo)",
                "secondary-typo": "var(--secondary-typo)",
                "ant-primary": "var(--ant-primary)",
                "ant-primary-light": "var(--ant-primary-light)",
                "ant-error": "var(--ant-error)",
                "ant-error-light": "var(--ant-error-light)",

                "background-android": "#f2f2f2"
            },
            transitionDelay: {
                2000: "2000ms",
                3000: "3000ms"
            }
        },

        // override
        fontSize: {
            xs: ["0.75rem", { lineHeight: "1rem" }],
            smer: ["0.8125rem", { lineHeight: "1rem" }],
            sm: ["0.875rem", { lineHeight: "1.25rem" }],
            cp: ["0.9375rem", { lineHeight: "1.3333rem" }],
            base: ["1rem", { lineHeight: "1.5rem" }],
            md: ["1.0625rem", { lineHeight: "1.625rem" }],
            lg: ["1.125rem", { lineHeight: "1.75rem" }],
            xl: ["1.25rem", { lineHeight: "1.75rem" }],
            "2xl": ["1.5rem", { lineHeight: "2rem" }],
            "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
            "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
            "5xl": ["3rem", { lineHeight: "1" }],
            "6xl": ["3.75rem", { lineHeight: "1" }],
            "7xl": ["4.5rem", { lineHeight: "1" }],
            "8xl": ["6rem", { lineHeight: "1" }]
        },
        screens: {
            // mob: "0px", // mobile - default - main support at 384px
            mobx: "480px", // mobile

            tab: "730px", // small tablet,
            tabx: "830px", // medium tablet - main support break point
            tabxx: "960px", // large tablet

            lap: "1080px", // small laptop,
            lapx: "1280px", // medium laptop - main support break point

            desk: "1440px",
            deskx: "1600px"
        },
        blur: {
            0: "0",
            sm: "4px",
            DEFAULT: "8px",
            md: "12px",
            lg: "16px",
            xl: "24px",
            "2xl": "32px",
            "3xl": "40px",
            "4xl": "64px"
        },
        fontFamily: {
            sans: [
                "Google Sans",
                "ui-sans-serif",
                "system-ui",
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Helvetica Neue"',
                "Arial",
                '"Noto Sans"',
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
                '"Noto Color Emoji"'
            ],
            serif: ["ui-serif", "Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
            mono: [
                "ui-monospace",
                "SFMono-Regular",
                "Menlo",
                "Monaco",
                "Consolas",
                '"Liberation Mono"',
                '"Courier New"',
                "monospace"
            ]
        },
        rotate: {
            "-180": "-180deg",
            "-90": "-90deg",
            "-45": "-45deg",
            "-12": "-12deg",
            "-6": "-6deg",
            "-3": "-3deg",
            "-2": "-2deg",
            "-1": "-1deg",
            0: "0deg",
            1: "1deg",
            2: "2deg",
            3: "3deg",
            6: "6deg",
            12: "12deg",
            45: "45deg",
            90: "90deg",
            180: "180deg"
        }
    },
    plugins: [require("@tailwindcss/forms")]
};
