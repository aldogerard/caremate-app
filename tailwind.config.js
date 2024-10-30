export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
                warning: "#FBBF24",
                error: "#BE123C",
            },
        },
    },
    darkMode: "class",
    plugins: [require("daisyui")],
};
