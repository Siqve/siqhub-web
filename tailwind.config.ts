import type { Config } from "tailwindcss";

const customer_colors = {
    c_gray: {
        800: "#171312",
        700: "#242424",
        500: "#3D3D3D",
        300: "#525252",
        100: "#666666",
    },
    c_purple: {
        700: "#18122B",
        500: "#393053",
        300: "#443C68",
        100: "#635985",
    },
    c_violet: {
        500: "#A8A0E4",
        300: "#BEB8EB",
        100: "#E2DFF6",
    },
    c_pink: {
        700: "#F2404F",
        500: "#F45B69",
        300: "#F78D95",
        100: "#FAB3B9",
    },
    c_blue: {
        900: "#050610",
        800: "#0F112F",
        700: "#181C4E",
        500: "#262C7D",
        400: "#353DAC",
        300: "#636ACF",
        200: "#8288D9",
        100: "#A2A6E2",
    },
};

const dracula = {
    "color-scheme": "dark",
    primary: "#ff79c6",
    "primary-content": "#16050e",
    secondary: "#bd93f9",
    "secondary-content": "#0d0815",
    accent: "#ffb86c",
    "accent-content": "#160c04",
    neutral: "#414558",
    "neutral-content": "#d6d7db",
    "base-100": "#282a36",
    "base-200": "#232530",
    "base-300": "#1f202a",
    "base-content": "#f8f8f2",
    info: "#8be9fd",
    "info-content": "#071316",
    success: "#50fa7b",
    "success-content": "#021505",
    warning: "#f1fa8c",
    "warning-content": "#141507",
    error: "#ff5555",
    "error-content": "#160202",
};

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/managers/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    safelist: [
        // Pink
        "bg-gradient-to-br from-c_pink-500 to-90% to-c_purple-700",
        "text-c_pink-100",
        // Blue,
        "bg-gradient-to-br from-c_blue-300 to-c_purple-500",
        "text-c_blue-100",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                ...customer_colors,
                ...dracula,
                background: {
                    main: customer_colors.c_gray["700"],
                },
                text: {
                    main: dracula["base-content"],
                },
            },
        },
    },
};
export default config;
