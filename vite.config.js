import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
    server: {
        proxy: {
            "/api": {
                target: "https://lively-miracle-8d1d9a1f96.strapiapp.com", // This is the Strapi API
                changeOrigin: true, // This handles CORS
                secure: false, // Set to false if using HTTP or self-signed SSL certificates
                rewrite: (path) => path.replace(/^\/api/, ""), // Remove the '/api' prefix when forwarding
            },
        },
    },
});
