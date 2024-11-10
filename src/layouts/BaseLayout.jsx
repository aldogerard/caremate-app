import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Outlet } from "react-router-dom";

const BaseLayouts = () => {
    return (
        <>
            <ScrollToTop />
            <Header />
            <section className="flex justify-center bg-third">
                <main className="container py-16 min-h-screen padding scrollbar-hide">
                    <Outlet />
                </main>
            </section>
            <Footer />
        </>
    );
};

export default BaseLayouts;
