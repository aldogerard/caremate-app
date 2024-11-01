export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/react-tailwindcss-select/dist/index.esm.js",
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: "Poppins",
            },
            colors: {
                light: "#FFFFFF",
                dark: "#252525",
                primary: "#10B981",
                secondary: "#064E3B",
                accent: "#A1A1AA",
                background: "#F8FAFC",
                warning: "#D97706",
                error: "#BE123C",
            },
        },
    },
    darkMode: "class",
    plugins: [require("daisyui")],
};
